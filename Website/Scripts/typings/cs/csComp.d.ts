/// <reference path="../crossfilter/crossfilter.d.ts" />
/// <reference path="../leaflet/leaflet.d.ts" />
declare module csComp.GeoJson {
    class Feature implements IFeature {
        public id: string;
        public layerId: string;
        public type: string;
        public geometry: IGeoJsonGeometry;
        public properties: IStringToString[];
        public isSelected: boolean;
        public htmlStyle: string;
        public featureTypeName: string;
        public fType: IFeatureType;
        public isInitialized: boolean;
    }
    interface IStringToString {
        [key: string]: string;
    }
    interface IGeoJsonGeometry {
        type: string;
        coordinates: any;
    }
    interface IFeature {
        id: string;
        layerId: string;
        type: string;
        geometry: IGeoJsonGeometry;
        properties: IStringToString[];
        isSelected: boolean;
        htmlStyle: string;
        featureTypeName: string;
        fType: IFeatureType;
        isInitialized: boolean;
    }
    enum DrawingModeType {
        None = 0,
        Image = 1,
        Point = 2,
        Square = 3,
        Rectangle = 4,
        Line = 5,
        Circle = 6,
        Freehand = 7,
        Polyline = 8,
        Polygon = 9,
        MultiPolygon = 10,
    }
    enum featureFilterType {
        /** Turn filtering off */
        none = 0,
        /** Default for numbers: histogram */
        bar = 1,
        /** Default for text */
        text = 2,
    }
    interface IMetaInfo {
        label?: string;
        title?: string;
        description?: string;
        type?: string;
        section?: string;
        stringFormat?: string;
        visibleInCallOut?: boolean;
        canEdit?: boolean;
        filterType?: string;
        isSearchable?: boolean;
        minValue?: number;
        maxValue?: number;
        defaultValue?: number;
    }
    class MetaInfo {
        public label: string;
        public title: string;
        public description: string;
        public type: string;
        public section: string;
        public stringFormat: string;
        public visibleInCallOut: boolean;
        public canEdit: boolean;
        public filterType: string;
        public isSearchable: boolean;
        public minValue: number;
        public maxValue: number;
        public defaultValue: number;
    }
    interface IFeatureTypeStyle {
        nameLabel?: string;
        fillColor?: string;
        strokeColor?: string;
        drawingMode?: string;
        strokeWidth?: number;
        iconWidth?: number;
        iconHeight?: number;
        iconUri?: string;
        maxTitleResolution?: string;
        analysisMetaInfo?: any;
    }
    interface IFeatureType {
        name?: string;
        style?: IFeatureTypeStyle;
        metaInfoData?: IMetaInfo[];
        /**
        * Optional list of MetaInfo keys, separated by semi-colons.
        * The keys can be resolved in the project's metaInfoData dictionary, or in the local metaInfoData.
        */
        metaInfoKeys?: string;
    }
    interface IGeoJsonFile {
        poiTypes?: {
            [key: string]: IFeatureType;
        };
        type: string;
        features: Feature[];
    }
}
declare module BaseMapList {
    var html: string;
}
declare module BaseMapList {
    /**
    * Module
    */
    var myModule: any;
}
declare module BaseMapList {
    interface IBaseMapScope extends ng.IScope {
        vm: BaseMapListCtrl;
    }
    class BaseMapListCtrl {
        private $scope;
        private $mapService;
        private scope;
        static $inject: string[];
        constructor($scope: IBaseMapScope, $mapService: csComp.Services.MapService);
        public selectBaseLayer(key: any): void;
    }
}
declare module DataTable {
    var html: string;
}
declare module DataTable {
    /**
    * Module
    */
    var myModule: any;
}
declare module DataTable {
    interface IDataTableViewScope extends ng.IScope {
        vm: DataTableCtrl;
    }
    /**
    * Represents a field in the table.
    * The value is the actual displayValue shown, the type is the metainfo type (e.g. number or text, useful when aligning the data), and the header is used for sorting.
    */
    class TableField {
        public displayValue: string;
        public originalValue: any;
        public type: string;
        public header: string;
        constructor(displayValue: string, originalValue: any, type: string, header: string);
    }
    class DataTableCtrl {
        private $scope;
        private $http;
        private $sce;
        private $translate;
        private $layerService;
        private $localStorageService;
        private $messageBusService;
        public mapLabel: string;
        public dataset: csComp.GeoJson.IGeoJsonFile;
        public selectedType: csComp.GeoJson.IFeatureType;
        public numberOfItems: number;
        public selectedLayerId: string;
        public layerOptions: any[];
        public metaInfos: csComp.GeoJson.IMetaInfo[];
        public headers: string[];
        public sortingColumn: number;
        public rows: TableField[][];
        private mapFeatureTitle;
        static $inject: string[];
        constructor($scope: IDataTableViewScope, $http: ng.IHttpService, $sce: ng.ISCEService, $translate: ng.translate.ITranslateService, $layerService: csComp.Services.LayerService, $localStorageService: ng.localStorage.ILocalStorageService, $messageBusService: csComp.Services.MessageBusService);
        /**
        * Add a label to local storage and bind it to the scope.
        */
        private bindToStorage(label, defaultValue);
        /**
        * Create a list of layer options and select the one used previously.
        */
        private updateLayerOptions();
        private loadLayer();
        /**
        * Load the features as visible on the map.
        */
        private loadMapLayers();
        private updateMetaInfo(data);
        public toggleSelection(metaInfoTitle: string): void;
        private findLayerById(id);
        /**
        * Returns the data rows that are relevant for the current selection.
        */
        public getRows(): TableField[][];
        /**
        * Generate a font awesome class based on the order.
        */
        public sortOrderClass(headerIndex: number, reverseOrder: boolean): string;
        /**
        * Order the rows based on the header index and the order.
        */
        public orderBy(headerIndex: number, reverseOrder: boolean): void;
        public downloadCsv(): void;
        private saveData(csvData, filename);
        /**
        * Convert to trusted html string.
        */
        public toTrusted(html: string): string;
    }
}
declare module FeatureList {
    var html: string;
}
declare module FeatureList {
    /**
    * Module
    */
    var myModule: any;
}
declare module FeatureList {
    interface IFeatureListScope extends ng.IScope {
        vm: FeatureListCtrl;
        numberOfItems: number;
    }
    class FeatureListCtrl {
        private $scope;
        private $layerService;
        private $mapService;
        private scope;
        static $inject: string[];
        constructor($scope: IFeatureListScope, $layerService: csComp.Services.LayerService, $mapService: csComp.Services.MapService);
    }
}
declare module FeatureProps {
    var html: string;
}
declare module FeatureProps {
    /**
    * Module
    */
    var myModule: any;
}
declare module FeatureProps {
    interface IFeaturePropsScope extends ng.IScope {
        vm: FeaturePropsCtrl;
        showMenu: boolean;
        poi: csComp.GeoJson.IFeature;
        callOut: CallOut;
        tabs: JQuery;
        tabScrollDelta: number;
        featureTabActivated(sectionTitle: string, section: CallOutSection): any;
        autocollapse(init: boolean): void;
    }
    interface ICallOutProperty {
        key: string;
        value: string;
        property: string;
        canFilter: boolean;
        canStyle: boolean;
        feature: csComp.GeoJson.IFeature;
        description?: string;
        meta?: csComp.GeoJson.IMetaInfo;
        isFilter: boolean;
    }
    class CallOutProperty implements ICallOutProperty {
        public key: string;
        public value: string;
        public property: string;
        public canFilter: boolean;
        public canStyle: boolean;
        public feature: csComp.GeoJson.IFeature;
        public isFilter: boolean;
        public description: string;
        public meta: csComp.GeoJson.IMetaInfo;
        constructor(key: string, value: string, property: string, canFilter: boolean, canStyle: boolean, feature: csComp.GeoJson.IFeature, isFilter: boolean, description?: string, meta?: csComp.GeoJson.IMetaInfo);
    }
    interface ICallOutSection {
        metaInfos: {
            [label: string]: csComp.GeoJson.IMetaInfo;
        };
        properties: ICallOutProperty[];
        sectionIcon: string;
        addProperty(key: string, value: string, property: string, canFilter: boolean, canStyle: boolean, feature: csComp.GeoJson.IFeature, isFilter: boolean, description?: string, meta?: csComp.GeoJson.IMetaInfo): void;
        hasProperties(): boolean;
    }
    class CallOutSection implements ICallOutSection {
        public metaInfos: {
            [label: string]: csComp.GeoJson.IMetaInfo;
        };
        public properties: ICallOutProperty[];
        public sectionIcon: string;
        constructor(sectionIcon?: string);
        public showSectionIcon(): boolean;
        public addProperty(key: string, value: string, property: string, canFilter: boolean, canStyle: boolean, feature: csComp.GeoJson.IFeature, isFilter: boolean, description?: string, meta?: csComp.GeoJson.IMetaInfo): void;
        public hasProperties(): boolean;
    }
    class CallOut {
        private type;
        private feature;
        private metaInfoData;
        public title: string;
        public sections: {
            [title: string]: ICallOutSection;
        };
        constructor(type: csComp.GeoJson.IFeatureType, feature: csComp.GeoJson.IFeature, metaInfoData: {
            [key: string]: csComp.GeoJson.IMetaInfo;
        });
        /**
        * Convert a property value to a display value using the property info.
        */
        static convertPropertyInfo(mi: csComp.GeoJson.IMetaInfo, text: string): string;
        private getOrCreateCallOutSection(sectionTitle);
        /**
        * Set the title of the callout to the title of the feature.
        */
        private setTitle();
        static title(type: csComp.GeoJson.IFeatureType, feature: csComp.GeoJson.IFeature): string;
    }
    class FeaturePropsCtrl {
        private $scope;
        private $location;
        private $sce;
        private $mapService;
        private $layerService;
        private $messageBusService;
        private scope;
        static $inject: string[];
        constructor($scope: IFeaturePropsScope, $location: ng.ILocationService, $sce: ng.ISCEService, $mapService: csComp.Services.MapService, $layerService: csComp.Services.LayerService, $messageBusService: csComp.Services.MessageBusService);
        public toTrusted(html: string): any;
        /**
        * Callback function
        * @see {http://stackoverflow.com/questions/12756423/is-there-an-alias-for-this-in-typescript}
        * @see {http://stackoverflow.com/questions/20627138/typescript-this-scoping-issue-when-called-in-jquery-callback}
        * @todo {notice the strange syntax using a fat arrow =>, which is to preserve the this reference in a callback!}
        */
        private sidebarMessageReceived;
        private featureMessageReceived;
        private displayFeature(feature);
    }
}
declare module FilterList {
    var html: string;
}
declare module FilterList {
    /**
    * Module
    */
    var myModule: any;
}
declare module FilterList {
    interface IFilterListScope extends ng.IScope {
        vm: FilterListCtrl;
    }
    class FilterListCtrl {
        private $scope;
        private $layerService;
        private scope;
        static $inject: string[];
        constructor($scope: IFilterListScope, $layerService: csComp.Services.LayerService);
    }
}
declare module LayersDirective {
    var html: string;
}
declare module LayersDirective {
    /**
    * Module
    */
    var myModule: any;
}
declare module LayersDirective {
    interface ILayersDirectiveScope extends ng.IScope {
        vm: LayersDirectiveCtrl;
    }
    class LayersDirectiveCtrl {
        private $scope;
        private $layerService;
        private scope;
        static $inject: string[];
        constructor($scope: ILayersDirectiveScope, $layerService: csComp.Services.LayerService);
        public toggleLayer(layer: csComp.Services.ProjectLayer): void;
    }
}
declare module LegendList {
    var html: string;
}
declare module LegendList {
    /**
    * Module
    */
    var myModule: any;
}
declare module LegendList {
    interface ILegendItem {
        title: string;
        uri: string;
    }
    interface ILegendListScope extends ng.IScope {
        vm: LegendListCtrl;
        numberOfItems: number;
        legendItems: ILegendItem[];
    }
    class LegendListCtrl {
        private $scope;
        private $layerService;
        private $mapService;
        private $messageBusService;
        static $inject: string[];
        constructor($scope: ILegendListScope, $layerService: csComp.Services.LayerService, $mapService: csComp.Services.MapService, $messageBusService: csComp.Services.MessageBusService);
        private updateLegendItems();
        private getImageUri(ft);
        private getName(key, ft);
    }
}
declare module Mca {
    var html: string;
}
declare module Mca {
    /**
    * Module
    */
    var myModule: any;
}
declare module Mca {
    interface IMcaScope extends ng.IScope {
        vm: McaCtrl;
    }
    class McaCtrl {
        private $scope;
        private $modal;
        private $translate;
        private $localStorageService;
        private $layerService;
        private messageBusService;
        private static mcas;
        private static confirmationMsg1;
        private static confirmationMsg2;
        public selectedFeature: csComp.GeoJson.IFeature;
        public properties: FeatureProps.CallOutProperty[];
        public showDialog: boolean;
        public showFeature: boolean;
        public showChart: boolean;
        public mca: Models.Mca;
        public selectedCriterion: Models.Criterion;
        public availableMcas: Models.Mca[];
        private groupStyle;
        static $inject: string[];
        constructor($scope: IMcaScope, $modal: any, $translate: ng.translate.ITranslateService, $localStorageService: ng.localStorage.ILocalStorageService, $layerService: csComp.Services.LayerService, messageBusService: csComp.Services.MessageBusService);
        private createDummyMca();
        public weightUpdated(criterion: Models.Criterion): void;
        /** Add or delete the received MCA model. */
        private mcaMessageReceived;
        public editMca(mca: Models.Mca): void;
        public createMca(): void;
        public removeMca(mca: Models.Mca): void;
        private getMcaIndex(mca);
        private addMca(mca);
        private deleteMca(mca);
        private addMcaToLocalStorage(mca);
        private removeMcaFromLocalStorage(mca);
        private featureMessageReceived;
        private updateSelectedFeature(feature);
        public drawChart(criterion?: Models.Criterion): void;
        private getParentOfSelectedCriterion(criterion?);
        private drawAsterPlot(criterion?);
        private drawPieChart(criterion?);
        /** Based on the currently loaded features, which MCA can we use */
        public updateAvailableMcas(): void;
        public calculateMca(): void;
        private applyPropertyInfoToCriteria(mca, featureType);
        private addPropertyInfo(featureId, mca);
        public setStyle(item: FeatureProps.CallOutProperty): void;
        private static createMetaInfo(mca);
        private static createMetaInfoRank(mca);
    }
}
declare module Mca {
    interface IMcaEditorScope extends ng.IScope {
        vm: McaEditorCtrl;
    }
    interface IExtendedPropertyInfo extends csComp.GeoJson.IMetaInfo {
        isSelected?: boolean;
        category?: string;
        scores?: string;
        scoringFunctionType?: Models.ScoringFunctionType;
    }
    class McaEditorCtrl {
        private $scope;
        private $modal;
        private $layerService;
        private messageBusService;
        public dataset: csComp.GeoJson.IGeoJsonFile;
        public metaInfos: IExtendedPropertyInfo[];
        public headers: string[];
        public selectedFeatureType: csComp.GeoJson.IFeatureType;
        public mcaTitle: string;
        public rankTitle: string;
        public hasRank: boolean;
        public scoringFunctions: Models.ScoringFunction[];
        static $inject: string[];
        constructor($scope: IMcaEditorScope, $modal: any, $layerService: csComp.Services.LayerService, messageBusService: csComp.Services.MessageBusService);
        private updateMetaInfoUponEdit(criterion, category?);
        public loadPropertyTypes(): void;
        /**
        * Load the features as visible on the map.
        */
        private loadMapLayers();
        private updateMetaInfo(featureType);
        public toggleSelection(metaInfoTitle: string): void;
        public isDisabled(): boolean;
        /**
        * Create a new MCA criterion
        */
        public save(): void;
        public cancel(): void;
    }
}
declare module Mca.Models {
    enum ScoringFunctionType {
        Manual = 0,
        Ascending = 1,
        Descending = 2,
        AscendingSigmoid = 3,
        DescendingSigmoid = 4,
        GaussianPeak = 5,
        GaussianValley = 6,
    }
    /**
    * Scoring function creates a PLA of the scoring algorithm.
    */
    class ScoringFunction {
        public type: ScoringFunctionType;
        public scores: string;
        public cssClass : string;
        constructor(scoringFunctionType?: ScoringFunctionType);
        /**
        * Create a score based on the type, in which x in [0,10] and y in [0.1].
        * Before applying it, you need to scale the x-axis based on your actual range.
        * Typically, you would map x=0 to the min(x)+0.1*range(x) and x(10)-0.1*range(x) to max(x),
        * i.e. x' = ax+b, where a=100/(8r) and b=-100(min+0.1r)/(8r) and r=max-min
        */
        static createScores(type: ScoringFunctionType): string;
    }
    class ScoringFunctions {
        static scoringFunctions: ScoringFunctions[];
    }
    class Criterion {
        public title: string;
        public description: string;
        /**
        * Top level label will be used to add a property to a feature, mca_LABELNAME, with the MCA value.
        * Lower level children will be used to obtain the property value.
        */
        public label: string;
        /** Color of the pie chart */
        public color: string;
        /** Specified weight by the user */
        public userWeight: number;
        /** Derived weight based on the fact that the sum of weights in a group of criteria needs to be 1. */
        public weight: number;
        /** Scoring function y = f(x), which translates a specified measurement x to a value y, where y in [0,1].
        * Format [x1,y1 x2,y2], and may contain special characters, such as min or max to define the minimum or maximum.
        */
        public scores: string;
        public criteria: Criterion[];
        /** Piece-wise linear approximation of the scoring function by a set of x and y points */
        public isPlaUpdated: boolean;
        /** Piece-wise linear approximation must be scaled:x' = ax+b, where a=100/(8r) and b=-100(min+0.1r)/(8r) and r=max-min */
        public isPlaScaled: boolean;
        private x;
        private y;
        public deserialize(input: Criterion): Criterion;
        private requiresMinimum();
        private requiresMaximum();
        public getTitle(): string;
        /**
        * Update the piecewise linear approximation (PLA) of the scoring (a.k.a. user) function,
        * which translates a property value to a MCA value in the range [0,1] using all features.
        */
        public updatePla(features: csComp.GeoJson.Feature[]): void;
        public getScore(feature: csComp.GeoJson.Feature): number;
    }
    class Mca extends Criterion implements csComp.Services.ISerializable<Mca> {
        /** Section of the callout */
        public section: string;
        public stringFormat: string;
        /** Optionally, export the result also as a rank */
        public rankTitle: string;
        public rankDescription: string;
        /** Optionally, stringFormat for the ranked result */
        public rankFormat: string;
        /** Maximum number of star ratings to use to set the weight */
        public userWeightMax: number;
        /** Applicable feature ids as a string[]. */
        public featureIds: string[];
        constructor();
        public deserialize(input: Mca): Mca;
        /**
        * Update the MCA by calculating the weights and setting the colors.
        */
        public update(): void;
        private calculateWeights(criteria?);
        /** Set the colors of all criteria and sub-criteria */
        private setColors();
    }
}
declare module Helpers.Resize {
    /**
    * Module
    */
    var myModule: any;
}
declare module ShowModal {
    /**
    * Module
    */
    var myModule: any;
}
declare module StyleList {
    var html: string;
}
declare module StyleList {
    /**
    * Module
    */
    var myModule: any;
}
declare module StyleList {
    interface IStyleListScope extends ng.IScope {
        vm: StyleListCtrl;
    }
    class StyleListCtrl {
        private $scope;
        private $layerService;
        private scope;
        static $inject: string[];
        constructor($scope: IStyleListScope, $layerService: csComp.Services.LayerService);
    }
}
declare module csComp.StringExt {
    interface IStringExt extends String {
        format(s: string, ...args: string[]): string;
    }
    class Utils {
        /** Convert a CamelCase string to one with underscores. */
        static toUnderscore(s: string): string;
    }
    function isNullOrEmpty(s: string): boolean;
    /**
    * String formatting
    * 'Added {0} by {1} to your collection'.f(title, artist)
    * 'Your balance is {0} USD'.f(77.7)
    */
    function format(s: string, ...args: string[]): string;
    function isNumber(n: any): boolean;
    function isBoolean(s: any): boolean;
    function isBbcode(s: any): boolean;
}
declare module csComp.Helpers {
    function supportsDataUri(): boolean;
}
declare module csComp.Services {
    interface IMessageBusCallback {
        (title: string, data?: any): any;
    }
    class MessageBusHandle {
        constructor(topic: string, callback: IMessageBusCallback);
        public topic: string;
        public callback: IMessageBusCallback;
    }
    /**
    * Simple message bus service, used for subscribing and unsubsubscribing to topics.
    * @see {@link https://gist.github.com/floatingmonkey/3384419}
    */
    class MessageBusService {
        private static cache;
        constructor();
        /**
        * Publish a notification
        * @title: the title of the notification
        * @text:  the contents of the notification
        */
        public notify(title: string, text: string): void;
        /**
        * Show a confirm dialog
        * @title           : the title of the notification
        * @text            : the contents of the notification
        * @callback        : the callback that will be called after the confirmation has been answered.
        */
        public confirm(title: string, text: string, callback: (result: boolean) => any): void;
        public notifyBottom(title: string, text: string): void;
        /**
        * Publish a notification
        * @title: the title of the notification
        * @text:  the contents of the notification
        */
        public notifyData(data: any): void;
        /**
        * Publish to a topic
        */
        public publish(topic: string, title: string, data?: any): void;
        /**
        * Subscribe to a topic
        * @param {string} topic The desired topic of the message.
        * @param {IMessageBusCallback} callback The callback to call.
        */
        public subscribe(topic: string, callback: IMessageBusCallback): MessageBusHandle;
        /**
        * Unsubscribe to a topic by providing its handle
        */
        public unsubscribe(handle: MessageBusHandle): void;
    }
    class EventObj {
        public myEvents: any;
        constructor();
        public bind(event: any, fct: any): void;
        public unbind(event: any, fct: any): void;
        public unbindEvent(event: any): void;
        public unbindAll(): void;
        public trigger(event: any, ...args: any[]): void;
        public registerEvent(evtname: string): void;
        public registerEvents(evtnames: string[]): void;
    }
}
declare module csComp.Helpers {
    class PieData {
        public id: number;
        public label: string;
        public color: string;
        public weight: number;
    }
    class AsterPieData extends PieData {
        public score: number;
    }
    class Plot {
        static pieColors: string[];
        /**
        * Draw a Pie chart.
        */
        static drawPie(pieRadius: number, data?: PieData[], parentId?: string, colorScale?: string, svgId?: string): void;
        /**
        * Draw an Aster Pie chart, i.e. a pie chart with varying radius depending on the score, where the maximum score of 100 equals the pie radius.
        * See http://bl.ocks.org/bbest/2de0e25d4840c68f2db1
        */
        static drawAsterPlot(pieRadius: number, data?: AsterPieData[], parentId?: string, colorScale?: string, svgId?: string): void;
        static clearSvg(svgId: string): void;
    }
}
declare module csComp.Services {
    enum LayerType {
        GeoJson = 0,
        Kml = 1,
    }
    interface ILayerService {
        title: string;
        accentColor: string;
        project: Project;
        solution: Solution;
        maxBounds: IBoundingBox;
        findLayer(id: string): ProjectLayer;
        selectFeature(feature: GeoJson.IFeature): any;
        openSolution(url: string, layers?: string, initialProject?: string): void;
        mb: MessageBusService;
        map: MapService;
        layerGroup: L.LayerGroup<L.ILayer>;
        featureTypes: {
            [key: string]: GeoJson.IFeatureType;
        };
        metaInfoData: {
            [key: string]: GeoJson.IMetaInfo;
        };
    }
}
declare module csComp.Services {
    class SolutionProject {
        public title: string;
        public url: string;
    }
    /**
    * Implement this interface to make your object serializable
    * @see http://stackoverflow.com/a/22886730/319711
    */
    interface ISerializable<T> {
        deserialize(input: Object): T;
    }
    interface IBaseLayer {
        id: string;
        title: string;
        isDefault: boolean;
        subtitle: string;
        preview: string;
        url: string;
        maxZoom: number;
        minZoom: number;
        subdomains: string[];
        attribution: string;
        test: string;
    }
    interface IBoundingBox {
        southWest: L.LatLng;
        northEast: L.LatLng;
    }
    /**
    * Represents to the overall projects class.
    */
    class Solution {
        public title: string;
        public maxBounds: IBoundingBox;
        public viewBounds: IBoundingBox;
        public baselayers: IBaseLayer[];
        public projects: SolutionProject[];
    }
    class Project implements ISerializable<Project> {
        public title: string;
        public description: string;
        public logo: string;
        public viewBounds: IBoundingBox;
        public startposition: Coordinates;
        public featureTypes: {
            [id: string]: GeoJson.IFeatureType;
        };
        public metaInfoData: {
            [id: string]: GeoJson.IMetaInfo;
        };
        public groups: ProjectGroup[];
        public mcas: Mca.Models.Mca[];
        public features: GeoJson.IFeature[];
        public markers: {};
        public deserialize(input: Project): Project;
    }
    class PropertyInfo {
        public max: number;
        public min: number;
        public count: number;
        public mean: number;
        public varience: number;
        public sd: number;
        public sdMax: number;
        public sdMin: number;
    }
    class ProjectLayer {
        public title: string;
        public description: string;
        public type: string;
        public url: string;
        public styleurl: string;
        public enabled: boolean;
        public opacity: number;
        public isLoading: boolean;
        public isSublayer: boolean;
        public mapLayer: L.LayerGroup<L.ILayer>;
        public group: ProjectGroup;
        /** Internal ID, e.g. for the Excel service */
        public id: string;
        /** Reference for URL params: if the URL contains layers=REFERENCE1;REFERENCE2, the two layers will be turned on.  */
        public reference: string;
    }
    class GroupFilter {
        public id: string;
        public title: string;
        public enabled: boolean;
        public filterType: string;
        public property: string;
        public criteria: string;
        public dimension: any;
        public value: any;
        public stringValue: string;
        public rangex: number[];
        public meta: GeoJson.IMetaInfo;
    }
    class GroupStyle {
        public id: string;
        public title: string;
        public enabled: boolean;
        public layers: string[];
        public visualAspect: string;
        public property: string;
        public colors: string[];
        public group: ProjectGroup;
        public availableAspects: string[];
        public canSelectColor: boolean;
        public colorScales: any;
        public info: PropertyInfo;
        public meta: GeoJson.IMetaInfo;
        constructor($translate: ng.translate.ITranslateService);
    }
    class ProjectGroup {
        public id: string;
        public title: string;
        public description: string;
        public layers: ProjectLayer[];
        public filters: GroupFilter[];
        public styles: GroupStyle[];
        public showTitle: boolean;
        public cluster: L.MarkerClusterGroup;
        public vectors: L.LayerGroup<L.ILayer>;
        /** Turn on the leaflet markercluster */
        public clustering: boolean;
        /** If set, at this zoom level and below markers will not be clustered. This defaults to disabled */
        public clusterLevel: number;
        /**  The maximum radius that a cluster will cover from the central marker (in pixels). Default 80. Decreasing will make more smaller clusters. You can also use a function that accepts the current map zoom and returns the maximum cluster radius in pixels. */
        public maxClusterRadius: number;
        public clusterFunction: Function;
        /** Creates radio buttons instead of checkboxes in the level */
        public oneLayerActive: boolean;
        public ndx: any;
        public filterResult: GeoJson.IFeature[];
        public markers: any;
        public styleProperty: string;
    }
    class LayerService implements ILayerService {
        private $location;
        private $translate;
        private $messageBusService;
        private $mapService;
        public maxBounds: IBoundingBox;
        static $inject: string[];
        public title: string;
        public accentColor: string;
        public mb: MessageBusService;
        public map: MapService;
        public featureTypes: {
            [key: string]: GeoJson.IFeatureType;
        };
        public metaInfoData: {
            [key: string]: GeoJson.IMetaInfo;
        };
        public project: Project;
        public solution: Solution;
        public layerGroup: L.LayerGroup<L.ILayer>;
        public info: L.Control;
        public dimension: any;
        public noFilters: boolean;
        public noStyles: boolean;
        public lastSelectedFeature: GeoJson.IFeature;
        public selectedLayerId: string;
        constructor($location: ng.ILocationService, $translate: ng.translate.ITranslateService, $messageBusService: MessageBusService, $mapService: MapService);
        /**
        * Add a layer
        */
        public addLayer(layer: ProjectLayer): void;
        /***
        * get list of properties that are part of the filter collection
        */
        private filterProperties(group);
        /***
        * Show tooltip with name, styles & filters
        */
        public showFeatureTooltip(e: any, group: ProjectGroup): void;
        public hideFeatureTooltip(e: any): void;
        private popup;
        public updateFeatureTooltip(e: any): void;
        public highlightFeature(e: any): void;
        public resetHighlight(e: any): void;
        public removeStyle(style: GroupStyle): void;
        public updateStyle(style: GroupStyle): void;
        public updateFeature(feature: GeoJson.IFeature, group?: ProjectGroup): void;
        private updateGroupFeatures(group);
        private getDefaultMarkerStyle(feature);
        private updatePolygonStyle(m, feature);
        private getColor(v, gs);
        public style(feature: GeoJson.IFeature, layer: ProjectLayer): {
            fillColor: string;
            weight: number;
            opacity: number;
            color: string;
            fillOpacity: number;
        };
        /**
        * init feature (add to feature list, crossfilter)
        */
        private initFeature(feature, layer);
        public removeFeature(feature: GeoJson.IFeature, layer: ProjectLayer): void;
        /**
        * create icon based of feature style
        */
        public getPointIcon(feature: GeoJson.IFeature, layer: ProjectLayer): any;
        /**
        * Update icon for features
        */
        public updateFeatureIcon(feature: GeoJson.IFeature, layer: ProjectLayer): any;
        /**
        * add a feature
        */
        public addFeature(feature: GeoJson.IFeature, latlng: any, layer: ProjectLayer): any;
        public selectFeature(feature: GeoJson.IFeature): void;
        /**
        * find a filter for a specific group/property combination
        */
        private findFilter(group, property);
        /**
        * find a layer with a specific id
        */
        public findLayer(id: string): ProjectLayer;
        public setStyle(property: any, openStyleTab?: boolean): GroupStyle;
        private saveStyle(group, style);
        public addFilter(group: ProjectGroup, prop: string): void;
        /**
        * enable a filter for a specific property
        */
        public setFilter(property: FeatureProps.CallOutProperty): void;
        /**
        * Return the feature style for a specific feature.
        * First, look for a layer specific feature type, otherwise, look for a project-specific feature type.
        * In case both fail, create a default feature type at the layer level.
        */
        public getFeatureType(feature: GeoJson.IFeature): GeoJson.IFeatureType;
        /**
        * In case we are dealing with a regular JSON file without type information, create a default type.
        */
        private createDefaultType(feature);
        public resetFilters(): void;
        private getGroupFeatures(g);
        public rebuildFilters(g: ProjectGroup): void;
        /**
        * deactivate layer
        */
        public removeLayer(layer: ProjectLayer): void;
        public S4(): string;
        public getGuid(): string;
        /***
        * Open solution file with references to available baselayers and projects
        * @params url: URL of the solution
        * @params layers: Optionally provide a semi-colon separated list of layer IDs that should be opened.
        * @params initialProject: Optionally provide a project name that should be loaded, if omitted the first project in the definition will be loaded
        */
        public openSolution(url: string, layers?: string, initialProject?: string): void;
        /**
        * Open project
        * @params url: URL of the project
        * @params layers: Optionally provide a semi-colon separated list of layer IDs that should be opened.
        */
        public openProject(url: string, layers?: string): void;
        private zoom(data);
        /**
        * Calculate min/max/count for a specific property in a group
        */
        private calculatePropertyInfo(group, property);
        private updateFilters();
        private updateTextFilter(group, dcDim, value);
        private updateFilterGroupCount(group);
        /***
        * Add text filter to list of filters
        */
        private addTextFilter(group, filter);
        private updateChartRange(chart, filter);
        /***
        * Add bar chart filter for filter number values
        */
        private addBarFilter(group, filter);
        /***
        * Update map markers in cluster after changing filter
        */
        private updateMapFilter(group);
        private resetMapFilter(group);
    }
}
declare module csComp.Services {
    interface IMapLayersScope extends ng.IScope {
        map: L.Map;
        vm: MapCtrl;
    }
    class MapCtrl {
        private $scope;
        private $location;
        private $mapService;
        static $inject: string[];
        constructor($scope: IMapLayersScope, $location: ng.ILocationService, $mapService: MapService);
    }
}
declare module csComp.Services {
    class MapService {
        private $messageBusService;
        static $inject: string[];
        public map: L.Map;
        public baseLayers: any;
        private activeBaseLayer;
        constructor($messageBusService: MessageBusService);
        public initMap(): void;
        public changeBaseLayer(layerObj: L.ILayer): void;
        public invalidate(): void;
        /**
        * Zoom to a location on the map.
        */
        public zoomToLocation(center: L.LatLng, zoomFactor?: number): void;
        /**
        * Zoom to a feature on the map.
        */
        public zoomTo(feature: GeoJson.IFeature): void;
        /**
        * Compute the bounding box.
        * Returns [min_x, max_x, min_y, max_y]
        */
        private getBoundingBox(arr);
        public getMap(): L.Map;
    }
}
declare module csComp.Search {
    interface ISearchFormScope extends ng.IScope {
        vm: SearchFormCtrl;
        location: L.LatLng;
    }
    class SearchFormCtrl {
        private $scope;
        private $mapService;
        static $inject: string[];
        constructor($scope: ISearchFormScope, $mapService: Services.MapService);
        public doSearch(): void;
    }
}
