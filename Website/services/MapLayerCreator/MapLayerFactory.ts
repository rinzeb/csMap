require('rootpath')();
import express              = require('express');
import MessageBus           = require('ServerComponents/bus/MessageBus');
import pg                   = require('pg');
import ConfigurationService = require('ServerComponents/configuration/ConfigurationService');
import fs                   = require('fs');
import http                 = require('http');
import Location             = require('../database/Location');
import BagDatabase          = require('../database/BagDatabase');
import IGeoJsonFeature      = require('./IGeoJsonFeature');

interface ILayerDefinition {
    projectTitle:  string,
    reference:     string,
    group:         string,
    layerTitle:    string,
    description:   string,
    geometryType:  string,
    parameter1:    string,
    parameter2:    string,
    parameter3:    string,
    iconUri:       string,
    iconSize:      number,
    fillColor:     string,
    strokeColor:   string,
    strokeWidth:   number,
    isEnabled:     boolean,
    useClustering: boolean,
    opacity:       number
}

interface ILayerTemplate {
    layerDefinition: ILayerDefinition[],
    propertyTypes:   csComp.Services.IPropertyType[],
    properties:      csComp.Services.IProperty[]
}

/** A factory class to create new map layers based on input, e.g. from Excel */
class MapLayerFactory {

    templateFiles: csComp.Services.IProperty[];

    constructor(private bag: BagDatabase, private messageBus: MessageBus.MessageBusService) {
        var fileList: csComp.Services.IProperty[] = [];
        fs.readdir("public/data/templates", function (err, files) {
          if(err) {
            console.log("Error while looking for templates");
          } else {
            files.forEach((f) => {
              fileList[f.replace(/\.[^/.]+$/, "")] = ("public/data/templates/" + f); // Filter extension from key and store in dictionary
            });
          }
        });
        this.templateFiles = fileList;
    }

