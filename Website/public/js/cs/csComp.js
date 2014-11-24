var csComp;
(function (csComp) {
    (function (GeoJson) {
        var Feature = (function () {
            function Feature() {
            }
            return Feature;
        })();
        GeoJson.Feature = Feature;

        (function (DrawingModeType) {
            DrawingModeType[DrawingModeType["None"] = 0] = "None";
            DrawingModeType[DrawingModeType["Image"] = 1] = "Image";
            DrawingModeType[DrawingModeType["Point"] = 2] = "Point";
            DrawingModeType[DrawingModeType["Square"] = 3] = "Square";
            DrawingModeType[DrawingModeType["Rectangle"] = 4] = "Rectangle";
            DrawingModeType[DrawingModeType["Line"] = 5] = "Line";
            DrawingModeType[DrawingModeType["Circle"] = 6] = "Circle";
            DrawingModeType[DrawingModeType["Freehand"] = 7] = "Freehand";
            DrawingModeType[DrawingModeType["Polyline"] = 8] = "Polyline";
            DrawingModeType[DrawingModeType["Polygon"] = 9] = "Polygon";
            DrawingModeType[DrawingModeType["MultiPolygon"] = 10] = "MultiPolygon";
        })(GeoJson.DrawingModeType || (GeoJson.DrawingModeType = {}));
        var DrawingModeType = GeoJson.DrawingModeType;

        //export enum MetaInfoType {
        //    Text,
        //    TextArea,
        //    Rating,
        //    Number,
        //    Bbcode,
        //    Boolean,
        //    Bit,
        //    Sensor,
        //    Xml,
        //    Options,
        //    Unknown,
        //    Image,
        //    DateTime,
        //    Mediafolder
        //}
        (function (featureFilterType) {
            /** Turn filtering off */
            featureFilterType[featureFilterType["none"] = 0] = "none";

            /** Default for numbers: histogram */
            featureFilterType[featureFilterType["bar"] = 1] = "bar";

            /** Default for text */
            featureFilterType[featureFilterType["text"] = 2] = "text";
        })(GeoJson.featureFilterType || (GeoJson.featureFilterType = {}));
        var featureFilterType = GeoJson.featureFilterType;

        var MetaInfo = (function () {
            function MetaInfo() {
                this.visibleInCallOut = true;
                this.canEdit = false;
                this.isSearchable = true;
            }
            return MetaInfo;
        })();
        GeoJson.MetaInfo = MetaInfo;
    })(csComp.GeoJson || (csComp.GeoJson = {}));
    var GeoJson = csComp.GeoJson;
})(csComp || (csComp = {}));
var BaseMapList;
(function (BaseMapList) {
    BaseMapList.html = '<div>    <h4 class="leftpanel-header" translate="MAP"></h4>    <div data-ng-repeat="(key, value) in vm.$mapService.baseLayers" style="clear:left;">        <div ng-click="vm.selectBaseLayer(key);" class="select-basestyle">            <img data-ng-src="{{value.options.preview}}" class="preview-base-layer" style="margin-bottom:5px" />            <div style="margin:3px;float:left">                <span style="font-size: 18px;font-weight: bold;">{{key}}</span><br />                {{value.options.subtitle}}            </div>        </div>    </div></div>';
})(BaseMapList || (BaseMapList = {}));
var BaseMapList;
(function (BaseMapList) {
    /**
    * Config
    */
    var moduleName = 'csWeb.baseMapList';

    /**
    * Module
    */
    BaseMapList.myModule;
    try  {
        BaseMapList.myModule = angular.module(moduleName);
    } catch (err) {
        // named module does not exist, so create one
        BaseMapList.myModule = angular.module(moduleName, []);
    }

    /**
    * Directive to display the available map layers.
    */
    BaseMapList.myModule.directive('baseMapList', [
        '$window', '$compile',
        function ($window, $compile) {
            return {
                terminal: false,
                restrict: 'E',
                scope: {},
                template: BaseMapList.html,
                //compile : el          => {    // I need to explicitly compile it in order to use interpolation like {{xxx}}
                //    var fn                        = $compile(el);
                //    return scope                  => {
                //        fn(scope);
                //    };
                //},
                link: function (scope, element, attrs) {
                    // Deal with resizing the element list
                    scope.onResizeFunction = function () {
                        var filterHeight = 50;
                        var paginationCtrlHeight = 100;
                        var itemHeight = 60;

                        //scope.windowHeight          = $window.innerHeight;
                        //scope.windowWidth           = $window.innerWidth;
                        scope.numberOfItems = Math.floor(($window.innerHeight - filterHeight - paginationCtrlHeight) / itemHeight);
                    };

                    // Call to the function when the page is first loaded
                    scope.onResizeFunction();

                    angular.element($window).bind('resize', function () {
                        scope.onResizeFunction();
                        scope.$apply();
                    });
                },
                replace: true,
                transclude: true,
                controller: BaseMapList.BaseMapListCtrl
            };
        }
    ]).directive('bsPopover', function () {
        return function (scope, element, attrs) {
            element.find("a[rel=popover]").popover({ placement: 'right', html: 'true' });
        };
    });
})(BaseMapList || (BaseMapList = {}));
var BaseMapList;
(function (BaseMapList) {
    var BaseMapListCtrl = (function () {
        // dependencies are injected via AngularJS $injector
        // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
        function BaseMapListCtrl($scope, $mapService) {
            this.$scope = $scope;
            this.$mapService = $mapService;
            $scope.vm = this;
        }
        BaseMapListCtrl.prototype.selectBaseLayer = function (key) {
            var bl = this.$mapService.baseLayers[key];
            this.$mapService.changeBaseLayer(bl);
        };
        BaseMapListCtrl.$inject = [
            '$scope',
            'mapService'
        ];
        return BaseMapListCtrl;
    })();
    BaseMapList.BaseMapListCtrl = BaseMapListCtrl;
})(BaseMapList || (BaseMapList = {}));
var DataTable;
(function (DataTable) {
    DataTable.html = '<div>    <div style="width:100%; margin: 10px auto;">        <div style="float: left; width: 15%; margin: 0; padding: 1em">            <!-- Pull down of map layers -->            <select data-ng-model="vm.selectedLayerId"                    data-ng-change="vm.loadLayer()"                    data-ng-options="layer.id as layer.title group by layer.group for layer in vm.layerOptions"                    class="form-control tt-input"></select>            <!-- List of headers -->            <ul class="form-group" style="margin-top: 1em; margin-left: -2em; overflow-y: auto; overflow-x: hidden;"                resize resize-y="150">                <li ng-repeat="mi in vm.metaInfos" class="list-unstyled" style="white-space: nowrap; text-overflow: ellipsis">                    <label>                        <input type="checkbox" name="vm.selectedTitles[]" value="{{mi.title}}"                               data-ng-checked="vm.headers.indexOf(mi.title) > -1"                               data-ng-click="vm.toggleSelection(mi.title)">&nbsp;&nbsp;{{mi.title}}                    </label>                    <!--<div class="checkbox">                        <label>                            <input type="checkbox" name="vm.selectedTitles[]" value="{{mi.title}}"                                   data-ng-checked="vm.headers.indexOf(mi.title) > -1"                                   data-ng-click="vm.toggleSelection(mi.title)">&nbsp;&nbsp;{{mi.title}}                        </label>                    </div>-->                </li>            </ul>            <!--       <pre>{{vm.headers|json}}</pre>-->        </div>        <!-- Right side of the table view -->        <div style="margin-left: 16%; border-left: 1px solid gray; padding: 1em;" ng-init="poiTypeFilter">            <!-- Filter -->            <div class="has-feedback" style="margin-bottom: 1em; float: right; width: 16%; min-width: 200px;">                <span style="direction: ltr; position: static; display: block;">                    <input id="searchbox" data-ng-model="featureFilter" type="text"                           placeholder="Filter" autocomplete="off" spellcheck="false"                           style="position: relative; vertical-align: top;" class="form-control tt-input">                </span>                <span id="searchicon" class="fa form-control-feedback fa-filter" style="padding-top: 0px;"></span>            </div>            <!--Download to CSV option-->            <a href="" data-ng-click="vm.downloadCsv()" alt="Download CSV" style="margin-top: 5px; margin-right: 1em; float: right;"><i class="fa fa-download fa-2x"></i></a>            <!-- Specify how many items to show -->            <select data-ng-model="vm.numberOfItems" style="margin-bottom: 1em; margin-right: 10px; float: left; width: 16%; min-width: 200px;" class="form-control tt-input">                <option value="5" translate="SHOW5"></option>                <option value="10" translate="SHOW10"></option>                <option value="15" translate="SHOW15"></option>                <option value="20" translate="SHOW20"></option>                <option value="25" translate="SHOW25"></option>                <option value="30" translate="SHOW30"></option>                <option value="35" translate="SHOW35"></option>                <option value="40" translate="SHOW40"></option>            </select>            <!-- Data table -->            <table class="table table-striped table-condensed">                <tr>                    <th data-ng-repeat="header in vm.headers track by $index">                        {{header}}&nbsp;                        <a data-ng-click="reverseSort = !reverseSort; vm.orderBy($index, reverseSort);"><i data-ng-class="vm.sortOrderClass($index, reverseSort)">&nbsp;&nbsp;</i></a>                    </th>                </tr>                <tr dir-paginate="row in vm.rows | filter:featureFilter | itemsPerPage: vm.numberOfItems"                    style="cursor: pointer; vertical-align: central">                    <td data-ng-class="{\'text-right\': field.type == \'number\'}" data-ng-repeat="field in row track by $index" data-ng-bind-html="vm.toTrusted(field.displayValue)"></td>                </tr>            </table>            <dir-pagination-controls style="" max-size="10" boundary-links="true" direction-links="true"                                     template-url="bower_components/angular-utils-pagination/dirPagination.tpl.html"></dir-pagination-controls>        </div>    </div>    <div style="clear: both; margin: 0; padding: .5em"></div></div>';
})(DataTable || (DataTable = {}));
var DataTable;
(function (DataTable) {
    /**
    * Config
    */
    var moduleName = 'csWeb.datatable';

    /**
    * Module
    */
    DataTable.myModule;
    try  {
        DataTable.myModule = angular.module(moduleName);
    } catch (err) {
        // named module does not exist, so create one
        DataTable.myModule = angular.module(moduleName, []);
    }

    /**
    * Directive to display a feature's properties in a panel.
    *
    * @seealso : http://www.youtube.com/watch?v=gjJ5vLRK8R8&list=UUGD_0i6L48hucTiiyhb5QzQ
    * @seealso : http://plnkr.co/edit/HyBP9d?p=preview
    */
    DataTable.myModule.directive('datatable', [
        '$compile',
        function ($compile) {
            return {
                terminal: false,
                restrict: 'E',
                scope: {},
                template: DataTable.html,
                //compile   : el => {     // I need to explicitly compile it in order to use interpolation like {{xxx}}
                //    var fn = $compile(el);
                //    return scope => {
                //        fn(scope);
                //    };
                //},
                replace: true,
                transclude: true,
                controller: DataTable.DataTableCtrl
            };
        }
    ]);
})(DataTable || (DataTable = {}));
var DataTable;
(function (DataTable) {
    /**
    * Represents a field in the table.
    * The value is the actual displayValue shown, the type is the metainfo type (e.g. number or text, useful when aligning the data), and the header is used for sorting.
    */
    var TableField = (function () {
        function TableField(displayValue, originalValue, type, header) {
            this.displayValue = displayValue;
            this.originalValue = originalValue;
            this.type = type;
            this.header = header;
        }
        return TableField;
    })();
    DataTable.TableField = TableField;

    var DataTableCtrl = (function () {
        // dependencies are injected via AngularJS $injector
        // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
        function DataTableCtrl($scope, $http, $sce, $translate, $layerService, $localStorageService, $messageBusService) {
            var _this = this;
            this.$scope = $scope;
            this.$http = $http;
            this.$sce = $sce;
            this.$translate = $translate;
            this.$layerService = $layerService;
            this.$localStorageService = $localStorageService;
            this.$messageBusService = $messageBusService;
            this.mapLabel = "map";
            this.numberOfItems = 10;
            this.layerOptions = [];
            this.metaInfos = [];
            this.headers = [];
            this.rows = [];
            // 'vm' stands for 'view model'. We're adding a reference to the controller to the scope
            // for its methods to be accessible from view / HTML
            $scope.vm = this;

            $translate('MAP_FEATURES').then(function (translation) {
                _this.layerOptions[0].title = translation;
            });

            this.bindToStorage('vm.numberOfItems', 10);
            this.numberOfItems = $localStorageService.get('vm.numberOfItems');
            this.bindToStorage('vm.selectedLayerId', this.mapLabel);

            if (this.$layerService.project == null || this.$layerService.project.groups == null)
                return;
            this.updateLayerOptions();
            this.loadLayer();
        }
        /**
        * Add a label to local storage and bind it to the scope.
        */
        DataTableCtrl.prototype.bindToStorage = function (label, defaultValue) {
            if (this.$localStorageService.get(label) === null)
                this.$localStorageService.set(label, defaultValue); // You first need to set the key
            this.$localStorageService.bind(this.$scope, label);
        };

        /**
        * Create a list of layer options and select the one used previously.
        */
        DataTableCtrl.prototype.updateLayerOptions = function () {
            var _this = this;
            this.layerOptions.push({
                "group": '',
                "id": this.mapLabel,
                "title": this.mapFeatureTitle
            });
            if (this.$layerService.project == null || this.$layerService.project.groups == null)
                return;
            this.$layerService.project.groups.forEach(function (group) {
                group.layers.forEach(function (layer) {
                    _this.layerOptions.push({
                        "group": group.title,
                        "id": layer.id,
                        "title": layer.title
                    });
                });
            });
            this.selectedLayerId = this.$localStorageService.get('vm.selectedLayerId');
        };

        DataTableCtrl.prototype.loadLayer = function () {
            var _this = this;
            if (!this.selectedLayerId || this.selectedLayerId === this.mapLabel)
                return this.loadMapLayers();
            var selectedLayer = this.findLayerById(this.selectedLayerId);
            if (selectedLayer == null)
                return this.loadMapLayers();
            this.$http.get(selectedLayer.url).success(function (data) {
                _this.dataset = data;
                if (data.poiTypes == null)
                    data.poiTypes = {};
                data.features.forEach(function (f) {
                    f.featureTypeName = f.properties['PoiTypeId'];
                    if (!(f.featureTypeName in data.poiTypes))
                        data.poiTypes[f.featureTypeName] = _this.$layerService.featureTypes[f.featureTypeName];
                });

                _this.updateMetaInfo(data);
            }).error(function (data, status, headers, config) {
                _this.$messageBusService.notify("ERROR opening " + selectedLayer.title, "Could not get the data.");
            });
        };

        /**
        * Load the features as visible on the map.
        */
        DataTableCtrl.prototype.loadMapLayers = function () {
            var _this = this;
            this.selectedLayerId = this.mapLabel;
            var data = {
                type: '',
                features: [],
                poiTypes: {}
            };

            // If we are filtering, load the filter results
            this.$layerService.project.groups.forEach(function (group) {
                if (group.filterResult != null)
                    group.filterResult.forEach(function (f) {
                        return data.features.push(f);
                    });
            });

            // Otherwise, take all loaded features
            if (data.features.length === 0)
                data.features = this.$layerService.project.features;

            data.features.forEach(function (f) {
                if (!(f.featureTypeName in data.poiTypes))
                    data.poiTypes[f.featureTypeName] = _this.$layerService.featureTypes[f.featureTypeName];
            });

            this.dataset = data;
            this.updateMetaInfo(data);
        };

        DataTableCtrl.prototype.updateMetaInfo = function (data) {
            var _this = this;
            this.metaInfos = [];
            this.headers = [];
            this.rows = [];
            var titles = [];
            var mis = [];

            // Push the Name, so it always appears on top.
            mis.push({
                label: "Name",
                visibleInCallOut: true,
                title: "Naam",
                type: "text",
                filterType: "text",
                isSearchable: true
            });
            var featureType;
            for (var key in data.poiTypes) {
                featureType = data.poiTypes[key];
                if (featureType.metaInfoKeys != null) {
                    var keys = featureType.metaInfoKeys.split(';');
                    keys.forEach(function (k) {
                        if (k in _this.$layerService.metaInfoData)
                            mis.push(_this.$layerService.metaInfoData[k]);
                        else if (featureType.metaInfoData != null) {
                            var result = $.grep(featureType.metaInfoData, function (e) {
                                return e.label === k;
                            });
                            if (result.length >= 1)
                                mis.push(result);
                        }
                    });
                } else if (featureType.metaInfoData != null) {
                    featureType.metaInfoData.forEach(function (mi) {
                        return mis.push(mi);
                    });
                }
                mis.forEach(function (mi) {
                    if ((mi.visibleInCallOut || mi.label === "Name") && titles.indexOf(mi.title) < 0) {
                        titles.push(mi.title);
                        _this.metaInfos.push(mi);
                    }
                });
            }

            // Select the first couple of headers
            var nmbrOfDefaultSelectedHeaders = 3;
            for (var i = 0; i < nmbrOfDefaultSelectedHeaders; i++) {
                this.headers.push(titles[i]);
            }
            this.rows = this.getRows();
        };

        DataTableCtrl.prototype.toggleSelection = function (metaInfoTitle) {
            var idx = this.headers.indexOf(metaInfoTitle);

            // is currently selected
            if (idx > -1) {
                this.headers.splice(idx, 1);
            } else {
                this.headers.push(metaInfoTitle);
            }
            this.rows = this.getRows();
        };

        DataTableCtrl.prototype.findLayerById = function (id) {
            for (var i = 0; i < this.$layerService.project.groups.length; i++) {
                var group = this.$layerService.project.groups[i];
                for (var j = 0; j < group.layers.length; j++) {
                    var layer = group.layers[j];
                    if (layer.id != id)
                        continue;
                    return layer;
                }
            }
            return null;
        };

        /**
        * Returns the data rows that are relevant for the current selection.
        */
        DataTableCtrl.prototype.getRows = function () {
            var _this = this;
            var meta = [this.headers.length];
            this.metaInfos.forEach(function (mi) {
                // Keep headers and mi in the right order
                var index = _this.headers.indexOf(mi.title);
                if (index >= 0)
                    meta[index] = mi;
            });
            var props = [];
            var displayValue;
            this.dataset.features.forEach(function (f) {
                var row = [];
                meta.forEach(function (mi) {
                    var text = f.properties[mi.label];
                    displayValue = FeatureProps.CallOut.convertPropertyInfo(mi, text);

                    //if (!text)
                    //    text = ' ';
                    //else if (!$.isNumeric(text))
                    //    text = text.replace(/&amp;/g, '&');
                    //switch (mi.type) {
                    //    case "bbcode":
                    //        displayValue = XBBCODE.process({ text: text }).html;
                    //        break;
                    //    case "number":
                    //        if (!$.isNumeric(text)) displayValue ='??';
                    //        else if (!mi.stringFormat)
                    //            displayValue = text.toString();
                    //        else
                    //            displayValue = String.format(mi.stringFormat, parseFloat(text));
                    //        break;
                    //    default:
                    //        displayValue = text;
                    //        break;
                    //}
                    row.push(new TableField(displayValue, text, mi.type, mi.title));
                });
                props.push(row);
            });
            return props;
        };

        /**
        * Generate a font awesome class based on the order.
        */
        DataTableCtrl.prototype.sortOrderClass = function (headerIndex, reverseOrder) {
            var t;
            if (reverseOrder != null && headerIndex == this.sortingColumn) {
                t = ('fa fa-sort-' + ((reverseOrder) ? 'desc' : 'asc'));
            } else {
                t = 'fa fa-sort';
            }
            return t;
        };

        /**
        * Order the rows based on the header index and the order.
        */
        DataTableCtrl.prototype.orderBy = function (headerIndex, reverseOrder) {
            this.sortingColumn = headerIndex;
            this.rows = this.rows.sort(function (a, b) {
                var order;
                if (a[headerIndex].type == 'number')
                    order = a[headerIndex].originalValue > b[headerIndex].originalValue;
                else
                    order = a[headerIndex].originalValue.toLowerCase() > b[headerIndex].originalValue.toLowerCase();
                if (order == reverseOrder)
                    return 1;
                else
                    return -1;
            });
        };

        DataTableCtrl.prototype.downloadCsv = function () {
            var csvRows = [];

            csvRows.push(this.headers.join(';'));

            for (var i = 0; i < this.rows.length; i++) {
                csvRows.push(this.rows[i].map(function (f) {
                    return f.originalValue;
                }).join(';'));
            }

            var csvString = csvRows.join('\r\n');

            var filename = this.mapLabel;
            if (this.selectedLayerId !== this.mapLabel) {
                var layer = this.findLayerById(this.selectedLayerId);
                if (layer)
                    filename = layer.title.replace(' ', '_');
            }
            this.saveData(csvString, filename + '.csv');
        };

        DataTableCtrl.prototype.saveData = function (csvData, filename) {
            if (navigator.msSaveBlob) {
                // IE 10+
                var link = document.createElement('a');
                link.addEventListener("click", function (event) {
                    var blob = new Blob([csvData], { "type": "text/csv;charset=utf-8;" });
                    navigator.msSaveBlob(blob, filename);
                }, false);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else if (!csComp.Helpers.supportsDataUri()) {
                // Older versions of IE: show the data in a new window
                var popup = window.open('', 'csv', '');
                popup.document.body.innerHTML = '<pre>' + csvData + '</pre>';
            } else {
                // Support for browsers that support the data uri.
                var a = document.createElement('a');
                a.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvData);
                a.target = '_blank';
                a.download = filename;
                a.click();
                document.body.removeChild(a);
            }
        };

        /**
        * Convert to trusted html string.
        */
        DataTableCtrl.prototype.toTrusted = function (html) {
            return this.$sce.trustAsHtml(html);
        };
        DataTableCtrl.$inject = [
            '$scope',
            '$http',
            '$sce',
            '$translate',
            'layerService',
            'localStorageService',
            'messageBusService'
        ];
        return DataTableCtrl;
    })();
    DataTable.DataTableCtrl = DataTableCtrl;
})(DataTable || (DataTable = {}));
var FeatureList;
(function (FeatureList) {
    FeatureList.html = '<div style="position: relative;">    <h4 class="leftpanel-header" translate="FEATURES"></h4>    <div class="has-feedback" style="padding:10px 4px 4px 4px;">        <span style="direction: ltr; position: static; display: block;">            <input id="searchbox" data-ng-model="featureFilter.properties" type="text"                   placeholder="Filter" autocomplete="off" spellcheck="false"                   style="position: relative; vertical-align: top;" class="form-control tt-input">        </span>        <span id="searchicon" class="fa form-control-feedback fa-filter" style="padding-top: 10px;"></span>    </div>    <table class="table table-striped table-condensed">        <!--vm.$layerService.features-->        <tr dir-paginate="feature in vm.$layerService.project.features | filter:featureFilter | orderBy:\'properties.Name\' | itemsPerPage: numberOfItems "            data-ng-click="vm.$mapService.zoomTo(feature);vm.$layerService.selectFeature(feature);" style="cursor: pointer; height: 50px; vertical-align: central">            <!--<td>Icon</td>-->            <td>{{ feature.properties.Name }}</td>            <td>                <i class="fa fa-chevron-right pull-right"></i>            </td>        </tr>    </table>    <dir-pagination-controls style="position: absolute; bottom: -80px;" max-size="6" boundary-links="false" direction-links="false" template-url="bower_components/angular-utils-pagination/dirPagination.tpl.html"></dir-pagination-controls></div>';
})(FeatureList || (FeatureList = {}));
var FeatureList;
(function (FeatureList) {
    /**
    * Config
    */
    var moduleName = 'csWeb.featureList';

    /**
    * Module
    */
    FeatureList.myModule;
    try  {
        FeatureList.myModule = angular.module(moduleName);
    } catch (err) {
        // named module does not exist, so create one
        FeatureList.myModule = angular.module(moduleName, []);
    }

    /**
    * Directive to display the available map layers.
    */
    FeatureList.myModule.directive('featureList', [
        '$window', '$compile',
        function ($window, $compile) {
            return {
                terminal: false,
                restrict: 'E',
                scope: {},
                template: FeatureList.html,
                //compile             : el          => {    // I need to explicitly compile it in order to use interpolation like {{xxx}}
                //    var fn                        = $compile(el);
                //    return scope                  => {
                //        fn(scope);
                //    };
                //},
                // Directives that want to modify the DOM typically use the link option.link takes a function with the following signature, function link(scope, element, attrs) { ... } where:
                // scope is an Angular scope object.
                // element is the jqLite - wrapped element that this directive matches.
                // attrs is a hash object with key - value pairs of normalized attribute names and their corresponding attribute values.
                link: function (scope, element, attrs) {
                    // Deal with resizing the element list
                    scope.onResizeFunction = function () {
                        var filterHeight = 50;
                        var paginationCtrlHeight = 100;
                        var itemHeight = 60;

                        //scope.windowHeight          = $window.innerHeight;
                        //scope.windowWidth           = $window.innerWidth;
                        scope.numberOfItems = Math.floor(($window.innerHeight - filterHeight - paginationCtrlHeight) / itemHeight);
                    };

                    // Call to the function when the page is first loaded
                    scope.onResizeFunction();

                    angular.element($window).bind('resize', function () {
                        scope.onResizeFunction();
                        scope.$apply();
                    });
                },
                replace: true,
                transclude: true,
                controller: FeatureList.FeatureListCtrl
            };
        }
    ]).directive('bsPopover', function () {
        return function (scope, element, attrs) {
            element.find("a[rel=popover]").popover({ placement: 'right', html: 'true' });
        };
    });
})(FeatureList || (FeatureList = {}));
var FeatureList;
(function (FeatureList) {
    var FeatureListCtrl = (function () {
        // dependencies are injected via AngularJS $injector
        // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
        function FeatureListCtrl($scope, $layerService, $mapService) {
            this.$scope = $scope;
            this.$layerService = $layerService;
            this.$mapService = $mapService;
            $scope.vm = this;
            $scope.numberOfItems = 10; // This is being reset in the directive upon receiving a resize.
        }
        FeatureListCtrl.$inject = [
            '$scope',
            'layerService',
            'mapService'
        ];
        return FeatureListCtrl;
    })();
    FeatureList.FeatureListCtrl = FeatureListCtrl;
})(FeatureList || (FeatureList = {}));
var FeatureProps;
(function (FeatureProps) {
    FeatureProps.html = '<div data-ng-cloak data-ng-show="showMenu" >    <h4 class="rightpanel-header">        &nbsp;&nbsp;{{callOut.title}}    </h4>        <div class="container-fluid rightpanel-tabs" style="position: relative">            <div class="row" style="overflow:hidden">            <!-- Nav tabs -->            <span id="leftArr" style="display:block;padding:10px;margin-top:5px;position:absolute;background-color:transparent;z-index:2">                <i class="glyphicon glyphicon-chevron-left"></i>            </span>            <span id="rightArr" style="display:block;padding:10px;margin-top:5px;position:absolute;background-color:transparent;z-index:2">                <i class="glyphicon glyphicon-chevron-right"></i>            </span>            <ul class="nav nav-tabs" id="featureTabs" style="margin-left:10px">                <li data-toggle="tab" data-ng-class="{active : $first}" data-ng-repeat="(sectionTitle, section) in callOut.sections" ng-if="section.hasProperties()">                    <a ng-href="#rp-{{$index}}" data-toggle="tab" data-ng-if="section.showSectionIcon()" ng-click="featureTabActivated(sectionTitle, section)"><i class="fa {{section.sectionIcon}}"></i></a>                    <a ng-href="#rp-{{$index}}" data-toggle="tab" data-ng-if="!section.showSectionIcon()" ng-click="featureTabActivated(sectionTitle, section)">{{sectionTitle}}</a>                </li>            </ul>        </div>    </div>    <div class="tab-content" style="top:50px; width:355px; overflow-y: auto; overflow-x: hidden" resize resize-y="150">        <div data-ng-if="!$last" class="tab-pane" data-ng-class="{active : $first}" id="rp-{{$index}}" data-ng-repeat="(sectionTitle, section) in callOut.sections">            <table class="table table-condensed">                <tr popover="{{(item.description) ? item.description : \'\'}}"                    popover-placement="left"                    popover-trigger="mouseenter"                    popover-append-to-body="true"                    data-ng-repeat="item in section.properties">                    <td><a class="fa fa-filter makeNarrow" data-ng-show="item.canFilter" data-ng-click="vm.$layerService.setFilter(item)" style="cursor: pointer"></a></td>                    <td><a class="fa fa-eye makeNarrow" data-ng-show="item.canStyle" data-ng-click="vm.$layerService.setStyle(item)" style="cursor: pointer"></a></td>                    <td>{{item.key}}</td>                    <td class="text-right" data-ng-bind-html="vm.toTrusted(item.value)"></td>                </tr>            </table>        </div>        <!-- Treat last tab (filter) differently -->        <div data-ng-if="$last" class="tab-pane" data-ng-class="{active : $first}" id="rp-{{$index}}" data-ng-repeat="(sectionTitle, section) in callOut.sections">            <!-- Add filter panel to the last rendered element -->            <div class="has-feedback" style="padding:0 4px 4px 4px;">                <span style="direction: ltr; position: static; display: block;">                    <input id="searchbox" data-ng-model="search.key" type="text"                            placeholder="Filter" autocomplete="off" spellcheck="false"                            style="position: relative; vertical-align: top;" class="form-control tt-input">                </span>                <span id="searchicon" class="fa form-control-feedback fa-filter"></span>            </div>            <!--<input style="padding:4px;" class=" form-control" data-ng-model="search" placeholder="...">-->            <table id="searchTextResults" class="table table-condensed">                <tr popover="{{(item.description) ? item.description : \'\'}}"                    popover-placement="left"                    popover-trigger="mouseenter"                    popover-append-to-body="true"                    data-ng-repeat="item in section.properties | filter:search">                    <td><a class="fa fa-filter makeNarrow" data-ng-show="item.canFilter" data-ng-click="vm.$layerService.setFilter(item)"></a></td>                    <td><a class="fa fa-eye makeNarrow" data-ng-show="item.canStyle" data-ng-click="vm.$layerService.setStyle(item)"></a></td>                    <td>{{item.key}}</td>                    <td class="text-right" data-ng-bind-html="vm.toTrusted(item.value)"></td>                </tr>            </table>        </div>    </div></div>';
})(FeatureProps || (FeatureProps = {}));
var FeatureProps;
(function (FeatureProps) {
    /**
    * Config
    */
    var moduleName = 'csWeb.featureprops';

    /**
    * Module
    */
    FeatureProps.myModule;
    try  {
        FeatureProps.myModule = angular.module(moduleName);
    } catch (err) {
        // named module does not exist, so create one
        FeatureProps.myModule = angular.module(moduleName, []);
    }

    /**
    * Directive to display a feature's properties in a panel.
    *
    * @seealso          : http://www.youtube.com/watch?v=gjJ5vLRK8R8&list=UUGD_0i6L48hucTiiyhb5QzQ
    * @seealso          : http://plnkr.co/edit/HyBP9d?p=preview
    */
    FeatureProps.myModule.directive('featureprops', [
        '$compile',
        function ($compile) {
            return {
                terminal: true,
                restrict: 'E',
                scope: {},
                template: FeatureProps.html,
                compile: function (el) {
                    var fn = $compile(el);
                    return function (scope) {
                        fn(scope);
                    };
                },
                replace: true,
                transclude: true,
                controller: FeatureProps.FeaturePropsCtrl
            };
        }
    ]);
})(FeatureProps || (FeatureProps = {}));
var FeatureProps;
(function (FeatureProps) {
    var FeaturePropsOptions = (function () {
        function FeaturePropsOptions(position) {
            this.position = position;
            this.closeButton = true;
            this.autoPan = true;
        }
        return FeaturePropsOptions;
    })();

    var CallOutProperty = (function () {
        function CallOutProperty(key, value, property, canFilter, canStyle, feature, isFilter, description, meta) {
            this.key = key;
            this.value = value;
            this.property = property;
            this.canFilter = canFilter;
            this.canStyle = canStyle;
            this.feature = feature;
            this.isFilter = isFilter;
            this.description = description;
            this.meta = meta;
        }
        return CallOutProperty;
    })();
    FeatureProps.CallOutProperty = CallOutProperty;

    var CallOutSection = (function () {
        function CallOutSection(sectionIcon) {
            this.metaInfos = {};
            this.properties = [];
            this.sectionIcon = sectionIcon;
        }
        CallOutSection.prototype.showSectionIcon = function () {
            return !csComp.StringExt.isNullOrEmpty(this.sectionIcon);
        };

        CallOutSection.prototype.addProperty = function (key, value, property, canFilter, canStyle, feature, isFilter, description, meta) {
            if (description)
                this.properties.push(new CallOutProperty(key, value, property, canFilter, canStyle, feature, isFilter, description, meta));
            else
                this.properties.push(new CallOutProperty(key, value, property, canFilter, canStyle, feature, isFilter, null, meta));
        };

        CallOutSection.prototype.hasProperties = function () {
            return this.properties != null && this.properties.length > 0;
        };
        return CallOutSection;
    })();
    FeatureProps.CallOutSection = CallOutSection;

    var CallOut = (function () {
        function CallOut(type, feature, metaInfoData) {
            var _this = this;
            this.type = type;
            this.feature = feature;
            this.metaInfoData = metaInfoData;
            this.sections = {};

            //if (type == null) this.createDefaultType();
            this.setTitle();

            var infoCallOutSection = new CallOutSection('fa-info');
            var searchCallOutSection = new CallOutSection('fa-filter');
            var displayValue;
            if (type != null) {
                var metaInfos = [];
                if (type.metaInfoKeys != null) {
                    var keys = type.metaInfoKeys.split(';');
                    keys.forEach(function (key) {
                        if (key in metaInfoData)
                            metaInfos.push(metaInfoData[key]);
                        else if (type.metaInfoData != null) {
                            var result = $.grep(type.metaInfoData, function (e) {
                                return e.label === key;
                            });
                            if (result.length >= 1)
                                metaInfos.push(result);
                        }
                    });
                } else if (type.metaInfoData != null) {
                    metaInfos = type.metaInfoData;
                }
                metaInfos.forEach(function (mi) {
                    var callOutSection = _this.getOrCreateCallOutSection(mi.section) || infoCallOutSection;
                    callOutSection.metaInfos[mi.label] = mi;
                    var text = feature.properties[mi.label];
                    displayValue = CallOut.convertPropertyInfo(mi, text);

                    // Skip empty, non-editable values
                    if (!mi.canEdit && csComp.StringExt.isNullOrEmpty(displayValue))
                        return;

                    var canFilter = (mi.type == "number" || mi.type == "text");
                    var canStyle = (mi.type == "number");
                    if (mi.filterType != null)
                        canFilter = mi.filterType.toLowerCase() != "none";
                    if (mi.visibleInCallOut)
                        callOutSection.addProperty(mi.title, displayValue, mi.label, canFilter, canStyle, feature, false, mi.description, mi);
                    searchCallOutSection.addProperty(mi.title, displayValue, mi.label, canFilter, canStyle, feature, false, mi.description);
                });
            }
            if (infoCallOutSection.properties.length > 0)
                this.sections['AAA Info'] = infoCallOutSection; // The AAA is added as the sections are sorted alphabetically
            if (searchCallOutSection.properties.length > 0)
                this.sections['Zzz Search'] = searchCallOutSection;
        }
        /**
        * Convert a property value to a display value using the property info.
        */
        CallOut.convertPropertyInfo = function (mi, text) {
            var displayValue;
            if (!csComp.StringExt.isNullOrEmpty(text) && !$.isNumeric(text))
                text = text.replace(/&amp;/g, '&');
            if (csComp.StringExt.isNullOrEmpty(text))
                return '';
            switch (mi.type) {
                case "bbcode":
                    if (!csComp.StringExt.isNullOrEmpty(mi.stringFormat))
                        text = String.format(mi.stringFormat, text);
                    displayValue = XBBCODE.process({ text: text }).html;
                    break;
                case "number":
                    if (!$.isNumeric(text))
                        displayValue = text;
                    else if (csComp.StringExt.isNullOrEmpty(mi.stringFormat))
                        displayValue = text.toString();
                    else
                        displayValue = String.format(mi.stringFormat, parseFloat(text));
                    break;
                case "rank":
                    var rank = text.split(',');
                    if (rank.length != 2)
                        return text;
                    if (mi.stringFormat)
                        displayValue = String.format(mi.stringFormat, rank[0], rank[1]);
                    else
                        displayValue = String.format("{0) / {1}", rank[0], rank[1]);
                    break;
                default:
                    displayValue = text;
                    break;
            }
            return displayValue;
        };

        ///**
        // * In case we are dealing with a regular JSON file without type information, create a default type.
        // */
        //private createDefaultType(): void {
        //    this.type              = [];
        //    this.type.style        = { nameLabel: "Name", iconHeight: 30, iconWidth: 30 };
        //    this.type.metaInfoData = [];
        //    for (var kvp in this.feature.properties) {
        //        var metaInfo: IMetaInfo = [];
        //        metaInfo.label          = kvp.key;
        //        metaInfo.title          = kvp.key.replace("_", " ");
        //        metaInfo.isSearchable   = true;
        //        metaInfo.type           = MetaInfoType.Text;
        //        this.type.metaInfoData.push(metaInfo);
        //    }
        //}
        CallOut.prototype.getOrCreateCallOutSection = function (sectionTitle) {
            if (csComp.StringExt.isNullOrEmpty(sectionTitle)) {
                return null;
            }
            if (sectionTitle in this.sections)
                return this.sections[sectionTitle];
            this.sections[sectionTitle] = new CallOutSection();
            return this.sections[sectionTitle];
        };

        /**
        * Set the title of the callout to the title of the feature.
        */
        CallOut.prototype.setTitle = function () {
            this.title = CallOut.title(this.type, this.feature);
        };

        CallOut.title = function (type, feature) {
            var title;
            if (type == null || type.style == null || csComp.StringExt.isNullOrEmpty(type.style.nameLabel))
                title = feature.properties['Name'];
            else
                title = feature.properties[type.style.nameLabel];
            if (!csComp.StringExt.isNullOrEmpty(title) && !$.isNumeric(title))
                title = title.replace(/&amp;/g, '&');
            return title;
        };
        return CallOut;
    })();
    FeatureProps.CallOut = CallOut;

    var FeaturePropsCtrl = (function () {
        // dependencies are injected via AngularJS $injector
        // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
        function FeaturePropsCtrl($scope, $location, $sce, $mapService, $layerService, $messageBusService) {
            var _this = this;
            this.$scope = $scope;
            this.$location = $location;
            this.$sce = $sce;
            this.$mapService = $mapService;
            this.$layerService = $layerService;
            this.$messageBusService = $messageBusService;
            /**
            * Callback function
            * @see {http://stackoverflow.com/questions/12756423/is-there-an-alias-for-this-in-typescript}
            * @see {http://stackoverflow.com/questions/20627138/typescript-this-scoping-issue-when-called-in-jquery-callback}
            * @todo {notice the strange syntax using a fat arrow =>, which is to preserve the this reference in a callback!}
            */
            this.sidebarMessageReceived = function (title) {
                switch (title) {
                    case "toggle":
                        _this.$scope.showMenu = !_this.$scope.showMenu;
                        break;
                    case "show":
                        _this.$scope.showMenu = true;
                        break;
                    case "hide":
                        _this.$scope.showMenu = false;
                        break;
                    default:
                }

                // NOTE EV: You need to call apply only when an event is received outside the angular scope.
                // However, make sure you are not calling this inside an angular apply cycle, as it will generate an error.
                if (_this.$scope.$root.$$phase != '$apply' && _this.$scope.$root.$$phase != '$digest') {
                    _this.$scope.$apply();
                }
            };
            this.featureMessageReceived = function (title, feature) {
                switch (title) {
                    case "onFeatureSelect":
                        //console.log(feature);
                        _this.displayFeature(feature);
                        _this.$scope.poi = feature;
                        _this.$scope.autocollapse(true);
                        break;
                    default:
                }
                if (_this.$scope.$root.$$phase != '$apply' && _this.$scope.$root.$$phase != '$digest') {
                    _this.$scope.$apply();
                }
            };
            this.scope = $scope;
            $scope.vm = this;
            $scope.showMenu = false;

            $scope.featureTabActivated = function (sectionTitle, section) {
                $messageBusService.publish('FeatureTab', 'activated', { sectionTitle: sectionTitle, section: section });
            };

            //console.log('SidebarCtrl: constructed');
            $messageBusService.subscribe("sidebar", this.sidebarMessageReceived);
            $messageBusService.subscribe("feature", this.featureMessageReceived);

            var widthOfList = function () {
                var itemsWidth = 0;
                $('#featureTabs>li').each(function () {
                    var itemWidth = $(this).outerWidth();

                    itemsWidth += itemWidth;
                });
                return itemsWidth;
            };

            $scope.autocollapse = function (initializeTabPosition) {
                if (typeof initializeTabPosition === "undefined") { initializeTabPosition = false; }
                //                console.log('autocollapse');
                var tabs = $('#featureTabs');

                //                console.log('#ft.ow(): ' + tabs.outerWidth());
                //                console.log('wol: ' + widthOfList());
                //                console.log('ml: ' + tabs.css('margin-left'));
                if (tabs.outerWidth() < widthOfList() || parseFloat(tabs.css('margin-left')) < 0) {
                    $('#leftArr').show();
                    $('#rightArr').show();
                    if (initializeTabPosition) {
                        tabs.animate({ 'margin-left': '20px' }, 'slow');
                    }
                } else {
                    $('#leftArr').hide();
                    $('#rightArr').hide();
                    if (initializeTabPosition) {
                        tabs.animate({ 'margin-left': '0px' }, 'slow');
                    }
                }
            };

            $scope.autocollapse(true); // when document first loads
            $scope.tabs = $('#featureTabs');
            $scope.tabScrollDelta = $scope.tabs.outerWidth();

            $('#leftArr').click(function () {
                //console.log('leftArr');
                //var tabs = $('#featureTabs');
                var current = parseFloat($scope.tabs.css('margin-left'));
                var min = 20;
                var nextPos = $scope.tabScrollDelta;

                if (current + nextPos > min) {
                    nextPos = min - current;
                }

                $scope.tabs.animate({ 'margin-left': '+=' + nextPos + 'px' }, 'slow', function () {
                    //                    console.log('rightarr hide');
                    $('#rightArr').show();
                    $('#leftArr').show();
                    $scope.autocollapse(false);
                });
            });

            $('#rightArr').click(function () {
                //var tabs = $('#featureTabs');
                var max = widthOfList() - $scope.tabs.outerWidth() + 30;
                var current = Math.abs(parseFloat($scope.tabs.css('margin-left')));
                var nextPos = $scope.tabScrollDelta;
                nextPos = Math.min(max, nextPos);

                $scope.tabs.animate({ 'margin-left': '-=' + nextPos + 'px' }, 'slow', function () {
                    $('#leftArr').show();
                    $('#rightArr').show();

                    $scope.autocollapse(false);
                });
            });
        }
        FeaturePropsCtrl.prototype.toTrusted = function (html) {
            return this.$sce.trustAsHtml(html);
        };

        FeaturePropsCtrl.prototype.displayFeature = function (feature) {
            var featureType = this.$layerService.featureTypes[feature.featureTypeName];
            this.$scope.callOut = new CallOut(featureType, feature, this.$layerService.metaInfoData);

            // Probably not needed
            if (this.$scope.$root.$$phase != '$apply' && this.$scope.$root.$$phase != '$digest') {
                this.$scope.$apply();
            }
        };
        FeaturePropsCtrl.$inject = [
            '$scope',
            '$location',
            '$sce',
            'mapService',
            'layerService',
            'messageBusService'
        ];
        return FeaturePropsCtrl;
    })();
    FeatureProps.FeaturePropsCtrl = FeaturePropsCtrl;
})(FeatureProps || (FeatureProps = {}));
var FilterList;
(function (FilterList) {
    FilterList.html = '<div>    <h4 class="leftpanel-header" translate="FILTERS"></h4>    <div ng-show="vm.$layerService.noFilters" translate="FILTER_INFO"></div>    <a ng-hide="vm.$layerService.noFilters" ng-click="vm.$layerService.resetFilters()"><span class="fa fa-refresh"></span> reset</a>    <div id="filterChart"></div></div>';
})(FilterList || (FilterList = {}));
var FilterList;
(function (FilterList) {
    /**
    * Config
    */
    var moduleName = 'csWeb.filterList';

    /**
    * Module
    */
    FilterList.myModule;
    try  {
        FilterList.myModule = angular.module(moduleName);
    } catch (err) {
        // named module does not exist, so create one
        FilterList.myModule = angular.module(moduleName, []);
    }

    /**
    * Directive to display the available map layers.
    */
    FilterList.myModule.directive('filterList', [
        '$window', '$compile',
        function ($window, $compile) {
            return {
                terminal: false,
                restrict: 'E',
                scope: {},
                template: FilterList.html,
                //compile             : el          => {    // I need to explicitly compile it in order to use interpolation like {{xxx}}
                //    var fn                        = $compile(el);
                //    return scope                  => {
                //        fn(scope);
                //    };
                //},
                link: function (scope, element, attrs) {
                    // Deal with resizing the element list
                    scope.onResizeFunction = function () {
                        var filterHeight = 50;
                        var paginationCtrlHeight = 100;
                        var itemHeight = 60;

                        //scope.windowHeight          = $window.innerHeight;
                        //scope.windowWidth           = $window.innerWidth;
                        scope.numberOfItems = Math.floor(($window.innerHeight - filterHeight - paginationCtrlHeight) / itemHeight);
                    };

                    // Call to the function when the page is first loaded
                    scope.onResizeFunction();

                    angular.element($window).bind('resize', function () {
                        scope.onResizeFunction();
                        scope.$apply();
                    });
                },
                replace: true,
                transclude: true,
                controller: FilterList.FilterListCtrl
            };
        }
    ]).directive('bsPopover', function () {
        return function (scope, element, attrs) {
            element.find("a[rel=popover]").popover({ placement: 'right', html: 'true' });
        };
    });
})(FilterList || (FilterList = {}));
var FilterList;
(function (FilterList) {
    var FilterListCtrl = (function () {
        // dependencies are injected via AngularJS $injector
        // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
        function FilterListCtrl($scope, $layerService) {
            this.$scope = $scope;
            this.$layerService = $layerService;
            $scope.vm = this;
        }
        FilterListCtrl.$inject = [
            '$scope',
            'layerService'
        ];
        return FilterListCtrl;
    })();
    FilterList.FilterListCtrl = FilterListCtrl;
})(FilterList || (FilterList = {}));
var LayersDirective;
(function (LayersDirective) {
    LayersDirective.html = '<div>    <h4 class="leftpanel-header" translate="LAYERS"></h4>    <div data-ng-repeat="group in vm.$layerService.project.groups" style="margin-left: 5px">        <div style="float: left; margin-left: -10px; margin-top: 5px" data-toggle="collapse" data-target="#layergroup_{{group.id}}"><i class="fa fa-chevron-down togglebutton toggle-arrow-down"></i><i class="fa fa-chevron-up togglebutton toggle-arrow-up"></i></div>        <div popover="{{(group.description) ? group.description : \'\'}}"             popover-placement="right"             popover-width="400"             popover-trigger="mouseenter"             class="group-title">{{group.title}}</div>        <div id="layergroup_{{group.id}}" class="collapse in">            <div popover="{{(layer.description) ? layer.description : \'\'}}"                 popover-placement="right"                 popover-trigger="mouseenter"                                  data-ng-repeat="layer in group.layers">                <!--bs-popover>-->                <div style="list-style-type: none; padding: 0;" data-ng-class="{indent: layer.isSublayer}">                    <!--<button type="button" class="btn btn-default" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." data-original-title="" title="">Right</button>-->                    <div ng-hide="group.oneLayerActive" class="checkbox checkbox-primary" style="margin-left: 20px">                        <input type="checkbox" id="cblayer{{layer.id}}" ng-model="layer.enabled" data-ng-click="vm.toggleLayer(layer);">                        <label for="cblayer{{layer.id}}">                            {{layer.title}}                        </label>                    </div>                    <div ng-show="group.oneLayerActive" class="radio radio-primary" style="margin-left: 20px">                        <input type="radio" ng-value="true" id="rblayer{{layer.id}}" ng-model="layer.enabled" data-ng-click="vm.toggleLayer(layer);">                        <label for="rblayer{{layer.id}}">                            {{layer.title}}                        </label>                    </div>                </div>            </div>        </div>    </div></div>';
})(LayersDirective || (LayersDirective = {}));
var LayersDirective;
(function (LayersDirective) {
    /**
    * Config
    */
    var moduleName = 'csWeb.layersDirective';

    /**
    * Module
    */
    LayersDirective.myModule;
    try  {
        LayersDirective.myModule = angular.module(moduleName);
    } catch (err) {
        // named module does not exist, so create one
        LayersDirective.myModule = angular.module(moduleName, []);
    }

    /**
    * Directive to display the available map layers.
    */
    LayersDirective.myModule.directive('layersDirective', [
        '$compile',
        function ($compile) {
            return {
                terminal: true,
                restrict: 'E',
                scope: {},
                template: LayersDirective.html,
                compile: function (el) {
                    var fn = $compile(el);
                    return function (scope) {
                        fn(scope);
                    };
                },
                replace: true,
                transclude: true,
                controller: LayersDirective.LayersDirectiveCtrl
            };
        }
    ]).directive('bsPopover', function () {
        return function (scope, element, attrs) {
            element.find("a[rel=popover]").popover({ placement: 'right', html: 'true' });
        };
    });
})(LayersDirective || (LayersDirective = {}));
var LayersDirective;
(function (LayersDirective) {
    var LayersDirectiveCtrl = (function () {
        // dependencies are injected via AngularJS $injector
        // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
        function LayersDirectiveCtrl($scope, $layerService) {
            this.$scope = $scope;
            this.$layerService = $layerService;
            $scope.vm = this;
        }
        LayersDirectiveCtrl.prototype.toggleLayer = function (layer) {
            layer.enabled = !layer.enabled;
            if (layer.enabled) {
                this.$layerService.addLayer(layer);
            } else {
                this.$layerService.removeLayer(layer);
            }

            // NOTE EV: You need to call apply only when an event is received outside the angular scope.
            // However, make sure you are not calling this inside an angular apply cycle, as it will generate an error.
            if (this.$scope.$root.$$phase != '$apply' && this.$scope.$root.$$phase != '$digest') {
                this.$scope.$apply();
            }
        };
        LayersDirectiveCtrl.$inject = [
            '$scope',
            'layerService'
        ];
        return LayersDirectiveCtrl;
    })();
    LayersDirective.LayersDirectiveCtrl = LayersDirectiveCtrl;
})(LayersDirective || (LayersDirective = {}));
var LegendList;
(function (LegendList) {
    LegendList.html = '<div style="position: relative;">    <h4 class="leftpanel-header" translate="LEGEND"></h4>        <div>        <div ng-repeat="legendItem in legendItems" class="legendItem">            <div class="legendIcon">                <img ng-src="{{legendItem.uri}}" class="legendImage" />            </div><span class="legendText">                {{legendItem.title}}            </span>        </div>    </div></div>';
})(LegendList || (LegendList = {}));
var LegendList;
(function (LegendList) {
    /**
    * Config
    */
    var moduleName = 'csWeb.legendList';

    /**
    * Module
    */
    LegendList.myModule;
    try  {
        LegendList.myModule = angular.module(moduleName);
    } catch (err) {
        // named module does not exist, so create one
        LegendList.myModule = angular.module(moduleName, []);
    }

    /**
    * Directive to display the available map layers.
    */
    LegendList.myModule.directive('legendList', [
        '$window', '$compile',
        function ($window, $compile) {
            return {
                terminal: false,
                restrict: 'E',
                scope: {},
                template: LegendList.html,
                //compile             : el          => {    // I need to explicitly compile it in order to use interpolation like {{xxx}}
                //    var fn                        = $compile(el);
                //    return scope                  => {
                //        fn(scope);
                //    };
                //},
                // Directives that want to modify the DOM typically use the link option.link takes a function with the following signature, function link(scope, element, attrs) { ... } where:
                // scope is an Angular scope object.
                // element is the jqLite - wrapped element that this directive matches.
                // attrs is a hash object with key - value pairs of normalized attribute names and their corresponding attribute values.
                link: function (scope, element, attrs) {
                    // Deal with resizing the element list
                    scope.onResizeFunction = function () {
                        var filterHeight = 50;
                        var paginationCtrlHeight = 100;
                        var itemHeight = 60;

                        //scope.windowHeight          = $window.innerHeight;
                        //scope.windowWidth           = $window.innerWidth;
                        scope.numberOfItems = Math.floor(($window.innerHeight - filterHeight - paginationCtrlHeight) / itemHeight);
                    };

                    // Call to the function when the page is first loaded
                    scope.onResizeFunction();

                    angular.element($window).bind('resize', function () {
                        scope.onResizeFunction();
                        scope.$apply();
                    });
                },
                replace: true,
                transclude: true,
                controller: LegendList.LegendListCtrl
            };
        }
    ]).directive('bsPopover', function () {
        return function (scope, element, attrs) {
            element.find("a[rel=popover]").popover({ placement: 'right', html: 'true' });
        };
    });
})(LegendList || (LegendList = {}));
var LegendList;
(function (LegendList) {
    var LegendListCtrl = (function () {
        // dependencies are injected via AngularJS $injector
        // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
        function LegendListCtrl($scope, $layerService, $mapService, $messageBusService) {
            var _this = this;
            this.$scope = $scope;
            this.$layerService = $layerService;
            this.$mapService = $mapService;
            this.$messageBusService = $messageBusService;
            $scope.vm = this;

            $messageBusService.subscribe('project', function () {
                // Update the legend when a project is loaded.
                _this.updateLegendItems();
            });

            $messageBusService.subscribe('layer', function () {
                // Update the legend when a layer is added or removed.
                _this.updateLegendItems();
            });

            this.updateLegendItems();

            $scope.legendItems = [];

            $scope.numberOfItems = 10; // This is being reset in the directive upon receiving a resize.
        }
        LegendListCtrl.prototype.updateLegendItems = function () {
            var legendItems = [];
            var existingItems = [];
            for (var key in this.$layerService.featureTypes) {
                var ft = this.$layerService.featureTypes[key];
                var uri = this.getImageUri(ft);
                var title = this.getName(key, ft);
                var existingItem = name + uri;
                if (existingItems.indexOf(existingItem) < 0) {
                    existingItems.push(existingItem);
                    legendItems.push({ "title": title, "uri": uri });
                }
            }
            legendItems.sort(function (a, b) {
                if (a.title > b.title)
                    return 1;
                if (a.title < b.title)
                    return -1;
                return 0;
            });
            this.$scope.legendItems = legendItems;
        };

        LegendListCtrl.prototype.getImageUri = function (ft) {
            if (ft.style != null && ft.style.drawingMode.toLowerCase() != "point") {
                if (ft.style.iconUri && ft.style.iconUri.indexOf('_Media') < 0)
                    return ft.style.iconUri;
                else
                    return "includes/images/polygon.png";
            } else if (ft.style != null && ft.style.iconUri != null) {
                return ft.style.iconUri;
            } else {
                return "includes/images/marker.png";
            }
        };

        LegendListCtrl.prototype.getName = function (key, ft) {
            if (ft.name != null) {
                return ft.name;
            } else {
                return key;
            }
        };
        LegendListCtrl.$inject = [
            '$scope',
            'layerService',
            'mapService',
            'messageBusService'
        ];
        return LegendListCtrl;
    })();
    LegendList.LegendListCtrl = LegendListCtrl;
})(LegendList || (LegendList = {}));
var Mca;
(function (Mca) {
    Mca.html = '<div>    <h4 class="leftpanel-header">MCA</h4>    <div>        <select data-ng-model="vm.mca"                data-ng-options="mca.title for mca in vm.availableMcas"                style="width: 75%; margin-bottom:10px;"></select>        <a href="" data-ng-click="vm.createMca()" class="pull-right" style="margin-right:5px;"><i class="fa fa-plus"></i></a>        <a href="" data-ng-click="vm.removeMca(vm.mca)" class="pull-right" style="margin-right:5px;"><i class="fa fa-trash"></i></a>        <a href="" data-ng-click="vm.editMca(vm.mca)" class="pull-right" style="margin-right:5px;"><i class="fa fa-edit"></i></a>    </div>        <!--MCA EDITOR DIALOG-->    <div id="mcaEditorView">        <!--<input type="checkbox" ng-model="showDialog"> Show-->        <div show-modal="vm.showDialog" class="modal fade">            <div class="modal-dialog" data-ng-controller="mcaEditorCtrl">                <div class="modal-content">                    <div class="modal-header">                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>                        <h3 class="modal-title">MCA Editor</h3>                    </div>                    <div class="modal-body">                        <input type="text" data-ng-model="vm.mcaTitle" placeholder="MCA title..." />                        <span><input type="checkbox" data-ng-model="vm.hasRank" style="margin-left: 10px;" />&nbsp;&nbsp;Include rank</span>                        <input type="text" data-ng-if="vm.hasRank" data-ng-model="vm.rankTitle" placeholder="Rank title..." />                        <h4>Select the main feature</h4>                        <select data-ng-model="vm.selectedFeatureType"                                data-ng-change="vm.loadPropertyTypes()"                                data-ng-options="item as item.name for (key, item) in vm.dataset.poiTypes"                                class="form-control"></select>                        <h4>Select the properties</h4>                        <ul class="form-group" style="margin-top: 1em; margin-left: -2em; overflow-y: auto; overflow-x: hidden;"                            resize resize-y="450">                            <li ng-repeat="mi in vm.metaInfos" class="list-unstyled" style="white-space: nowrap; -moz-text-overflow: ellipsis; text-overflow: ellipsis">                                <div>                                    <span>                                        <input type="checkbox" name="vm.selectedTitles[]" value="{{mi.title}}"                                               data-ng-checked="mi.isSelected"                                               data-ng-click="mi.isSelected = !mi.isSelected">&nbsp;&nbsp;{{mi.title}}                                        <span data-ng-if="mi.isSelected" style="margin-left: 10px;">                                            <input type="checkbox" data-ng-model="specifyCategory" /><span>&nbsp;&nbsp;Use category:&nbsp;</span>                                            <input type="text" data-ng-if="specifyCategory" data-ng-model="mi.category" placeholder="..." />                                        </span>                                    </span>                                    <form data-ng-if="mi.isSelected" name="myForm" style="margin-left: 20px;">                                        <label id="scoringFunctions" data-ng-repeat="sf in vm.scoringFunctions">                                            <input type="radio" data-ng-model="mi.scoringFunctionType" value="{{sf.type}}">                                            <a data-ng-href="" data-ng-class="sf.cssClass" data-ng-click="mi.isSelected = !mi.isSelected"></a>                                        </label>                                    </form>                                    <div data-ng-if="mi.scoringFunctionType == 0" style="margin-left: 20px;">                                        input -> score:&nbsp;<input type="text" data-ng-model="mi.scores" placeholder="[x0,y0 x1,y1 ...]" />                                    </div>                                </div>                            </li>                        </ul>                    </div>                    <div class="modal-footer">                        <button type="button" class="btn btn-warning" data-dismiss="modal" data-ng-click="vm.cancel()">Cancel</button>                        <button type="button" class="btn btn-primary" data-dismiss="modal" data-ng-disabled="vm.isDisabled()" data-ng-click="vm.save()">OK</button>                    </div>                </div><!-- /.modal-content -->            </div><!-- /.modal-dialog -->        </div>    </div>    <div data-ng-if="vm.mca">        <ul class="list-unstyled">            <li data-ng-repeat="criterion in vm.mca.criteria">                <div data-ng-style="{\'display\': \'inline-block\', \'margin-bottom\': \'6px\', \'width\':\'10px\', \'height\':\'10px\', \'border\':\'solid 1px black\', \'background-color\': criterion.color}"></div>                <div class="truncate" style="display: inline-block; width: 170px;">{{criterion.getTitle()}}</div>                <div rating class="pull-right" style="margin:0 10px;" ng-model="criterion.userWeight" max="{{vm.mca.userWeightMax}}" readonly="isReadonly"                        state-on="\'fa fa-circle\'" state-off="\'fa fa-circle-o\'"                        data-ng-click="vm.weightUpdated(criterion)"                        on-hover="hoveringOver(value)" on-leave="overStar = null"></div>                <ul class="list-unstyled" style="margin-left: 10px;" data-ng-if="criterion.criteria.length > 0">                    <li data-ng-repeat="crit in criterion.criteria">                        <div data-ng-style="{\'display\': \'inline-block\', \'margin-bottom\': \'6px\', \'width\':\'10px\', \'height\':\'10px\', \'border\':\'solid 1px black\', \'background-color\': crit.color}">                        </div>                        <div class="truncate" style="display: inline-block; width: 150px;">{{crit.getTitle()}}</div>                        <div rating class="pull-right" style="margin:0 10px;" ng-model="crit.userWeight" max="{{vm.mca.userWeightMax}}" readonly="isReadonly"                             state-on="\'fa fa-circle\'" state-off="\'fa fa-circle-o\'"                             data-ng-click="vm.weightUpdated(crit)"                             on-hover="hoveringOver(value)" on-leave="overStar = null"></div>                    </li>                </ul>            </li>        </ul>        <!--<a href="" style="display: inline-block; width: 100%; text-transform: uppercase"           data-ng-click="vm.calculateMca()" translate="MCA_COMPUTE_MGS" translate-values="{ mcaTitle: vm.mca.title }"></a>-->        <h4 data-ng-if="vm.showChart">            <a href="" data-ng-click="vm.weightUpdated(vm.mca)" translate="MCA_TOTAL_RESULT"></a>            <a href="" data-ng-if="vm.selectedCriterion">&gt;&nbsp;{{vm.selectedCriterion.title}}</a>        </h4>        <div style="margin-top: 5px; margin-left: 70px;" id="mcaPieChart"></div>        <div data-ng-if="vm.showFeature">            <h4>{{vm.selectedFeature.properties[\'Name\']}}</h4>            <table class="table table-condensed">                <tr data-ng-repeat="item in vm.properties"                    popover="{{item.description}}"                    popover-placement="right"                    popover-trigger="mouseenter"                    popover-append-to-body="true">                    <td><a class="fa fa-filter makeNarrow" data-ng-if="item.canFilter" data-ng-click="vm.$layerService.setFilter(item)" style="cursor: pointer"></a></td>                    <td><a class="fa fa-eye makeNarrow" data-ng-if="item.canStyle" data-ng-click="vm.setStyle(item)" style="cursor: pointer"></a></td>                    <td>{{item.key}}</td>                    <td class="text-right">{{item.value}}</td>                </tr>            </table>        </div>        <i data-ng-if="!vm.showFeature"><div translate="SHOW_FEATURE_MSG"></div></i>    </div></div>';
})(Mca || (Mca = {}));
var Mca;
(function (Mca) {
    /**
    * Config
    */
    var moduleName = 'csWeb.mca';

    /**
    * Module
    */
    Mca.myModule;
    try  {
        Mca.myModule = angular.module(moduleName);
    } catch (err) {
        // named module does not exist, so create one
        Mca.myModule = angular.module(moduleName, []);
    }

    /**
    * Directive to display an MCA control.
    */
    Mca.myModule.directive('mca', [
        '$window', '$compile',
        function ($window, $compile) {
            return {
                terminal: true,
                restrict: 'EA',
                scope: {},
                template: Mca.html,
                compile: function (el) {
                    var fn = $compile(el);
                    return function (scope) {
                        fn(scope);
                    };
                },
                replace: true,
                transclude: true,
                controller: Mca.McaCtrl
            };
        }
    ]).directive('bsPopover', function () {
        return function (scope, element, attrs) {
            element.find("a[rel=popover]").popover({ placement: 'right', html: 'true' });
        };
    });
})(Mca || (Mca = {}));
var Mca;
(function (Mca) {
    // DONE MCA Editor
    // DONE Adding MCA definitions to the project file
    // TODO Localize
    // TODO Edit and delete an MCA
    // TODO Save MCA after changing a value
    // TODO Optimize me button.
    // TODO Save the project file
    var McaCtrl = (function () {
        function McaCtrl($scope, $modal, $translate, $localStorageService, $layerService, messageBusService) {
            var _this = this;
            this.$scope = $scope;
            this.$modal = $modal;
            this.$translate = $translate;
            this.$localStorageService = $localStorageService;
            this.$layerService = $layerService;
            this.messageBusService = messageBusService;
            this.showDialog = false;
            this.availableMcas = [];
            /** Add or delete the received MCA model. */
            this.mcaMessageReceived = function (title, data) {
                if (!data || !data.mca)
                    return;
                switch (title) {
                    case "add":
                        _this.addMca(data.mca);
                        break;
                    case "delete":
                        _this.deleteMca(data.mca);
                        break;
                }
            };
            this.featureMessageReceived = function (title, feature) {
                switch (title) {
                    case "onFeatureSelect":
                        _this.updateSelectedFeature(feature);
                        break;
                    case "onFeatureDeselect":
                        _this.showFeature = false;
                        _this.selectedFeature = null;
                        _this.drawChart();
                        break;
                    default:
                        console.log(title);
                        break;
                }
                if (_this.$scope.$root.$$phase != '$apply' && _this.$scope.$root.$$phase != '$digest') {
                    _this.$scope.$apply();
                }
            };
            $scope.vm = this;

            messageBusService.subscribe('layer', function (title) {
                switch (title) {
                    case 'activated':
                    case 'deactivate':
                        _this.updateAvailableMcas();
                        _this.calculateMca();
                        break;
                }
            });

            messageBusService.subscribe('project', function (title) {
                switch (title) {
                    case 'loaded':
                        if (typeof $layerService.project.mcas === 'undefined' || $layerService.project.mcas == null)
                            $layerService.project.mcas = [];
                        var mcas = _this.$localStorageService.get(McaCtrl.mcas);
                        if (typeof mcas === 'undefined' || mcas === null)
                            return;
                        mcas.forEach(function (mca) {
                            $layerService.project.mcas.push(new Mca.Models.Mca().deserialize(mca));
                        });
                        _this.createDummyMca();
                        break;
                }
            });

            messageBusService.subscribe("feature", this.featureMessageReceived);
            messageBusService.subscribe("mca", this.mcaMessageReceived);

            $translate('MCA_DELETE_MSG').then(function (translation) {
                McaCtrl.confirmationMsg1 = translation;
            });
            $translate('MCA_DELETE_MSG2').then(function (translation) {
                McaCtrl.confirmationMsg2 = translation;
            });
        }
        McaCtrl.prototype.createDummyMca = function () {
            var mca = new Mca.Models.Mca();
            mca.title = 'Mijn Zelfredzaamheid';
            mca.description = 'Analyse van de zelfredzaamheid van een gemeente.';
            mca.label = 'mca_zelfredzaamheid';
            mca.stringFormat = '{0:0.0}';
            mca.rankTitle = 'Positie';
            mca.rankDescription = 'Relatieve positie in de lijst.';
            mca.rankFormat = '{0} van {1}';
            mca.userWeightMax = 5;
            mca.featureIds = ['cities_Default'];

            var criterion = new Mca.Models.Criterion();
            criterion.label = 'p_00_14_jr';
            criterion.scores = '[0,0 20,1]';
            criterion.userWeight = 1;
            mca.criteria.push(criterion);

            criterion = new Mca.Models.Criterion();
            criterion.label = 'p_15_24_jr';
            criterion.scores = '[0,0 20,1]';
            criterion.userWeight = 1;
            mca.criteria.push(criterion);

            criterion = new Mca.Models.Criterion();
            criterion.label = 'p_65_eo_jr';
            criterion.scores = '[0,0 25,1]';
            criterion.userWeight = 3;
            mca.criteria.push(criterion);
            this.$layerService.project.mcas.push(mca);

            mca = new Mca.Models.Mca();
            mca.title = 'test';
            mca.label = 'mca_test';
            mca.stringFormat = '{0:0.0}';
            mca.rankTitle = 'Rang';
            mca.rankFormat = '{0} van {1}';
            mca.userWeightMax = 3;
            mca.featureIds = ['cities_Default'];

            criterion = new Mca.Models.Criterion();
            criterion.label = 'p_15_24_jr';
            criterion.scores = '[0,0 20,1]';
            criterion.userWeight = 1;
            mca.criteria.push(criterion);

            criterion = new Mca.Models.Criterion();
            criterion.label = 'p_65_eo_jr';
            criterion.scores = '[0,0 25,1]';
            criterion.userWeight = 3;
            mca.criteria.push(criterion);
            this.$layerService.project.mcas.push(mca);
        };

        McaCtrl.prototype.weightUpdated = function (criterion) {
            this.addMca(this.mca);
            this.calculateMca();
            this.drawChart(criterion);
        };

        McaCtrl.prototype.editMca = function (mca) {
            this.messageBusService.publish('mca', 'edit', { mca: mca });
            this.showDialog = true;
        };

        McaCtrl.prototype.createMca = function () {
            this.messageBusService.publish('mca', 'create');
            this.showDialog = true;
        };

        McaCtrl.prototype.removeMca = function (mca) {
            var _this = this;
            if (!mca)
                return;
            var title = String.format(McaCtrl.confirmationMsg1, mca.title);
            this.messageBusService.confirm(title, McaCtrl.confirmationMsg2, function (result) {
                if (result)
                    _this.deleteMca(mca);
            });
        };

        McaCtrl.prototype.getMcaIndex = function (mca) {
            var mcaIndex = -1;
            var mcas = this.$layerService.project.mcas;
            for (var i = 0; i < mcas.length; i++) {
                if (mcas[i].title != mca.title)
                    continue;
                mcaIndex = i;
                break;
            }
            return mcaIndex;
        };

        McaCtrl.prototype.addMca = function (mca) {
            if (!mca)
                return;
            this.deleteMca(mca);
            this.$layerService.project.mcas.push(mca);
            this.addMcaToLocalStorage(mca);
            this.updateAvailableMcas();
            this.mca = mca;
            this.calculateMca();
            this.drawPieChart();
        };

        McaCtrl.prototype.deleteMca = function (mca) {
            if (!mca)
                return;
            var mcaIndex = this.getMcaIndex(mca);
            var mcas = this.$layerService.project.mcas;
            if (mcaIndex >= 0)
                mcas.splice(mcaIndex, 1);
            this.removeMcaFromLocalStorage(mca);
            this.updateAvailableMcas();
            if (this.availableMcas.length > 0) {
                this.mca = this.availableMcas[0];
                this.calculateMca();
                this.drawPieChart();
            }
        };

        McaCtrl.prototype.addMcaToLocalStorage = function (mca) {
            var mcas = this.$localStorageService.get(McaCtrl.mcas);
            if (typeof mcas === 'undefined' || mcas === null)
                mcas = [];
            this.removeMcaFromLocalStorage(mca);
            mcas.push(mca);
            this.$localStorageService.set(McaCtrl.mcas, mcas); // You first need to set the key
        };

        McaCtrl.prototype.removeMcaFromLocalStorage = function (mca) {
            var mcas = this.$localStorageService.get(McaCtrl.mcas);
            if (typeof mcas === 'undefined' || mcas === null)
                return;
            var mcaIndex = -1;
            for (var i = 0; i < mcas.length; i++) {
                if (mcas[i].title != mca.title)
                    continue;
                mcaIndex = i;
                break;
            }
            if (mcaIndex < 0)
                return;
            mcas.splice(mcaIndex, 1);
            this.$localStorageService.set(McaCtrl.mcas, mcas); // You first need to set the key
        };

        McaCtrl.prototype.updateSelectedFeature = function (feature) {
            if (typeof feature === 'undefined' || feature == null)
                return;
            this.selectedFeature = feature;
            if (this.mca.label in feature.properties) {
                this.showFeature = true;
                this.properties = [];
                var mi = McaCtrl.createMetaInfo(this.mca);
                var displayValue = FeatureProps.CallOut.convertPropertyInfo(mi, feature.properties[mi.label]);
                this.properties.push(new FeatureProps.CallOutProperty(mi.title, displayValue, mi.label, true, true, feature, false, mi.description));
                if (this.mca.rankTitle) {
                    mi = McaCtrl.createMetaInfoRank(this.mca);
                    displayValue = FeatureProps.CallOut.convertPropertyInfo(mi, feature.properties[mi.label]);
                    this.properties.push(new FeatureProps.CallOutProperty(mi.title, displayValue, mi.label, false, false, feature, false, mi.description));
                }
                this.drawChart();
            }
        };

        McaCtrl.prototype.drawChart = function (criterion) {
            this.showChart = true;
            if (this.showFeature)
                this.drawAsterPlot(criterion);
            else
                this.drawPieChart(criterion);
        };

        McaCtrl.prototype.getParentOfSelectedCriterion = function (criterion) {
            var _this = this;
            var parent;
            this.mca.update();
            if (typeof criterion === 'undefined' || this.mca.criteria.indexOf(criterion) >= 0) {
                this.selectedCriterion = null;
                parent = this.mca.criteria;
            } else {
                this.mca.criteria.forEach(function (c) {
                    if (c.criteria.indexOf(criterion) >= 0) {
                        _this.selectedCriterion = c;
                        parent = c.criteria;
                    }
                });
            }
            return parent;
        };

        McaCtrl.prototype.drawAsterPlot = function (criterion) {
            var _this = this;
            if (!this.mca || !this.selectedFeature)
                return;
            var currentLevel = this.getParentOfSelectedCriterion(criterion);
            if (typeof currentLevel === 'undefined' || currentLevel == null)
                return;
            var data = [];
            var i = 0;
            currentLevel.forEach(function (c) {
                var pieData = new csComp.Helpers.AsterPieData();
                pieData.id = i++;
                pieData.label = c.getTitle();
                pieData.weight = c.weight;
                pieData.color = c.color;
                pieData.score = c.getScore(_this.selectedFeature) * 100;
                data.push(pieData);
            });
            csComp.Helpers.Plot.drawAsterPlot(100, data, 'mcaPieChart');
        };

        McaCtrl.prototype.drawPieChart = function (criterion) {
            if (!this.mca)
                return;
            var currentLevel = this.getParentOfSelectedCriterion(criterion);
            if (typeof currentLevel === 'undefined' || currentLevel == null)
                return;
            var data = [];
            var i = 0;
            currentLevel.forEach(function (c) {
                var pieData = new csComp.Helpers.PieData();
                pieData.id = i++;
                pieData.label = c.getTitle();
                pieData.weight = c.weight;
                pieData.color = c.color;
                data.push(pieData);
            });
            csComp.Helpers.Plot.drawPie(100, data, 'mcaPieChart');
        };

        /** Based on the currently loaded features, which MCA can we use */
        McaCtrl.prototype.updateAvailableMcas = function () {
            var _this = this;
            this.showChart = false;
            this.mca = null;
            this.availableMcas = [];

            this.$layerService.project.mcas.forEach(function (m) {
                m.featureIds.forEach(function (featureId) {
                    if (_this.availableMcas.indexOf(m) < 0 && featureId in _this.$layerService.featureTypes) {
                        _this.availableMcas.push(m);
                        var featureType = _this.$layerService.featureTypes[featureId];
                        _this.applyPropertyInfoToCriteria(m, featureType);
                    }
                });
            });
            if (this.availableMcas.length > 0)
                this.mca = this.availableMcas[0];
        };

        McaCtrl.prototype.calculateMca = function () {
            var _this = this;
            if (!this.mca)
                return;
            var mca = this.mca;
            mca.featureIds.forEach(function (featureId) {
                if (!(featureId in _this.$layerService.featureTypes))
                    return;
                _this.addPropertyInfo(featureId, mca);
                var features = [];
                _this.$layerService.project.features.forEach(function (feature) {
                    features.push(feature);
                });
                mca.updatePla(features);
                mca.update();
                var tempScores = [];
                var index = 0;
                _this.$layerService.project.features.forEach(function (feature) {
                    var score = mca.getScore(feature);
                    if (mca.rankTitle) {
                        var tempItem = { score: score, index: index++ };
                        tempScores.push(tempItem);
                    }
                    feature.properties[mca.label] = score * 100;
                    _this.$layerService.updateFeature(feature);
                });
                if (mca.rankTitle) {
                    // Add rank information
                    tempScores.sort(function (a, b) {
                        return b.score - a.score;
                    });
                    var length = _this.$layerService.project.features.length;
                    var prevScore = -1;
                    var rank = 1;
                    for (var i = 0; i < length; i++) {
                        var item = tempScores[i];

                        // Assign items with the same value the same rank.
                        if (item.score != prevScore)
                            rank = i + 1;
                        prevScore = item.score;
                        _this.$layerService.project.features[item.index].properties[mca.label + '#'] = rank + ',' + length;
                    }
                }
            });
            this.updateSelectedFeature(this.selectedFeature);
            if (this.selectedFeature)
                this.messageBusService.publish('feature', 'onFeatureSelect', this.selectedFeature);
            if (this.groupStyle)
                this.$layerService.updateStyle(this.groupStyle);
        };

        McaCtrl.prototype.applyPropertyInfoToCriteria = function (mca, featureType) {
            mca.criteria.forEach(function (criterion) {
                var label = criterion.label;
                featureType.metaInfoData.forEach(function (propInfo) {
                    if (propInfo.label === label) {
                        criterion.title = propInfo.title;
                        criterion.description = propInfo.description;
                    }
                });
            });
        };

        McaCtrl.prototype.addPropertyInfo = function (featureId, mca) {
            var featureType = this.$layerService.featureTypes[featureId];
            if (featureType.metaInfoData.reduce(function (prevValue, curItem) {
                return prevValue || (curItem.label === mca.label);
            }, false))
                return;

            var mi = McaCtrl.createMetaInfo(mca);
            featureType.metaInfoData.push(mi);

            if (!mca.rankTitle)
                return;
            mi = McaCtrl.createMetaInfoRank(mca);
            featureType.metaInfoData.push(mi);
        };

        McaCtrl.prototype.setStyle = function (item) {
            if (this.groupStyle)
                this.$layerService.updateStyle(this.groupStyle);
            else {
                this.groupStyle = this.$layerService.setStyle(item, false);
                this.groupStyle.colors = ['red', 'green'];
                this.$layerService.updateStyle(this.groupStyle);
            }
        };

        McaCtrl.createMetaInfo = function (mca) {
            var mi = new csComp.GeoJson.MetaInfo();
            mi.title = mca.title;
            mi.label = mca.label;
            mi.type = 'number';
            mi.maxValue = 1;
            mi.minValue = 0;
            mi.description = mca.description;
            mi.stringFormat = mca.stringFormat;
            mi.section = mca.section || 'MCA';
            return mi;
        };

        McaCtrl.createMetaInfoRank = function (mca) {
            var mi = new csComp.GeoJson.MetaInfo();
            mi.title = mca.rankTitle;
            mi.label = mca.label + '#';
            mi.type = 'rank';
            mi.description = mca.rankDescription;
            mi.stringFormat = mca.rankFormat;
            mi.section = mca.section || 'MCA';
            return mi;
        };
        McaCtrl.mcas = 'MCAs';

        McaCtrl.$inject = [
            '$scope',
            '$modal',
            '$translate',
            'localStorageService',
            'layerService',
            'messageBusService'
        ];
        return McaCtrl;
    })();
    Mca.McaCtrl = McaCtrl;
})(Mca || (Mca = {}));
var Mca;
(function (Mca) {
    'use strict';

    var McaEditorCtrl = (function () {
        function McaEditorCtrl($scope, $modal, $layerService, messageBusService) {
            var _this = this;
            this.$scope = $scope;
            this.$modal = $modal;
            this.$layerService = $layerService;
            this.messageBusService = messageBusService;
            this.metaInfos = [];
            this.headers = [];
            this.scoringFunctions = [];
            $scope.vm = this;

            this.scoringFunctions.push(new Mca.Models.ScoringFunction(1 /* Ascending */));
            this.scoringFunctions.push(new Mca.Models.ScoringFunction(2 /* Descending */));
            this.scoringFunctions.push(new Mca.Models.ScoringFunction(3 /* AscendingSigmoid */));
            this.scoringFunctions.push(new Mca.Models.ScoringFunction(4 /* DescendingSigmoid */));
            this.scoringFunctions.push(new Mca.Models.ScoringFunction(5 /* GaussianPeak */));
            this.scoringFunctions.push(new Mca.Models.ScoringFunction(6 /* GaussianValley */));
            this.scoringFunctions.push(new Mca.Models.ScoringFunction(0 /* Manual */));

            messageBusService.subscribe('layer', function (title) {
                switch (title) {
                    case 'activated':
                    case 'deactivate':
                        _this.loadMapLayers();
                        break;
                }
            });

            messageBusService.subscribe('mca', function (title, data) {
                switch (title) {
                    case 'edit':
                        var mca = data.mca;
                        _this.mcaTitle = mca.title;
                        _this.rankTitle = mca.rankTitle;
                        _this.hasRank = _this.rankTitle != '';
                        _this.selectedFeatureType = _this.dataset.poiTypes[mca.featureIds[0]];
                        _this.updateMetaInfo(_this.selectedFeatureType);
                        _this.updateMetaInfoUponEdit(mca);
                        break;
                    case 'create':
                        _this.mcaTitle = '';
                        _this.rankTitle = '';
                        _this.hasRank = false;
                        _this.selectedFeatureType = null;
                        _this.loadMapLayers();
                        break;
                }
            });
        }
        McaEditorCtrl.prototype.updateMetaInfoUponEdit = function (criterion, category) {
            var _this = this;
            criterion.criteria.forEach(function (c) {
                if (c.label) {
                    for (var i in _this.metaInfos) {
                        var mi = _this.metaInfos[i];
                        if (mi.label === c.label)
                            continue;
                        mi.isSelected = true;
                        mi.category = category;
                        break;
                    }
                } else {
                    _this.updateMetaInfoUponEdit(c, c.title);
                }
            });
        };

        McaEditorCtrl.prototype.loadPropertyTypes = function () {
            console.log("loadPropertyTypes");
        };

        /**
        * Load the features as visible on the map.
        */
        McaEditorCtrl.prototype.loadMapLayers = function () {
            var _this = this;
            var data = {
                type: '',
                features: [],
                poiTypes: {}
            };

            // If we are filtering, load the filter results
            this.$layerService.project.groups.forEach(function (group) {
                if (group.filterResult != null)
                    group.filterResult.forEach(function (f) {
                        return data.features.push(f);
                    });
            });

            // Otherwise, take all loaded features
            if (data.features.length === 0)
                data.features = this.$layerService.project.features;

            data.features.forEach(function (f) {
                if (!(f.featureTypeName in data.poiTypes))
                    data.poiTypes[f.featureTypeName] = _this.$layerService.featureTypes[f.featureTypeName];
            });

            this.dataset = data;
            for (var key in data.poiTypes) {
                this.selectedFeatureType = data.poiTypes[key];
                this.updateMetaInfo(this.selectedFeatureType);
                return;
            }
        };

        McaEditorCtrl.prototype.updateMetaInfo = function (featureType) {
            var _this = this;
            this.metaInfos = [];
            this.headers = [];
            var titles = [];
            var mis = [];

            // Push the Name, so it always appears on top.
            mis.push({
                label: "Name",
                visibleInCallOut: true,
                title: "Naam",
                type: "text",
                filterType: "text",
                isSelected: false,
                scoringFunctionType: this.scoringFunctions[0].type
            });
            if (featureType.metaInfoKeys != null) {
                var keys = featureType.metaInfoKeys.split(';');
                keys.forEach(function (k) {
                    if (k in _this.$layerService.metaInfoData)
                        mis.push(_this.$layerService.metaInfoData[k]);
                    else if (featureType.metaInfoData != null) {
                        var result = $.grep(featureType.metaInfoData, function (e) {
                            return e.label === k;
                        });
                        if (result.length >= 1)
                            mis.push(result);
                    }
                });
            } else if (featureType.metaInfoData != null) {
                featureType.metaInfoData.forEach(function (mi) {
                    return mis.push(mi);
                });
            }
            mis.forEach(function (mi) {
                // TODO Later, we could also include categories and not only numbers, where each category represents a certain value.
                if (mi.visibleInCallOut && mi.type === 'number' && mi.label.indexOf("mca_") < 0 && titles.indexOf(mi.title) < 0) {
                    titles.push(mi.title);
                    _this.metaInfos.push(mi);
                }
            });
        };

        McaEditorCtrl.prototype.toggleSelection = function (metaInfoTitle) {
            var idx = this.headers.indexOf(metaInfoTitle);

            // is currently selected
            if (idx > -1) {
                this.headers.splice(idx, 1);
            } else {
                this.headers.push(metaInfoTitle);
            }
        };

        McaEditorCtrl.prototype.isDisabled = function () {
            if (typeof this.mcaTitle === 'undefined' || this.mcaTitle.length === 0)
                return true;
            if (this.hasRank && this.rankTitle && this.rankTitle.length === 0)
                return true;
            if (!this.metaInfos.reduce(function (p, c) {
                return p || c.isSelected;
            }))
                return true;
            return false;
        };

        /**
        * Create a new MCA criterion
        */
        McaEditorCtrl.prototype.save = function () {
            var mca = new Mca.Models.Mca();
            mca.title = this.mcaTitle || 'New MCA criterion';
            mca.label = 'mca_' + mca.title.replace(' ', '_');
            mca.stringFormat = '{0:0.0}';
            if (this.hasRank) {
                mca.rankTitle = this.rankTitle || 'Rank';
                mca.rankFormat = '{0} / {1}';
            }
            mca.userWeightMax = 5;
            for (var key in this.dataset.poiTypes) {
                if (this.dataset.poiTypes[key] === this.selectedFeatureType)
                    mca.featureIds = [key];
            }

            this.metaInfos.forEach(function (mi) {
                if (!mi.isSelected)
                    return;
                var criterion = new Mca.Models.Criterion();
                criterion.label = mi.label;
                criterion.title = mi.title;
                criterion.isPlaScaled = true;
                criterion.description = mi.description;
                criterion.userWeight = 1;

                if (mi.scoringFunctionType === 0 /* Manual */) {
                    criterion.scores = mi.scores;
                } else {
                    criterion.scores = Mca.Models.ScoringFunction.createScores(mi.scoringFunctionType);
                    criterion.isPlaScaled = true;
                }
                if (mi.category) {
                    var parent;
                    for (var i in mca.criteria) {
                        var c = mca.criteria[i];
                        if (c.title != mi.category)
                            continue;
                        parent = c;
                        break;
                    }
                    if (parent == null) {
                        parent = new Mca.Models.Criterion;
                        parent.title = mi.category;
                        parent.isPlaUpdated = false;
                        mca.criteria.push(parent);
                    }
                    parent.criteria.push(criterion);
                } else {
                    mca.criteria.push(criterion);
                }
            });
            this.messageBusService.publish('mca', 'add', { mca: mca });
        };

        McaEditorCtrl.prototype.cancel = function () {
            this.mcaTitle = '';
            this.hasRank = false;
            this.rankTitle = '';
            this.headers = [];
        };
        McaEditorCtrl.$inject = [
            '$scope',
            '$modal',
            'layerService',
            'messageBusService'
        ];
        return McaEditorCtrl;
    })();
    Mca.McaEditorCtrl = McaEditorCtrl;
})(Mca || (Mca = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Mca;
(function (_Mca) {
    (function (Models) {
        (function (ScoringFunctionType) {
            ScoringFunctionType[ScoringFunctionType["Manual"] = 0] = "Manual";
            ScoringFunctionType[ScoringFunctionType["Ascending"] = 1] = "Ascending";
            ScoringFunctionType[ScoringFunctionType["Descending"] = 2] = "Descending";
            ScoringFunctionType[ScoringFunctionType["AscendingSigmoid"] = 3] = "AscendingSigmoid";
            ScoringFunctionType[ScoringFunctionType["DescendingSigmoid"] = 4] = "DescendingSigmoid";
            ScoringFunctionType[ScoringFunctionType["GaussianPeak"] = 5] = "GaussianPeak";
            ScoringFunctionType[ScoringFunctionType["GaussianValley"] = 6] = "GaussianValley";
        })(Models.ScoringFunctionType || (Models.ScoringFunctionType = {}));
        var ScoringFunctionType = Models.ScoringFunctionType;

        /**
        * Scoring function creates a PLA of the scoring algorithm.
        */
        var ScoringFunction = (function () {
            //get img(): string {
            //    return '/includes/images/plot' + csComp.StringExt.Utils.toUnderscore(ScoringFunctionType[this.type]) + '.png';
            //}
            function ScoringFunction(scoringFunctionType) {
                if (typeof scoringFunctionType != 'undefined' && scoringFunctionType != null)
                    this.type = scoringFunctionType;
            }
            Object.defineProperty(ScoringFunction.prototype, "cssClass", {
                get: function () {
                    return ScoringFunctionType[this.type].toLowerCase();
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Create a score based on the type, in which x in [0,10] and y in [0.1].
            * Before applying it, you need to scale the x-axis based on your actual range.
            * Typically, you would map x=0 to the min(x)+0.1*range(x) and x(10)-0.1*range(x) to max(x),
            * i.e. x' = ax+b, where a=100/(8r) and b=-100(min+0.1r)/(8r) and r=max-min
            */
            ScoringFunction.createScores = function (type) {
                var scores;
                switch (type) {
                    default:
                    case 1 /* Ascending */:
                        scores = '[0,0 10,1]';
                        break;
                    case 2 /* Descending */:
                        scores = '[0,1 10,0]';
                        break;
                    case 3 /* AscendingSigmoid */:
                        // http://mathnotepad.com/: f(x) = (3.5+2*atan(x-5))/7
                        // f([0,1,2,3,4,5,6,7,8,9,10])
                        // round(100*f([0,1,2,3,4,5,6,7,8,9,10]))/100
                        // [0.11 0.12 0.14 0.18 0.28 0.5 0.72 0.82 0.86 0.88 0.89]
                        scores = '[0,0.11 1,0.12 2,0.14 3,0.18 4,0.28 5,0.5 6,0.72 7,0.82 8,0.86 9,0.88 10,0.89]';
                        break;
                    case 4 /* DescendingSigmoid */:
                        // 1-f(x)
                        scores = '[0,0.89 1,0.88 2,0.86 3,0.82 4,0.72 5,0.5 6,0.28 7,0.18 8,0.14 9,0.12 10,0.11]';
                        break;
                    case 5 /* GaussianPeak */:
                        // h(x)=3*exp(-((x-u)^2)/(2s^2))/(s*sqrt(2pi))
                        scores = '[0,0 2,0.04 3,0.25 4,0.7 5,1 6,0.7 7,0.25 8,0.04 9,0]';
                        break;
                    case 6 /* GaussianValley */:
                        // 1-h(x)
                        scores = '[0,1 2,0.96 3,0.75 4,0.3 5,0 6,0.3 7,0.75 8,0.96 9,0]';
                        break;
                }
                return scores;
            };
            return ScoringFunction;
        })();
        Models.ScoringFunction = ScoringFunction;

        var ScoringFunctions = (function () {
            function ScoringFunctions() {
            }
            return ScoringFunctions;
        })();
        Models.ScoringFunctions = ScoringFunctions;

        var Criterion = (function () {
            function Criterion() {
                /** Specified weight by the user */
                this.userWeight = 1;
                this.criteria = [];
                /** Piece-wise linear approximation of the scoring function by a set of x and y points */
                this.isPlaUpdated = false;
                /** Piece-wise linear approximation must be scaled:x' = ax+b, where a=100/(8r) and b=-100(min+0.1r)/(8r) and r=max-min */
                this.isPlaScaled = false;
                this.x = [];
                this.y = [];
            }
            Criterion.prototype.deserialize = function (input) {
                var _this = this;
                this.title = input.title;
                this.description = input.description;
                this.label = input.label;
                this.color = input.color;
                this.userWeight = input.userWeight;
                this.weight = input.weight;
                this.isPlaScaled = input.isPlaScaled;
                this.scores = input.scores;
                input.criteria.forEach(function (c) {
                    _this.criteria.push(new Models.Criterion().deserialize(c));
                });
                return this;
            };

            Criterion.prototype.requiresMinimum = function () {
                return this.scores && this.scores.indexOf('min') >= 0;
            };

            Criterion.prototype.requiresMaximum = function () {
                return this.scores && this.scores.indexOf('max') >= 0;
            };

            Criterion.prototype.getTitle = function () {
                if (this.title)
                    return this.title;
                return this.label;
            };

            /**
            * Update the piecewise linear approximation (PLA) of the scoring (a.k.a. user) function,
            * which translates a property value to a MCA value in the range [0,1] using all features.
            */
            Criterion.prototype.updatePla = function (features) {
                var _this = this;
                if (this.isPlaUpdated)
                    return;
                if (this.criteria.length > 0) {
                    this.criteria.forEach(function (c) {
                        c.updatePla(features);
                    });
                    this.isPlaUpdated = true;
                    return;
                }

                // Replace min and max by their values:
                var scores = this.scores;
                var propValues = [];
                if (this.requiresMaximum() || this.requiresMinimum() || this.isPlaScaled) {
                    features.forEach(function (feature) {
                        if (_this.label in feature.properties) {
                            // The property is available
                            propValues.push(feature.properties[_this.label]);
                        }
                    });
                }
                var max = 0, min = 0;
                if (this.isPlaScaled || this.requiresMaximum()) {
                    max = Math.max.apply(null, propValues);
                    scores.replace('max', max.toPrecision(3));
                }
                if (this.isPlaScaled || this.requiresMinimum()) {
                    min = Math.min.apply(null, propValues);
                    scores.replace('min', min.toPrecision(3));
                }

                // Regex to split the scores: [^\d\.]+ and remove empty entries
                var pla = scores.split(/[^\d\.]+/).filter(function (item) {
                    return item.length > 0;
                });

                // Test that we have an equal number of x and y,
                var range = max - min, a = 0.08 * range, b = min + 0.1 * range;

                if (pla.length % 2 != 0)
                    throw Error(this.label + ' does not have an even (x,y) pair in scores.');
                for (var i = 0; i < pla.length / 2; i++) {
                    var x = parseFloat(pla[2 * i]);
                    if (this.isPlaScaled) {
                        // Scale x, i.e. x'=ax+b with x'(0)=min+0.1r and x'(10)=max-0.1r, r=max-min
                        // min+0.1r=b
                        // max-0.1r=10a+b=10a+min+0.1r <=> max-min-0.2r=10a <=> 0.8r=10a <=> a=0.08r
                        x = a * x + b;
                    }
                    if (i > 0 && this.x[i - 1] > x)
                        throw Error(this.label + ': x should increment continuously.');
                    this.x.push(x);

                    // Test that y in [0, 1].
                    var y = parseFloat(pla[2 * i + 1]);
                    if (y < 0)
                        y = 0;
                    else if (y > 1)
                        y = 1;
                    this.y.push(y);
                }
                this.isPlaUpdated = true;
            };

            Criterion.prototype.getScore = function (feature) {
                if (!this.isPlaUpdated)
                    throw ('Error: PLA must be updated for criterion ' + this.title + '!');
                if (this.criteria.length == 0) {
                    // End point: compute the score for each feature
                    if (this.label in feature.properties) {
                        // The property is available
                        var x = feature.properties[this.label];
                        if (x < this.x[0])
                            return this.y[0];
                        var last = this.x.length - 1;
                        if (x > this.x[last])
                            return this.y[last];
                        for (var k in this.x) {
                            if (x < this.x[k]) {
                                // Found relative position of x in this.x
                                var x0 = this.x[k - 1];
                                var x1 = this.x[k];
                                var y0 = this.y[k - 1];
                                var y1 = this.y[k];

                                // Use linear interpolation
                                return (y1 - y0) * (x - x0) / (x1 - x0);
                            }
                        }
                    } else {
                        return 0;
                    }
                } else {
                    // Sum all the sub-criteria.
                    var finalScore = 0;
                    this.criteria.forEach(function (crit) {
                        finalScore += crit.weight * crit.getScore(feature);
                    });
                    return this.weight * finalScore;
                }
                return 0;
            };
            return Criterion;
        })();
        Models.Criterion = Criterion;

        // NOTE: When extending a base class, make sure that the base class has been defined already.
        var Mca = (function (_super) {
            __extends(Mca, _super);
            function Mca() {
                _super.call(this);
                /** Maximum number of star ratings to use to set the weight */
                this.userWeightMax = 5;
                /** Applicable feature ids as a string[]. */
                this.featureIds = [];
                this.weight = 1;
                this.isPlaUpdated = false;
            }
            Mca.prototype.deserialize = function (input) {
                this.section = input.section;
                this.stringFormat = input.stringFormat;
                this.rankTitle = input.rankTitle;
                this.rankDescription = input.rankDescription;
                this.rankFormat = input.rankFormat;
                this.userWeightMax = input.userWeightMax;
                this.featureIds = input.featureIds;
                _super.prototype.deserialize.call(this, input);
                return this;
            };

            /**
            * Update the MCA by calculating the weights and setting the colors.
            */
            Mca.prototype.update = function () {
                this.calculateWeights();
                this.setColors();
            };

            Mca.prototype.calculateWeights = function (criteria) {
                if (!criteria)
                    criteria = this.criteria;
                var totalWeight = 0;
                for (var k in criteria) {
                    var crit = criteria[k];
                    if (crit.criteria.length > 0)
                        this.calculateWeights(crit.criteria);
                    totalWeight += crit.userWeight;
                }
                if (totalWeight > 0) {
                    for (var j in criteria) {
                        var critj = criteria[j];
                        critj.weight = critj.userWeight / totalWeight;
                    }
                }
            };

            /** Set the colors of all criteria and sub-criteria */
            Mca.prototype.setColors = function () {
                var redColors = chroma.scale('RdYlBu').domain([0, this.criteria.length - 1], this.criteria.length);
                var totalSubcrit = 0;
                var i = 0;
                this.criteria.forEach(function (c) {
                    totalSubcrit += c.criteria.length;
                    if (!c.color)
                        c.color = redColors(i++).hex();
                });
                var blueColors = chroma.scale('PRGn').domain([0, totalSubcrit - 1], totalSubcrit);
                i = 0;
                this.criteria.forEach(function (c) {
                    c.criteria.forEach(function (crit) {
                        if (!crit.color)
                            crit.color = blueColors(i++).hex();
                    });
                });
            };
            return Mca;
        })(Criterion);
        Models.Mca = Mca;
    })(_Mca.Models || (_Mca.Models = {}));
    var Models = _Mca.Models;
})(Mca || (Mca = {}));
var Helpers;
(function (Helpers) {
    (function (Resize) {
        /**
        * Config
        */
        var moduleName = 'csWeb.resize';

        /**
        * Module
        */
        Resize.myModule;

        try  {
            Resize.myModule = angular.module(moduleName);
        } catch (err) {
            // named module does not exist, so create one
            Resize.myModule = angular.module(moduleName, []);
        }

        /**
        * Directive to resize an element by settings its width or height,
        * for example to make sure that the scrollbar appears.
        * Typical usage:
        * <div style="overflow-y: auto; overflow-x: hidden" resize resize-x="20" resize-y="250">...</div>
        * Load the directive in your module, e.g.
        * angular.module('myWebApp', ['csWeb.resize'])
        */
        Resize.myModule.directive('resize', [
            '$window',
            function ($window) {
                return {
                    terminal: false,
                    // E = elements, A=attributes and C=css classes. Can be compined, e.g. EAC
                    restrict: 'A',
                    // Name if optional. Text Binding (Prefix: @), One-way Binding (Prefix: &), Two-way Binding (Prefix: =)
                    scope: {
                        resizeX: '@',
                        resizeY: '@'
                    },
                    // Directives that want to modify the DOM typically use the link option.link takes a function with the following signature, function link(scope, element, attrs) { ... } where:
                    // * scope is an Angular scope object.
                    // * element is the jqLite wrapped element that this directive matches.
                    // * attrs is a hash object with key-value pairs of normalized attribute names and their corresponding attribute values.
                    link: function (scope, element, attrs) {
                        scope.onResizeFunction = function () {
                            // console.log(scope.resizeX + "-" + scope.resizeY);
                            if (scope.resizeX) {
                                var windowWidth = $window.innerWidth;
                                element.width((windowWidth - scope.resizeX) + 'px');
                            }
                            if (scope.resizeY) {
                                var windowHeight = $window.innerHeight;
                                element.height((windowHeight - scope.resizeY) + 'px');
                            }
                        };

                        // Call to the function when the page is first loaded
                        scope.onResizeFunction();

                        // Listen to the resize event.
                        angular.element($window).bind('resize', function () {
                            scope.onResizeFunction();
                            scope.$apply();
                        });
                    }
                };
            }
        ]);
    })(Helpers.Resize || (Helpers.Resize = {}));
    var Resize = Helpers.Resize;
})(Helpers || (Helpers = {}));
var ShowModal;
(function (ShowModal) {
    /**
    * Config
    */
    var moduleName = 'csWeb.showModal';

    /**
    * Module
    */
    ShowModal.myModule;

    try  {
        ShowModal.myModule = angular.module(moduleName);
    } catch (err) {
        // named module does not exist, so create one
        ShowModal.myModule = angular.module(moduleName, []);
    }

    /**
    * Directive to show a modal dialog, whose html is specified inside the main HTML code.
    * Typical usage: http://plnkr.co/edit/WJBp7A6M3RB1MLERDXSS?p=info
    * angular.module('myWebApp', ['csWeb.showModal'])
    */
    ShowModal.myModule.directive('showModal', [
        '$parse',
        function ($parse) {
            return {
                restrict: "A",
                link: function (scope, element, attrs) {
                    //Hide or show the modal
                    scope.showModalDialog = function (visible, elem) {
                        if (!elem)
                            elem = element;
                        var myElem = $(elem);

                        if (visible)
                            myElem.appendTo('body').modal("show");
                        else
                            myElem.modal("hide");
                    };

                    //Watch for changes to the modal-visible attribute
                    scope.$watch(attrs.showModal, function (newValue, oldValue) {
                        scope.showModalDialog(newValue, attrs.$$element);
                    });

                    //Update the visible value when the dialog is closed through UI actions (Ok, cancel, etc.)
                    $(element).bind("hide.bs.modal", function () {
                        $parse(attrs.showModal).assign(scope, false);
                        if (!scope.$$phase && !scope.$root.$$phase)
                            scope.$apply();
                    });
                }
            };
        }
    ]);
})(ShowModal || (ShowModal = {}));
var StyleList;
(function (StyleList) {
    StyleList.html = '<div>    <h4 class="leftpanel-header" translate="STYLES"></h4>    <div ng-show="vm.$layerService.noStyles" translate="STYLE_INFO"></div>    <div data-ng-repeat="group in vm.$layerService.project.groups" style="margin-left: 5px">        <div ng-show="group.styles.length">            <div style="float:left;margin-left: -10px; margin-top: 5px" data-toggle="collapse" data-target="#stylegroup_{{group.id}}"><i class="fa fa-chevron-down togglebutton toggle-arrow-down"></i><i class="fa fa-chevron-up togglebutton toggle-arrow-up"></i></div>            <div class="group-title">{{group.title}}</div>            <div id="stylegroup_{{group.id}}" class="collapse in">                <div data-ng-repeat="style in group.styles">                    <div class="checkbox checkbox-primary" style="margin-left:20px;float:left">                        <input type="checkbox" id="cbstyle{{style.id}}" ng-model="style.enabled" data-ng-change="vm.$layerService.updateStyle(style);">                        <label class="style-title" for="cbstyle{{style.id}}" style="width:175px">{{style.title}}</label>                    </div>                    <div style="float:right;margin-top:10px; width: 50px">                        <div data-ng-show="style.canSelectColor" style="float:left">                            <div class="dropdown">                                <div class="style-settings" data-toggle="dropdown">                                    <style>                                                                             </style>                                    <!--<img src="includes/images/fillcolor.png" style="width: 32px; height:32px" />-->                                    <div id="colors" style="border-radius: 50%;width: 20px;height:20px;border-style:solid;border-color: black;border-width: 1px;background: linear-gradient(to right, {{style.colors[0]}} , {{style.colors[1]}})">                                                                        </div>                                    <b class="caret"></b>                                </div>                                <!--<a class="btn btn-primary btn-sm" ng-model="style.visualAspect"  style="padding-left: 10px" href="#"> {{ style.visualAspect }} </a>-->                                <ul class="dropdown-menu" role="menu">                                    <li ng-repeat="(key,val) in style.colorScales" style="margin:3px;cursor: pointer">                                        <span ng-click="$parent.style.colors = val;vm.$layerService.updateStyle($parent.style)"> {{key}} </span>                                    </li>                                </ul>                            </div>                        </div>                        <div style="float:right">                            <div class="dropdown">                                <div class="style-settings" data-toggle="dropdown">                                    <!--<img src="includes/images/fillcolor.png" style="width: 32px; height:32px" />-->                                    <div class="style-aspect style-{{style.visualAspect}}"></div><b class="caret"></b>                                </div>                                <!--<a class="btn btn-primary btn-sm" ng-model="style.visualAspect"  style="padding-left: 10px" href="#"> {{ style.visualAspect }} </a>-->                                <ul class="dropdown-menu" role="menu">                                    <li ng-repeat="title in style.availableAspects" style="margin:3px;cursor: pointer">                                        <i class="style-aspect style-{{title}}" style="float:left" /><span ng-click="$parent.style.visualAspect = title;vm.$layerService.updateStyle($parent.style)"><img class="fa fa-search" style="margin-right: 8px" /> {{title}} </span>                                    </li>                                    <li class="divider"></li>                                    <li style="margin:3px;cursor: pointer"><i class="fa fa-remove" style="margin-right: 8px" style=" float:left" /><span ng-click="vm.$layerService.removeStyle(style)">Verwijder</span></li>                                </ul>                            </div>                        </div>                    </div>                </div>                <!--<div style="right:5px; position:absolute; margin-top: -15px"><a href="#" id="stylepop{{style.id}}" rel="popover" popover-template="template.html"><img src="includes/images/settings.png" width="20px"></a></div>-->            </div>        </div>    </div></div>';
})(StyleList || (StyleList = {}));
var StyleList;
(function (StyleList) {
    /**
    * Config
    */
    var moduleName = 'csWeb.styleList';

    /**
    * Module
    */
    StyleList.myModule;
    try  {
        StyleList.myModule = angular.module(moduleName);
    } catch (err) {
        // named module does not exist, so create one
        StyleList.myModule = angular.module(moduleName, []);
    }

    /**
    * Directive to display the available map layers.
    */
    StyleList.myModule.directive('styleList', [
        '$window', '$compile',
        function ($window, $compile) {
            return {
                terminal: false,
                restrict: 'E',
                scope: {},
                template: StyleList.html,
                //compile             : el          => {    // I need to explicitly compile it in order to use interpolation like {{xxx}}
                //    var fn                        = $compile(el);
                //    return scope                  => {
                //        fn(scope);
                //    };
                //},
                link: function (scope, element, attrs) {
                    // Deal with resizing the element list
                    scope.onResizeFunction = function () {
                        var filterHeight = 50;
                        var paginationCtrlHeight = 100;
                        var itemHeight = 60;

                        //scope.windowHeight          = $window.innerHeight;
                        //scope.windowWidth           = $window.innerWidth;
                        scope.numberOfItems = Math.floor(($window.innerHeight - filterHeight - paginationCtrlHeight) / itemHeight);
                    };

                    // Call to the function when the page is first loaded
                    scope.onResizeFunction();

                    angular.element($window).bind('resize', function () {
                        scope.onResizeFunction();
                        scope.$apply();
                    });
                },
                replace: true,
                transclude: true,
                controller: StyleList.StyleListCtrl
            };
        }
    ]).directive('bsPopover', function () {
        return function (scope, element, attrs) {
            element.find("a[rel=popover]").popover({ placement: 'right', html: 'true' });
        };
    });
})(StyleList || (StyleList = {}));
var StyleList;
(function (StyleList) {
    var StyleListCtrl = (function () {
        // dependencies are injected via AngularJS $injector
        // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
        function StyleListCtrl($scope, $layerService) {
            this.$scope = $scope;
            this.$layerService = $layerService;
            $scope.vm = this;
        }
        StyleListCtrl.$inject = [
            '$scope',
            'layerService'
        ];
        return StyleListCtrl;
    })();
    StyleList.StyleListCtrl = StyleListCtrl;
})(StyleList || (StyleList = {}));
var csComp;
(function (csComp) {
    (function (StringExt) {
        var Utils = (function () {
            function Utils() {
            }
            /** Convert a CamelCase string to one with underscores. */
            Utils.toUnderscore = function (s) {
                return s.replace(/([A-Z])/g, function ($1) {
                    return "_" + $1.toLowerCase();
                });
            };
            return Utils;
        })();
        StringExt.Utils = Utils;

        function isNullOrEmpty(s) {
            return !s;
        }
        StringExt.isNullOrEmpty = isNullOrEmpty;

        /**
        * String formatting
        * 'Added {0} by {1} to your collection'.f(title, artist)
        * 'Your balance is {0} USD'.f(77.7)
        */
        function format(s) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            var i = args.length;

            while (i--) {
                // "gm" = RegEx options for Global search (more than one instance) and for Multiline search
                s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), args[i]);
            }
            return s;
        }
        StringExt.format = format;
        ;

        /*
        * Returns true if we are dealing with a number, false otherwise.
        */
        function isNumber(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }
        StringExt.isNumber = isNumber;

        /*
        * Returns true if we are dealing with a boolean, false otherwise.
        */
        function isBoolean(s) {
            return s === 'true' || s === 'false';
        }
        StringExt.isBoolean = isBoolean;

        /*
        * Returns true if we are dealing with a bbcode, false otherwise.
        */
        function isBbcode(s) {
            return false;
            if (s == null)
                return false;
            return s.indexOf("[b]") > 0 || s.indexOf("[i]") > 0 || s.indexOf("[url") > 0;
        }
        StringExt.isBbcode = isBbcode;
    })(csComp.StringExt || (csComp.StringExt = {}));
    var StringExt = csComp.StringExt;
})(csComp || (csComp = {}));
//module String {
//    export function isNullOrEmpty(s: string): boolean {
//        return !s;
//    }
//}
////interface String {
////    format: () => string;
////    isNullOrEmpty: () => boolean;
////}
////String.prototype.format = function (...args: any[]): string {
////    var formatted = this;
////    for (var i = 0; i < args.length; i++) {
////        formatted = formatted.replace(
////            RegExp("\\{" + i + "\\}", 'g'), args[i].toString());
////    }
////    return formatted;
////};
////String.prototype.isNullOrEmpty = function (): boolean {
////    //var s: string = this;
////    return this.length == 0;
//}
var csComp;
(function (csComp) {
    (function (Helpers) {
        function supportsDataUri() {
            var isOldIE = navigator.appName === "Microsoft Internet Explorer";
            var isIE11 = !!navigator.userAgent.match(/Trident\/7\./);
            return !(isOldIE || isIE11);
        }
        Helpers.supportsDataUri = supportsDataUri;
    })(csComp.Helpers || (csComp.Helpers = {}));
    var Helpers = csComp.Helpers;
})(csComp || (csComp = {}));
var csComp;
(function (csComp) {
    (function (Services) {
        

        // Handle returned when subscribing to a topic
        var MessageBusHandle = (function () {
            function MessageBusHandle(topic, callback) {
                this.topic = topic;
                this.callback = callback;
            }
            return MessageBusHandle;
        })();
        Services.MessageBusHandle = MessageBusHandle;

        /**
        * Simple message bus service, used for subscribing and unsubsubscribing to topics.
        * @see {@link https://gist.github.com/floatingmonkey/3384419}
        */
        var MessageBusService = (function () {
            function MessageBusService() {
                PNotify.prototype.options.styling = "fontawesome";
            }
            /**
            * Publish a notification
            * @title: the title of the notification
            * @text:  the contents of the notification
            */
            MessageBusService.prototype.notify = function (title, text) {
                var options = {
                    title: title,
                    text: text,
                    icon: 'fa fa-info',
                    cornerclass: 'ui-pnotify-sharp',
                    addclass: "stack-bottomright",
                    stack: { "dir1": "up", "dir2": "left", "firstpos1": 25, "firstpos2": 25 }
                };

                var pn = new PNotify(options);
            };

            /**
            * Show a confirm dialog
            * @title           : the title of the notification
            * @text            : the contents of the notification
            * @callback        : the callback that will be called after the confirmation has been answered.
            */
            MessageBusService.prototype.confirm = function (title, text, callback) {
                var options = {
                    title: title,
                    text: text,
                    hide: false,
                    confirm: {
                        confirm: true
                    },
                    buttons: {
                        closer: false,
                        sticker: false
                    },
                    history: {
                        history: false
                    },
                    icon: 'fa fa-question-circle',
                    cornerclass: 'ui-pnotify-sharp',
                    addclass: "stack-topright",
                    stack: { "dir1": "down", "dir2": "left", "firstpos1": 25, "firstpos2": 25 }
                };

                var pn = new PNotify(options).get().on('pnotify.confirm', function () {
                    callback(true);
                }).on('pnotify.cancel', function () {
                    callback(false);
                });
            };

            MessageBusService.prototype.notifyBottom = function (title, text) {
                var stack_bar_bottom = { "dir1": "up", "dir2": "right", "spacing1": 0, "spacing2": 0 };
                var options = {
                    title: "Over Here",
                    text: "Check me out. I'm in a different stack.",
                    addclass: "stack-bar-bottom",
                    cornerclass: "",
                    width: "70%",
                    stack: stack_bar_bottom
                };
                var pn = new PNotify(options);
            };

            /**
            * Publish a notification
            * @title: the title of the notification
            * @text:  the contents of the notification
            */
            MessageBusService.prototype.notifyData = function (data) {
                var pn = new PNotify(data);
                //this.publish("notify", "", data);
            };

            /**
            * Publish to a topic
            */
            MessageBusService.prototype.publish = function (topic, title, data) {
                //window.console.log("publish: " + topic + ", " + title);
                if (!MessageBusService.cache[topic])
                    return;
                MessageBusService.cache[topic].forEach(function (cb) {
                    return cb(title, data);
                });
            };

            //public publish(topic: string, title: string, data?: any): void {
            //	MessageBusService.publish(topic, title, data);
            //}
            /**
            * Subscribe to a topic
            * @param {string} topic The desired topic of the message.
            * @param {IMessageBusCallback} callback The callback to call.
            */
            MessageBusService.prototype.subscribe = function (topic, callback) {
                if (!MessageBusService.cache[topic])
                    MessageBusService.cache[topic] = new Array();
                MessageBusService.cache[topic].push(callback);
                return new MessageBusHandle(topic, callback);
            };

            //public subscribe(topic: string, callback: IMessageBusCallback): MessageBusHandle {
            //	return MessageBusService.subscribe(topic, callback);
            //}
            /**
            * Unsubscribe to a topic by providing its handle
            */
            MessageBusService.prototype.unsubscribe = function (handle) {
                var topic = handle.topic;
                var callback = handle.callback;
                if (!MessageBusService.cache[topic])
                    return;
                MessageBusService.cache[topic].forEach(function (cb, idx) {
                    if (cb == callback) {
                        MessageBusService.cache[topic].splice(idx, 1);
                        return;
                    }
                });
            };
            MessageBusService.cache = {};
            return MessageBusService;
        })();
        Services.MessageBusService = MessageBusService;

        var EventObj = (function () {
            function EventObj() {
            }
            // Events primitives ======================
            EventObj.prototype.bind = function (event, fct) {
                this.myEvents = this.myEvents || {};
                this.myEvents[event] = this.myEvents[event] || [];
                this.myEvents[event].push(fct);
            };
            EventObj.prototype.unbind = function (event, fct) {
                this.myEvents = this.myEvents || {};
                if (event in this.myEvents === false)
                    return;
                this.myEvents[event].splice(this.myEvents[event].indexOf(fct), 1);
            };
            EventObj.prototype.unbindEvent = function (event) {
                this.myEvents = this.myEvents || {};
                this.myEvents[event] = [];
            };
            EventObj.prototype.unbindAll = function () {
                this.myEvents = this.myEvents || {};
                for (var event in this.myEvents)
                    this.myEvents[event] = false;
            };
            EventObj.prototype.trigger = function (event) {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 1); _i++) {
                    args[_i] = arguments[_i + 1];
                }
                this.myEvents = this.myEvents || {};
                if (event in this.myEvents === false)
                    return;
                for (var i = 0; i < this.myEvents[event].length; i++) {
                    this.myEvents[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
                }
            };
            EventObj.prototype.registerEvent = function (evtname) {
                this[evtname] = function (callback, replace) {
                    if (typeof callback == 'function') {
                        if (replace)
                            this.unbindEvent(evtname);

                        this.bind(evtname, callback);
                    }

                    return this;
                };
            };
            EventObj.prototype.registerEvents = function (evtnames) {
                var _this = this;
                evtnames.forEach(function (evtname) {
                    _this.registerEvent(evtname);
                });
            };
            return EventObj;
        })();
        Services.EventObj = EventObj;
    })(csComp.Services || (csComp.Services = {}));
    var Services = csComp.Services;
})(csComp || (csComp = {}));
var csComp;
(function (csComp) {
    (function (Helpers) {
        var PieData = (function () {
            function PieData() {
            }
            return PieData;
        })();
        Helpers.PieData = PieData;

        var AsterPieData = (function (_super) {
            __extends(AsterPieData, _super);
            function AsterPieData() {
                _super.apply(this, arguments);
            }
            return AsterPieData;
        })(PieData);
        Helpers.AsterPieData = AsterPieData;

        var Plot = (function () {
            function Plot() {
            }
            /**
            * Draw a Pie chart.
            */
            Plot.drawPie = function (pieRadius, data, parentId, colorScale, svgId) {
                if (typeof parentId === "undefined") { parentId = 'mcaPieChart'; }
                if (typeof colorScale === "undefined") { colorScale = 'Reds'; }
                if (typeof svgId === "undefined") { svgId = 'the_SVG_ID'; }
                Plot.clearSvg(svgId);

                if (!data)
                    return;

                var width = pieRadius, height = pieRadius, radius = Math.min(width, height) / 2, innerRadius = 0;

                var pie = d3.layout.pie().sort(null).value(function (d) {
                    return d.weight;
                });

                var tip = d3.tip().attr('class', 'd3-tip').offset([0, 0]).html(function (d) {
                    return '<strong>' + d.data.label + ": </strong><span style='color:orangered'>" + Math.round(d.data.weight * 100) + "%</span>";
                });

                var arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(radius);

                var outlineArc = d3.svg.arc().innerRadius(innerRadius).outerRadius(radius);

                var svg = d3.select('#' + parentId).append("svg").attr("id", svgId).attr("width", width).attr("height", height).append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

                svg.call(tip);

                var colors = chroma.scale(colorScale).domain([0, data.length - 1], data.length);
                var path = svg.selectAll(".solidArc").data(pie(data)).enter().append("path").attr("fill", function (d, i) {
                    return d.data.color || colors(i).hex();
                }).attr("class", "solidArc").attr("stroke", "gray").attr("d", arc).on('mouseover', function (d, i) {
                    tip.show(d, i);
                }).on('mouseout', tip.hide);

                var outerPath = svg.selectAll(".outlineArc").data(pie(data)).enter().append("path").attr("fill", "none").attr("stroke", "gray").attr("class", "outlineArc").attr("d", outlineArc);
            };

            /**
            * Draw an Aster Pie chart, i.e. a pie chart with varying radius depending on the score, where the maximum score of 100 equals the pie radius.
            * See http://bl.ocks.org/bbest/2de0e25d4840c68f2db1
            */
            Plot.drawAsterPlot = function (pieRadius, data, parentId, colorScale, svgId) {
                if (typeof parentId === "undefined") { parentId = 'mcaPieChart'; }
                if (typeof colorScale === "undefined") { colorScale = 'Reds'; }
                if (typeof svgId === "undefined") { svgId = 'the_SVG_ID'; }
                Plot.clearSvg(svgId);

                if (!data)
                    return;

                var width = pieRadius, height = pieRadius, radius = Math.min(width, height) / 2, innerRadius = 0.3 * radius;

                var pie = d3.layout.pie().sort(null).value(function (d) {
                    return d.weight;
                });

                var tip = d3.tip().attr('class', 'd3-tip').offset([0, 0]).html(function (d) {
                    return '<strong>' + d.data.label + ": </strong> <span style='color:orangered'>" + Math.round(d.data.weight * 100) + "% x " + Math.round(d.data.score) + "&nbsp; = " + Math.round(d.data.weight * d.data.score) + "</span>";
                });

                var arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(function (d) {
                    return (radius - innerRadius) * (d.data.score / 100.0) + innerRadius;
                });

                var outlineArc = d3.svg.arc().innerRadius(innerRadius).outerRadius(radius);

                var svg = d3.select('#' + parentId).append("svg").attr("id", svgId).attr("width", width).attr("height", height).append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

                try  {
                    svg.call(tip);
                } catch (err) {
                    console.log("Error: " + err.message);
                }

                var colors = chroma.scale(colorScale).domain([0, data.length - 1], data.length);
                var path = svg.selectAll(".solidArc").data(pie(data)).enter().append("path").attr("fill", function (d, i) {
                    return d.data.color || colors(i).hex();
                }).attr("class", "solidArc").attr("stroke", "gray").attr("d", arc).on('mouseover', function (d, i) {
                    tip.show(d, i);
                    //$rootScope.$broadcast('tooltipShown', { id: d.data.id });
                }).on('mouseout', tip.hide);

                var outerPath = svg.selectAll(".outlineArc").data(pie(data)).enter().append("path").attr("fill", "none").attr("stroke", "gray").attr("class", "outlineArc").attr("d", outlineArc);

                // calculate the weighted mean score
                var totalWeight = 0;
                var totalScore = 0;
                data.forEach(function (p) {
                    totalWeight += p.weight;
                    totalScore += p.weight * p.score;
                });

                svg.append("svg:text").attr("class", "aster-score").attr("dy", ".35em").attr("text-anchor", "middle").text(Math.round(totalScore / totalWeight));
            };

            Plot.clearSvg = function (svgId) {
                var svgElement = d3.select('#' + svgId);
                if (svgElement)
                    svgElement.remove();
            };
            Plot.pieColors = ["#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"];
            return Plot;
        })();
        Helpers.Plot = Plot;
    })(csComp.Helpers || (csComp.Helpers = {}));
    var Helpers = csComp.Helpers;
})(csComp || (csComp = {}));
var csComp;
(function (csComp) {
    (function (Services) {
        (function (LayerType) {
            LayerType[LayerType["GeoJson"] = 0] = "GeoJson";
            LayerType[LayerType["Kml"] = 1] = "Kml";
        })(Services.LayerType || (Services.LayerType = {}));
        var LayerType = Services.LayerType;
    })(csComp.Services || (csComp.Services = {}));
    var Services = csComp.Services;
})(csComp || (csComp = {}));
var csComp;
(function (csComp) {
    (function (Services) {
        var SolutionProject = (function () {
            function SolutionProject() {
            }
            return SolutionProject;
        })();
        Services.SolutionProject = SolutionProject;

        

        /**
        * Represents to the overall projects class.
        */
        var Solution = (function () {
            function Solution() {
            }
            return Solution;
        })();
        Services.Solution = Solution;

        var Project = (function () {
            function Project() {
                this.markers = {};
            }
            Project.prototype.deserialize = function (input) {
                this.viewBounds = input.viewBounds;
                this.title = input.title;
                this.description = input.description;
                this.logo = input.logo;
                this.markers = input.markers;
                this.startposition = input.startposition;
                this.features = input.features;
                this.featureTypes = input.featureTypes;
                this.metaInfoData = input.metaInfoData;
                this.groups = input.groups;
                this.mcas = [];
                for (var mca in input.mcas) {
                    this.mcas.push(new Mca.Models.Mca().deserialize(mca));
                }
                return this;
            };
            return Project;
        })();
        Services.Project = Project;

        var PropertyInfo = (function () {
            function PropertyInfo() {
            }
            return PropertyInfo;
        })();
        Services.PropertyInfo = PropertyInfo;

        var ProjectLayer = (function () {
            function ProjectLayer() {
            }
            return ProjectLayer;
        })();
        Services.ProjectLayer = ProjectLayer;

        var GroupFilter = (function () {
            function GroupFilter() {
            }
            return GroupFilter;
        })();
        Services.GroupFilter = GroupFilter;

        var GroupStyle = (function () {
            function GroupStyle($translate) {
                var _this = this;
                this.availableAspects = ["strokeColor", "fillColor", "strokeWidth"];
                this.colorScales = {};

                $translate('WHITE_RED').then(function (translation) {
                    _this.colorScales[translation] = ["white", "red"];
                });
                $translate('RED_WHITE').then(function (translation) {
                    _this.colorScales[translation] = ["red", "white"];
                });
                $translate('GREEN_RED').then(function (translation) {
                    _this.colorScales[translation] = ["green", "red"];
                });
                $translate('RED_GREEN').then(function (translation) {
                    _this.colorScales[translation] = ["red", "green"];
                });
                $translate('WHITE_BLUE').then(function (translation) {
                    _this.colorScales[translation] = ["white", "blue"];
                });
                $translate('BLUE_WHITE').then(function (translation) {
                    _this.colorScales[translation] = ["blue", "white"];
                });
                $translate('WHITE_GREEN').then(function (translation) {
                    _this.colorScales[translation] = ["white", "green"];
                });
                $translate('GREEN_WHITE').then(function (translation) {
                    _this.colorScales[translation] = ["green", "white"];
                });
                $translate('WHITE_ORANGE').then(function (translation) {
                    _this.colorScales[translation] = ["white", "orange"];
                });
                $translate('ORANGE_WHITE').then(function (translation) {
                    _this.colorScales[translation] = ["orange", "white"];
                });
            }
            return GroupStyle;
        })();
        Services.GroupStyle = GroupStyle;

        var ProjectGroup = (function () {
            function ProjectGroup() {
            }
            return ProjectGroup;
        })();
        Services.ProjectGroup = ProjectGroup;

        var LayerService = (function () {
            function LayerService($location, $translate, $messageBusService, $mapService) {
                this.$location = $location;
                this.$translate = $translate;
                this.$messageBusService = $messageBusService;
                this.$mapService = $mapService;
                this.layerGroup = new L.LayerGroup();
                this.info = new L.Control();
                //$translate('FILTER_INFO').then((translation) => console.log(translation));
                // NOTE EV: private props in constructor automatically become fields, so mb and map are superfluous.
                this.mb = $messageBusService;
                this.map = $mapService;
                this.accentColor = "";
                this.title = "";
                this.layerGroup = new L.LayerGroup();
                this.featureTypes = {};
                this.metaInfoData = {};
                this.map.map.addLayer(this.layerGroup);
                this.noStyles = true;
            }
            /**
            * Add a layer
            */
            LayerService.prototype.addLayer = function (layer) {
                var _this = this;
                var disableLayers = [];
                switch (layer.type) {
                    case "GeoJson":
                        async.series([
                            function (callback) {
                                // If oneLayerActive: close other group layer
                                if (layer.group.oneLayerActive) {
                                    layer.group.layers.forEach(function (l) {
                                        if (l != layer && l.enabled) {
                                            disableLayers.push(l);
                                        }
                                    });
                                }
                                callback(null, null);
                            },
                            function (callback) {
                                if (layer.styleurl) {
                                    d3.json(layer.styleurl, function (err, dta) {
                                        if (err)
                                            _this.$messageBusService.notify('ERROR loading' + layer.title, err);
                                        else {
                                            if (dta.poiTypes)
                                                for (var featureTypeName in dta.poiTypes) {
                                                    var featureType = dta.poiTypes[featureTypeName];
                                                    featureTypeName = layer.id + '_' + featureTypeName;
                                                    _this.featureTypes[featureTypeName] = featureType;
                                                }
                                        }
                                        callback(null, null);
                                    });
                                } else
                                    callback(null, null);
                            }, function (callback) {
                                d3.json(layer.url, function (error, data) {
                                    if (error)
                                        _this.$messageBusService.notify('ERROR loading' + layer.title, error);
                                    else {
                                        for (var featureTypeName in data.poiTypes) {
                                            var featureType = data.poiTypes[featureTypeName];
                                            featureTypeName = layer.id + '_' + featureTypeName;
                                            _this.featureTypes[featureTypeName] = featureType;
                                            var pt = "." + featureTypeName;
                                            var icon = featureType.style.iconUri;
                                            var t = "{\".style" + featureTypeName + "\":";
                                            if (featureType.style.iconUri != null) {
                                                t += " { \"background\": \"url(" + featureType.style.iconUri + ") no-repeat right center\",";
                                            }
                                            ;
                                            t += " \"background-size\": \"100% 100%\",\"border-style\": \"none\"} }";
                                            var json = $.parseJSON(t);
                                            $.injectCSS(json);
                                            //console.log(JSON.stringify(poiType, null, 2));
                                        }

                                        if (layer.group.clustering) {
                                            var markers = L.geoJson(data, {
                                                pointToLayer: function (feature, latlng) {
                                                    return _this.addFeature(feature, latlng, layer);
                                                },
                                                onEachFeature: function (feature, lay) {
                                                    //We do not need to init the feature here: already done in style.
                                                    //this.initFeature(feature, layer);
                                                    layer.group.markers[feature.id] = lay;
                                                    lay.on({
                                                        mouseover: function (a) {
                                                            return _this.showFeatureTooltip(a, layer.group);
                                                        },
                                                        mouseout: function (s) {
                                                            return _this.hideFeatureTooltip(s);
                                                        }
                                                    });
                                                }
                                            });
                                            layer.group.cluster.addLayer(markers);
                                        } else {
                                            layer.mapLayer = new L.LayerGroup();
                                            _this.map.map.addLayer(layer.mapLayer);

                                            var v = L.geoJson(data, {
                                                onEachFeature: function (feature, lay) {
                                                    //We do not need to init the feature here: already done in style.
                                                    //this.initFeature(feature, layer);
                                                    layer.group.markers[feature.id] = lay;
                                                    lay.on({
                                                        mouseover: function (a) {
                                                            return _this.showFeatureTooltip(a, layer.group);
                                                        },
                                                        mouseout: function (s) {
                                                            return _this.hideFeatureTooltip(s);
                                                        },
                                                        mousemove: function (d) {
                                                            return _this.updateFeatureTooltip(d);
                                                        },
                                                        click: function () {
                                                            _this.selectFeature(feature);
                                                        }
                                                    });
                                                },
                                                style: function (f, m) {
                                                    _this.initFeature(f, layer);
                                                    layer.group.markers[f.id] = m;
                                                    return _this.style(f, layer);
                                                },
                                                pointToLayer: function (feature, latlng) {
                                                    return _this.addFeature(feature, latlng, layer);
                                                }
                                            });
                                            _this.project.features.forEach(function (f) {
                                                if (f.layerId != layer.id)
                                                    return;
                                                var ft = _this.getFeatureType(f);
                                                f.properties['Name'] = f.properties[ft.style.nameLabel];
                                            });
                                            layer.mapLayer.addLayer(v);
                                        }
                                    }
                                    _this.$messageBusService.publish("layer", "activated", layer);

                                    callback(null, null);
                                    _this.updateFilters();
                                });
                            },
                            function (callback) {
                                disableLayers.forEach(function (l) {
                                    _this.removeLayer(l);
                                    l.enabled = false;
                                });
                            }
                        ]);
                }
            };

            /***
            * get list of properties that are part of the filter collection
            */
            LayerService.prototype.filterProperties = function (group) {
                var result = [];
                if (group.filters != null && group.filters.length > 0) {
                    group.filters.forEach(function (f) {
                        result.push(f.property);
                    });
                }
                ;
                return result;
            };

            /***
            * Show tooltip with name, styles & filters
            */
            LayerService.prototype.showFeatureTooltip = function (e, group) {
                var layer = e.target;
                var feature = layer.feature;

                var content = "<span class='popup-title'>" + layer.feature.properties.Name + " </span>";

                // add filter values
                if (group.filters != null && group.filters.length > 0) {
                    group.filters.forEach(function (f) {
                        if (feature.properties.hasOwnProperty(f.property)) {
                            var value = feature.properties[f.property];
                            if (f.meta != null && !csComp.StringExt.isNullOrEmpty(f.meta.stringFormat)) {
                                value = String.format(f.meta.stringFormat, parseFloat(value));
                            }
                            content += "<br><kimg src='includes/images/filter-black.png' style='width:12px; height:12px; margin-top:4px;float:left; margin-right:4px'/>" + f.title + ":<b>" + value + "</b>";
                        }
                    });
                }

                // add style values
                if (group.styles != null && group.styles.length > 0) {
                    group.styles.forEach(function (s) {
                        if (group.filters != null && group.filters.filter(function (f) {
                            return f.property == s.property;
                        }).length == 0) {
                            if (feature.properties.hasOwnProperty(s.property)) {
                                var value = feature.properties[s.property];

                                //if (f.meta != null && !StringExt.isNullOrEmpty(s.meta.stringFormat)) {
                                //    value = String.format(s.meta.stringFormat, parseFloat(value));
                                //}
                                content += "<br><img src='includes/images/style-black.png' style='width:12px; height:12px; margin-top:4px;float:left; margin-right:4px'/>" + s.title + ":<b>" + value + "</b>";
                            }
                        }
                    });
                }

                this.popup = L.popup({
                    offset: new L.Point(0, -10),
                    closeOnClick: true,
                    autoPan: false
                }).setLatLng(e.latlng).setContent(content).openOn(this.map.map);
            };

            LayerService.prototype.hideFeatureTooltip = function (e) {
                if (this.popup && this.map.map) {
                    this.map.map.closePopup(this.popup);

                    //this.map.map.closePopup(this.popup);
                    this.popup = null;
                }
            };

            LayerService.prototype.updateFeatureTooltip = function (e) {
                if (this.popup != null && e.latlng != null)
                    this.popup.setLatLng(e.latlng);
            };

            //Highlight polyline features on event
            LayerService.prototype.highlightFeature = function (e) {
                var highlightStyle = {
                    "weight": 7
                };
                var layer = e.target;

                layer.bindPopup(layer.feature.properties.Name).openPopup();

                if (!L.Browser.ie) {
                    layer.bringToFront();
                }

                // Change the style to the highlighted version
                layer.setStyle(highlightStyle);
                if (!L.Browser.ie) {
                    layer.bringToFront();
                }
            };

            //Reset polyline style
            LayerService.prototype.resetHighlight = function (e) {
                var defaultStyle = {
                    "weight": 1
                };
                var layer = e.target;
                layer.setStyle(defaultStyle);
            };

            LayerService.prototype.removeStyle = function (style) {
                //console.log('update style ' + style.title);
                var g = style.group;
                g.styles = g.styles.filter(function (s) {
                    return s.id != style.id;
                });

                this.updateGroupFeatures(g);
            };

            LayerService.prototype.updateStyle = function (style) {
                //console.log('update style ' + style.title);
                if (style == null)
                    return;
                if (style.group != null) {
                    style.info = this.calculatePropertyInfo(style.group, style.property);
                    style.canSelectColor = style.visualAspect.toLowerCase().indexOf('color') > -1;
                    this.updateGroupFeatures(style.group);
                }
            };

            LayerService.prototype.updateFeature = function (feature, group) {
                if (feature.geometry.type == "Point") {
                    var layer = this.findLayer(feature.layerId);
                    if (layer != null)
                        this.updateFeatureIcon(feature, layer);
                } else {
                    if (group == null) {
                        var l = this.findLayer(feature.layerId);
                        group = l.group;
                    }
                    if (group == null)
                        return;
                    var m = group.markers[feature.id];
                    this.updatePolygonStyle(m, feature);
                }
            };

            LayerService.prototype.updateGroupFeatures = function (group) {
                var _this = this;
                this.project.features.forEach(function (f) {
                    if (group.markers.hasOwnProperty(f.id)) {
                        _this.updateFeature(f, group);
                    }
                });
            };

            LayerService.prototype.getDefaultMarkerStyle = function (feature) {
            };

            LayerService.prototype.updatePolygonStyle = function (m, feature) {
                var layer = this.findLayer(feature.layerId);
                var s = this.style(feature, layer);
                m.setStyle(s);
            };

            LayerService.prototype.getColor = function (v, gs) {
                if (v > gs.info.sdMax)
                    return gs.colors[gs.colors.length - 1];
                if (v < gs.info.sdMin)
                    return gs.colors[0];
                var bezInterpolator = chroma.interpolate.bezier(gs.colors);
                var r = bezInterpolator((v - gs.info.sdMin) / (gs.info.sdMax - gs.info.sdMin)).hex();
                return r;
            };

            LayerService.prototype.style = function (feature, layer) {
                var _this = this;
                var s = {
                    fillColor: 'red',
                    weight: 2,
                    opacity: 1,
                    color: 'black',
                    fillOpacity: 0.7
                };

                var ft = this.getFeatureType(feature);
                if (ft.style) {
                    if (ft.style.fillColor != null)
                        s["fillColor"] = ft.style.fillColor;
                    if (ft.style.strokeColor != null)
                        s["strokeColor"] = ft.style.strokeColor;
                    if (ft.style.strokeWidth != null)
                        s["weight"] = ft.style.strokeWidth;
                }

                //var layer = this.findLayer(feature.layerId);
                layer.group.styles.forEach(function (gs) {
                    if (gs.enabled && feature.properties.hasOwnProperty(gs.property)) {
                        var v = Number(feature.properties[gs.property]);
                        switch (gs.visualAspect) {
                            case "strokeColor":
                                s["color"] = _this.getColor(v, gs);
                                break;
                            case "fillColor":
                                s[gs.visualAspect] = _this.getColor(v, gs);
                                break;
                            case "strokeWidth":
                                s["weight"] = ((v - gs.info.sdMin) / (gs.info.sdMax - gs.info.sdMin) * 10) + 1;
                                break;
                        }
                        //s.fillColor = this.getColor(feature.properties[layer.group.styleProperty], null);
                    }
                });

                if (feature.isSelected) {
                    s["weight"] = 7;
                    s["color"] = "blue";
                }
                return s;
            };

            /**
            * init feature (add to feature list, crossfilter)
            */
            LayerService.prototype.initFeature = function (feature, layer) {
                 {
                    feature.isInitialized = true;
                    if (feature.id == null)
                        feature.id = this.getGuid();
                    feature.layerId = layer.id;
                    this.project.features.push(feature); // list of features
                    layer.group.ndx.add([feature]);
                    feature.fType = this.getFeatureType(feature);
                }
                return feature.type;
            };

            LayerService.prototype.removeFeature = function (feature, layer) {
            };

            /**
            * create icon based of feature style
            */
            LayerService.prototype.getPointIcon = function (feature, layer) {
                var icon;
                if (feature.htmlStyle != null) {
                    icon = new L.DivIcon({
                        className: '',
                        iconSize: new L.Point(32, 32),
                        html: feature.htmlStyle
                    });
                } else {
                    var html = "<div ";
                    var props = {};
                    var ft = this.getFeatureType(feature);

                    //if (feature.poiTypeName != null) html += "class='style" + feature.poiTypeName + "'";
                    if (ft.style.fillColor == null && ft.style.iconUri == null)
                        ft.style.fillColor = "lightgray";

                    props["background"] = ft.style.fillColor;
                    props["width"] = "32px";
                    props["height"] = "32px";
                    props["border-radius"] = "20%";
                    props["border-style"] = "solid";
                    props["border-color"] = "black";
                    props["border-width"] = "0";

                    layer.group.styles.forEach(function (gs) {
                        if (gs.enabled && feature.properties.hasOwnProperty(gs.property)) {
                            var v = feature.properties[gs.property];
                            switch (gs.visualAspect) {
                                case "fillColor":
                                    var bezInterpolator = chroma.interpolate.bezier(gs.colors);
                                    props["background-color"] = bezInterpolator((v - gs.info.sdMin) / (gs.info.sdMax - gs.info.sdMin)).hex();
                                    break;
                            }
                            //s.fillColor = this.getColor(feature.properties[layer.group.styleProperty], null);
                        }
                    });
                    if (feature.isSelected) {
                        props["border-width"] = "3px";
                    }

                    html += " style='display: inline-block;vertical-align: middle;text-align: center;";
                    for (var key in props) {
                        html += key + ":" + props[key] + ";";
                    }

                    html += "'>";
                    if (ft.style.iconUri != null) {
                        html += "<img src=" + ft.style.iconUri + " style='width:" + (ft.style.iconWidth - 2) + "px;height:" + (ft.style.iconHeight - 2) + "px' />";
                    }
                    html += "</div>";

                    icon = new L.DivIcon({
                        className: '',
                        iconSize: new L.Point(ft.style.iconWidth, ft.style.iconHeight),
                        html: html
                    });
                    //icon = new L.DivIcon({
                    //    className: "style" + feature.poiTypeName,
                    //    iconSize: new L.Point(feature.fType.style.iconWidth, feature.fType.style.iconHeight)
                    //});
                }
                return icon;
            };

            /**
            * Update icon for features
            */
            LayerService.prototype.updateFeatureIcon = function (feature, layer) {
                var marker = layer.group.markers[feature.id];
                if (marker != null)
                    marker.setIcon(this.getPointIcon(feature, layer));
            };

            /**
            * add a feature
            */
            LayerService.prototype.addFeature = function (feature, latlng, layer) {
                var _this = this;
                var type = this.initFeature(feature, layer);
                var style = type.style;
                var marker;
                switch (feature.geometry.type) {
                    case "Point":
                        var icon = this.getPointIcon(feature, layer);
                        marker = new L.Marker(latlng, { icon: icon });
                        marker.on('click', function () {
                            _this.selectFeature(feature);
                        });

                        break;
                    default:
                        var polyoptions = {
                            fillColor: "Green"
                        };
                        marker = L.multiPolygon(latlng, polyoptions);
                        break;
                }
                layer.group.markers[feature.id] = marker;

                return marker;
            };

            LayerService.prototype.selectFeature = function (feature) {
                feature.isSelected = !feature.isSelected;

                // hide sidebar when unselect item
                this.updateFeature(feature);

                // deselect last feature and also update
                if (this.lastSelectedFeature != null && this.lastSelectedFeature != feature) {
                    this.lastSelectedFeature.isSelected = false;
                    this.updateFeature(this.lastSelectedFeature);
                }
                this.lastSelectedFeature = feature;

                if (!feature.isSelected) {
                    this.$messageBusService.publish("sidebar", "hide");
                    this.$messageBusService.publish("feature", "onFeatureDeselect");
                } else {
                    this.$messageBusService.publish("sidebar", "show");
                    this.$messageBusService.publish("feature", "onFeatureSelect", feature);
                }
            };

            /**
            * find a filter for a specific group/property combination
            */
            LayerService.prototype.findFilter = function (group, property) {
                if (group.filters == null)
                    group.filters = [];
                var r = group.filters.filter(function (f) {
                    return f.property == property;
                });
                if (r.length > 0)
                    return r[0];
                return null;
            };

            /**
            * find a layer with a specific id
            */
            LayerService.prototype.findLayer = function (id) {
                var r;
                this.project.groups.forEach(function (g) {
                    g.layers.forEach(function (l) {
                        if (l.id == id)
                            r = l;
                    });
                });
                return r;
            };

            LayerService.prototype.setStyle = function (property, openStyleTab) {
                var _this = this;
                if (typeof openStyleTab === "undefined") { openStyleTab = true; }
                var f = property.feature;
                if (f != null) {
                    this.noStyles = false;
                    var layer = this.findLayer(f.layerId);
                    var gs = new GroupStyle(this.$translate);
                    gs.id = this.getGuid();
                    gs.title = property.key;
                    gs.visualAspect = "fillColor";
                    gs.canSelectColor = gs.visualAspect.toLowerCase().indexOf('color') > -1;

                    gs.property = property.property;
                    if (gs.info == null)
                        gs.info = this.calculatePropertyInfo(layer.group, property.property);

                    gs.enabled = true;
                    gs.group = layer.group;

                    var ft = this.getFeatureType(f);
                    if (ft.style && ft.style.fillColor) {
                        gs.colors = ['white', 'orange'];
                    } else {
                        gs.colors = ['white', 'orange'];
                    }
                    this.saveStyle(layer.group, gs);
                    if (f.geometry.type.toLowerCase() == "point") {
                        this.project.features.forEach(function (fe) {
                            if (layer.group.markers.hasOwnProperty(fe.id)) {
                                _this.updateFeatureIcon(fe, layer);
                            }
                        });
                    } else {
                        this.updateStyle(gs);
                    }
                    if (openStyleTab)
                        $('#leftPanelTab a[href="#styles"]').tab('show'); // Select tab by name
                    return gs;
                }
            };

            LayerService.prototype.saveStyle = function (group, style) {
                // check if there are other styles that affect the same visual aspect, remove them
                var oldStyles = group.styles.filter(function (s) {
                    return s.visualAspect == style.visualAspect;
                });

                if (oldStyles.length > 0) {
                    var pos = group.styles.indexOf(oldStyles[0]);
                    group.styles.splice(pos, 1);
                }
                group.styles.push(style);
            };

            LayerService.prototype.addFilter = function (group, prop) {
                var filter = this.findFilter(group, prop);
                if (filter == null) {
                    var gf = new GroupFilter();
                    gf.property = prop;

                    //gf.filterType = "row";
                    gf.title = prop;
                    gf.rangex = [0, 1];
                    group.filters.push(gf);
                    // add filter
                } else {
                    var pos = group.filters.indexOf(filter);
                    if (pos != -1)
                        group.filters.slice(pos, 1);
                }
                this.updateFilters();
                $('#leftPanelTab a[href="#filters"]').tab('show'); // Select tab by name
            };

            /**
            * enable a filter for a specific property
            */
            LayerService.prototype.setFilter = function (property) {
                var prop = property.property;
                var f = property.feature;
                if (f != null) {
                    var layer = this.findLayer(f.layerId);
                    if (layer != null) {
                        var filter = this.findFilter(layer.group, prop);
                        if (filter == null) {
                            var gf = new GroupFilter();
                            gf.property = prop;
                            gf.meta = property.meta;
                            gf.filterType = "bar";
                            if (gf.meta != null) {
                                if (gf.meta.filterType != null) {
                                    gf.filterType = gf.meta.filterType;
                                } else {
                                    switch (gf.meta.type) {
                                        case "number":
                                            gf.filterType = "bar";
                                            break;
                                        default:
                                            gf.filterType = "text";
                                            gf.stringValue = property.value;
                                            gf.value = property.value;
                                            break;
                                    }
                                }
                            }

                            gf.title = property.key;
                            gf.rangex = [0, 1];

                            if (gf.filterType == "text") {
                                var old = layer.group.filters.filter(function (f) {
                                    return f.filterType == "text";
                                });
                                old.forEach(function (groupFilter) {
                                    groupFilter.dimension.filterAll();
                                    groupFilter.dimension.dispose();
                                });
                                layer.group.filters = layer.group.filters.filter(function (f) {
                                    return f.filterType != "text";
                                });
                            }

                            // add filter
                            layer.group.filters.push(gf);
                        } else {
                            var pos = layer.group.filters.indexOf(filter);
                            if (pos != -1)
                                layer.group.filters.slice(pos, 1);
                        }
                    }
                    this.updateFilters();
                    $('#leftPanelTab a[href="#filters"]').tab('show'); // Select tab by name
                }
            };

            /**
            * Return the feature style for a specific feature.
            * First, look for a layer specific feature type, otherwise, look for a project-specific feature type.
            * In case both fail, create a default feature type at the layer level.
            */
            LayerService.prototype.getFeatureType = function (feature) {
                var projectFeatureTypeName = feature.properties['PoiTypeId'] || "Default";
                var featureTypeName = feature.layerId + '_' + projectFeatureTypeName;
                if (!(featureTypeName in this.featureTypes)) {
                    if (projectFeatureTypeName in this.featureTypes)
                        featureTypeName = projectFeatureTypeName;
                    else
                        this.featureTypes[featureTypeName] = this.createDefaultType(feature);
                }
                feature.featureTypeName = featureTypeName;
                return this.featureTypes[featureTypeName];
            };

            /**
            * In case we are dealing with a regular JSON file without type information, create a default type.
            */
            LayerService.prototype.createDefaultType = function (feature) {
                var type = {};
                type.style = { nameLabel: "Name" };
                type.metaInfoData = [];

                for (var key in feature.properties) {
                    var metaInfo = [];
                    metaInfo.label = key;
                    metaInfo.title = key.replace("_", " ");
                    metaInfo.isSearchable = true;
                    metaInfo.visibleInCallOut = true;
                    metaInfo.canEdit = false;
                    var value = feature.properties[key];
                    if (csComp.StringExt.isNumber(value))
                        metaInfo.type = "number";
                    else if (csComp.StringExt.isBoolean(value))
                        metaInfo.type = "boolean";
                    else if (csComp.StringExt.isBbcode(value))
                        metaInfo.type = "bbcode";
                    else
                        metaInfo.type = "text";

                    type.metaInfoData.push(metaInfo);
                }
                return type;
            };

            LayerService.prototype.resetFilters = function () {
                dc.filterAll();
                dc.redrawAll();
            };

            LayerService.prototype.getGroupFeatures = function (g) {
                // find active layers
                var ls = [];
                g.layers.forEach(function (l) {
                    if (l.enabled)
                        ls.push(l.id);
                });

                // add active features
                var r = this.project.features.filter(function (k) {
                    return ls.indexOf(k.layerId) > -1;
                });
                return r;
            };

            LayerService.prototype.rebuildFilters = function (g) {
                // remove all data from crossfilter group
                g.ndx = crossfilter([]);

                var features = this.getGroupFeatures(g);

                g.ndx.add(features);

                // redraw charts
                this.updateFilters();
            };

            /**
            * deactivate layer
            */
            LayerService.prototype.removeLayer = function (layer) {
                this.$messageBusService.publish("layer", "deactivating", layer);

                var m;
                var g = layer.group;

                if (this.lastSelectedFeature != null && this.lastSelectedFeature.layerId == layer.id) {
                    this.lastSelectedFeature = null;
                    this.$messageBusService.publish("sidebar", "hide");
                    this.$messageBusService.publish("feature", "onFeatureDeselect");
                }

                //m = layer.group.vectors;
                if (g.clustering) {
                    m = g.cluster;
                    this.project.features.forEach(function (feature) {
                        if (feature.layerId == layer.id) {
                            try  {
                                m.removeLayer(layer.group.markers[feature.id]);
                                delete layer.group.markers[feature.id];
                            } catch (error) {
                            }
                        }
                    });
                } else {
                    this.map.map.removeLayer(layer.mapLayer);
                }

                this.project.features = this.project.features.filter(function (k) {
                    return k.layerId != layer.id;
                });
                var layerName = layer.id + '_';
                for (var poiTypeName in this.featureTypes) {
                    if (poiTypeName.lastIndexOf(layerName, 0) === 0)
                        delete this.featureTypes[poiTypeName];
                }

                // check if there are no more active layers in group and remove filters/styles
                if (g.layers.filter(function (l) {
                    return (l.enabled);
                }).length == 0) {
                    g.filters.forEach(function (f) {
                        if (f.dimension != null)
                            f.dimension.dispose();
                    });
                    g.filters = [];

                    g.styles = [];
                }

                this.rebuildFilters(g);
                this.$messageBusService.publish("layer", "deactivate", layer);
            };

            LayerService.prototype.S4 = function () {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            };

            LayerService.prototype.getGuid = function () {
                var guid = (this.S4() + this.S4() + "-" + this.S4() + "-4" + this.S4().substr(0, 3) + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4()).toLowerCase();
                return guid;
            };

            /***
            * Open solution file with references to available baselayers and projects
            * @params url: URL of the solution
            * @params layers: Optionally provide a semi-colon separated list of layer IDs that should be opened.
            * @params initialProject: Optionally provide a project name that should be loaded, if omitted the first project in the definition will be loaded
            */
            LayerService.prototype.openSolution = function (url, layers, initialProject) {
                //console.log('layers (openSolution): ' + JSON.stringify(layers));
                var _this = this;
                $.getJSON(url, function (solution) {
                    //var projects = data;
                    if (solution.maxBounds) {
                        _this.maxBounds = solution.maxBounds;
                        _this.$mapService.map.setMaxBounds(new L.LatLngBounds(solution.maxBounds.southWest, solution.maxBounds.northEast));
                    }
                    if (solution.viewBounds)
                        _this.$mapService.map.fitBounds(new L.LatLngBounds(solution.viewBounds.southWest, solution.viewBounds.northEast));

                    //$scope.title = projects.title;
                    //$scope.projects = [];
                    solution.baselayers.forEach(function (b) {
                        var options = {};
                        options["subtitle"] = b.subtitle;
                        options["preview"] = b.preview;
                        if (b.subdomains != null)
                            options["subdomains"] = b.subdomains;
                        if (b.maxZoom != null)
                            options.maxZoom = b.maxZoom;
                        if (b.minZoom != null)
                            options.minZoom = b.minZoom;
                        if (b.attribution != null)
                            options.attribution = b.attribution;
                        if (b.id != null)
                            options["id"] = b.id;
                        var layer = L.tileLayer(b.url, options);
                        _this.$mapService.baseLayers[b.title] = layer;
                        if (b.isDefault)
                            _this.$mapService.changeBaseLayer(layer);
                    });

                    //$scope.projects = projects.projects;
                    if (solution.projects.length > 0) {
                        var p = solution.projects.filter(function (aProject) {
                            return aProject.title == initialProject;
                        })[0];
                        if (p != null) {
                            _this.openProject(p.url, layers);
                        } else {
                            _this.openProject(solution.projects[0].url, layers);
                        }
                    }

                    _this.solution = solution;
                });
            };

            /**
            * Open project
            * @params url: URL of the project
            * @params layers: Optionally provide a semi-colon separated list of layer IDs that should be opened.
            */
            LayerService.prototype.openProject = function (url, layers) {
                var _this = this;
                //console.log('layers (openProject): ' + JSON.stringify(layers));
                var layerIds;
                layerIds = [];
                if (layers) {
                    layers.split(';').forEach(function (layerId) {
                        layerIds.push(layerId.toLowerCase());
                    });
                }

                //console.log('layerIds (openProject): ' + JSON.stringify(layerIds));
                this.layerGroup.clearLayers();
                this.featureTypes = {};

                $.getJSON(url, function (data) {
                    _this.project = new Project().deserialize(data);

                    if (_this.project.viewBounds) {
                        _this.$mapService.map.fitBounds(new L.LatLngBounds(_this.project.viewBounds.southWest, _this.project.viewBounds.northEast));
                    }

                    if (_this.project.featureTypes) {
                        for (var typeName in _this.project.featureTypes) {
                            var featureType = _this.project.featureTypes[typeName];
                            _this.featureTypes[typeName] = featureType;
                        }
                    }

                    if (_this.project.metaInfoData) {
                        for (var key in _this.project.metaInfoData) {
                            var metaInfo = _this.project.metaInfoData[key];
                            _this.metaInfoData[key] = metaInfo;
                        }
                    }

                    _this.project.features = [];

                    _this.project.groups.forEach(function (group) {
                        if (group.id == null)
                            group.id = _this.getGuid();
                        group.ndx = crossfilter([]);
                        if (group.styles == null)
                            group.styles = [];
                        if (group.filters == null)
                            group.filters = [];
                        group.markers = {};
                        if (group.clustering) {
                            group.cluster = new L.MarkerClusterGroup({
                                maxClusterRadius: group.maxClusterRadius || 80,
                                disableClusteringAtZoom: group.clusterLevel || 0
                            });

                            _this.map.map.addLayer(group.cluster);
                        } else {
                            group.vectors = new L.LayerGroup();
                            _this.map.map.addLayer(group.vectors);
                        }
                        group.layers.forEach(function (layer) {
                            if (layer.reference == null)
                                layer.reference = _this.getGuid();
                            layer.group = group;
                            if (layer.enabled || layerIds.indexOf(layer.reference.toLowerCase()) >= 0) {
                                layer.enabled = true;
                                _this.addLayer(layer);
                            }
                        });

                        group.styles.forEach(function (style) {
                            if (style.id != null)
                                style.id = _this.getGuid();
                        });

                        group.filters.forEach(function (filter) {
                            if (filter.id != null)
                                filter.id = _this.getGuid();
                        });

                        if (data.startposition)
                            _this.$mapService.zoomToLocation(new L.LatLng(data.startposition.latitude, data.startposition.longitude));

                        _this.updateFilters();
                    });

                    _this.$messageBusService.publish("project", "loaded");
                });
            };

            LayerService.prototype.zoom = function (data) {
                //var a = data;
            };

            /**
            * Calculate min/max/count for a specific property in a group
            */
            LayerService.prototype.calculatePropertyInfo = function (group, property) {
                var _this = this;
                var r = new PropertyInfo();
                r.count = 0;
                var sum = 0;
                var sumsq = 0;

                group.layers.forEach(function (l) {
                    if (l.enabled) {
                        _this.project.features.forEach(function (f) {
                            if (f.layerId == l.id && f.properties.hasOwnProperty(property)) {
                                var s = f.properties[property];
                                var v = Number(s);
                                if (v != NaN) {
                                    r.count += 1;
                                    sum = sum + v;
                                    sumsq = sumsq + v * v;
                                    if (r.max == null || v > r.max)
                                        r.max = v;
                                    if (r.min == null || v < r.min)
                                        r.min = v;
                                }
                            }
                        });
                    }
                });
                r.mean = sum / r.count;
                r.varience = sumsq / r.count - r.mean * r.mean;
                r.sd = Math.sqrt(r.varience);
                r.sdMax = r.mean + 3 * r.sd;
                r.sdMin = r.mean - 3 * r.sd;
                if (r.min > r.sdMin)
                    r.sdMin = r.min;
                if (r.max < r.sdMax)
                    r.sdMax = r.max;
                if (r.sdMin == NaN)
                    r.sdMin = r.min;
                if (r.sdMax == NaN)
                    r.sdMax = r.max;
                if (this.metaInfoData.hasOwnProperty(property)) {
                    var mid = this.metaInfoData[property];
                    if (mid.maxValue != null)
                        r.sdMax = mid.maxValue;
                    if (mid.minValue != null)
                        r.sdMin = mid.minValue;
                }
                return r;
            };

            LayerService.prototype.updateFilters = function () {
                var _this = this;
                var fmain = $("#filterChart");
                fmain.empty();
                this.noFilters = true;

                this.project.groups.forEach(function (group) {
                    if (group.filters != null && group.filters.length > 0) {
                        $("<div style='float:left;margin-left: -10px; margin-top: 5px' data-toggle='collapse' data-target='#filters_" + group.id + "'><i class='fa fa-chevron-down togglebutton toggle-arrow-down'></i><i class='fa fa-chevron-up togglebutton toggle-arrow-up'></i></div><div class='group-title' >" + group.title + "</div><div id='filtergroupcount_" + group.id + "'  class='filter-group-count' /><div class='collapse in' id='filters_" + group.id + "'></div>").appendTo("#filterChart");
                        group.filters.forEach(function (filter) {
                            if (filter.dimension != null)
                                filter.dimension.dispose();
                            _this.noFilters = false;
                            switch (filter.filterType) {
                                case "text":
                                    _this.addTextFilter(group, filter);
                                    break;
                                case "bar":
                                    _this.addBarFilter(group, filter);
                                    break;
                            }
                            //var datas = sterrenGroup.top(Infinity);
                        });
                    }
                    _this.updateFilterGroupCount(group);
                });
                dc.renderAll();
            };

            LayerService.prototype.updateTextFilter = function (group, dcDim, value) {
                if (value == null || value == '') {
                    dcDim.filterAll();
                } else {
                    dcDim.filterFunction(function (d) {
                        if (d != null)
                            return (d.toLowerCase().indexOf(value.toLowerCase()) > -1);
                        return false;
                    });
                }

                group.filterResult = dcDim.top(Infinity);
                this.updateMapFilter(group);
                dc.renderAll();
            };

            LayerService.prototype.updateFilterGroupCount = function (group) {
                if (group.filterResult != null)
                    $("#filtergroupcount_" + group.id).text(group.filterResult.length + " objecten geselecteerd");
            };

            /***
            * Add text filter to list of filters
            */
            LayerService.prototype.addTextFilter = function (group, filter) {
                var _this = this;
                filter.id = this.getGuid();
                var divid = "filter_" + filter.id;

                var dcDim = group.ndx.dimension(function (d) {
                    if (d.properties.hasOwnProperty(filter.property)) {
                        return d.properties[filter.property];
                    } else
                        return null;
                });
                filter.dimension = dcDim;
                dcDim.filterFunction(function (d) {
                    if (d != null)
                        return (d.toLowerCase().indexOf(filter.stringValue.toLowerCase()) > -1);
                    return false;
                });

                this.updateTextFilter(group, dcDim, filter.stringValue);
                var fid = "filtertext" + filter.id;
                $("<h4>" + filter.title + "</h4><input type='text' value='" + filter.stringValue + "' class='filter-text' id='" + fid + "'/><a class='btn' value=" + filter.value + " id='remove" + filter.id + "'><i class='fa fa-times'></i></a>").appendTo("#filters_" + group.id);

                //$("<h4>" + filter.title + "</h4><input type='text' class='filter-text' id='" + fid + "'/></div><a class='btn btn-filter-delete' value=" + filter.value + " id='remove" + filter.id + "'><i class='fa fa-remove'></i></a>").appendTo("#filterChart");
                $("#" + fid).keyup(function () {
                    filter.stringValue = $("#" + fid).val();
                    _this.updateTextFilter(group, dcDim, filter.stringValue);
                    _this.updateFilterGroupCount(group);
                    //alert('text change');
                });
                $("#remove" + filter.id).on('click', function () {
                    var pos = group.filters.indexOf(filter);

                    filter.dimension.filterAll();
                    filter.dimension.dispose();
                    filter.dimension = null;
                    if (pos != -1)
                        group.filters = group.filters.slice(pos - 1, pos);
                    dc.filterAll();

                    _this.updateFilters();
                    _this.resetMapFilter(group);
                });
            };

            LayerService.prototype.updateChartRange = function (chart, filter) {
                var filterFrom = $("#fsfrom_" + filter.id);
                var filterTo = $("#fsto_" + filter.id);
                var extent = chart.brush().extent();
                if (extent != null && extent.length == 2) {
                    if (extent[0] != extent[1]) {
                        console.log(extent);

                        //if (extent.length == 2) {
                        filterFrom.val(extent[0]);
                        filterTo.val(extent[1]);
                    }
                } else {
                    filterFrom.val("0");
                    filterTo.val("1");
                }
            };

            /***
            * Add bar chart filter for filter number values
            */
            LayerService.prototype.addBarFilter = function (group, filter) {
                var _this = this;
                filter.id = this.getGuid();
                var info = this.calculatePropertyInfo(group, filter.property);

                var divid = "filter_" + filter.id;

                //$("<h4>" + filter.title + "</h4><div id='" + divid + "'></div><a class='btn' id='remove" + filter.id + "'>remove</a>").appendTo("#filters_" + group.id);
                //$("<h4>" + filter.title + "</h4><div id='" + divid + "'></div><div style='display:none' id='fdrange_" + filter.id + "'>from <input type='text' style='width:75px' id='fsfrom_" + filter.id + "'> to <input type='text' style='width:75px' id='fsto_" + filter.id + "'></div><a class='btn' id='remove" + filter.id + "'>remove</a>").appendTo("#filterChart");
                $("<h4>" + filter.title + "</h4><div id='" + divid + "'></div><div style='display:none' id='fdrange_" + filter.id + "'>from <span id='fsfrom_" + filter.id + "'/> to <span id='fsto_" + filter.id + "'/></div><a class='btn' id='remove" + filter.id + "'>remove</a>").appendTo("#filterChart");
                var filterFrom = $("#fsfrom_" + filter.id);
                var filterTo = $("#fsto_" + filter.id);
                var filterRange = $("#fdrange_" + filter.id);
                $("#remove" + filter.id).on('click', function () {
                    var pos = group.filters.indexOf(filter);
                    if (pos != -1)
                        group.filters.splice(pos, 1);
                    filter.dimension.dispose();
                    _this.updateFilters();

                    _this.resetMapFilter(group);
                });

                var dcChart = dc.barChart("#" + divid);

                var n_bins = 20;

                var binWidth = (info.sdMax - info.sdMin) / n_bins;

                var dcDim = group.ndx.dimension(function (d) {
                    if (d.properties.hasOwnProperty(filter.property)) {
                        if (d.properties[filter.property] != null) {
                            var a = parseInt(d.properties[filter.property]);
                            if (a >= info.sdMin && a <= info.sdMax) {
                                return Math.floor(a / binWidth) * binWidth;
                            } else {
                                return null;
                            }
                        }
                        //return a;
                    } else
                        return null;
                });
                filter.dimension = dcDim;
                var dcGroup = dcDim.group();

                var scale = dcChart.width(275).height(90).dimension(dcDim).group(dcGroup).transitionDuration(100).centerBar(true).gap(5).elasticY(true).x(d3.scale.linear().domain([info.sdMin, info.sdMax]).range([-1, n_bins + 1])).filterPrinter(function (filters) {
                    var s = "";
                    if (filters.length > 0) {
                        var filter = filters[0];

                        filterFrom.text(filter[0].toFixed(2));
                        filterTo.text(filter[1].toFixed(2));
                        s += filter[0];
                    }

                    return s;
                }).on("filtered", function (e) {
                    var fil = e.hasFilter();
                    if (fil) {
                        filterRange.show();
                    } else {
                        filterRange.hide();
                    }
                    dc.events.trigger(function () {
                        group.filterResult = dcDim.top(Infinity);
                        _this.updateFilterGroupCount(group);
                        _this.updateMapFilter(group);
                    });
                });

                dcChart.xUnits(function () {
                    return 13;
                });

                filterFrom.on('change', function () {
                    if ($.isNumeric(filterFrom.val())) {
                        var min = parseInt(filterFrom.val());
                        var filters = dcChart.filters();
                        if (filters.length > 0) {
                            filters[0][0] = min;
                            dcChart.filter(filters[0]);
                            dcChart.render();

                            //dcDim.filter(filters[0]);
                            dc.redrawAll();
                            //dc.renderAll();
                        }
                    }
                });
                filterTo.on('change', function () {
                    if ($.isNumeric(filterTo.val())) {
                        var max = parseInt(filterTo.val());
                        var filters = dcChart.filters();
                        if (filters.length > 0) {
                            filters[0][1] = max;
                            dcChart.filter(filters[0]);
                            dcDim.filter(filters[0]);
                            dc.renderAll();
                        }
                        //dc.redrawAll();
                    }
                    //dcDim.filter([min, min + 100]);
                });

                //if (filter.meta != null && filter.meta.minValue != null) {
                //    dcChart.x(d3.scale.linear().domain([filter.meta.minValue, filter.meta.maxValue]));
                //} else {
                //    var propInfo = this.calculatePropertyInfo(group, filter.property);
                //    var dif = (propInfo.max - propInfo.min) / 100;
                //    dcChart.x(d3.scale.linear().domain([propInfo.min - dif, propInfo.max + dif]));
                //}
                dcChart.yAxis().ticks(5);
                dcChart.xAxis().ticks(5);
                this.updateChartRange(dcChart, filter);
                //.x(d3.scale.quantile().domain(dcGroup.all().map(function (d) {
                //return d.key;
                //   }))
                //.range([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
            };

            /***
            * Update map markers in cluster after changing filter
            */
            LayerService.prototype.updateMapFilter = function (group) {
                $.each(group.markers, function (key, marker) {
                    var included = group.filterResult.filter(function (f) {
                        return f.id == key;
                    }).length > 0;
                    if (group.clustering) {
                        var incluster = group.cluster.hasLayer(marker);
                        if (!included && incluster)
                            group.cluster.removeLayer(marker);
                        if (included && !incluster)
                            group.cluster.addLayer(marker);
                    } else {
                        var onmap = group.vectors.hasLayer(marker);
                        if (!included && onmap)
                            group.vectors.removeLayer(marker);
                        if (included && !onmap)
                            group.vectors.addLayer(marker);
                    }
                });
            };

            LayerService.prototype.resetMapFilter = function (group) {
                $.each(group.markers, function (key, marker) {
                    if (group.clustering) {
                        var incluster = group.cluster.hasLayer(marker);
                        if (!incluster)
                            group.cluster.addLayer(marker);
                    } else {
                        var onmap = group.vectors.hasLayer(marker);
                        if (!onmap)
                            group.vectors.addLayer(marker);
                    }
                });
            };
            LayerService.$inject = [
                '$location',
                '$translate',
                'messageBusService',
                'mapService'
            ];
            return LayerService;
        })();
        Services.LayerService = LayerService;
    })(csComp.Services || (csComp.Services = {}));
    var Services = csComp.Services;
})(csComp || (csComp = {}));
var csComp;
(function (csComp) {
    (function (Services) {
        var MapCtrl = (function () {
            // dependencies are injected via AngularJS $injector
            // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
            function MapCtrl($scope, $location, $mapService) {
                this.$scope = $scope;
                this.$location = $location;
                this.$mapService = $mapService;
                // 'vm' stands for 'view model'. We're adding a reference to the controller to the scope
                // for its methods to be accessible from view / HTML
                $scope.vm = this;

                this.$mapService.baseLayers = {};

                var map = $scope.map = $mapService.getMap();

                //Den Haag
                //map.setView(new L.LatLng(52.555193, 5.438660), 10);
                //Amsterdam
                //map.setView(new L.LatLng(52.3978949803545, 4.90466079148125), 14);
                map.invalidateSize();

                // Zoom in/out layer control (above, I've turned it off, as the default location is top left).
                L.control.zoom({
                    position: "bottomright"
                }).addTo(map);

                // GPS enabled geolocation control set to follow the user's location
                L.control.locate({
                    position: "bottomright",
                    drawCircle: true,
                    follow: true,
                    setView: true,
                    keepCurrentZoomLevel: true,
                    markerStyle: {
                        weight: 1,
                        opacity: 0.8,
                        fillOpacity: 0.8
                    },
                    circleStyle: {
                        weight: 1,
                        clickable: false
                    },
                    icon: "icon-direction",
                    metric: true,
                    strings: {
                        title: "My location",
                        popup: "You are within {distance} {unit} from this point",
                        outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
                    },
                    locateOptions: {
                        maxZoom: 18,
                        watch: true,
                        enableHighAccuracy: true,
                        maximumAge: 10000,
                        timeout: 10000
                    }
                }).addTo(map);
                //L.control.groupedLayers(this.$mapService.baseLayers, $layerService.overlays, {
                //    collapsed: true
                //}).addTo(map);
            }
            MapCtrl.$inject = [
                '$scope',
                '$location',
                'mapService'
            ];
            return MapCtrl;
        })();
        Services.MapCtrl = MapCtrl;
    })(csComp.Services || (csComp.Services = {}));
    var Services = csComp.Services;
})(csComp || (csComp = {}));
//export = MapLayersCtrl;
var csComp;
(function (csComp) {
    (function (Services) {
        'use strict';

        /*
        * Singleton service that holds a reference to the map.
        * In case other controllers need access to the map, they can inject this service.
        */
        var MapService = (function () {
            function MapService($messageBusService) {
                this.$messageBusService = $messageBusService;
                //this.map = L.map("map", {
                //    zoomControl        : false,
                //    attributionControl : true
                //});
                //this.activeBaseLayer;
                this.baseLayers = {};
                this.initMap();
            }
            MapService.prototype.initMap = function () {
                this.map = L.map("map", {
                    zoomControl: false,
                    attributionControl: true
                });
            };

            MapService.prototype.changeBaseLayer = function (layerObj) {
                this.map.addLayer(layerObj);
                if (this.activeBaseLayer)
                    this.map.removeLayer(this.activeBaseLayer);
                this.map.setZoom(this.map.getZoom());
                this.map.fire('baselayerchange', { layer: layerObj });
                this.activeBaseLayer = layerObj;
            };

            MapService.prototype.invalidate = function () {
                this.map.invalidateSize();
            };

            /**
            * Zoom to a location on the map.
            */
            MapService.prototype.zoomToLocation = function (center, zoomFactor) {
                this.map.setView(center, zoomFactor || 14);
            };

            /**
            * Zoom to a feature on the map.
            */
            MapService.prototype.zoomTo = function (feature) {
                var _this = this;
                var center;
                if (feature.geometry.type.toUpperCase() == 'POINT') {
                    center = new L.LatLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]);
                    this.map.setView(center, 14);
                } else {
                    var bb;
                    if (feature.geometry.type.toUpperCase().indexOf("MULTI") < 0)
                        bb = this.getBoundingBox(feature.geometry.coordinates[0]);
                    else {
                        bb = [1000, -1000, 1000, -1000];
                        feature.geometry.coordinates.forEach(function (c) {
                            var b = _this.getBoundingBox(c[0]);
                            bb = [Math.min(bb[0], b[0]), Math.max(bb[1], b[1]), Math.min(bb[2], b[2]), Math.max(bb[3], b[3])];
                        });
                    }
                    var spacingLon = 0.05;
                    var southWest = L.latLng(Math.min(bb[2], bb[3]), Math.min(bb[0], bb[1]) - spacingLon);
                    var northEast = L.latLng(Math.max(bb[2], bb[3]), Math.max(bb[0], bb[1]) + spacingLon);
                    this.map.fitBounds(new L.LatLngBounds(southWest, northEast));
                }
                this.$messageBusService.publish("sidebar", "show");
                this.$messageBusService.publish("feature", "onFeatureSelect", feature);
            };

            //private getCentroid(arr) {
            //    return arr.reduce((x, y) => [x[0] + y[0] / arr.length, x[1] + y[1] / arr.length], [0, 0]);
            //}
            /**
            * Compute the bounding box.
            * Returns [min_x, max_x, min_y, max_y]
            */
            MapService.prototype.getBoundingBox = function (arr) {
                // p is the previous value of the callback, c the current element of the array.
                return arr.reduce(function (p, c) {
                    return [Math.min(p[0], c[0]), Math.max(p[1], c[0]), Math.min(p[2], c[1]), Math.max(p[3], c[1])];
                }, [1000, -1000, 1000, -1000]);
            };

            MapService.prototype.getMap = function () {
                return this.map;
            };
            MapService.$inject = [
                'messageBusService'
            ];
            return MapService;
        })();
        Services.MapService = MapService;
    })(csComp.Services || (csComp.Services = {}));
    var Services = csComp.Services;
})(csComp || (csComp = {}));
var csComp;
(function (csComp) {
    (function (Search) {
        var SearchFormCtrl = (function () {
            function SearchFormCtrl($scope, $mapService) {
                this.$scope = $scope;
                this.$mapService = $mapService;
                $scope.vm = this;
                $scope.location = new L.LatLng(0, 0);
            }
            SearchFormCtrl.prototype.doSearch = function () {
                if (this.$scope.location.lat === 0 && this.$scope.location.lng === 0) {
                    alert('Directive did not update the location property in parent controller.');
                } else {
                    //alert('Yay. Location: ' + this.$scope.location);
                    var center = new L.LatLng(this.$scope.location.lat, this.$scope.location.lng);
                    this.$mapService.zoomToLocation(center);
                }
            };
            SearchFormCtrl.$inject = [
                '$scope',
                'mapService'
            ];
            return SearchFormCtrl;
        })();
        Search.SearchFormCtrl = SearchFormCtrl;
    })(csComp.Search || (csComp.Search = {}));
    var Search = csComp.Search;
})(csComp || (csComp = {}));
var Translations;
(function (Translations) {
    var English = (function () {
        function English() {
        }
        English.locale = {
            MAP: 'Maps',
            MAP_LABEL: 'Map',
            TABLE_LABEL: 'Table',
            LAYERS: 'Layers',
            FILTERS: 'Filters',
            FILTER_INFO: 'At the moment, no filters have been selected. In order to add a filter, click on an icon or area on the map, and click on the filter icon (<span class="fa fa-filter"></span>) in the right menu. This will create a filter for the selected property.',
            STYLES: 'Styles',
            STYLE_INFO: 'At the moment, no style has been selected. In order to add a style, click on an icon or area on the map, and click on the style icon (<span class="fa fa-eye"></span>) in the right menu. This will create a filter for the selected property.',
            FEATURES: 'Features',
            LEGEND: 'Legend',
            SEARCH: 'Search',
            MAP_FEATURES: 'Map features',
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
            SHOW_FEATURE_MSG: 'Select a feature on the map to see the effects of the Multi-Criteria Analysis (MCA).',
            MCA_TOTAL_RESULT: 'Combined result',
            MCA_DELETE_MSG: 'Delete "{0}"',
            MCA_DELETE_MSG2: 'Are you sure?',
            //MCA_COMPUTE_MGS: "Compute the '{{mcaTitle}}'.",
            SHOW5: 'Show 5 items',
            SHOW10: 'Show 10 items',
            SHOW15: 'Show 15 items',
            SHOW20: 'Show 20 items',
            SHOW25: 'Show 25 items',
            SHOW30: 'Show 30 items',
            SHOW35: 'Show 35 items',
            SHOW40: 'Show 40 items'
        };
        return English;
    })();
    Translations.English = English;
})(Translations || (Translations = {}));
var Translations;
(function (Translations) {
    var Dutch = (function () {
        function Dutch() {
        }
        Dutch.locale = {
            MAP: 'Kaarten',
            MAP_LABEL: 'Kaart',
            TABLE_LABEL: 'Tabel',
            LAYERS: 'Kaartlagen',
            FILTERS: 'Filters',
            FILTER_INFO: 'Momenteel zijn er geen filters geselecteerd. Klik op een icoon of gebied op de kaart, en klik op het filter icoontje (<span class="fa fa-filter"></span>) in het rechter menu om een filter toe te voegen. Dan wordt er een filter aangemaakt voor de geselecteerde eigenschap.',
            STYLES: 'Stijlen',
            STYLE_INFO: 'Momenteel zijn er geen stijlen geselecteerd. Klik op een icoon of gebied op de kaart, en klik op het stijl icoontje (<span class="fa fa-eye"></span>) in het rechter menu om een stijl toe te voegen. Dan wordt er een stijl aangemaakt voor de geselecteerde eigenschap.',
            FEATURES: 'Features',
            LEGEND: 'Legenda',
            SEARCH: 'Zoeken',
            MAP_FEATURES: 'Kaartfeatures',
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
            SHOW_FEATURE_MSG: 'Selecteer een feature op de kaart om de Multi-Criteria Analyse (MCA) resultaten in detail te bekijken.',
            MCA_TOTAL_RESULT: 'Gecombineerd resultaat',
            MCA_DELETE_MSG: 'Verwijder "{0}"',
            MCA_DELETE_MSG2: 'Weet u het zeker?',
            //MCA_COMPUTE_MGS: "Bereken de '{{mcaTitle}}'.",
            SHOW5: 'Toon 5 regels',
            SHOW10: 'Toon 10 regels',
            SHOW15: 'Toon 15 regels',
            SHOW20: 'Toon 20 regels',
            SHOW25: 'Toon 25 regels',
            SHOW30: 'Toon 30 regels',
            SHOW35: 'Toon 35 regels',
            SHOW40: 'Toon 40 regels'
        };
        return Dutch;
    })();
    Translations.Dutch = Dutch;
})(Translations || (Translations = {}));
