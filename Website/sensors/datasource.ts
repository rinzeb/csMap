﻿import express = require('express');
import http = require('http');
import ClientConnection = require("./../ClientConnection");

module DataSource {

  export class SensorSet {
          id: string;
          title: string;
          type: string;
          timestamps: number[] = [];
          values: any[] = [];
          activeValue: any;
      }

      export class DataSource {
          id: string;
          url: string;
          /** static, dynamic */
          type : string;
          title: string;
          sensors: { [key: string]: SensorSet } = {};

          public static LoadData(ds: DataSource, callback: Function) {
              if (ds.url != null) {
                  $.getJSON(ds.url,(temp: DataSource) => {
                      if (temp != null) {
                          ds.id = temp.id;
                          ds.sensors = temp.sensors;
                          ds.title = temp.title;
                          callback();
                      }
                      //var projects = data;
                  });
              }
          }
      }

    export class DataSourceService implements ClientConnection.IDynamicLayer {

        public static result :DataSource;


        constructor (public Connection: ClientConnection.ConnectionManager, public layerId : string)
        {
          DataSourceService.result = new DataSource();
          DataSourceService.result.id = "datasource";

          DataSourceService.result.sensors["test"] = new SensorSet();
        }



        public GetLayer(req: express.Request, res: express.Response) {

        }

        public GetDataSource(req: express.Request, res: express.Response) {
          console.log('get DataSource');
          res.send(DataSourceService.result);

        }

        public updateSensorValue(ss : SensorSet, date : number, value : number)
        {
          ss.timestamps.push(date);
          ss.values.push(value);
          this.Connection.updateSensorValue(ss.id,date,value);

        }

        public Start() {
          setInterval(()=>
          {
            var ds = DataSourceService.result.sensors["test"];
            this.updateSensorValue(ds,new Date().getTime(),Math.floor(Math.random()*100));


            if (ds.values.length > 20) {
              ds.timestamps.shift();
              ds.values.shift();
            }
            console.log('sensor data added');
          },5000);
        }
}
}

export = DataSource;