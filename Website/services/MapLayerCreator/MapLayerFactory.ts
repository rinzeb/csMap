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

            fs.writeFileSync("C:/Users/bruiningrw/Projects/CommonSense/apps/csMap/Website/public/data/projects/DynamicExample/" + ld.group + "/" + ld.layerTitle + ".json", JSON.stringify(geojson));

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

        // Check propertyTypeData for time-based data
        this.convertTimebasedPropertyData(template.propertyTypes);
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

    private convertTimebasedPropertyData(propertyTypes: csComp.Services.IPropertyType[]) {
      if (!propertyTypes) return;
      propertyTypes.forEach((pt) => {
        if (pt.hasOwnProperty("targetProperty")) {
          // TODO: Convert to "sensors":[  #,#,#,# ];
        }
      });
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
      fts.forEach((f) => {
        var p0 = properties[0];
        console.log(JSON.stringify(p0));
        if (f.properties["Name"] === p0[par1]) {
          console.log(p0[par1]);
        }
      })
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
}
export = MapLayerFactory;
