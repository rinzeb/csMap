import express              = require('express');
import fs                   = require('fs');
import http                 = require('http');
import MessageBus           = require('../bus/MessageBus');
import ConfigurationService = require('../configuration/ConfigurationService');
import Location             = require('../database/Location');
import BagDatabase          = require('../database/BagDatabase');
import IGeoJsonFeature      = require('./IGeoJsonFeature');

interface ILayerDefinition {
    projectTitle:  string;
    reference:     string;
    group:         string;
    layerTitle:    string;
    description:   string;
    geometryType:  string;
    parameter1:    string;
    parameter2:    string;
    parameter3:    string;
    iconUri:       string;
    iconSize:      number;
    fillColor:     string;
    strokeColor:   string;
    strokeWidth:   number;
    isEnabled:     boolean;
    useClustering: boolean;
    opacity:       number
}

interface ILayerTemplate {
    layerDefinition: ILayerDefinition[];
    propertyTypes:   csComp.Services.IPropertyType[];
    properties:      csComp.Services.IProperty[]
}

/** A factory class to create new map layers based on input, e.g. from Excel */
class MapLayerFactory {
    constructor(private bag: BagDatabase, private messageBus: MessageBus) {}

    public process(req: express.Request, res: express.Response) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('');
        console.log('Received project template. Processing...');
        var template: ILayerTemplate = req.body;
        var ld = template.layerDefinition[0];
        this.createMapLayer(template, (geojson) => {
            // fs.writeFileSync("c:/Temp/excel_export.json", JSON.stringify(geojson));
            this.messageBus.publish('dynamic_project_layer', 'created', {
                project   : ld.projectTitle,
                reference : ld.reference,
                geojson   : geojson,
                enabled   : ld.isEnabled });
            console.log("Created and published layer");
        });
    }

    public createMapLayer(template: ILayerTemplate, callback: (Object) => void) {
        var ld = template.layerDefinition[0];
        var features: IGeoJsonFeature[] = [];
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
            case "Latitude_and_longitude":
            case "Postcode6_en_huisnummer":
                if (!ld.parameter1) {
                    console.log("Error: Parameter1 should be the name of the column containing the parameter1!")
                    return;
                }
                if (!ld.parameter2) {
                    console.log("Error: Parameter2 should be the name of the column containing the parameter2!")
                    return;
                }
                this.createPointFeature(ld.geometryType, ld.parameter1, ld.parameter2, features, template.properties, () => { callback(geojson) });
                break;
            case "CBS_Provincie_op_naam":
            case "CBS_Provincie_op_code":
            case "CBS_Gemeente_op_naam":
            case "CBS_Gemeente_op_code":
                if (!ld.parameter1) {
                  console.log("Error: Parameter1 should be the name of the column containing the parameter1!")
                    return;
                }
                this.createPolygonFeature(ld.geometryType, ld.parameter1, features, template.properties, () => { callback(geojson)});
                break;
        }
    }

    private createPolygonFeature(geoType: string, parameter: string, features: IGeoJsonFeature[], properties: csComp.Services.IProperty[], callback: Function) {
      if (!properties) callback();
      var sqlTable;
      var sqlColumn;
      var clearSpaces = true;
      switch(geoType) {
        case "CBS_Provincie_op_code":
          sqlTable = "bagactueel.provincie";
          sqlColumn = "provincie.provinciecode";
          clearSpaces = false;
          break;
        case "CBS_Provincie_op_naam":
          sqlTable = "bagactueel.provincie";
          sqlColumn = "provincie.provincienaam";
          break;
        case "CBS_Gemeente_op_naam":
          sqlTable = "bagactueel.gemeente";
          sqlColumn = "gemeente.gemeentenaam";
          break;
        case "CBS_Gemeente_op_code":
          sqlTable = "bagactueel.gemeente";
          sqlColumn = "gemeente.gemeentecode";
          clearSpaces = false;
          break;
        default:
          console.log("Error: Could not find GeometryType: " + geoType);
          break;
      }
      var todo = properties.length;
      properties.forEach((prop) => {
          var value;
          (clearSpaces) ? value = prop[parameter].replace(/ /g, '') : value= prop[parameter];
          this.bag.lookupBagArea(sqlTable, sqlColumn, value, (coordinates: JSON[]) => {
              todo--;
              if (coordinates && coordinates.length > 0 && coordinates[0].hasOwnProperty('area')) {
                  features.push(this.createFeatureFromGeoJson(coordinates[0]['area'], prop));
              } else {
                  console.log(`Cannot find area with identifier: ${value}`);
              }
              if (todo <= 0) callback();
          });
      });
    }

    private createPointFeature(geoType: string, par1: string, par2: string, features: IGeoJsonFeature[], properties: csComp.Services.IProperty[], callback: Function) {
        if (!properties) callback();
        var todo = properties.length;
        switch(geoType) {
          case "Postcode6_en_huisnummer":
            properties.forEach((prop) => {
                var zip = prop[par1].replace(/ /g, '');
                var nmb = prop[par2];
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
          case "Latitude_and_longitude":
            properties.forEach((prop) => {
              var lat: number = Number(prop[par2]);
              var lon: number = Number(prop[par1]);
              features.push(this.createFeature(lat, lon, prop));
            });
            callback();
          }
    }

    private createFeatureFromGeoJson(geojson: string, properties: csComp.Services.IProperty): IGeoJsonFeature {
      var geoParsed = JSON.parse(geojson);
      if (geoParsed.hasOwnProperty("type")&& geoParsed.hasOwnProperty("coordinates")) {
        return {
          type: "Feature",
          geometry: {
            type: geoParsed['type'],
            coordinates: geoParsed['coordinates']
          },
          properties: properties
        }
      } else {
        console.log("Warning: No valid geoJson format.");
        return;
      }
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
