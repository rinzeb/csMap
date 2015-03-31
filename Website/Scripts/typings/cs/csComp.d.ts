/// <reference path="../crossfilter/crossfilter.d.ts" />
/// <reference path="../leaflet/leaflet.d.ts" />
declare module csComp.Services {
    class Widget {
        content: Function;
        constructor();
    }
    interface IWidget {
        directive: string;
        data: Object;
        url: string;
        template: string;
        title: string;
        elementId: string;
        dashboard: csComp.Services.Dashboard;
        renderer: Function;
        resize: Function;
        background: string;
        init: Function;
        start: Function;
        col: number;
        row: number;
        sizeY: number;
        sizeX: number;
        name: string;
        id: string;
        properties: {};
        dataSets: DataSet[];
        range: csComp.Services.DateRange;
        updateDateRange: Function;
        collapse: boolean;
        canCollapse: boolean;
        width: number;
        height: number;
        allowFullscreen: boolean;
        messageBusService: csComp.Services.MessageBusService;
        layerService: csComp.Services.LayerService;
    }
    class BaseWidget implements IWidget {
        directive: string;
        template: string;
        title: string;
        data: {};
        url: string;
        elementId: string;
        dashboard: csComp.Services.Dashboard;
        col: number;
        row: number;
        background: string;
        sizeY: number;
        sizeX: number;
        name: string;
        id: string;
        properties: {};
        dataSets: DataSet[];
        range: csComp.Services.DateRange;
        collapse: boolean;
        canCollapse: boolean;
        width: number;
        height: number;
        allowFullscreen: boolean;
        messageBusService: csComp.Services.MessageBusService;
        layerService: csComp.Services.LayerService;
        constructor(title?: string, type?: string);
        start(): void;
        init(): void;
        renderer: ($compile: any, $scope: any) => void;
        updateDateRange(r: csComp.Services.DateRange): void;
        resize: (status: string, width: number, height: number) => void;
    }
    class Dashboard {
        widgets: IWidget[];
        editMode: boolean;
        showMap: boolean;
        showTimeline: boolean;
        showLeftmenu: boolean;
        showRightmenu: boolean;
        draggable: boolean;
        resizable: boolean;
        background: string;
        backgroundimage: string;
        visiblelayers: string[];
        viewBounds: IBoundingBox;
        timeline: DateRange;
        id: string;
        name: string;
        constructor();
        static deserialize(input: Dashboard): Dashboard;
        static addNewWidget(widget: IWidget, dashboard: Dashboard): IWidget;
    }
    class Timeline {
        id: string;
        timestamps: number[];
    }
    class TimedDataSet {
        timeline: Timeline;
        timedata: number[];
    }
    class DataSet {
        id: string;
        title: string;
        color: string;
        data: {
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
        id: string;
        title: string;
        color: string;
        start: number;
        startDate: () => Date;
    }
    interface IFeature {
        id: string;
        index: number;
        layerId: string;
        type?: string;
        geometry: IGeoJsonGeometry;
        properties?: IStringToAny;
        isSelected?: boolean;
        htmlStyle?: string;
        featureTypeName?: string;
        fType?: IFeatureType;
        isInitialized?: boolean;
        /**
        * An optional dictionary of sensors, where each sensor or measurement represents the value of the sensor
        * at a certain point in time. Is often used with the layer's timestamp property in case all sensors have the same
        * number of measurements.
        */
        sensors?: {
            [id: string]: any[];
        };
        timestamps: number[];
        coordinates?: IGeoJsonGeometry[];
        /**
        * An optional language dictionary, where each key, e.g. 'en' for English, represents a localised data set. Each locale can overwrite
        * the value of the title, description etc. of a feature.
        */
        languages?: {
            [key: string]: ILocalisedData;
        };
    }
    /**
     * A feature is a single object that is show on a map (e.g. point, polyline, etc)
     * Features are part of a layer and filtered and styled using group filters and styles
     *
     */
    class Feature implements IFeature {
        id: string;
        index: number;
        layerId: string;
        type: string;
        geometry: IGeoJsonGeometry;
        properties: IStringToAny;
        isSelected: boolean;
        htmlStyle: string;
        featureTypeName: string;
        fType: IFeatureType;
        isInitialized: boolean;
        sensors: {
            [id: string]: any[];
        };
        timestamps: number[];
        coordinates: IGeoJsonGeometry[];
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
    /**
     * Localisation information, contains translations for one language.
     */
    interface ILocalisedData {
        name?: string;
        title?: string;
        description?: string;
        section?: string;
        options?: string[];
    }
    /**
     * Localisation data, needed to support multiple languages.
     */
    interface ILanguageData {
        [key: string]: ILocalisedData;
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
        subject?: string;
        target?: string;
        options?: string[];
        languages?: ILanguageData;
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
        languages?: ILanguageData;
    }
    interface IGeoJsonFile {
        featureTypes?: {
            [key: string]: IFeatureType;
        };
        type: string;
        features: Array<IFeature>;
    }
    class PropertyInfo {
        max: number;
        min: number;
        count: number;
        mean: number;
        varience: number;
        sd: number;
        sdMax: number;
        sdMin: number;
    }
}
declare module csComp.Services {
    enum LayerType {
        GeoJson = 0,
        Kml = 1,
    }
    /**
     * A project group contains a list of layers that can be grouped together.
     * Filters, styles and clustering is always defined on the group level.
     * If a filter is selected (e.g. show only the features within a certain property range)
     * this filter is applied to all layers within this group.
     * If clustering is enabled all features in all layers are grouped together.
     */
    class ProjectGroup {
        id: string;
        title: string;
        description: string;
        layers: Array<ProjectLayer>;
        filters: Array<GroupFilter>;
        styles: Array<GroupStyle>;
        showTitle: boolean;
        cluster: L.MarkerClusterGroup;
        vectors: L.LayerGroup<L.ILayer>;
        /** Turn on the leaflet markercluster */
        clustering: boolean;
        /** If set, at this zoom level and below markers will not be clustered. This defaults to disabled */
        clusterLevel: number;
        /**  The maximum radius that a cluster will cover from the central marker (in pixels). Default 80. Decreasing will make more smaller clusters. You can also use a function that accepts the current map zoom and returns the maximum cluster radius in pixels. */
        maxClusterRadius: number;
        clusterFunction: Function;
        /** Creates radio buttons instead of checkboxes in the level */
        oneLayerActive: boolean;
        ndx: any;
        filterResult: IFeature[];
        markers: any;
        styleProperty: string;
        languages: ILanguageData;
    }
    /**
     * Filters are used to select a subset of features within a group.
     */
    class GroupFilter {
        id: string;
        title: string;
        enabled: boolean;
        filterType: string;
        property: string;
        property2: string;
        criteria: string;
        dimension: any;
        value: any;
        stringValue: string;
        rangex: number[];
        meta: IPropertyType;
    }
    /**
     * Styles can determine how features are shown on the map
     */
    class GroupStyle {
        id: string;
        title: string;
        enabled: boolean;
        layers: string[];
        visualAspect: string;
        property: string;
        colors: string[];
        group: ProjectGroup;
        availableAspects: string[];
        canSelectColor: boolean;
        colorScales: any;
        info: PropertyInfo;
        meta: IPropertyType;
        constructor($translate: ng.translate.ITranslateService);
    }
}
declare module csComp.Services {
    /**
    * Expert level for determining what options to show to the user.
    */
    enum Expertise {
        Beginner = 1,
        Intermediate = 2,
        Expert = 3,
    }
    /**
    * Implement this interface to make your object serializable
    * @see http://stackoverflow.com/a/22886730/319711
    */
    interface ISerializable<T> {
        deserialize(input: Object): T;
    }
    class DateRange {
        start: number;
        end: number;
        focus: number;
        range: number;
        zoomLevel: number;
        zoomLevelName: string;
        isLive: boolean;
        static deserialize(input: DateRange): DateRange;
        /**
        * Set the focus time of the timeline, optionally including start and end time.
        */
        setFocus(d: Date, s?: Date, e?: Date): void;
        startDate: () => Date;
        focusDate: () => Date;
        endDate: () => Date;
    }
    /**
     * Represents to the overall solution class. A solution can contain multiple project.
     * This can be usefull when you want to have the same website, but with different content.
     * e.g. you could make it so that you can switch between different regions or different domains of interest.
     */
    class Solution {
        title: string;
        maxBounds: IBoundingBox;
        viewBounds: IBoundingBox;
        baselayers: IBaseLayer[];
        projects: SolutionProject[];
    }
    /** Project within a solution file, refers to a project url*/
    class SolutionProject {
        title: string;
        url: string;
    }
    /**
    * Simple class to hold the user privileges.
    */
    interface IPrivileges {
        mca: {
            expertMode: boolean;
        };
    }
    /** bouding box to specify a region. */
    interface IBoundingBox {
        southWest: L.LatLng;
        northEast: L.LatLng;
    }
    interface ITimelineOptions {
        width?: string;
        height?: string;
        eventMargin?: number;
        eventMarginAxis?: number;
        editable?: boolean;
        layout?: string;
        /** NOTE: For internal use only. Do not set it, as it will be overwritten by the $layerService.currentLocale. */
        locale?: string;
        timeLine?: DateRange;
    }
    /** project configuration. */
    class Project implements ISerializable<Project> {
        title: string;
        description: string;
        logo: string;
        url: string;
        activeDashboard: Dashboard;
        baselayers: IBaseLayer[];
        featureTypes: {
            [id: string]: IFeatureType;
        };
        propertyTypeData: {
            [id: string]: IPropertyType;
        };
        groups: Array<ProjectGroup>;
        startposition: Coordinates;
        features: IFeature[];
        timeLine: DateRange;
        mcas: Mca.Models.Mca[];
        dashboards: Dashboard[];
        dataSets: DataSet[];
        viewBounds: IBoundingBox;
        userPrivileges: IPrivileges;
        languages: ILanguageData;
        expertMode: Expertise;
        markers: {};
        deserialize(input: Project): Project;
    }
    /** layer information. a layer is described in a project file and is always part of a group */
    class ProjectLayer {
        /** Title as displayed in the menu */
        title: string;
        /** Description as displayed in the menu */
        description: string;
        /** Type of layer, e.g. GeoJSON, TopoJSON, or WMS */
        type: string;
        /** Data source */
        url: string;
        /** In case we keep the style information in a separate file */
        styleurl: string;
        /** WMS sublayers that must be loaded */
        wmsLayers: string;
        /** If enabled, load the layer */
        enabled: boolean;
        /** Layer opacity */
        opacity: number;
        /** When loading the data, the isLoading variable is true (e.g. used for the spinner control) */
        isLoading: boolean;
        /** Indent the layer, so it seems to be a sublayer. */
        isSublayer: boolean;
        mapLayer: L.LayerGroup<L.ILayer>;
        /** Group of layers */
        group: ProjectGroup;
        /**
        * A list of UNIX timestamp, or the UTC time in milliseconds since 1/1/1970, which define the time a sensor value
        * was taken. So in case we have 10 timestamps, each feature's sensor (key) in the feature's sensors dictionary should
        * also have a lnegth of 10.
        * Note that this value is optional, and can be omitted if the sensor already contains a timestamp too. This is mainly intended
        * when all 'sensor measurements' are taken on the same moment. For example, the CENSUS date.
        * In Excel, you can use the formula =24*(A4-$B$1)*3600*1000 to convert a date to a UNIX time stamp.
        */
        timestamps: number[];
        /** Internal ID, e.g. for the Excel service */
        id: string;
        /** Reference for URL params: if the URL contains layers=REFERENCE1;REFERENCE2, the two layers will be turned on.  */
        reference: string;
        events: Event[];
        /** Language information that can be used to localize the title and description */
        languages: ILanguageData;
        /** When loading, contains the index of the currently loaded feature */
        count: number;
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
        /** URL pointing to the basemap source. */
        url: string;
        /** Maximum zoom level */
        maxZoom: number;
        /** Minimum zoom level */
        minZoom: number;
        subdomains: string[];
        /** String that is shown on the map, attributing the source of the basemap */
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
        selectBaseLayer(key: any): void;
    }
}
declare module Charts {
    class ChartHelpers {
        /**
        * Returns the index and value of the maximum.
        */
        static max(arr: number[]): {
            maxIndex: number;
            max: number;
        };
        /**
        * Returns the index and value of the minimum.
        */
        static min(arr: number[]): {
            minIndex: number;
            min: number;
        };
        /**
        * Convert a timestamp to string.
        */
        static timestampToString(ts: number): any;
        static windowResize(fun: any): void;
        static initializeMargin(scope: any, attrs: any): void;
        static getD3Selector(attrs: any, element: any): string;
        static initializeLegendMargin(scope: any, attrs: any): void;
        static defaultColor(): (d: any, i: any) => any;
        static configureLegend(chart: any, scope: any, attrs: any): void;
        static checkElementID(scope: any, attrs: any, element: any, chart: any, data: any): void;
        static updateDimensions(scope: any, attrs: any, element: any, chart: any): void;
    }
}
declare module Charts {
    /**
      * Module
      */
    var myModule: any;
    interface ISparklineScope extends ng.IScope {
        timestamps: number[];
        sensor: number[];
        width?: number;
        height?: number;
        margin?: {
            top: number;
            right: number;
            bottom: number;
            left: number;
        };
        showaxis?: boolean;
    }
    interface IBarchartScope extends ng.IScope {
        data: number[];
    }
}
declare module Dashboard {
    var html: string;
}
declare module Dashboard {
    /**
      * Module
      */
    var myModule: any;
}
declare module Dashboard {
    interface IDashboardScope extends ng.IScope {
        vm: DashboardCtrl;
        gridsterOptions: any;
        dashboard: csComp.Services.Dashboard;
        container: string;
        param: any;
        initDashboard: Function;
        minus: Function;
    }
    class DashboardCtrl {
        private $scope;
        private $compile;
        private $layerService;
        private $mapService;
        private $messageBusService;
        private $templateCache;
        private scope;
        private project;
        static $inject: string[];
        constructor($scope: IDashboardScope, $compile: any, $layerService: csComp.Services.LayerService, $mapService: csComp.Services.MapService, $messageBusService: csComp.Services.MessageBusService, $templateCache: any);
        toggleWidget(widget: csComp.Services.IWidget): void;
        updateWidget(w: csComp.Services.IWidget): void;
        checkMap(): void;
        checkLayers(): void;
        checkViewbound(): void;
        checkTimeline(): void;
        updateDashboard(): void;
    }
}
declare module DashboardSelection {
    var html: string;
}
declare module DashboardSelection {
    /**
      * Module
      */
    var myModule: any;
}
declare module DashboardSelection {
    interface IDashboardSelectionScope extends ng.IScope {
        vm: any;
        addWidget: Function;
        title: string;
    }
    class DashboardSelectionCtrl {
        private $scope;
        private $layerService;
        private $mapService;
        private $messageBusService;
        scope: any;
        project: csComp.Services.SolutionProject;
        static $inject: string[];
        constructor($scope: any, $layerService: csComp.Services.LayerService, $mapService: csComp.Services.MapService, $messageBusService: csComp.Services.MessageBusService);
        startDashboardEdit(dashboard: csComp.Services.Dashboard): void;
        stopEdit(): void;
        startEdit(): void;
        /** Add new dashboard */
        addDashboard(widget: csComp.Services.IWidget): void;
        /** Remove existing dashboard */
        removeDashboard(key: string): void;
        toggleTimeline(): void;
        toggleMap(): void;
        checkTimeline(): void;
        /** publish a message that a new dashboard was selected */
        private publishDashboardUpdate();
        /** Select an active dashboard */
        selectDashboard(dashboard: csComp.Services.Dashboard): void;
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
    import IGeoJsonFile = csComp.Services.IGeoJsonFile;
    import IPropertyType = csComp.Services.IPropertyType;
    interface IDataTableViewScope extends ng.IScope {
        vm: DataTableCtrl;
    }
    /**
     * Represents a field in the table.
     * The value is the actual displayValue shown, the type is the propertyType type (e.g. number or text, useful when aligning the data), and the header is used for sorting.
     */
    class TableField {
        displayValue: string;
        originalValue: any;
        type: string;
        header: string;
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
        mapLabel: string;
        dataset: IGeoJsonFile;
        selectedType: csComp.Services.IFeatureType;
        numberOfItems: number;
        selectedLayerId: string;
        layerOptions: Array<any>;
        propertyTypes: Array<IPropertyType>;
        headers: Array<string>;
        sortingColumn: number;
        rows: Array<Array<TableField>>;
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
        toggleSelection(propertyTypeTitle: string): void;
        private findLayerById(id);
        /**
         * Returns the data rows that are relevant for the current selection.
         */
        getRows(): Array<Array<TableField>>;
        /**
         * Generate a font awesome class based on the order.
         */
        sortOrderClass(headerIndex: number, reverseOrder: boolean): string;
        /**
         * Order the rows based on the header index and the order.
         */
        orderBy(headerIndex: number, reverseOrder: boolean): void;
        downloadCsv(): void;
        private saveData(csvData, filename);
        /**
         * Convert to trusted html string.
         */
        toTrusted(html: string): any;
    }
}
declare module ExpertMode {
    var html: string;
}
declare module ExpertMode {
    /**
      * Module
      */
    var myModule: any;
}
declare module ExpertMode {
    import Expertise = csComp.Services.Expertise;
    interface IExpertModeScope extends ng.IScope {
        vm: ExpertModeCtrl;
        expertMode: Expertise;
    }
    class ExpertModeCtrl {
        private $scope;
        private $localStorageService;
        private $layerService;
        private $mapService;
        private $messageBus;
        static $inject: string[];
        constructor($scope: IExpertModeScope, $localStorageService: ng.localStorage.ILocalStorageService, $layerService: csComp.Services.LayerService, $mapService: csComp.Services.MapService, $messageBus: csComp.Services.MessageBusService);
        /**
        * Get the CSS class to render the mode.
        */
        getCssClass(): string;
        /**
        * Set the expert mode: although we assume that each directive is responsible for managing it by listening
        * to the expertMode.newExpertise message, we already set some common options here.
        * This is to reduce the dependency on this directive.
        */
        private setExpertMode(expertMode);
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
    import IFeature = csComp.Services.IFeature;
    import IFeatureType = csComp.Services.IFeatureType;
    import IPropertyType = csComp.Services.IPropertyType;
    import IPropertyTypeData = csComp.Services.IPropertyTypeData;
    interface IFeaturePropsScope extends ng.IScope {
        vm: FeaturePropsCtrl;
        showMenu: boolean;
        poi: IFeature;
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
        feature: IFeature;
        description?: string;
        meta?: IPropertyType;
        isFilter: boolean;
    }
    class CallOutProperty implements ICallOutProperty {
        key: string;
        value: string;
        property: string;
        canFilter: boolean;
        canStyle: boolean;
        feature: IFeature;
        isFilter: boolean;
        isSensor: boolean;
        description: string;
        meta: IPropertyType;
        timestamps: number[];
        sensor: number[];
        constructor(key: string, value: string, property: string, canFilter: boolean, canStyle: boolean, feature: IFeature, isFilter: boolean, isSensor: boolean, description?: string, meta?: IPropertyType, timestamps?: number[], sensor?: number[]);
    }
    interface ICallOutSection {
        propertyTypes: {
            [label: string]: IPropertyType;
        };
        properties: Array<ICallOutProperty>;
        sectionIcon: string;
        addProperty(key: string, value: string, property: string, canFilter: boolean, canStyle: boolean, feature: IFeature, isFilter: boolean, description?: string, meta?: IPropertyType): void;
        hasProperties(): boolean;
    }
    class CallOutSection implements ICallOutSection {
        propertyTypes: {
            [label: string]: IPropertyType;
        };
        properties: Array<ICallOutProperty>;
        sectionIcon: string;
        constructor(sectionIcon?: string);
        showSectionIcon(): boolean;
        addProperty(key: string, value: string, property: string, canFilter: boolean, canStyle: boolean, feature: IFeature, isFilter: boolean, description?: string, meta?: IPropertyType): void;
        hasProperties(): boolean;
    }
    class CallOut {
        private type;
        private feature;
        private propertyTypeData;
        title: string;
        icon: string;
        sections: {
            [title: string]: ICallOutSection;
        };
        constructor(type: IFeatureType, feature: IFeature, propertyTypeData: IPropertyTypeData);
        sectionCount(): number;
        firstSection(): ICallOutSection;
        lastSection(): ICallOutSection;
        private getOrCreateCallOutSection(sectionTitle);
        /**
         * Set the title of the callout to the title of the feature.
         */
        private setTitle();
        private setIcon(feature);
        static title(type: IFeatureType, feature: IFeature): string;
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
        toTrusted(html: string): string;
        createScatter(property: FeatureProps.CallOutProperty): void;
        /**
         * Callback function
         * @see {http://stackoverflow.com/questions/12756423/is-there-an-alias-for-this-in-typescript}
         * @see {http://stackoverflow.com/questions/20627138/typescript-this-scoping-issue-when-called-in-jquery-callback}
         * @todo {notice the strange syntax using a fat arrow =>, which is to preserve the this reference in a callback!}
         */
        private sidebarMessageReceived;
        private featureMessageReceived;
        private displayFeature(feature);
        showSensorData(property: ICallOutProperty): void;
        timestamps: {
            title: string;
            timestamp: number;
        }[];
        showSimpleTimeline: boolean;
        focusTime: string;
        setShowSimpleTimeline(): void;
        setTimestamps(): {
            title: string;
            timestamp: number;
        }[];
        setTime(time: {
            title: string;
            timestamp: number;
        }): void;
    }
}
declare module FeatureRelations {
    var html: string;
}
declare module FeatureRelations {
    /**
      * Module
      */
    var myModule: any;
}
declare module FeatureRelations {
    import IFeature = csComp.Services.IFeature;
    interface IFeatureRelationsScope extends ng.IScope {
        vm: FeatureRelationsCtrl;
        showMenu: boolean;
        poi: IFeature;
    }
    class RelationGroup {
        title: string;
        id: string;
        property: csComp.Services.IPropertyType;
        relations: Relation[];
    }
    class Relation {
        title: string;
        icon: string;
        subject: csComp.Services.IFeature;
        target: csComp.Services.IFeature;
    }
    class FeatureRelationsCtrl {
        private $scope;
        private $location;
        private $sce;
        private $mapService;
        private $layerService;
        private $messageBusService;
        private scope;
        relations: RelationGroup[];
        showRelations: boolean;
        static $inject: string[];
        selectRelation(relation: Relation): void;
        initRelations(): void;
        constructor($scope: IFeatureRelationsScope, $location: ng.ILocationService, $sce: ng.ISCEService, $mapService: csComp.Services.MapService, $layerService: csComp.Services.LayerService, $messageBusService: csComp.Services.MessageBusService);
        private featureMessageReceived;
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
declare module Heatmap {
    var html: string;
}
declare module Heatmap {
    /**
     * Module
     */
    var myModule: ng.IModule;
}
declare module Heatmap {
    import IFeature = csComp.Services.IFeature;
    interface IMcaScope extends ng.IScope {
        vm: HeatmapCtrl;
        ratingStates: any;
    }
    class HeatmapCtrl {
        private $scope;
        private $modal;
        private $translate;
        private $timeout;
        private $localStorageService;
        private $layerService;
        private $mapService;
        private messageBusService;
        private static confirmationMsg1;
        private static confirmationMsg2;
        heatmap: L.TileLayer.WebGLHeatMap;
        heatmapModel: HeatmapModel;
        heatmapModels: HeatmapModel[];
        expertMode: boolean;
        selectedFeature: IFeature;
        properties: FeatureProps.CallOutProperty[];
        showFeature: boolean;
        showChart: boolean;
        featureIcon: string;
        static $inject: string[];
        constructor($scope: IMcaScope, $modal: any, $translate: ng.translate.ITranslateService, $timeout: ng.ITimeoutService, $localStorageService: ng.localStorage.ILocalStorageService, $layerService: csComp.Services.LayerService, $mapService: csComp.Services.MapService, messageBusService: csComp.Services.MessageBusService);
        createHeatmap(): void;
        editHeatmap(heatmap: HeatmapModel): void;
        removeHeatmap(heatmap: HeatmapModel): void;
        private deleteHeatmap(heatmap);
        /**
         * Show the heat map editor in a modal.
         */
        private showHeatmapEditor(heatmap);
        private scopeApply();
        getVotingClass(hi: IHeatmapItem): string;
        weightUpdated(): void;
        /**
         * Update the available pre-set heatmaps.
         */
        private updateHeatmap();
        /**
        * Add a WebGL heatmap layer to the map.
        */
        private initializeHeatmap();
    }
}
declare module Heatmap {
    import IGeoJsonFile = csComp.Services.IGeoJsonFile;
    interface IHeatmapEditorScope extends ng.IScope {
        vm: HeatmapEditorCtrl;
    }
    class HeatmapEditorCtrl {
        private $scope;
        private $modalInstance;
        private $layerService;
        private $translate;
        private messageBusService;
        heatmap: HeatmapModel;
        /**
         * A virtual geojson file that represents all useable data for creating a heatmap.
         * @type {IGeoJsonFile}
         */
        dataset: IGeoJsonFile;
        static $inject: string[];
        constructor($scope: IHeatmapEditorScope, $modalInstance: any, $layerService: csComp.Services.LayerService, $translate: ng.translate.ITranslateService, messageBusService: csComp.Services.MessageBusService, heatmap?: HeatmapModel);
        save(): void;
        cancel(): void;
    }
}
declare module HeatmapEditorView {
    var html: string;
}
declare module Heatmap {
    /**
    * A simple interface to describe an item that can be used in a heatmap.
    * We either accept a FeatureType (e.g. Hospital or Shop), or a property that
    * is of type options (e.g. shop, magazine).
    */
    interface IHeatmapItem {
        title: string;
        featureType: csComp.Services.IFeatureType;
        /**
         * In case we are not interested in the feature type itself, but in a certain property,
         * e.g. the property that determines what it represents like buildingFunction.
         * @type {string}
         */
        propertyTitle?: string;
        propertyLabel: string;
        /**
         * When we are using an options property type, such as buildingFunction, we need
         * to indicate the particular option that we will evaluate.
         * @type {number}
         */
        optionIndex?: number;
        /**
         * The user weight specifies how much you like this item, e.g. the maximum value.
         * @type {number}, range [-5..5].
         */
        userWeight: number;
        /**
         * The weight specifies how much you like this item, relative to others.
         * @type {number}, range [0..1].
         */
        weight: number;
        /**
         * The ideality measure specifies how much you like this item with respect to its
         * distance.
         * @type {IIdealityMeasure}
         */
        idealityMeasure: IIdealityMeasure;
        isSelected: boolean;
        reset(): void;
        setScale(latitude: number, longitude: number): void;
        calculateHeatspots(feature: csComp.Services.IFeature, deltaLatDegree: number, deltaLonDegree: number): IHeatspot[];
    }
    class HeatmapItem implements IHeatmapItem {
        title: string;
        featureType: csComp.Services.IFeatureType;
        /**
        * 1 meter represents meterToLatDegree degrees in vertical direction.
        */
        private static meterToLatDegree;
        /**
        * 1 meter represents meterToLonDegree degrees in horizontal direction.
        */
        private static meterToLonDegree;
        /**
         * In case we are not interested in the feature type itself, but in a certain property,
         * e.g. the property that determines what it represents like buildingFunction.
         * @type {string}
         */
        propertyTitle: string;
        propertyLabel: string;
        /**
         * When we are using an options property type, such as buildingFunction, we need
         * to indicate the particular option that we will evaluate.
         * @type {number}
         */
        optionIndex: number;
        /**
         * The user weight specifies how much you like this item, e.g. the maximum value.
         * @type {number}, range [-5..5].
         */
        userWeight: number;
        /**
         * The weight specifies how much you like this item, relative to others.
         * @type {number}, range [0..1].
         */
        weight: number;
        /**
         * The ideality measure specifies how much you like this item with respect to its
         * distance.
         * @type {IIdealityMeasure}
         */
        idealityMeasure: IIdealityMeasure;
        heatspots: IHeatspot[];
        /** Represents the number of items that are needed to obtain an ideal location. */
        isSelected: boolean;
        private intensityScale;
        private static twoPi;
        constructor(title: string, featureType: csComp.Services.IFeatureType);
        calculateHeatspots(feature: csComp.Services.Feature, cellSize: number): IHeatspot[];
        /**
        * Calculate the intensity around the location.
        * NOTE We are performing a relative computation around location (0,0) in a rectangular grid.
        */
        private calculateHeatspot(cellSize);
        /**
        * Translate the heatspot (at (0,0)) to the actual location.
        */
        private pinHeatspotToLocation(feature);
        /**
        * Set the scale to convert a 1x1 meter grid cell to the appropriate number of degrees
        * in vertical and horizontal direction.
        */
        setScale(latitude: number): void;
        select(): void;
        reset(): void;
        toString(): string;
    }
}
declare module Heatmap {
    /**
    * A simple interface to describe a heat map.
    */
    interface IHeatmapModel {
        title: string;
        heatmapItems: IHeatmapItem[];
    }
    class HeatmapModel implements IHeatmapModel {
        title: string;
        heatmapItems: IHeatmapItem[];
        constructor(title: string);
        /**
         * Calculate the heatmap.
         */
        calculate(layerService: csComp.Services.LayerService, heatmap: any): void;
        /**
         * Update the weights of all heatmap items.
         */
        updateWeights(): void;
        /**
        * Add a heatmap item to the list of items only in case we don't have it yet.
        */
        addHeatmapItem(heatmapItem: IHeatmapItem): void;
    }
}
declare module Heatmap {
    /**
     * A heat spot represents an indexed point on the map with a certain intensity.
     */
    interface IHeatspot {
        i: number;
        j: number;
        intensity: number;
    }
    /**
     * A heat spot represents a point on the map with a certain intensity.
     */
    class Heatspot implements IHeatspot {
        i: number;
        j: number;
        intensity: number;
        constructor(i: number, j: number, intensity: number);
    }
}
declare module Heatmap {
    /**
     * The ideality measure specifies how much you like this item with respect to its
     * distance. For example, if I like a shop to be ideally at 200m of my house, it
     * also means that there is a zone around the shop with a radius of 200m where
     * I would ideally live.
     */
    interface IIdealityMeasure {
        /**
        * The distance with respect to my location where I would like to find the item.
        * @type {number}, in meters
        */
        idealDistance: number;
        /**
        * How happy would I be if the item would be at my location.
        * @type {number}, range [0..1]
        */
        atLocation: number;
        /**
         * At what distance would the item no longer be of value to me.
         * @type {number}, range in meters
         */
        lostInterestDistance: number;
        computeIdealityAtDistance(distance: number): number;
    }
    class IdealityMeasure implements IIdealityMeasure {
        /**
        * The distance with respect to my location where I would like to find the item.
        * @type {number}, in meters
        */
        idealDistance: number;
        /**
        * How happy would I be if the item would be at my location.
        * @type {number}, range [0..1]
        */
        atLocation: number;
        /**
         * At what distance would the item no longer be of value to me.
         * @type {number}, range in meters
         */
        lostInterestDistance: number;
        computeIdealityAtDistance(distance: number): number;
    }
}
declare module LanguageSwitch {
    var html: string;
}
declare module LanguageSwitch {
    /**
      * Module
      */
    var myModule: any;
}
declare module LanguageSwitch {
    interface ILanguageSwitchScope extends ng.IScope {
        vm: LanguageSwitchCtrl;
    }
    interface ILanguage {
        key: string;
        img: string;
        name: string;
    }
    class LanguageSwitchCtrl {
        private $scope;
        private $translate;
        private $languages;
        private $layerService;
        private $messageBus;
        private scope;
        language: ILanguage;
        static $inject: string[];
        constructor($scope: ILanguageSwitchScope, $translate: ng.translate.ITranslateService, $languages: ILanguage[], $layerService: csComp.Services.LayerService, $messageBus: csComp.Services.MessageBusService);
        switchLanguage(language: ILanguage): void;
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
        toggleLayer(layer: csComp.Services.ProjectLayer): void;
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
declare module Mca.Models {
    import IFeature = csComp.Services.IFeature;
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
        title: string;
        type: ScoringFunctionType;
        scores: string;
        cssClass: string;
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
        title: string;
        description: string;
        /**
        * Top level label will be used to add a property to a feature, mca_LABELNAME, with the MCA value.
        * Lower level children will be used to obtain the property value.
        */
        label: string;
        /** Color of the pie chart */
        color: string;
        /** Specified weight by the user */
        userWeight: number;
        /** Derived weight based on the fact that the sum of weights in a group of criteria needs to be 1. */
        weight: number;
        /** Scoring function y = f(x), which translates a specified measurement x to a value y, where y in [0,1].
         * Format [x1,y1 x2,y2], and may contain special characters, such as min or max to define the minimum or maximum.
         */
        scores: string;
        propValues: number[];
        criteria: Criterion[];
        /** Piece-wise linear approximation of the scoring function by a set of x and y points */
        isPlaUpdated: boolean;
        /** Piece-wise linear approximation must be scaled:x' = ax+b, where a=100/(8r) and b=-100(min+0.1r)/(8r) and r=max-min */
        isPlaScaled: boolean;
        minValue: number;
        maxValue: number;
        minCutoffValue: number;
        maxCutoffValue: number;
        x: number[];
        y: number[];
        deserialize(input: Criterion): Criterion;
        private requiresMinimum();
        private requiresMaximum();
        getTitle(): string;
        /**
         * Update the piecewise linear approximation (PLA) of the scoring (a.k.a. user) function,
         * which translates a property value to a MCA value in the range [0,1] using all features.
         */
        updatePla(features: IFeature[]): void;
        getScore(feature: IFeature): number;
    }
    class Mca extends Criterion implements csComp.Services.ISerializable<Mca> {
        /** Section of the callout */
        section: string;
        stringFormat: string;
        /** Optionally, export the result also as a rank */
        rankTitle: string;
        rankDescription: string;
        /** Optionally, stringFormat for the ranked result */
        rankFormat: string;
        /** Maximum number of star ratings to use to set the weight */
        userWeightMax: number;
        /** Applicable feature ids as a string[]. */
        featureIds: string[];
        scaleMaxValue: number;
        scaleMinValue: number;
        rankLabel: string;
        constructor();
        deserialize(input: Mca): Mca;
        /**
        * Update the MCA by calculating the weights and setting the colors.
        */
        update(): void;
        private calculateWeights(criteria?);
        /** Set the colors of all criteria and sub-criteria */
        private setColors();
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
    import IFeature = csComp.Services.IFeature;
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
        features: IFeature[];
        selectedFeature: IFeature;
        properties: FeatureProps.CallOutProperty[];
        showFeature: boolean;
        showChart: boolean;
        featureIcon: string;
        mca: Models.Mca;
        selectedCriterion: Models.Criterion;
        availableMcas: Models.Mca[];
        showAsterChart: boolean;
        showDialog: boolean;
        expertMode: boolean;
        showSparkline: boolean;
        private groupStyle;
        static $inject: string[];
        constructor($scope: IMcaScope, $modal: any, $translate: ng.translate.ITranslateService, $timeout: ng.ITimeoutService, $localStorageService: ng.localStorage.ILocalStorageService, $layerService: csComp.Services.LayerService, messageBusService: csComp.Services.MessageBusService);
        private getVotingClass(criterion);
        private createDummyMca();
        toggleMcaChartType(): void;
        toggleSparkline(): void;
        weightUpdated(criterion: Models.Criterion): void;
        updateMca(criterion?: Models.Criterion): void;
        editMca(mca: Models.Mca): void;
        createMca(): void;
        private showMcaEditor(newMca);
        removeMca(mca: Models.Mca): void;
        private getMcaIndex(mca);
        private addMca(mca);
        private deleteMca(mca);
        private addMcaToLocalStorage(mca);
        private removeMcaFromLocalStorage(mca);
        featureMessageReceived: (title: string, feature: IFeature) => void;
        private scopeApply();
        private updateSelectedFeature(feature, drawCharts?);
        drawChart(criterion?: Models.Criterion): void;
        private getParentOfSelectedCriterion(criterion?);
        private drawHistogram(criterion?);
        private drawAsterPlot(criterion?);
        private drawPieChart(criterion?);
        /**
        * Based on the currently loaded features, which MCA can we use
        */
        updateAvailableMcas(mca?: Models.Mca): void;
        calculateMca(): void;
        private applyPropertyInfoToCriteria(mca, featureType);
        private addPropertyInfo(featureId, mca, forceUpdate?);
        setStyle(item: FeatureProps.CallOutProperty): void;
        private static createPropertyType(mca);
        private static createRankPropertyType(mca);
    }
}
declare module Mca {
    import IFeatureType = csComp.Services.IFeatureType;
    import IGeoJsonFile = csComp.Services.IGeoJsonFile;
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
        dataset: IGeoJsonFile;
        propInfos: Array<IExtendedPropertyInfo>;
        headers: Array<string>;
        selectedFeatureType: IFeatureType;
        mcaTitle: string;
        rankTitle: string;
        scoringFunctions: Models.ScoringFunction[];
        showItem: number;
        scaleMax: number;
        scaleMin: number;
        static $inject: string[];
        constructor($scope: IMcaEditorScope, $modalInstance: any, $layerService: csComp.Services.LayerService, $translate: ng.translate.ITranslateService, messageBusService: csComp.Services.MessageBusService, mca?: Models.Mca);
        private updatePropertyInfoUponEdit(criterion, category?);
        loadPropertyTypes(): void;
        private selectFirstFeatureType();
        private updatePropertyInfo(featureType);
        toggleSelection(metaInfoTitle: string): void;
        isDisabled(): boolean;
        /**
         * Create a new MCA criterion
         */
        save(): void;
        cancel(): void;
        toggleItemDetails(index: number): void;
    }
}
declare module McaEditorView {
    var html: string;
}
declare module OfflineSearch {
    var html: string;
}
declare module OfflineSearch {
    /**
      * Module
      */
    var myModule: any;
}
declare module OfflineSearch {
    interface IProjectLocation {
        title: string;
        url: string;
    }
    /**
     * The name of the property you include in generating the offline search result.
     */
    interface IPropertyType {
        /**
         * Name of the property
         * @type {string}
         */
        name: string;
        /**
         * The title of the property.
         * @type {string}
         */
        title: string;
        /**
         * Language information for localisation.
         * @type {f.ILanguageData}
         */
        languages?: csComp.Services.ILanguageData;
    }
    /**
     * Specify the offline search options.
     */
    interface IOfflineSearchOptions {
        /**
         * Words you wish to exclude from the index.
         * @type {string[]}
         */
        stopWords: string[];
        /**
         * The property types that you wish to use for generating the index.
         * @type {osr.PropertyType}
         */
        propertyTypes: IPropertyType[];
    }
    class Layer {
        groupTitle: string;
        index: number;
        id: string;
        title: string;
        path: string;
        type: string;
        /**
         * Names of all the features.
         * @type {string[]}
         */
        featureNames: string[];
        constructor(groupTitle: string, index: number, id: string, title: string, path: string, type: string);
    }
    /**
     * An index entry that contains a search result.
     */
    class Entry {
        private v;
        constructor(layerIndexOrArray: Array<number> | number, featureIndex?: number, propertyIndex?: number);
        layerIndex: number;
        featureIndex: number;
        /**
         * This function is called when serializing the Entry object to JSON, which is
         * much less verbose than the default JSON. In the constructor, I've used a
         * Union type to deserialize it again.
         */
        toJSON(): number[];
    }
    class KeywordIndex {
        [key: string]: Entry[];
    }
    class OfflineSearchResult {
        project: IProjectLocation;
        options: IOfflineSearchOptions;
        layers: Layer[];
        keywordIndex: KeywordIndex;
        constructor(project: IProjectLocation, options: IOfflineSearchOptions);
    }
}
declare module OfflineSearch {
    interface IOfflineSearchScope extends ng.IScope {
        vm: OfflineSearchCtrl;
    }
    interface ILookupResult {
        title?: string;
        score: number;
        key: string;
        entries: Entry[];
    }
    class OfflineSearchResultViewModel {
        title: string;
        layerTitle: string;
        groupTitle: string;
        entry: Entry;
        firstInGroup: boolean;
        constructor(title: string, layerTitle: string, groupTitle: string, entry: Entry);
        toString(): string;
        fullTitle: string;
    }
    class OfflineSearchCtrl {
        private $scope;
        private $layerService;
        private $mapService;
        private $messageBus;
        private offlineSearchResult;
        searchText: string;
        isReady: boolean;
        static $inject: string[];
        constructor($scope: IOfflineSearchScope, $layerService: csComp.Services.LayerService, $mapService: csComp.Services.MapService, $messageBus: csComp.Services.MessageBusService);
        /**
         * Load the offline search results (json file).
         */
        private loadSearchResults(url);
        /**
         * Get the locations based on the entered text.
         */
        getLocation(text: string, resultCount?: number): OfflineSearchResultViewModel[];
        /**
         * Merge the resuls of two keyword lookups by checking whether different entries refer
         * to the same layer and feature.
         * @result1 {ILookupResult[]}
         * @result2 {ILookupResult[]}
         */
        private mergeResults(result1, result2);
        /**
         * Do a fuzzy keyword comparison between the entered text and the list of keywords,
         * and return a subset.
         * @text: {string}
         */
        private getKeywordHits(text);
        /**
         * When an item is selected, optionally open the layer and jump to the selected feature.
         */
        onSelect(selectedItem: OfflineSearchResultViewModel): void;
        private selectFeature(layerId, featureIndex);
    }
}
declare module ProjectSettings {
    var html: string;
}
declare module ProjectSettings {
    /**
      * Module
      */
    var myModule: any;
}
declare module ProjectSettings {
    interface IProjectSettingsScope extends ng.IScope {
        vm: ProjectSettingsCtrl;
    }
    class ProjectSettingsCtrl {
        private $scope;
        private $modal;
        private $layerService;
        private scope;
        static $inject: string[];
        constructor($scope: IProjectSettingsScope, $modal: any, $layerService: csComp.Services.LayerService);
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
    interface ITimelineService {
        getTimelineOptions(): csComp.Services.ITimelineOptions;
        setTimelineOptions(options: csComp.Services.ITimelineOptions): void;
    }
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
        private TimelineService;
        private scope;
        private locale;
        static $inject: string[];
        focusDate: Date;
        line1: string;
        line2: string;
        startDate: Date;
        endDate: Date;
        timer: any;
        isPlaying: boolean;
        showControl: boolean;
        isPinned: boolean;
        constructor($scope: ITimelineScope, $layerService: csComp.Services.LayerService, $mapService: csComp.Services.MapService, $messageBusService: csComp.Services.MessageBusService, TimelineService: Timeline.ITimelineService);
        private initTimeline();
        updateDragging(): void;
        onRangeChanged(properties: any): void;
        start(): void;
        toggleLive(): void;
        myTimer(): void;
        mouseEnter(): void;
        mouseLeave(): void;
        pinToNow(): void;
        stop(): void;
        updateFocusTime(): void;
        /**
        * Load the locales: instead of loading them from the original timeline-locales.js distribution,
        * add them here so you don't need to add another js dependency.
        * @seealso: http://almende.github.io/chap-links-library/downloads.html
        */
        loadLocales(): void;
    }
}
declare module Voting {
    /**
      * Module
      */
    var myModule: any;
}
declare module csComp.Helpers {
    interface IDictionary<T> {
        add(key: string, value: T): void;
        remove(key: string): void;
        containsKey(key: string): boolean;
        keys(): string[];
        clear(): void;
        count(): number;
        values(): Array<T>;
    }
    class Dictionary<T> implements IDictionary<T> {
        private theKeys;
        private theValues;
        constructor();
        initialize(init: {
            key: string;
            value: T;
        }[]): void;
        add(key: string, value: any): void;
        remove(key: string): void;
        clear(): void;
        count(): number;
        keys(): string[];
        values(): Array<T>;
        containsKey(key: string): boolean;
        toLookup(): IDictionary<T>;
    }
}
declare module csComp.Helpers {
    /**
    * A set of static geo tools
    * Source: http://www.csgnetwork.com/degreelenllavcalc.html
    */
    class GeoExtensions {
        static deg2rad(degree: number): number;
        static rad2deg(rad: number): number;
        /**
        * Calculate the log base 10 of val
        */
        static log10(val: any): number;
        static convertDegreesToMeters(latitudeDegrees: number): {
            latitudeLength: number;
            longitudeLength: number;
        };
    }
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
    function getPropertyTypes(type: csComp.Services.IFeatureType, propertyTypeData: csComp.Services.IPropertyTypeData): Services.IPropertyType[];
    /**
     * Convert a property value to a display value using the property info.
     */
    function convertPropertyInfo(pt: csComp.Services.IPropertyType, text: any): string;
    /**
    * Set the name of a feature.
    * @param {csComp.Services.IFeature} feature
    */
    function setFeatureName(feature: csComp.Services.IFeature): void;
    /**
    * Convert a feature's stringFormat to a string.
    * @param {Services.IFeature} feature
    * @param {string} stringFormat
    */
    function convertStringFormat(feature: Services.IFeature, stringFormat: string): string;
    /**
    * Get all indexes of the 'find' substring in the 'source' string.
    * @param {string} source
    * @param {string} find
    */
    function indexes(source: string, find: string): number[];
    function getGuid(): string;
    function S4(): string;
    /**
     * Load the features as visible on the map, effectively creating a virtual
     * GeoJSON file that represents all visible items.
     * Also loads the keys into the featuretype's propertyTypeData collection.
     */
    function loadMapLayers(layerService: Services.LayerService): Services.IGeoJsonFile;
}
declare module csComp.Helpers {
    class PieData {
        id: number;
        label: string;
        color: string;
        weight: number;
    }
    class AsterPieData extends PieData {
        score: number;
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
interface String {
    score(text: string, fuzziness: any): void;
}
declare module csComp {
    enum FileType {
        Js = 0,
        Css = 1,
    }
    class Utils {
        static loadedFiles: string[];
        /**
        * Load a JavaScript or CSS file dynamically by adding it to the end of the HEAD section in your document.
        * See also: http://www.javascriptkit.com/javatutors/loadjavascriptcss.shtml
        */
        static loadJsCssfile(filename: string, filetype: FileType, callback?: Function): void;
    }
}
declare module csComp.Services {
    interface IMessageBusCallback {
        (title: string, data?: any): any;
    }
    class MessageBusHandle {
        constructor(topic: string, callback: IMessageBusCallback);
        topic: string;
        callback: IMessageBusCallback;
    }
    enum NotifyLocation {
        BottomRight = 0,
        BottomLeft = 1,
        TopRight = 2,
        TopLeft = 3,
    }
    /**
     * Simple message bus service, used for subscribing and unsubsubscribing to topics.
     * @see {@link https://gist.github.com/floatingmonkey/3384419}
     */
    class MessageBusService {
        private $translate;
        private static cache;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService);
        /**
         * Publish a notification that needs to be translated
         * @title:       the translation key of the notification's title
         * @text:        the translation key of the notification's content
         * @location:    the location on the screen where the notification is shown (default bottom right)
         */
        notifyWithTranslation(title: string, text: string, location?: NotifyLocation): void;
        /**
         * Publish a notification
         * @title:       the title of the notification
         * @text:        the contents of the notification
         * @location:    the location on the screen where the notification is shown (default bottom right)
         */
        notify(title: string, text: string, location?: NotifyLocation): void;
        /**
         * Show a confirm dialog
         * @title           : the title of the notification
         * @text            : the contents of the notification
         * @callback        : the callback that will be called after the confirmation has been answered.
         */
        confirm(title: string, text: string, callback: (result: boolean) => any): void;
        notifyBottom(title: string, text: string): void;
        /**
         * Publish a notification
         * @title: the title of the notification
         * @text:  the contents of the notification
         */
        notifyData(data: any): void;
        /**
         * Publish to a topic
         */
        publish(topic: string, title: string, data?: any): void;
        /**
         * Subscribe to a topic
         * @param {string} topic The desired topic of the message.
         * @param {IMessageBusCallback} callback The callback to call.
         */
        subscribe(topic: string, callback: IMessageBusCallback): MessageBusHandle;
        /**
         * Unsubscribe to a topic by providing its handle
         */
        unsubscribe(handle: MessageBusHandle): void;
    }
    class EventObj {
        myEvents: any;
        constructor();
        bind(event: any, fct: any): void;
        unbind(event: any, fct: any): void;
        unbindEvent(event: any): void;
        unbindAll(): void;
        trigger(event: any, ...args: any[]): void;
        registerEvent(evtname: string): void;
        registerEvents(evtnames: Array<string>): void;
    }
}
declare module csComp.Services {
    interface ILayerService {
        title: string;
        accentColor: string;
        solution: Solution;
        project: Project;
        maxBounds: IBoundingBox;
        findLayer(id: string): ProjectLayer;
        selectFeature(feature: Services.IFeature): any;
        currentLocale: string;
        mb: Services.MessageBusService;
        map: Services.MapService;
        layerGroup: L.LayerGroup<L.ILayer>;
        featureTypes: {
            [key: string]: Services.IFeatureType;
        };
        propertyTypeData: {
            [key: string]: Services.IPropertyType;
        };
        timeline: any;
    }
    class LayerService implements ILayerService {
        private $location;
        private $translate;
        private $messageBusService;
        private $mapService;
        private $rootScope;
        maxBounds: IBoundingBox;
        title: string;
        accentColor: string;
        mb: Services.MessageBusService;
        map: Services.MapService;
        featureTypes: {
            [key: string]: IFeatureType;
        };
        propertyTypeData: {
            [key: string]: IPropertyType;
        };
        project: Project;
        projectUrl: string;
        solution: Solution;
        dimension: any;
        noFilters: boolean;
        noStyles: boolean;
        lastSelectedFeature: IFeature;
        selectedLayerId: string;
        timeline: any;
        currentLocale: string;
        loadedLayers: Helpers.Dictionary<L.ILayer>;
        layerGroup: L.LayerGroup<L.ILayer>;
        info: L.Control;
        static $inject: string[];
        constructor($location: ng.ILocationService, $translate: ng.translate.ITranslateService, $messageBusService: Services.MessageBusService, $mapService: Services.MapService, $rootScope: any);
        selectDashboard(dashboard: csComp.Services.Dashboard, container: string): void;
        updateSensorData(): void;
        /**
         * Add a layer
         */
        addLayer(layer: ProjectLayer): void;
        /**
         * Find a feature by layerId and FeatureId.
         * @layerId {string}
         * @featureIndex {number}
         */
        findFeatureById(layerId: string, featureIndex: number): IFeature;
        /**
         * Find the feature by name.
         */
        findFeatureByName(name: string): IFeature;
        /**
        * Convert topojson data to geojson data.
        */
        private convertTopoToGeoJson(data);
        /***
         * get list of properties that are part of the filter collection
         */
        private filterProperties(group);
        /***
         * Show tooltip with name, styles & filters.
         */
        showFeatureTooltip(e: any, group: ProjectGroup): void;
        hideFeatureTooltip(e: any): void;
        private popup;
        updateFeatureTooltip(e: any): void;
        highlightFeature(e: any): void;
        resetHighlight(e: any): void;
        removeStyle(style: GroupStyle): void;
        updateStyle(style: GroupStyle): void;
        updateFeature(feature: IFeature, group?: ProjectGroup): void;
        private updateGroupFeatures(group);
        private getDefaultMarkerStyle(feature);
        private updatePolygonStyle(m, feature);
        private getColor(v, gs);
        /**
        * Extract a valid color string, without transparency.
        */
        private getColorString(color, defaultColor?);
        style(feature: IFeature, layer: ProjectLayer): {
            fillColor: string;
            weight: number;
            opacity: number;
            color: string;
            fillOpacity: number;
        };
        /**
         * init feature (add to feature list, crossfilter)
         */
        initFeature(feature: IFeature, layer: ProjectLayer): IFeatureType;
        /**
        * Initialize the feature type and its property types by setting default property values, and by localizing it.
        */
        private initFeatureType(ft);
        /**
        * Initialize the property type with default values, and, if applicable, localize it.
        */
        private initPropertyType(pt);
        /**
        * Set default PropertyType's properties:
        * type              = text
        * visibleInCallout  = true
        * canEdit           = false
        * isSearchable      = true
        */
        private setDefaultPropertyType(pt);
        private localizePropertyType(pt);
        /**
         * create icon based of feature style
         */
        getPointIcon(feature: IFeature, layer: ProjectLayer): any;
        /**
         * Update icon for features
         */
        updateFeatureIcon(feature: IFeature, layer: ProjectLayer): void;
        /**
         * Add a feature.
         */
        addFeature(feature: IFeature, latlng: any, layer: ProjectLayer): any;
        /**
         * Select or deselect a feature and zoom to it on the map.
         */
        selectFeature(feature: IFeature): void;
        /**
         * find a filter for a specific group/property combination
         */
        private findFilter(group, property);
        /**
         * Find a layer with a specific id
         */
        findLayer(id: string): ProjectLayer;
        setStyle(property: any, openStyleTab?: boolean): GroupStyle;
        private saveStyle(group, style);
        addFilter(group: ProjectGroup, prop: string): void;
        /**
         * enable a filter for a specific property
         */
        setFilter(filter: GroupFilter, group: csComp.Services.ProjectGroup): void;
        /**
        * enable a filter for a specific property
        */
        setPropertyFilter(property: FeatureProps.CallOutProperty): void;
        /**
         * Return the feature style for a specific feature.
         * First, look for a layer specific feature type, otherwise, look for a project-specific feature type.
         * In case both fail, create a default feature type at the layer level.
         */
        getFeatureType(feature: IFeature): IFeatureType;
        /**
         * In case we are dealing with a regular JSON file without type information, create a default type.
         */
        private createDefaultType(feature);
        resetFilters(): void;
        private getGroupFeatures(g);
        rebuildFilters(g: ProjectGroup): void;
        /**
         * deactivate layer
         */
        removeLayer(layer: ProjectLayer): void;
        /***
         * Open solution file with references to available baselayers and projects
         * @params url: URL of the solution
         * @params layers: Optionally provide a semi-colon separated list of layer IDs that should be opened.
         * @params initialProject: Optionally provide a project name that should be loaded, if omitted the first project in the definition will be loaded
         */
        openSolution(url: string, layers?: string, initialProject?: string): void;
        /**
        * Clear all layers.
        */
        private clearLayers();
        /**
         * Open project
         * @params url: URL of the project
         * @params layers: Optionally provide a semi-colon separated list of layer IDs that should be opened.
         */
        openProject(url: string, layers?: string): void;
        closeProject(): void;
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
        private addScatterFilter(group, filter);
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
        private $localStorageService;
        private $timeout;
        private $messageBus;
        private static expertModeKey;
        private activeBaseLayer;
        static $inject: string[];
        map: L.Map;
        baseLayers: any;
        mapVisible: boolean;
        timelineVisible: boolean;
        rightMenuVisible: boolean;
        expertMode: Expertise;
        constructor($localStorageService: ng.localStorage.ILocalStorageService, $timeout: ng.ITimeoutService, $messageBus: csComp.Services.MessageBusService);
        /**
        * The expert mode can either be set manually, e.g. using this directive, or by setting the expertMode property in the
        * project.json file. In neither are set, we assume that we are dealing with an expert, so all features should be enabled.
        *
        * Precedence:
        * - when a declaration is absent, assume Expert.
        * - when the mode is set in local storage, take that value.
        * - when the mode is set in the project.json file, take that value.
        */
        private initExpertMode();
        initMap(): void;
        changeBaseLayer(layerObj: L.ILayer): void;
        invalidate(): void;
        /**
         * Zoom to a location on the map.
         */
        zoomToLocation(center: L.LatLng, zoomFactor?: number): void;
        /**
         * Zoom to a feature on the map.
         */
        zoomTo(feature: IFeature, zoomLevel?: number): void;
        /**
         * Compute the bounding box.
         * Returns [min_x, max_x, min_y, max_y]
         */
        private getBoundingBox(arr);
        getMap(): L.Map;
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
        constructor($scope: ISearchFormScope, $mapService: csComp.Services.MapService);
        doSearch(): void;
    }
}
declare module csComp.Services {
    class TimeService {
        private $messageBusService;
        static $inject: string[];
        map: L.Map;
        baseLayers: any;
        private activeBaseLayer;
        constructor($messageBusService: csComp.Services.MessageBusService);
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
