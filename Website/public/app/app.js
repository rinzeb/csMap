var App;
(function (App) {
    'use strict';
    var AppCtrl = (function () {
        // dependencies are injected via AngularJS $injector
        // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
        function AppCtrl($scope, $location, $mapService, $layerService, $messageBusService) {
            //console.log('$location: ' + JSON.stringify($location));
            //console.log('$$search : ' + JSON.stringify($location.$$search));
            //console.log('layers   : ' + JSON.stringify($location.$$search.layers));
            var _this = this;
            this.$scope = $scope;
            this.$location = $location;
            this.$mapService = $mapService;
            this.$layerService = $layerService;
            this.$messageBusService = $messageBusService;
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
            this.$mapService.mapVisible = this.$location.path() === "/map";
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
        AppCtrl.prototype.showTable = function (tableVisible) {
            this.$mapService.mapVisible = !tableVisible;
        };
        AppCtrl.prototype.isActive = function (viewLocation) {
            return viewLocation === this.$location.path();
        };
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
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
        'csWeb.showModal',
        'csWeb.voting',
        'csWeb.mca',
        'csWeb.datatable',
        'csWeb.languageSwitch',
        'csWeb.projectSettings',
        'csWeb.charts',
        'csWeb.expertMode',
        'ngCookies',
        'csWeb.timeline',
        'csWeb.heatmap'
    ]).config(function (localStorageServiceProvider) {
        localStorageServiceProvider.prefix = 'csMap';
    }).config(function (TimelineServiceProvider) {
        TimelineServiceProvider.setTimelineOptions({
            'width': '100%',
            "eventMargin": 0,
            "eventMarginAxis": 0,
            'editable': false,
            'layout': 'box'
        });
    }).config(function ($translateProvider) {
        // TODO ADD YOUR LOCAL TRANSLATIONS HERE, OR ALTERNATIVELY, CHECK OUT
        // http://angular-translate.github.io/docs/#/guide/12_asynchronous-loading
        // Translations.English.locale['MAP_LABEL'] = 'MY AWESOME MAP';
        $translateProvider.translations('en', Translations.English.locale);
        $translateProvider.translations('nl', Translations.Dutch.locale);
        $translateProvider.preferredLanguage('en');
    }).config(function ($languagesProvider) {
        // Defines the GUI languages that you wish to use in your project.
        // They will be available through a popup menu.
        var languages = [];
        languages.push({ key: 'en', name: 'English', img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAflJREFUeNpinDRzn5qN3uFDt16+YWBg+Pv339+KGN0rbVP+//2rW5tf0Hfy/2+mr99+yKpyOl3Ydt8njEWIn8f9zj639NC7j78eP//8739GVUUhNUNuhl8//ysKeZrJ/v7z10Zb2PTQTIY1XZO2Xmfad+f7XgkXxuUrVB6cjPVXef78JyMjA8PFuwyX7gAZj97+T2e9o3d4BWNp84K1NzubTjAB3fH0+fv6N3qP/ir9bW6ozNQCijB8/8zw/TuQ7r4/ndvN5mZgkpPXiis3Pv34+ZPh5t23//79Rwehof/9/NDEgMrOXHvJcrllgpoRN8PFOwy/fzP8+gUlgZI/f/5xcPj/69e/37//AUX+/mXRkN555gsOG2xt/5hZQMwF4r9///75++f3nz8nr75gSms82jfvQnT6zqvXPjC8e/srJQHo9P9fvwNtAHmG4f8zZ6dDc3bIyM2LTNlsbtfM9OPHH3FhtqUz3eXX9H+cOy9ZMB2o6t/Pn0DHMPz/b+2wXGTvPlPGFxdcD+mZyjP8+8MUE6sa7a/xo6Pykn1s4zdzIZ6///8zMGpKM2pKAB0jqy4UE7/msKat6Jw5mafrsxNtWZ6/fjvNLW29qv25pQd///n+5+/fxDDVbcc//P/zx/36m5Ub9zL8+7t66yEROcHK7q5bldMBAgwADcRBCuVLfoEAAAAASUVORK5CYII=' });
        languages.push({ key: 'nl', name: 'Nederlands', img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFXSURBVHjaYvzPgAD/UNlYEUAAkuTgCAAIBgJggq5VoAs1qM0vdzmMz362vezjokxPGimkEQ5WoAQEKuK71zwCCKyB4c//J8+BShn+/vv/+w/D399AEox+//8FJH/9/wUU+cUoKw20ASCAWBhEDf/LyDOw84BU//kDtgGI/oARmAHRDJQSFwVqAAggxo8fP/Ly8oKc9P8/AxjiAoyMjA8ePAAIIJZ///5BVIM0MOBWDpRlZPzz5w9AALH8gyvCbz7QBrCJAAHEyKDYX15r/+j1199//v35++/Xn7+///77DST/wMl/f4Dk378K4jx7O2cABBALw7NP77/+ev3xB0gOpOHfr99AdX9/gTVASKCGP//+8XCyMjC8AwggFoZfIHWSwpwQk4CW/AYjsKlA8u+ff////v33998/YPgBnQQQQIzAaGNg+AVGf5AYf5BE/oCjGEIyAQQYAGvKZ4C6+xXRAAAAAElFTkSuQmCC' });
        //languages.push({ key: 'de', name: 'Deutsch', img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGzSURBVHjaYvTxcWb4+53h3z8GZpZff/79+v3n/7/fDAz/GHAAgABi+f37e3FxOZD1Dwz+/v3z9y+E/AMFv3//+Qumfv9et241QACxMDExAVWfOHkJJAEW/gUEP0EQDn78+AHE/gFOQJUAAcQiy8Ag8O+fLFj1n1+/QDp+/gQioK7fP378+vkDqOH39x9A/RJ/gE5lAAhAYhzcAACCQBDkgRXRjP034R0IaDTZTFZn0DItot37S94KLOINerEcI7aKHAHE8v/3r/9//zIA1f36/R+o4tevf1ANYNVA9P07RD9IJQMDQACxADHD3z8Ig4GMHz+AqqHagKp//fwLVA0U//v7LwMDQACx/LZiYFD7/5/53/+///79BqK/EMZ/UPACSYa/v/8DyX9A0oTxx2EGgABi+a/H8F/m339BoCoQ+g8kgRaCQvgPJJiBYmAuw39hxn+uDAABxMLwi+E/0PusRkwMvxhBGoDkH4b/v/+D2EDyz///QB1/QLb8+sP0lQEggFh+vGXYM2/SP6A2Zoaf30Ex/J+PgekHwz9gQDAz/P0FYrAyMfz7wcDAzPDtFwNAgAEAd3SIyRitX1gAAAAASUVORK5CYII=' });
        $languagesProvider.setLanguages(languages);
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
                    }
                    else {
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
        '$filter',
        '$locale',
        function (filter, locale) {
            return function (amount, currencySymbol) {
                if (isNaN(amount))
                    return "";
                var millions = amount / 1000000;
                return String.format("{0:N1}", millions);
            };
        }
    ]).filter('format', [
        '$filter',
        '$locale',
        function (filter, locale) {
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
                    return parseInt(data.replace('%', '')) / 100; //converted
                });
                ngModelController.$formatters.push(function (data) {
                    if (data == null)
                        return '';
                    return Math.round((data * 100)) + '%'; //converted
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