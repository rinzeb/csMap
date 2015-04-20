var Search;
(function (Search) {
    'use strict';
    var LookupAddress = (function () {
        function LookupAddress(name, source) {
            this.name = name;
            this.source = source;
        }
        LookupAddress.prototype.shortName = function (limit) {
            if (this.name.length < limit)
                return this.name;
            return this.name.substring(0, limit) + '...';
        };
        return LookupAddress;
    })();
    Search.LookupAddress = LookupAddress;
    //declare var google;
    var SearchCtrl = (function () {
        // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
        function SearchCtrl($scope, $http, $filter, $layerService, $mapService, $messageBusService) {
            this.$scope = $scope;
            this.$http = $http;
            this.$filter = $filter;
            this.$layerService = $layerService;
            this.$mapService = $mapService;
            this.$messageBusService = $messageBusService;
            $scope.vm = this;
        }
        SearchCtrl.prototype.getLocation = function (val) {
            var _this = this;
            var params = {
                username: 'erikvullings',
                featureClass: 'P',
                lang: 'nl',
                countryCode: 'NL',
                name_startsWith: val,
                maxRows: 5,
                relevance: 'relevance'
            };
            if (this.$layerService.maxBounds) {
                params['north'] = this.$layerService.maxBounds.northEast[0].toString();
                params['east'] = this.$layerService.maxBounds.northEast[1].toString();
                params['south'] = this.$layerService.maxBounds.southWest[0].toString();
                params['west'] = this.$layerService.maxBounds.southWest[1].toString();
            }
            return this.$http.jsonp('http://api.geonames.org/searchJSON?callback=JSON_CALLBACK', { params: params })
                .then(function (result) {
                var data = result.data;
                var addresses = $.map(data.geonames, function (item) {
                    var address = new LookupAddress(item.name + ", " + item.adminName1, "GeoNames");
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
                var features = _this.$filter('filter')(_this.$layerService.project.features, val);
                if (features && features.length > 0) {
                    features.forEach(function (feature) {
                        var lookupAddress = new LookupAddress(feature.properties.Name, _this.$layerService.findLayer(feature.layerId).title);
                        lookupAddress.feature = feature;
                        addresses.push(lookupAddress);
                    });
                }
                return addresses;
            });
        };
        SearchCtrl.prototype.onSelect = function ($item) {
            if ($item.feature) {
                //this.$layerService.selectFeature($item.feature);
                this.$mapService.zoomTo($item.feature);
            }
            else {
                this.$mapService.zoomToLocation(new L.LatLng($item.lat, $item.lng), 12);
            }
            console.log($item);
        };
        // $inject annotation.
        // See http://docs.angularjs.org/guide/di
        SearchCtrl.$inject = [
            '$scope',
            '$http',
            '$filter',
            'layerService',
            'mapService',
            'messageBusService'
        ];
        return SearchCtrl;
    })();
    Search.SearchCtrl = SearchCtrl;
})(Search || (Search = {}));
