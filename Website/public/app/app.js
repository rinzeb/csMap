var App;
(function (App) {
    'use strict';

    

    var AppCtrl = (function () {
        // dependencies are injected via AngularJS $injector
        // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
        function AppCtrl($scope, $location, $mapService, $layerService, $messageBusService) {
            var _this = this;
            this.$scope = $scope;
            this.$location = $location;
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
                switch (title) {
                    case "onFeatureSelect":
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
        'csWeb.datatable',
        'ngCookies'
    ]).config(function (localStorageServiceProvider) {
        localStorageServiceProvider.prefix = 'csMap';
    }).config(function ($translateProvider) {
        $translateProvider.translations('en', {
            MAP: 'Maps',
            LAYERS: 'Layers',
            FILTERS: 'Filters',
            FILTER_INFO: 'At the moment, no filters have been selected. In order to add a filter, click on an icon or area on the map, and click on the filter icon (<span class="fa fa-filter"></span>) in the right menu. This will create a filter for the selected property.',
            STYLES: 'Styles',
            STYLE_INFO: 'At the moment, no style has been selected. In order to add a style, click on an icon or area on the map, and click on the style icon (<span class="fa fa-eye"></span>) in the right menu. This will create a filter for the selected property.',
            FEATURES: 'Features',
            LEGEND: 'Legend',
            SEARCH: 'Search',
            WHITE_RED: 'white - red',
            RED_WHITE: 'red - white',
            GREEN_RED: 'green - red',
            RED_GREEN: 'red - green',
            WHITE_BLUE: 'white - blue',
            BLUE_WHITE: 'blue - white',
            WHITE_GREEN: 'white - green',
            GREEN_WHITE: 'green - white',
            WHITE_ORANGE: 'white - orange',
            ORANGE_WHITE: 'orange - white',
            SHOW5: 'Show 5 items',
            SHOW10: 'Show 10 items',
            SHOW15: 'Show 15 items',
            SHOW20: 'Show 20 items',
            SHOW25: 'Show 25 items',
            SHOW30: 'Show 30 items',
            SHOW35: 'Show 35 items',
            SHOW40: 'Show 40 items'
        });
        $translateProvider.translations('nl', {
            MAP: 'Kaarten',
            LAYERS: 'Kaartlagen',
            FILTERS: 'Filters',
            FILTER_INFO: 'Momenteel zijn er geen filters geselecteerd. Klik op een icoon of gebied op de kaart, en klik op het filter icoontje (<span class="fa fa-filter"></span>) in het rechter menu om een filter toe te voegen. Dan wordt er een filter aangemaakt voor de geselecteerde eigenschap.',
            STYLES: 'Stijlen',
            STYLE_INFO: 'Momenteel zijn er geen stijlen geselecteerd. Klik op een icoon of gebied op de kaart, en klik op het stijl icoontje (<span class="fa fa-eye"></span>) in het rechter menu om een stijl toe te voegen. Dan wordt er een stijl aangemaakt voor de geselecteerde eigenschap.',
            FEATURES: 'Features',
            LEGEND: 'Legenda',
            SEARCH: 'Zoeken',
            WHITE_RED: 'wit - rood',
            RED_WHITE: 'rood - wit',
            GREEN_RED: 'groen - rood',
            RED_GREEN: 'rood - groen',
            WHITE_BLUE: 'wit - blauw',
            BLUE_WHITE: 'wit - groen',
            WHITE_GREEN: 'wit - groen',
            GREEN_WHITE: 'groen - wit',
            WHITE_ORANGE: 'wit - oranje',
            ORANGE_WHITE: 'oranje - wit',
            SHOW5: 'Toon 5 regels',
            SHOW10: 'Toon 10 regels',
            SHOW15: 'Toon 15 regels',
            SHOW20: 'Toon 20 regels',
            SHOW25: 'Toon 25 regels',
            SHOW30: 'Toon 30 regels',
            SHOW35: 'Toon 35 regels',
            SHOW40: 'Toon 40 regels'
        });
        $translateProvider.preferredLanguage('nl');
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
    }).controller('appCtrl', AppCtrl).controller('mapLayersCtrl', csComp.Services.MapCtrl).controller('searchFormCtrl', csComp.Search.SearchFormCtrl).controller('mapViewCtrl', MapView.MapViewCtrl).controller('searchCtrl', Search.SearchCtrl).service('messageBusService', csComp.Services.MessageBusService).service('mapService', csComp.Services.MapService).service('layerService', csComp.Services.LayerService).filter('csmillions', [
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