    public process(req: express.Request, res: express.Response) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('');
        console.log('Received project template. Processing...');
        var template: ILayerTemplate = req.body;
        var ld = template.layerDefinition[0];
        this.createMapLayer(template, (geojson) => {

            fs.writeFileSync("public/data/projects/DynamicExample/" + ld.group + "/" + ld.layerTitle + ".json", JSON.stringify(geojson));

            this.messageBus.publish('dynamic_project_layer', 'created', {
                project   : ld.projectTitle,
                reference : ld.reference,
                group     : ld.group,
                geojson   : geojson,
                enabled   : ld.isEnabled });
        });
    }

    public createMapLayer(template: ILayerTemplate, callback: (Object) => void) {
        var ld = template.layerDefinition[0];
        var features: IGeoJsonFeature[] = [];
        //Convert StringFormats
        this.convertStringFormats(template.propertyTypes);
        // Check propertyTypeData for time-based data
        var timestamps = this.convertTimebasedPropertyData(template);
        var geojson = {
            type: "FeatureCollection",
            featureTypes: {
                "Default": {
                    name: "Default",
                    style: {
                        iconUri:     ld.iconUri,
                        iconWidth:   ld.iconSize,
                        iconHeight:  ld.iconSize,
                        stroke:      ld.strokeWidth > 0,
                        strokeColor: ld.strokeColor || "black",
                        fillColor:   ld.fillColor || "yellow",
                        opacity:     ld.opacity || 0.5,
                        fillOpacity: ld.opacity || 0.5
                    },
                    propertyTypeData: template.propertyTypes
                }
            },
            features: features
        };
        if (timestamps.length > 0) {
          geojson["timestamps"] = JSON.parse(JSON.stringify(timestamps));
        }
        // Add geometry
        switch (ld.geometryType) {
            case "Postcode6_en_huisnummer":
                if (!ld.parameter1) {
                    console.log("Error: Parameter1 should be the name of the column containing the zip code!")
                    return;
                }
                if (!ld.parameter2) {
                    console.log("Error: Parameter2 should be the name of the column containing the house number!")
                    return;
                }
                this.createPointFeature(ld.parameter1, ld.parameter2, features, template.properties, () => { callback(geojson) });
                break;
            case "CBS_Provincie_op_naam":
            case "CBS_Gemeente_op_naam":
            case "Zorgkantoorregio":
                if(!ld.parameter1) {
                  console.log("Error: Parameter1 should be the name of the column containing the zorgkantoor!")
                  return;
                }
                this.createPolygonFeature(ld.geometryType, ld.parameter1,features,template.properties, () => { callback(geojson) });
                break;
        }

        return geojson;

    }

    private convertTimebasedPropertyData(template: ILayerTemplate) {
      var propertyTypes: csComp.Services.IPropertyType[] = template.propertyTypes;
      if (!propertyTypes) return;
      var timestamps = [];
      var realPropertyTypes:csComp.Services.IPropertyType[] = []; //To filter out propertyTypes that are actually a timestamp value
      propertyTypes.forEach((pt) => {
        if (pt.hasOwnProperty("targetProperty")) {
          var targetProp: string = pt["targetProperty"];
          timestamps.push(this.convertTime(pt["date"], pt["time"]));
          realPropertyTypes.push(pt);
        }
      });
      template.propertyTypes = realPropertyTypes;
      return timestamps;
    }

    private createPolygonFeature(templateName:string, par1: string, features: IGeoJsonFeature[], properties: csComp.Services.IProperty[], callback: Function) {
      if (!properties) callback();
      if (!this.templateFiles.hasOwnProperty(templateName)) {
        console.log("Error: could not find template: " + templateName);
        callback();
      }
      var templateUrl: string = this.templateFiles[templateName];
      var templateFile = fs.readFileSync(templateUrl);
      var templateJson = JSON.parse(templateFile.toString());

      var fts = templateJson.features;
      properties.forEach((p) => {
        fts.forEach((f) => {
          if (f.properties["Name"].indexOf(p[par1]) >= 0) {
            console.log(p[par1]);
            var featureJson : IGeoJsonFeature = {
        			type: "Feature",
        			geometry: f.geometry,
        			properties: p
        		}
            features.push(featureJson);
          }
        })
      });
      callback();
    }

    private createPointFeature(zipCode: string, houseNumber: string, features: IGeoJsonFeature[], properties: csComp.Services.IProperty[], callback: Function) {
        if (!properties) callback();
        var todo = properties.length;
        properties.forEach((prop) => {
            var zip = prop[zipCode].replace(/ /g, '');
            var nmb = prop[houseNumber];
            this.bag.lookupBagAddress(zip, nmb, (locations: Location[]) => {
                //console.log(todo);
                todo--;
                if (!locations || locations.length === 0) {
                    console.log(`Cannot find location with zip: ${zip}, houseNumber: ${nmb}`);
                } else {
                    features.push(this.createFeature(locations[0].lon, locations[0].lat, prop));
                }
                if (todo <= 0) callback();
            });
        });
    }

    private createFeature(lon: number, lat: number, properties: csComp.Services.IProperty): IGeoJsonFeature {
        return {
			type: "Feature",
			geometry: {
				type: "Point",
				coordinates: [ lon, lat ]
			},
			properties: properties
		}
    }

    private convertTime(date: string, time: string) : number{
      var d = new Date();
      d.setFullYear(Number(date.substr(0,4)));
      d.setMonth(Number(date.substr(4,6)));
      d.setDate(Number(date.substr(6,8)));
      var timeInMs = d.getTime();
      return timeInMs;
    }

    private convertStringFormats(properties) {
      properties.forEach(function (prop) {
        if (prop.hasOwnProperty("stringFormat")) {
          switch (prop["stringFormat"]) {
            case "One_decimal":
              prop["stringFormat"] = "{0:#,#.#}";
              break;
            case "Two_decimals":
              prop["stringFormat"] = "{0:#,#.##}";
              break;
            case "Euro_no_decimals":
              prop["stringFormat"] = "€{0:#,#}";
              break;
            case "Euro_two_decimals":
              prop["stringFormat"] = "€{0:#,#.00}";
              break;
            default:
              console.log("stringFormat \'" + prop["stringFormat"] + "\' not found.");
              break;
          }
        }
      });
    }
}
export = MapLayerFactory;
