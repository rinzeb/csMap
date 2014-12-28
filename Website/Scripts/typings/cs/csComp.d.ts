/// <reference path="../crossfilter/crossfilter.d.ts" />
/// <reference path="../leaflet/leaflet.d.ts" />
declare module csComp.Services {
    class Widget {
        public content: Function;
        constructor();
    }
    interface IWidget {
        widgetType: string;
        title: string;
        elementId: string;
        dashboard: Dashboard;
        renderer: Function;
        resize: Function;
        background: string;
        init: Function;
        col: number;
        row: number;
        sizeY: number;
        sizeX: number;
        name: string;
        id: string;
        properties: {};
        dataSets: DataSet[];
        range: DateRange;
        updateDateRange: Function;
    }
    class BaseWidget implements IWidget {
        public widgetType: string;
        public title: string;
        public elementId: string;
        public dashboard: Dashboard;
        public col: number;
        public row: number;
        public background: string;
        public sizeY: number;
        public sizeX: number;
        public name: string;
        public id: string;
        public properties: {};
        public dataSets: DataSet[];
        public range: DateRange;
        constructor(title?: string, type?: string);
        public init(sX: number, sY: number, c: number, r: number, id?: string): void;
        public renderer: ($scope: any) => void;
        public updateDateRange(r: DateRange): void;
        public resize: (status: string) => void;
    }
    class Dashboard {
        public id: string;
        public name: string;
        public widgets: IWidget[];
        public editMode: boolean;
        public showMap: boolean;
        public background: string;
        constructor(id: string, name: string);
    }
    class DataSet {
        public id: string;
        public title: string;
        public color: string;
        public data: {
            [key: number]: number;
        };
        constructor(id?: string, title?: string);
    }
}
declare module csComp.Services {
    interface IEvent {
        id: string;
        title: string;
        color: string;
        start: number;
    }
    class Event implements IEvent {
        public id: string;
        public title: string;
        public color: string;
        public start: number;
        public startDate: () => Date;
    }
    interface IFeature {
        id?: string;
        layerId: string;
        type?: string;
        geometry: IGeoJsonGeometry;
        properties?: IStringToAny;
        isSelected?: boolean;
        htmlStyle?: string;
        featureTypeName?: string;
        fType?: IFeatureType;
        isInitialized?: boolean;
        sensors?: {
            [id: string]: any[];
        };
    }
    /**
    * A feature is a single object that is show on a map (e.g. point, polyline, etc)
    * Features are part of a layer and filtered and styled using group filters and styles
    *
    */
    class Feature implements IFeature {
        public id: string;
        public layerId: string;
        public type: string;
        public geometry: IGeoJsonGeometry;
        public properties: IStringToAny;
        public isSelected: boolean;
        public htmlStyle: string;
        public featureTypeName: string;
        public fType: IFeatureType;
        public isInitialized: boolean;
        public sensors: {
            [id: string]: any[];
        };
    }
    interface IStringToAny {
        [key: string]: any;
    }
    interface IGeoJsonGeometry {
        type: string;
        coordinates: any;
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
    interface IPropertyType {
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
    interface IPropertyTypeData {
        [key: string]: IPropertyType;
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
        analysispropertyType?: any;
    }
    interface IFeatureType {
        name?: string;
        style?: IFeatureTypeStyle;
        propertyTypeData?: IPropertyType[];
        /**
        * Optional list of propertyType keys, separated by semi-colons.
        * The keys can be resolved in the project's propertyTypeData dictionary, or in the local propertyTypeData.
        */
        propertyTypeKeys?: string;
    }
    interface IGeoJsonFile {
        featureTypes?: {
            [key: string]: IFeatureType;
        };
        type: string;
        features: IFeature[];
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
}
declare module csComp.Services {
    enum LayerType {
        GeoJson = 0,
        Kml = 1,
    }
    /** a project group contains a list of layers that can be grouped together.
    * Filters, styles can clustering is always defined on the group level.
    * If a filter is selected (e.g. show only the features within a certain property range)
    * this filter is applied to all layers within this group.
    * If clustering is enabled all features in all layers are grouped together
    */
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
        public filterResult: IFeature[];
        public markers: any;
        public styleProperty: string;
    }
    /**
    * Filters are used to select a subset of features within a group.
    */
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
        public meta: IPropertyType;
    }
    /**
    * Styles can determine how features are shown on the map
    */
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
        public meta: IPropertyType;
        constructor($translate: ng.translate.ITranslateService);
    }
}
declare module csComp.Services {
    /**
    * Implement this interface to make your object serializable
    * @see http://stackoverflow.com/a/22886730/319711
    */
    interface ISerializable<T> {
        deserialize(input: Object): T;
    }
    class DateRange {
        public start: number;
        public end: number;
        public focus: number;
        public setFocus(d: Date, s?: Date, e?: Date): void;
        constructor();
        public startDate: () => Date;
        public focusDate: () => Date;
        public endDate: () => Date;
    }
    /**
    * Represents to the overall solution class. A solution can contain multiple project.
    * This can be usefull when you want to have the same website, but with different content.
    * e.g. you could make it so that you can switch between different regions
    */
    class Solution {
        public title: string;
        public maxBounds: IBoundingBox;
        public viewBounds: IBoundingBox;
        public baselayers: IBaseLayer[];
        public projects: SolutionProject[];
    }
    /** project within a solution file, refers to a project url*/
    class SolutionProject {
        public title: string;
        public url: string;
    }
    interface IPrivileges {
        mca: {
            expertMode: boolean;
        };
    }
    /** project configuration. */
    class Project implements ISerializable<Project> {
        public title: string;
        public description: string;
        public logo: string;
        public url: string;
        public baselayers: IBaseLayer[];
        public featureTypes: {
            [id: string]: IFeatureType;
        };
        public propertyTypeData: {
            [id: string]: IPropertyType;
        };
        public groups: ProjectGroup[];
        public startposition: Coordinates;
        public features: IFeature[];
        public timeLine: DateRange;
        public mcas: Mca.Models.Mca[];
        public dashboards: {
            [id: string]: Dashboard;
        };
        public dataSets: DataSet[];
        public viewBounds: IBoundingBox;
        public userPrivileges: IPrivileges;
        public markers: {};
        public deserialize(input: Project): Project;
    }
    /** bouding box to specify a region. */
    interface IBoundingBox {
        southWest: L.LatLng;
        northEast: L.LatLng;
    }
    /** layer information. a layer is described in a project file and is always part of a group */
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
        public timestamps: any[];
        /** Internal ID, e.g. for the Excel service */
        public id: string;
        /** Reference for URL params: if the URL contains layers=REFERENCE1;REFERENCE2, the two layers will be turned on.  */
        public reference: string;
        public events: Event[];
    }
    /**
    * Baselayers are background maps (e.g. openstreetmap, nokia here, etc).
    * They are described in the project file
    */
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
    * The value is the actual displayValue shown, the type is the propertyType type (e.g. number or text, useful when aligning the data), and the header is used for sorting.
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
        public dataset: csComp.Services.IGeoJsonFile;
        public selectedType: csComp.Services.IFeatureType;
        public numberOfItems: number;
        public selectedLayerId: string;
        public layerOptions: any[];
        public propertyTypes: csComp.Services.IPropertyType[];
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
        private updatepropertyType(data);
        public toggleSelection(propertyTypeTitle: string): void;
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
        public toTrusted(html: string): any;
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
        poi: csComp.Services.IFeature;
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
        feature: csComp.Services.IFeature;
        description?: string;
        meta?: csComp.Services.IPropertyType;
        isFilter: boolean;
    }
    class CallOutProperty implements ICallOutProperty {
        public key: string;
        public value: string;
        public property: string;
        public canFilter: boolean;
        public canStyle: boolean;
        public feature: csComp.Services.IFeature;
        public isFilter: boolean;
        public description: string;
        public meta: csComp.Services.IPropertyType;
        constructor(key: string, value: string, property: string, canFilter: boolean, canStyle: boolean, feature: csComp.Services.IFeature, isFilter: boolean, description?: string, meta?: csComp.Services.IPropertyType);
    }
    interface ICallOutSection {
        propertyTypes: {
            [label: string]: csComp.Services.IPropertyType;
        };
        properties: ICallOutProperty[];
        sectionIcon: string;
        addProperty(key: string, value: string, property: string, canFilter: boolean, canStyle: boolean, feature: csComp.Services.IFeature, isFilter: boolean, description?: string, meta?: csComp.Services.IPropertyType): void;
        hasProperties(): boolean;
    }
    class CallOutSection implements ICallOutSection {
        public propertyTypes: {
            [label: string]: csComp.Services.IPropertyType;
        };
        public properties: ICallOutProperty[];
        public sectionIcon: string;
        constructor(sectionIcon?: string);
        public showSectionIcon(): boolean;
        public addProperty(key: string, value: string, property: string, canFilter: boolean, canStyle: boolean, feature: csComp.Services.IFeature, isFilter: boolean, description?: string, meta?: csComp.Services.IPropertyType): void;
        public hasProperties(): boolean;
    }
    class CallOut {
        private type;
        private feature;
        private propertyTypeData;
        public title: string;
        public icon: string;
        public sections: {
            [title: string]: ICallOutSection;
        };
        constructor(type: csComp.Services.IFeatureType, feature: csComp.Services.IFeature, propertyTypeData: csComp.Services.IPropertyTypeData);
        public sectionCount(): number;
        public firstSection(): ICallOutSection;
        public lastSection(): ICallOutSection;
        private getOrCreateCallOutSection(sectionTitle);
        /**
        * Set the title of the callout to the title of the feature.
        */
        private setTitle();
        private setIcon();
        static title(type: csComp.Services.IFeatureType, feature: csComp.Services.IFeature): string;
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
        public toTrusted(html: string): string;
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
    var myModule: ng.IModule;
}
declare module Mca {
    interface IMcaScope extends ng.IScope {
        vm: McaCtrl;
        ratingStates: any;
    }
    class McaCtrl {
        private $scope;
        private $modal;
        private $translate;
        private $timeout;
        private $localStorageService;
        private $layerService;
        private messageBusService;
        private static mcaChartId;
        private static mcas;
        private static confirmationMsg1;
        private static confirmationMsg2;
        public features: csComp.Services.IFeature[];
        public selectedFeature: csComp.Services.IFeature;
        public properties: FeatureProps.CallOutProperty[];
        public showFeature: boolean;
        public showChart: boolean;
        public featureIcon: string;
        public mca: Models.Mca;
        public selectedCriterion: Models.Criterion;
        public availableMcas: Models.Mca[];
        public showAsterChart: boolean;
        public showDialog: boolean;
        public expertMode: boolean;
        public showSparkline: boolean;
        private groupStyle;
        static $inject: string[];
        constructor($scope: IMcaScope, $modal: any, $translate: ng.translate.ITranslateService, $timeout: ng.ITimeoutService, $localStorageService: ng.localStorage.ILocalStorageService, $layerService: csComp.Services.LayerService, messageBusService: csComp.Services.MessageBusService);
        private getVotingClass(criterion);
        private createDummyMca();
        public toggleMcaChartType(): void;
        public toggleSparkline(): void;
        public weightUpdated(criterion: Models.Criterion): void;
        public updateMca(criterion?: Models.Criterion): void;
        public editMca(mca: Models.Mca): void;
        public createMca(): void;
        private showMcaEditor(newMca);
        public removeMca(mca: Models.Mca): void;
        private getMcaIndex(mca);
        private addMca(mca);
        private deleteMca(mca);
        private addMcaToLocalStorage(mca);
        private removeMcaFromLocalStorage(mca);
        private featureMessageReceived;
        private scopeApply();
        private updateSelectedFeature(feature, drawCharts?);
        public drawChart(criterion?: Models.Criterion): void;
        private getParentOfSelectedCriterion(criterion?);
        private drawHistogram(criterion?);
        private drawAsterPlot(criterion?);
        private drawPieChart(criterion?);
        /** Based on the currently loaded features, which MCA can we use */
        public updateAvailableMcas(mca?: Models.Mca): void;
        public calculateMca(): void;
        private applyPropertyInfoToCriteria(mca, featureType);
        private addPropertyInfo(featureId, mca);
        public setStyle(item: FeatureProps.CallOutProperty): void;
        private static createPropertyType(mca);
        private static createRankPropertyType(mca);
    }
}
declare module Mca {
    interface IMcaEditorScope extends ng.IScope {
        vm: McaEditorCtrl;
    }
    interface IExtendedPropertyInfo extends csComp.Services.IPropertyType {
        isSelected?: boolean;
        category?: string;
        scores?: string;
        scoringFunctionType?: Models.ScoringFunctionType;
        /** The data is considered invalid when below this value */
        minCutoffValue?: number;
        /** The data is considered invalid when above this value */
        maxCutoffValue?: number;
        userWeight?: number;
    }
    class McaEditorCtrl {
        private $scope;
        private $modalInstance;
        private $layerService;
        private $translate;
        private messageBusService;
        private mca;
        public dataset: csComp.Services.IGeoJsonFile;
        public propInfos: IExtendedPropertyInfo[];
        public headers: string[];
        public selectedFeatureType: csComp.Services.IFeatureType;
        public mcaTitle: string;
        public rankTitle: string;
        public scoringFunctions: Models.ScoringFunction[];
        public showItem: number;
        public scaleMax: number;
        public scaleMin: number;
        static $inject: string[];
        constructor($scope: IMcaEditorScope, $modalInstance: any, $layerService: csComp.Services.LayerService, $translate: ng.translate.ITranslateService, messageBusService: csComp.Services.MessageBusService, mca?: Models.Mca);
        private updatePropertyInfoUponEdit(criterion, category?);
        public loadPropertyTypes(): void;
        /**
        * Load the features as visible on the map.
        */
        private loadMapLayers();
        private selectFirstFeatureType();
        private updatePropertyInfo(featureType);
        public toggleSelection(metaInfoTitle: string): void;
        public isDisabled(): boolean;
        /**
        * Create a new MCA criterion
        */
        public save(): void;
        public cancel(): void;
        public toggleItemDetails(index: number): void;
    }
}
declare module McaEditorView {
    var html: string;
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
        public title: string;
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
        public propValues: number[];
        public criteria: Criterion[];
        /** Piece-wise linear approximation of the scoring function by a set of x and y points */
        public isPlaUpdated: boolean;
        /** Piece-wise linear approximation must be scaled:x' = ax+b, where a=100/(8r) and b=-100(min+0.1r)/(8r) and r=max-min */
        public isPlaScaled: boolean;
        public minValue: number;
        public maxValue: number;
        public minCutoffValue: number;
        public maxCutoffValue: number;
        public x: number[];
        public y: number[];
        public deserialize(input: Criterion): Criterion;
        private requiresMinimum();
        private requiresMaximum();
        public getTitle(): string;
        /**
        * Update the piecewise linear approximation (PLA) of the scoring (a.k.a. user) function,
        * which translates a property value to a MCA value in the range [0,1] using all features.
        */
        public updatePla(features: csComp.Services.IFeature[]): void;
        public getScore(feature: csComp.Services.IFeature): number;
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
        public scaleMaxValue: number;
        public scaleMinValue: number;
        public rankLabel : string;
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
declare module Timeline {
    var html: string;
}
declare module Timeline {
    /**
    * Module
    */
    var myModule: any;
}
declare module Timeline {
    interface ITimelineScope extends ng.IScope {
        vm: TimelineCtrl;
        numberOfItems: number;
        timeline: any;
    }
    class TimelineCtrl {
        private $scope;
        private $layerService;
        private $mapService;
        private $messageBusService;
        private scope;
        static $inject: string[];
        public focusDate: Date;
        public startDate: Date;
        public endDate: Date;
        constructor($scope: ITimelineScope, $layerService: csComp.Services.LayerService, $mapService: csComp.Services.MapService, $messageBusService: csComp.Services.MessageBusService);
        public onRangeChanged(properties: any): void;
        public updateFocusTime(): void;
    }
}
declare module Voting {
    /**
    * Module
    */
    var myModule: any;
}
declare module csComp.Helpers {
    function supportsDataUri(): boolean;
    function standardDeviation(values: number[]): {
        avg: number;
        stdDev: number;
    };
    function average(data: number[]): number;
    /**
    * Collect all the property types that are referenced by a feature type.
    */
    function getPropertyTypes(type: Services.IFeatureType, propertyTypeData: Services.IPropertyTypeData): Services.IPropertyType[];
    /**
    * Convert a property value to a display value using the property info.
    */
    function convertPropertyInfo(pt: Services.IPropertyType, text: string): string;
    function getGuid(): string;
    function S4(): string;
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
    interface IHistogramOptions {
        id?: string;
        numberOfBins?: number;
        width?: number;
        height?: number;
        xLabel?: string;
        selectedValue?: number;
    }
    interface IMcaPlotOptions extends IHistogramOptions {
        /** Scoring function x,y points */
        xy?: {
            x: number[];
            y: number[];
        };
        /** Value of the feature, i.e. the point that we wish to highlight */
        featureValue?: number;
    }
    class Plot {
        /**
        * Draw a histogram, and, if xy is specified, a line plot of x versus y (e.g. a scoring function).
        */
        static drawHistogram(values: number[], options?: IHistogramOptions): void;
        static getScale(stepSize: number, max: number): number;
        static drawMcaPlot(values: number[], options?: IMcaPlotOptions): void;
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
        private static clearSvg(svgId);
    }
}
declare module csComp.StringExt {
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
declare module csComp.Services {
    interface ILayerService {
        title: string;
        accentColor: string;
        project: Project;
        maxBounds: IBoundingBox;
        findLayer(id: string): ProjectLayer;
        selectFeature(feature: IFeature): any;
        mb: MessageBusService;
        map: MapService;
        layerGroup: L.LayerGroup<L.ILayer>;
        featureTypes: {
            [key: string]: IFeatureType;
        };
        propertyTypeData: {
            [key: string]: IPropertyType;
        };
        timeline: any;
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
            [key: string]: IFeatureType;
        };
        public propertyTypeData: {
            [key: string]: IPropertyType;
        };
        public project: Project;
        public solution: Solution;
        public layerGroup: L.LayerGroup<L.ILayer>;
        public dimension: any;
        public info: L.Control;
        public noFilters: boolean;
        public noStyles: boolean;
        public lastSelectedFeature: IFeature;
        public selectedLayerId: string;
        public timeline: any;
        constructor($location: ng.ILocationService, $translate: ng.translate.ITranslateService, $messageBusService: MessageBusService, $mapService: MapService);
        public updateSensorData(): void;
        /**
        * Add a layer
        */
        public addLayer(layer: ProjectLayer): void;
        private convertTopoToGeoJson(data);
        /***
        * get list of properties that are part of the filter collection
        */
        private filterProperties(group);
        /***
        * Show tooltip with name, styles & filters.
        */
        public showFeatureTooltip(e: any, group: ProjectGroup): void;
        public hideFeatureTooltip(e: any): void;
        private popup;
        public updateFeatureTooltip(e: any): void;
        public highlightFeature(e: any): void;
        public resetHighlight(e: any): void;
        public removeStyle(style: GroupStyle): void;
        public updateStyle(style: GroupStyle): void;
        public updateFeature(feature: IFeature, group?: ProjectGroup): void;
        private updateGroupFeatures(group);
        private getDefaultMarkerStyle(feature);
        private updatePolygonStyle(m, feature);
        private getColor(v, gs);
        public style(feature: IFeature, layer: ProjectLayer): {
            fillColor: string;
            weight: number;
            opacity: number;
            color: string;
            fillOpacity: number;
        };
        /**
        * init feature (add to feature list, crossfilter)
        */
        public initFeature(feature: IFeature, layer: ProjectLayer): IFeatureType;
        public removeFeature(feature: IFeature, layer: ProjectLayer): void;
        /**
        * create icon based of feature style
        */
        public getPointIcon(feature: IFeature, layer: ProjectLayer): any;
        /**
        * Update icon for features
        */
        public updateFeatureIcon(feature: IFeature, layer: ProjectLayer): any;
        /**
        * add a feature
        */
        public addFeature(feature: IFeature, latlng: any, layer: ProjectLayer): any;
        public selectFeature(feature: IFeature): void;
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
        public getFeatureType(feature: IFeature): IFeatureType;
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
        public closeProject(): void;
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
        public zoomTo(feature: IFeature): void;
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
declare module csComp.Services {
    class TimeService {
        private $messageBusService;
        static $inject: string[];
        public map: L.Map;
        public baseLayers: any;
        private activeBaseLayer;
        constructor($messageBusService: MessageBusService);
    }
}
declare module Translations {
    class English {
        static locale: ng.translate.ITranslationTable;
    }
}
declare module Translations {
    class Dutch {
        static locale: ng.translate.ITranslationTable;
    }
}
