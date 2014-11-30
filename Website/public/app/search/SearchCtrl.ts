module Search {
    'use strict';

    export interface ISearchScope extends ng.IScope {
        vm         : SearchCtrl;
        location   : any;
        getLocation: any;
        onSelect   : any;
    }

    export interface ILookupAddress {
        name     : string;
        source   : string;
        lat?     : any;
        lng?     : any;
        feature? : csComp.Services.IFeature;
    }

    export class LookupAddress {
        public lat     : any;
        public lng     : any;
        public feature: csComp.Services.IFeature;

        constructor(
            public name     : string,
            public source: string) { }

        public shortName(limit: number) {
            if (this.name.length < limit) return this.name;
            return this.name.substring(0, limit) + '...';
        }
    }

    //declare var google;

    export class SearchCtrl {
      public searchText: string;
        
        // $inject annotation.
        // See http://docs.angularjs.org/guide/di
        public static $inject = [
            '$scope',
            '$http',
            '$filter',
            'layerService',
            'mapService',
            'messageBusService'
        ];

        // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
        constructor(
            private $scope            : ISearchScope,
            private $http             : ng.IHttpService,
            private $filter           : ng.IFilterService,
            private $layerService     : csComp.Services.ILayerService,
            private $mapService       : csComp.Services.MapService,
            private $messageBusService: csComp.Services.MessageBusService
            ) {
            $scope.vm = this;
        }

        public getLocation(val : string): any {
            var params = {
                username       : 'erikvullings',
                featureClass   : 'P',
                lang           : 'nl',
                countryCode    : 'NL',
                name_startsWith: val,
                maxRows        : 5,
                relevance      : 'relevance'
            };
            if (this.$layerService.maxBounds) {
                params['north'] = this.$layerService.maxBounds.northEast[0].toString();
                params['east' ] = this.$layerService.maxBounds.northEast[1].toString();
                params['south'] = this.$layerService.maxBounds.southWest[0].toString();
                params['west' ] = this.$layerService.maxBounds.southWest[1].toString();
            }
            return this.$http.jsonp('http://api.geonames.org/searchJSON?callback=JSON_CALLBACK', { params: params })
                .then((result : any) => {
                    var data = result.data;
                    var addresses = $.map(data.geonames, item => {
                        var address: ILookupAddress = new LookupAddress(item.name + ", " + item.adminName1, "GeoNames");
                        address.lat = item.lat;
                        address.lng = item.lng;
                        //{
                        //    name   : item.name + ", " + item.adminName1,
                        //    lat    : item.lat,
                        //    lng    : item.lng,
                        //    source : "GeoNames"
                        //};
                        //console.log(JSON.stringify(address));
                        return address;
                    });
                var features = this.$filter('filter')(this.$layerService.project.features, val);
                if (features && features.length > 0) {
                    features.forEach((feature) => {
                        var lookupAddress = new LookupAddress(feature.properties.Name, this.$layerService.findLayer(feature.layerId).title);
                        lookupAddress.feature = feature;
                        addresses.push(lookupAddress);
                    });
                }

                return addresses;
            });
        }

        public onSelect($item: ILookupAddress) {
            if ($item.feature) {
                this.$layerService.selectFeature($item.feature);
                this.$mapService.zoomTo($item.feature);
            } else {
                this.$mapService.zoomToLocation(new L.LatLng($item.lat, $item.lng), 12);
            }
            console.log($item);
        }
    }
}