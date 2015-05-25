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
    constructor(private bag: BagDatabase, private messageBus: MessageBus.MessageBusService) {}

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
        }

        return geojson;

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
