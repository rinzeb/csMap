var App;
(function (App) {
    'use strict';

    

    var AppCtrl = (function () {
        // dependencies are injected via AngularJS $injector
        // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
        function AppCtrl($scope, $location, $http, $mapService, $layerService, $messageBusService) {
            var _this = this;
            this.$scope = $scope;
            this.$location = $location;
            this.$http = $http;
            this.$mapService = $mapService;
            this.$layerService = $layerService;
            this.$messageBusService = $messageBusService;
            this.showMap = true;
            this.layerMessageReceived = function (title, layer) {
                switch (title) {
                    case "deactivate":
                        break;
                }

                // NOTE EV: You need to call apply only when an event is received outside the angular scope.
                // However, make sure you are not calling this inside an angular apply cycle, as it will generate an error.
                if (_this.$scope.$root.$$phase != '$apply' && _this.$scope.$root.$$phase != '$digest') {
                    _this.$scope.$apply();
                }
            };
            this.featureMessageReceived = function (title) {
                var onfeatureselect = "onFeatureSelect";
                switch (title) {
                    case onfeatureselect:
                        _this.$scope.featureSelected = true;
                        break;
                    case "onFeatureDeselect":
                        _this.$scope.featureSelected = false;
                        break;
                }

                // NOTE EV: You need to call apply only when an event is received outside the angular scope.
                // However, make sure you are not calling this inside an angular apply cycle, as it will generate an error.
                if (_this.$scope.$root.$$phase != '$apply' && _this.$scope.$root.$$phase != '$digest') {
                    _this.$scope.$apply();
                }
            };
            /**
            * Callback function
            * @see {http://stackoverflow.com/questions/12756423/is-there-an-alias-for-this-in-typescript}
            * @see {http://stackoverflow.com/questions/20627138/typescript-this-scoping-issue-when-called-in-jquery-callback}
            * @todo {notice the strange syntax, which is to preserve the this reference!}
            */
            this.sidebarMessageReceived = function (title) {
                switch (title) {
                    case "toggle":
                        _this.$scope.showMenuRight = !_this.$scope.showMenuRight;
                        break;
                    case "show":
                        _this.$scope.showMenuRight = true;
                        break;
                    case "hide":
                        _this.$scope.showMenuRight = false;
                        break;
                    default:
                }
            };
            //console.log('$location: ' + JSON.stringify($location));
            //console.log('$$search : ' + JSON.stringify($location.$$search));
            //console.log('layers   : ' + JSON.stringify($location.$$search.layers));
            sffjs.setCulture("nl-NL");

            $scope.vm = this;
            $scope.showMenuRight = false;
            $scope.featureSelected = false;

            $messageBusService.subscribe("project", function () {
                // NOTE EV: You may run into problems here when calling this inside an angular apply cycle.
                // Alternatively, check for it or use (dependency injected) $timeout.
                // E.g. if (this.$scope.$root.$$phase != '$apply' && this.$scope.$root.$$phase != '$digest') { this.$scope.$apply(); }
                $scope.$apply();
            });

            $messageBusService.subscribe("sidebar", this.sidebarMessageReceived);
            $messageBusService.subscribe("feature", this.featureMessageReceived);
            $messageBusService.subscribe("layer", this.layerMessageReceived);

            this.$layerService.openSolution("data/projects/projects.json", $location.$$search.layers);
            $messageBusService.notify('Welcome to csMap', 'Your mapping solution.');

            this.showMap = this.$location.path() === "/map";

            var url = 'http://geodata.nationaalgeoregister.nl/top10nl/wms?SERVICE=WMS&SRS=EPSG%3A4326&STYLES=&TRANSPARENT=true&VERSION=1.1.1&FORMAT=image%2Fpng&BBOX=4.3441808223724365%2C52.06609591866709%2C4.351986050605774%2C52.06844058355581&HEIGHT=711&WIDTH=1455&LAYERS=terreinen&QUERY_LAYERS=terreinen&INFO_FORMAT=text%2Fhtml&X=1169&Y=543';
            var httpOptions = {
                params: {
                    REQUEST: 'GetFeatureInfo',
                    format_options: 'callback: JSON_CALLBACK'
                }
            };

            //$http.jsonp(url, { params: { REQUEST: 'GetFeatureInfo' } });
            $http.jsonp(url, httpOptions).success(function (data, status) {
                console.log('Success: ' + data + ', ' + status);
            }).error(function (data, status) {
                console.log('Error: ' + data + ', ' + status);
            });
            //$http.jsonp(url, httpOptions)
            //      .success(function(data, status) {
            //          console.log('Success: ' + data + ', ' + status);
            //      })
            //      .error(function(data, status) {
            //          console.log('Error: ' + data + ', ' + status);
            //      });
            //  $http.jsonp('http://geodata.nationaalgeoregister.nl/top10nl/wms?REQUEST=GetFeatureInfo&SERVICE=WMS&SRS=EPSG%3A4326&STYLES=&TRANSPARENT=true&VERSION=1.1.1&FORMAT=image%2Fpng&BBOX=4.3441808223724365%2C52.06609591866709%2C4.351986050605774%2C52.06844058355581&HEIGHT=711&WIDTH=1455&LAYERS=terreinen&QUERY_LAYERS=terreinen&INFO_FORMAT=text%2Fhtml&X=1169&Y=543')
            //      .success(function(data, status) {
            //          console.log('Success: ' + data + ', ' + status);
            //      })
            //      .error(function(data, status) {
            //          console.log('Error: ' + data + ', ' + status);
            //      });
            //  var url = 'http://geodata.nationaalgeoregister.nl/top10nl/wms?REQUEST=GetFeatureInfo&SERVICE=WMS&SRS=EPSG%3A4326&STYLES=&TRANSPARENT=true&VERSION=1.1.1&FORMAT=image%2Fpng&BBOX=4.3441808223724365%2C52.06609591866709%2C4.351986050605774%2C52.06844058355581&HEIGHT=711&WIDTH=1455&LAYERS=terreinen&QUERY_LAYERS=terreinen&INFO_FORMAT=text%2Fhtml&X=1169&Y=543';
            //  $.ajax({
            //      url: url,
            //      dataType: 'jsonp',
            //      jsonp: 'callback',
            //      jsonpCallback: 'jsonpCallback',
            //      success: function (data, status) {
            //          alert("success");
            //          console.log(data);
            //          console.log(status);
            //      }
            //  });
            //omnivore.topojson('data/projects/20141104_csMap/gemeente.topo.json').addTo(this.$mapService.map);
        }
        /**
        * Publish a toggle request.
        */
        AppCtrl.prototype.toggleMenuRight = function () {
            this.$messageBusService.publish("sidebar", "toggle");
        };

        AppCtrl.prototype.toggleMenu = function () {
            this.$mapService.invalidate();
        };

        AppCtrl.prototype.toggleSidebar = function () {
            this.$messageBusService.publish("sidebar", "toggle");
            window.console.log("Publish toggle sidebar");
        };

        AppCtrl.prototype.showTable = function () {
            this.$scope.showMap = false;
        };

        AppCtrl.prototype.isActive = function (viewLocation) {
            return viewLocation === this.$location.path();
        };
        AppCtrl.$inject = [
            '$scope',
            '$location',
            '$http',
            'mapService',
            'layerService',
            'messageBusService'
        ];
        return AppCtrl;
    })();
    App.AppCtrl = AppCtrl;

    

    // Start the application
    angular.module('csWebApp', [
        'ui.router',
        'ui.bootstrap',
        'LocalStorageModule',
        'angularUtils.directives.dirPagination',
        'pascalprecht.translate',
        'csWeb.featureprops',
        'csWeb.layersDirective',
        'csWeb.featureList',
        'csWeb.filterList',
        'csWeb.baseMapList',
        'csWeb.styleList',
        'csWeb.legendList',
        'csWeb.resize',
        'csWeb.showModal',
        'csWeb.voting',
        'csWeb.mca',
        'csWeb.datatable',
        'ngCookies'
    ]).config(function ($httpProvider) {
        //Enable cross domain calls
        $httpProvider.defaults.useXDomain = true;
    }).config(function (localStorageServiceProvider) {
        localStorageServiceProvider.prefix = 'csMap';
    }).config(function ($translateProvider) {
        // TODO ADD YOUR LOCAL TRANSLATIONS HERE, OR ALTERNATIVELY, CHECK OUT
        // http://angular-translate.github.io/docs/#/guide/12_asynchronous-loading
        // Translations.English.locale['MAP_LABEL'] = 'MY AWESOME MAP';
        $translateProvider.translations('en', Translations.English.locale);
        $translateProvider.translations('nl', Translations.Dutch.locale);
        $translateProvider.preferredLanguage('en');
    }).controller('Ctrl', function ($scope, $translate) {
        $scope.changeLanguage = function (key) {
            $translate.use(key);
        };
    }).filter('unique', function () {
        // See https://github.com/angular-ui/angular-ui-OLDREPO/blob/master/modules/filters/unique/unique.js
        return function (items, filterOn) {
            if (filterOn === false) {
                return items;
            }

            if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
                var hashCheck = {}, newItems = [];

                var extractValueToCompare = function (item) {
                    if (angular.isObject(item) && angular.isString(filterOn)) {
                        return item[filterOn];
                    } else {
                        return item;
                    }
                };

                angular.forEach(items, function (item) {
                    var valueToCheck, isDuplicate = false;

                    for (var i = 0; i < newItems.length; i++) {
                        if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                            isDuplicate = true;
                            break;
                        }
                    }
                    if (!isDuplicate) {
                        newItems.push(item);
                    }
                });
                items = newItems;
            }
            return items;
        };
    }).config(function ($stateProvider, $urlRouterProvider) {
        // For any unmatched url, send to /
        $urlRouterProvider.otherwise("/map");
        $stateProvider.state('map', {
            url: "/map?layers",
            templateUrl: "views/map/map.html",
            sticky: true,
            deepStateRedirect: true
        }).state('table', {
            url: "/table",
            template: "<datatable id='datatable'></datatable>",
            sticky: true
        });
    }).service('messageBusService', csComp.Services.MessageBusService).service('mapService', csComp.Services.MapService).service('layerService', csComp.Services.LayerService).controller('appCtrl', AppCtrl).controller('mapLayersCtrl', csComp.Services.MapCtrl).controller('mapViewCtrl', MapView.MapViewCtrl).controller('searchCtrl', Search.SearchCtrl).controller('mcaEditorCtrl', Mca.McaEditorCtrl).filter('csmillions', [
        '$filter', '$locale', function (filter, locale) {
            return function (amount, currencySymbol) {
                if (isNaN(amount))
                    return "";
                var millions = amount / 1000000;

                return String.format("{0:N1}", millions);
            };
        }
    ]).filter('format', [
        '$filter', '$locale', function (filter, locale) {
            return function (value, format) {
                return String.format(format, value);
            };
        }
    ]).directive('percentage', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelController) {
                ngModelController.$parsers.push(function (data) {
                    if (data == null)
                        return 0;
                    return parseInt(data.replace('%', '')) / 100;
                });

                ngModelController.$formatters.push(function (data) {
                    if (data == null)
                        return '';
                    return Math.round((data * 100)) + '%';
                });
            }
        };
    }).directive('ngModelOnblur', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            priority: 1,
            link: function (scope, elm, attr, ngModelCtrl) {
                if (attr.type === 'radio' || attr.type === 'checkbox')
                    return;
                elm.unbind('input').unbind('keydown').unbind('change');
                elm.bind('blur', function () {
                    scope.$apply(function () {
                        ngModelCtrl.$setViewValue(elm.val());
                    });
                });
            }
        };
    });
})(App || (App = {}));
//# sourceMappingURL=app.js.map
