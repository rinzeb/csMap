var LanguageSwitch;
(function (LanguageSwitch) {
    LanguageSwitch.html = '<div class="navbar-collapse collapse">    <ul class="nav navbar-nav">        <li class="dropdown">            <a href=""               class="navbar-brand dropdown-toggle pull-left"               style="color:white; margin-left:-10px;">                <img data-ng-src="{{vm.language.img}}" />                <span class="caret" data-ng-if="vm.$languages.length > 1"></span>            </a>            <ul data-ng-if="vm.$languages.length > 1" class="dropdown-menu" role="menu">                <li ng-repeat="language in vm.$languages">                    <a ng-click="vm.switchLanguage(language)">                        <span>                            <img data-ng-src="{{language.img}}" />                            &nbsp;{{language.name}}                        </span>                    </a>                </li>            </ul>        </li>    </ul></div>';
})(LanguageSwitch || (LanguageSwitch = {}));
var LanguageSwitch;
(function (LanguageSwitch) {
    /**
      * Config
      */
    var moduleName = 'csWeb.languageSwitch';
    /**
      * Module
      */
    LanguageSwitch.myModule;
    try {
        LanguageSwitch.myModule = angular.module(moduleName);
    }
    catch (err) {
        // named module does not exist, so create one
        LanguageSwitch.myModule = angular.module(moduleName, []);
    }
    /**
      * Directive to display the available map layers.
      */
    LanguageSwitch.myModule.directive('languageSwitch', [
        '$compile',
        function ($compile) {
            return {
                terminal: true,
                restrict: 'E',
                scope: {},
                template: LanguageSwitch.html,
                compile: function (el) {
                    var fn = $compile(el);
                    return function (scope) {
                        fn(scope);
                    };
                },
                replace: true,
                transclude: true,
                controller: LanguageSwitch.LanguageSwitchCtrl
            };
        }
    ]).provider('$languages', function () {
        this.languages = [];
        this.$get = function () {
            return this.languages;
        };
        this.setLanguages = function (languages) {
            this.languages = languages;
        };
    });
})(LanguageSwitch || (LanguageSwitch = {}));
var LanguageSwitch;
(function (LanguageSwitch) {
    var LanguageSwitchCtrl = (function () {
        // dependencies are injected via AngularJS $injector
        // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
        function LanguageSwitchCtrl($scope, $translate, $languages, $messageBus) {
            this.$scope = $scope;
            this.$translate = $translate;
            this.$languages = $languages;
            this.$messageBus = $messageBus;
            $scope.vm = this;
            //this.guiLanguages = $languages;
            //this.languages.push({ key: 'en', name: 'English', img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAflJREFUeNpinDRzn5qN3uFDt16+YWBg+Pv339+KGN0rbVP+//2rW5tf0Hfy/2+mr99+yKpyOl3Ydt8njEWIn8f9zj639NC7j78eP//8739GVUUhNUNuhl8//ysKeZrJ/v7z10Zb2PTQTIY1XZO2Xmfad+f7XgkXxuUrVB6cjPVXef78JyMjA8PFuwyX7gAZj97+T2e9o3d4BWNp84K1NzubTjAB3fH0+fv6N3qP/ir9bW6ozNQCijB8/8zw/TuQ7r4/ndvN5mZgkpPXiis3Pv34+ZPh5t23//79Rwehof/9/NDEgMrOXHvJcrllgpoRN8PFOwy/fzP8+gUlgZI/f/5xcPj/69e/37//AUX+/mXRkN555gsOG2xt/5hZQMwF4r9///75++f3nz8nr75gSms82jfvQnT6zqvXPjC8e/srJQHo9P9fvwNtAHmG4f8zZ6dDc3bIyM2LTNlsbtfM9OPHH3FhtqUz3eXX9H+cOy9ZMB2o6t/Pn0DHMPz/b+2wXGTvPlPGFxdcD+mZyjP8+8MUE6sa7a/xo6Pykn1s4zdzIZ6///8zMGpKM2pKAB0jqy4UE7/msKat6Jw5mafrsxNtWZ6/fjvNLW29qv25pQd///n+5+/fxDDVbcc//P/zx/36m5Ub9zL8+7t66yEROcHK7q5bldMBAgwADcRBCuVLfoEAAAAASUVORK5CYII=' });
            //this.languages.push({ key: 'nl', name: 'Nederlands', img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFXSURBVHjaYvzPgAD/UNlYEUAAkuTgCAAIBgJggq5VoAs1qM0vdzmMz362vezjokxPGimkEQ5WoAQEKuK71zwCCKyB4c//J8+BShn+/vv/+w/D399AEox+//8FJH/9/wUU+cUoKw20ASCAWBhEDf/LyDOw84BU//kDtgGI/oARmAHRDJQSFwVqAAggxo8fP/Ly8oKc9P8/AxjiAoyMjA8ePAAIIJZ///5BVIM0MOBWDpRlZPzz5w9AALH8gyvCbz7QBrCJAAHEyKDYX15r/+j1199//v35++/Xn7+///77DST/wMl/f4Dk378K4jx7O2cABBALw7NP77/+ev3xB0gOpOHfr99AdX9/gTVASKCGP//+8XCyMjC8AwggFoZfIHWSwpwQk4CW/AYjsKlA8u+ff////v33998/YPgBnQQQQIzAaGNg+AVGf5AYf5BE/oCjGEIyAQQYAGvKZ4C6+xXRAAAAAElFTkSuQmCC' });
            this.language = $languages[0];
        }
        LanguageSwitchCtrl.prototype.switchLanguage = function (language) {
            this.language = language;
            this.$translate.use(language.key);
            this.$messageBus.publish('language', 'newLanguage', language.key);
        };
        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http  ://docs.angularjs.org/guide/di
        LanguageSwitchCtrl.$inject = [
            '$scope',
            '$translate',
            '$languages',
            'messageBusService'
        ];
        return LanguageSwitchCtrl;
    })();
    LanguageSwitch.LanguageSwitchCtrl = LanguageSwitchCtrl;
})(LanguageSwitch || (LanguageSwitch = {}));
var Mca;
(function (Mca) {
    Mca.html = '<div>    <div class="wide-tooltip">        <span class="pull-right fa fa-info-circle fa-2x"              tooltip-html-unsafe="{{\'MCA.DESCRIPTION\' | translate}}"              tooltip-placement="bottom"              tooltip-trigger="mouseenter"              tooltip-append-to-body="false"              style="margin-right: 5px;"></span>        <h4 class="leftpanel-header">MCA</h4>    </div>    <div>        <select data-ng-model="vm.mca"                data-ng-options="mca.title for mca in vm.availableMcas"                data-ng-change="vm.updateMca()"                style="width: 65%; margin-bottom: 10px;"></select>        <div data-ng-if="vm.expertMode" class="pull-right">            <a href="" data-ng-click="vm.createMca()" tooltip="{{\'MCA.ADD_MCA\' | translate}}" style="margin-right:5px;"><i class="fa fa-plus"></i></a>            <a href="" data-ng-click="vm.removeMca(vm.mca)" tooltip="{{\'MCA.DELETE_MCA\' | translate}}" style="margin-right:5px;"><i class="fa fa-trash"></i></a>            <a href="" data-ng-click="vm.editMca(vm.mca)" tooltip="{{\'MCA.EDIT_MCA\' | translate}}" tooltip-placement="right" style="margin-right:5px;"><i class="fa fa-edit"></i></a>        </div>        <a href=""           tooltip="{{\'MCA.TOGGLE_SPARKLINE\' | translate}}"           data-ng-init="sparkLineStyle = vm.showSparkline ? {} : {color:\'lightgray\'}"           data-ng-click="vm.toggleSparkline(); sparkLineStyle = vm.showSparkline ? {} : {color:\'lightgray\'}"           data-ng-style="sparkLineStyle"           class="pull-right" style="margin-right:5px;"><i class="fa fa-bar-chart"></i></a>    </div>        <div data-ng-if="!vm.mca">        <div data-ng-if="vm.expertMode"  translate>MCA.INFO_EXPERT</div>        <div data-ng-if="!vm.expertMode" translate>MCA.INFO</div>    </div>    <div data-ng-if="vm.mca" style="overflow-y: auto; overflow-x: hidden; margin-left: -5px;" resize resize-y="140">        <div data-ng-repeat="criterion in vm.mca.criteria" class="wide-tooltip">            <div data-ng-if="criterion.criteria.length > 0 && criterion.userWeight != 0" class="collapsed pull-left" style="margin: 0 5px 0 0" data-toggle="collapse" data-target="#criterion_{{$index}}"><i class="fa fa-chevron-down togglebutton toggle-arrow-down"></i><i class="fa fa-chevron-up togglebutton toggle-arrow-up"></i></div>            <div data-ng-style="{\'display\': \'inline-block\', \'margin-bottom\': \'6px\', \'width\':\'10px\', \'height\':\'10px\', \'border\':\'solid 1px black\', \'background-color\': criterion.color}"></div>            <div class="truncate" data-ng-class="{true: \'ignoredCriteria\'}[criterion.userWeight == 0]" style="display: inline-block; width: 150px; font-weight: bold">{{criterion.getTitle()}}</div>            <voting class="pull-right"                    data-ng-class="vm.getVotingClass(criterion)"                    data-ng-change="vm.weightUpdated(criterion)"                    min="-vm.mca.userWeightMax"                    max="vm.mca.userWeightMax"                    ng-model="criterion.userWeight"                    style="margin-right: 5px; margin-bottom: 3px;"></voting>            <div id="histogram_{{$index}}" data-ng-show="vm.showSparkline && criterion.criteria.length == 0" style="margin-top: 5px;"></div>            <div data-ng-if="criterion.criteria.length > 0" id="criterion_{{$parent.$index}}" class="collapse out" style="margin-left: 19px">                <div data-ng-repeat="crit in criterion.criteria">                    <div data-ng-style="{\'display\': \'inline-block\', \'margin-bottom\': \'6px\', \'width\':\'10px\', \'height\':\'10px\', \'border\':\'solid 1px black\', \'background-color\': crit.color}"></div>                    <div class="truncate" data-ng-class="{true: \'ignoredCriteria\'}[crit.userWeight == 0 || criterion.userWeight == 0]" style="display: inline-block; width: 150px;">{{crit.getTitle()}}</div>                    <div class="pull-right" style="margin-right: 15px;">{{Math.abs(crit.userWeight)}}</div>                    <voting class="pull-right"                            data-ng-class="vm.getVotingClass(criterion)"                            data-ng-change="vm.weightUpdated(crit)"                            min="0"                            max="vm.mca.userWeightMax"                            ng-model="crit.userWeight"                            style="margin-right: 5px;"></voting>                    <div id="histogram_{{$parent.$index}}_{{$index}}" data-ng-show="vm.showSparkline" style="margin-top: 5px;"></div>                </div>            </div>        </div>        <!--<a href="" style="display: inline-block; width: 100%; text-transform: uppercase"               data-ng-click="vm.calculateMca()" translate="MCA.COMPUTE_MGS" translate-values="{ mcaTitle: vm.mca.title }"></a>-->        <h4 data-ng-if="vm.showChart">            <a href="" data-ng-click="vm.weightUpdated(vm.mca)" translate="MCA.TOTAL_RESULT"></a>            <a href="" data-ng-if="vm.selectedCriterion">&gt;&nbsp;{{vm.selectedCriterion.title}}</a>        </h4>                <a href="" data-ng-if="vm.showFeature" class="pull-right" data-ng-click="vm.toggleMcaChartType();" style="margin-right: 10px">            <i class="fa" data-ng-class="{true: \'fa-bar-chart\', false: \'fa-pie-chart\'}[vm.showAsterChart]"></i>        </a>        <div style="margin-top: 5px; margin-left: auto; margin-right: auto; width: 95%;" id="mcaChart"></div>        <div data-ng-if="vm.showFeature">            <h4>                <img data-ng-if="vm.featureIcon" data-ng-src="{{vm.featureIcon}}" width="24" height="24" style="margin:0 5px" alt="Icon" />                {{vm.selectedFeature.properties[\'Name\']}}            </h4>            <table class="table table-condensed">                <tr data-ng-repeat="item in vm.properties"                    popover="{{item.description}}"                    popover-placement="right"                    popover-trigger="mouseenter"                    popover-append-to-body="true">                    <td><a class="fa fa-filter makeNarrow" data-ng-if="item.canFilter" data-ng-click="vm.$layerService.setFilter(item)" style="cursor: pointer"></a></td>                    <td><a class="fa fa-eye makeNarrow" data-ng-if="item.canStyle" data-ng-click="vm.setStyle(item)" style="cursor: pointer"></a></td>                    <td>{{item.key}}</td>                    <td class="text-right">{{item.value}}</td>                </tr>            </table>        </div>        <i data-ng-if="!vm.showFeature"><div translate="MCA.SHOW_FEATURE_MSG"></div></i>    </div>    <!--<div rating class="pull-right"             data-ng-style="{\'margin\': \'0 10px\', \'background\':\'rgba(0, 0, 0, 0.1)\', \'border-radius\': \'8px\', \'padding\': \'0 4px\', \'color\': criterion.color}"             ng-model="criterion.userWeight" max="11" readonly="isReadonly"             rating-states="ratingStates"             data-ng-click="vm.weightUpdated(criterion)"             on-hover="hoveringOver(value)" on-leave="overStar = null"></div>--></div>';
})(Mca || (Mca = {}));
var Mca;
(function (Mca) {
    'use strict';
    /**
     * Config
     */
    var moduleName = 'csWeb.mca';
    /**
     * Module
     */
    Mca.myModule;
    try {
        Mca.myModule = angular.module(moduleName);
    }
    catch (err) {
        // named module does not exist, so create one
        Mca.myModule = angular.module(moduleName, []);
    }
    /**
     * Directive to display an MCA control.
     */
    Mca.myModule.directive('mca', [
        '$window',
        '$compile',
        '$templateCache',
        function ($window, $compile, $templateCache) {
            return {
                terminal: true,
                restrict: 'EA',
                scope: {},
                template: Mca.html,
                compile: function (el) {
                    $templateCache.put('mcaEditorView.html', McaEditorView.html);
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
    ]);
})(Mca || (Mca = {}));
var Mca;
(function (Mca) {
    'use strict';
    var McaEditorCtrl = (function () {
        function McaEditorCtrl($scope, $modalInstance, $layerService, $translate, messageBusService, mca) {
            var _this = this;
            this.$scope = $scope;
            this.$modalInstance = $modalInstance;
            this.$layerService = $layerService;
            this.$translate = $translate;
            this.messageBusService = messageBusService;
            this.mca = mca;
            this.propInfos = [];
            this.headers = [];
            this.scoringFunctions = [];
            $scope.vm = this;
            this.scoringFunctions.push(new Mca.Models.ScoringFunction(1 /* Ascending */));
            //this.scoringFunctions.push(new Models.ScoringFunction(Models.ScoringFunctionType.Descending));
            this.scoringFunctions.push(new Mca.Models.ScoringFunction(3 /* AscendingSigmoid */));
            //this.scoringFunctions.push(new Models.ScoringFunction(Models.ScoringFunctionType.DescendingSigmoid));
            this.scoringFunctions.push(new Mca.Models.ScoringFunction(5 /* GaussianPeak */));
            //this.scoringFunctions.push(new Models.ScoringFunction(Models.ScoringFunctionType.GaussianValley));
            //this.scoringFunctions.push(new Models.ScoringFunction(Models.ScoringFunctionType.Manual));
            $translate('MCA.LINEAR').then(function (translation) {
                _this.scoringFunctions[0].title = translation;
            });
            $translate('MCA.SIGMOID').then(function (translation) {
                _this.scoringFunctions[1].title = translation;
            });
            $translate('MCA.GAUSSIAN').then(function (translation) {
                _this.scoringFunctions[2].title = translation;
            });
            this.loadMapLayers();
            messageBusService.subscribe('layer', function () {
                _this.loadMapLayers();
            });
            this.mcaTitle = mca.title;
            this.rankTitle = mca.rankTitle;
            this.scaleMin = mca.scaleMinValue;
            this.scaleMax = mca.scaleMaxValue;
            this.selectedFeatureType = mca.featureIds.length === 0 ? '' : this.dataset.featureTypes[mca.featureIds[0]];
            if (this.selectedFeatureType) {
                this.updatePropertyInfo(this.selectedFeatureType);
                this.updatePropertyInfoUponEdit(mca);
            }
            else {
                this.selectFirstFeatureType();
            }
        }
        McaEditorCtrl.prototype.updatePropertyInfoUponEdit = function (criterion, category) {
            var _this = this;
            criterion.criteria.forEach(function (c) {
                if (c.label) {
                    var propInfos = _this.propInfos;
                    for (var i in propInfos) {
                        if (!propInfos.hasOwnProperty(i))
                            continue;
                        var mi = propInfos[i];
                        if (mi.label !== c.label)
                            continue;
                        mi.isSelected = true;
                        mi.minCutoffValue = c.minCutoffValue;
                        mi.maxCutoffValue = c.maxCutoffValue;
                        mi.minValue = c.minValue;
                        mi.maxValue = c.maxValue;
                        mi.userWeight = c.userWeight;
                        if (category) {
                            mi.category = category;
                        }
                        break;
                    }
                }
                else {
                    _this.updatePropertyInfoUponEdit(c, c.title);
                }
            });
        };
        McaEditorCtrl.prototype.loadPropertyTypes = function () {
            this.updatePropertyInfo(this.selectedFeatureType);
        };
        /**
         * Load the features as visible on the map.
         */
        McaEditorCtrl.prototype.loadMapLayers = function () {
            var _this = this;
            var data = {
                type: '',
                features: [],
                featureTypes: {}
            };
            // If we are filtering, load the filter results
            this.$layerService.project.groups.forEach(function (group) {
                if (group.filterResult != null)
                    group.filterResult.forEach(function (f) { return data.features.push(f); });
            });
            // Otherwise, take all loaded features
            if (data.features.length === 0)
                data.features = this.$layerService.project.features;
            data.features.forEach(function (f) {
                if (!(data.featureTypes.hasOwnProperty(f.featureTypeName))) {
                    var featureType = _this.$layerService.featureTypes[f.featureTypeName];
                    if (!featureType.name)
                        featureType.name = f.featureTypeName.replace('_Default', '');
                    data.featureTypes[f.featureTypeName] = featureType;
                }
            });
            this.dataset = data;
        };
        McaEditorCtrl.prototype.selectFirstFeatureType = function () {
            var featureTypes = this.dataset.featureTypes;
            for (var key in featureTypes) {
                if (!featureTypes.hasOwnProperty(key))
                    continue;
                this.selectedFeatureType = featureTypes[key];
                this.updatePropertyInfo(this.selectedFeatureType);
                return;
            }
        };
        McaEditorCtrl.prototype.updatePropertyInfo = function (featureType) {
            var _this = this;
            this.propInfos = [];
            this.headers = [];
            var titles = [];
            var pis = [];
            // Push the Name, so it always appears on top.
            pis.push({
                label: 'Name',
                visibleInCallOut: true,
                title: 'Naam',
                type: 'text',
                filterType: 'text',
                isSelected: false,
                scoringFunctionType: this.scoringFunctions[0].type
            });
            if (featureType.propertyTypeKeys != null) {
                var keys = featureType.propertyTypeKeys.split(';');
                keys.forEach(function (k) {
                    if (_this.$layerService.propertyTypeData.hasOwnProperty(k))
                        pis.push(_this.$layerService.propertyTypeData[k]);
                    else if (featureType.propertyTypeData != null) {
                        var result = $.grep(featureType.propertyTypeData, function (e) { return e.label === k; });
                        if (result.length >= 1)
                            pis.push(result);
                    }
                });
            }
            else if (featureType.propertyTypeData != null) {
                featureType.propertyTypeData.forEach(function (mi) { return pis.push(mi); });
            }
            pis.forEach(function (pi) {
                // TODO Later, we could also include categories and not only numbers, where each category represents a certain value.
                if (pi.visibleInCallOut && pi.type === 'number' && pi.label.indexOf('mca_') < 0 && titles.indexOf(pi.title) < 0) {
                    titles.push(pi.title);
                    // Clone object inline. See http://stackoverflow.com/a/122704/319711
                    _this.propInfos.push({
                        title: pi.title,
                        label: pi.label,
                        stringFormat: pi.stringFormat,
                        isSelected: false,
                        maxValue: pi.maxValue,
                        minValue: pi.minValue,
                        defaultValue: pi.defaultValue,
                        description: pi.description
                    });
                }
            });
        };
        McaEditorCtrl.prototype.toggleSelection = function (metaInfoTitle) {
            var idx = this.headers.indexOf(metaInfoTitle);
            // is currently selected
            if (idx > -1) {
                this.headers.splice(idx, 1);
            }
            else {
                this.headers.push(metaInfoTitle);
            }
        };
        McaEditorCtrl.prototype.isDisabled = function () {
            if (typeof this.mcaTitle === 'undefined' || this.mcaTitle.length === 0)
                return true;
            if (this.propInfos.length === 0 || !this.propInfos.reduce(function (p, c) {
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
            if (this.rankTitle) {
                mca.rankTitle = this.rankTitle || 'Rank';
                mca.rankFormat = '{0} / {1}';
            }
            if (this.scaleMin && this.scaleMax) {
                mca.scaleMinValue = this.scaleMin;
                mca.scaleMaxValue = this.scaleMax;
            }
            mca.userWeightMax = 5;
            var featureTypes = this.dataset.featureTypes;
            for (var key in featureTypes) {
                if (!featureTypes.hasOwnProperty(key))
                    continue;
                if (featureTypes[key] === this.selectedFeatureType)
                    mca.featureIds = [key];
            }
            this.propInfos.forEach(function (mi) {
                if (!mi.isSelected)
                    return;
                var criterion = new Mca.Models.Criterion();
                criterion.label = mi.label;
                criterion.title = mi.title;
                criterion.isPlaScaled = true;
                criterion.description = mi.description;
                criterion.userWeight = mi.userWeight || 1;
                criterion.minCutoffValue = mi.minCutoffValue ? +mi.minCutoffValue : undefined;
                criterion.maxCutoffValue = mi.maxCutoffValue ? +mi.maxCutoffValue : undefined;
                criterion.minValue = mi.minValue ? +mi.minValue : undefined;
                criterion.maxValue = mi.maxValue ? +mi.maxValue : undefined;
                if (mi.scoringFunctionType === 0 /* Manual */) {
                    criterion.scores = mi.scores;
                }
                else {
                    criterion.scores = Mca.Models.ScoringFunction.createScores(mi.scoringFunctionType);
                }
                if (mi.category) {
                    var parent;
                    for (var i in mca.criteria) {
                        if (!mca.criteria.hasOwnProperty(i))
                            continue;
                        var c = mca.criteria[i];
                        if (c.title !== mi.category)
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
                }
                else {
                    mca.criteria.push(criterion);
                }
            });
            this.$modalInstance.close(mca);
        };
        McaEditorCtrl.prototype.cancel = function () {
            this.mcaTitle = '';
            this.rankTitle = '';
            this.headers = [];
            this.$modalInstance.dismiss('cancel');
        };
        McaEditorCtrl.prototype.toggleItemDetails = function (index) {
            this.showItem = this.showItem == index ? -1 : index;
        };
        McaEditorCtrl.$inject = [
            '$scope',
            '$modalInstance',
            'layerService',
            '$translate',
            'messageBusService',
            'mca'
        ];
        return McaEditorCtrl;
    })();
    Mca.McaEditorCtrl = McaEditorCtrl;
})(Mca || (Mca = {}));
var csComp;
(function (csComp) {
    var Services;
    (function (Services) {
        var Widget = (function () {
            function Widget() {
            }
            return Widget;
        })();
        Services.Widget = Widget;
        var BaseWidget = (function () {
            function BaseWidget(title, type) {
                this.sizeY = 2;
                this.sizeX = 4;
                this.renderer = function ($scope) {
                };
                this.resize = function (status) {
                };
                if (title)
                    this.title = title;
                if (type)
                    this.widgetType = type;
                this.properties = {};
                this.dataSets = [];
            }
            BaseWidget.prototype.init = function (sX, sY, c, r, id) {
                this.sizeX = sX;
                this.sizeY = sY;
                this.col = c;
                this.row = r;
                this.background = "red";
                if (!id)
                    id = "widget" + csComp.Helpers.getGuid().replace('-', '');
                this.id = id;
                this.elementId = id;
            };
            BaseWidget.prototype.updateDateRange = function (r) {
                this.range = r;
            };
            return BaseWidget;
        })();
        Services.BaseWidget = BaseWidget;
        var Dashboard = (function () {
            function Dashboard(id, name) {
                this.id = id;
                this.name = name;
                this.widgets = [];
            }
            return Dashboard;
        })();
        Services.Dashboard = Dashboard;
        var DataSet = (function () {
            function DataSet(id, title) {
                this.id = id;
                this.title = title;
                this.data = [];
            }
            return DataSet;
        })();
        Services.DataSet = DataSet;
    })(Services = csComp.Services || (csComp.Services = {}));
})(csComp || (csComp = {}));
var csComp;
(function (csComp) {
    var Services;
    (function (Services) {
        var Event = (function () {
            function Event() {
                var _this = this;
                this.startDate = function () {
                    return new Date(_this.start);
                };
            }
            return Event;
        })();
        Services.Event = Event;
        /**
         * A feature is a single object that is show on a map (e.g. point, polyline, etc)
         * Features are part of a layer and filtered and styled using group filters and styles
         *
         */
        var Feature = (function () {
            function Feature() {
            }
            return Feature;
        })();
        Services.Feature = Feature;
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
        })(Services.DrawingModeType || (Services.DrawingModeType = {}));
        var DrawingModeType = Services.DrawingModeType;
        //export enum propertyTypeType {
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
        })(Services.featureFilterType || (Services.featureFilterType = {}));
        var featureFilterType = Services.featureFilterType;
        var PropertyInfo = (function () {
            function PropertyInfo() {
            }
            return PropertyInfo;
        })();
        Services.PropertyInfo = PropertyInfo;
    })(Services = csComp.Services || (csComp.Services = {}));
})(csComp || (csComp = {}));
var csComp;
(function (csComp) {
    var Services;
    (function (Services) {
        (function (LayerType) {
            LayerType[LayerType["GeoJson"] = 0] = "GeoJson";
            LayerType[LayerType["Kml"] = 1] = "Kml";
        })(Services.LayerType || (Services.LayerType = {}));
        var LayerType = Services.LayerType;
        /** a project group contains a list of layers that can be grouped together.
         * Filters, styles can clustering is always defined on the group level.
         * If a filter is selected (e.g. show only the features within a certain property range)
         * this filter is applied to all layers within this group.
         * If clustering is enabled all features in all layers are grouped together
         */
        var ProjectGroup = (function () {
            function ProjectGroup() {
            }
            return ProjectGroup;
        })();
        Services.ProjectGroup = ProjectGroup;
        /**
         * Filters are used to select a subset of features within a group.
         */
        var GroupFilter = (function () {
            function GroupFilter() {
            }
            return GroupFilter;
        })();
        Services.GroupFilter = GroupFilter;
        /**
         * Styles can determine how features are shown on the map
         */
        var GroupStyle = (function () {
            function GroupStyle($translate) {
                var _this = this;
                this.availableAspects = ['strokeColor', 'fillColor', 'strokeWidth'];
                this.colorScales = {};
                $translate('WHITE_RED').then(function (translation) {
                    _this.colorScales[translation] = ['white', 'red'];
                });
                $translate('RED_WHITE').then(function (translation) {
                    _this.colorScales[translation] = ['red', 'white'];
                });
                $translate('GREEN_RED').then(function (translation) {
                    _this.colorScales[translation] = ['green', 'red'];
                });
                $translate('RED_GREEN').then(function (translation) {
                    _this.colorScales[translation] = ['red', 'green'];
                });
                $translate('BLUE_RED').then(function (translation) {
                    _this.colorScales[translation] = ['#F04030', '#3040F0'];
                });
                $translate('RED_BLUE').then(function (translation) {
                    _this.colorScales[translation] = ['#3040F0', '#F04030'];
                });
                $translate('WHITE_BLUE').then(function (translation) {
                    _this.colorScales[translation] = ['white', 'blue'];
                });
                $translate('BLUE_WHITE').then(function (translation) {
                    _this.colorScales[translation] = ['blue', 'white'];
                });
                $translate('WHITE_GREEN').then(function (translation) {
                    _this.colorScales[translation] = ['white', 'green'];
                });
                $translate('GREEN_WHITE').then(function (translation) {
                    _this.colorScales[translation] = ['green', 'white'];
                });
                $translate('WHITE_ORANGE').then(function (translation) {
                    _this.colorScales[translation] = ['white', 'orange'];
                });
                $translate('ORANGE_WHITE').then(function (translation) {
                    _this.colorScales[translation] = ['orange', 'white'];
                });
            }
            return GroupStyle;
        })();
        Services.GroupStyle = GroupStyle;
    })(Services = csComp.Services || (csComp.Services = {}));
})(csComp || (csComp = {}));
var csComp;
(function (csComp) {
    var Services;
    (function (Services) {
        var availableZoomLevels = [{ title: "decades", value: 315360000000 }, { title: "years", value: 31536000000 }, { title: "weeks", value: 604800000 }, { title: "days", value: 86400000 }, { title: "hours", value: 3600000 }, { title: "quarters", value: 900000 }, { title: "minutes", value: 60000 }, { title: "seconds", value: 1000 }, { title: "milliseconds", value: 1 }];
        var DateRange = (function () {
            function DateRange() {
                var _this = this;
                this.startDate = function () {
                    return new Date(_this.start);
                };
                this.focusDate = function () {
                    return new Date(_this.start);
                };
                this.endDate = function () {
                    return new Date(_this.start);
                };
                if (!focus)
                    this.setFocus(new Date());
            }
            DateRange.prototype.setFocus = function (d, s, e) {
                var _this = this;
                this.focus = d.getTime();
                if (s)
                    this.start = s.getTime();
                if (e)
                    this.end = e.getTime();
                var newRange = this.end - this.start;
                if (this.range !== newRange) {
                    this.range = newRange;
                    availableZoomLevels.some(function (tl) {
                        _this.zoomLevel = tl.value;
                        _this.zoomLevelName = tl.title;
                        return (tl.value < (_this.range / 10));
                    });
                }
            };
            return DateRange;
        })();
        Services.DateRange = DateRange;
        /**
         * Represents to the overall solution class. A solution can contain multiple project.
         * This can be usefull when you want to have the same website, but with different content.
         * e.g. you could make it so that you can switch between different regions
         */
        var Solution = (function () {
            function Solution() {
            }
            return Solution;
        })();
        Services.Solution = Solution;
        /** project within a solution file, refers to a project url*/
        var SolutionProject = (function () {
            function SolutionProject() {
            }
            return SolutionProject;
        })();
        Services.SolutionProject = SolutionProject;
        /** project configuration. */
        var Project = (function () {
            function Project() {
                this.markers = {};
            }
            Project.prototype.deserialize = function (input) {
                this.viewBounds = input.viewBounds;
                this.title = input.title;
                this.description = input.description;
                this.logo = input.logo;
                this.url = input.url;
                this.baselayers = input.baselayers;
                this.markers = input.markers;
                this.startposition = input.startposition;
                this.features = input.features;
                this.featureTypes = input.featureTypes;
                this.propertyTypeData = input.propertyTypeData;
                this.groups = input.groups;
                this.userPrivileges = input.userPrivileges;
                this.mcas = [];
                for (var mca in input.mcas) {
                    if (input.mcas.hasOwnProperty(mca)) {
                        this.mcas.push(new Mca.Models.Mca().deserialize(mca));
                    }
                }
                return this;
            };
            return Project;
        })();
        Services.Project = Project;
        /** layer information. a layer is described in a project file and is always part of a group */
        var ProjectLayer = (function () {
            function ProjectLayer() {
            }
            return ProjectLayer;
        })();
        Services.ProjectLayer = ProjectLayer;
    })(Services = csComp.Services || (csComp.Services = {}));
})(csComp || (csComp = {}));
var McaEditorView;
(function (McaEditorView) {
    McaEditorView.html = '<div class="modal-content">    <div class="modal-header">        <button type="button" class="close" data-ng-click="vm.cancel()" aria-hidden="true">&times;</button>        <h3 class="modal-title" translate>MCA.EDITOR_TITLE</h3>    </div>    <div class="modal-body container-fluid">        <div class="row-fluid">            <input type="text" class="pull-left" data-ng-model="vm.mcaTitle" style="margin: 0 5px" placeholder="{{ \'MCA.TITLE\' | translate }}" />            <!-- <span><input type="checkbox" data-ng-model="vm.hasRank" style="margin-left: 10px;" /><span translate>MCA.INCLUDE_RANK</span></span>-->            <input type="text" class="pull-left" data-ng-model="vm.rankTitle" style="margin: 0 5px"  placeholder="{{ \'MCA.RANK_TITLE\' | translate }}" />            <input type="text" class="pull-left" data-ng-model="vm.scaleMin" style="width: 100px; margin: 0 5px" placeholder="{{ \'MCA.SCALE_MIN_TITLE\' | translate }}" />            <input type="text" class="pull-left" data-ng-model="vm.scaleMax" style="width: 100px; margin: 0 5px" placeholder="{{ \'MCA.SCALE_MAX_TITLE\' | translate }}" />        </div>        <h4 class="row-fluid" style="margin-top: 5px;" translate>MCA.MAIN_FEATURE</h4>        <select data-ng-model="vm.selectedFeatureType"                data-ng-change="vm.loadPropertyTypes()"                data-ng-options="item as item.name for (key, item) in vm.dataset.featureTypes"                class="form-control row-fluid"></select>        <h4 class="row-fluid" translate>MCA.PROPERTIES</h4>        <ul class="form-group row-fluid" style="margin-top: 1em; margin-left: -2em; overflow-y: auto; overflow-x: hidden;"            resize resize-y="450">            <li ng-repeat="mi in vm.propInfos"                class="row-fluid list-unstyled truncate">                <div style="padding: 5px 0;" class="row-fluid">                    <input type="checkbox" name="vm.selectedTitles[]" value="{{mi.title}}"                           data-ng-checked="mi.isSelected"                           data-ng-click="mi.isSelected = !mi.isSelected">&nbsp;&nbsp;{{mi.title}}                    <div data-ng-if="mi.isSelected" class="pull-right">                        <a href="" class="pull-right"                           style="margin-right: 5px;"                           data-ng-click="vm.toggleItemDetails($index)"><i class="fa fa-2x fa-edit"></i></a>                        <input type="text" class="pull-right"                               style="margin: -2px 5px -2px 0;"                               data-ng-model="mi.category"                               placeholder="{{\'MCA.CATEGORY_MSG\' | translate}}" />                    </div>                    <!--<form data-ng-if="mi.isSelected" name="myForm" style="margin-left: 20px;">                <label id="scoringFunctions" data-ng-repeat="sf in vm.scoringFunctions">                    <input type="radio" data-ng-model="mi.scoringFunctionType" value="{{sf.type}}">                    <a data-ng-href="" data-ng-class="sf.cssClass" data-ng-click="mi.isSelected = !mi.isSelected"></a>                </label>            </form>            <div data-ng-if="mi.scoringFunctionType == 0" style="margin-left: 20px;">                input -> score:&nbsp;<input type="text" data-ng-model="mi.scores" placeholder="[x0,y0 x1,y1 ...]"/>            </div>-->                </div>                <div class="row-fluid" data-ng-show="vm.showItem == {{$index}}" id="scoringFunctions">                    <select class="col-xs-10"                            style="margin-right: 5px; margin-bottom: 5px;"                            data-ng-init="mi.scoringFunctionType = mi.scoringFunctionType || vm.scoringFunctions[0]"                            data-ng-model="mi.scoringFunctionType"                            data-ng-options="sf as sf.title for sf in vm.scoringFunctions"></select>                    <div class="pull-right" data-ng-class="mi.scoringFunctionType.cssClass" style="width: 40px; height: 28px; margin-top: -5px;"></div>                    <div class="row-fluid">                        <input type="text" class="col-xs-3" style="padding: 0;" data-ng-model="mi.minValue" placeholder="{{ \'MCA.MIN_VALUE\' | translate }}" />                        <input type="text" class="col-xs-3" style="padding: 0;" data-ng-model="mi.maxValue" placeholder="{{ \'MCA.MAX_VALUE\' | translate }}" />                        <input type="text" class="col-xs-3" style="padding: 0;" data-ng-model="mi.minCutoffValue" placeholder="{{ \'MCA.MIN_CUTOFF_VALUE\' | translate }}" />                        <input type="text" class="col-xs-3" style="padding: 0;" data-ng-model="mi.maxCutoffValue" placeholder="{{ \'MCA.MAX_CUTOFF_VALUE\' | translate }}" />                    </div>                </div>            </li>        </ul>    </div>    <div class="modal-footer">        <button type="button" class="btn btn-warning" data-ng-click="vm.cancel()" translate>CANCEL_BTN</button>        <button type="button" class="btn btn-primary" data-ng-click="vm.save()" translate>OK_BTN</button>    </div></div>';
})(McaEditorView || (McaEditorView = {}));
var ProjectSettings;
(function (ProjectSettings) {
    ProjectSettings.html = '<div>    <div class="wide-tooltip">        <span class="pull-right fa fa-info-circle fa-2x"              tooltip-html-unsafe="{{\'PROJECTSETTINGS.DESCRIPTION\' | translate}}"              tooltip-placement="bottom"              tooltip-trigger="mouseenter"              tooltip-append-to-body="false"              style="margin-right: 5px;"></span>        <h4 class="leftpanel-header" translate="PROJECTSETTINGS.TITLE"></h4>    </div>    <div style="overflow-y: auto; overflow-x: hidden; margin-top: -10px" resize resize-y="95">    </div></div>';
})(ProjectSettings || (ProjectSettings = {}));
var ProjectSettings;
(function (ProjectSettings) {
    /**
      * Config
      */
    var moduleName = 'csWeb.projectSettings';
    /**
      * Module
      */
    ProjectSettings.myModule;
    try {
        ProjectSettings.myModule = angular.module(moduleName);
    }
    catch (err) {
        // named module does not exist, so create one
        ProjectSettings.myModule = angular.module(moduleName, []);
    }
    /**
      * Directive to display the available map layers.
      */
    ProjectSettings.myModule.directive('projectSettings', [
        '$compile',
        function ($compile) {
            return {
                terminal: true,
                restrict: 'E',
                scope: {},
                template: ProjectSettings.html,
                compile: function (el) {
                    var fn = $compile(el);
                    return function (scope) {
                        fn(scope);
                    };
                },
                replace: true,
                transclude: true,
                controller: ProjectSettings.ProjectSettingsCtrl
            };
        }
    ]).directive('bsPopover', function () {
        return function (scope, element, attrs) {
            element.find("a[rel=popover]").popover({ placement: 'right', html: 'true' });
        };
    });
})(ProjectSettings || (ProjectSettings = {}));
var ProjectSettings;
(function (ProjectSettings) {
    var ProjectSettingsCtrl = (function () {
        // dependencies are injected via AngularJS $injector
        // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
        function ProjectSettingsCtrl($scope, $modal, $layerService) {
            this.$scope = $scope;
            this.$modal = $modal;
            this.$layerService = $layerService;
            $scope.vm = this;
        }
        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
        ProjectSettingsCtrl.$inject = [
            '$scope',
            '$modal',
            'layerService'
        ];
        return ProjectSettingsCtrl;
    })();
    ProjectSettings.ProjectSettingsCtrl = ProjectSettingsCtrl;
})(ProjectSettings || (ProjectSettings = {}));
var Timeline;
(function (Timeline) {
    Timeline.html = '<div>    <style>        #timeline {            position: absolute;            bottom: 0;            height: 100px;            width: 100%;            background: white;        }        .callout.top::before {            left: 45%;            bottom: -20px;            border-top: 10px solid #444;        }        .callout::before {            content: "";            width: 0px;            height: 0px;            border: 0.8em solid transparent;            position: absolute;        }        .focustimeButton {            margin: 3px;            cursor: pointer;        }        #focustimeContainer {            width: 150px;            cursor: e-resize;            height: 75px;            right: 200px;            bottom: 105px;            color: white;            position: absolute;            z-index: 1000;            /* float: right; */            display: block;        }        .timelineControl {            background: black;            height: 23px;        }        .isPlaying {            background: gray;        }        .showControl {            height: 75px;        }        .focustimeText {            text-align: center;            background: #444;            bottom: 0;            position: absolute;            width: 100%;            height: 52px;        }        .pinButton {            color: red;        }         .livebutton {  display: inline-block;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;padding: 4px;margin-right: 0;border: none;font: 16px;color: rgba(255,255,255,1);text-decoration: normal;text-align: center;-o-text-overflow: clip;text-overflow: clip;white-space: pre;cursor: pointer;transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);}        @keyframes flickerAnimation {  0%   { opacity:1; }  50%  { opacity:0.2; }  100% { opacity:1; }}@-o-keyframes flickerAnimation{  0%   { opacity:1; }  50%  { opacity:0.2; }  100% { opacity:1; }}@-moz-keyframes flickerAnimation{  0%   { opacity:1; }  50%  { opacity:00.2; }  100% { opacity:1; }}@-webkit-keyframes flickerAnimation{  0%   { opacity:1; }  50%  { opacity:0.2; }  100% { opacity:1; }} .islivebutton {     display: inline-block;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;padding: 4px;margin-right: 0;border: none;font: 16px;color: rgba(255,255,255,1);text-decoration: normal;text-align: center;-o-text-overflow: clip;text-overflow: clip;white-space: pre;cursor: pointer;           text-shadow: 0 0 2.5px rgba(255,255,255,1) , 0 0 5px rgba(255,255,255,1) , 0 0 7.5px rgba(255,255,255,1) , 0 0 10px #ff0000, 0 0 15px #ff0000 , 0 0 20px #ff0000, 0 0 25px #ff0000;-webkit-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);-moz-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);-o-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);-webkit-animation: flickerAnimation 1s infinite;   -moz-animation: flickerAnimation 1s infinite;   -o-animation: flickerAnimation 1s infinite;    animation: flickerAnimation 1s infinite;    cursor: pointer;        }    </style>    <div>        <div id="timelinecontainer">            <div id="timeline"></div>        </div>        <div class="callout top" id="focustimeContainer" ng-class="{showControl : vm.showControl}" ng-mouseenter="vm.mouseEnter()" ng-mouseleave="vm.mouseLeave()">            <div ng-show="vm.showControl" class="timelineControl" ng-class="{isPlaying : vm.isPlaying}">                <span ng-hide="vm.$layerService.project.timeLine.isLive" class="focustimeButton">                    <div ng-hide="vm.isPlaying" class="fa fa-play focustimeButton" ng-click="vm.start()"></div>                    <div ng-show="vm.isPlaying" class="fa fa-stop focustimeButton" ng-click="vm.stop()"></div>                </span>                <div style="float: right">{{vm.$layerService.project.timeLine.levelName}}</div>                <div ng-click="vm.toggleLive()" class="islivebutton" ng-show="vm.$layerService.project.timeLine.isLive" style="float: right">live</div>                <div ng-click="vm.toggleLive()" class="livebutton" ng-hide="vm.$layerService.project.timeLine.isLive" style="float: right">go live</div>                <!--<div ng-hide="vm.isPinned" class="fa fa-thumb-tack focustimeButton pinButton" ng-class="{isPinned : vm.isPinned}" ng-click="vm.pinToNow()"></div>-->            </div>            <div class="focustimeText">                <span style="font-weight: bold">{{vm.line1}}</span><br />                <span>{{vm.line2}}</span>            </div>        </div>    </div></div>';
})(Timeline || (Timeline = {}));
var Timeline;
(function (Timeline) {
    /**
      * Config
      */
    var moduleName = 'csWeb.timeline';
    /**
      * Module
      */
    Timeline.myModule;
    try {
        Timeline.myModule = angular.module(moduleName);
    }
    catch (err) {
        // named module does not exist, so create one
        Timeline.myModule = angular.module(moduleName, []);
    }
    /**
      * Directive to display the available map layers.
      */
    Timeline.myModule.directive('timeline', [
        '$compile',
        function ($compile) {
            return {
                terminal: true,
                restrict: 'E',
                scope: {},
                template: Timeline.html,
                compile: function (el) {
                    var fn = $compile(el);
                    return function (scope) {
                        fn(scope);
                    };
                },
                replace: true,
                transclude: true,
                controller: Timeline.TimelineCtrl
            };
        }
    ]);
})(Timeline || (Timeline = {}));
var Timeline;
(function (Timeline) {
    var TimelineCtrl = (function () {
        // dependencies are injected via AngularJS $injector
        // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
        function TimelineCtrl($scope, $layerService, $mapService, $messageBusService) {
            var _this = this;
            this.$scope = $scope;
            this.$layerService = $layerService;
            this.$mapService = $mapService;
            this.$messageBusService = $messageBusService;
            this.locale = "en-us";
            $scope.vm = this;
            this.$messageBusService.subscribe("timeline", function (s, data) {
                switch (s) {
                    case "updateTimerange":
                        _this.$scope.timeline.setVisibleChartRange(data.start, data.end);
                        _this.updateFocusTime();
                        break;
                }
            });
            //$scope.focusDate = $layerService.project.timeLine.focusDate();
            // Options voor de timeline
            var options = {
                'width': '100%',
                'height': '100px',
                'editable': false,
                'layout': 'box'
            };
            $scope.timeline = new links.Timeline(document.getElementById('timeline'), options);
            this.$layerService.timeline = $scope.timeline;
            $scope.timeline.draw();
            links.events.addListener($scope.timeline, 'rangechange', _.throttle(function (prop) { return _this.onRangeChanged(prop); }, 200));
            links.events.addListener($scope.timeline, 'rangechange', function () {
                if (_this.$layerService.project && _this.$layerService.project.timeLine.isLive) {
                    _this.myTimer();
                }
            });
            this.updateDragging();
            this.updateFocusTime();
        }
        TimelineCtrl.prototype.updateDragging = function () {
            var _this = this;
            if (this.$layerService.project && this.$layerService.project.timeLine.isLive) {
                $("#focustimeContainer").draggable('disable');
            }
            else {
                $("#focustimeContainer").draggable({
                    axis: "x",
                    containment: "parent",
                    drag: _.throttle(function () { return _this.updateFocusTime(); }, 200)
                });
                $("#focustimeContainer").draggable('enable');
            }
        };
        TimelineCtrl.prototype.onRangeChanged = function (properties) {
            this.updateFocusTime();
        };
        TimelineCtrl.prototype.start = function () {
            var _this = this;
            this.stop();
            this.isPlaying = true;
            if (this.timer)
                this.timer = null;
            this.timer = setInterval(function () {
                _this.myTimer();
            }, 500);
        };
        TimelineCtrl.prototype.toggleLive = function () {
            if (!this.$layerService.project)
                return;
            this.stop();
            this.$layerService.project.timeLine.isLive = !this.$layerService.project.timeLine.isLive;
            if (this.$layerService.project.timeLine.isLive) {
                this.myTimer();
                this.start();
            }
            this.updateDragging();
            //this.isPlaying = this.isLive;
        };
        TimelineCtrl.prototype.myTimer = function () {
            var tl = this.$scope.timeline;
            if (this.$layerService.project.timeLine.isLive) {
                var pos = tl.timeToScreen(new Date());
                $("#focustimeContainer").css('left', pos - 75);
                this.$scope.$apply();
                this.updateFocusTime();
            }
            else {
                tl.move(0.005);
                this.updateFocusTime();
            }
        };
        TimelineCtrl.prototype.mouseEnter = function () {
            this.showControl = true;
        };
        TimelineCtrl.prototype.mouseLeave = function () {
            if (!this.isPlaying)
                this.showControl = false;
        };
        TimelineCtrl.prototype.pinToNow = function () {
            this.isPinned = true;
            this.start();
        };
        TimelineCtrl.prototype.stop = function () {
            this.isPlaying = false;
            if (this.timer)
                clearInterval(this.timer);
        };
        TimelineCtrl.prototype.updateFocusTime = function () {
            var tl = this.$scope.timeline;
            tl.showCustomTime = true;
            tl.setCustomTime = new Date(2014, 11, 27, 20, 40, 0);
            var tc1 = $("#focustimeContainer").offset().left;
            var tc2 = $("#timelinecontainer").offset().left - 15; // + 55;
            var centerX = tc1 - tc2 + $("#focustimeContainer").width() / 2;
            //var end = $("#timeline").width;
            var range = this.$scope.timeline.getVisibleChartRange();
            //tl.calcConversionFactor();
            this.focusDate = new Date(this.$scope.timeline.screenToTime(centerX));
            this.startDate = range.start; //new Date(range.start); //this.$scope.timeline.screenToTime(0));
            this.endDate = range.end; //new Date(this.$scope.timeline.screenToTime(end));
            if (this.$layerService.project != null && this.$layerService.project.timeLine != null) {
                var projecttime = this.$layerService.project.timeLine;
                projecttime.setFocus(this.focusDate, this.startDate, this.endDate);
                var month = this.focusDate.toLocaleString(this.locale, { month: "long" });
                switch (projecttime.zoomLevelName) {
                    case "decades":
                        this.line1 = this.focusDate.getFullYear().toString();
                        this.line2 = "";
                        break;
                    case "years":
                        this.line1 = this.focusDate.getFullYear().toString();
                        this.line2 = month;
                        break;
                    case "weeks":
                        this.line1 = this.focusDate.getFullYear().toString();
                        this.line2 = moment(this.focusDate).format('DD') + " " + month;
                        break;
                    case "milliseconds":
                        this.line1 = moment(this.focusDate).format('MM - DD - YYYY');
                        this.line2 = moment(this.focusDate).format('HH:mm:ss.SSS');
                        break;
                    default:
                        this.line1 = moment(this.focusDate).format('MM - DD - YYYY');
                        this.line2 = moment(this.focusDate).format('HH:mm:ss');
                }
            }
            this.$messageBusService.publish("timeline", "focusChange", this.focusDate);
            //this.$layerService.focusTime = new Date(this.timelineCtrl.screenToTime(centerX));
            //this.$scope.$apply();
        };
        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
        TimelineCtrl.$inject = [
            '$scope',
            'layerService',
            'mapService',
            'messageBusService'
        ];
        return TimelineCtrl;
    })();
    Timeline.TimelineCtrl = TimelineCtrl;
})(Timeline || (Timeline = {}));
var Voting;
(function (Voting) {
    /**
      * Config
      */
    var moduleName = 'csWeb.voting';
    /**
      * Module
      */
    Voting.myModule;
    try {
        Voting.myModule = angular.module(moduleName);
    }
    catch (err) {
        // named module does not exist, so create one
        Voting.myModule = angular.module(moduleName, []);
    }
    /**
      * Directive to display an MCA control.
      */
    Voting.myModule.directive('voting', ['$timeout', function ($timeout) {
        return {
            restrict: 'EA',
            require: '^ngModel',
            scope: {
                min: '=',
                max: '=',
                ngModel: '=',
                ngChange: '&'
            },
            template: '<div style="line-height: 12px; vertical-align: top; margin: 0; background: rgba(0, 0, 0, 0.1); border-radius: 6px; padding: 4px 6px;">' + '<a href="" data-ng-click="decrement()" data-ng-disabled="ngModel <= min" style="float: left;"><i class="fa" data-ng-class="{true: \'fa-minus-square\', false: \'fa-minus-square-o\'}[ngModel > min]"></i></a>' + '<span style="float: left; width:28px; text-align: center;">{{ngModel}}</span>' + '<a href="" data-ng-click="increment()" data-ng-disabled="ngModel >= max"><i class="fa" data-ng-class="{true: \'fa-plus-square\' , false: \'fa-plus-square-o\' }[ngModel < max]"></i></a>' + '</div>',
            link: function ($scope) {
                $scope.increment = function () {
                    if ($scope.ngModel >= $scope.max)
                        return;
                    $scope.ngModel++;
                    $timeout($scope.ngChange, 0);
                };
                $scope.decrement = function () {
                    if ($scope.ngModel <= $scope.min)
                        return;
                    $scope.ngModel--;
                    $timeout($scope.ngChange, 0);
                };
            }
        };
    }]);
})(Voting || (Voting = {}));
var csComp;
(function (csComp) {
    var Helpers;
    (function (Helpers) {
        function supportsDataUri() {
            var isOldIE = navigator.appName === "Microsoft Internet Explorer";
            var isIE11 = !!navigator.userAgent.match(/Trident\/7\./);
            return !(isOldIE || isIE11); //Return true if not any IE
        }
        Helpers.supportsDataUri = supportsDataUri;
        function standardDeviation(values) {
            var avg = average(values);
            var squareDiffs = values.map(function (value) {
                var diff = value - avg;
                var sqrDiff = diff * diff;
                return sqrDiff;
            });
            var avgSquareDiff = average(squareDiffs);
            var stdDev = Math.sqrt(avgSquareDiff);
            return { avg: avg, stdDev: stdDev };
        }
        Helpers.standardDeviation = standardDeviation;
        function average(data) {
            var sum = data.reduce(function (accumulatedSum, value) { return (accumulatedSum + value); }, 0);
            var avg = sum / data.length;
            return avg;
        }
        Helpers.average = average;
        /**
         * Collect all the property types that are referenced by a feature type.
         */
        function getPropertyTypes(type, propertyTypeData) {
            var propertyTypes = [];
            if (type.propertyTypeKeys != null) {
                var keys = type.propertyTypeKeys.split(';');
                keys.forEach(function (key) {
                    // First, lookup key in global propertyTypeData
                    if (propertyTypeData.hasOwnProperty(key))
                        propertyTypes.push(propertyTypeData[key]);
                    else if (type.propertyTypeData != null) {
                        var result = $.grep(type.propertyTypeData, function (e) { return e.label === key; });
                        if (result.length >= 1)
                            propertyTypes.push(result);
                    }
                });
            }
            if (type.propertyTypeData != null) {
                type.propertyTypeData.forEach(function (pt) {
                    propertyTypes.push(pt);
                });
            }
            return propertyTypes;
        }
        Helpers.getPropertyTypes = getPropertyTypes;
        /**
         * Convert a property value to a display value using the property info.
         */
        function convertPropertyInfo(pt, text) {
            var displayValue;
            if (!csComp.StringExt.isNullOrEmpty(text) && !$.isNumeric(text))
                text = text.replace(/&amp;/g, '&');
            if (csComp.StringExt.isNullOrEmpty(text))
                return text;
            switch (pt.type) {
                case "bbcode":
                    if (!csComp.StringExt.isNullOrEmpty(pt.stringFormat))
                        text = String.format(pt.stringFormat, text);
                    displayValue = XBBCODE.process({ text: text }).html;
                    break;
                case "number":
                    if (!$.isNumeric(text))
                        displayValue = text;
                    else if (!pt.stringFormat)
                        displayValue = text.toString();
                    else
                        displayValue = String.format(pt.stringFormat, parseFloat(text));
                    break;
                case "options":
                    if (!$.isNumeric(text))
                        displayValue = text;
                    else
                        displayValue = pt.options[text];
                    break;
                case "rank":
                    var rank = text.split(',');
                    if (rank.length != 2)
                        return text;
                    if (pt.stringFormat)
                        displayValue = String.format(pt.stringFormat, rank[0], rank[1]);
                    else
                        displayValue = String.format("{0) / {1}", rank[0], rank[1]);
                    break;
                default:
                    displayValue = text;
                    break;
            }
            return displayValue;
        }
        Helpers.convertPropertyInfo = convertPropertyInfo;
        /**
        * Set the name of a feature.
        * @param {csComp.Services.IFeature} feature
        */
        function setFeatureName(feature) {
            // Case one: we don't need to set it, as it's already present.
            if (feature.properties.hasOwnProperty('Name'))
                return;
            // Case two: the feature's style tells us what property to use for the name.
            var nameLabel = feature.fType.style.nameLabel;
            if (nameLabel && feature.properties.hasOwnProperty(nameLabel)) {
                feature.properties['Name'] = feature.properties[nameLabel];
                return;
            }
            for (var i = 0; i < feature.fType.propertyTypeData.length; i++) {
                var propertyType = feature.fType.propertyTypeData[i];
                if (propertyType.label !== 'Name')
                    continue;
                feature.properties['Name'] = Helpers.convertStringFormat(feature, propertyType.stringFormat);
                return;
            }
            for (var prop in feature.properties) {
                feature.properties['Name'] = prop.toString();
                return;
            }
            // Finally, just create a GUID.
            feature.properties['Name'] = Helpers.getGuid();
        }
        Helpers.setFeatureName = setFeatureName;
        /**
        * Convert a feature's stringFormat to a string.
        * @param {Services.IFeature} feature
        * @param {string} stringFormat
        */
        function convertStringFormat(feature, stringFormat) {
            var openingBrackets = Helpers.indexes(stringFormat, '{');
            var closingBrackets = Helpers.indexes(stringFormat, '}');
            var convertedStringFormat = stringFormat;
            for (var j = 0; j < openingBrackets.length; j++) {
                var searchValue = stringFormat.substring(openingBrackets[j] + 1, closingBrackets[j]);
                convertedStringFormat = convertedStringFormat.replace('{' + searchValue + '}', feature.properties[searchValue]);
            }
            return convertedStringFormat;
        }
        Helpers.convertStringFormat = convertStringFormat;
        /**
        * Get all indexes of the 'find' substring in the 'source' string.
        * @param {string} source
        * @param {string} find
        */
        function indexes(source, find) {
            var result = [];
            for (var i = 0; i < source.length; i++) {
                if (source.substr(i, find.length) === find)
                    result.push(i);
            }
            return result;
        }
        Helpers.indexes = indexes;
        function getGuid() {
            var guid = (this.S4() + this.S4() + "-" + this.S4() + "-4" + this.S4().substr(0, 3) + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4()).toLowerCase();
            return guid;
        }
        Helpers.getGuid = getGuid;
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        Helpers.S4 = S4;
    })(Helpers = csComp.Helpers || (csComp.Helpers = {}));
})(csComp || (csComp = {}));
var csComp;
(function (csComp) {
    var Services;
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
                MessageBusService.cache[topic].forEach(function (cb) { return cb(title, data); });
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
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
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
    })(Services = csComp.Services || (csComp.Services = {}));
})(csComp || (csComp = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var csComp;
(function (csComp) {
    var Helpers;
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
             * Draw a histogram, and, if xy is specified, a line plot of x versus y (e.g. a scoring function).
             */
            Plot.drawHistogram = function (values, options) {
                var id = (options != null && options.hasOwnProperty("id")) ? options.id : "myHistogram";
                var numberOfBins = (options != null && options.hasOwnProperty("numberOfBins")) ? options.numberOfBins : 10;
                var width = (options != null && options.hasOwnProperty("width")) ? options.width : 200;
                var height = (options != null && options.hasOwnProperty("height")) ? options.height : 150;
                var xLabel = (options != null && options.hasOwnProperty("xLabel")) ? options.xLabel : "";
                var selectedValue = (options != null && options.hasOwnProperty("selectedValue")) ? options.selectedValue : null;
                //var yLabel       = (options != null && options.hasOwnProperty('yLabel'))        ? options.yLabel        : '#';
                var margin = { top: 0, right: 6, bottom: 24, left: 6 };
                width -= margin.left + margin.right, height -= margin.top + margin.bottom;
                var svgId = 'the_SVG_ID';
                Plot.clearSvg(svgId);
                if (values.length < numberOfBins)
                    return;
                // A formatter for counts.
                var formatCount = d3.format(",.0f");
                var max = Math.max.apply(null, values);
                var min = Math.min.apply(null, values);
                var range = max - min;
                // Scale the x-range, so we don't have such long numbers
                var scale = Plot.getScale(range / numberOfBins, max);
                //var scale = range >= 10
                //    ? Math.max(d3.round(range, 0), d3.round(max, 0)).toString().length - 2 // 100 -> 1
                //    : -2;
                var scaleFactor = 0;
                if (Math.abs(scale) > 0) {
                    xLabel += " (x10^" + scale + ")";
                    scaleFactor = Math.pow(10, scale);
                }
                var tickFormatter = function (value) {
                    return scaleFactor > 0 ? d3.round(value / scaleFactor, 0).toString() : d3.round(value, 0).toString();
                };
                var tempScale = d3.scale.linear().domain([0, numberOfBins]).range([min, max]);
                var tickArray = d3.range(numberOfBins + 1).map(tempScale);
                var x = d3.scale.linear().domain([min, max]).range([0, width]);
                var xAxis = d3.svg.axis().scale(x).tickValues(tickArray).tickFormat(tickFormatter).orient("bottom");
                // Generate a histogram using numberOfBins uniformly-spaced bins.
                var data = d3.layout.histogram().bins(numberOfBins)(values);
                var y = d3.scale.linear().domain([0, d3.max(data, function (d) { return d.y; })]).range([height, 0]);
                var svg = d3.select("#" + id).append("svg").attr("id", svgId).attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).attr("style", "display: block; margin: 0 auto;").append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                var bar = svg.selectAll(".bar").data(data).enter().append("g").attr("class", function (d, i) {
                    return selectedValue != null && (d.x < selectedValue && selectedValue < d.x + data[i].dx) ? "bar highlight" : "bar";
                }).attr("transform", function (d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });
                bar.append("rect").attr("x", 1).attr("width", x(min + data[0].dx) - 1).attr("height", function (d) { return height - y(d.y); });
                var conditionalFormatCounter = function (value) {
                    return (height - y(value) > 6) ? formatCount(value) : "";
                };
                // Text (count) inside the bins
                bar.append("text").attr("dy", ".75em").attr("y", 6).attr("x", x(min + data[0].dx) / 2).attr("text-anchor", "middle").text(function (d) { return conditionalFormatCounter(d.y); });
                // x-label
                svg.append("text").attr("class", "x label").attr("text-anchor", "end").attr("x", width).attr("y", height / 2 - 6).text(xLabel);
                svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);
            };
            Plot.getScale = function (stepSize, max) {
                for (var sf = -5; sf < 5; sf++) {
                    var scale = Math.pow(10, sf);
                    var ls = d3.round(stepSize / scale, 0);
                    var lm = d3.round(max / scale, 0);
                    if (0 < ls && ls < 10 && 0 < lm && lm < 100)
                        return sf;
                }
                return 0;
            };
            Plot.drawMcaPlot = function (values, options) {
                var id = (options != null && options.hasOwnProperty("id")) ? options.id : "myHistogram";
                var numberOfBins = (options != null && options.hasOwnProperty("numberOfBins")) ? options.numberOfBins : 10;
                var width = (options != null && options.hasOwnProperty("width")) ? options.width : 200;
                var height = (options != null && options.hasOwnProperty("height")) ? options.height : 150;
                var xLabel = (options != null && options.hasOwnProperty("xLabel")) ? options.xLabel : "";
                var xyData = (options != null && options.hasOwnProperty("xy")) ? options.xy : null;
                var featureValue = (options != null && options.hasOwnProperty("featureValue")) ? options.featureValue : null;
                //var yLabel       = (options != null && options.hasOwnProperty('yLabel'))       ? options.yLabel       : '#';
                var margin = { top: 0, right: 6, bottom: 24, left: 6 };
                width -= margin.left + margin.right, height -= margin.top + margin.bottom;
                var svgId = id + "_histogram";
                Plot.clearSvg(svgId);
                // A formatter for counts.
                var formatCount = d3.format(",.0f");
                var max, min, range;
                if (xyData != null) {
                    max = xyData.x[xyData.x.length - 1];
                    min = xyData.x[0];
                    range = max - min;
                    max += range / 10;
                    min -= range / 10;
                    range = max - min;
                }
                else {
                    max = Math.max.apply(null, values);
                    min = Math.min.apply(null, values);
                    range = max - min;
                }
                // Scale the x-range, so we don't have such long numbers
                var scale = Plot.getScale(range / numberOfBins, max);
                //var scale = range >= 10
                //    ? Math.max(d3.round(range, 0), d3.round(max, 0)).toString().length - 2 // 100 -> 1
                //    : -2;
                var scaleFactor = 0;
                xLabel += " (";
                if (Math.abs(scale) > 0) {
                    xLabel += "x10^" + scale;
                    scaleFactor = Math.pow(10, scale);
                }
                var tickFormatter = function (value) {
                    return scaleFactor > 0 ? d3.round(value / scaleFactor, 0).toString() : d3.round(value, 0).toString();
                };
                var tempScale = d3.scale.linear().domain([0, numberOfBins]).range([min, max]);
                var tickArray = d3.range(numberOfBins + 1).map(tempScale);
                var x = d3.scale.linear().domain([min, max]).range([0, width]);
                var xAxis = d3.svg.axis().scale(x).tickValues(tickArray).tickFormat(tickFormatter).orient("bottom");
                // Generate a histogram using numberOfBins uniformly-spaced bins.
                var valuesInRange = values.filter(function (value) { return (min <= value && value <= max); });
                if (valuesInRange.length < 3) {
                    var svg1 = d3.select("#" + id).append("svg").attr("id", svgId).attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                    svg1.append("text").attr("class", "x label").attr("text-anchor", "center").attr("x", width / 2).attr("y", height / 2 + 6).text("\u03A7 NO DATA IN RANGE");
                    return;
                }
                xLabel += " \u03A3" + valuesInRange.length;
                var data = d3.layout.histogram().bins(numberOfBins)(valuesInRange);
                var y = d3.scale.linear().domain([0, d3.max(data, function (d) { return d.y; })]).range([height, 0]);
                var svg = d3.select("#" + id).append("svg").attr("id", svgId).attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).attr("style", "display: block; margin: 0 auto;").append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                var bar = svg.selectAll(".bar").data(data).enter().append("g").attr("class", "bar").attr("transform", function (d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });
                bar.append("rect").attr("x", 1).attr("width", x(min + data[0].dx) - 1).attr("height", function (d) { return height - y(d.y); });
                var conditionalFormatCounter = function (value) {
                    return (height - y(value) > 6) ? formatCount(value) : "";
                };
                // Text (count) inside the bins
                bar.append("text").attr("dy", ".75em").attr("y", 6).attr("x", x(min + data[0].dx) / 2).attr("text-anchor", "middle").text(function (d) { return conditionalFormatCounter(d.y); });
                // x-label
                xLabel += ")";
                svg.append("text").attr("class", "x label").attr("text-anchor", "end").attr("x", width).attr("y", height / 2 - 6).text(xLabel);
                svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);
                if (xyData == null)
                    return;
                // Draw line chart
                var xy = [];
                xy.push({ x: min, y: xyData.y[0] });
                for (var i = 0; i < xyData.x.length; i++) {
                    xy.push({ x: xyData.x[i], y: xyData.y[i] });
                }
                xy.push({ x: max, y: xyData.y[xyData.y.length - 1] });
                var y2 = d3.scale.linear().domain([0, d3.max(xy, function (d) { return d.y; })]).range([height - 1, 1]);
                var lineFunc = d3.svg.line().x(function (d) { return x(d.x); }).y(function (d) { return y2(d.y); }).interpolate("linear");
                svg.append("svg:path").attr("d", lineFunc(xy)).attr("stroke", "red").attr("stroke-width", 2).attr("fill", "none");
                if (featureValue == null)
                    return;
                // Draw feature on the score
                xy = [];
                xy.push({ x: featureValue, y: 0 });
                xy.push({ x: featureValue, y: height });
                svg.append("svg:path").attr("d", lineFunc(xy)).attr("stroke", "blue").attr("stroke-width", 2).attr("fill", "none");
            };
            /**
            * Draw a Pie chart.
            */
            Plot.drawPie = function (pieRadius, data, parentId, colorScale, svgId) {
                if (parentId === void 0) { parentId = 'mcaPieChart'; }
                if (colorScale === void 0) { colorScale = 'Reds'; }
                if (svgId === void 0) { svgId = 'the_SVG_ID'; }
                Plot.clearSvg(svgId);
                if (!data)
                    return;
                var width = pieRadius, height = pieRadius, radius = Math.min(width, height) / 2, innerRadius = 0;
                var pie = d3.layout.pie().sort(null).value(function (d) { return d.weight; });
                var tip = d3.tip().attr('class', 'd3-tip').offset([0, 0]).html(function (d) { return '<strong>' + d.data.label + ": </strong><span style='color:orangered'>" + Math.round(d.data.weight * 100) + "%</span>"; });
                var arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(radius);
                var outlineArc = d3.svg.arc().innerRadius(innerRadius).outerRadius(radius);
                var svg = d3.select('#' + parentId).append("svg").attr("id", svgId).attr("width", width).attr("height", height).attr("style", "display: block; margin: 0 auto;").append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
                svg.call(tip);
                var colors = chroma.scale(colorScale).domain([0, data.length - 1], data.length);
                var path = svg.selectAll(".solidArc").data(pie(data)).enter().append("path").attr("fill", function (d, i) { return d.data.color || colors(i).hex(); }).attr("class", "solidArc").attr("stroke", "gray").attr("d", arc).on('mouseover', function (d, i) {
                    tip.show(d, i);
                }).on('mouseout', tip.hide);
                var outerPath = svg.selectAll(".outlineArc").data(pie(data)).enter().append("path").attr("fill", "none").attr("stroke", "gray").attr("class", "outlineArc").attr("d", outlineArc);
            };
            /**
            * Draw an Aster Pie chart, i.e. a pie chart with varying radius depending on the score, where the maximum score of 100 equals the pie radius.
            * See http://bl.ocks.org/bbest/2de0e25d4840c68f2db1
            */
            Plot.drawAsterPlot = function (pieRadius, data, parentId, colorScale, svgId) {
                if (parentId === void 0) { parentId = 'mcaPieChart'; }
                if (colorScale === void 0) { colorScale = 'Reds'; }
                if (svgId === void 0) { svgId = 'the_SVG_ID'; }
                Plot.clearSvg(svgId);
                if (!data)
                    return;
                var width = pieRadius, height = pieRadius, radius = Math.min(width, height) / 2, innerRadius = 0.3 * radius;
                var pie = d3.layout.pie().sort(null).value(function (d) { return d.weight; });
                var tip = d3.tip().attr('class', 'd3-tip').offset([0, 0]).html(function (d) { return '<strong>' + d.data.label + ": </strong> <span style='color:orangered'>" + Math.round(d.data.weight * 100) + "% x " + Math.round(d.data.score) + "&nbsp; = " + Math.round(d.data.weight * d.data.score) + "</span>"; });
                var arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(function (d) { return (radius - innerRadius) * (d.data.score / 100.0) + innerRadius; });
                var outlineArc = d3.svg.arc().innerRadius(innerRadius).outerRadius(radius);
                var svg = d3.select('#' + parentId).append("svg").attr("id", svgId).attr("width", width).attr("height", height).attr("style", "display: block; margin: 0 auto;").append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
                try {
                    svg.call(tip);
                }
                catch (err) {
                    console.log("Error: " + err.message);
                }
                var colors = chroma.scale(colorScale).domain([0, data.length - 1], data.length);
                var path = svg.selectAll(".solidArc").data(pie(data)).enter().append("path").attr("fill", function (d, i) { return d.data.color || colors(i).hex(); }).attr("class", "solidArc").attr("stroke", "gray").attr("d", arc).on('mouseover', function (d, i) {
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
    })(Helpers = csComp.Helpers || (csComp.Helpers = {}));
})(csComp || (csComp = {}));
var Helpers;
(function (Helpers) {
    var Resize;
    (function (Resize) {
        /**
         * Config
         */
        var moduleName = 'csWeb.resize';
        /**
          * Module
          */
        Resize.myModule;
        try {
            Resize.myModule = angular.module(moduleName);
        }
        catch (err) {
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
        Resize.myModule.directive('resize', ['$window', function ($window) {
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
        }]);
    })(Resize = Helpers.Resize || (Helpers.Resize = {}));
})(Helpers || (Helpers = {}));
var LegendList;
(function (LegendList) {
    LegendList.html = '<div style="position: relative;">    <h4 class="leftpanel-header" translate="LEGEND"></h4>    <div>        <div ng-repeat="legendItem in legendItems" class="legendItem">            <div class="legendIcon">                <img ng-src="{{legendItem.uri}}" class="legendImage" />            </div>            <span class="legendText">{{legendItem.title}}</span>        </div>    </div></div>';
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
    try {
        LegendList.myModule = angular.module(moduleName);
    }
    catch (err) {
        // named module does not exist, so create one
        LegendList.myModule = angular.module(moduleName, []);
    }
    /**
      * Directive to display the available map layers.
      */
    LegendList.myModule.directive('legendList', [
        '$window',
        '$compile',
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
            var iconUri = ft.style.iconUri;
            if (iconUri == null)
                iconUri = "includes/images/marker.png";
            if (iconUri.indexOf('{') >= 0)
                iconUri = iconUri.replace('{', '').replace('}', '');
            if (ft.style != null && ft.style.drawingMode != null && ft.style.drawingMode.toLowerCase() != "point") {
                if (iconUri.indexOf('_Media') < 0)
                    return iconUri;
                else
                    return "includes/images/polygon.png";
            }
            else if (ft.style != null && iconUri != null) {
                return iconUri;
            }
            else {
                return "includes/images/marker.png";
            }
        };
        LegendListCtrl.prototype.getName = function (key, ft) {
            return ft.name || key.replace('_Default', '');
        };
        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
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
    try {
        FeatureList.myModule = angular.module(moduleName);
    }
    catch (err) {
        // named module does not exist, so create one
        FeatureList.myModule = angular.module(moduleName, []);
    }
    /**
      * Directive to display the available map layers.
      */
    FeatureList.myModule.directive('featureList', [
        '$window',
        '$compile',
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
        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
        FeatureListCtrl.$inject = [
            '$scope',
            'layerService',
            'mapService'
        ];
        return FeatureListCtrl;
    })();
    FeatureList.FeatureListCtrl = FeatureListCtrl;
})(FeatureList || (FeatureList = {}));
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
    try {
        FilterList.myModule = angular.module(moduleName);
    }
    catch (err) {
        // named module does not exist, so create one
        FilterList.myModule = angular.module(moduleName, []);
    }
    /**
      * Directive to display the available map layers.
      */
    FilterList.myModule.directive('filterList', [
        '$window',
        '$compile',
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
        // $inject annotation.   
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
        FilterListCtrl.$inject = [
            '$scope',
            'layerService'
        ];
        return FilterListCtrl;
    })();
    FilterList.FilterListCtrl = FilterListCtrl;
})(FilterList || (FilterList = {}));
var Mca;
(function (Mca) {
    'use strict';
    var McaCtrl = (function () {
        function McaCtrl($scope, $modal, $translate, $timeout, $localStorageService, $layerService, messageBusService) {
            var _this = this;
            this.$scope = $scope;
            this.$modal = $modal;
            this.$translate = $translate;
            this.$timeout = $timeout;
            this.$localStorageService = $localStorageService;
            this.$layerService = $layerService;
            this.messageBusService = messageBusService;
            this.features = [];
            this.availableMcas = [];
            this.showAsterChart = false; // When true, show a pie chart, when false, show a bar chart.
            this.showDialog = false;
            this.expertMode = false;
            this.showSparkline = false;
            this.featureMessageReceived = function (title, feature) {
                //console.log("MC: featureMessageReceived");
                if (_this.mca == null)
                    return;
                switch (title) {
                    case 'onFeatureSelect':
                        _this.updateSelectedFeature(feature, true);
                        break;
                    case 'onFeatureDeselect':
                        _this.showFeature = false;
                        _this.selectedFeature = null;
                        _this.drawChart();
                        break;
                    default:
                        break;
                }
                _this.scopeApply();
            };
            $scope.vm = this;
            messageBusService.subscribe('layer', function (title) {
                switch (title) {
                    case 'deactivate':
                    case 'activated':
                        _this.updateAvailableMcas();
                        _this.calculateMca();
                        break;
                }
            });
            messageBusService.subscribe('project', function (title) {
                switch (title) {
                    case 'loaded':
                        _this.expertMode = $layerService.project != null && $layerService.project.hasOwnProperty('userPrivileges') && $layerService.project.userPrivileges.hasOwnProperty('mca') && $layerService.project.userPrivileges.mca.hasOwnProperty('expertMode') && $layerService.project.userPrivileges.mca.expertMode;
                        if (typeof $layerService.project.mcas === 'undefined' || $layerService.project.mcas == null)
                            $layerService.project.mcas = [];
                        var mcas = _this.$localStorageService.get(McaCtrl.mcas);
                        if (typeof mcas === 'undefined' || mcas === null)
                            return;
                        mcas.forEach(function (mca) {
                            $layerService.project.mcas.push(new Mca.Models.Mca().deserialize(mca));
                        });
                        break;
                }
            });
            messageBusService.subscribe('feature', this.featureMessageReceived);
            $translate('MCA.DELETE_MSG').then(function (translation) {
                McaCtrl.confirmationMsg1 = translation;
            });
            $translate('MCA.DELETE_MSG2').then(function (translation) {
                McaCtrl.confirmationMsg2 = translation;
            });
        }
        McaCtrl.prototype.getVotingClass = function (criterion) {
            if (criterion == null || this.mca == null || criterion.userWeight === 0 || criterion.userWeight < -this.mca.userWeightMax || criterion.userWeight > this.mca.userWeightMax)
                return 'disabledMca';
            return criterion.userWeight > 0 ? 'prefer' : 'avoid';
        };
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
        McaCtrl.prototype.toggleMcaChartType = function () {
            this.showAsterChart = !this.showAsterChart;
            this.drawChart(this.mca.criteria[0]);
        };
        McaCtrl.prototype.toggleSparkline = function () {
            this.showSparkline = !this.showSparkline;
            if (this.showSparkline)
                this.drawChart();
        };
        McaCtrl.prototype.weightUpdated = function (criterion) {
            this.selectedCriterion = criterion;
            this.addMca(this.mca);
            this.updateMca(criterion);
        };
        McaCtrl.prototype.updateMca = function (criterion) {
            this.selectedCriterion = criterion;
            this.features = [];
            this.calculateMca();
            this.drawChart(criterion);
        };
        McaCtrl.prototype.editMca = function (mca) {
            this.showMcaEditor(mca);
        };
        McaCtrl.prototype.createMca = function () {
            this.showMcaEditor(new Mca.Models.Mca());
        };
        McaCtrl.prototype.showMcaEditor = function (newMca) {
            var _this = this;
            var modalInstance = this.$modal.open({
                templateUrl: 'mcaEditorView.html',
                controller: Mca.McaEditorCtrl,
                resolve: {
                    mca: function () { return newMca; }
                }
            });
            modalInstance.result.then(function (mca) {
                _this.showSparkline = false;
                _this.addMca(mca);
                _this.updateMca();
                //console.log(JSON.stringify(mca, null, 2));
            }, function () {
                //console.log('Modal dismissed at: ' + new Date());
            });
        };
        McaCtrl.prototype.removeMca = function (mca) {
            var _this = this;
            if (!mca)
                return;
            var title = String.format(McaCtrl.confirmationMsg1, mca.title);
            this.messageBusService.confirm(title, McaCtrl.confirmationMsg2, function (result) {
                if (!result)
                    return;
                _this.$timeout(function () {
                    _this.deleteMca(mca);
                    if (_this.mca)
                        _this.updateMca();
                }, 0);
            });
            this.scopeApply();
        };
        McaCtrl.prototype.getMcaIndex = function (mca) {
            var mcaIndex = -1;
            var mcas = this.$layerService.project.mcas;
            for (var i = 0; i < mcas.length; i++) {
                if (mcas[i].title !== mca.title)
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
            this.updateAvailableMcas(mca);
        };
        McaCtrl.prototype.deleteMca = function (mca) {
            if (!mca)
                return;
            var mcaIndex = this.getMcaIndex(mca);
            if (mcaIndex < 0)
                return;
            var mcas = this.$layerService.project.mcas;
            if (mcaIndex >= 0)
                mcas.splice(mcaIndex, 1);
            this.removeMcaFromLocalStorage(mca);
            this.updateAvailableMcas();
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
                if (mcas[i].title !== mca.title)
                    continue;
                mcaIndex = i;
                break;
            }
            if (mcaIndex < 0)
                return;
            mcas.splice(mcaIndex, 1);
            this.$localStorageService.set(McaCtrl.mcas, mcas); // You first need to set the key
        };
        McaCtrl.prototype.scopeApply = function () {
            if (this.$scope.$root.$$phase !== '$apply' && this.$scope.$root.$$phase !== '$digest') {
                this.$scope.$apply();
            }
        };
        McaCtrl.prototype.updateSelectedFeature = function (feature, drawCharts) {
            if (drawCharts === void 0) { drawCharts = false; }
            if (typeof feature === 'undefined' || feature == null) {
                this.featureIcon = '';
                return;
            }
            this.selectedFeature = feature;
            this.featureIcon = this.selectedFeature.fType != null && this.selectedFeature.fType.style != null ? this.selectedFeature.fType.style.iconUri : '';
            if (!feature.properties.hasOwnProperty(this.mca.label))
                return;
            this.showFeature = true;
            this.properties = [];
            var mi = McaCtrl.createPropertyType(this.mca);
            var displayValue = csComp.Helpers.convertPropertyInfo(mi, feature.properties[mi.label]);
            this.properties.push(new FeatureProps.CallOutProperty(mi.title, displayValue, mi.label, true, true, feature, false, mi.description, mi));
            if (this.mca.rankTitle) {
                mi = McaCtrl.createRankPropertyType(this.mca);
                displayValue = csComp.Helpers.convertPropertyInfo(mi, feature.properties[mi.label]);
                this.properties.push(new FeatureProps.CallOutProperty(mi.title, displayValue, mi.label, false, false, feature, false, mi.description, mi));
            }
            if (drawCharts)
                this.drawChart();
        };
        McaCtrl.prototype.drawChart = function (criterion) {
            var _this = this;
            this.selectedCriterion = criterion;
            this.showChart = true;
            if (this.showFeature)
                if (this.showAsterChart)
                    this.drawAsterPlot(criterion);
                else
                    this.drawHistogram(criterion);
            else
                this.drawPieChart(criterion);
            if (!this.showSparkline)
                return;
            var i = 0;
            this.mca.criteria.forEach(function (crit) {
                var id = 'histogram_' + i++;
                if (crit.criteria.length === 0) {
                    var y1 = crit.y;
                    if (crit.userWeight < 0)
                        y1 = y1.map(function (v) { return 1 - v; });
                    csComp.Helpers.Plot.drawMcaPlot(crit.propValues, {
                        id: id,
                        width: 220,
                        height: 70,
                        xy: { x: crit.x, y: y1 },
                        featureValue: _this.selectedFeature ? _this.selectedFeature.properties[crit.label] : null
                    });
                }
                else {
                    var j = 0;
                    crit.criteria.forEach(function (c) {
                        var y2 = c.y;
                        if (crit.userWeight < 0)
                            y2 = y2.map(function (v) { return 1 - v; });
                        csComp.Helpers.Plot.drawMcaPlot(c.propValues, {
                            id: id + '_' + j++,
                            width: 220,
                            height: 70,
                            xy: { x: c.x, y: y2 },
                            featureValue: _this.selectedFeature ? _this.selectedFeature.properties[c.label] : null
                        });
                    });
                }
            });
        };
        McaCtrl.prototype.getParentOfSelectedCriterion = function (criterion) {
            var _this = this;
            var parent;
            this.mca.update();
            if (typeof criterion === 'undefined' || this.mca.criteria.indexOf(criterion) >= 0) {
                this.selectedCriterion = null;
                parent = this.mca.criteria;
            }
            else {
                this.mca.criteria.forEach(function (c) {
                    if (c.criteria.indexOf(criterion) >= 0) {
                        _this.selectedCriterion = c;
                        parent = c.criteria;
                    }
                });
            }
            return parent;
        };
        McaCtrl.prototype.drawHistogram = function (criterion) {
            var _this = this;
            if (!this.mca || !this.selectedFeature)
                return;
            var currentLevel = this.getParentOfSelectedCriterion(criterion);
            if (typeof currentLevel === 'undefined' || currentLevel == null)
                return;
            var data = [];
            var options = {
                id: McaCtrl.mcaChartId,
                numberOfBins: 10,
                width: 240,
                height: 100,
                selectedValue: this.selectedFeature.properties[this.mca.label]
            };
            this.features.forEach(function (feature) {
                if (feature.properties.hasOwnProperty(_this.mca.label)) {
                    // The property is available. I use the '+' to convert the string value to a number.
                    var prop = feature.properties[_this.mca.label];
                    if ($.isNumeric(prop))
                        data.push(prop);
                }
            });
            csComp.Helpers.Plot.drawHistogram(data, options);
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
                var rawScore = c.getScore(_this.selectedFeature);
                var pieData = new csComp.Helpers.AsterPieData();
                pieData.id = i++;
                pieData.label = c.getTitle();
                pieData.weight = Math.abs(c.weight);
                pieData.color = c.color;
                pieData.score = (c.weight > 0 ? rawScore : 1 - rawScore) * 100;
                data.push(pieData);
            });
            csComp.Helpers.Plot.drawAsterPlot(100, data, McaCtrl.mcaChartId);
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
                pieData.weight = Math.abs(c.weight);
                pieData.color = c.color;
                data.push(pieData);
            });
            csComp.Helpers.Plot.drawPie(100, data, McaCtrl.mcaChartId);
        };
        /**
        * Based on the currently loaded features, which MCA can we use
        */
        McaCtrl.prototype.updateAvailableMcas = function (mca) {
            var _this = this;
            this.showChart = false;
            this.mca = mca;
            this.availableMcas = [];
            this.$layerService.project.mcas.forEach(function (m) {
                m.featureIds.forEach(function (featureId) {
                    if (_this.availableMcas.indexOf(m) < 0 && _this.$layerService.featureTypes.hasOwnProperty(featureId)) {
                        _this.availableMcas.push(m);
                        var featureType = _this.$layerService.featureTypes[featureId];
                        _this.applyPropertyInfoToCriteria(m, featureType);
                    }
                });
            });
            if (mca == null && this.availableMcas.length > 0) {
                this.mca = this.availableMcas[0];
                this.updateMca();
            }
        };
        McaCtrl.prototype.calculateMca = function () {
            var _this = this;
            if (!this.mca)
                return;
            var mca = this.mca;
            mca.featureIds.forEach(function (featureId) {
                if (!(_this.$layerService.featureTypes.hasOwnProperty(featureId)))
                    return;
                _this.addPropertyInfo(featureId, mca);
                _this.$layerService.project.features.forEach(function (feature) {
                    if (feature.featureTypeName != null && feature.featureTypeName === featureId)
                        _this.features.push(feature);
                });
                if (_this.features.length === 0)
                    return;
                mca.updatePla(_this.features);
                mca.update();
                var tempScores = [];
                var index = 0;
                _this.features.forEach(function (feature) {
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
                    var length = _this.features.length;
                    var scaleRange = mca.scaleMinValue ? Math.abs(mca.scaleMaxValue - mca.scaleMinValue) + 1 : length;
                    var scaleFactor = Math.ceil(length / scaleRange);
                    var rankFunction = mca.scaleMinValue ? mca.scaleMaxValue > mca.scaleMinValue ? function (position) {
                        return mca.scaleMaxValue - Math.round(position / scaleFactor);
                    } : function (position) {
                        return mca.scaleMinValue + Math.round(position / scaleFactor);
                    } : function (position) {
                        return position;
                    };
                    var prevScore = -1;
                    var rank = 1;
                    for (var i = 0; i < length; i++) {
                        var item = tempScores[i];
                        // Assign items with the same value the same rank.
                        if (item.score !== prevScore)
                            rank = i + 1;
                        prevScore = item.score;
                        _this.features[item.index].properties[mca.label + '#'] = rankFunction(rank) + ',' + scaleRange;
                    }
                }
            });
            this.updateSelectedFeature(this.selectedFeature, false);
            if (this.selectedFeature) {
                this.messageBusService.publish('feature', 'onFeatureSelect', this.selectedFeature);
            }
            if (this.groupStyle)
                this.$layerService.updateStyle(this.groupStyle);
        };
        McaCtrl.prototype.applyPropertyInfoToCriteria = function (mca, featureType) {
            var propertyTypes = csComp.Helpers.getPropertyTypes(featureType, this.$layerService.propertyTypeData);
            if (propertyTypes.length === 0)
                return;
            mca.criteria.forEach(function (criterion) {
                var label = criterion.label;
                propertyTypes.forEach(function (propInfo) {
                    if (propInfo.label === label) {
                        criterion.title = propInfo.title;
                        criterion.description = propInfo.description;
                    }
                });
            });
        };
        McaCtrl.prototype.addPropertyInfo = function (featureId, mca, forceUpdate) {
            if (forceUpdate === void 0) { forceUpdate = false; }
            var featureType = this.$layerService.featureTypes[featureId];
            //var propertyTypes = featureType.propertyTypeData;
            var propertyTypes = csComp.Helpers.getPropertyTypes(featureType, this.$layerService.propertyTypeData);
            var labelIndex = -1;
            for (var i = propertyTypes.length - 1; i >= 0; i--) {
                if (propertyTypes[i].label === mca.label) {
                    labelIndex = i;
                    break;
                }
            }
            if (forceUpdate || labelIndex < 0) {
                var pt = McaCtrl.createPropertyType(mca);
                if (labelIndex < 0)
                    featureType.propertyTypeData.push(pt); // NOTE: propertyTypes refers to a new list, so you cannot add to it.
                else
                    propertyTypes[labelIndex] = pt; // NOTE: but you should be able to overwrite an existing property.
            }
            if (!mca.rankTitle)
                return;
            labelIndex = -1;
            for (i = propertyTypes.length - 1; i >= 0; i--) {
                if (propertyTypes[i].label === mca.rankLabel) {
                    labelIndex = i;
                    break;
                }
            }
            if (forceUpdate || labelIndex < 0) {
                pt = McaCtrl.createRankPropertyType(mca);
                if (labelIndex < 0)
                    featureType.propertyTypeData.push(pt);
                else
                    propertyTypes[labelIndex] = pt;
            }
        };
        McaCtrl.prototype.setStyle = function (item) {
            // If groupStyle has been set, we have called it before.
            // However, make sure that not another filter has set the fillColor too, overwriting our label.
            if (this.groupStyle && this.groupStyle.group != null && this.groupStyle.group.styles != null && this.groupStyle.group.styles.filter(function (s) {
                return s.visualAspect === 'fillColor';
            })[0].property === this.mca.label)
                this.$layerService.updateStyle(this.groupStyle);
            else {
                this.groupStyle = this.$layerService.setStyle(item, false);
                this.groupStyle.colors = ['#F04030', '#3040F0'];
                this.$layerService.updateStyle(this.groupStyle);
            }
        };
        McaCtrl.createPropertyType = function (mca) {
            var mi = {
                title: mca.title,
                label: mca.label,
                type: 'number',
                maxValue: 1,
                minValue: 0,
                description: mca.description,
                stringFormat: mca.stringFormat,
                visibleInCallOut: true,
                section: mca.section || 'MCA'
            };
            return mi;
        };
        McaCtrl.createRankPropertyType = function (mca) {
            var mi = {
                title: mca.rankTitle,
                label: mca.rankLabel,
                type: 'rank',
                description: mca.rankDescription,
                stringFormat: mca.rankFormat,
                visibleInCallOut: true,
                section: mca.section || 'MCA'
            };
            return mi;
        };
        McaCtrl.mcaChartId = 'mcaChart';
        McaCtrl.mcas = 'MCAs';
        McaCtrl.$inject = [
            '$scope',
            '$modal',
            '$translate',
            '$timeout',
            'localStorageService',
            'layerService',
            'messageBusService'
        ];
        return McaCtrl;
    })();
    Mca.McaCtrl = McaCtrl;
})(Mca || (Mca = {}));
var Mca;
(function (_Mca) {
    var Models;
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
                this.title = ScoringFunctionType[scoringFunctionType].toString();
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
                this.propValues = [];
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
                this.minCutoffValue = input.minCutoffValue;
                this.maxCutoffValue = input.maxCutoffValue;
                this.minValue = input.minValue;
                this.maxValue = input.maxValue;
                input.criteria.forEach(function (c) {
                    _this.criteria.push(new Criterion().deserialize(c));
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
                if (this.scores == null)
                    return;
                var scores = this.scores;
                this.propValues = [];
                if (this.requiresMaximum() || this.requiresMinimum() || this.isPlaScaled) {
                    features.forEach(function (feature) {
                        if (feature.properties.hasOwnProperty(_this.label)) {
                            // The property is available. I use the '+' to convert the string value to a number. 
                            var prop = feature.properties[_this.label];
                            if ($.isNumeric(prop))
                                _this.propValues.push(prop);
                        }
                    });
                }
                var max = this.maxValue, min = this.minValue;
                if (this.isPlaScaled || this.requiresMaximum()) {
                    max = max || Math.max.apply(null, this.propValues);
                    scores.replace('max', max.toPrecision(3));
                }
                if (this.isPlaScaled || this.requiresMinimum()) {
                    min = min || Math.min.apply(null, this.propValues);
                    scores.replace('min', min.toPrecision(3));
                }
                if (this.isPlaScaled) {
                    var stats = csComp.Helpers.standardDeviation(this.propValues);
                    max = max || Math.min(max, stats.avg + 2 * stats.stdDev);
                    min = min || Math.max(min, stats.avg - 2 * stats.stdDev);
                }
                // Regex to split the scores: [^\d\.]+ and remove empty entries
                var pla = scores.split(/[^\d\.]+/).filter(function (item) { return item.length > 0; });
                // Test that we have an equal number of x and y, 
                var range = max - min, a, b;
                if (this.minValue != null || this.maxValue != null) {
                    a = range / 10;
                    b = min;
                }
                else {
                    a = 0.08 * range, b = min + 0.1 * range;
                }
                if (pla.length % 2 !== 0)
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
                if (this.criteria.length === 0) {
                    // End point: compute the score for each feature
                    if (feature.properties.hasOwnProperty(this.label)) {
                        // The property is available
                        var x = feature.properties[this.label];
                        if (this.maxCutoffValue <= x || x <= this.minCutoffValue)
                            return 0;
                        if (x < this.x[0])
                            return this.y[0];
                        var last = this.x.length - 1;
                        if (x > this.x[last])
                            return this.y[last];
                        for (var k = 0; k < this.x.length; k++) {
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
                    }
                    else {
                        return 0;
                    }
                }
                else {
                    // Sum all the sub-criteria.
                    var finalScore = 0;
                    this.criteria.forEach(function (crit) {
                        finalScore += crit.weight > 0 ? crit.weight * crit.getScore(feature) : Math.abs(crit.weight) * (1 - crit.getScore(feature));
                    });
                    return this.weight > 0 ? this.weight * finalScore : Math.abs(this.weight) * (1 - finalScore);
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
            Object.defineProperty(Mca.prototype, "rankLabel", {
                get: function () {
                    return this.label + '#';
                },
                enumerable: true,
                configurable: true
            });
            Mca.prototype.deserialize = function (input) {
                this.section = input.section;
                this.stringFormat = input.stringFormat;
                this.rankTitle = input.rankTitle;
                this.rankDescription = input.rankDescription;
                this.rankFormat = input.rankFormat;
                this.userWeightMax = input.userWeightMax;
                this.featureIds = input.featureIds;
                this.minCutoffValue = input.minCutoffValue;
                this.maxCutoffValue = input.maxCutoffValue;
                this.minValue = input.minValue;
                this.maxValue = input.maxValue;
                this.scaleMinValue = input.scaleMinValue;
                this.scaleMaxValue = input.scaleMaxValue;
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
                    if (!criteria.hasOwnProperty(k))
                        continue;
                    var crit = criteria[k];
                    if (crit.criteria.length > 0)
                        this.calculateWeights(crit.criteria);
                    totalWeight += Math.abs(crit.userWeight);
                }
                if (totalWeight > 0) {
                    for (var j in criteria) {
                        if (!criteria.hasOwnProperty(j))
                            continue;
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
    })(Models = _Mca.Models || (_Mca.Models = {}));
})(Mca || (Mca = {}));
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
    try {
        ShowModal.myModule = angular.module(moduleName);
    }
    catch (err) {
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
var LayersDirective;
(function (LayersDirective) {
    LayersDirective.html = '<div>    <h4 class="leftpanel-header" translate="LAYERS"></h4>    <div style="overflow-y: auto; overflow-x: hidden; margin-top: -10px" resize resize-y="95">        <div data-ng-repeat="group in vm.$layerService.project.groups" style="margin-left: 5px">            <div style="float: left; margin-left: -5px; margin-top: 5px" data-toggle="collapse" data-target="#layergroup_{{group.id}}"><i class="fa fa-chevron-down togglebutton toggle-arrow-down"></i><i class="fa fa-chevron-up togglebutton toggle-arrow-up"></i></div>            <div popover="{{(group.description) ? group.description : \'\'}}"                 popover-placement="right"                 popover-width="400"                 popover-trigger="mouseenter"                 class="group-title">{{group.title}}</div>            <div id="layergroup_{{group.id}}" class="collapse in">                <div popover="{{(layer.description) ? layer.description : \'\'}}"                     popover-placement="right"                     popover-trigger="mouseenter"                     data-ng-repeat="layer in group.layers">                    <!--bs-popover>-->                    <div style="list-style-type: none; padding: 0;" data-ng-class="{indent: layer.isSublayer}">                        <!--<button type="button" class="btn btn-default" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." data-original-title="" title="">Right</button>-->                        <div ng-hide="group.oneLayerActive" class="checkbox checkbox-primary" style="margin-left: 20px">                            <input type="checkbox" id="cblayer{{layer.id}}" ng-model="layer.enabled" data-ng-click="vm.toggleLayer(layer);">                            <label for="cblayer{{layer.id}}">                                {{layer.title}}                            </label>                            <div ng-show="layer.isLoading" class="spinner">                            <div class="bounce1"></div>                            <div class="bounce2"></div>                            <div class="bounce3"></div>                        </div>                        </div>                        <div ng-show="group.oneLayerActive" class="radio radio-primary" style="margin-left: 20px">                            <input type="radio" ng-value="true" id="rblayer{{layer.id}}" ng-model="layer.enabled" data-ng-click="vm.toggleLayer(layer);">                            <label for="rblayer{{layer.id}}">                                {{layer.title}}                            </label>                            <div ng-show="layer.isLoading" class="spinner">                            <div class="bounce1"></div>                            <div class="bounce2"></div>                            <div class="bounce3"></div>                        </div>                        </div>                    </div>                </div>            </div>        </div>    </div></div>';
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
    try {
        LayersDirective.myModule = angular.module(moduleName);
    }
    catch (err) {
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
            }
            else {
                this.$layerService.removeLayer(layer);
            }
            // NOTE EV: You need to call apply only when an event is received outside the angular scope.
            // However, make sure you are not calling this inside an angular apply cycle, as it will generate an error.
            if (this.$scope.$root.$$phase != '$apply' && this.$scope.$root.$$phase != '$digest') {
                this.$scope.$apply();
            }
        };
        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
        LayersDirectiveCtrl.$inject = [
            '$scope',
            'layerService'
        ];
        return LayersDirectiveCtrl;
    })();
    LayersDirective.LayersDirectiveCtrl = LayersDirectiveCtrl;
})(LayersDirective || (LayersDirective = {}));
var csComp;
(function (csComp) {
    var StringExt;
    (function (StringExt) {
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
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
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
    })(StringExt = csComp.StringExt || (csComp.StringExt = {}));
})(csComp || (csComp = {}));
var csComp;
(function (csComp) {
    var Services;
    (function (Services) {
        'use strict';
        var LayerService = (function () {
            function LayerService($location, $translate, $messageBusService, $mapService, $rootScope) {
                var _this = this;
                this.$location = $location;
                this.$translate = $translate;
                this.$messageBusService = $messageBusService;
                this.$mapService = $mapService;
                this.$rootScope = $rootScope;
                this.layerGroup = new L.LayerGroup();
                this.info = new L.Control();
                this.currentLocale = 'en';
                //$translate('FILTER_INFO').then((translation) => console.log(translation));
                // NOTE EV: private props in constructor automatically become fields, so mb and map are superfluous.
                this.mb = $messageBusService;
                this.map = $mapService;
                this.accentColor = '';
                this.title = '';
                this.layerGroup = new L.LayerGroup();
                this.featureTypes = {};
                this.propertyTypeData = {};
                this.map.map.addLayer(this.layerGroup);
                this.noStyles = true;
                this.$messageBusService.subscribe('timeline', function (trigger) {
                    switch (trigger) {
                        case 'focusChange':
                            _this.updateSensorData();
                            break;
                    }
                });
                this.$messageBusService.subscribe('language', function (title, language) {
                    switch (title) {
                        case 'newLanguage':
                            _this.currentLocale = language;
                            break;
                    }
                });
            }
            LayerService.prototype.updateSensorData = function () {
                var _this = this;
                if (this.project == null || this.project.timeLine == null)
                    return;
                var date = this.project.timeLine.focus;
                var timepos = {};
                this.project.features.forEach(function (f) {
                    var l = _this.findLayer(f.layerId);
                    if (l != null) {
                        if (!timepos.hasOwnProperty(f.layerId)) {
                            for (var i = 1; i < l.timestamps.length; i++) {
                                if (l.timestamps[i] > date) {
                                    timepos[f.layerId] = i;
                                    break;
                                }
                            }
                        }
                        if (f.sensors != null) {
                            for (var sensorTitle in f.sensors) {
                                if (!f.sensors.hasOwnProperty(sensorTitle))
                                    continue;
                                var sensor = f.sensors[sensorTitle];
                                var value = sensor[timepos[f.layerId]];
                                //console.log(sensorTitle + ":" + value);
                                f.properties[sensorTitle] = value;
                            }
                            _this.updateFeatureIcon(f, l);
                        }
                    }
                });
                this.$messageBusService.publish('feature', 'onFeatureUpdated');
            };
            /**
             * Add a layer
             */
            LayerService.prototype.addLayer = function (layer) {
                var _this = this;
                var disableLayers = [];
                switch (layer.type.toLowerCase()) {
                    case 'wms':
                        var wms = L.tileLayer.wms(layer.url, {
                            layers: layer.wmsLayers,
                            opacity: layer.opacity / 100,
                            format: 'image/png',
                            transparent: true,
                            attribution: layer.description
                        });
                        layer.mapLayer = new L.LayerGroup();
                        this.map.map.addLayer(layer.mapLayer);
                        layer.mapLayer.addLayer(wms);
                        wms.on('loading', function (event) {
                            layer.isLoading = true;
                            _this.$rootScope.$apply();
                            if (_this.$rootScope.$$phase != '$apply' && _this.$rootScope.$$phase != '$digest') {
                                _this.$rootScope.$apply();
                            }
                        });
                        wms.on('load', function (event) {
                            layer.isLoading = false;
                            if (_this.$rootScope.$$phase != '$apply' && _this.$rootScope.$$phase != '$digest') {
                                _this.$rootScope.$apply();
                            }
                        });
                        layer.isLoading = true;
                        break;
                    case 'topojson':
                    case 'geojson':
                        async.series([
                            function (callback) {
                                // If oneLayerActive: close other group layer
                                if (layer.group.oneLayerActive) {
                                    layer.group.layers.forEach(function (l) {
                                        if (l !== layer && l.enabled) {
                                            disableLayers.push(l);
                                        }
                                    });
                                }
                                callback(null, null);
                            },
                            function (callback) {
                                // Open a style file
                                if (layer.styleurl) {
                                    d3.json(layer.styleurl, function (err, dta) {
                                        if (err)
                                            _this.$messageBusService.notify('ERROR loading' + layer.title, err);
                                        else {
                                            if (dta.featureTypes)
                                                for (var featureTypeName in dta.featureTypes) {
                                                    if (!dta.featureTypes.hasOwnProperty(featureTypeName))
                                                        continue;
                                                    var featureType = dta.featureTypes[featureTypeName];
                                                    featureTypeName = layer.id + '_' + featureTypeName;
                                                    _this.featureTypes[featureTypeName] = featureType;
                                                }
                                        }
                                        callback(null, null);
                                    });
                                }
                                else
                                    callback(null, null);
                            },
                            function (callback) {
                                // Open a layer URL
                                layer.isLoading = true;
                                d3.json(layer.url, function (error, data) {
                                    layer.isLoading = false;
                                    if (error)
                                        _this.$messageBusService.notify('ERROR loading' + layer.title, error);
                                    else {
                                        if (layer.type.toLowerCase() === 'topojson')
                                            data = _this.convertTopoToGeoJson(data);
                                        if (data.events && _this.timeline) {
                                            layer.events = data.events;
                                            var devents = [];
                                            layer.events.forEach(function (e) {
                                                if (!e.id)
                                                    e.id = csComp.Helpers.getGuid();
                                                devents.push({
                                                    'start': new Date(e.start),
                                                    'content': e.title
                                                });
                                            });
                                            _this.timeline.draw(devents);
                                        }
                                        for (var featureTypeName in data.featureTypes) {
                                            if (!data.featureTypes.hasOwnProperty(featureTypeName))
                                                continue;
                                            var featureType = data.featureTypes[featureTypeName];
                                            featureTypeName = layer.id + '_' + featureTypeName;
                                            _this.featureTypes[featureTypeName] = featureType;
                                            //var pt = "." + featureTypeName;
                                            //var icon = featureType.style.iconUri;
                                            var t = '{".style' + featureTypeName + '":';
                                            if (featureType.style.iconUri != null) {
                                                t += ' { "background": "url(' + featureType.style.iconUri + ') no-repeat right center",';
                                            }
                                            ;
                                            t += ' "background-size": "100% 100%","border-style": "none"} }';
                                            var json = $.parseJSON(t);
                                            $.injectCSS(json);
                                        }
                                        if (data.timestamps)
                                            layer.timestamps = data.timestamps;
                                        if (layer.group.clustering) {
                                            var markers = L.geoJson(data, {
                                                pointToLayer: function (feature, latlng) { return _this.addFeature(feature, latlng, layer); },
                                                onEachFeature: function (feature, lay) {
                                                    //We do not need to init the feature here: already done in style.
                                                    //this.initFeature(feature, layer);
                                                    layer.group.markers[feature.id] = lay;
                                                    lay.on({
                                                        mouseover: function (a) { return _this.showFeatureTooltip(a, layer.group); },
                                                        mouseout: function (s) { return _this.hideFeatureTooltip(s); }
                                                    });
                                                }
                                            });
                                            layer.group.cluster.addLayer(markers);
                                        }
                                        else {
                                            layer.mapLayer = new L.LayerGroup();
                                            _this.map.map.addLayer(layer.mapLayer);
                                            var v = L.geoJson(data, {
                                                onEachFeature: function (feature, lay) {
                                                    //We do not need to init the feature here: already done in style.
                                                    //this.initFeature(feature, layer);
                                                    layer.group.markers[feature.id] = lay;
                                                    lay.on({
                                                        mouseover: function (a) { return _this.showFeatureTooltip(a, layer.group); },
                                                        mouseout: function (s) { return _this.hideFeatureTooltip(s); },
                                                        mousemove: function (d) { return _this.updateFeatureTooltip(d); },
                                                        click: function () { return _this.selectFeature(feature); }
                                                    });
                                                },
                                                style: function (f, m) {
                                                    _this.initFeature(f, layer);
                                                    layer.group.markers[f.id] = m;
                                                    return _this.style(f, layer);
                                                },
                                                pointToLayer: function (feature, latlng) { return _this.addFeature(feature, latlng, layer); }
                                            });
                                            _this.project.features.forEach(function (f) {
                                                if (f.layerId !== layer.id)
                                                    return;
                                                var ft = _this.getFeatureType(f);
                                                f.properties['Name'] = f.properties[ft.style.nameLabel];
                                            });
                                            layer.mapLayer.addLayer(v);
                                        }
                                    }
                                    _this.$messageBusService.publish('layer', 'activated', layer);
                                    callback(null, null);
                                    _this.updateFilters();
                                });
                            },
                            // Callback
                            function () {
                                disableLayers.forEach(function (l) {
                                    _this.removeLayer(l);
                                    l.enabled = false;
                                });
                            }
                        ]);
                }
            };
            LayerService.prototype.convertTopoToGeoJson = function (data) {
                // Convert topojson to geojson format
                var topo = omnivore.topojson.parse(data);
                var newData = {};
                newData.featureTypes = data.featureTypes;
                newData.features = [];
                topo.eachLayer(function (l) {
                    newData.features.push(l.feature);
                });
                return newData;
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
             * Show tooltip with name, styles & filters.
             */
            LayerService.prototype.showFeatureTooltip = function (e, group) {
                var layer = e.target;
                var feature = layer.feature;
                // add title
                var title = layer.feature.properties.Name;
                var rowLength = title.length;
                var content = '<td colspan=\'3\'>' + title + '</td></tr>';
                // add filter values
                if (group.filters != null && group.filters.length > 0) {
                    group.filters.forEach(function (f) {
                        if (!feature.properties.hasOwnProperty(f.property))
                            return;
                        var value = feature.properties[f.property];
                        var valueLength = value.toString().length;
                        if (f.meta != null) {
                            value = csComp.Helpers.convertPropertyInfo(f.meta, value);
                            if (f.meta.type !== 'bbcode')
                                valueLength = value.toString().length;
                        }
                        rowLength = Math.max(rowLength, valueLength + f.title.length);
                        content += '<tr><td><div class=\'smallFilterIcon\'></td><td>' + f.title + '</td><td>' + value + '</td></tr>';
                    });
                }
                // add style values, only in case they haven't been added already as filter
                if (group.styles != null && group.styles.length > 0) {
                    group.styles.forEach(function (s) {
                        if (group.filters != null && group.filters.filter(function (f) {
                            return f.property === s.property;
                        }).length === 0 && feature.properties.hasOwnProperty(s.property)) {
                            var value = feature.properties[s.property];
                            var valueLength = value.toString().length;
                            if (s.meta != null) {
                                value = csComp.Helpers.convertPropertyInfo(s.meta, value);
                                if (s.meta.type !== 'bbcode')
                                    valueLength = value.toString().length;
                            }
                            rowLength = Math.max(rowLength, valueLength + s.title.length);
                            content += '<tr><td><div class=\'smallStyleIcon\'></td><td>' + s.title + '</td><td>' + value + '</td></tr>';
                        }
                    });
                }
                var widthInPixels = Math.max(Math.min(rowLength * 7 + 15, 250), 130);
                content = '<table style=\'width:' + widthInPixels + 'px;\'>' + content + '</table>';
                this.popup = L.popup({
                    offset: new L.Point(-widthInPixels / 2 - 40, -5),
                    closeOnClick: true,
                    autoPan: false,
                    className: 'featureTooltip'
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
                g.styles = g.styles.filter(function (s) { return s.id !== style.id; });
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
                if (feature.geometry.type === 'Point') {
                    var layer = this.findLayer(feature.layerId);
                    if (layer != null)
                        this.updateFeatureIcon(feature, layer);
                }
                else {
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
            /**
            * Extract a valid color string, without transparency.
            */
            LayerService.prototype.getColorString = function (color, defaultColor) {
                if (defaultColor === void 0) { defaultColor = '#f00'; }
                if (!color)
                    return defaultColor;
                if (color.length == 4 || color.length == 7)
                    return color;
                if (color.length == 9)
                    return '#' + color.substr(3, 6);
                return defaultColor;
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
                        s['fillColor'] = this.getColorString(ft.style.fillColor);
                    if (ft.style.strokeColor != null)
                        s['strokeColor'] = this.getColorString(ft.style.strokeColor, '#000');
                    if (ft.style.strokeWidth != null)
                        s['weight'] = ft.style.strokeWidth;
                }
                //var layer = this.findLayer(feature.layerId);
                layer.group.styles.forEach(function (gs) {
                    if (gs.enabled && feature.properties.hasOwnProperty(gs.property)) {
                        var v = Number(feature.properties[gs.property]);
                        switch (gs.visualAspect) {
                            case 'strokeColor':
                                s['color'] = _this.getColor(v, gs);
                                break;
                            case 'fillColor':
                                s[gs.visualAspect] = _this.getColor(v, gs);
                                break;
                            case 'strokeWidth':
                                s['weight'] = ((v - gs.info.sdMin) / (gs.info.sdMax - gs.info.sdMin) * 10) + 1;
                                break;
                        }
                    }
                });
                if (feature.isSelected) {
                    s['weight'] = 7;
                    s['color'] = 'blue';
                }
                return s;
            };
            /**
             * init feature (add to feature list, crossfilter)
             */
            LayerService.prototype.initFeature = function (feature, layer) {
                //if (!feature.isInitialized)
                feature.isInitialized = true;
                if (feature.id == null)
                    feature.id = csComp.Helpers.getGuid();
                feature.layerId = layer.id;
                this.project.features.push(feature);
                layer.group.ndx.add([feature]);
                feature.fType = this.getFeatureType(feature);
                this.initPropertyTypes(feature.fType);
                // Do we have a name?
                if (!feature.properties.hasOwnProperty('Name'))
                    csComp.Helpers.setFeatureName(feature);
                return feature.type;
            };
            /**
            * Initialize the property type by setting default property values, and by localizing it.
            */
            LayerService.prototype.initPropertyTypes = function (ft) {
                var _this = this;
                if (ft.propertyTypeData.length == 0)
                    return;
                ft.propertyTypeData.forEach(function (pt) {
                    _this.setDefaultPropertyType(pt);
                    if (pt.languages != null)
                        _this.localizePropertyType(pt);
                });
            };
            LayerService.prototype.setDefaultPropertyType = function (pt) {
                if (typeof pt.visibleInCallOut == 'undefined')
                    pt.visibleInCallOut = true;
                if (typeof pt.canEdit == 'undefined')
                    pt.canEdit = false;
                if (typeof pt.isSearchable == 'undefined' && pt.type === 'text')
                    pt.isSearchable = true;
            };
            LayerService.prototype.localizePropertyType = function (pt) {
                if (pt.languages != null && this.currentLocale in pt.languages) {
                    var locale = pt.languages[this.currentLocale];
                    if (locale.title)
                        pt.title = locale.title;
                    if (locale.description)
                        pt.description = locale.description;
                    if (locale.section)
                        pt.section = locale.section;
                    if (locale.options != null)
                        pt.options = locale.options;
                }
                ;
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
                }
                else {
                    var html = '<div ';
                    var props = {};
                    var ft = this.getFeatureType(feature);
                    //if (feature.poiTypeName != null) html += "class='style" + feature.poiTypeName + "'";
                    var iconUri = ft.style.iconUri;
                    if (ft.style.fillColor == null && iconUri == null)
                        ft.style.fillColor = 'lightgray';
                    // TODO refactor to object
                    props['background'] = ft.style.fillColor;
                    props['width'] = '32px';
                    props['height'] = '32px';
                    props['border-radius'] = '20%';
                    props['border-style'] = 'solid';
                    props['border-color'] = 'black';
                    props['border-width'] = '0';
                    layer.group.styles.forEach(function (gs) {
                        if (gs.enabled && feature.properties.hasOwnProperty(gs.property)) {
                            var v = feature.properties[gs.property];
                            switch (gs.visualAspect) {
                                case 'fillColor':
                                    if (gs.meta.type === 'color') {
                                        props['background-color'] = v;
                                    }
                                    else {
                                        var bezInterpolator = chroma.interpolate.bezier(gs.colors);
                                        props['background-color'] = bezInterpolator((v - gs.info.sdMin) / (gs.info.sdMax - gs.info.sdMin)).hex();
                                    }
                                    break;
                            }
                        }
                    });
                    if (feature.isSelected) {
                        props['border-width'] = '3px';
                    }
                    html += ' style=\'display: inline-block;vertical-align: middle;text-align: center;';
                    for (var key in props) {
                        if (!props.hasOwnProperty(key))
                            continue;
                        html += key + ':' + props[key] + ';';
                    }
                    html += '\'>';
                    if (iconUri != null) {
                        // Must the iconUri be formatted?
                        if (iconUri != null && iconUri.indexOf('{') >= 0)
                            iconUri = csComp.Helpers.convertStringFormat(feature, iconUri);
                        html += '<img src=' + iconUri + ' style=\'width:' + (ft.style.iconWidth - 2) + 'px;height:' + (ft.style.iconHeight - 2) + 'px\' />';
                    }
                    html += '</div>';
                    icon = new L.DivIcon({
                        className: '',
                        iconSize: new L.Point(ft.style.iconWidth, ft.style.iconHeight),
                        html: html
                    });
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
                this.initFeature(feature, layer);
                //var style = type.style;
                var marker;
                switch (feature.geometry.type) {
                    case 'Point':
                        var icon = this.getPointIcon(feature, layer);
                        marker = new L.Marker(latlng, { icon: icon });
                        marker.on('click', function () {
                            _this.selectFeature(feature);
                        });
                        break;
                    default:
                        var polyoptions = {
                            fillColor: 'Green'
                        };
                        marker = L.multiPolygon(latlng, polyoptions);
                        break;
                }
                layer.group.markers[feature.id] = marker;
                return marker;
            };
            LayerService.prototype.selectFeature = function (feature) {
                feature.isSelected = !feature.isSelected;
                this.updateFeature(feature);
                // deselect last feature and also update
                if (this.lastSelectedFeature != null && this.lastSelectedFeature !== feature) {
                    this.lastSelectedFeature.isSelected = false;
                    this.updateFeature(this.lastSelectedFeature);
                }
                this.lastSelectedFeature = feature;
                if (!feature.isSelected) {
                    this.$messageBusService.publish('sidebar', 'hide');
                    this.$messageBusService.publish('feature', 'onFeatureDeselect');
                }
                else {
                    this.$messageBusService.publish('sidebar', 'show');
                    this.$messageBusService.publish('feature', 'onFeatureSelect', feature);
                }
            };
            /**
             * find a filter for a specific group/property combination
             */
            LayerService.prototype.findFilter = function (group, property) {
                if (group.filters == null)
                    group.filters = [];
                var r = group.filters.filter(function (f) { return f.property === property; });
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
                        if (l.id === id)
                            r = l;
                    });
                });
                return r;
            };
            LayerService.prototype.setStyle = function (property, openStyleTab) {
                var _this = this;
                if (openStyleTab === void 0) { openStyleTab = true; }
                var f = property.feature;
                if (f != null) {
                    this.noStyles = false;
                    var layer = this.findLayer(f.layerId);
                    var gs = new Services.GroupStyle(this.$translate);
                    gs.id = csComp.Helpers.getGuid();
                    gs.title = property.key;
                    gs.meta = property.meta;
                    gs.visualAspect = 'fillColor';
                    gs.canSelectColor = gs.visualAspect.toLowerCase().indexOf('color') > -1;
                    gs.property = property.property;
                    if (gs.info == null)
                        gs.info = this.calculatePropertyInfo(layer.group, property.property);
                    gs.enabled = true;
                    gs.group = layer.group;
                    gs.meta = property.meta;
                    var ft = this.getFeatureType(f);
                    if (ft.style && ft.style.fillColor) {
                        gs.colors = ['white', 'orange'];
                    }
                    else {
                        gs.colors = ['white', 'orange'];
                    }
                    this.saveStyle(layer.group, gs);
                    if (f.geometry.type.toLowerCase() === 'point') {
                        this.project.features.forEach(function (fe) {
                            if (layer.group.markers.hasOwnProperty(fe.id)) {
                                _this.updateFeatureIcon(fe, layer);
                            }
                        });
                    }
                    else {
                        this.updateStyle(gs);
                    }
                    if (openStyleTab)
                        $('#leftPanelTab a[href="#styles"]').tab('show'); // Select tab by name
                    return gs;
                }
                return null;
            };
            LayerService.prototype.saveStyle = function (group, style) {
                // check if there are other styles that affect the same visual aspect, remove them
                var oldStyles = group.styles.filter(function (s) { return s.visualAspect === style.visualAspect; });
                if (oldStyles.length > 0) {
                    var pos = group.styles.indexOf(oldStyles[0]);
                    group.styles.splice(pos, 1);
                }
                group.styles.push(style);
            };
            LayerService.prototype.addFilter = function (group, prop) {
                var filter = this.findFilter(group, prop);
                if (filter == null) {
                    var gf = new Services.GroupFilter();
                    gf.property = prop;
                    //gf.filterType = "row";
                    gf.title = prop;
                    gf.rangex = [0, 1];
                    group.filters.push(gf);
                }
                else {
                    var pos = group.filters.indexOf(filter);
                    if (pos !== -1)
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
                            var gf = new Services.GroupFilter();
                            gf.property = prop;
                            gf.meta = property.meta;
                            gf.filterType = 'bar';
                            if (gf.meta != null) {
                                if (gf.meta.filterType != null) {
                                    gf.filterType = gf.meta.filterType;
                                }
                                else {
                                    switch (gf.meta.type) {
                                        case 'number':
                                        case 'options':
                                            gf.filterType = 'bar';
                                            break;
                                        default:
                                            gf.filterType = 'text';
                                            gf.stringValue = property.value;
                                            gf.value = property.value;
                                            break;
                                    }
                                }
                            }
                            gf.title = property.key;
                            gf.rangex = [0, 1];
                            if (gf.filterType === 'text') {
                                var old = layer.group.filters.filter(function (flt) { return flt.filterType === 'text'; });
                                old.forEach(function (groupFilter) {
                                    groupFilter.dimension.filterAll();
                                    groupFilter.dimension.dispose();
                                });
                                layer.group.filters = layer.group.filters.filter(function (groupFilter) { return groupFilter.filterType !== 'text'; });
                            }
                            // add filter
                            layer.group.filters.push(gf);
                        }
                        else {
                            var pos = layer.group.filters.indexOf(filter);
                            if (pos !== -1)
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
                var projectFeatureTypeName = feature.properties['FeatureTypeId'] || 'Default';
                var featureTypeName = feature.layerId + '_' + projectFeatureTypeName;
                if (!(this.featureTypes.hasOwnProperty(featureTypeName))) {
                    if (this.featureTypes.hasOwnProperty(projectFeatureTypeName))
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
                type.style = { nameLabel: 'Name' };
                type.propertyTypeData = [];
                for (var key in feature.properties) {
                    if (!feature.properties.hasOwnProperty(key))
                        continue;
                    var propertyType = [];
                    propertyType.label = key;
                    propertyType.title = key.replace('_', ' ');
                    propertyType.isSearchable = true;
                    propertyType.visibleInCallOut = true;
                    propertyType.canEdit = false;
                    var value = feature.properties[key]; // TODO Why does TS think we are returning an IStringToString object?
                    if (csComp.StringExt.isNumber(value))
                        propertyType.type = 'number';
                    else if (csComp.StringExt.isBoolean(value))
                        propertyType.type = 'boolean';
                    else if (csComp.StringExt.isBbcode(value))
                        propertyType.type = 'bbcode';
                    else
                        propertyType.type = 'text';
                    type.propertyTypeData.push(propertyType);
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
                var r = this.project.features.filter(function (k) { return ls.indexOf(k.layerId) > -1; });
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
                var m;
                var g = layer.group;
                if (this.lastSelectedFeature != null && this.lastSelectedFeature.layerId === layer.id) {
                    this.lastSelectedFeature = null;
                    this.$messageBusService.publish('sidebar', 'hide');
                    this.$messageBusService.publish('feature', 'onFeatureDeselect');
                }
                //m = layer.group.vectors;
                if (g.clustering) {
                    m = g.cluster;
                    this.project.features.forEach(function (feature) {
                        if (feature.layerId === layer.id) {
                            try {
                                m.removeLayer(layer.group.markers[feature.id]);
                                delete layer.group.markers[feature.id];
                            }
                            catch (error) {
                            }
                        }
                    });
                }
                else {
                    this.map.map.removeLayer(layer.mapLayer);
                }
                this.project.features = this.project.features.filter(function (k) { return k.layerId !== layer.id; });
                var layerName = layer.id + '_';
                var featureTypes = this.featureTypes;
                for (var poiTypeName in featureTypes) {
                    if (!featureTypes.hasOwnProperty(poiTypeName))
                        continue;
                    if (poiTypeName.lastIndexOf(layerName, 0) === 0)
                        delete featureTypes[poiTypeName];
                }
                // check if there are no more active layers in group and remove filters/styles
                if (g.layers.filter(function (l) {
                    return (l.enabled);
                }).length === 0) {
                    g.filters.forEach(function (f) {
                        if (f.dimension != null)
                            f.dimension.dispose();
                    });
                    g.filters = [];
                    g.styles = [];
                }
                this.rebuildFilters(g);
                this.$messageBusService.publish('layer', 'deactivate', layer);
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
                        options['subtitle'] = b.subtitle;
                        options['preview'] = b.preview;
                        if (b.subdomains != null)
                            options['subdomains'] = b.subdomains;
                        if (b.maxZoom != null)
                            options.maxZoom = b.maxZoom;
                        if (b.minZoom != null)
                            options.minZoom = b.minZoom;
                        if (b.attribution != null)
                            options.attribution = b.attribution;
                        if (b.id != null)
                            options['id'] = b.id;
                        var layer = L.tileLayer(b.url, options);
                        _this.$mapService.baseLayers[b.title] = layer;
                        if (b.isDefault)
                            _this.$mapService.changeBaseLayer(layer);
                    });
                    //$scope.projects = projects.projects;
                    if (solution.projects.length > 0) {
                        var p = solution.projects.filter(function (aProject) {
                            return aProject.title === initialProject;
                        })[0];
                        if (p != null) {
                            _this.openProject(p.url, layers);
                        }
                        else {
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
                var layerIds = [];
                if (layers) {
                    layers.split(';').forEach(function (layerId) {
                        layerIds.push(layerId.toLowerCase());
                    });
                }
                //console.log('layerIds (openProject): ' + JSON.stringify(layerIds));
                this.layerGroup.clearLayers();
                this.featureTypes = {};
                $.getJSON(url, function (data) {
                    _this.project = data;
                    if (!_this.project.timeLine) {
                        _this.project.timeLine = new Services.DateRange();
                    }
                    if (_this.project.viewBounds) {
                        _this.$mapService.map.fitBounds(new L.LatLngBounds(_this.project.viewBounds.southWest, _this.project.viewBounds.northEast));
                    }
                    var featureTypes = _this.project.featureTypes;
                    if (featureTypes) {
                        for (var typeName in featureTypes) {
                            if (!featureTypes.hasOwnProperty(typeName))
                                continue;
                            var featureType = featureTypes[typeName];
                            _this.featureTypes[typeName] = featureType;
                        }
                    }
                    var propertyTypeData = _this.project.propertyTypeData;
                    if (propertyTypeData) {
                        for (var key in propertyTypeData) {
                            if (!propertyTypeData.hasOwnProperty(key))
                                continue;
                            var propertyType = propertyTypeData[key];
                            _this.propertyTypeData[key] = propertyType;
                        }
                    }
                    if (!_this.project.dashboards) {
                        _this.project.dashboards = {};
                        var d = new Services.Dashboard('1', _this.project.title);
                        d.widgets = [];
                        _this.project.dashboards[_this.project.title] = d;
                    }
                    if (!_this.project.dataSets)
                        _this.project.dataSets = [];
                    _this.project.features = [];
                    _this.project.groups.forEach(function (group) {
                        if (group.id == null)
                            group.id = csComp.Helpers.getGuid();
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
                        }
                        else {
                            group.vectors = new L.LayerGroup();
                            _this.map.map.addLayer(group.vectors);
                        }
                        group.layers.forEach(function (layer) {
                            if (layer.reference == null)
                                layer.reference = csComp.Helpers.getGuid();
                            layer.group = group;
                            if (layer.enabled || layerIds.indexOf(layer.reference.toLowerCase()) >= 0) {
                                layer.enabled = true;
                                _this.addLayer(layer);
                            }
                        });
                        group.styles.forEach(function (style) {
                            if (style.id != null)
                                style.id = csComp.Helpers.getGuid();
                        });
                        group.filters.forEach(function (filter) {
                            if (filter.id != null)
                                filter.id = csComp.Helpers.getGuid();
                        });
                        if (data.startposition)
                            _this.$mapService.zoomToLocation(new L.LatLng(data.startposition.latitude, data.startposition.longitude));
                        _this.updateFilters();
                    });
                    _this.$messageBusService.publish('project', 'loaded');
                });
            };
            LayerService.prototype.closeProject = function () {
                var _this = this;
                if (this.project == null)
                    return;
                this.project.groups.forEach(function (group) {
                    group.layers.forEach(function (layer) {
                        if (layer.enabled) {
                            _this.removeLayer(layer);
                        }
                    });
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
                var r = new Services.PropertyInfo();
                r.count = 0;
                var sum = 0; // stores sum of elements
                var sumsq = 0; // stores sum of squares
                group.layers.forEach(function (l) {
                    if (l.enabled) {
                        _this.project.features.forEach(function (f) {
                            if (f.layerId === l.id && f.properties.hasOwnProperty(property)) {
                                var s = f.properties[property];
                                var v = Number(s);
                                if (v !== NaN) {
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
                if (r.sdMin === NaN)
                    r.sdMin = r.min;
                if (r.sdMax === NaN)
                    r.sdMax = r.max;
                if (this.propertyTypeData.hasOwnProperty(property)) {
                    var mid = this.propertyTypeData[property];
                    if (mid.maxValue != null)
                        r.sdMax = mid.maxValue;
                    if (mid.minValue != null)
                        r.sdMin = mid.minValue;
                }
                return r;
            };
            LayerService.prototype.updateFilters = function () {
                var _this = this;
                var fmain = $('#filterChart');
                fmain.empty();
                this.noFilters = true;
                this.project.groups.forEach(function (group) {
                    if (group.filters != null && group.filters.length > 0) {
                        $('<div style=\'float:left;margin-left: -10px; margin-top: 5px\' data-toggle=\'collapse\' data-target=\'#filters_' + group.id + '\'><i class=\'fa fa-chevron-down togglebutton toggle-arrow-down\'></i><i class=\'fa fa-chevron-up togglebutton toggle-arrow-up\'></i></div><div class=\'group-title\' >' + group.title + '</div><div id=\'filtergroupcount_' + group.id + '\'  class=\'filter-group-count\' /><div class=\'collapse in\' id=\'filters_' + group.id + '\'></div>').appendTo('#filterChart');
                        group.filters.forEach(function (filter) {
                            if (filter.dimension != null)
                                filter.dimension.dispose();
                            _this.noFilters = false;
                            switch (filter.filterType) {
                                case 'text':
                                    _this.addTextFilter(group, filter);
                                    break;
                                case 'bar':
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
                if (value == null || value === '') {
                    dcDim.filterAll();
                }
                else {
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
                    $('#filtergroupcount_' + group.id).text(group.filterResult.length + ' objecten geselecteerd');
            };
            /***
             * Add text filter to list of filters
             */
            LayerService.prototype.addTextFilter = function (group, filter) {
                var _this = this;
                filter.id = csComp.Helpers.getGuid();
                //var divid = 'filter_' + filter.id;
                var dcDim = group.ndx.dimension(function (d) {
                    if (d.properties.hasOwnProperty(filter.property)) {
                        return d.properties[filter.property];
                    }
                    else
                        return null;
                });
                filter.dimension = dcDim;
                dcDim.filterFunction(function (d) {
                    if (d != null)
                        return (d.toLowerCase().indexOf(filter.stringValue.toLowerCase()) > -1);
                    return false;
                });
                this.updateTextFilter(group, dcDim, filter.stringValue);
                var fid = 'filtertext' + filter.id;
                $('<h4>' + filter.title + '</h4><input type=\'text\' value=\'' + filter.stringValue + '\' class=\'filter-text\' id=\'' + fid + '\'/><a class=\'btn\' value=' + filter.value + ' id=\'remove' + filter.id + '\'><i class=\'fa fa-times\'></i></a>').appendTo('#filters_' + group.id);
                //$("<h4>" + filter.title + "</h4><input type='text' class='filter-text' id='" + fid + "'/></div><a class='btn btn-filter-delete' value=" + filter.value + " id='remove" + filter.id + "'><i class='fa fa-remove'></i></a>").appendTo("#filterChart");
                $('#' + fid).keyup(function () {
                    filter.stringValue = $('#' + fid).val();
                    _this.updateTextFilter(group, dcDim, filter.stringValue);
                    _this.updateFilterGroupCount(group);
                    //alert('text change');
                });
                $('#remove' + filter.id).on('click', function () {
                    var pos = group.filters.indexOf(filter);
                    filter.dimension.filterAll();
                    filter.dimension.dispose();
                    filter.dimension = null;
                    if (pos !== -1)
                        group.filters = group.filters.slice(pos - 1, pos);
                    dc.filterAll();
                    _this.updateFilters();
                    _this.resetMapFilter(group);
                });
            };
            LayerService.prototype.updateChartRange = function (chart, filter) {
                var filterFrom = $('#fsfrom_' + filter.id);
                var filterTo = $('#fsto_' + filter.id);
                var extent = chart.brush().extent();
                if (extent != null && extent.length === 2) {
                    if (extent[0] !== extent[1]) {
                        console.log(extent);
                        //if (extent.length == 2) {
                        filterFrom.val(extent[0]);
                        filterTo.val(extent[1]);
                    }
                }
                else {
                    filterFrom.val('0');
                    filterTo.val('1');
                }
            };
            /***
             * Add bar chart filter for filter number values
             */
            LayerService.prototype.addBarFilter = function (group, filter) {
                var _this = this;
                filter.id = csComp.Helpers.getGuid();
                var info = this.calculatePropertyInfo(group, filter.property);
                var divid = 'filter_' + filter.id;
                //$("<h4>" + filter.title + "</h4><div id='" + divid + "'></div><a class='btn' id='remove" + filter.id + "'>remove</a>").appendTo("#filters_" + group.id);
                //$("<h4>" + filter.title + "</h4><div id='" + divid + "'></div><div style='display:none' id='fdrange_" + filter.id + "'>from <input type='text' style='width:75px' id='fsfrom_" + filter.id + "'> to <input type='text' style='width:75px' id='fsto_" + filter.id + "'></div><a class='btn' id='remove" + filter.id + "'>remove</a>").appendTo("#filterChart");
                $('<h4>' + filter.title + '</h4><div id=\'' + divid + '\'></div><div style=\'display:none\' id=\'fdrange_' + filter.id + '\'>from <span id=\'fsfrom_' + filter.id + '\'/> to <span id=\'fsto_' + filter.id + '\'/></div><a class=\'btn\' id=\'remove' + filter.id + '\'>remove</a>').appendTo('#filterChart');
                var filterFrom = $('#fsfrom_' + filter.id);
                var filterTo = $('#fsto_' + filter.id);
                var filterRange = $('#fdrange_' + filter.id);
                $('#remove' + filter.id).on('click', function () {
                    var pos = group.filters.indexOf(filter);
                    if (pos !== -1)
                        group.filters.splice(pos, 1);
                    filter.dimension.dispose();
                    _this.updateFilters();
                    _this.resetMapFilter(group);
                });
                var dcChart = dc.barChart('#' + divid);
                var nBins = 20;
                var binWidth = (info.sdMax - info.sdMin) / nBins;
                var dcDim = group.ndx.dimension(function (d) {
                    if (!d.properties.hasOwnProperty(filter.property))
                        return null;
                    else {
                        if (d.properties[filter.property] != null) {
                            var a = parseInt(d.properties[filter.property]);
                            if (a >= info.sdMin && a <= info.sdMax) {
                                return Math.floor(a / binWidth) * binWidth;
                            }
                            else {
                                return null;
                            }
                        }
                        return null;
                    }
                });
                filter.dimension = dcDim;
                var dcGroup = dcDim.group();
                //var scale =
                dcChart.width(275).height(90).dimension(dcDim).group(dcGroup).transitionDuration(100).centerBar(true).gap(5).elasticY(true).x(d3.scale.linear().domain([info.sdMin, info.sdMax]).range([-1, nBins + 1])).filterPrinter(function (filters) {
                    var s = '';
                    if (filters.length > 0) {
                        var localFilter = filters[0];
                        filterFrom.text(localFilter[0].toFixed(2));
                        filterTo.text(localFilter[1].toFixed(2));
                        s += localFilter[0];
                    }
                    return s;
                }).on('filtered', function (e) {
                    var fil = e.hasFilter();
                    if (fil) {
                        filterRange.show();
                    }
                    else {
                        filterRange.hide();
                    }
                    dc.events.trigger(function () {
                        group.filterResult = dcDim.top(Infinity);
                        _this.updateFilterGroupCount(group);
                    }, 0);
                    dc.events.trigger(function () {
                        _this.updateMapFilter(group);
                    }, 100);
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
                    var included = group.filterResult.filter(function (f) { return f.id === key; }).length > 0;
                    if (group.clustering) {
                        var incluster = group.cluster.hasLayer(marker);
                        if (!included && incluster)
                            group.cluster.removeLayer(marker);
                        if (included && !incluster)
                            group.cluster.addLayer(marker);
                    }
                    else {
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
                    }
                    else {
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
                'mapService',
                '$rootScope'
            ];
            return LayerService;
        })();
        Services.LayerService = LayerService;
    })(Services = csComp.Services || (csComp.Services = {}));
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
    try {
        BaseMapList.myModule = angular.module(moduleName);
    }
    catch (err) {
        // named module does not exist, so create one
        BaseMapList.myModule = angular.module(moduleName, []);
    }
    /**
      * Directive to display the available map layers.
      */
    BaseMapList.myModule.directive('baseMapList', [
        '$window',
        '$compile',
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
        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
        BaseMapListCtrl.$inject = [
            '$scope',
            'mapService'
        ];
        return BaseMapListCtrl;
    })();
    BaseMapList.BaseMapListCtrl = BaseMapListCtrl;
})(BaseMapList || (BaseMapList = {}));
var csComp;
(function (csComp) {
    var Services;
    (function (Services) {
        var MapCtrl = (function () {
            // dependencies are injected via AngularJS $injector
            // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
            function MapCtrl($scope, $location, $mapService //,
                ) {
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
                    position: "bottomleft"
                }).addTo(map);
                // GPS enabled geolocation control set to follow the user's location 
                L.control.locate({
                    position: "bottomleft",
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
            // $inject annotation.
            // It provides $injector with information about dependencies to be injected into constructor
            // it is better to have it close to the constructor, because the parameters must match in count and type.
            // See http://docs.angularjs.org/guide/di
            MapCtrl.$inject = [
                '$scope',
                '$location',
                'mapService'
            ];
            return MapCtrl;
        })();
        Services.MapCtrl = MapCtrl;
    })(Services = csComp.Services || (csComp.Services = {}));
})(csComp || (csComp = {}));
//export = MapLayersCtrl; 
var csComp;
(function (csComp) {
    var Services;
    (function (Services) {
        'use strict';
        /*
         * Singleton service that holds a reference to the map.
         * In case other controllers need access to the map, they can inject this service.
         */
        var MapService = (function () {
            function MapService($messageBusService) {
                this.$messageBusService = $messageBusService;
                this.isVisible = true;
                this.timelineVisible = true;
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
                }
                else {
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
                    var spacingLon = 0.05; // extra spacing left and right, where the menus are.
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
                return arr.reduce(function (p, c) { return [Math.min(p[0], c[0]), Math.max(p[1], c[0]), Math.min(p[2], c[1]), Math.max(p[3], c[1])]; }, [1000, -1000, 1000, -1000]);
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
    })(Services = csComp.Services || (csComp.Services = {}));
})(csComp || (csComp = {}));
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
    try {
        StyleList.myModule = angular.module(moduleName);
    }
    catch (err) {
        // named module does not exist, so create one
        StyleList.myModule = angular.module(moduleName, []);
    }
    /**
      * Directive to display the available map layers.
      */
    StyleList.myModule.directive('styleList', [
        '$window',
        '$compile',
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
        // $inject annotation.                                                   
        // It provides $injector with information about dependencies to be in  jected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
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
    var Search;
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
                }
                else {
                    //alert('Yay. Location: ' + this.$scope.location);
                    var center = new L.LatLng(this.$scope.location.lat, this.$scope.location.lng);
                    this.$mapService.zoomToLocation(center);
                }
            };
            // $inject annotation.
            // It provides $injector with information about dependencies to be injected into constructor
            // it is better to have it close to the constructor, because the parameters must match in count and type.
            // See http://docs.angularjs.org/guide/di
            SearchFormCtrl.$inject = [
                '$scope',
                'mapService'
            ];
            return SearchFormCtrl;
        })();
        Search.SearchFormCtrl = SearchFormCtrl;
    })(Search = csComp.Search || (csComp.Search = {}));
})(csComp || (csComp = {}));
var FeatureProps;
(function (FeatureProps) {
    FeatureProps.html = '<div data-ng-cloak data-ng-show="showMenu" >    <h4 class="rightpanel-header">        <img data-ng-if="callOut.icon" data-ng-src="{{callOut.icon}}" width="24" height="24" style="margin-left:5px" alt="Icon" />        &nbsp;&nbsp;{{callOut.title}}    </h4>        <div class="container-fluid rightpanel-tabs" style="position: relative">        <div class="row" style="overflow:hidden" ng-if="callOut.sectionCount() < 4">            <!-- Nav tabs -->            <span id="leftArr" style="display:block;padding:10px;margin-top:5px;position:absolute;background-color:transparent;z-index:2">                <i class="glyphicon glyphicon-chevron-left"></i>            </span>            <span id="rightArr" style="display:block;padding:10px;margin-top:5px;position:absolute;background-color:transparent;z-index:2">                <i class="glyphicon glyphicon-chevron-right"></i>            </span>            <ul class="nav nav-tabs" id="featureTabs" style="margin-left:10px">                <li data-toggle="tab" data-ng-class="{active : $first}" data-ng-repeat="(sectionTitle, section) in callOut.sections" ng-if="section.hasProperties()">                    <a ng-href="#rp-{{$index}}" data-toggle="tab" data-ng-if="section.showSectionIcon()" ng-click="featureTabActivated(sectionTitle, section)"><i class="fa {{section.sectionIcon}}"></i></a>                    <a ng-href="#rp-{{$index}}" data-toggle="tab" data-ng-if="!section.showSectionIcon()" ng-click="featureTabActivated(sectionTitle, section)">{{sectionTitle}}</a>                </li>            </ul>        </div>                        <div class="row" ng-if="callOut.sectionCount() >= 4">            <ul class="nav nav-tabs" id="featureTabs" style="margin-left:10px">                <li data-toggle="tab" class="active" ng-init="firstCallOutsection=callOut.firstSection()">                    <a ng-href="#rp-0" data-toggle="tab" data-ng-if="firstCallOutsection.showSectionIcon()" ><i class="fa {{firstCallOutsection.sectionIcon}}"></i></a>                                    </li>                <li class="dropdown" ng-init="selectedSection.title=\'Kies een categorie\'">                    <a style="cursor:pointer" data-toggle="dropdown">{{selectedSection.title}} <span class="caret"/></a>                    <ul class="dropdown-menu">                        <li data-ng-repeat="(sectionTitle, section) in callOut.sections" ng-if="!$last && !$first"><a ng-href="#rp-{{$index}}" ng-click="selectedSection.title = sectionTitle" data-toggle="tab">{{sectionTitle}}</a></li>                    </ul>                </li>                <li data-toggle="tab" ng-init="lastCallOutsection=callOut.lastSection()">                    <a ng-href="#rp-{{callOut.sectionCount()-1}}" data-toggle="tab" data-ng-if="lastCallOutsection.showSectionIcon()"><i class="fa {{lastCallOutsection.sectionIcon}}"></i></a>                                    </li>                            </ul>        </div>    </div>        <div class="tab-content" style="top:50px; width:355px; overflow-y: auto; overflow-x: hidden" resize resize-y="150">        <div data-ng-if="!$last" class="tab-pane" data-ng-class="{active : $first}" id="rp-{{$index}}" data-ng-repeat="(sectionTitle, section) in callOut.sections">            <table class="table table-condensed">                <tr popover="{{(item.description) ? item.description : \'\'}}"                    popover-placement="left"                    popover-trigger="mouseenter"                    popover-append-to-body="true"                    data-ng-repeat="item in section.properties">                    <td><a class="fa fa-filter makeNarrow" data-ng-show="item.canFilter" data-ng-click="vm.$layerService.setFilter(item)" style="cursor: pointer"></a></td>                    <td><a class="fa fa-eye makeNarrow" data-ng-show="item.canStyle" data-ng-click="vm.$layerService.setStyle(item)" style="cursor: pointer"></a></td>                    <td>{{item.key}}</td>                    <td class="text-right" data-ng-bind-html="vm.toTrusted(item.value)"></td>                </tr>            </table>        </div>        <!-- Treat last tab (filter) differently -->        <div data-ng-if="$last" class="tab-pane" data-ng-class="{active : $first}" id="rp-{{$index}}" data-ng-repeat="(sectionTitle, section) in callOut.sections">            <!-- Add filter panel to the last rendered element -->            <div class="has-feedback" style="padding:0 4px 4px 4px;">                <span style="direction: ltr; position: static; display: block;">                    <input id="searchbox" data-ng-model="search.key" type="text"                            placeholder="Filter" autocomplete="off" spellcheck="false"                            style="position: relative; vertical-align: top;" class="form-control tt-input">                </span>                <span id="searchicon" class="fa form-control-feedback fa-filter"></span>            </div>            <!--<input style="padding:4px;" class=" form-control" data-ng-model="search" placeholder="...">-->            <table id="searchTextResults" class="table table-condensed">                <tr popover="{{(item.description) ? item.description : \'\'}}"                    popover-placement="left"                    popover-trigger="mouseenter"                    popover-append-to-body="true"                    data-ng-repeat="item in section.properties | filter:search">                    <td><a class="fa fa-filter makeNarrow" data-ng-show="item.canFilter" data-ng-click="vm.$layerService.setFilter(item)"></a></td>                    <td><a class="fa fa-eye makeNarrow" data-ng-show="item.canStyle" data-ng-click="vm.$layerService.setStyle(item)"></a></td>                    <td>{{item.key}}</td>                    <td class="text-right" data-ng-bind-html="vm.toTrusted(item.value)"></td>                </tr>            </table>        </div>    </div></div>';
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
    try {
        FeatureProps.myModule = angular.module(moduleName);
    }
    catch (err) {
        // named module does not exist, so create one
        FeatureProps.myModule = angular.module(moduleName, []);
    }
    /**
      * Directive to display a feature's properties in a panel.
      *
      * @seealso          : http://www.youtube.com/watch?v=gjJ5vLRK8R8&list=UUGD_0i6L48hucTiiyhb5QzQ
      * @seealso          : http://plnkr.co/edit/HyBP9d?p=preview
      */
    FeatureProps.myModule.directive('featureprops', ['$compile', function ($compile) {
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
    }]);
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
            this.propertyTypes = {};
            this.properties = [];
            this.sectionIcon = sectionIcon;
        }
        CallOutSection.prototype.showSectionIcon = function () {
            return !csComp.StringExt.isNullOrEmpty(this.sectionIcon);
        };
        CallOutSection.prototype.addProperty = function (key, value, property, canFilter, canStyle, feature, isFilter, description, meta) {
            this.properties.push(new CallOutProperty(key, value, property, canFilter, canStyle, feature, isFilter, description ? description : null, meta));
        };
        CallOutSection.prototype.hasProperties = function () {
            return this.properties != null && this.properties.length > 0;
        };
        return CallOutSection;
    })();
    FeatureProps.CallOutSection = CallOutSection;
    var CallOut = (function () {
        function CallOut(type, feature, propertyTypeData) {
            var _this = this;
            this.type = type;
            this.feature = feature;
            this.propertyTypeData = propertyTypeData;
            this.sections = {};
            //if (type == null) this.createDefaultType();
            this.setTitle();
            this.setIcon(feature);
            var infoCallOutSection = new CallOutSection('fa-info');
            var searchCallOutSection = new CallOutSection('fa-filter');
            var displayValue;
            if (type != null) {
                var propertyTypes = csComp.Helpers.getPropertyTypes(type, propertyTypeData);
                propertyTypes.forEach(function (mi) {
                    var callOutSection = _this.getOrCreateCallOutSection(mi.section) || infoCallOutSection;
                    callOutSection.propertyTypes[mi.label] = mi;
                    var text = feature.properties[mi.label];
                    displayValue = csComp.Helpers.convertPropertyInfo(mi, text);
                    // Skip empty, non-editable values
                    if (!mi.canEdit && csComp.StringExt.isNullOrEmpty(displayValue))
                        return;
                    var canFilter = (mi.type === "number" || mi.type === "text" || mi.type === "options");
                    var canStyle = (mi.type === "number" || mi.type === "options" || mi.type === "color");
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
        CallOut.prototype.sectionCount = function () {
            return Object.keys(this.sections).length;
        };
        CallOut.prototype.firstSection = function () {
            return this.sections[Object.keys(this.sections)[this.sectionCount() - 2]];
        };
        CallOut.prototype.lastSection = function () {
            return this.sections[Object.keys(this.sections)[this.sectionCount() - 1]];
        };
        CallOut.prototype.getOrCreateCallOutSection = function (sectionTitle) {
            if (!sectionTitle) {
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
        CallOut.prototype.setIcon = function (feature) {
            this.icon = (this.type == null || this.type.style == null || !this.type.style.hasOwnProperty('iconUri') || this.type.style.iconUri.toLowerCase().indexOf('_media') >= 0) ? '' : this.type.style.iconUri.indexOf('{') >= 0 ? csComp.Helpers.convertStringFormat(feature, this.type.style.iconUri) : this.type.style.iconUri;
        };
        CallOut.title = function (type, feature) {
            var title = '';
            if (type != null && type.style != null && type.style.nameLabel)
                title = feature.properties[type.style.nameLabel];
            else {
                if (feature.properties.hasOwnProperty('Name'))
                    title = feature.properties['Name'];
                else if (feature.properties.hasOwnProperty('name'))
                    title = feature.properties['name'];
            }
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
                        _this.displayFeature(feature);
                        _this.$scope.poi = feature;
                        _this.$scope.autocollapse(true);
                        break;
                    case "onFeatureUpdated":
                        _this.displayFeature(_this.$layerService.lastSelectedFeature);
                        _this.$scope.poi = _this.$layerService.lastSelectedFeature;
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
                if (initializeTabPosition === void 0) { initializeTabPosition = false; }
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
                }
                else {
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
                //var current = Math.abs(parseFloat($scope.tabs.css('margin-left')));
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
            try {
                if (html === undefined || html === null)
                    return this.$sce.trustAsHtml(html);
                return this.$sce.trustAsHtml(html.toString());
            }
            catch (e) {
                console.log(e + ': ' + html);
                return '';
            }
        };
        FeaturePropsCtrl.prototype.displayFeature = function (feature) {
            if (!feature)
                return;
            var featureType = this.$layerService.featureTypes[feature.featureTypeName];
            this.$scope.callOut = new CallOut(featureType, feature, this.$layerService.propertyTypeData);
            // Probably not needed
            //if (this.$scope.$root.$$phase != '$apply' && this.$scope.$root.$$phase != '$digest') {
            //    this.$scope.$apply();
            //}
        };
        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
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
var DataTable;
(function (DataTable) {
    /**
     * Represents a field in the table.
     * The value is the actual displayValue shown, the type is the propertyType type (e.g. number or text, useful when aligning the data), and the header is used for sorting.
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
            this.propertyTypes = [];
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
                if (data.featureTypes == null)
                    data.featureTypes = {};
                data.features.forEach(function (f) {
                    f.featureTypeName = f.properties['FeatureTypeId'];
                    if (!(f.featureTypeName in data.featureTypes))
                        data.featureTypes[f.featureTypeName] = _this.$layerService.featureTypes[f.featureTypeName];
                });
                _this.updatepropertyType(data);
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
                featureTypes: {}
            };
            // If we are filtering, load the filter results
            this.$layerService.project.groups.forEach(function (group) {
                if (group.filterResult != null)
                    group.filterResult.forEach(function (f) { return data.features.push(f); });
            });
            // Otherwise, take all loaded features
            if (data.features.length === 0)
                data.features = this.$layerService.project.features;
            data.features.forEach(function (f) {
                if (!(f.featureTypeName in data.featureTypes))
                    data.featureTypes[f.featureTypeName] = _this.$layerService.featureTypes[f.featureTypeName];
            });
            this.dataset = data;
            this.updatepropertyType(data);
        };
        DataTableCtrl.prototype.updatepropertyType = function (data) {
            var _this = this;
            this.propertyTypes = [];
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
            for (var key in data.featureTypes) {
                featureType = data.featureTypes[key];
                if (featureType.propertyTypeKeys != null) {
                    var keys = featureType.propertyTypeKeys.split(';');
                    keys.forEach(function (k) {
                        if (k in _this.$layerService.propertyTypeData)
                            mis.push(_this.$layerService.propertyTypeData[k]);
                        else if (featureType.propertyTypeData != null) {
                            var result = $.grep(featureType.propertyTypeData, function (e) { return e.label === k; });
                            if (result.length >= 1)
                                mis.push(result);
                        }
                    });
                }
                else if (featureType.propertyTypeData != null) {
                    featureType.propertyTypeData.forEach(function (mi) { return mis.push(mi); });
                }
                mis.forEach(function (mi) {
                    if ((mi.visibleInCallOut || mi.label === "Name") && titles.indexOf(mi.title) < 0) {
                        titles.push(mi.title);
                        _this.propertyTypes.push(mi);
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
        DataTableCtrl.prototype.toggleSelection = function (propertyTypeTitle) {
            var idx = this.headers.indexOf(propertyTypeTitle);
            // is currently selected
            if (idx > -1) {
                this.headers.splice(idx, 1);
            }
            else {
                this.headers.push(propertyTypeTitle);
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
            this.propertyTypes.forEach(function (mi) {
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
                    displayValue = csComp.Helpers.convertPropertyInfo(mi, text);
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
            }
            else {
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
                var order; // Original sort order
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
            }
            else if (!csComp.Helpers.supportsDataUri()) {
                // Older versions of IE: show the data in a new window
                var popup = window.open('', 'csv', '');
                popup.document.body.innerHTML = '<pre>' + csvData + '</pre>';
            }
            else {
                // Support for browsers that support the data uri.
                var a = document.createElement('a');
                document.body.appendChild(a);
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
            try {
                if (html === undefined || html === null)
                    return this.$sce.trustAsHtml(html);
                return this.$sce.trustAsHtml(html.toString());
            }
            catch (e) {
                console.log(e + ': ' + html);
                return '';
            }
        };
        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
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
var DataTable;
(function (DataTable) {
    DataTable.html = '<div>    <div style="width:100%; margin: 10px auto;">        <div style="float: left; width: 15%; margin: 0; padding: 1em">            <!-- Pull down of map layers -->            <select data-ng-model="vm.selectedLayerId"                    data-ng-change="vm.loadLayer()"                    data-ng-options="layer.id as layer.title group by layer.group for layer in vm.layerOptions"                    class="form-control tt-input"></select>            <!-- List of headers -->            <ul class="form-group" style="margin-top: 1em; margin-left: -2em; overflow-y: auto; overflow-x: hidden;"                resize resize-y="150">                <li ng-repeat="mi in vm.propertyTypes" class="list-unstyled" style="white-space: nowrap; text-overflow: ellipsis">                    <label>                        <input type="checkbox" name="vm.selectedTitles[]" value="{{mi.title}}"                               data-ng-checked="vm.headers.indexOf(mi.title) > -1"                               data-ng-click="vm.toggleSelection(mi.title)">&nbsp;&nbsp;{{mi.title}}                    </label>                    <!--<div class="checkbox">                        <label>                            <input type="checkbox" name="vm.selectedTitles[]" value="{{mi.title}}"                                   data-ng-checked="vm.headers.indexOf(mi.title) > -1"                                   data-ng-click="vm.toggleSelection(mi.title)">&nbsp;&nbsp;{{mi.title}}                        </label>                    </div>-->                </li>            </ul>            <!--       <pre>{{vm.headers|json}}</pre>-->        </div>        <!-- Right side of the table view -->        <div style="margin-left: 16%; border-left: 1px solid gray; padding: 1em;" ng-init="poiTypeFilter">            <!-- Filter -->            <div class="has-feedback" style="margin-bottom: 1em; float: right; width: 16%; min-width: 200px;">                <span style="direction: ltr; position: static; display: block;">                    <input id="searchbox" data-ng-model="featureFilter" type="text"                           placeholder="Filter" autocomplete="off" spellcheck="false"                           style="position: relative; vertical-align: top;" class="form-control tt-input">                </span>                <span id="searchicon" class="fa form-control-feedback fa-filter" style="padding-top: 0px;"></span>            </div>            <!--Download to CSV option-->            <a href="" data-ng-click="vm.downloadCsv()" alt="Download CSV" style="margin-top: 5px; margin-right: 1em; float: right;"><i class="fa fa-download fa-2x"></i></a>            <!-- Specify how many items to show -->            <select data-ng-model="vm.numberOfItems" style="margin-bottom: 1em; margin-right: 10px; float: left; width: 16%; min-width: 200px;" class="form-control tt-input">                <option value="5" translate="SHOW5"></option>                <option value="10" translate="SHOW10"></option>                <option value="15" translate="SHOW15"></option>                <option value="20" translate="SHOW20"></option>                <option value="25" translate="SHOW25"></option>                <option value="30" translate="SHOW30"></option>                <option value="35" translate="SHOW35"></option>                <option value="40" translate="SHOW40"></option>            </select>            <!-- Data table -->            <table class="table table-striped table-condensed">                <tr>                    <th data-ng-repeat="header in vm.headers track by $index">                        {{header}}&nbsp;                        <a data-ng-click="reverseSort = !reverseSort; vm.orderBy($index, reverseSort);"><i data-ng-class="vm.sortOrderClass($index, reverseSort)">&nbsp;&nbsp;</i></a>                    </th>                </tr>                <tr dir-paginate="row in vm.rows | filter:featureFilter | itemsPerPage: vm.numberOfItems"                    style="cursor: pointer; vertical-align: central">                    <td data-ng-class="{\'text-right\': field.type == \'number\'}" data-ng-repeat="field in row track by $index" data-ng-bind-html="vm.toTrusted(field.displayValue)"></td>                </tr>            </table>            <dir-pagination-controls style="" max-size="10" boundary-links="true" direction-links="true"                                     template-url="bower_components/angular-utils-pagination/dirPagination.tpl.html"></dir-pagination-controls>        </div>    </div>    <div style="clear: both; margin: 0; padding: .5em"></div></div>';
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
    try {
        DataTable.myModule = angular.module(moduleName);
    }
    catch (err) {
        // named module does not exist, so create one
        DataTable.myModule = angular.module(moduleName, []);
    }
    /**
      * Directive to display a feature's properties in a panel.
      *
      * @seealso : http://www.youtube.com/watch?v=gjJ5vLRK8R8&list=UUGD_0i6L48hucTiiyhb5QzQ
      * @seealso : http://plnkr.co/edit/HyBP9d?p=preview
      */
    DataTable.myModule.directive('datatable', ['$compile', function ($compile) {
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
    }]);
})(DataTable || (DataTable = {}));
var csComp;
(function (csComp) {
    var Services;
    (function (Services) {
        'use strict';
        /*
         * Singleton service that holds a reference to the map.
         * In case other controllers need access to the map, they can inject this service.
         */
        var TimeService = (function () {
            function TimeService($messageBusService) {
                this.$messageBusService = $messageBusService;
                //this.map = L.map("map", {
                //    zoomControl        : false,
                //    attributionControl : true
                //});
                //this.activeBaseLayer;
                this.baseLayers = {};
            }
            TimeService.$inject = [
                'messageBusService'
            ];
            return TimeService;
        })();
        Services.TimeService = TimeService;
    })(Services = csComp.Services || (csComp.Services = {}));
})(csComp || (csComp = {}));
var Translations;
(function (Translations) {
    var English = (function () {
        function English() {
        }
        English.locale = {
            CANCEL_BTN: 'Cancel',
            OK_BTN: 'OK',
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
            BLUE_RED: 'blue - red',
            RED_BLUE: 'red - blue',
            WHITE_BLUE: 'white - blue',
            BLUE_WHITE: 'blue - white',
            WHITE_GREEN: 'white - green',
            GREEN_WHITE: 'green - white',
            WHITE_ORANGE: 'white - orange',
            ORANGE_WHITE: 'orange - white',
            MCA: {
                DESCRIPTION: '<h4>Multi-Criteria Analysis</h4><p  style="text-align: left; margin-left:5px;">MCA, is a method that combines multiple properties of a feature on the map into a new property. It achieves this by:<ol><li>Scaling each property to a range between 0 (no value) and 1 (maximum value).</li><li>Weighing each property relative to the others, where a weight less than 0 indicates you wish to avoid it, 0 is ignored, and a value greater than 0 is prefered.</li></ol> In fact, it is a kind of linear regression.',
                INFO: 'At the moment, no map layers are loaded that contain a multi-criteria analysis. Open another map layer to see it.',
                INFO_EXPERT: 'At the moment, no map layers are loaded that contain a multi-criteria analysis. Open another map layer to use it, or create a new MCA using the wizard.',
                SHOW_FEATURE_MSG: 'Select a feature on the map to see the effects of the Multi-Criteria Analysis (MCA).',
                TOTAL_RESULT: 'Combined result',
                DELETE_MSG: 'Delete "{0}"',
                DELETE_MSG2: 'Are you sure?',
                HAS_CATEGORY: '  Has category? ',
                HAS_RANK: '  Include rank? ',
                EDITOR_TITLE: 'MCA Editor',
                MAIN_FEATURE: 'Select the main feature',
                PROPERTIES: 'Select the properties',
                INCLUDE_RANK: '  Show rank? ',
                RANK_TITLE: '[Rank title...]',
                TITLE: 'Title... *',
                CATEGORY_MSG: '[Category...]',
                TOGGLE_SPARKLINE: 'Show or hide bar charts and scoring function.',
                SCALE_MIN_TITLE: '[Min. scale]',
                SCALE_MAX_TITLE: '[Max. scale]',
                MIN_VALUE: '[Minimum (\u03BC-2\u03C3)]',
                MAX_VALUE: '[Maximum (\u03BC+2\u03C3)]',
                MIN_CUTOFF_VALUE: '[Ignore when below this value]',
                MAX_CUTOFF_VALUE: '[Ignore when above this value]',
                LINEAR: 'Linearly increasing function between min and max.',
                SIGMOID: 'Tangentially increasing function between min and max',
                GAUSSIAN: 'Normal distribution increasing function between min and max.',
                ADD_MCA: 'Add a new MCA.',
                DELETE_MCA: 'Delete the MCA.',
                EDIT_MCA: 'Edit the MCA.'
            },
            PROJECTSETTINGS: {
                TITLE: 'Project Settings',
                DESCRIPTION: 'Settings'
            },
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
            CANCEL_BTN: 'Annuleren',
            OK_BTN: 'OK',
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
            BLUE_RED: 'blauw - rood',
            RED_BLUE: 'rood - blauw',
            WHITE_BLUE: 'wit - blauw',
            BLUE_WHITE: 'wit - groen',
            WHITE_GREEN: 'wit - groen',
            GREEN_WHITE: 'groen - wit',
            WHITE_ORANGE: 'wit - oranje',
            ORANGE_WHITE: 'oranje - wit',
            MCA: {
                DESCRIPTION: '<h4>Toelichting MCA</h4><div style="text-align: left; margin-left:5px;"><p>Multi-Criteria Analysis (MCA) is een methode die verschillende eigenschappen van een locatie of gebied op de kaart combineerd tot een nieuwe eigenschap. Dit gaat als volgt: <ol><li>Schaal iedere eigenschap tussen 0 (geen waarde) en 1 (maximum waarde).</li><li>Weeg iedere eigenschap relatief t.o.v. de andere gekozen eigenschappen, waar een gewicht onder 0 betekent dat je de eigenschap wil vermijden, 0 wordt genegeerd, en een waarde groter dan 0 betekent dat je dit wil bereiken.</li></ol>Met andere woorden, het is een vorm van lineare regressie.</p></div>',
                INFO: 'Momenteel zijn er geen kaartlagen geopend die multi-criteria analyses bevatten. Open hiervoor een andere kaartlaag.',
                INFO_EXPERT: 'Momenteel zijn er geen kaartlagen geopend die multi-criteria analyses bevatten. Open een kaartlaag en maak een nieuwe MCA aan met behulp van de wizard.',
                SHOW_FEATURE_MSG: 'Selecteer een feature op de kaart om de Multi-Criteria Analyse (MCA) resultaten in detail te bekijken.',
                TOTAL_RESULT: 'Gecombineerd resultaat',
                DELETE_MSG: 'Verwijder "{0}"',
                DELETE_MSG2: 'Weet u het zeker?',
                HAS_CATEGORY: '  Specificeer categorie? ',
                EDITOR_TITLE: 'MCA Editor',
                MAIN_FEATURE: 'Selecteer het type feature',
                PROPERTIES: 'Selecteer de eigenschappen',
                INCLUDE_RANK: '  Toon een rangorde? ',
                RANK_TITLE: '[Titel voor de rangorde]',
                TITLE: 'Titel... *',
                CATEGORY_MSG: '[Categorie...]',
                TOGGLE_SPARKLINE: 'Toon of verberg de histogram en score functie.',
                SCALE_MIN_TITLE: '[Schaal max]',
                SCALE_MAX_TITLE: '[Schaal min]',
                MIN_VALUE: '[Ondergrens (\u03BC-2\u03C3)]',
                MAX_VALUE: '[Bovengrens (\u03BC+2\u03C3)]',
                MIN_CUTOFF_VALUE: '[Niet meewegen onder]',
                MAX_CUTOFF_VALUE: '[Niet meewegen boven]',
                LINEAR: 'Linear toenemende functie tussen onder- en bovengrens.',
                SIGMOID: 'Tangentieel toenemende functie tussen onder- en bovengrens.',
                GAUSSIAN: 'Normale verdeling tussen onder- en bovengrens.',
                ADD_MCA: 'Maak een nieuwe MCA.',
                DELETE_MCA: 'Verwijder de MCA.',
                EDIT_MCA: 'Bewerk de MCA.'
            },
            PROJECTSETTINGS: {
                TITLE: 'Project instellingen',
                DESCRIPTION: 'Instellingen'
            },
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
