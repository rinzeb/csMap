var csComp;
(function (csComp) {
    var GeoJson;
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
    })(GeoJson = csComp.GeoJson || (csComp.GeoJson = {}));
})(csComp || (csComp = {}));

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
            //public static deserialize(input: IWidget): IWidget {
            //    var loader = new InstanceLoader(window);
            //    var w = <IWidget>loader.getInstance(widget.widgetType);
            //    var res = $.extend(new BaseWidget(), input);
            //    return res;
            //}
            function BaseWidget(title, type) {
                this.renderer = function ($compile, $scope) { };
                this.resize = function (status, width, height) { };
                if (title)
                    this.title = title;
                this.properties = {};
                this.dataSets = [];
            }
            BaseWidget.prototype.start = function () { };
            BaseWidget.prototype.init = function () {
                //if (!sizeX)
                //this.sizeX = sX;
                //this.sizeY = sY;
                //this.col = c;
                //this.row = r;
                this.background = "red";
                if (!this.id)
                    this.id = "widget" + csComp.Helpers.getGuid().replace('-', '');
                //this.width = (width) ? width : 300;
                //this.height = (height) ? height : 150;
                //this.id = id;
                this.elementId = this.id;
                this.start();
            };
            BaseWidget.prototype.updateDateRange = function (r) {
                this.range = r;
            };
            return BaseWidget;
        })();
        Services.BaseWidget = BaseWidget;
        var Dashboard = (function () {
            function Dashboard() {
                this.showTimeline = true;
                this.showRightmenu = true;
                this.draggable = true;
                this.resizable = true;
                this.widgets = [];
            }
            Dashboard.deserialize = function (input) {
                var _this = this;
                var res = $.extend(new Dashboard(), input);
                res.widgets = [];
                if (input.widgets)
                    input.widgets.forEach(function (w) {
                        _this.addNewWidget(w, res);
                    });
                if (input.timeline)
                    res.timeline = $.extend(new Services.DateRange(), input.timeline);
                return res;
            };
            Dashboard.addNewWidget = function (widget, dashboard) {
                //var loader = new InstanceLoader(window);
                //var w = <IWidget>loader.getInstance(widget.widgetType);
                //w.messageBusService = this.$messageBusService;
                //w.layerService = this.$layerService;
                //w.init();
                //var w = BaseWidget();
                if (!widget.id)
                    widget.id = csComp.Helpers.getGuid();
                //alert(widget.id);
                widget.elementId = "widget-" + widget.id;
                widget.dashboard = dashboard;
                dashboard.widgets.push(widget);
                /*if (this.$rootScope.$root.$$phase != '$apply' && this.$rootScope.$root.$$phase != '$digest') { this.$rootScope.$apply(); }
                setTimeout(() => {
                    //if (w != null) w.renderer(this.$compile, this.$rootScope);
                    this.updateWidget(widget);
      
                }, 50);*/
                //this.editWidget(w);
                return widget;
            };
            return Dashboard;
        })();
        Services.Dashboard = Dashboard;
        var Timeline = (function () {
            function Timeline() {
            }
            return Timeline;
        })();
        Services.Timeline = Timeline;
        var TimedDataSet = (function () {
            function TimedDataSet() {
            }
            return TimedDataSet;
        })();
        Services.TimedDataSet = TimedDataSet;
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
        var SensorSet = (function () {
            function SensorSet() {
            }
            SensorSet.prototype.addValue = function (date, value) {
                this.timestamps.push(date);
                this.values.push(value);
                this.activeValue = value;
            };
            return SensorSet;
        })();
        Services.SensorSet = SensorSet;
        var DataSource = (function () {
            function DataSource() {
            }
            DataSource.LoadData = function (ds, callback) {
                if (ds.url != null) {
                    $.getJSON(ds.url, function (temp) {
                        if (temp != null) {
                            ds.id = temp.id;
                            ds.sensors = temp.sensors;
                            ds.title = temp.title;
                            callback();
                        }
                        //var projects = data;
                    });
                }
            };
            return DataSource;
        })();
        Services.DataSource = DataSource;
    })(Services = csComp.Services || (csComp.Services = {}));
})(csComp || (csComp = {}));

var csComp;
(function (csComp) {
    var Services;
    (function (Services) {
        var SensorSet = (function () {
            function SensorSet() {
            }
            return SensorSet;
        })();
        Services.SensorSet = SensorSet;
        var DataSource = (function () {
            function DataSource() {
            }
            DataSource.LoadData = function (ds, callback) {
                if (ds.url != null) {
                    $.getJSON(ds.url, function (temp) {
                        if (temp != null) {
                            ds.id = temp.id;
                            ds.sensors = temp.sensors;
                            ds.title = temp.title;
                            callback();
                        }
                        //var projects = data;
                    });
                }
            };
            return DataSource;
        })();
        Services.DataSource = DataSource;
    })(Services = csComp.Services || (csComp.Services = {}));
})(csComp || (csComp = {}));
var csComp;
(function (csComp) {
    var Services;
    (function (Services) {
        var Event = (function () {
            function Event() {
                var _this = this;
                this.startDate = function () { return new Date(_this.start); };
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
                this.legends = {};
                this.fixedColorRange = false;
                $translate('WHITE_RED').then(function (translation) {
                    _this.colorScales[translation] = ['white', 'red'];
                });
                $translate('GREEN_RED').then(function (translation) {
                    _this.colorScales[translation] = ['green', 'red'];
                });
                $translate('RED_GREEN').then(function (translation) {
                    _this.colorScales[translation] = ['red', 'green'];
                });
                $translate('WHITE_ORANGE').then(function (translation) {
                    _this.colorScales[translation] = ['white', 'orange'];
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
                $translate('RED_WHITE_BLUE').then(function (translation) {
                    _this.colorScales[translation] = ['red', 'white', 'blue'];
                });
            }
            return GroupStyle;
        })();
        Services.GroupStyle = GroupStyle;
        /**
         * the Legend class provides a data structure that is used to map a value to a color
         * (see also the function getColor())
        */
        var Legend = (function () {
            function Legend() {
            }
            return Legend;
        })();
        Services.Legend = Legend;
        var LegendEntry = (function () {
            function LegendEntry() {
            }
            return LegendEntry;
        })();
        Services.LegendEntry = LegendEntry;
    })(Services = csComp.Services || (csComp.Services = {}));
})(csComp || (csComp = {}));

var csComp;
(function (csComp) {
    var Services;
    (function (Services) {
        /**
        * Expert level for determining what options to show to the user.
        */
        (function (Expertise) {
            Expertise[Expertise["Beginner"] = 1] = "Beginner";
            Expertise[Expertise["Intermediate"] = 2] = "Intermediate";
            Expertise[Expertise["Expert"] = 3] = "Expert";
        })(Services.Expertise || (Services.Expertise = {}));
        var Expertise = Services.Expertise;
        var availableZoomLevels = [
            { title: "decades", value: 315360000000 },
            { title: "years", value: 31536000000 },
            { title: "weeks", value: 604800000 },
            { title: "days", value: 86400000 },
            { title: "hours", value: 3600000 },
            { title: "quarters", value: 900000 },
            { title: "minutes", value: 60000 },
            { title: "seconds", value: 1000 },
            { title: "milliseconds", value: 1 }
        ];
        var DateRange = (function () {
            function DateRange() {
                var _this = this;
                this.startDate = function () {
                    if (_this.focus < _this.start)
                        _this.start = _this.focus - _this.range / 5;
                    return new Date(_this.start);
                };
                this.focusDate = function () { return new Date(_this.focus); };
                this.endDate = function () {
                    if (_this.focus > _this.end)
                        _this.end = _this.focus + _this.range / 5;
                    return new Date(_this.end);
                };
            }
            //constructor() {
            //    if (!this.focus) this.setFocus(new Date());
            //}
            DateRange.deserialize = function (input) {
                var res = $.extend(new DateRange(), input);
                if (typeof res.focus === 'undefined' || res.focus === null)
                    res.focus = Date.now();
                return res;
            };
            /**
            * Set the focus time of the timeline, optionally including start and end time.
            */
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
         * e.g. you could make it so that you can switch between different regions or different domains of interest.
         */
        var Solution = (function () {
            function Solution() {
            }
            return Solution;
        })();
        Services.Solution = Solution;
        /** Project within a solution file, refers to a project url*/
        var SolutionProject = (function () {
            function SolutionProject() {
            }
            return SolutionProject;
        })();
        Services.SolutionProject = SolutionProject;
        /** project configuration. */
        var Project = (function () {
            function Project() {
                this.expertMode = Expertise.Expert;
                this.markers = {};
            }
            Project.prototype.deserialize = function (input) {
                var res = jQuery.extend(new Project(), input);
                if (input.timeLine)
                    res.timeLine = DateRange.deserialize(input.timeLine); // <DateRange>jQuery.extend(new DateRange(), input.timeLine);
                if (input.dashboards) {
                    res.dashboards = [];
                    input.dashboards.forEach(function (d) {
                        res.dashboards.push(Services.Dashboard.deserialize(d));
                    });
                    for (var mca in input.mcas) {
                        if (input.mcas.hasOwnProperty(mca)) {
                            res.mcas.push(new Mca.Models.Mca().deserialize(mca));
                        }
                    }
                }
                if (!res.propertyTypeData)
                    res.propertyTypeData = {};
                if (res.id == null)
                    res.id = res.title;
                return res;
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

var csComp;
(function (csComp) {
    var Helpers;
    (function (Helpers) {
        var Dictionary = (function () {
            function Dictionary() {
                this.theKeys = [];
                this.theValues = [];
            }
            Dictionary.prototype.initialize = function (init) {
                for (var x = 0; x < init.length; x++) {
                    this[init[x].key] = init[x].value;
                    this.theKeys.push(init[x].key);
                    this.theValues.push(init[x].value);
                }
            };
            Dictionary.prototype.add = function (key, value) {
                this[key] = value;
                this.theKeys.push(key);
                this.theValues.push(value);
            };
            Dictionary.prototype.remove = function (key) {
                var index = this.theKeys.indexOf(key, 0);
                this.theKeys.splice(index, 1);
                this.theValues.splice(index, 1);
                delete this[key];
            };
            Dictionary.prototype.clear = function () {
                for (var i = this.theKeys.length; i >= 0; i--) {
                    var key = this.theKeys[i];
                    this.remove(key);
                }
            };
            Dictionary.prototype.count = function () {
                return this.theKeys.length;
            };
            Dictionary.prototype.keys = function () {
                return this.theKeys;
            };
            Dictionary.prototype.values = function () {
                return this.theValues;
            };
            Dictionary.prototype.containsKey = function (key) {
                return (typeof this[key] !== "undefined");
            };
            Dictionary.prototype.toLookup = function () {
                return this;
            };
            return Dictionary;
        })();
        Helpers.Dictionary = Dictionary;
    })(Helpers = csComp.Helpers || (csComp.Helpers = {}));
})(csComp || (csComp = {}));

var csComp;
(function (csComp) {
    var Helpers;
    (function (Helpers) {
        /**
        * A set of static geo tools
        * Source: http://www.csgnetwork.com/degreelenllavcalc.html
        */
        var GeoExtensions = (function () {
            function GeoExtensions() {
            }
            GeoExtensions.getBoundingBox = function (data) {
                var bounds = {}, coords, point, latitude, longitude;
                // We want to use the “features” key of the FeatureCollection (see above)
                data = data.features;
                // Loop through each “feature”
                for (var i = 0; i < data.length; i++) {
                    // get bound
                    var b = d3.geo.bounds(data[i]);
                    // Update the bounds recursively by comparing the current
                    // xMin/xMax and yMin/yMax with the coordinate
                    // we're currently checking 
                    bounds.xMin = bounds.xMin < b[0][0] ? bounds.xMin : b[0][0];
                    bounds.xMax = bounds.xMax > b[1][0] ? bounds.xMax : b[1][0];
                    bounds.yMin = bounds.yMin < b[0][1] ? bounds.yMin : b[0][1];
                    bounds.yMax = bounds.yMax > b[1][1] ? bounds.yMax : b[1][1];
                }
                // Returns an object that contains the bounds of this GeoJSON
                // data. The keys of this object describe a box formed by the
                // northwest (xMin, yMin) and southeast (xMax, yMax) coordinates.
                return bounds;
            };
            /**
            * Convert topojson data to geojson data.
            */
            GeoExtensions.convertTopoToGeoJson = function (data) {
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
            GeoExtensions.deg2rad = function (degree) {
                var conv_factor = (2.0 * Math.PI) / 360.0;
                return (degree * conv_factor);
            };
            GeoExtensions.rad2deg = function (rad) {
                var conv_factor = 360 / (2.0 * Math.PI);
                return (rad * conv_factor);
            };
            /**
            * Calculate the log base 10 of val
            */
            GeoExtensions.log10 = function (val) {
                return (Math.LOG10E * Math.log(val));
            };
            GeoExtensions.convertDegreesToMeters = function (latitudeDegrees) {
                // Convert latitude to radians
                var lat = GeoExtensions.deg2rad(latitudeDegrees);
                // Set up "Constants"
                var m1 = 111132.92, m2 = -559.82, m3 = 1.175, m4 = -0.0023, p1 = 111412.84, p2 = -93.5, p3 = 0.118; // longitude calculation term 3
                // Calculate the length of a degree of latitude and longitude in meters
                var latlen = m1 + (m2 * Math.cos(2 * lat)) + (m3 * Math.cos(4 * lat)) + (m4 * Math.cos(6 * lat));
                var lonlen = (p1 * Math.cos(lat)) + (p2 * Math.cos(3 * lat)) + (p3 * Math.cos(5 * lat));
                return {
                    /**
                    * Length of a degree of latitude in meters
                    */
                    latitudeLength: latlen,
                    /**
                    * Length of a degree of longitude in meters
                    */
                    longitudeLength: lonlen
                };
            };
            return GeoExtensions;
        })();
        Helpers.GeoExtensions = GeoExtensions;
    })(Helpers = csComp.Helpers || (csComp.Helpers = {}));
})(csComp || (csComp = {}));

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
            // Case three: the feature has a Name property which specifies a string format, meaning that the Name is derived from several existing properties.
            if (feature.fType.propertyTypeData != null) {
                for (var i = 0; i < feature.fType.propertyTypeData.length; i++) {
                    var propertyType = feature.fType.propertyTypeData[i];
                    if (propertyType.label !== 'Name')
                        continue;
                    feature.properties['Name'] = Helpers.convertStringFormat(feature, propertyType.stringFormat);
                    return;
                }
            }
            // If all else fails, use the first property
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
        /**
         * Load the features as visible on the map, effectively creating a virtual
         * GeoJSON file that represents all visible items.
         * Also loads the keys into the featuretype's propertyTypeData collection.
         */
        function loadMapLayers(layerService) {
            var data = {
                type: '',
                features: [],
                featureTypes: {}
            };
            // If we are filtering, load the filter results
            layerService.project.groups.forEach(function (group) {
                if (group.filterResult != null)
                    group.filterResult.forEach(function (f) { return data.features.push(f); });
            });
            // Otherwise, take all loaded features
            if (data.features.length === 0)
                data.features = layerService.project.features;
            data.features.forEach(function (f) {
                if (!(data.featureTypes.hasOwnProperty(f.featureTypeName))) {
                    var featureType = layerService.featureTypes[f.featureTypeName];
                    if (!featureType.name)
                        featureType.name = f.featureTypeName.replace('_Default', '');
                    data.featureTypes[f.featureTypeName] = featureType;
                    if (featureType.propertyTypeKeys) {
                        featureType.propertyTypeData = [];
                        featureType.propertyTypeKeys.split(';').forEach(function (key) {
                            if (layerService.propertyTypeData.hasOwnProperty(key)) {
                                featureType.propertyTypeData.push(layerService.propertyTypeData[key]);
                            }
                        });
                    }
                }
            });
            return data;
        }
        Helpers.loadMapLayers = loadMapLayers;
    })(Helpers = csComp.Helpers || (csComp.Helpers = {}));
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
                width -= margin.left + margin.right,
                    height -= margin.top + margin.bottom;
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
                    return scaleFactor > 0
                        ? d3.round(value / scaleFactor, 0).toString()
                        : d3.round(value, 0).toString();
                };
                var tempScale = d3.scale.linear().domain([0, numberOfBins]).range([min, max]);
                var tickArray = d3.range(numberOfBins + 1).map(tempScale);
                var x = d3.scale.linear()
                    .domain([min, max])
                    .range([0, width]);
                var xAxis = d3.svg.axis()
                    .scale(x)
                    .tickValues(tickArray)
                    .tickFormat(tickFormatter)
                    .orient("bottom");
                // Generate a histogram using numberOfBins uniformly-spaced bins.
                var data = d3.layout.histogram().bins(numberOfBins)(values);
                var y = d3.scale.linear()
                    .domain([0, d3.max(data, function (d) { return d.y; })])
                    .range([height, 0]);
                var svg = d3.select("#" + id)
                    .append("svg")
                    .attr("id", svgId)
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .attr("style", "display: block; margin: 0 auto;")
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                var bar = svg.selectAll(".bar")
                    .data(data)
                    .enter().append("g")
                    .attr("class", function (d, i) {
                    return selectedValue != null && (d.x < selectedValue && selectedValue < d.x + data[i].dx)
                        ? "bar highlight"
                        : "bar";
                })
                    .attr("transform", function (d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });
                bar.append("rect")
                    .attr("x", 1)
                    .attr("width", x(min + data[0].dx) - 1)
                    .attr("height", function (d) { return height - y(d.y); });
                var conditionalFormatCounter = function (value) {
                    return (height - y(value) > 6)
                        ? formatCount(value)
                        : "";
                };
                // Text (count) inside the bins
                bar.append("text")
                    .attr("dy", ".75em")
                    .attr("y", 6)
                    .attr("x", x(min + data[0].dx) / 2)
                    .attr("text-anchor", "middle")
                    .text(function (d) { return conditionalFormatCounter(d.y); });
                // x-label
                svg.append("text")
                    .attr("class", "x label")
                    .attr("text-anchor", "end")
                    .attr("x", width)
                    .attr("y", height / 2 - 6)
                    .text(xLabel);
                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);
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
                width -= margin.left + margin.right,
                    height -= margin.top + margin.bottom;
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
                    return scaleFactor > 0
                        ? d3.round(value / scaleFactor, 0).toString()
                        : d3.round(value, 0).toString();
                };
                var tempScale = d3.scale.linear().domain([0, numberOfBins]).range([min, max]);
                var tickArray = d3.range(numberOfBins + 1).map(tempScale);
                var x = d3.scale.linear()
                    .domain([min, max])
                    .range([0, width]);
                var xAxis = d3.svg.axis()
                    .scale(x)
                    .tickValues(tickArray)
                    .tickFormat(tickFormatter)
                    .orient("bottom");
                // Generate a histogram using numberOfBins uniformly-spaced bins.
                var valuesInRange = values.filter(function (value) { return (min <= value && value <= max); });
                if (valuesInRange.length < 3) {
                    var svg1 = d3.select("#" + id)
                        .append("svg")
                        .attr("id", svgId)
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                    svg1.append("text")
                        .attr("class", "x label")
                        .attr("text-anchor", "center")
                        .attr("x", width / 2)
                        .attr("y", height / 2 + 6)
                        .text("\u03A7 NO DATA IN RANGE");
                    return;
                }
                xLabel += " \u03A3" + valuesInRange.length;
                var data = d3.layout.histogram().bins(numberOfBins)(valuesInRange);
                var y = d3.scale.linear()
                    .domain([0, d3.max(data, function (d) { return d.y; })])
                    .range([height, 0]);
                var svg = d3.select("#" + id)
                    .append("svg")
                    .attr("id", svgId)
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .attr("style", "display: block; margin: 0 auto;")
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                var bar = svg.selectAll(".bar")
                    .data(data)
                    .enter().append("g")
                    .attr("class", "bar")
                    .attr("transform", function (d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });
                bar.append("rect")
                    .attr("x", 1)
                    .attr("width", x(min + data[0].dx) - 1)
                    .attr("height", function (d) { return height - y(d.y); });
                var conditionalFormatCounter = function (value) {
                    return (height - y(value) > 6)
                        ? formatCount(value)
                        : "";
                };
                // Text (count) inside the bins
                bar.append("text")
                    .attr("dy", ".75em")
                    .attr("y", 6)
                    .attr("x", x(min + data[0].dx) / 2)
                    .attr("text-anchor", "middle")
                    .text(function (d) { return conditionalFormatCounter(d.y); });
                // x-label
                xLabel += ")";
                svg.append("text")
                    .attr("class", "x label")
                    .attr("text-anchor", "end")
                    .attr("x", width)
                    .attr("y", height / 2 - 6)
                    .text(xLabel);
                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);
                if (xyData == null)
                    return;
                // Draw line chart
                var xy = [];
                xy.push({ x: min, y: xyData.y[0] });
                for (var i = 0; i < xyData.x.length; i++) {
                    xy.push({ x: xyData.x[i], y: xyData.y[i] });
                }
                xy.push({ x: max, y: xyData.y[xyData.y.length - 1] });
                var y2 = d3.scale.linear()
                    .domain([0, d3.max(xy, function (d) { return d.y; })])
                    .range([height - 1, 1]);
                var lineFunc = d3.svg.line()
                    .x(function (d) { return x(d.x); })
                    .y(function (d) { return y2(d.y); })
                    .interpolate("linear");
                svg.append("svg:path")
                    .attr("d", lineFunc(xy))
                    .attr("stroke", "red")
                    .attr("stroke-width", 2)
                    .attr("fill", "none");
                if (featureValue == null)
                    return;
                // Draw feature on the score
                xy = [];
                xy.push({ x: featureValue, y: 0 });
                xy.push({ x: featureValue, y: height });
                svg.append("svg:path")
                    .attr("d", lineFunc(xy))
                    .attr("stroke", "blue")
                    .attr("stroke-width", 2)
                    .attr("fill", "none");
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
                var pie = d3.layout.pie()
                    .sort(null)
                    .value(function (d) { return d.weight; });
                var tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .offset([0, 0])
                    .html(function (d) { return '<strong>' + d.data.label + ": </strong><span style='color:orangered'>" + Math.round(d.data.weight * 100) + "%</span>"; });
                var arc = d3.svg.arc()
                    .innerRadius(innerRadius)
                    .outerRadius(radius);
                var outlineArc = d3.svg.arc()
                    .innerRadius(innerRadius)
                    .outerRadius(radius);
                var svg = d3.select('#' + parentId)
                    .append("svg")
                    .attr("id", svgId)
                    .attr("width", width)
                    .attr("height", height)
                    .attr("style", "display: block; margin: 0 auto;")
                    .append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
                //svg.call(tip);
                var colors = chroma.scale(colorScale).domain([0, data.length - 1], data.length);
                var path = svg.selectAll(".solidArc")
                    .data(pie(data))
                    .enter().append("path")
                    .attr("fill", function (d, i) { return d.data.color || colors(i).hex(); })
                    .attr("class", "solidArc")
                    .attr("stroke", "gray")
                    .attr("d", arc)
                    .on('mouseover', function (d, i) {
                    tip.show(d, i);
                })
                    .on('mouseout', tip.hide);
                var outerPath = svg.selectAll(".outlineArc")
                    .data(pie(data))
                    .enter().append("path")
                    .attr("fill", "none")
                    .attr("stroke", "gray")
                    .attr("class", "outlineArc")
                    .attr("d", outlineArc);
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
                var pie = d3.layout.pie()
                    .sort(null)
                    .value(function (d) { return d.weight; });
                var tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .offset([0, 0])
                    .html(function (d) { return '<strong>' + d.data.label + ": </strong> <span style='color:orangered'>" + Math.round(d.data.weight * 100) + "% x " + Math.round(d.data.score) + "&nbsp; = " + Math.round(d.data.weight * d.data.score) + "</span>"; });
                var arc = d3.svg.arc()
                    .innerRadius(innerRadius)
                    .outerRadius(function (d) { return (radius - innerRadius) * (d.data.score / 100.0) + innerRadius; });
                var outlineArc = d3.svg.arc()
                    .innerRadius(innerRadius)
                    .outerRadius(radius);
                var svg = d3.select('#' + parentId)
                    .append("svg")
                    .attr("id", svgId)
                    .attr("width", width)
                    .attr("height", height)
                    .attr("style", "display: block; margin: 0 auto;")
                    .append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
                try {
                    svg.call(tip);
                }
                catch (err) {
                    console.log("Error: " + err.message);
                }
                var colors = chroma.scale(colorScale).domain([0, data.length - 1], data.length);
                var path = svg.selectAll(".solidArc")
                    .data(pie(data))
                    .enter().append("path")
                    .attr("fill", function (d, i) { return d.data.color || colors(i).hex(); })
                    .attr("class", "solidArc")
                    .attr("stroke", "gray")
                    .attr("d", arc)
                    .on('mouseover', function (d, i) {
                    tip.show(d, i);
                    //$rootScope.$broadcast('tooltipShown', { id: d.data.id });
                })
                    .on('mouseout', tip.hide);
                var outerPath = svg.selectAll(".outlineArc")
                    .data(pie(data))
                    .enter().append("path")
                    .attr("fill", "none")
                    .attr("stroke", "gray")
                    .attr("class", "outlineArc")
                    .attr("d", outlineArc);
                // calculate the weighted mean score
                var totalWeight = 0;
                var totalScore = 0;
                data.forEach(function (p) {
                    totalWeight += p.weight;
                    totalScore += p.weight * p.score;
                });
                svg.append("svg:text")
                    .attr("class", "aster-score")
                    .attr("dy", ".35em")
                    .attr("text-anchor", "middle") // text-align: right
                    .text(Math.round(totalScore / totalWeight));
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

var csComp;
(function (csComp) {
    var StringExt;
    (function (StringExt) {
        function isNullOrEmpty(s) {
            return !isNumber(s) && !s;
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

/*!
 * string_score.js: String Scoring Algorithm 0.1.22
 *
 * http://joshaven.com/string_score
 * https://github.com/joshaven/string_score
 *
 * Copyright (C) 2009-2014 Joshaven Potter <yourtech@gmail.com>
 * Special thanks to all of the contributors listed here https://github.com/joshaven/string_score
 * MIT License: http://opensource.org/licenses/MIT
 *
 * Date: Tue Mar 1 2011
 * Updated: Tue Mar 10 2015
*/
/*jslint nomen:true, white:true, browser:true,devel:true */
/**
 * Scores a string against another string.
 *    'Hello World'.score('he');         //=> 0.5931818181818181
 *    'Hello World'.score('Hello');    //=> 0.7318181818181818
 */
String.prototype.score = function (word, fuzziness) {
    'use strict';
    // If the string is equal to the word, perfect match.
    if (this === word) {
        return 1;
    }
    //if it's not a perfect match and is empty return 0
    if (word === "") {
        return 0;
    }
    var runningScore = 0, charScore, finalScore, string = this, lString = string.toLowerCase(), strLength = string.length, lWord = word.toLowerCase(), wordLength = word.length, idxOf, startAt = 0, fuzzies = 1, fuzzyFactor, i;
    // Cache fuzzyFactor for speed increase
    if (fuzziness) {
        fuzzyFactor = 1 - fuzziness;
    }
    // Walk through word and add up scores.
    // Code duplication occurs to prevent checking fuzziness inside for loop
    if (fuzziness) {
        for (i = 0; i < wordLength; i += 1) {
            // Find next first case-insensitive match of a character.
            idxOf = lString.indexOf(lWord[i], startAt);
            if (idxOf === -1) {
                fuzzies += fuzzyFactor;
            }
            else {
                if (startAt === idxOf) {
                    // Consecutive letter & start-of-string Bonus
                    charScore = 0.7;
                }
                else {
                    charScore = 0.1;
                    // Acronym Bonus
                    // Weighing Logic: Typing the first character of an acronym is as if you
                    // preceded it with two perfect character matches.
                    if (string[idxOf - 1] === ' ') {
                        charScore += 0.8;
                    }
                }
                // Same case bonus.
                if (string[idxOf] === word[i]) {
                    charScore += 0.1;
                }
                // Update scores and startAt position for next round of indexOf
                runningScore += charScore;
                startAt = idxOf + 1;
            }
        }
    }
    else {
        for (i = 0; i < wordLength; i += 1) {
            idxOf = lString.indexOf(lWord[i], startAt);
            if (-1 === idxOf) {
                return 0;
            }
            if (startAt === idxOf) {
                charScore = 0.7;
            }
            else {
                charScore = 0.1;
                if (string[idxOf - 1] === ' ') {
                    charScore += 0.8;
                }
            }
            if (string[idxOf] === word[i]) {
                charScore += 0.1;
            }
            runningScore += charScore;
            startAt = idxOf + 1;
        }
    }
    // Reduce penalty for longer strings.
    finalScore = 0.5 * (runningScore / strLength + runningScore / wordLength) / fuzzies;
    if ((lWord[0] === lString[0]) && (finalScore < 0.85)) {
        finalScore += 0.15;
    }
    return finalScore;
};

var csComp;
(function (csComp) {
    var Helpers;
    (function (Helpers) {
        function getColorFromStringValue(v, gs) {
            if (gs.activeLegend) {
                var defaultcolor = '#000000';
                var l = gs.activeLegend;
                var s = l.id;
                var n = l.legendEntries.length;
                if (n == 0)
                    return (defaultcolor);
                if (l.legendKind == 'discretestrings') {
                    var i = 0;
                    while (i < n) {
                        var e = l.legendEntries[i];
                        if (v == e.stringValue) {
                            return e.color;
                        }
                        i++;
                    }
                    return defaultcolor;
                }
                return defaultcolor;
            }
        }
        Helpers.getColorFromStringValue = getColorFromStringValue;
        function getColorFromStringLegend(v, l) {
            if (true) {
                var defaultcolor = '#000000';
                var s = l.id;
                var n = l.legendEntries.length;
                if (n == 0)
                    return (defaultcolor);
                if (l.legendKind == 'discretestrings') {
                    var i = 0;
                    while (i < n) {
                        var e = l.legendEntries[i];
                        if (v == e.stringValue) {
                            return e.color;
                        }
                        i++;
                    }
                    return defaultcolor;
                }
                return defaultcolor;
            }
        }
        Helpers.getColorFromStringLegend = getColorFromStringLegend;
        function getColorFromLegend(v, l) {
            var defaultcolor = '#000000';
            var s = l.id;
            var n = l.legendEntries.length;
            if (n == 0)
                return (defaultcolor);
            var e1 = l.legendEntries[0]; // first
            var e2 = l.legendEntries[n - 1]; // last
            if (l.legendKind == 'interpolated') {
                // interpolate between two colors
                if (v < e1.value)
                    return e1.color;
                if (v > e2.value)
                    return e2.color;
                var i = 0;
                while (i < n - 1) {
                    e1 = l.legendEntries[i];
                    e2 = l.legendEntries[i + 1];
                    if ((v >= e1.value) && (v <= e2.value)) {
                        var bezInterpolator = chroma.interpolate.bezier([e1.color, e2.color]);
                        var r = bezInterpolator((v - e1.value) / (e2.value - e1.value)).hex();
                        return r;
                    }
                    i++;
                }
                return (defaultcolor);
            }
            if (l.legendKind == 'discrete') {
                if (v < e1.interval.min)
                    return l.legendEntries[0].color;
                if (v > e2.interval.max)
                    return l.legendEntries[n - 1].color;
                var i = 0;
                while (i < n) {
                    var e = l.legendEntries[i];
                    if ((v >= e.interval.min) && (v <= e.interval.max)) {
                        return e.color;
                    }
                    i++;
                }
                return defaultcolor;
            }
            return defaultcolor;
        }
        Helpers.getColorFromLegend = getColorFromLegend;
        function getColor(v, gs) {
            if (gs.activeLegend) {
                return getColorFromLegend(v, gs.activeLegend);
            }
            if (v > gs.info.sdMax)
                return gs.colors[gs.colors.length - 1];
            if (v < gs.info.sdMin)
                return gs.colors[0];
            //var bezInterpolator = chroma.interpolate.bezier(gs.colors);
            //var r = bezInterpolator((v - gs.info.sdMin) / (gs.info.sdMax - gs.info.sdMin)).hex();
            var color = d3.scale.linear()
                .domain([gs.info.sdMin, gs.info.mean, gs.info.sdMax])
                .range(gs.colors);
            var hexColor = color(v).toString();
            return hexColor;
        }
        Helpers.getColor = getColor;
        /**
         * Extract a valid color string, without transparency.
         */
        function getColorString(color, defaultColor) {
            if (defaultColor === void 0) { defaultColor = '#f00'; }
            if (!color)
                return defaultColor;
            if (color.length == 4 || color.length == 7)
                return color;
            if (color.length == 9)
                return '#' + color.substr(3, 6);
            return defaultColor;
        }
        Helpers.getColorString = getColorString;
    })(Helpers = csComp.Helpers || (csComp.Helpers = {}));
})(csComp || (csComp = {}));

var csComp;
(function (csComp) {
    (function (FileType) {
        FileType[FileType["Js"] = 0] = "Js";
        FileType[FileType["Css"] = 1] = "Css";
    })(csComp.FileType || (csComp.FileType = {}));
    var FileType = csComp.FileType;
    var Utils = (function () {
        function Utils() {
        }
        /**
        * Load a JavaScript or CSS file dynamically by adding it to the end of the HEAD section in your document.
        * See also: http://www.javascriptkit.com/javatutors/loadjavascriptcss.shtml
        */
        Utils.loadJsCssfile = function (filename, filetype, callback) {
            if (Utils.loadedFiles.indexOf(filename) > 0)
                return;
            Utils.loadedFiles.push(filename);
            switch (filetype) {
                case FileType.Js:
                    var fileRef = document.createElement('script');
                    fileRef.setAttribute("type", "text/javascript");
                    fileRef.setAttribute("src", filename);
                    if (callback) {
                        fileRef.onload = function (evt) {
                            callback(evt);
                        };
                    }
                    document.getElementsByTagName("head")[0].appendChild(fileRef);
                    break;
                case FileType.Css:
                    var linkRef = document.createElement("link");
                    linkRef.setAttribute("rel", "stylesheet");
                    linkRef.setAttribute("type", "text/css");
                    linkRef.setAttribute("href", filename);
                    if (callback) {
                        linkRef.onload = function (evt) {
                            callback(evt);
                        };
                    }
                    document.getElementsByTagName("head")[0].appendChild(linkRef);
                    break;
            }
        };
        Utils.loadedFiles = [];
        return Utils;
    })();
    csComp.Utils = Utils;
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
            STYLE_INFO: 'At the moment, no style has been selected. In order to add a style, click on an icon or area on the map, and click on the style icon (<span class="smallStyleIcon"></span>) in the right menu. This will create a filter for the selected property.',
            FEATURES: 'Features',
            LEGEND: 'Legend',
            SEARCH: 'Search',
            MAP_FEATURES: 'Map features',
            SPEEDS_TAOUFIK: 'speed colors Taoufik',
            SPEEDS_GOOGLEMAPS: 'speed colors Google Maps',
            VERWARMINGSSYSTEEM: 'Heating system',
            PERCENTAGES_V1: 'percentages v1',
            ORANGE_RED: 'orange - red',
            WHITE_RED: 'white - red',
            RED_WHITE: 'red - white',
            RED_WHITE_BLUE: 'red - white - blue',
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
            EXPERTMODE: {
                BEGINNER: 'Beginner',
                INTERMEDIATE: 'Intermediate',
                EXPERT: 'Expert',
                EXPLANATION: 'Select your expertise in order to unlock more functionality.'
            },
            LAYER_SERVICE: {
                RELOAD_PROJECT_TITLE: 'Data is reloaded',
                RELOAD_PROJECT_MSG: 'After switching the language, we need to reload all the map data. Our appologies for the inconvenience.'
            },
            HEATMAP: {
                DESCRIPTION: '<h4>Heatmap</h4><p  style="text-align: left; margin-left:5px;">Heatmap highlights areas on the map that fulfill multiple selected criteria.',
                INFO: 'At the moment, no map layers are loaded that contain a heatmap. Open another map layer to use it.',
                INFO_EXPERT: 'At the moment, no map layers are loaded that contain a heatmap. Open another map layer to use it, or create a new heatmap using the wizard.',
                SHOW_FEATURE_MSG: 'Select a feature on the map to see the heatmap.',
                TOTAL_RESULT: 'Combined result',
                DELETE_MSG: 'Delete "{0}"',
                DELETE_MSG2: 'Are you sure?',
                EDITOR_TITLE: 'Heatmap Editor',
                MAIN_FEATURE: 'Select the main feature',
                PROPERTIES: 'Select the properties',
                INTENSITY_SCALE: 'Intensity scale',
                RESOLUTION: 'Resolution',
                TITLE: 'Title... *',
                TITLE_TAG: 'Title',
                SCALE_MIN_TITLE: '[Min. scale]',
                SCALE_MAX_TITLE: '[Max. scale]',
                MIN_MAX_ZOOM: 'Min./Max. zoom',
                AT_LOCATION_VALUE: '[Weight at location]',
                DISTANCE_MAX_VALUE: '[Ideal distance]',
                LOST_INTEREST_VALUE: '[Lost interest distance]',
                LINEAR_ASC_DESC: 'Linearly increasing, then decreasing function.',
                ADD_HEATMAP: 'Add a new heatmap.',
                DELETE_HEATMAP: 'Delete the heatmap.',
                EDIT_HEATMAP: 'Edit the heatmap.',
                EXPORT_HEATMAP: 'Export the heatmap.'
            },
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
            STYLE_INFO: 'Momenteel zijn er geen stijlen geselecteerd. Klik op een icoon of gebied op de kaart, en klik op het stijl icoontje (<span class="smallStyleIcon"></span>) in het rechter menu om een stijl toe te voegen. Dan wordt er een stijl aangemaakt voor de geselecteerde eigenschap.',
            FEATURES: 'Features',
            LEGEND: 'Legenda',
            SEARCH: 'Zoeken',
            MAP_FEATURES: 'Kaartfeatures',
            SPEEDS_TAOUFIK: 'snelheden legenda Taoufik',
            SPEEDS_GOOGLEMAPS: 'snelheden legenda Google Maps',
            VERWARMINGSSYSTEEM: 'Verwarmingssysteem',
            PERCENTAGES_V1: 'percentages v1',
            ORANGE_RED: 'oranje - rood',
            WHITE_RED: 'wit - rood',
            RED_WHITE_BLUE: 'rood - wit - blauw',
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
            EXPERTMODE: {
                BEGINNER: 'Novice',
                INTERMEDIATE: 'Gevorderd',
                EXPERT: 'Expert',
                EXPLANATION: 'Selecteer uw expertise om meer functionaliteit te kunnen gebruiken.'
            },
            LAYER_SERVICE: {
                RELOAD_PROJECT_TITLE: 'Data wordt opnieuw geladen',
                RELOAD_PROJECT_MSG: 'Na het wisselen van de taal moet de kaartdata opnieuw ingelezen worden. Excuses voor het ongemak.'
            },
            HEATMAP: {
                DESCRIPTION: '<h4>Toelichting heatmap</h4><div style="text-align: left; margin-left:5px;"><p>Heatmap laat gebieden op de kaart oplichten die voldoen aan bepaalde criteria.',
                INFO: 'Momenteel zijn er geen kaartlagen geopend die heatmaps bevatten.',
                INFO_EXPERT: 'Momenteel zijn er geen kaartlagen geopend die heatmaps bevatten. Open een kaartlaag en maak een nieuwe heatmap aan met behulp van de wizard.',
                SHOW_FEATURE_MSG: 'Selecteer een feature op de kaart om de heatmap resultaten in detail te bekijken.',
                TOTAL_RESULT: 'Gecombineerd resultaat',
                DELETE_MSG: 'Verwijder "{0}"',
                DELETE_MSG2: 'Weet u het zeker?',
                EDITOR_TITLE: 'Heatmap Editor',
                MAIN_FEATURE: 'Selecteer het type feature',
                PROPERTIES: 'Selecteer de eigenschappen',
                RESOLUTION: 'Resolutie',
                INTENSITY_SCALE: 'Intensiteitsschaal',
                TITLE: 'Titel... *',
                TITLE_TAG: 'Titel',
                TOGGLE_SPARKLINE: 'Toon of verberg de histogram en score functie.',
                SCALE_MIN_TITLE: '[Schaal max]',
                SCALE_MAX_TITLE: '[Schaal min]',
                MIN_MAX_ZOOM: 'Min./Max. zoom',
                AT_LOCATION_VALUE: '[Waarde op locatie]',
                DISTANCE_MAX_VALUE: '[Ideale afstand]',
                LOST_INTEREST_VALUE: '[Negeer vanaf afstand]',
                LINEAR_ASC_DESC: 'Linear toenemende, dan afnemende functie.',
                ADD_HEATMAP: 'Maak een nieuwe heatmap.',
                DELETE_HEATMAP: 'Verwijder de heatmap.',
                EDIT_HEATMAP: 'Bewerk de heatmap.',
                EXPORT_HEATMAP: 'Exporteer de heatmap.'
            },
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

var BaseMapList;
(function (BaseMapList) {
    /**
      * Config
      */
    var moduleName = 'csComp';
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
        '$window', '$compile',
        function ($window, $compile) {
            return {
                terminal: false,
                restrict: 'E',
                scope: {},
                //template  : html,   // I use gulp automatian to compile the FeatureProperties.tpl.html to a simple TS file, FeatureProperties.tpl.ts, which contains the html as string. The advantage is that you can use HTML intellisence in the html file.
                templateUrl: 'directives/BaseMapList/BaseMapList.tpl.html',
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
    ]);
})(BaseMapList || (BaseMapList = {}));

var BaseMapList;
(function (BaseMapList) {
    BaseMapList.html = '<div>    <h4 class="leftpanel-header" translate="MAP"></h4>    <div data-ng-repeat="(key, value) in vm.$mapService.baseLayers" style="clear:left;">        <div ng-click="vm.selectBaseLayer(key);" class="select-basestyle">            <img data-ng-src="{{value.options.preview}}" class="preview-base-layer" style="margin-bottom:5px" />            <div style="margin:3px;float:left">                <span style="font-size: 18px;font-weight: bold;">{{key}}</span><br />                {{value.options.subtitle}}            </div>        </div>    </div></div>';
})(BaseMapList || (BaseMapList = {}));

var BaseMapList;
(function (BaseMapList) {
    var BaseMapListCtrl = (function () {
        // dependencies are injected via AngularJS $injector
        // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
        function BaseMapListCtrl($scope, $mapService, $messageBusService) {
            this.$scope = $scope;
            this.$mapService = $mapService;
            this.$messageBusService = $messageBusService;
            $scope.vm = this;
        }
        BaseMapListCtrl.prototype.selectBaseLayer = function (key) {
            this.$messageBusService.publish("map", "setbaselayer", key);
        };
        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
        BaseMapListCtrl.$inject = [
            '$scope',
            'mapService',
            'messageBusService'
        ];
        return BaseMapListCtrl;
    })();
    BaseMapList.BaseMapListCtrl = BaseMapListCtrl;
})(BaseMapList || (BaseMapList = {}));

var Charts;
(function (Charts) {
    'use strict';
    var ChartHelpers = (function () {
        function ChartHelpers() {
        }
        /**
        * Returns the index and value of the maximum.
        */
        ChartHelpers.max = function (arr) {
            var max = arr[0];
            var maxIndex = 0;
            for (var i = 1; i < arr.length; i++) {
                if (arr[i] > max) {
                    maxIndex = i;
                    max = arr[i];
                }
            }
            return { maxIndex: maxIndex, max: max };
        };
        /**
        * Returns the index and value of the minimum.
        */
        ChartHelpers.min = function (arr) {
            var min = arr[0];
            var minIndex = 0;
            for (var i = 1; i < arr.length; i++) {
                if (arr[i] < min) {
                    minIndex = i;
                    min = arr[i];
                }
            }
            return { minIndex: minIndex, min: min };
        };
        /**
        * Convert a timestamp to string.
        */
        ChartHelpers.timestampToString = function (ts) {
            var date = new Date(ts);
            var dateString = String.format("{0}-{1:00}-{2:00}", date.getFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
            if (date.getUTCHours() > 0 || date.getUTCMinutes() > 0)
                dateString += String.format(" {0:00}:{1:00}", date.getUTCHours(), date.getUTCMinutes());
            return dateString;
        };
        // Easy way to bind multiple functions to window.onresize
        // TODO: give a way to remove a function after its bound, other than removing all of them
        ChartHelpers.windowResize = function (fun) {
            if (fun === undefined)
                return;
            var oldresize = window.onresize;
            window.onresize = function (e) {
                if (typeof oldresize == 'function')
                    oldresize(e);
                fun(e);
            };
        };
        ChartHelpers.initializeMargin = function (scope, attrs) {
            var margin = scope.$eval(attrs.margin) || {
                left: 50,
                top: 50,
                bottom: 50,
                right: 50
            };
            if (typeof margin !== 'object') {
                // we were passed a vanilla int, convert to full margin object
                margin = {
                    left: margin,
                    top: margin,
                    bottom: margin,
                    right: margin
                };
            }
            scope.margin = margin;
        };
        ChartHelpers.getD3Selector = function (attrs, element) {
            if (!attrs.id) {
                //if an id is not supplied, create a random id.
                var dataAttributeChartID;
                if (!attrs['data-chartid']) {
                    dataAttributeChartID = 'chartid' + Math.floor(Math.random() * 1000000001);
                    angular.element(element).attr('data-chartid', dataAttributeChartID);
                }
                else {
                    dataAttributeChartID = attrs['data-chartid'];
                }
                return '[data-chartid=' + dataAttributeChartID + ']';
            }
            else {
                return '#' + attrs.id;
            }
        };
        ChartHelpers.initializeLegendMargin = function (scope, attrs) {
            var margin = (scope.$eval(attrs.legendmargin) || {
                left: 0,
                top: 5,
                bottom: 5,
                right: 0
            });
            if (typeof (margin) !== 'object') {
                // we were passed a vanilla int, convert to full margin object
                margin = {
                    left: margin,
                    top: margin,
                    bottom: margin,
                    right: margin
                };
            }
            scope.legendmargin = margin;
        };
        ChartHelpers.defaultColor = function () {
            var colors = d3.scale.category20().range();
            return function (d, i) { return d.color || colors[i % colors.length]; };
        };
        ChartHelpers.configureLegend = function (chart, scope, attrs) {
            if (chart.legend && attrs.showlegend && (attrs.showlegend === 'true')) {
                ChartHelpers.initializeLegendMargin(scope, attrs);
                chart.legend.margin(scope.legendmargin);
                chart.legend.width(attrs.legendwidth === undefined ? 400 : (+attrs.legendwidth));
                chart.legend.height(attrs.legendheight === undefined ? 20 : (+attrs.legendheight));
                chart.legend.key(attrs.legendkey === undefined ? function (d) {
                    return d.key;
                } : scope.legendkey());
                chart.legend.color(attrs.legendcolor === undefined ? ChartHelpers.defaultColor() : scope.legendcolor());
                chart.legend.align(attrs.legendalign === undefined ? true : (attrs.legendalign === 'true'));
                chart.legend.rightAlign(attrs.legendrightalign === undefined ? true : (attrs.legendrightalign === 'true'));
                chart.legend.updateState(attrs.legendupdatestate === undefined ? true : (attrs.legendupdatestate === 'true'));
                chart.legend.radioButtonMode(attrs.legendradiobuttonmode === undefined ? false : (attrs.legendradiobuttonmode === 'true'));
            }
        };
        ChartHelpers.checkElementID = function (scope, attrs, element, chart, data) {
            //ChartHelpers.configureXaxis(chart, scope, attrs);
            //ChartHelpers.configureX2axis(chart, scope, attrs);
            //ChartHelpers.configureYaxis(chart, scope, attrs);
            //ChartHelpers.configureY1axis(chart, scope, attrs);
            //ChartHelpers.configureY2axis(chart, scope, attrs);
            ChartHelpers.configureLegend(chart, scope, attrs);
            //ChartHelpers.processEvents(chart, scope);
            var d3Select = ChartHelpers.getD3Selector(attrs, element);
            if (angular.isArray(data) && data.length === 0) {
                d3.select(d3Select + ' svg').remove();
            }
            if (d3.select(d3Select + ' svg').empty()) {
                d3.select(d3Select).append('svg');
            }
            d3.select(d3Select + ' svg').attr('viewBox', '0 0 ' + scope.width + ' ' + scope.height).datum(data).transition().duration(attrs.transitionduration === undefined ? 250 : +attrs.transitionduration).call(chart);
        };
        ChartHelpers.updateDimensions = function (scope, attrs, element, chart) {
            if (chart) {
                chart.width(scope.width).height(scope.height);
                var d3Select = ChartHelpers.getD3Selector(attrs, element);
                d3.select(d3Select + ' svg').attr('viewBox', '0 0 ' + scope.width + ' ' + scope.height);
                ChartHelpers.windowResize(chart);
                scope.chart.update();
            }
        };
        return ChartHelpers;
    })();
    Charts.ChartHelpers = ChartHelpers;
})(Charts || (Charts = {}));

var Charts;
(function (Charts) {
    'use strict';
    /**
      * Config
      */
    var moduleName = 'csComp';
    /**
      * Module
      */
    Charts.myModule;
    try {
        Charts.myModule = angular.module(moduleName);
    }
    catch (err) {
        // named module does not exist, so create one
        Charts.myModule = angular.module(moduleName, []);
    }
    /**
      * Directive to create a sparkline chart.
      *
      * @seealso: http://odiseo.net/angularjs/proper-use-of-d3-js-with-angular-directives
      * @seealso: http://cmaurer.github.io/angularjs-nvd3-directives/sparkline.chart.html
      * @seealso: http://www.tnoda.com/blog/2013-12-19
      */
    Charts.myModule
        .directive('sparklineChart', ['$filter',
        function ($filter) {
            return {
                terminal: true,
                restrict: 'EA',
                scope: {
                    timestamps: '=',
                    sensor: '=',
                    showaxis: '=',
                    closed: '=',
                    width: '@',
                    height: '@',
                    margin: '@'
                },
                //controller: [
                //    '$scope',
                //    '$element',
                //    '$attrs',
                //    function ($scope, $element, $attrs) {
                //        $scope.d3Call    = function (data, chart) {
                //            ChartHelpers.checkElementID($scope, $attrs, $element, chart, data);
                //        };
                //    }
                //],
                link: function (scope, element, attrs) {
                    var doDraw = (function () {
                        if (scope.timestamps != null && scope.sensor != null && scope.timestamps.length > 0) {
                            var margin = scope.margin || { top: 15, right: 5, bottom: 0, left: 10 };
                            var width = scope.width || 100;
                            var height = scope.height || 70;
                            var showAxis = typeof scope.showaxis !== 'undefined' && scope.showaxis;
                            var closed = typeof scope.closed !== 'undefined' && scope.closed;
                            var cursorTextHeight = 12; // + (showAxis ? 5 : 0); // leave room for the cursor text (timestamp | measurement)
                            $(element[0]).empty();
                            var chart = d3.select(element[0])
                                .append('svg:svg')
                                .attr('width', width)
                                .attr('height', height);
                            var marginAxis = showAxis
                                ? { top: 0, right: 0, bottom: 20, left: 10 }
                                : { top: 0, right: 0, bottom: 0, left: 0 };
                            var x = d3.scale.linear().range([margin.left + marginAxis.left, width - margin.left - margin.right - marginAxis.left - marginAxis.right]);
                            var y = d3.scale.linear().range([height - margin.bottom - marginAxis.bottom, margin.top + marginAxis.top + cursorTextHeight]);
                            var bisect = d3.bisector(function (d) { return d.time; }).left;
                            var line = d3.svg.line()
                                .interpolate((closed) ? "linear-closed" : "cardinal")
                                .x(function (d) { return x(d.time); })
                                .y(function (d) { return y(d.measurement); });
                            var data = [];
                            //data.push({time:scope.timestamps[0],measurement:0});
                            for (var i = 0; i < scope.timestamps.length; i++) {
                                data.push({ time: scope.timestamps[i], measurement: scope.sensor[i] });
                            }
                            //data.push({time:scope.timestamps[scope.timestamps.length-1],measurement:0});
                            x.domain(d3.extent(data, function (d) { return d.time; }));
                            y.domain(d3.extent(data, function (d) { return d.measurement; }));
                            var s = [];
                            if (closed && data.length > 0)
                                s.push({ time: data[0].time, measurement: 0 });
                            data.forEach(function (d) { return s.push(d); });
                            if (closed && data.length > 0)
                                s.push({ time: data[data.length - 1].time, measurement: 0 });
                            var path = chart.append("svg:path")
                                .attr("d", line(s))
                                .attr('class', 'sparkline-path')
                                .style('fill', (closed) ? 'steelblue' : 'none');
                            // draw a circle around the max and min value
                            var measurements = data.map(function (d) { return d.measurement; });
                            var min = Charts.ChartHelpers.min(measurements);
                            var max = Charts.ChartHelpers.max(measurements);
                            chart.append('circle')
                                .attr('class', 'sparkcircle-max')
                                .attr('cx', x(data[max.maxIndex].time))
                                .attr('cy', y(max.max))
                                .attr('r', 4);
                            chart.append('circle')
                                .attr('class', 'sparkcircle-min')
                                .attr('cx', x(data[min.minIndex].time))
                                .attr('cy', y(min.min))
                                .attr('r', 4);
                            if (showAxis) {
                                //var xAxis = d3.svg.axis()
                                //    .scale(x)
                                //    .orient("bottom")
                                //    .ticks(d3.time.months, 2);  //Set rough # of ticks
                                //chart.append("g")
                                //    .attr("class", "sparkline-axis")
                                //    .attr("transform", "translate(0," + (height - margin.bottom - marginAxis.bottom) + ")")
                                //    .call(xAxis);
                                var strokeLength = 6;
                                // Draw min/max at x and y axis
                                var xbor = d3.min(x.range()), xmin = xbor - strokeLength, xmax = d3.max(x.range()), ybor = d3.max(y.range()), ymin = d3.min(y.range()), ymax = ybor + strokeLength;
                                // y-axis, max
                                chart.append('line')
                                    .attr("x1", xmin)
                                    .attr("y1", ymin)
                                    .attr("x2", xbor)
                                    .attr("y2", ymin)
                                    .attr("stroke", "black");
                                chart.append("text")
                                    .attr("x", xmin - 2)
                                    .attr("y", ymin)
                                    .attr("dy", ".35em")
                                    .style("text-anchor", "end")
                                    .text(d3.max(y.domain()));
                                // y-axis, min
                                chart.append('line')
                                    .attr("x1", xmin)
                                    .attr("y1", ybor)
                                    .attr("x2", xbor)
                                    .attr("y2", ybor)
                                    .attr("stroke", "black");
                                chart.append("text")
                                    .attr("x", xmin - 2)
                                    .attr("y", ybor)
                                    .attr("dy", ".35em")
                                    .style("text-anchor", "end")
                                    .text(d3.min(y.domain()));
                                // x-axis, min
                                chart.append('line')
                                    .attr("x1", xbor)
                                    .attr("y1", ymax)
                                    .attr("x2", xbor)
                                    .attr("y2", ybor)
                                    .attr("stroke", "black");
                                chart.append("text")
                                    .attr("x", xbor)
                                    .attr("y", ymax + 9)
                                    .attr("dy", ".35em")
                                    .style("text-anchor", "start")
                                    .text(Charts.ChartHelpers.timestampToString(d3.min(x.domain())));
                                // x-axis, max
                                chart.append('line')
                                    .attr("x1", xmax)
                                    .attr("y1", ymax)
                                    .attr("x2", xmax)
                                    .attr("y2", ybor)
                                    .attr("stroke", "black");
                                chart.append("text")
                                    .attr("x", xmax)
                                    .attr("y", ymax + 9)
                                    .attr("dy", ".35em")
                                    .style("text-anchor", "end")
                                    .text(Charts.ChartHelpers.timestampToString(d3.max(x.domain())));
                            }
                            // draw a line at the current cursor position
                            var cursor = chart.append("line")
                                .attr("x1", 0)
                                .attr("y1", 0)
                                .attr("x2", 0)
                                .attr("y2", 0)
                                .attr("opacity", 0)
                                .attr("stroke", "black");
                            var timestampText = chart.append("text")
                                .attr("x", 0)
                                .attr("y", 0)
                                .attr("dy", ".35em")
                                .attr("opacity", 0)
                                .style("text-anchor", "end")
                                .text("");
                            var measurementText = chart.append("text")
                                .attr("x", 0)
                                .attr("y", 0)
                                .attr("dy", ".35em")
                                .attr("opacity", 0)
                                .text("");
                            var pathEl = path.node();
                            var pathLength = pathEl.getTotalLength();
                            chart
                                .on("mouseout", function () {
                                cursor.attr("opacity", 0);
                                timestampText.attr("opacity", 0);
                                measurementText.attr("opacity", 0);
                            })
                                .on("mousemove", function () {
                                var offsetLeft = element[0].getBoundingClientRect().left;
                                var xpos = d3.event.clientX - offsetLeft;
                                var beginning = xpos, end = pathLength, target;
                                while (true) {
                                    target = Math.floor((beginning + end) / 2);
                                    var pos = pathEl.getPointAtLength(target);
                                    if ((target === end || target === beginning) && pos.x !== xpos) {
                                        break;
                                    }
                                    if (pos.x > xpos)
                                        end = target;
                                    else if (pos.x < xpos)
                                        beginning = target;
                                    else
                                        break; //position found
                                }
                                // using the x scale, in this case a d3 time scale
                                // use the .invert() function to interpolate a date along the scale
                                // given the x-coordinates of the mouse
                                var t0 = x.invert(d3.mouse(this)[0]);
                                // using the interpolated date, find an index in the sorted data
                                // this would be the index suitable for insertion
                                var i = bisect(data, t0, 1);
                                if (0 < i && i < data.length) {
                                    // now that we know where in the data the interpolated date would "fit"
                                    // between two values, pull them both back as temporaries
                                    var d0 = data[i - 1];
                                    var d1 = data[i];
                                    // now, examine which of the two dates we are "closer" to
                                    // to do this, compare the delta values
                                    var d = t0 - d0.time > d1.time - t0 ? d1 : d0;
                                }
                                else if (i <= 0)
                                    d = data[0];
                                else
                                    d = data[data.length - 1];
                                xpos = x(d.time);
                                // draw
                                cursor
                                    .attr("x1", xpos)
                                    .attr("y1", 0)
                                    .attr("x2", xpos)
                                    .attr("y2", d3.max(y.range()) + (strokeLength || 0))
                                    .attr("opacity", 1);
                                timestampText
                                    .attr("x", xpos - 6)
                                    .attr("y", 4)
                                    .attr("dy", ".35em")
                                    .attr("opacity", 1)
                                    .text(Charts.ChartHelpers.timestampToString(d.time));
                                measurementText
                                    .attr("x", xpos + 6)
                                    .attr("y", 4)
                                    .attr("dy", ".35em")
                                    .attr("opacity", 1)
                                    .text(d.measurement);
                            });
                        }
                    });
                    doDraw();
                    scope.$watchCollection("sensor", function () { console.log('redraw chart'); doDraw(); });
                    //scope.closed = true;
                }
            };
        }])
        .directive('barChart', ['$filter',
        function ($filter) {
            return {
                terminal: true,
                restrict: 'EA',
                scope: {
                    data: '=',
                },
                link: function (scope, element, attrs) {
                    //in D3, any selection[0] contains the group
                    //selection[0][0] is the DOM node
                    //but we won't need that this time
                    var chart = d3.select(element[0]);
                    chart.append("div").attr("class", "chart")
                        .selectAll('div')
                        .data(scope.data).enter().append("div")
                        .transition().ease("elastic")
                        .style("width", function (d) { return d + "%"; })
                        .text(function (d) { return d + "%"; });
                    //to our original directive markup bars-chart
                    //we add a div with out chart stling and bind each
                    //data entry to the chart
                }
            };
        }
    ])
        .directive('radialChart', ['$filter',
        function ($filter) {
            return {
                terminal: true,
                restrict: 'EA',
                scope: {
                    value: '=',
                    maintitle: '=',
                    min: '@',
                    max: '@'
                },
                link: function (scope, element, attrs) {
                    console.log('chart');
                    //in D3, any selection[0] contains the group
                    //selection[0][0] is the DOM node
                    //but we won't need that this time
                    var chart = d3.select(element[0]);
                    //to our original directive markup bars-chart
                    //we add a div with out chart stling and bind each
                    //data entry to the chart
                    var measurementText = chart.append("text")
                        .attr("x", 0)
                        .attr("y", 0)
                        .attr("dy", ".35em")
                        .attr("opacity", 0)
                        .text(scope.maintitle);
                    //a little of magic: setting it's width based
                    //on the data value (d)
                    //and text all with a smooth transition
                }
            };
        }
    ]);
})(Charts || (Charts = {}));

/**
 Copyright (c) 2014 BrightPoint Consulting, Inc.

 Permission is hereby granted, free of charge, to any person
 obtaining a copy of this software and associated documentation
 files (the "Software"), to deal in the Software without
 restriction, including without limitation the rights to use,
 copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following
 conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 OTHER DEALINGS IN THE SOFTWARE.
 */
function radialProgress(parent) {
    var _data = null, _duration = 1000, _selection, _margin = { top: 0, right: 0, bottom: 30, left: 0 }, _width = 300, _height = 300, _diameter = 150, _label = "", _fontSize = 10;
    var _mouseClick;
    var _value = 0, _minValue = 0, _maxValue = 100;
    var _currentArc = 0, _currentArc2 = 0, _currentValue = 0;
    var _arc = d3.svg.arc()
        .startAngle(0 * (Math.PI / 180)); //just radians
    var _arc2 = d3.svg.arc()
        .startAngle(0 * (Math.PI / 180))
        .endAngle(0); //just radians
    _selection = d3.select(parent);
    function component() {
        _selection.each(function (data) {
            // Select the svg element, if it exists.
            var svg = d3.select(this).selectAll("svg").data([data]);
            var enter = svg.enter().append("svg").attr("class", "radial-svg").append("g");
            measure();
            svg.attr("width", _width)
                .attr("height", _height);
            var background = enter.append("g").attr("class", "component")
                .attr("cursor", "pointer")
                .on("click", onMouseClick);
            _arc.endAngle(360 * (Math.PI / 180));
            background.append("rect")
                .attr("class", "background")
                .attr("width", _width)
                .attr("height", _height);
            background.append("path")
                .attr("transform", "translate(" + _width / 2 + "," + _width / 2 + ")")
                .attr("d", _arc);
            background.append("text")
                .attr("class", "label")
                .attr("transform", "translate(" + _width / 2 + "," + (_width + _fontSize) + ")")
                .text(_label);
            var g = svg.select("g")
                .attr("transform", "translate(" + _margin.left + "," + _margin.top + ")");
            _arc.endAngle(_currentArc);
            enter.append("g").attr("class", "arcs");
            var path = svg.select(".arcs").selectAll(".arc").data(data);
            path.enter().append("path")
                .attr("class", "arc")
                .attr("transform", "translate(" + _width / 2 + "," + _width / 2 + ")")
                .attr("d", _arc);
            //Another path in case we exceed 100%
            var path2 = svg.select(".arcs").selectAll(".arc2").data(data);
            path2.enter().append("path")
                .attr("class", "arc2")
                .attr("transform", "translate(" + _width / 2 + "," + _width / 2 + ")")
                .attr("d", _arc2);
            enter.append("g").attr("class", "labels");
            var label = svg.select(".labels").selectAll(".label").data(data);
            label.enter().append("text")
                .attr("class", "label")
                .attr("y", _width / 2 + _fontSize / 3)
                .attr("x", _width / 2)
                .attr("cursor", "pointer")
                .attr("width", _width)
                .text(function (d) { return Math.round((_value - _minValue) / (_maxValue - _minValue) * 100) + "%"; })
                .style("font-size", _fontSize + "px")
                .on("click", onMouseClick);
            path.exit().transition().duration(500).attr("x", 1000).remove();
            layout(svg);
            function layout(svg) {
                var ratio = (_value - _minValue) / (_maxValue - _minValue);
                var endAngle = Math.min(360 * ratio, 360);
                endAngle = endAngle * Math.PI / 180;
                path.datum(endAngle);
                path.transition().duration(_duration)
                    .attrTween("d", arcTween);
                if (ratio > 1) {
                    path2.datum(Math.min(360 * (ratio - 1), 360) * Math.PI / 180);
                    path2.transition().delay(_duration).duration(_duration)
                        .attrTween("d", arcTween2);
                }
                label.datum(Math.round(ratio * 100));
                label.transition().duration(_duration)
                    .tween("text", labelTween);
            }
        });
        function onMouseClick(d) {
            if (typeof _mouseClick == "function") {
                _mouseClick.call();
            }
        }
    }
    function labelTween(a) {
        var i = d3.interpolate(_currentValue, a);
        _currentValue = i(0);
        return function (t) {
            _currentValue = i(t);
            this.textContent = Math.round(i(t)) + "%";
        };
    }
    function arcTween(a) {
        var i = d3.interpolate(_currentArc, a);
        return function (t) {
            _currentArc = i(t);
            return _arc.endAngle(i(t))();
        };
    }
    function arcTween2(a) {
        var i = d3.interpolate(_currentArc2, a);
        return function (t) {
            return _arc2.endAngle(i(t))();
        };
    }
    function measure() {
        _width = _diameter - _margin.right - _margin.left - _margin.top - _margin.bottom;
        _height = _width;
        _fontSize = _width * .2;
        _arc.outerRadius(_width / 2);
        _arc.innerRadius(_width / 2 * .85);
        _arc2.outerRadius(_width / 2 * .85);
        _arc2.innerRadius(_width / 2 * .85 - (_width / 2 * .15));
    }
    component.render = function () {
        measure();
        component();
        return component;
    }(component).value = function (_) {
        if (!arguments.length)
            return _value;
        _value = [_];
        _selection.datum([_value]);
        return component;
    }(component).margin = function (_) {
        if (!arguments.length)
            return _margin;
        _margin = _;
        return component;
    };
    component.diameter = function (_) {
        if (!arguments.length)
            return _diameter;
        _diameter = _;
        return component;
    };
    component.minValue = function (_) {
        if (!arguments.length)
            return _minValue;
        _minValue = _;
        return component;
    };
    component.maxValue = function (_) {
        if (!arguments.length)
            return _maxValue;
        _maxValue = _;
        return component;
    };
    component.label = function (_) {
        if (!arguments.length)
            return _label;
        _label = _;
        return component;
    };
    component._duration = function (_) {
        if (!arguments.length)
            return _duration;
        _duration = _;
        return component;
    };
    component.onClick = function (_) {
        if (!arguments.length)
            return _mouseClick;
        _mouseClick = _;
        return component;
    };
    return component;
}

var Dashboard;
(function (Dashboard) {
    /**
      * Config
      */
    var moduleName = 'csComp';
    /**
      * Module
      */
    Dashboard.myModule;
    try {
        Dashboard.myModule = angular.module(moduleName);
    }
    catch (err) {
        // named module does not exist, so create one
        Dashboard.myModule = angular.module(moduleName, []);
    }
    /**
      * Directive to display the available map layers.
      */
    Dashboard.myModule.directive('dashboardirective', [
        '$window', '$compile',
        function ($window, $compile) {
            return {
                terminal: false,
                restrict: 'E',
                scope: {
                    container: '='
                },
                //template: html, // I use gulp automatian to compile the FeatureProperties.tpl.html to a simple TS file, FeatureProperties.tpl.ts, which contains the html as string. The advantage is that you can use HTML intellisence in the html file.
                templateUrl: 'directives/Dashboard/Dashboard.tpl.html',
                link: function (scope, element, attrs) {
                    // Deal with resizing the element list
                    angular.element($window).bind('resize', function () {
                        //scope.onResizeFunction();
                        scope.$apply();
                    });
                    scope.container = attrs.container;
                    //var s = jQuery.parseJSON(attrs.param);
                    scope.initDashboard();
                },
                replace: false,
                transclude: true,
                controller: Dashboard.DashboardCtrl
            };
        }
    ]);
})(Dashboard || (Dashboard = {}));

var Dashboard;
(function (Dashboard) {
    Dashboard.html = '<div class="dashboard-main">  <!--gridster="gridsterOptions"-->    <style>      .background-image{        width:100%;        height:100%;        position:absolute;      }    </style>    <!-- <img src="images/background.png" class="background-image" /> -->     <div  style="position:relative;width:100%; height:100%;pointer-events: none">        <ul style="padding:0;pointer-events: none">            <li ng-repeat="widget in dashboard.widgets" class="widget-parent"> <!--gridster-item="widget"-->                <!--<div class="widget-title" ng-click="widget.collapse=!widget.collapse" ><span class="fa fa-area-chart" style="float:left;margin-right:4px"></span>{{widget.title}}</div>-->                <!--<div class="widget-edit" style="z-index: 1000">                    <div ng-show="widget.dashboard.editMode" ng-click="vm.$dashboardService.editWidget(widget)" class="fa fa-pencil widget-button"></div>                    <div ng-hide="widget.collapse" ng-click="widget.collapse=true"  class="fa fa-minus-square-o widget-button"></div>                    <div ng-show="widget.collapse" ng-click="widget.collapse=false"  class="fa fa-plus-square-o widget-button"></div>                    <div ng-show="widget.allowFullscreen" ng-click="vm.popup(widget)"  class="fa fa-square-o widget-button"></div>                </div>-->                    <div class="widget-container" ng-hide="widget.collapse" style="top: {{widget.top}};bottom: {{widget.bottom}};left:{{widget.left}};right:{{widget.right}};position: absolute;width:{{widget.width}};height:{{widget.height}};background: white">                        <div id="{{widget.elementId}}" class="box-content" style="width:100%;height:100%">                        </div>                    </div>            </li>        </ul>    <!-- </div> --></div>';
})(Dashboard || (Dashboard = {}));

var Dashboard;
(function (Dashboard_1) {
    var DashboardCtrl = (function () {
        // dependencies are injected via AngularJS $injector
        // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
        function DashboardCtrl($scope, $compile, $layerService, $mapService, $messageBusService, $templateCache) {
            //alert('init dashboard ctrl');
            var _this = this;
            this.$scope = $scope;
            this.$compile = $compile;
            this.$layerService = $layerService;
            this.$mapService = $mapService;
            this.$messageBusService = $messageBusService;
            this.$templateCache = $templateCache;
            $scope.vm = this;
            //$scope.gridsterOptions = {
            //    margins: [10, 10],
            //    columns: 20,
            //    rows: 20,
            //    draggable: {
            //        enabled:true
            //    },
            //    resizable: {
            //        enabled: true,
            //        start: (event, uiWidget, $element: csComp.Services.IWidget) => {
            //            $element.resize("start", uiWidget.width(), uiWidget.height());
            //        },
            //        stop: (event, uiWidget, $element: csComp.Services.IWidget) => {
            //            $element.resize("stop", uiWidget.width(), uiWidget.height());
            //        },
            //        resize: (event, uiWidget, $element: csComp.Services.IWidget) => {
            //            $element.resize("change", uiWidget.width(),uiWidget.height());
            //        }
            //    }
            //};
            $scope.initDashboard = function () {
                //if (!$scope.container) $scope.container = "main";
                $messageBusService.subscribe("dashboard-" + $scope.container, function (s, d) {
                    _this.project = $layerService.project;
                    _this.project.activeDashboard = d;
                    //alert(this.project.activeDashboard.id);
                    switch (s) {
                        case "activated":
                            $scope.dashboard = d;
                            _this.updateDashboard();
                            break;
                    }
                });
                //this.updateDashboard();
                //alert($scope.dashboard.name);
            };
        }
        DashboardCtrl.prototype.toggleWidget = function (widget) {
            if (widget.canCollapse) {
                widget.collapse = !widget.collapse;
            }
        };
        DashboardCtrl.prototype.updateWidget = function (w) {
            //alert('updatewidget');
            //this.$dashboardService.updateWidget(w);
            //var newElement = this.$compile("<" + w.directive + " widget=" + w + "></" + w.directive + ">")(this.$scope);
            var widgetElement;
            var newScope = this.$scope;
            newScope.widget = w;
            if (w.template) {
                widgetElement = this.$compile(this.$templateCache.get(w.template))(newScope);
            }
            else if (w.url) {
                widgetElement = this.$compile("<div>url</div>")(this.$scope);
            }
            else if (w.directive) {
                //var newScope : ng.IScope;
                widgetElement = this.$compile("<" + w.directive + "></" + w.directive + ">")(newScope);
            }
            else {
                widgetElement = this.$compile("<h1>hoi</h1>")(this.$scope);
            }
            var resized = function () {
                //alert('resize');
                /* do something */
            };
            if (widgetElement) {
                widgetElement.resize(resized);
                //alert(w.elementId);
                var el = $("#" + w.elementId);
                el.empty();
                el.append(widgetElement);
            }
        };
        DashboardCtrl.prototype.checkMap = function () {
            if (this.$scope.dashboard.showMap != this.$layerService.visual.mapVisible) {
                if (this.$scope.dashboard.showMap) {
                    this.$layerService.visual.mapVisible = true;
                }
                else {
                    this.$layerService.visual.mapVisible = false;
                }
                if (this.$scope.$root.$$phase != '$apply' && this.$scope.$root.$$phase != '$digest') {
                    this.$scope.$apply();
                }
            }
            if (this.$scope.dashboard.showMap && this.$scope.dashboard.baselayer) {
                this.$messageBusService.publish("map", "setbaselayer", this.$scope.dashboard.baselayer);
            }
        };
        DashboardCtrl.prototype.checkLayers = function () {
            var _this = this;
            var db = this.$layerService.project.activeDashboard;
            if (db.visiblelayers) {
                this.$layerService.project.groups.forEach(function (g) {
                    g.layers.forEach(function (l) {
                        if (l.enabled && db.visiblelayers.indexOf(l.reference) == -1) {
                            _this.$layerService.removeLayer(l);
                            l.enabled = false;
                        }
                        if (!l.enabled && db.visiblelayers.indexOf(l.reference) >= 0) {
                            _this.$layerService.addLayer(l);
                            l.enabled = true;
                        }
                    });
                });
            }
        };
        DashboardCtrl.prototype.checkViewbound = function () {
            var db = this.$layerService.project.activeDashboard;
            if (db.viewBounds) {
                this.$mapService.map.fitBounds(new L.LatLngBounds(db.viewBounds.southWest, db.viewBounds.northEast));
            }
        };
        DashboardCtrl.prototype.checkTimeline = function () {
            if (this.$scope.dashboard.showTimeline != this.$mapService.timelineVisible) {
                if (this.$scope.dashboard.showTimeline) {
                    this.$mapService.timelineVisible = true;
                }
                else {
                    this.$mapService.timelineVisible = false;
                }
                if (this.$scope.$root.$$phase != '$apply' && this.$scope.$root.$$phase != '$digest') {
                    this.$scope.$apply();
                }
            }
        };
        DashboardCtrl.prototype.updateDashboard = function () {
            var _this = this;
            var d = this.$scope.dashboard;
            if (!d)
                return;
            if (d.widgets && d.widgets.length > 0) {
                setTimeout(function () {
                    d.widgets.forEach(function (w) {
                        _this.updateWidget(w);
                    });
                }, 100);
            }
            this.checkMap();
            this.checkTimeline();
            this.checkLayers();
            this.checkViewbound();
            this.$messageBusService.publish("leftmenu", (d.showLeftmenu) ? "show" : "hide");
            this.$mapService.rightMenuVisible = d.showRightmenu;
        };
        //public dashboard: csComp.Services.Dashboard;
        // $inject annotation.
        // It provides $injector with information about dependencies to be in  jected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
        DashboardCtrl.$inject = [
            '$scope',
            '$compile',
            'layerService',
            'mapService',
            'messageBusService',
            '$templateCache'
        ];
        return DashboardCtrl;
    })();
    Dashboard_1.DashboardCtrl = DashboardCtrl;
})(Dashboard || (Dashboard = {}));

var Helpers;
(function (Helpers) {
    var ContextMenu;
    (function (ContextMenu) {
        /**
         * Config
         */
        var moduleName = 'csComp';
        /**
          * Module
          */
        ContextMenu.myModule;
        try {
            ContextMenu.myModule = angular.module(moduleName);
        }
        catch (err) {
            // named module does not exist, so create one
            ContextMenu.myModule = angular.module(moduleName, []);
        }
        /**
          * Directive to resize an element by settings its width or height,
          * for example to make sure that the scrollbar appears.
          * Typical usage:
          * <div style="overflow-y: auto; overflow-x: hidden" resize resize-x="20" resize-y="250">...</div>
          * Load the directive in your module, e.g.
          * angular.module('myWebApp', ['csWeb.resize'])
          */
        ContextMenu.myModule.directive('contextMenu', function ($parse) {
            var renderContextMenu = function ($scope, event, options) {
                if (!$) {
                    var $ = angular.element;
                }
                $(event.currentTarget).addClass('context');
                var $contextMenu = $('<div>');
                $contextMenu.addClass('dropdown clearfix');
                var $ul = $('<ul>');
                $ul.addClass('dropdown-menu');
                $ul.attr({ 'role': 'menu' });
                $ul.css({
                    display: 'block',
                    position: 'absolute',
                    left: event.pageX + 'px',
                    top: event.pageY + 'px'
                });
                angular.forEach(options, function (item, i) {
                    var $li = $('<li>');
                    if (item === null) {
                        $li.addClass('divider');
                    }
                    else {
                        var $a = $('<a>');
                        $a.attr({ tabindex: '-1', href: '#' });
                        $a.text(typeof item[0] == 'string' ? item[0] : item[0].call($scope, $scope));
                        $li.append($a);
                        $li.on('click', function ($event) {
                            $event.preventDefault();
                            $scope.$apply(function () {
                                $(event.currentTarget).removeClass('context');
                                $contextMenu.remove();
                                item[1].call($scope, $scope);
                            });
                        });
                    }
                    $ul.append($li);
                });
                $contextMenu.append($ul);
                var height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
                $contextMenu.css({
                    width: '100%',
                    height: height + 'px',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 9999
                });
                $(document).find('body').append($contextMenu);
                $contextMenu.on("mousedown", function (e) {
                    if ($(e.target).hasClass('dropdown')) {
                        $(event.currentTarget).removeClass('context');
                        $contextMenu.remove();
                    }
                }).on('contextmenu', function (event) {
                    $(event.currentTarget).removeClass('context');
                    event.preventDefault();
                    $contextMenu.remove();
                });
            };
            return function ($scope, element, attrs) {
                element.on('contextmenu', function (event) {
                    $scope.$apply(function () {
                        event.preventDefault();
                        var options = $scope.$eval(attrs.contextMenu);
                        if (options instanceof Array) {
                            renderContextMenu($scope, event, options);
                        }
                        else {
                            throw '"' + attrs.contextMenu + '" not an array';
                        }
                    });
                });
            };
        });
    })(ContextMenu = Helpers.ContextMenu || (Helpers.ContextMenu = {}));
})(Helpers || (Helpers = {}));

var DashboardSelection;
(function (DashboardSelection) {
    /**
      * Config
      */
    var moduleName = 'csComp';
    /**
      * Module
      */
    DashboardSelection.myModule;
    try {
        DashboardSelection.myModule = angular.module(moduleName);
    }
    catch (err) {
        // named module does not exist, so create one
        DashboardSelection.myModule = angular.module(moduleName, []);
    }
    /**
      * Directive to display the available map layers.
      */
    DashboardSelection.myModule.directive('dashboardSelection', [
        '$window', '$compile',
        function ($window, $compile) {
            return {
                terminal: false,
                restrict: 'E',
                scope: {},
                templateUrl: 'directives/DashboardSelection/DashboardSelection.tpl.html',
                //template: html,   // I use gulp automatian to compile the FeatureProperties.tpl.html to a simple TS file, FeatureProperties.tpl.ts, which contains the html as string. The advantage is that you can use HTML intellisence in the html file.
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
                controller: DashboardSelection.DashboardSelectionCtrl
            };
        }
    ]).directive('bsPopover', function () {
        return function (scope, element, attrs) {
            element.find("a[rel=popover]").popover({ placement: 'right', html: 'true' });
        };
    });
})(DashboardSelection || (DashboardSelection = {}));

var DashboardSelection;
(function (DashboardSelection) {
    DashboardSelection.html = '<div>    <h3 class="leftpanel-header" style="width: 100%">        Dashboards        <div class="leftpanel-header-button-container">            <button ng-show="vm.$dashboardService.editMode" ng-click="vm.$dashboardService.editMode = false; vm.stopEdit()" class="button fa fa-check leftpanel-header-button" />            <button ng-show="vm.$dashboardService.editMode" class="button fa fa-plus leftpanel-header-button" ng-click="vm.addDashboard()" />            <button ng-hide="vm.$dashboardService.editMode" ng-click="vm.$dashboardService.editMode = true; vm.startEdit()" class="button fa fa-pencil leftpanel-header-button" />        </div>    </h3>    <style>    </style>    <ul style="padding: 0;list-style-type: none" data-ng-repeat="value in vm.$layerService.project.dashboards">        <li>            <div ng-class="{\'dashboard-selected\' : value.id === vm.$dashboardService.mainDashboard.id}" class="dashboard-item">                <span ng-click="vm.$dashboardService.selectDashboard(value)" class="dashboard-name">{{value.name}}</span>                <div ng-show="vm.$dashboardService.editMode" class="leftpanel-header-button-container">                    <button ng-click="vm.removeDashboard(value.id)" class="button fa fa-trash leftpanel-header-button" />                    <div ng-show="value == vm.$dashboardService.mainDashboard" style="float:right">                        <button ng-hide="value.editMode" ng-click="value.editMode = true; vm.startDashboardEdit(value)" class="button fa fa-pencil leftpanel-header-button" />                        <button ng-show="value.editMode" ng-click="value.editMode = false" class="button fa fa-check leftpanel-header-button" />                    </div>                </div>            </div>            <div style="margin-top:0" ng-show="value.editMode">                <label class="control-label" for="dashboardTitle">Title</label>                <div class="controls">                    <input id="dashboardTitle" name="textinput" type="text" ng-model="value.name" placeholder="placeholder" class="input-xlarge">                </div>                <div class="checkbox" style="margin-left: 20px">                    <input type="checkbox" id="showmap-{{value.id}}" ng-model="value.showMap" ng-click="vm.toggleMap()">                    <label for="showmap-{{value.id}}">Show Map</label>                </div>                <div class="checkbox" style="margin-left: 20px">                    <input type="checkbox" id="timeline-{{value.id}}" ng-model="value.showTimeline" ng-click="vm.toggleTimeline()">                    <label for="timeline-{{value.id}}">Show Timeline</label>                </div>            </div>        </li>    </ul></div>';
})(DashboardSelection || (DashboardSelection = {}));

var DashboardSelection;
(function (DashboardSelection) {
    var DashboardSelectionCtrl = (function () {
        // dependencies are injected via AngularJS $injector
        // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
        function DashboardSelectionCtrl($scope, $layerService, $mapService, $messageBusService) {
            this.$scope = $scope;
            this.$layerService = $layerService;
            this.$mapService = $mapService;
            this.$messageBusService = $messageBusService;
            $scope.vm = this;
            //$messageBusService.subscribe("dashboardSelect", ((s: string, dashboard: csComp.Services.Dashboard) => {
            //    switch (s) {
            //        case "selectRequest":
            //            this.selectDashboard(dashboard);
            //            break;
            //    }
            //}));
        }
        DashboardSelectionCtrl.prototype.startDashboardEdit = function (dashboard) {
            //this.group.dashboards.forEach((d: csComp.Services.Dashboard) => {
            //if (d.id !== dashboard.id) d.editMode = false;
            //}
            //);
        };
        DashboardSelectionCtrl.prototype.stopEdit = function () {
            //for (var property in this.group.dashboards) {
            //this.group.dashboards[property].editMode = false;
            //}
            //this.activeWidget = null;
            //this.$scope.gridsterOptions.draggable.enabled = false;
            //this.$scope.gridsterOptions.resizable.enabled = false;
        };
        DashboardSelectionCtrl.prototype.startEdit = function () {
            //this.$scope.gridsterOptions.draggable.enabled = true;
            //this.$scope.gridsterOptions.resizable.enabled = true;
        };
        /** Add new dashboard */
        DashboardSelectionCtrl.prototype.addDashboard = function (widget) {
            var id = csComp.Helpers.getGuid();
            var d = new csComp.Services.Dashboard();
            d.id = id;
            d.name = "New Dashboard";
            //this.group.dashboards.push(d);
        };
        /** Remove existing dashboard */
        DashboardSelectionCtrl.prototype.removeDashboard = function (key) {
            //this.group.dashboards = this.group.dashboards.filter((s : csComp.Services.Dashboard) => s.id !== key);
        };
        DashboardSelectionCtrl.prototype.toggleTimeline = function () {
            //this.$dashboardService.mainDashboard.showTimeline = !this.$dashboardService.mainDashboard.showTimeline;
            this.checkTimeline();
        };
        DashboardSelectionCtrl.prototype.toggleMap = function () {
            setTimeout(function () {
                //this.checkMap();
            }, 100);
        };
        DashboardSelectionCtrl.prototype.checkTimeline = function () {
            var db = this.$layerService.project.activeDashboard;
            if (db.timeline) {
                var s = new Date(db.timeline.start);
                var e = new Date();
                if (db.timeline.end)
                    e = new Date(db.timeline.end);
                //this.$messageBusService.publish("timeline", "updateTimerange", { "start": s, "end": e});
                this.$messageBusService.publish("timeline", "updateTimerange", { start: s, end: e });
            }
            if (db.showTimeline != this.$mapService.timelineVisible) {
                if (db.showTimeline) {
                    this.$mapService.timelineVisible = true;
                }
                else {
                    this.$mapService.timelineVisible = false;
                }
                if (this.$scope.$root.$$phase != '$apply' && this.$scope.$root.$$phase != '$digest') {
                    this.$scope.$apply();
                }
            }
        };
        /** publish a message that a new dashboard was selected */
        DashboardSelectionCtrl.prototype.publishDashboardUpdate = function () {
            this.$messageBusService.publish('dashboard', 'onDashboardSelected', this.$layerService.project.activeDashboard);
        };
        /** Select an active dashboard */
        DashboardSelectionCtrl.prototype.selectDashboard = function (dashboard) {
            var _this = this;
            //var res = JSON.stringify(this.$dashboardService.dashboards);
            for (var key in this.$layerService.project.dashboards) {
                this.$layerService.project.dashboards[key].editMode = false;
            }
            if (dashboard) {
                //this.$dashboardService.mainDashboard = dashboard;
                if (this.$scope.$root.$$phase != '$apply' && this.$scope.$root.$$phase != '$digest') {
                    this.$scope.$apply();
                }
                setTimeout(function () {
                    //this.$dashboardService.checkMap();
                    //this.checkTimeline();
                    //this.checkViewbound();
                    _this.publishDashboardUpdate();
                    //this.checkLayers();
                }, 100);
            }
        };
        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
        DashboardSelectionCtrl.$inject = [
            '$scope',
            'layerService',
            'dashboardService',
            'mapService',
            'messageBusService'
        ];
        return DashboardSelectionCtrl;
    })();
    DashboardSelection.DashboardSelectionCtrl = DashboardSelectionCtrl;
})(DashboardSelection || (DashboardSelection = {}));

var DataTable;
(function (DataTable) {
    /**
      * Config
      */
    var moduleName = 'csComp';
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
    DataTable.myModule.directive('datatable', ['$compile',
        function ($compile) {
            return {
                terminal: false,
                restrict: 'E',
                scope: {},
                templateUrl: 'directives/DataTable/DataTable.tpl.html',
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
    DataTable.html = '<div>    <div style="width:100%; margin: 10px auto;">        <div style="float: left; width: 15%; margin: 0; padding: 1em">            <!-- Pull down of map layers -->            <select data-ng-model="vm.selectedLayerId"                    data-ng-change="vm.loadLayer()"                    data-ng-options="layer.id as layer.title group by layer.group for layer in vm.layerOptions"                    class="form-control tt-input"></select>            <!-- List of headers -->            <ul class="form-group" style="margin-top: 1em; margin-left: -2em; overflow-y: auto; overflow-x: hidden;"                resize resize-y="150">                <li ng-repeat="mi in vm.propertyTypes" class="list-unstyled" style="white-space: nowrap; text-overflow: ellipsis">                    <label>                        <input type="checkbox" name="vm.selectedTitles[]" value="{{mi.title}}"                               data-ng-checked="vm.headers.indexOf(mi.title) > -1"                               data-ng-click="vm.toggleSelection(mi.title)">&nbsp;&nbsp;{{mi.title}}                    </label>                    <!--<div class="checkbox">                        <label>                            <input type="checkbox" name="vm.selectedTitles[]" value="{{mi.title}}"                                   data-ng-checked="vm.headers.indexOf(mi.title) > -1"                                   data-ng-click="vm.toggleSelection(mi.title)">&nbsp;&nbsp;{{mi.title}}                        </label>                    </div>-->                </li>            </ul>            <!--       <pre>{{vm.headers|json}}</pre>-->        </div>        <!-- Right side of the table view -->        <div style="margin-left: 16%; border-left: 1px solid gray; padding: 1em;" ng-init="poiTypeFilter">            <!-- Filter -->            <div class="has-feedback" style="margin-bottom: 1em; float: right; width: 16%; min-width: 200px;">                <span style="direction: ltr; position: static; display: block;">                    <input id="searchbox" data-ng-model="featureFilter" type="text"                           placeholder="Filter" autocomplete="off" spellcheck="false"                           style="position: relative; vertical-align: top;" class="form-control tt-input">                </span>                <span id="searchicon" class="fa form-control-feedback fa-filter" style="padding-top: 0px;"></span>            </div>            <!--Download to CSV option-->            <a href="" data-ng-click="vm.downloadCsv()" alt="Download CSV" style="margin-top: 5px; margin-right: 1em; float: right;"><i class="fa fa-download fa-2x"></i></a>            <!-- Specify how many items to show -->            <select data-ng-model="vm.numberOfItems" style="margin-bottom: 1em; margin-right: 10px; float: left; width: 16%; min-width: 200px;" class="form-control tt-input">                <option value="5" translate="SHOW5"></option>                <option value="10" translate="SHOW10"></option>                <option value="15" translate="SHOW15"></option>                <option value="20" translate="SHOW20"></option>                <option value="25" translate="SHOW25"></option>                <option value="30" translate="SHOW30"></option>                <option value="35" translate="SHOW35"></option>                <option value="40" translate="SHOW40"></option>            </select>            <!-- Data table -->            <table class="table table-striped table-condensed">                <tr>                    <th data-ng-repeat="header in vm.headers track by $index">                        {{header}}&nbsp;                        <a data-ng-click="reverseSort = !reverseSort; vm.orderBy($index, reverseSort);"><i data-ng-class="vm.sortOrderClass($index, reverseSort)">&nbsp;&nbsp;</i></a>                    </th>                </tr>                <tr dir-paginate="row in vm.rows | filter:featureFilter | itemsPerPage: vm.numberOfItems"                    style="cursor: pointer; vertical-align: central">                    <td data-ng-class="{\'text-right\': field.type == \'number\'}" data-ng-repeat="field in row track by $index" data-ng-bind-html="vm.toTrusted(field.displayValue)"></td>                </tr>            </table>            <dir-pagination-controls style="" max-size="10" boundary-links="true" direction-links="true"                                     template-url="bower_components/angular-utils-pagination/dirPagination.tpl.html"></dir-pagination-controls>        </div>    </div>    <div style="clear: both; margin: 0; padding: .5em"></div></div>';
})(DataTable || (DataTable = {}));

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
            $messageBusService.publish('timeline', 'isEnabled', 'false');
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
            this.$http.get(selectedLayer.url).
                success(function (data) {
                _this.dataset = data;
                if (data.featureTypes == null)
                    data.featureTypes = {};
                data.features.forEach(function (f) {
                    f.featureTypeName = f.properties['FeatureTypeId'];
                    if (!(f.featureTypeName in data.featureTypes))
                        data.featureTypes[f.featureTypeName] = _this.$layerService.featureTypes[f.featureTypeName];
                });
                _this.updatepropertyType(data);
            }).
                error(function (data, status, headers, config) {
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
                csvRows.push(this.rows[i].map(function (f) { return f.originalValue; }).join(';'));
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

var FeatureList;
(function (FeatureList) {
    /**
      * Config
      */
    var moduleName = 'csComp';
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
        '$window', '$compile',
        function ($window, $compile) {
            return {
                terminal: false,
                restrict: 'E',
                scope: {},
                templateUrl: 'directives/FeatureList/FeatureList.tpl.html',
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
    FeatureList.html = '<div style="position: relative;">    <h4 class="leftpanel-header" translate="FEATURES"></h4>    <div class="has-feedback" style="padding:10px 4px 4px 4px;">        <span style="direction: ltr; position: static; display: block;">            <input id="searchbox" data-ng-model="featureFilter.properties" type="text"                   placeholder="Filter" autocomplete="off" spellcheck="false"                   style="position: relative; vertical-align: top;" class="form-control tt-input">        </span>        <span id="searchicon" class="fa form-control-feedback fa-filter" style="padding-top: 10px;"></span>    </div>    <table class="table table-striped table-condensed">        <!--vm.$layerService.features-->        <tr dir-paginate="feature in vm.$layerService.project.features | filter:featureFilter | orderBy:\'properties.Name\' | itemsPerPage: numberOfItems "            data-ng-click="vm.$mapService.zoomTo(feature);vm.$layerService.selectFeature(feature);" style="cursor: pointer; height: 50px; vertical-align: central">            <!--<td>Icon</td>-->            <td>{{ feature.properties.Name }}</td>            <td>                <i class="fa fa-chevron-right pull-right"></i>            </td>        </tr>    </table>    <dir-pagination-controls style="position: absolute; bottom: -80px;" max-size="6" boundary-links="false" direction-links="false" template-url="bower_components/angular-utils-pagination/dirPagination.tpl.html"></dir-pagination-controls></div>';
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

var FeatureProps;
(function (FeatureProps) {
    /**
      * Config
      */
    var moduleName = 'csComp';
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
    FeatureProps.myModule.directive('featureprops', ['$compile',
        function ($compile) {
            return {
                terminal: true,
                restrict: 'E',
                scope: {},
                templateUrl: 'directives/FeatureProps/FeatureProps.tpl.html',
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
    FeatureProps.html = '<div data-ng-cloak data-ng-show="showMenu" >    <h4 class="rightpanel-header">        <img data-ng-if="callOut.icon" data-ng-src="{{callOut.icon}}" width="24" height="24" style="margin-left:5px" alt="Icon" />        &nbsp;&nbsp;{{callOut.title}}    </h4>    <div class="container-fluid rightpanel-tabs" style="position: relative">        <div class="row" style="overflow:hidden" ng-if="callOut.sectionCount() < 4">            <!-- Nav tabs -->            <span id="leftArr" style="display:block;padding:10px;margin-top:5px;position:absolute;background-color:transparent;z-index:2">                <i class="glyphicon glyphicon-chevron-left"></i>            </span>            <span id="rightArr" style="display:block;padding:10px;margin-top:5px;position:absolute;background-color:transparent;z-index:2">                <i class="glyphicon glyphicon-chevron-right"></i>            </span>            <ul class="nav nav-tabs" id="featureTabs" style="margin-left:10px">                <li data-toggle="tab" data-ng-class="{active : $first}" data-ng-repeat="(sectionTitle, section) in callOut.sections" ng-if="section.hasProperties()">                    <a ng-href="#rp-{{$index}}" data-toggle="tab" data-ng-if="section.showSectionIcon()" ng-click="featureTabActivated(sectionTitle, section)"><i class="fa {{section.sectionIcon}}"></i></a>                    <a ng-href="#rp-{{$index}}" data-toggle="tab" data-ng-if="!section.showSectionIcon()" ng-click="featureTabActivated(sectionTitle, section)">{{sectionTitle}}</a>                </li>            </ul>        </div>        <div class="row" ng-if="callOut.sectionCount() >= 4">            <ul class="nav nav-tabs" id="featureTabs" style="margin-left:10px">                <li data-toggle="tab" class="active" ng-init="firstCallOutsection=callOut.firstSection()">                    <a ng-href="#rp-0" data-toggle="tab" data-ng-if="firstCallOutsection.showSectionIcon()" >                        <i class="fa {{firstCallOutsection.sectionIcon}}"></i>                    </a>                </li>                <li class="dropdown" ng-init="selectedSection.title=\'...\'">                    <a style="cursor:pointer" data-toggle="dropdown">{{selectedSection.title}} <span class="caret"></span></a>                    <ul class="dropdown-menu">                        <li data-ng-repeat="(sectionTitle, section) in callOut.sections" ng-if="!$last">                            <a ng-href="#rp-{{$index}}"                               ng-click="selectedSection.title = sectionTitle"                               data-toggle="tab">{{sectionTitle}}</a>                        </li>                    </ul>                </li>                <li data-toggle="tab" ng-init="lastCallOutsection=callOut.lastSection()">                    <a ng-href="#rp-{{callOut.sectionCount()-1}}" data-toggle="tab"                       data-ng-if="lastCallOutsection.showSectionIcon()">                        <i class="fa {{lastCallOutsection.sectionIcon}}"></i>                    </a>                </li>            </ul>        </div>    </div>    <div class="tab-content" style="top:50px; width:355px; overflow-y: auto; overflow-x: hidden" resize resize-y="150">        <div data-ng-if="!$last" class="tab-pane" data-ng-class="{active : $first}"             id="rp-{{$index}}"             data-ng-repeat="(sectionTitle, section) in callOut.sections">            <!--<td>                    <span class="dropdown">                        <a href class="fa fa-circle-o makeNarrow dropdown-toggle"></a>                        <ul class="dropdown-menu">                            <li><a data-ng-click="vm.$layerService.createScatter(item)">scatter plot</a></li>                            <li><a>add to dashboard</a></li>                        </ul>                    </span>                </td>-->            <div class="panel-group" id="accordion">                <div class="panel panel-default"                     popover="{{(item.description) ? item.description : \'\'}}"                     popover-placement="left"                     popover-trigger="mouseenter"                     popover-append-to-body="true"                     data-ng-repeat="item in section.properties">                    <div class="panel-heading" style="min-height: 36px">                        <div class="pull-left accordionIcon"><a class="fa fa-filter makeNarrow" data-ng-show="item.canFilter" data-ng-click="vm.$layerService.setPropertyFilter(item)" style="cursor: pointer"></a></div>                        <div class="pull-left accordionIcon"><a class="smallStyleIcon makeNarrow" data-ng-show="item.canStyle" data-ng-click="vm.$layerService.setStyle(item)" style="cursor: pointer"></a></div>                        <div class="pull-left accordionIcon" data-ng-if="item.isSensor">                            <a class="fa fa-line-chart makeNarrow"                               data-toggle="collapse"                               data-target="#sensor{{item.property}}"                               href="#sensor{{item.property}}"                               style="cursor: pointer"></a>                        </div>                        <div class="pull-left" style="margin-left: 4px;">                            {{item.key}}                        </div>                        <div class="text-right" data-ng-bind-html="vm.toTrusted(item.value)"></div>                        <div id="sensor{{item.property}}"                             data-ng-if="item.isSensor"                             class="panel-collapse collapse" style="padding-top: 10px;">                            <sparkline-chart timestamps="item.timestamps" sensor="item.sensor" width="320" height="90" showaxis="true"></sparkline-chart>                            <!--<div class="panel-body">            <sparkline-chart timestamps="item.timestamps" sensor="item.sensor" width="320" height="90" showaxis="true"></sparkline-chart>        </div>-->                        </div>                    </div>                </div>            </div>        </div>        <!-- Treat last tab (filter) differently -->        <div data-ng-if="$last" class="tab-pane" data-ng-class="{active : $first}" id="rp-{{$index}}" data-ng-repeat="(sectionTitle, section) in callOut.sections">            <!-- Add filter panel to the last rendered element -->            <div class="has-feedback" style="padding:0 4px 4px 4px;">                <span style="direction: ltr; position: static; display: block;">                    <input id="searchbox" data-ng-model="search.key" type="text"                           placeholder="Filter" autocomplete="off" spellcheck="false"                           style="position: relative; vertical-align: top;" class="form-control tt-input">                </span>                <span id="searchicon" class="fa form-control-feedback fa-filter"></span>            </div>            <div class="panel-group" id="accordion">                <div class="panel panel-default"                     popover="{{(item.description) ? item.description : \'\'}}"                     popover-placement="left"                     popover-trigger="mouseenter"                     popover-append-to-body="true"                     data-ng-repeat="item in section.properties">                    <div class="panel-heading" style="min-height: 36px">                        <div class="pull-left accordionIcon"><a class="fa fa-filter makeNarrow" data-ng-show="item.canFilter" data-ng-click="vm.$layerService.setPropertyFilter(item)" style="cursor: pointer"></a></div>                        <div class="pull-left accordionIcon"><a class="fa fa-eye makeNarrow" data-ng-show="item.canStyle" data-ng-click="vm.$layerService.setStyle(item)" style="cursor: pointer"></a></div>                        <div class="pull-left accordionIcon" data-ng-if="item.isSensor">                            <a class="fa fa-line-chart makeNarrow"                               data-toggle="collapse"                               data-target="#fsensor{{item.property}}"                               href="#fsensor{{item.property}}"                               style="cursor: pointer"></a>                        </div>                        <div class="pull-left" style="margin-left: 4px;">                            {{item.key}}                        </div>                        <div class="text-right" data-ng-bind-html="vm.toTrusted(item.value)"></div>                        <div id="fsensor{{item.property}}"                             data-ng-if="item.isSensor"                             class="panel-collapse collapse">                            <div class="panel-body">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt accusamus labore sustainable VHS.</div>                        </div>                    </div>                </div>            </div>            <!--<input style="padding:4px;" class=" form-control" data-ng-model="search" placeholder="...">-->            <!--<table id="searchTextResults" class="table table-condensed">                <tr popover="{{(item.description) ? item.description : \'\'}}"                    popover-placement="left"                    popover-trigger="mouseenter"                    popover-append-to-body="true"                    data-ng-repeat="item in section.properties | filter:search">                    <td><a class="fa fa-filter makeNarrow" data-ng-show="item.canFilter" data-ng-click="vm.$layerService.setFilter(item)"></a></td>                    <td><a class="fa fa-eye makeNarrow" data-ng-show="item.canStyle" data-ng-click="vm.$layerService.setStyle(item)"></a></td>                    <td>{{item.key}}</td>                    <td class="text-right" data-ng-bind-html="vm.toTrusted(item.value)"></td>                </tr>            </table>-->        </div>        <!--SimpleTimeline component-->        <div data-ng-if="vm.showSimpleTimeline" style="margin-left: 10px">            <div class="btn-group" dropdown is-open="status.isopen">                <button type="button" class="btn btn-primary dropdown-toggle" dropdown-toggle ng-disabled="disabled">                    {{vm.focusTime}} <span class="caret"></span>                </button>                <ul class="dropdown-menu" role="menu">                    <li data-ng-repeat="ts in vm.timestamps"                        data-ng-click="vm.setTime(ts)">{{ts.title}}</li>                </ul>            </div>        </div>    </div></div>';
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
        function CallOutProperty(key, value, property, canFilter, canStyle, feature, isFilter, isSensor, description, meta, timestamps, sensor) {
            this.key = key;
            this.value = value;
            this.property = property;
            this.canFilter = canFilter;
            this.canStyle = canStyle;
            this.feature = feature;
            this.isFilter = isFilter;
            this.isSensor = isSensor;
            this.description = description;
            this.meta = meta;
            this.timestamps = timestamps;
            this.sensor = sensor;
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
        CallOutSection.prototype.showSectionIcon = function () { return !csComp.StringExt.isNullOrEmpty(this.sectionIcon); };
        CallOutSection.prototype.addProperty = function (key, value, property, canFilter, canStyle, feature, isFilter, description, meta) {
            var isSensor = typeof feature.sensors !== 'undefined' && feature.sensors.hasOwnProperty(property);
            if (isSensor)
                this.properties.push(new CallOutProperty(key, value, property, canFilter, canStyle, feature, isFilter, isSensor, description ? description : null, meta, feature.timestamps, feature.sensors[property]));
            else
                this.properties.push(new CallOutProperty(key, value, property, canFilter, canStyle, feature, isFilter, isSensor, description ? description : null, meta));
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
                    if (mi.visibleInCallOut) {
                        callOutSection.addProperty(mi.title, displayValue, mi.label, canFilter, canStyle, feature, false, mi.description, mi);
                    }
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
            this.icon = (this.type == null || this.type.style == null || !this.type.style.hasOwnProperty('iconUri') || this.type.style.iconUri.toLowerCase().indexOf('_media') >= 0)
                ? ''
                : this.type.style.iconUri.indexOf('{') >= 0
                    ? csComp.Helpers.convertStringFormat(feature, this.type.style.iconUri)
                    : this.type.style.iconUri;
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
                //console.log("sidebarMessageReceived");
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
                //console.log("FPC: featureMessageReceived");
                switch (title) {
                    case "onFeatureSelect":
                        _this.setShowSimpleTimeline();
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
            this.timestamps = new Array();
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
            var time3 = new Date().getTime();
            console.log('Calculated ' + (i * j) + ' cells in ' + (time3 - time).toFixed(1) + ' ms');
        };
        FeaturePropsCtrl.prototype.createScatter = function (property) {
            var sc = new csComp.Services.GroupFilter();
            sc.property = property.property;
            sc.property2 = "opp_land";
            sc.id = csComp.Helpers.getGuid();
            sc.filterType = "scatter";
            sc.title = sc.property;
            var l = this.$layerService.findLayer(this.$scope.poi.layerId);
            this.$layerService.setFilter(sc, l.group);
            //alert('scatter ' + property.property);
        };
        FeaturePropsCtrl.prototype.displayFeature = function (feature) {
            if (!feature)
                return;
            var featureType = this.$layerService.featureTypes[feature.featureTypeName];
            // If we are dealing with a sensor, make sure that the feature's timestamps are valid so we can add it to a chart
            if (typeof feature.sensors !== 'undefined' && typeof feature.timestamps === 'undefined')
                feature.timestamps = this.$layerService.findLayer(feature.layerId).timestamps;
            this.$scope.callOut = new CallOut(featureType, feature, this.$layerService.propertyTypeData);
        };
        FeaturePropsCtrl.prototype.showSensorData = function (property) {
            console.log(property);
        };
        FeaturePropsCtrl.prototype.setShowSimpleTimeline = function () {
            if (this.$mapService.timelineVisible
                || typeof this.$layerService.lastSelectedFeature === 'undefined'
                || this.$layerService.lastSelectedFeature == null) {
                this.showSimpleTimeline = false;
                return;
            }
            var feature = this.$layerService.lastSelectedFeature;
            this.showSimpleTimeline = (typeof feature.sensors !== 'undefined' && feature.sensors !== null);
            if (this.showSimpleTimeline)
                this.setTimestamps();
        };
        FeaturePropsCtrl.prototype.setTimestamps = function () {
            var feature = this.$layerService.lastSelectedFeature;
            var layer = this.$layerService.findLayer(feature.layerId);
            if ((typeof layer.timestamps === 'undefined' || layer.timestamps == null) &&
                (typeof feature.timestamps === 'undefined' || feature.timestamps == null))
                return [];
            var time = this.timestamps = new Array();
            (layer.timestamps || feature.timestamps).forEach(function (ts) {
                var date = new Date(ts);
                var dateString = String.format("{0}-{1:00}-{2:00}", date.getFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
                if (date.getUTCHours() > 0 || date.getUTCMinutes() > 0)
                    dateString += String.format(" {0:00}:{1:00}", date.getUTCHours(), date.getUTCMinutes());
                time.push({ title: dateString, timestamp: ts });
            });
            // Set focus time
            var focus = this.$layerService.project.timeLine.focus;
            if (focus > time[time.length - 1].timestamp) {
                this.focusTime = time[time.length - 1].title;
                this.setTime(time[time.length - 1]);
            }
            else if (focus < time[0].timestamp) {
                this.focusTime = time[0].title;
                this.setTime(time[0]);
            }
            else {
                for (var i = 1; i < time.length; i++) {
                    if (focus > time[i].timestamp)
                        continue;
                    this.focusTime = time[i].title;
                    this.setTime(time[i]);
                    break;
                }
            }
            return time;
        };
        FeaturePropsCtrl.prototype.setTime = function (time) {
            this.focusTime = time.title;
            this.$layerService.project.timeLine.setFocus(new Date(time.timestamp));
            this.$messageBusService.publish("timeline", "focusChange", time.timestamp);
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

var FeatureRelations;
(function (FeatureRelations) {
    /**
      * Config
      */
    var moduleName = 'csComp';
    /**
      * Module
      */
    FeatureRelations.myModule;
    try {
        FeatureRelations.myModule = angular.module(moduleName);
    }
    catch (err) {
        // named module does not exist, so create one
        FeatureRelations.myModule = angular.module(moduleName, []);
    }
    /**
      * Directive to display a feature's properties in a panel.
      *
      * @seealso          : http://www.youtube.com/watch?v=gjJ5vLRK8R8&list=UUGD_0i6L48hucTiiyhb5QzQ
      * @seealso          : http://plnkr.co/edit/HyBP9d?p=preview
      */
    FeatureRelations.myModule.directive('featurerelations', ['$compile',
        function ($compile) {
            return {
                terminal: true,
                restrict: 'E',
                scope: {},
                templateUrl: 'directives/FeatureRelations/FeatureRelations.tpl.html',
                compile: function (el) {
                    var fn = $compile(el);
                    return function (scope) {
                        fn(scope);
                    };
                },
                replace: true,
                transclude: true,
                controller: FeatureRelations.FeatureRelationsCtrl
            };
        }
    ]);
})(FeatureRelations || (FeatureRelations = {}));

var FeatureRelations;
(function (FeatureRelations) {
    FeatureRelations.html = '<div style="max-width: 700px">    <style>        .relationgroup-title {            font-size: 18px;            font-weight: bold;        }        .relation-title {            font-size: 16px;        }    </style>    <h4 class="rightpanel-header">        <img data-ng-if="callOut.icon" data-ng-src="{{callOut.icon}}" width="24" height="24" style="margin-left:5px" alt="Icon" />        &nbsp;&nbsp;{{callOut.title}}    </h4>    <div id="relations" class="rightpanel-content" style="min-width:355px;margin-left: 20px">        <div ng-repeat="group in vm.relations">            <div style="float: left; margin-left: -5px; margin-top: 5px" data-toggle="collapse" data-target="#relationgroup_{{group.id}}"><i class="fa fa-chevron-down togglebutton toggle-arrow-down"></i><i class="fa fa-chevron-up togglebutton toggle-arrow-up"></i></div>            <div class="relationgroup-title">{{group.title}}</div>            <div id="relationgroup_{{group.id}}" class="collapse in">                <div ng-repeat="relation in group.relations" style="margin-bottom: 5px">                    <img data-ng-if="relation.icon" data-ng-src="{{relation.icon}}" width="24" height="24" style="margin-left:5px; " alt="Icon" />                    <a class="relation-title" ng-click="vm.selectRelation(relation)">                        {{relation.title}}                    </a>                </div>            </div>        </div>    </div></div>';
})(FeatureRelations || (FeatureRelations = {}));

var FeatureRelations;
(function (FeatureRelations) {
    var FeaturePropsOptions = (function () {
        function FeaturePropsOptions(position) {
            this.position = position;
            this.closeButton = true;
            this.autoPan = true;
        }
        return FeaturePropsOptions;
    })();
    var RelationGroup = (function () {
        function RelationGroup() {
            this.relations = [];
        }
        return RelationGroup;
    })();
    FeatureRelations.RelationGroup = RelationGroup;
    var Relation = (function () {
        function Relation() {
        }
        return Relation;
    })();
    FeatureRelations.Relation = Relation;
    var FeatureRelationsCtrl = (function () {
        // dependencies are injected via AngularJS $injector
        // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
        function FeatureRelationsCtrl($scope, $location, $sce, $mapService, $layerService, $messageBusService) {
            var _this = this;
            this.$scope = $scope;
            this.$location = $location;
            this.$sce = $sce;
            this.$mapService = $mapService;
            this.$layerService = $layerService;
            this.$messageBusService = $messageBusService;
            this.relations = [];
            this.featureMessageReceived = function (title, feature) {
                //console.log("FPC: featureMessageReceived");
                switch (title) {
                    case "onFeatureSelect":
                        _this.initRelations();
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
            $messageBusService.subscribe("feature", this.featureMessageReceived);
            var widthOfList = function () {
                var itemsWidth = 0;
                $('#featureTabs>li').each(function () {
                    var itemWidth = $(this).outerWidth();
                    itemsWidth += itemWidth;
                });
                return itemsWidth;
            };
        }
        FeatureRelationsCtrl.prototype.selectRelation = function (relation) {
            this.$layerService.selectFeature(relation.target);
            this.$mapService.zoomTo(relation.target);
        };
        FeatureRelationsCtrl.prototype.initRelations = function () {
            this.relations = [];
            var f = this.$layerService.lastSelectedFeature;
            if (f.fType == null)
                return;
            var propertyTypes = csComp.Helpers.getPropertyTypes(f.fType, this.$layerService.propertyTypeData);
            for (var p in propertyTypes) {
                var pt = propertyTypes[p];
                if (pt.type == "relation") {
                    var rg = new RelationGroup();
                    rg.title = pt.title;
                    rg.id = csComp.Helpers.getGuid();
                    rg.relations = [];
                    if (pt.target) {
                        this.$layerService.project.features.forEach(function (feature) {
                            if (f.properties.hasOwnProperty(pt.subject) && feature.properties.hasOwnProperty(pt.target) && feature.properties[pt.target] == f.properties[pt.subject]) {
                                var rel = new Relation();
                                rel.subject = f;
                                rel.target = feature;
                                rel.title = FeatureProps.CallOut.title(feature.fType, feature);
                                rel.icon = (feature.fType == null || feature.fType.style == null || !feature.fType.style.hasOwnProperty('iconUri') || feature.fType.style.iconUri.toLowerCase().indexOf('_media') >= 0) ? '' : feature.fType.style.iconUri;
                                rg.relations.push(rel);
                            }
                        });
                    }
                    if (rg.relations.length > 0)
                        this.relations.push(rg);
                }
            }
            this.showRelations = this.relations.length > 0;
            if (this.showRelations) {
                $("#relatedHeader").show();
            }
            else {
                $("#relatedHeader").hide();
            }
        };
        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
        FeatureRelationsCtrl.$inject = [
            '$scope',
            '$location',
            '$sce',
            'mapService',
            'layerService',
            'messageBusService'
        ];
        return FeatureRelationsCtrl;
    })();
    FeatureRelations.FeatureRelationsCtrl = FeatureRelationsCtrl;
})(FeatureRelations || (FeatureRelations = {}));

var FilterList;
(function (FilterList) {
    /**
      * Config
      */
    var moduleName = 'csComp';
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
        '$window', '$compile',
        function ($window, $compile) {
            return {
                terminal: false,
                restrict: 'E',
                scope: {},
                templateUrl: 'directives/FilterList/FilterList.tpl.html',
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
    FilterList.html = '<div>    <h4 class="leftpanel-header" translate="FILTERS"></h4>    <div ng-show="vm.$layerService.noFilters" translate="FILTER_INFO"></div>    <a ng-hide="vm.$layerService.noFilters" ng-click="vm.$layerService.resetFilters()"><span class="fa fa-refresh"></span> reset</a>    <div id="filterChart"></div></div>';
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

var Indicators;
(function (Indicators) {
    /**
      * Config
      */
    var moduleName = 'csComp';
    /**
      * Module
      */
    Indicators.myModule;
    try {
        Indicators.myModule = angular.module(moduleName);
    }
    catch (err) {
        // named module does not exist, so create one
        Indicators.myModule = angular.module(moduleName, []);
    }
    /**
      * Directive to display the available map layers.
      */
    Indicators.myModule.directive('indicators', [
        '$compile',
        function ($compile) {
            return {
                terminal: true,
                restrict: 'E',
                scope: {},
                templateUrl: 'directives/Indicators/Indicators.tpl.html',
                compile: function (el) {
                    var fn = $compile(el);
                    return function (scope) {
                        fn(scope);
                    };
                },
                replace: true,
                transclude: true,
                controller: Indicators.IndicatorsCtrl
            };
        }
    ]).directive('bsPopover', function () {
        return function (scope, element, attrs) {
            element.find("a[rel=popover]").popover({ placement: 'right', html: 'true' });
        };
    });
})(Indicators || (Indicators = {}));

var Indicators;
(function (Indicators) {
    Indicators.html = '<div>    <style>        .indicator-list        {            list-style:none;            padding-left:0;        }        .indicator-group{            position: relative;            cursor:pointer;        }        /*sparkline*/        .indicator-sparkline-group {                height: 75px;        }        .indicator-sparkline-title{            font-size:20px;            font-weight:bold;        }        .indicator-sparkline-value{            font-size: 20px;            font-weight: bold;            right: 5px;            position: absolute;            bottom:5px;        }        /*circular*/        .indicator-circular-group {                height: 165px;        }        .indicator-circular-title{            font-size:20px;            font-weight:bold;        }        .indicator-circular-value{            font-size: 20px;            font-weight: bold;            right: 5px;            position: absolute;            bottom:5px;        }        .isActive{            background-color:#B5A3C1;        }        .indicatorwidget-title{              text-align: center;  font-size: 25px;  font-weight: bold;        }    </style>    <div class="indicatorwidget-title">{{data.title}}</div>    <ul class="indicator-list" data-ng-repeat="i in data.indicators" ng-switch on="i.visual">        <li ng-class="{isActive : i.isActive}" class="indicator-group indicator-sparkline-group" ng-click="vm.selectIndicator(i)" ng-switch-when="sparkline">            <div class="indicator-sparkline-title">{{i.title}}</div>            <sparkline-chart timestamps="i.sensorSet.timestamps" sensor="i.sensorSet.values" width="200" height="40" showaxis="false" closed="true" ></sparkline-chart>            <div class="indicator-sparkline-value">{{i.sensorSet.activeValue}}</div>        </li>        <li ng-class="{isActive : i.isActive}" class="indicator-group indicator-circular-group" ng-switch-when="circular">          <radialChart title="{{i.title}}" value="{{i.sensorSet.activeValue}}" width="150" height="150"/>                    </li>        <li ng-class="{isActive : i.isActive}" class="indicator-group" ng-switch-default>            <div>{{i.title}}</div>            <div>{{i.sensorSet.activeValue}}</div>        </li>    </ul></div>';
})(Indicators || (Indicators = {}));

var Indicators;
(function (Indicators) {
    var indicatorData = (function () {
        function indicatorData() {
        }
        return indicatorData;
    })();
    Indicators.indicatorData = indicatorData;
    var indicator = (function () {
        function indicator() {
        }
        return indicator;
    })();
    Indicators.indicator = indicator;
    var IndicatorsCtrl = (function () {
        // dependencies are injected via AngularJS $injector
        // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
        function IndicatorsCtrl($scope, $timeout, $layerService, $messageBus, $mapService) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.$layerService = $layerService;
            this.$messageBus = $messageBus;
            this.$mapService = $mapService;
            $scope.vm = this;
            var par = $scope.$parent;
            this.widget = (par.widget);
            this.checkLayers();
            this.$messageBus.subscribe("layer", function (s) {
                _this.checkLayers();
            });
            $scope.data = this.widget.data;
            $scope.data.indicators.forEach(function (i) {
                i.id = "circ-" + csComp.Helpers.getGuid();
                if (i.sensor != null) {
                    _this.$messageBus.subscribe("sensor-" + i.sensor, function (action, data) {
                        switch (action) {
                            case "update":
                                //console.log("sensor update:" + data);
                                //this.updateIndicator(i);
                                break;
                        }
                    });
                    _this.updateIndicator(i);
                }
            });
            $timeout(function () { return _this.checkLayers(); });
        }
        IndicatorsCtrl.prototype.updateIndicator = function (i) {
            var _this = this;
            this.$layerService.findSensorSet(i.sensor, function (ss) {
                i.sensorSet = ss;
                if (!_this.$scope.$$phase)
                    _this.$scope.$apply();
                setTimeout(function () {
                    // (<any>$("#" + i.id)).circliful();
                }, 1000);
            });
        };
        IndicatorsCtrl.prototype.checkLayers = function () {
            var _this = this;
            if (!this.$layerService.visual.mapVisible)
                return;
            if (!this.$scope.data || !this.$scope.data.indicators)
                return;
            this.$scope.data.indicators.forEach(function (i) {
                if (i.layer != null) {
                    var ss = i.layer.split('/');
                    var l = _this.$layerService.findLayer(ss[0]);
                    if (l != null) {
                        if (ss.length > 1) {
                            i.isActive = l.enabled && l.group.styles.some(function (gs) { return gs.property == ss[1]; });
                        }
                        else {
                            i.isActive = l.enabled;
                        }
                    }
                }
            });
            //if (!this.$scope.$$phase) this.$scope.$apply()
        };
        IndicatorsCtrl.prototype.selectIndicator = function (i) {
            if (!this.$layerService.visual.mapVisible)
                return;
            if (i.layer != null) {
                var ss = i.layer.split('/');
                var l = this.$layerService.findLayer(ss[0]);
                if (l != null) {
                    if (l.enabled) {
                        this.$layerService.checkLayerLegend(l, ss[1]);
                    }
                    else {
                        if (ss.length > 1)
                            l.defaultLegendProperty = ss[1];
                        this.$layerService.addLayer(l);
                    }
                }
            }
            this.checkLayers();
            //console.log(i.title);
        };
        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
        IndicatorsCtrl.$inject = [
            '$scope',
            '$timeout',
            'layerService',
            'messageBusService',
            'mapService'
        ];
        return IndicatorsCtrl;
    })();
    Indicators.IndicatorsCtrl = IndicatorsCtrl;
})(Indicators || (Indicators = {}));

var ExpertMode;
(function (ExpertMode) {
    /**
  * Config
  */
    var moduleName = 'csComp';
    /**
      * Module
      */
    ExpertMode.myModule;
    try {
        ExpertMode.myModule = angular.module(moduleName);
    }
    catch (err) {
        // named module does not exist, so create one
        ExpertMode.myModule = angular.module(moduleName, []);
    }
    /**
      * Directive to set the expert mode, so we can determine what the user should see (degree of difficulty).
      * The expert mode can either be set manually, e.g. using this directive, or by setting the expertMode property in the
      * project.json file. In neither are set, we assume that we are dealing with an expert, so all features should be enabled.
      *
      * Precedence:
      * - when a declaration is absent, assume Expert.
      * - when the mode is set in local storage, take that value.
      * - when the mode is set in the project.json file, take that value.
      *
      * As we want the expertMode to be always available, we have added it to the MapService service.
      */
    ExpertMode.myModule
        .directive('expertMode', [
        '$compile',
        function ($compile) {
            return {
                terminal: true,
                restrict: 'E',
                scope: {},
                templateUrl: 'directives/ExpertMode/ExpertMode.tpl.html',
                compile: function (el) {
                    var fn = $compile(el);
                    return function (scope) {
                        fn(scope);
                    };
                },
                //link: function (scope, element, attrs) {
                //     // Since we are wrapping the rating directive in this directive, I couldn't use transclude,
                //     // so I copy the existing attributes manually.
                //     var attributeString = '';
                //     for (var key in attrs) {
                //         if (key.substr(0, 1) !== '$' && attrs.hasOwnProperty(key)) attributeString += key + '="' + attrs[key] + '" ';
                //     }
                //     var html = '<rating ng-model="expertMode" '
                //         + attributeString
                //         + 'tooltip-html-unsafe="{{\'EXPERTMODE.EXPLANATION\' | translate}}" tooltip-placement="bottom" tooltip-trigger="mouseenter" tooltip-append-to-body="false"'
                //         + 'max="3"></rating>';
                //     var e = $compile(html)(scope);
                //     element.replaceWith(e);
                // },
                replace: true,
                transclude: true,
                controller: ExpertMode.ExpertModeCtrl
            };
        }
    ]);
})(ExpertMode || (ExpertMode = {}));

var ExpertMode;
(function (ExpertMode) {
    ExpertMode.html = '<div class="navbar-collapse collapse"     tooltip-html-unsafe="{{\'EXPERTMODE.EXPLANATION\' | translate}}"     tooltip-placement="left"     tooltip-trigger="mouseenter"     tooltip-append-to-body="false">    <ul class="nav navbar-nav">        <li class="dropdown" style="margin-top:-15px">            <a href=""               class="navbar-brand dropdown-toggle pull-left"               data-toggle="dropdown"               style="color:white; margin-left:-10px;">                <div class="circle"><span data-ng-class="vm.getCssClass()" style="width: 32px; height: 32px"></span></div>            </a>            <ul class="dropdown-menu" role="menu">                <li>                    <a data-ng-click="vm.setExpertMode(1)">                        <span class="beginnerUserIcon" style="margin-left: -10px; width: 40px; height: 32px"></span>                        <div translate>EXPERTMODE.BEGINNER</div>                    </a>                </li>                <li>                    <a data-ng-click="vm.setExpertMode(2)">                        <span class="intermediateUserIcon" style="margin-left: -10px; width: 40px; height: 32px"></span>                        <div translate>EXPERTMODE.INTERMEDIATE</div>                    </a>                </li>                <li>                    <a data-ng-click="vm.setExpertMode(3)">                        <span class="expertUserIcon" style="margin-left: -10px; width: 40px; height: 32px"></span>                        <div translate>EXPERTMODE.EXPERT</div>                    </a>                </li>            </ul>        </li>    </ul></div>';
})(ExpertMode || (ExpertMode = {}));

var ExpertMode;
(function (ExpertMode) {
    var Expertise = csComp.Services.Expertise;
    var ExpertModeCtrl = (function () {
        function ExpertModeCtrl($scope, $localStorageService, $layerService, $mapService, $messageBus) {
            var _this = this;
            this.$scope = $scope;
            this.$localStorageService = $localStorageService;
            this.$layerService = $layerService;
            this.$mapService = $mapService;
            this.$messageBus = $messageBus;
            $scope.vm = this;
            $scope.expertMode = $mapService.expertMode;
            $messageBus.subscribe('expertMode', function (title, mode) {
                if (title !== 'newExpertise')
                    return;
                $scope.expertMode = mode;
            });
            $scope.$watch('expertMode', function () {
                _this.setExpertMode($scope.expertMode);
            });
        }
        /**
        * Get the CSS class to render the mode.
        */
        ExpertModeCtrl.prototype.getCssClass = function () {
            switch (this.$mapService.expertMode) {
                case Expertise.Beginner:
                    return 'beginnerUserIcon';
                    break;
                case Expertise.Intermediate:
                    return 'intermediateUserIcon';
                    break;
                case Expertise.Expert:
                    return 'expertUserIcon';
                    break;
            }
        };
        /**
        * Set the expert mode: although we assume that each directive is responsible for managing it by listening
        * to the expertMode.newExpertise message, we already set some common options here.
        * This is to reduce the dependency on this directive.
        */
        ExpertModeCtrl.prototype.setExpertMode = function (expertMode) {
            this.$messageBus.publish('expertMode', 'newExpertise', expertMode);
        };
        ExpertModeCtrl.$inject = [
            '$scope',
            'localStorageService',
            'layerService',
            'mapService',
            'messageBusService'
        ];
        return ExpertModeCtrl;
    })();
    ExpertMode.ExpertModeCtrl = ExpertModeCtrl;
})(ExpertMode || (ExpertMode = {}));

var LayersDirective;
(function (LayersDirective) {
    /**
      * Config
      */
    var moduleName = 'csComp';
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
                templateUrl: 'directives/LayersList/LayersDirective.tpl.html',
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
    ]);
})(LayersDirective || (LayersDirective = {}));

var LayersDirective;
(function (LayersDirective) {
    LayersDirective.html = '<div>    <h4 class="leftpanel-header" translate="LAYERS"></h4>    <div style="overflow-y: auto; overflow-x: hidden; margin-top: -10px" resize resize-y="95">        <div data-ng-repeat="group in vm.$layerService.project.groups" style="margin-left: 5px">            <div style="float: left; margin-left: -5px; margin-top: 5px" data-toggle="collapse" data-target="#layergroup_{{group.id}}"><i class="fa fa-chevron-down togglebutton toggle-arrow-down"></i><i class="fa fa-chevron-up togglebutton toggle-arrow-up"></i></div>            <div popover="{{(group.description) ? group.description : \'\'}}"                 popover-placement="right"                 popover-width="400"                 popover-trigger="mouseenter"                 class="group-title">{{group.title}}</div>            <div id="layergroup_{{group.id}}" class="collapse in">                <div popover="{{(layer.description) ? layer.description : \'\'}}"                     popover-placement="right"                     popover-trigger="mouseenter"                     data-ng-repeat="layer in group.layers">                    <!--bs-popover>-->                    <div context-menu="options(layer)" style="list-style-type: none; padding: 0;" data-ng-class="{indent: layer.isSublayer}">                        <style>                            .left-menu{                                background: url("includes/images/menu-left.png");	                            background-position: right bottom;	                            background-repeat: no-repeat;                                position:absolute;                                right:3px;                                top:0;                                width:16px;                                height:16px;                                cursor:pointer;                            }                            .menu {    position:relative;}.menu > .dropdown-menu {    position:static;    display:block;}                        </style>                        <!--<button type="button" class="btn btn-default" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." data-original-title="" title="">Right</button>-->                        <div  ng-hide="group.oneLayerActive" class="checkbox checkbox-primary" style="margin-left: 20px">                            <input type="checkbox" id="cblayer{{layer.id}}" ng-model="layer.enabled" data-ng-click="vm.toggleLayer(layer);">                            <label for="cblayer{{layer.id}}">                                {{layer.title}}                            </label>                            <div ng-show="layer.enabled" class="left-menu dropdown-toggle pull-left"  ng-click="vm.openLayerMenu($event)" >                            </div>                            <div ng-show="layer.isLoading" class="spinner">                            <div class="bounce1"></div>                            <div class="bounce2"></div>                            <div class="bounce3"></div>                        </div>                        </div>                        <div ng-show="group.oneLayerActive" class="radio radio-primary" style="margin-left: 20px">                            <input type="radio" ng-value="true" id="rblayer{{layer.id}}" ng-model="layer.enabled" data-ng-click="vm.toggleLayer(layer);">                            <label for="rblayer{{layer.id}}">                                {{layer.title}}                            </label>                            <div ng-show="layer.enabled" class="left-menu dropdown-toggle pull-left"  ng-click="vm.openLayerMenu($event)" >                            </div>                            <div ng-show="layer.isLoading" class="spinner">                            <div class="bounce1"></div>                            <div class="bounce2"></div>                            <div class="bounce3"></div>                        </div>                    </div>                </div>            </div>        </div>    </div></div>';
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
            $scope.options = (function (layer) {
                if (!layer.enabled)
                    return null;
                if (layer.layerSource) {
                    return layer.layerSource.layerMenuOptions(layer);
                }
            });
        }
        LayersDirectiveCtrl.prototype.openLayerMenu = function (e) {
            //e.stopPropagation();
            $('.left-menu').contextmenu('show', e);
            //alert('open layers');
        };
        LayersDirectiveCtrl.prototype.toggleLayer = function (layer) {
            $(".left-menu").on("click", function (clickE) {
                //alert('context menu');
                $(this).contextmenu({ x: clickE.offsetX, y: clickE.offsetY });
            });
            //layer.enabled = !layer.enabled;
            //if (this.$layerService.loadedLayers.containsKey(layer.id)) {
            // Unselect when dealing with a radio group, so you can turn a loaded layer off again.
            if (layer.group.oneLayerActive && this.$layerService.findLoadedLayer(layer.id))
                layer.enabled = false;
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

var LegendList;
(function (LegendList) {
    /**
      * Config
      */
    var moduleName = 'csComp';
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
        '$window', '$compile',
        function ($window, $compile) {
            return {
                terminal: false,
                restrict: 'E',
                scope: {},
                templateUrl: 'directives/LegendList/LegendList.tpl.html',
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
    LegendList.html = '<div style="position: relative;">    <h4 class="leftpanel-header" translate="LEGEND"></h4>    <div>        <div ng-repeat="legendItem in legendItems" class="legendItem">            <div class="legendIcon">                <img ng-src="{{legendItem.uri}}" class="legendImage" />            </div>            <span class="legendText">{{legendItem.title}}</span>        </div>    </div></div>';
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

var Heatmap;
(function (Heatmap) {
    'use strict';
    /**
     * Config
     */
    var moduleName = 'csComp';
    /**
     * Module
     */
    Heatmap.myModule;
    try {
        Heatmap.myModule = angular.module(moduleName);
    }
    catch (err) {
        // named module does not exist, so create one
        Heatmap.myModule = angular.module(moduleName, []);
    }
    /**
     * Directive to display a heatmap control.
     */
    Heatmap.myModule
        .directive('heatmap', [
        '$window', '$compile',
        function ($window, $compile, $templateCache) {
            return {
                terminal: true,
                restrict: 'EA',
                scope: {},
                templateUrl: 'directives/Heatmap/Heatmap.tpl.html',
                compile: function (el) {
                    var fn = $compile(el);
                    return function (scope) {
                        fn(scope);
                    };
                },
                replace: true,
                transclude: true,
                controller: Heatmap.HeatmapCtrl
            };
        }
    ]);
})(Heatmap || (Heatmap = {}));

var Heatmap;
(function (Heatmap) {
    Heatmap.html = '<div>    <div class="wide-tooltip">        <span class="pull-right fa fa-info-circle fa-2x" tooltip-html-unsafe="{{\'HEATMAP.DESCRIPTION\' | translate}}" tooltip-placement="bottom" tooltip-trigger="mouseenter" tooltip-append-to-body="false" style="margin-right: 5px;"></span>        <h4 class="leftpanel-header" translate>HEATMAP</h4>    </div>    <div>        <select data-ng-model="vm.heatmapModel" data-ng-options="heatmap.title for heatmap in vm.heatmapModels" data-ng-change="vm.updateHeatmap()" style="width: 65%; margin-bottom: 10px;"></select>        <div data-ng-if="vm.expertMode" class="pull-right">            <a href="" data-ng-click="vm.createHeatmap()" tooltip="{{\'HEATMAP.ADD_HEATMAP\' | translate}}" style="margin-right:5px;"><i class="fa fa-plus"></i></a>            <a href="" data-ng-click="vm.removeHeatmap(vm.heatmapModel)" tooltip="{{\'HEATMAP.DELETE_HEATMAP\' | translate}}" style="margin-right:5px;"><i class="fa fa-trash"></i></a>            <a href="" data-ng-click="vm.editHeatmap(vm.heatmapModel)" tooltip="{{\'HEATMAP.EDIT_HEATMAP\' | translate}}" style="margin-right:5px;"><i class="fa fa-edit"></i></a>            <a href="" data-ng-click="vm.exportHeatmap(vm.heatmapModel)" tooltip="{{\'HEATMAP.EXPORT_HEATMAP\' | translate}}" tooltip-placement="right" style="margin-right:5px;"><i class="fa fa-download"></i></a>        </div>    </div>    <div data-ng-if="vm.heatmapModel" style="margin-bottom: 7px; margin-left: -5px">        <div style="display: inline; font-weight: bold" translate>HEATMAP.INTENSITY_SCALE</div>        <voting class="pull-right"                data-ng-change="vm.intensityScaleUpdated()"                min="1"                max="5"                ng-model="vm.heatmapModel.heatmapSettings.intensityScale"                style="margin-bottom: 3px; margin-right: 5px"></voting>    </div>    <div data-ng-if="vm.heatmapModel" style="margin-bottom: 20px; margin-left: -5px">        <div style="display: inline; font-weight: bold" translate>HEATMAP.RESOLUTION</div>        <voting class="pull-right"                data-ng-change="vm.resolutionUpdated()"                min="1"                max="3"                ng-model="vm.heatmapModel.heatmapSettings.resolution"                style="margin-bottom: 3px; margin-right: 5px"></voting>    </div>    <div data-ng-if="vm.heatmapModel" style="overflow-y: auto; overflow-x: hidden; margin-left: -5px;" resize resize-y="140">        <div data-ng-repeat="hi in vm.heatmapModel.heatmapItems" class="wide-tooltip">            <div data-ng-if="hi.isSelected">                <div class="truncate" data-ng-class="{true: \'ignoredCriteria\'}[hi.userWeight == 0]" style="display: inline-block; width: 180px; font-weight: bold">{{hi.toString()}}</div>                <voting class="pull-right" data-ng-class="vm.getVotingClass(hi)" data-ng-change="vm.weightUpdated()" min="-5" max="5" ng-model="hi.userWeight" style="margin-right: 5px; margin-bottom: 3px;"></voting>            </div>        </div>    </div>    <div data-ng-if="!vm.heatmapModel">        <div data-ng-if="vm.expertMode" translate>HEATMAP.INFO_EXPERT</div>        <div data-ng-if="!vm.expertMode" translate>HEATMAP.INFO</div>    </div></div>';
})(Heatmap || (Heatmap = {}));

var Heatmap;
(function (Heatmap) {
    'use strict';
    var HeatmapCtrl = (function () {
        function HeatmapCtrl($scope, $modal, $translate, $timeout, $localStorageService, $layerService, $mapService, messageBusService) {
            var _this = this;
            this.$scope = $scope;
            this.$modal = $modal;
            this.$translate = $translate;
            this.$timeout = $timeout;
            this.$localStorageService = $localStorageService;
            this.$layerService = $layerService;
            this.$mapService = $mapService;
            this.messageBusService = messageBusService;
            this.heatmap = L.geoJson([]);
            this.heatmapModels = [];
            this.expertMode = true;
            this.moveListenerInitialized = false;
            this.projLayer = new csComp.Services.ProjectLayer();
            $scope.vm = this;
            messageBusService.subscribe('layer', function (title, layer) {
                switch (title) {
                    case 'deactivate':
                        /* For an explanation to the removing of layers, see the bottom of this file */
                        if (layer.type && layer.type === "heatmap" && layer.id === _this.projLayer.id && layer != _this.projLayer) {
                            _this.$layerService.removeLayer(_this.projLayer);
                            delete (_this.heatmapModel);
                            _this.initializeHeatmap();
                        }
                        break;
                    case 'activated':
                        if (layer.type && layer.type === "heatmap")
                            _this.updateAvailableHeatmaps();
                        //this.updateHeatmap();
                        break;
                }
            });
            messageBusService.subscribe('project', function (title) {
                switch (title) {
                    case 'loaded':
                        _this.expertMode = $layerService.project != null
                            && $layerService.project.hasOwnProperty('userPrivileges')
                            && $layerService.project.userPrivileges.hasOwnProperty('heatmap')
                            && $layerService.project.userPrivileges.heatmap.hasOwnProperty('expertMode')
                            && $layerService.project.userPrivileges.heatmap.expertMode;
                        _this.updateAvailableHeatmaps();
                        _this.initializeHeatmap();
                        break;
                }
            });
            /*messageBusService.subscribe('feature', this.featureMessageReceived);*/
            $translate('HEATMAP.DELETE_MSG').then(function (translation) {
                HeatmapCtrl.confirmationMsg1 = translation;
            });
            $translate('HEATMAP.DELETE_MSG2').then(function (translation) {
                HeatmapCtrl.confirmationMsg2 = translation;
            });
        }
        HeatmapCtrl.prototype.updateAvailableHeatmaps = function () {
            var _this = this;
            if (!this.heatmapModel) {
                this.heatmapModels = [];
                if (this.$layerService.project.groups) {
                    this.$layerService.project.groups.forEach(function (group) {
                        group.layers.forEach(function (layer) {
                            if (layer.type === "heatmap") {
                                var hm = new Heatmap.HeatmapModel(layer.title);
                                hm.deserialize(layer);
                                _this.heatmapModels.push(hm);
                                if (layer.enabled)
                                    _this.heatmapModel = hm;
                            }
                        });
                    });
                }
            }
            else {
                for (var index = 0; index < this.heatmapModels.length; index++) {
                    if (this.heatmapModel.id == this.heatmapModels[index].id) {
                        this.heatmapModels.splice(index, 1);
                        break;
                    }
                }
                this.heatmapModels.push(this.heatmapModel);
            }
        };
        HeatmapCtrl.prototype.createHeatmap = function () {
            this.heatmapModel = new Heatmap.HeatmapModel('Heatmap');
            if (this.projLayer.data)
                this.$layerService.removeLayer(this.projLayer);
            //Create projectlayer for the heatmap
            this.projLayer.type = "heatmap";
            this.projLayer.layerRenderer = "heatmap";
            this.projLayer.enabled = true;
            this.projLayer.group = new csComp.Services.ProjectGroup();
            this.projLayer.group.oneLayerActive = true;
            this.projLayer.group.layers = [];
            this.projLayer.group.filters = [];
            this.projLayer.group.styles = [];
            this.projLayer.group.markers = [];
            this.projLayer.heatmapSettings = new Heatmap.HeatmapSettings();
            this.projLayer.heatmapItems = [];
            this.projLayer.id = csComp.Helpers.getGuid();
            this.heatmap = L.geoJson([]);
            this.showHeatmapEditor(this.heatmapModel);
            //this.$layerService.addLayer(this.projLayer);
        };
        HeatmapCtrl.prototype.editHeatmap = function (heatmap) {
            this.showHeatmapEditor(heatmap);
        };
        HeatmapCtrl.prototype.exportHeatmap = function (heatmap) {
            var _this = this;
            /* Add active feature layer reference to the referencelist (TODO: find reference layer through enabled features) */
            this.heatmapModel.heatmapSettings.referenceList = [];
            this.heatmapModel.heatmapItems.forEach(function (hi) {
                if (hi.isSelected) {
                    _this.$layerService.project.groups.forEach(function (group) {
                        if (group.title == "Features") {
                            group.layers.forEach(function (l) {
                                if (l.enabled) {
                                    _this.heatmapModel.heatmapSettings.addReference(l.reference);
                                }
                            });
                        }
                    });
                }
            });
            /* Print the heatmap settings to the console in json format */
            console.log("\n-----------------\n" + "Exported heatmap starts here: \n");
            console.log(heatmap.serialize());
            console.log("\n-----------------\n" + "Exported heatmap ends here. \n");
            this.messageBusService.notify('Heatmap exported successfully', 'Your heatmap was exported to the console successfully.', csComp.Services.NotifyLocation.TopLeft);
        };
        HeatmapCtrl.prototype.removeHeatmap = function (heatmap) {
            var _this = this;
            if (!heatmap)
                return;
            var title = String.format(HeatmapCtrl.confirmationMsg1, heatmap.title);
            this.messageBusService.confirm(title, HeatmapCtrl.confirmationMsg2, function (result) {
                if (!result)
                    return;
                _this.$timeout(function () {
                    _this.deleteHeatmap(heatmap);
                    _this.updateAvailableHeatmaps();
                    //if (this.heatmap) this.updateHeatmap();
                    //if (this.heatmap) this.$mapService.map.removeLayer(this.heatmap);
                }, 0);
            });
            this.scopeApply();
        };
        HeatmapCtrl.prototype.deleteHeatmap = function (heatmap) {
            var _this = this;
            if (!heatmap)
                return;
            var index = this.heatmapModels.indexOf(heatmap);
            if (index >= 0)
                this.heatmapModels.splice(index, 1);
            this.$layerService.removeLayer(this.projLayer);
            // If the current heatmaplayer was a projectlayer, disable that one too
            if (this.$layerService.project.groups) {
                this.$layerService.project.groups.forEach(function (group) {
                    group.layers.forEach(function (layer) {
                        if (layer.type === "heatmap" && layer.id === _this.projLayer.id) {
                            _this.$layerService.removeLayer(layer);
                        }
                    });
                });
            }
            delete (this.heatmapModel);
            delete (this.projLayer);
            this.projLayer = new csComp.Services.ProjectLayer();
            this.initializeHeatmap();
        };
        /**
         * Show the heat map editor in a modal.
         */
        HeatmapCtrl.prototype.showHeatmapEditor = function (heatmap) {
            var _this = this;
            var modalInstance = this.$modal.open({
                templateUrl: 'directives/Heatmap/HeatmapEditorView.tpl.html',
                controller: Heatmap.HeatmapEditorCtrl,
                resolve: {
                    heatmap: function () { return heatmap; }
                }
            });
            modalInstance.result.then(function (heatmap) {
                _this.heatmapModel = heatmap;
                var i = _this.heatmapModels.indexOf(heatmap);
                if (i >= 0)
                    _this.heatmapModels.splice(i, 1);
                _this.heatmapModels.push(heatmap);
                _this.updateHeatmap();
                console.log('Updated heatmap');
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
                delete (_this.heatmapModel);
            });
        };
        HeatmapCtrl.prototype.scopeApply = function () {
            if (this.$scope.$root.$$phase !== '$apply' && this.$scope.$root.$$phase !== '$digest') {
                this.$scope.$apply();
            }
        };
        HeatmapCtrl.prototype.getVotingClass = function (hi) {
            if (hi == null || this.heatmapModel == null || hi.userWeight === 0 || hi.userWeight < -5 || hi.userWeight > 5)
                return 'disabledHeatmap';
            return hi.userWeight > 0 ? 'prefer' : 'avoid';
        };
        HeatmapCtrl.prototype.weightUpdated = function () {
            if (!this.heatmapModel)
                return;
            this.heatmapModel.updateWeights();
            this.updateHeatmap();
        };
        HeatmapCtrl.prototype.intensityScaleUpdated = function () {
            if (!this.heatmapModel)
                return;
            //this.heatmapModel.updateWeights();
            this.updateHeatmap();
        };
        HeatmapCtrl.prototype.resolutionUpdated = function () {
            if (!this.heatmapModel)
                return;
            this.updateHeatmap();
        };
        /**
         * Update the available pre-set heatmaps.
         */
        HeatmapCtrl.prototype.updateHeatmap = function () {
            var _this = this;
            if (this.heatmapModel) {
                // If the current heatmapmodel comes from a projectlayer, disable that layer
                if (this.$layerService.project.groups) {
                    this.$layerService.project.groups.forEach(function (group) {
                        group.layers.forEach(function (layer) {
                            if (layer.type === "heatmap" && layer.id === _this.heatmapModel.id && layer.mapLayer) {
                                _this.$layerService.map.map.removeLayer(layer.mapLayer);
                                layer.enabled = true;
                            }
                        });
                    });
                }
                this.projLayer.heatmapItems = this.heatmapModel.heatmapItems;
                this.projLayer.heatmapSettings = this.heatmapModel.heatmapSettings;
                this.projLayer.id = this.heatmapModel.id;
                var currentZoom = this.$mapService.getMap().getZoom();
                if (currentZoom < this.heatmapModel.heatmapSettings.minZoom || currentZoom > this.heatmapModel.heatmapSettings.maxZoom) {
                    console.log("Heatmap is not supported for the current zoom level.");
                    this.$layerService.loadRequiredLayers(this.projLayer); // Make sure to load the required layers even if heatmap is not yet being drawn
                    return;
                }
                else {
                }
                this.$layerService.removeLayer(this.projLayer);
                this.$layerService.addLayer(this.projLayer);
            }
        };
        ///**
        //* Add a heatmap layer to the map.
        //*/
        HeatmapCtrl.prototype.initializeHeatmap = function () {
            var _this = this;
            this.projLayer.type = "heatmap";
            this.projLayer.layerRenderer = "heatmap";
            this.projLayer.enabled = false;
            this.projLayer.group = new csComp.Services.ProjectGroup();
            this.projLayer.group.oneLayerActive = true;
            this.projLayer.group.layers = [];
            this.projLayer.group.filters = [];
            this.projLayer.group.styles = [];
            this.projLayer.group.markers = [];
            this.projLayer.mapLayer = new L.LayerGroup();
            this.projLayer.heatmapSettings = new Heatmap.HeatmapSettings();
            this.projLayer.heatmapItems = [];
            this.projLayer.data = JSON;
            this.projLayer.id = "";
            if (!this.moveListenerInitialized) {
                this.$layerService.map.map.addEventListener('moveend', function (event) {
                    _this.updateHeatmap();
                });
                this.moveListenerInitialized = true;
            }
        };
        HeatmapCtrl.$inject = [
            '$scope',
            '$modal',
            '$translate',
            '$timeout',
            'localStorageService',
            'layerService',
            'mapService',
            'messageBusService'
        ];
        return HeatmapCtrl;
    })();
    Heatmap.HeatmapCtrl = HeatmapCtrl;
})(Heatmap || (Heatmap = {}));
/* Heatmap layers:
 * ---------------
 * Two layers are used for the heatmaps, which are both very similar but different in an important way. The difference
 * lies in the fact that one layer comes directly from the project.json file. This layer is parsed and added to the layerservice
 * directly when it is enabled in the 'Layers' panel. The second layer is 'this.projLayer', which looks almost identical to
 * the parsed projectLayer, but it is generated programmatically. When a new heatmap is created, or a predefined heatmap is edited,
 * this.projLayer will be added to the layerservice. Very importantly, the MoveListener is connected to this.projLayer. That means
 * that every time the map is moved, 'this.projLayer' will contain the current heatmap, even when it was added from project.json.
 * Therefore, when one layer is being disabled, it needs to be checked whether the other layer is present in the layerservice,
 * and if so, it should be removed too.
 */

var Heatmap;
(function (Heatmap) {
    'use strict';
    var HeatmapEditorCtrl = (function () {
        function HeatmapEditorCtrl($scope, $modalInstance, $layerService, $translate, messageBusService, heatmap) {
            var _this = this;
            this.$scope = $scope;
            this.$modalInstance = $modalInstance;
            this.$layerService = $layerService;
            this.$translate = $translate;
            this.messageBusService = messageBusService;
            this.heatmap = heatmap;
            this.scoringFunctions = [];
            $scope.vm = this;
            this.scoringFunctions.push(new Heatmap.ScoringFunction(Heatmap.ScoringFunctionType.LinearAscendingDescending));
            $translate('HEATMAP.LINEAR_ASC_DESC').then(function (translation) {
                _this.scoringFunctions[0].title = translation;
            });
            this.dataset = csComp.Helpers.loadMapLayers($layerService);
            if (!heatmap)
                heatmap = new Heatmap.HeatmapModel('Heatmap');
            for (var k in this.dataset.featureTypes) {
                if (this.dataset.featureTypes.hasOwnProperty(k)) {
                    var ft = this.dataset.featureTypes[k];
                    heatmap.addHeatmapItem(new Heatmap.HeatmapItem(ft.name, ft));
                    var propertyTypeData;
                    if (!ft.propertyTypeData)
                        continue;
                    ft.propertyTypeData.forEach(function (pt) {
                        if (pt.type == 'options') {
                            var i = 0;
                            pt.options.forEach(function (o) {
                                var hi = new Heatmap.HeatmapItem(o, ft);
                                hi.propertyLabel = pt.label;
                                hi.propertyTitle = pt.title;
                                hi.optionIndex = i++;
                                heatmap.addHeatmapItem(hi);
                            });
                        }
                    });
                }
            }
        }
        HeatmapEditorCtrl.prototype.save = function () {
            this.$modalInstance.close(this.heatmap);
        };
        HeatmapEditorCtrl.prototype.cancel = function () {
            this.$modalInstance.dismiss('cancel');
        };
        HeatmapEditorCtrl.prototype.toggleItemDetails = function (index) {
            this.showItem = this.showItem == index ? -1 : index;
            console.log("Toggle item");
        };
        HeatmapEditorCtrl.$inject = [
            '$scope',
            '$modalInstance',
            'layerService',
            '$translate',
            'messageBusService',
            'heatmap'
        ];
        return HeatmapEditorCtrl;
    })();
    Heatmap.HeatmapEditorCtrl = HeatmapEditorCtrl;
})(Heatmap || (Heatmap = {}));

var HeatmapEditorView;
(function (HeatmapEditorView) {
    HeatmapEditorView.html = '<div class="modal-content">    <div class="modal-header">        <button type="button" class="close" data-ng-click="vm.cancel()" aria-hidden="true">&times;</button>        <h3 class="modal-title" translate>HEATMAP.EDITOR_TITLE</h3>    </div>    <div class="modal-body container-fluid">        <div class="row-fluid">            <div class="col-xs-3" style="margin-top: 5px; margin-right: 0px; padding-left: 0;" translate>HEATMAP.TITLE_TAG</div>            <input type="text" class="col-xs-4" data-ng-model="vm.heatmap.title" style="padding: 0; margin: 0 5px" placeholder="{{ \'HEATMAP.TITLE\' | translate }}" />        </div>        <div class="row-fluid" style="margin-top: 30px;">            <div class="col-xs-3" style="margin-top: 5px; margin-right: 5px; padding-left: 0;" translate>HEATMAP.MIN_MAX_ZOOM</div>            <input type="number" class="col-xs-1" style="padding: 0; margin-right: 5px;" data-ng-model="vm.heatmap.heatmapSettings.minZoom" />            <input type="number" class="col-xs-1" style="padding: 0;" data-ng-model="vm.heatmap.heatmapSettings.maxZoom" />        </div>        <h4 class="row-fluid" style="margin-top: 70px;" translate>HEATMAP.MAIN_FEATURE</h4>        <!--<select data-ng-model="vm.selectedFeatureType"                data-ng-change="vm.loadPropertyTypes()"                data-ng-options="item as item.name for (key, item) in vm.dataset.featureTypes"                class="form-control row-fluid"></select>        <h4 class="row-fluid" translate>HEATMAP.PROPERTIES</h4>-->        <ul class="form-group row-fluid" style="margin-top: 1em; margin-left: -2em; overflow-y: auto; overflow-x: hidden;"            resize resize-y="450">            <li ng-repeat="hi in vm.heatmap.heatmapItems"                class="row-fluid list-unstyled truncate">                <div style="padding: 5px 0;" class="row-fluid">                    <!--                    name="vm.selectedTitles[]" value="{{hi.title}}"-->                    <input type="checkbox"                           data-ng-checked="hi.isSelected"                           data-ng-click="hi.isSelected = !hi.isSelected">&nbsp;&nbsp;{{hi.toString()}}                    <div data-ng-if="hi.isSelected" class="pull-right">                        <a href="" class="pull-right"                           style="margin-right: 5px;"                           data-ng-click="vm.toggleItemDetails($index)"><i class="fa fa-2x fa-edit"></i></a>                    </div>                </div>                <div class="row-fluid" data-ng-show="vm.showItem == {{$index}}" id="scoringFunction">                    <select class="col-xs-10"                            style="margin-right: 5px; margin-bottom: 5px;"                            data-ng-init="hi.scoringFunctionType = hi.scoringFunctionType || vm.scoringFunctions[0]"                            data-ng-model="hi.scoringFunctionType"                            data-ng-options="sf as sf.title for sf in vm.scoringFunctions"></select>                    <div class="row-fluid">                        <div class="row-fluid">                            <div class="col-xs-3" style="margin-top: 5px; margin-right: 5px; padding-left: 0;" translate>HEATMAP.AT_LOCATION_VALUE</div>                            <div class="col-xs-3" style="margin-top: 5px; margin-right: 5px; padding-left: 0;" translate>HEATMAP.DISTANCE_MAX_VALUE</div>                            <div class="col-xs-3" style="margin-top: 5px; padding-left: 0;" translate>HEATMAP.LOST_INTEREST_VALUE</div>                        </div>                        <div class="row-fluid">                            <input type="number" class="col-xs-3" style="padding: 0; margin-right: 5px;" data-ng-model="hi.idealityMeasure.atLocation" placeholder="{{ \'HEATMAP.AT_LOCATION_VALUE\' | translate }}" />                            <input type="number" class="col-xs-3" style="padding: 0; margin-right: 5px;" data-ng-model="hi.idealityMeasure.idealDistance" placeholder="{{ \'HEATMAP.DISTANCE_MAX_VALUE\' | translate }}" />                            <input type="number" class="col-xs-3" style="padding: 0;" data-ng-model="hi.idealityMeasure.lostInterestDistance" placeholder="{{ \'HEATMAP.LOST_INTEREST_VALUE\' | translate }}" />                        </div>                        <!--<div class="pull-right" data-ng-class="hi.scoringFunctionType.cssClass" style="width: 40px; height: 28px; margin-top: -5px;"></div>-->                    </div>                </div>            </li>        </ul>    </div>    <div class="modal-footer">        <button type="button" class="btn btn-warning" data-ng-click="vm.cancel()" translate>CANCEL_BTN</button>        <button type="button" class="btn btn-primary" data-ng-click="vm.save()" translate>OK_BTN</button>    </div></div>';
})(HeatmapEditorView || (HeatmapEditorView = {}));

var Heatmap;
(function (Heatmap) {
    var HeatmapItem = (function () {
        function HeatmapItem(title, featureType, weight, userWeight, isSelected, idealityMeasure, propertyTitle, propertyLabel, optionIndex) {
            if (weight === void 0) { weight = 0; }
            if (userWeight === void 0) { userWeight = 1; }
            if (isSelected === void 0) { isSelected = false; }
            if (idealityMeasure === void 0) { idealityMeasure = new Heatmap.IdealityMeasure(); }
            this.title = title;
            this.featureType = featureType;
            this.weight = weight;
            this.userWeight = userWeight;
            this.isSelected = isSelected;
            this.idealityMeasure = idealityMeasure;
            this.propertyTitle = propertyTitle;
            this.propertyLabel = propertyLabel;
            this.optionIndex = optionIndex;
            this.heatspots = [];
            // TODO Needs improvement based on actual location
            this.setScale(52);
        }
        HeatmapItem.prototype.calculateHeatspots = function (feature, cellWidth, cellHeight, horizCells, vertCells, mapBounds, paddingRatio) {
            // right type?
            if (!this.isSelected || this.featureType.name !== feature.fType.name)
                return null;
            if (this.heatspots.length === 0)
                this.calculateHeatspot(cellWidth, cellHeight);
            // create heatspot solely based on feature type?
            if (!this.propertyLabel) {
                return this.pinHeatspotToGrid(feature, horizCells, vertCells, mapBounds, paddingRatio);
            }
            // create heatspot based on the preferred option?
            if (feature.properties.hasOwnProperty(this.propertyLabel)
                && feature.properties[this.propertyLabel] === this.optionIndex) {
                return this.pinHeatspotToGrid(feature, horizCells, vertCells, mapBounds, paddingRatio);
            }
            return null;
        };
        /**
        * Calculate the intensity around the location.
        * NOTE We are performing a relative computation around location (0,0) in a rectangular grid.
        */
        HeatmapItem.prototype.calculateHeatspot = function (cellWidth, cellHeight) {
            var maxRadius = this.idealityMeasure.lostInterestDistance;
            var horizCells = Math.floor(maxRadius / cellWidth);
            var vertCells = Math.floor(maxRadius / cellHeight);
            var sCellSize = cellWidth * cellHeight;
            var arrayLength = horizCells * vertCells;
            this.heatspots = new Array(arrayLength);
            this.heatspots.push(new Heatmap.Heatspot(0, 0, this.weight * this.idealityMeasure.atLocation));
            for (var i = -vertCells; i <= vertCells; i++) {
                for (var j = -horizCells; j <= horizCells; j++) {
                    var radius = Math.sqrt(i * i * sCellSize + j * j * sCellSize);
                    var weightedIntensity = this.weight * this.idealityMeasure.computeIdealityAtDistance(radius);
                    if (!(i == 0 && j == 0) && weightedIntensity != 0) {
                        this.heatspots.push(new Heatmap.Heatspot(i, j, weightedIntensity));
                    }
                }
            }
            //var latRadius = radius * HeatmapItem.meterToLatDegree; 
            //var lonRadius = radius * HeatmapItem.meterToLonDegree; 
            //for (var lat = -latRadius; lat < latRadius; lat += deltaLatDegree) {
            //    for (var lon = -lonRadius; lat < lonRadius; lat += deltaLonDegree) {
            //        // TODO Compute radius
            //        var intensity = this.idealityMeasure.computeIdealityAtDistance(radius);
            //        this.heatspots.push(new Heatspot(lat, lon, this.weight * intensity.ideality));
            //    }
            //}
            //var count = 0;
            //while (count++ < 200) {
            //    var radius    = Math.random() * this.idealityMeasure.lostInterestDistance;
            //    var latRadius = radius * HeatmapItem.meterToLatDegree; 
            //    var lonRadius = radius * HeatmapItem.meterToLonDegree; 
            //    var angleRad  = Math.random() * HeatmapItem.twoPi;
            //    var lat       = Math.sin(angleRad) * latRadius;
            //    var lon       = Math.cos(angleRad) * lonRadius;
            //    var intensity = this.idealityMeasure.computeIdealityAtDistance(radius);
            //    this.heatspots.push(new Heatspot(lat, lon, this.weight * intensity.ideality, intensity.radius));
            //}
            //var twoPi: number = Math.PI * 2;
            //var lat = 0,
            //    lon = 0;
            //// add start point
            //this.heatspots.push(new Heatspot(lat, lon, this.weight * this.idealityMeasure.atLocation));
            //// halfway between start and ideal location
            //var stepSize  = Math.PI / 2;
            //var radius    = this.idealityMeasure.idealDistance / 2;
            //var latRadius = radius * HeatmapItem.meterToLatDegree; 
            //var lonRadius = radius * HeatmapItem.meterToLonDegree; 
            //var itensity  = 0.5 * this.weight;
            //for (var i = Math.PI / 4; i < twoPi; i += stepSize) {
            //    lat = Math.sin(i) * latRadius;
            //    lon = Math.cos(i) * lonRadius;
            //    this.heatspots.push(new Heatspot(lat, lon, itensity));
            //}
            //// At ideal distance
            //stepSize /= 2;
            //radius = this.idealityMeasure.idealDistance;
            //latRadius = radius * HeatmapItem.meterToLatDegree;
            //lonRadius = radius * HeatmapItem.meterToLonDegree; 
            //itensity = this.weight;
            //for (var i = 0; i < twoPi; i += stepSize) {
            //    lat = Math.sin(i) * latRadius;
            //    lon = Math.cos(i) * lonRadius;
            //    this.heatspots.push(new Heatspot(lat, lon, itensity));
            //}
            //// At ring halfway between ideal distance and no interest
            //stepSize /= 2;
            //radius   += (this.idealityMeasure.lostInterestDistance - this.idealityMeasure.idealDistance) / 2;
            //latRadius = radius * HeatmapItem.meterToLatDegree;
            //lonRadius = radius * HeatmapItem.meterToLonDegree; 
            //itensity = this.weight / 2;
            //for (var i = Math.PI / 8; i < twoPi; i += stepSize) {
            //    lat = Math.sin(i) * latRadius;
            //    lon = Math.cos(i) * lonRadius;
            //    this.heatspots.push(new Heatspot(lat, lon, itensity));
            //}
        };
        /**
        * Translate the heatspot (at (0,0)) to the actual location.
        */
        HeatmapItem.prototype.pinHeatspotToGrid = function (feature, horizCells, vertCells, mapBounds, paddingRatio) {
            if (feature.geometry.type !== 'Point')
                return null;
            var latlong = new L.LatLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]);
            //TODO add a padding that takes the current zoom into account
            var paddedBounds = mapBounds.pad(paddingRatio);
            if (!paddedBounds.contains(latlong))
                return null; //Only draw features that are visible in the map
            var actualHeatspots = [];
            //Find the indices of the feature in the grid
            var hCell = Math.floor(((latlong.lng - mapBounds.getNorthWest().lng) / (mapBounds.getNorthEast().lng - mapBounds.getNorthWest().lng)) * horizCells);
            var vCell = Math.floor(((latlong.lat - mapBounds.getSouthWest().lat) / (mapBounds.getNorthWest().lat - mapBounds.getSouthWest().lat)) * vertCells);
            this.heatspots.forEach(function (hs) {
                actualHeatspots.push(hs.AddLocation(hCell, vCell, feature.properties['Name'] + ': ' + hs.intensity.toFixed(3)));
            });
            return actualHeatspots;
        };
        /**
        * Set the scale to convert a 1x1 meter grid cell to the appropriate number of degrees
        * in vertical and horizontal direction.
        */
        HeatmapItem.prototype.setScale = function (latitude) {
            var latlonlen = csComp.Helpers.GeoExtensions.convertDegreesToMeters(latitude);
            HeatmapItem.meterToLatDegree = 1 / latlonlen.latitudeLength;
            HeatmapItem.meterToLonDegree = 1 / latlonlen.longitudeLength;
        };
        HeatmapItem.prototype.select = function () {
            this.reset();
            this.isSelected = !this.isSelected;
            if (!this.isSelected) {
                this.idealityMeasure = null;
            }
            else {
                switch (this.featureType.style.drawingMode.toLowerCase()) {
                    case 'point':
                    case 'image':
                        this.idealityMeasure = new Heatmap.IdealityMeasure();
                        break;
                    default:
                        //this.idealityMeasure = 1;
                        break;
                }
            }
        };
        HeatmapItem.prototype.reset = function () {
            this.heatspots = [];
        };
        HeatmapItem.prototype.toString = function () {
            return this.propertyTitle
                ? this.propertyTitle + '.' + this.title + ' (' + this.featureType.name + ')'
                : this.title;
        };
        HeatmapItem.twoPi = Math.PI * 2;
        return HeatmapItem;
    })();
    Heatmap.HeatmapItem = HeatmapItem;
})(Heatmap || (Heatmap = {}));

var Heatmap;
(function (Heatmap) {
    var HeatmapModel = (function () {
        function HeatmapModel(title) {
            this.title = title;
            this.heatmapItems = [];
            this.id = "";
            this.title = title;
            this.heatmapSettings = new Heatmap.HeatmapSettings();
        }
        /**
         * Calculate the heatmap.
         */
        HeatmapModel.prototype.calculate = function (layerService, mapService, heatmap) {
            var _this = this;
            var time = new Date().getTime();
            console.log('Calculating heatmap');
            var mapBounds = mapService.map.getBounds();
            var NW = mapBounds.getNorthWest();
            var NE = mapBounds.getNorthEast();
            var SW = mapBounds.getSouthWest();
            var width = NW.distanceTo(NE); //Width of the map as it is currently visible on the screen, including padding
            var height = NW.distanceTo(SW); //Height ...
            var heatspots = [];
            // Iterate over all applicable features on the map and find the one with the largest interest distance.
            var dataset = csComp.Helpers.loadMapLayers(layerService);
            var maxInterestDistance = 0;
            //heatmap.clearData();
            dataset.features.forEach(function (f) {
                _this.heatmapItems.forEach(function (hi) {
                    if (hi.idealityMeasure.lostInterestDistance > maxInterestDistance) {
                        maxInterestDistance = hi.idealityMeasure.lostInterestDistance;
                    }
                });
            });
            var widthPaddingRatio = (width + 2 * maxInterestDistance) / width;
            var heigthPaddingRatio = (height + 2 * maxInterestDistance) / height;
            var paddingRatio = Math.max(widthPaddingRatio, heigthPaddingRatio);
            //Calculate a grid based on the maximum number of cells and the map ratio.
            var mapRatio = width / height;
            var maxCellCount;
            switch (this.heatmapSettings.resolution) {
                case 1:
                    maxCellCount = 1000;
                    break;
                case 2:
                    maxCellCount = 4000;
                    break;
                case 3:
                    maxCellCount = 7000;
                    break;
                default:
                    maxCellCount = 4000;
                    break;
            }
            var horizCells = Math.floor(Math.sqrt(maxCellCount * mapRatio));
            var vertCells = Math.floor(horizCells / mapRatio);
            var cellWidth = width / horizCells;
            var cellHeight = height / vertCells;
            var dLat = (NE.lat - SW.lat) / vertCells;
            var dLng = (NE.lng - SW.lng) / horizCells;
            var count = 0;
            var intensityGrid = [];
            var contributorGrid = [];
            for (var i = 0; i < horizCells; i++) {
                intensityGrid[i] = [];
                contributorGrid[i] = [];
                for (var j = 0; j < vertCells; j++) {
                    intensityGrid[i][j] = 0;
                    contributorGrid[i][j] = [];
                }
            }
            // Iterate over all applicable features on the map and create a intensity "stamp" for each feature
            dataset.features.forEach(function (f) {
                _this.heatmapItems.forEach(function (hi) {
                    var heatspot = hi.calculateHeatspots(f, cellWidth, cellHeight, horizCells, vertCells, mapBounds, paddingRatio);
                    if (heatspot) {
                        //heatspots = heatspots.concat(heatspot);
                        //console.log('Created ' + heatspot.length + ' heatspots');
                        heatspot.forEach(function (hs) {
                            //heatmap.addDataPoint(hs.i, hs.j, hs.intensity);
                            if (hs.intensity != 0 &&
                                hs.i >= 0 && hs.i < horizCells && hs.j >= 0 && hs.j < vertCells) {
                                intensityGrid[hs.i][hs.j] = intensityGrid[hs.i][hs.j] + hs.intensity;
                                contributorGrid[hs.i][hs.j].push(hs.contributor);
                                count = count + 1;
                            }
                        });
                    }
                });
            });
            var time2 = new Date().getTime();
            console.log('Created ' + count + ' heatspots in ' + (time2 - time).toFixed(1) + ' ms');
            heatmap.clearLayers();
            var weightedIntensityScale = ((this.heatmapSettings.intensityScale / 3) * (this.heatmapSettings.intensityScale / 3)); // Convert intensityscale from [1,...,5] to ~[0.1, 0.5, 1, 2, 3]
            //Draw the intensityGrid
            for (var i = 0; i < horizCells; i++) {
                for (var j = 0; j < vertCells; j++) {
                    if (intensityGrid[i][j] != 0) {
                        var polyCoord = [[SW.lng + dLng * i, SW.lat + dLat * j],
                            [SW.lng + dLng * (i + 1), SW.lat + dLat * j],
                            [SW.lng + dLng * (i + 1), SW.lat + dLat * (j + 1)],
                            [SW.lng + dLng * i, SW.lat + dLat * (j + 1)]];
                        var feature = {
                            "type": "Feature",
                            "geometry": {
                                "type": "Polygon",
                                "coordinates": [polyCoord]
                            },
                            "properties": {
                                "Name": "Heatmap cell (" + i.toString() + ", " + j.toString() + ")",
                                "gridX": i,
                                "gridY": j,
                                "intensity": (intensityGrid[i][j] * weightedIntensityScale).toFixed(3),
                                "contributors": JSON.stringify(contributorGrid[i][j])
                            }
                        };
                        heatmap.addData(feature);
                    }
                }
            }
            var time3 = new Date().getTime();
            console.log('Calculated ' + (i * j) + ' cells in ' + (time3 - time).toFixed(1) + ' ms');
        };
        /**
         * Update the weights of all heatmap items.
         */
        HeatmapModel.prototype.updateWeights = function () {
            var totalUserWeight = 0;
            this.heatmapItems.forEach(function (hi) {
                if (hi.isSelected)
                    totalUserWeight += Math.abs(hi.userWeight);
            });
            this.heatmapItems.forEach(function (hi) {
                if (hi.isSelected) {
                    if (totalUserWeight != 0) {
                        hi.weight = hi.userWeight / totalUserWeight;
                    }
                    else {
                        hi.weight = 0;
                    }
                    hi.reset();
                }
            });
        };
        /**
        * Add a heatmap item to the list of items only in case we don't have it yet.
        */
        HeatmapModel.prototype.addHeatmapItem = function (heatmapItem) {
            var ft = heatmapItem.featureType;
            var title = heatmapItem.title;
            for (var i = 0; i < this.heatmapItems.length; i++) {
                var hi = this.heatmapItems[i];
                if (hi.featureType.name === ft.name && hi.title === title)
                    return;
            }
            this.heatmapItems.push(heatmapItem);
        };
        HeatmapModel.prototype.deserialize = function (layer) {
            var _this = this;
            this.id = layer.id;
            var hs = layer.heatmapSettings;
            this.heatmapSettings = new Heatmap.HeatmapSettings(hs.referenceList, hs.minZoom, hs.maxZoom, hs.intensityScale, hs.resolution);
            this.heatmapItems = [];
            var heatmapitems = layer.heatmapItems;
            heatmapitems.forEach(function (hi_info) {
                var im = new Heatmap.IdealityMeasure(hi_info.idealityMeasure.idealDistance, hi_info.idealityMeasure.atLocation, hi_info.idealityMeasure.lostInterestDistance);
                if (hi_info.propertyTitle) {
                    var hi = new Heatmap.HeatmapItem(hi_info.title, hi_info.featureType, hi_info.weight, hi_info.userWeight, hi_info.isSelected, im, hi_info.propertyTitle, hi_info.propertyLabel, hi_info.optionIndex);
                }
                else {
                    var hi = new Heatmap.HeatmapItem(hi_info.title, hi_info.featureType, hi_info.weight, hi_info.userWeight, hi_info.isSelected, im);
                }
                _this.addHeatmapItem(hi);
            });
        };
        HeatmapModel.prototype.serialize = function () {
            var minimizedHeatmapItems = [];
            this.heatmapItems.forEach(function (hi) {
                if (hi.isSelected) {
                    hi.reset();
                    if (hi.propertyTitle) {
                        var hi_new = new Heatmap.HeatmapItem(hi.title, { name: hi.featureType.name }, hi.weight, hi.userWeight, hi.isSelected, hi.idealityMeasure, hi.propertyTitle, hi.propertyLabel, hi.optionIndex);
                    }
                    else {
                        var hi_new = new Heatmap.HeatmapItem(hi.title, { name: hi.featureType.name }, hi.weight, hi.userWeight, hi.isSelected, hi.idealityMeasure);
                    }
                    minimizedHeatmapItems.push(hi_new);
                }
            });
            var output = "{\"id\": \"ID\",\n" +
                "\"reference\": \"REFERENCE\",\n" +
                "\"languages\": {\n" +
                "\"nl\": {\"title\": ";
            output += JSON.stringify(this.title);
            output += ",\n\"description\": \"BESCHRIJVING\"\n},\n" +
                "\"en\": {\"title\": ";
            output += JSON.stringify(this.title);
            output += ",\n\"description\": \"DESCRIPTION\"\n}\n" +
                "},\n" +
                "\"description\": \"DESCRIPTION\",\n";
            output += "\"type\":\"Heatmap\"";
            output += ",\n\"heatmapSettings\":" + JSON.stringify(this.heatmapSettings, null, ' ');
            output += ",\n\"heatmapItems\":";
            output += JSON.stringify(minimizedHeatmapItems, null, ' ');
            output += ",\n\"enabled\":";
            output += JSON.stringify(false);
            output += ",\n\"opacity\":";
            output += JSON.stringify(100);
            output += "\n}";
            return output;
        };
        return HeatmapModel;
    })();
    Heatmap.HeatmapModel = HeatmapModel;
})(Heatmap || (Heatmap = {}));

var Heatmap;
(function (Heatmap) {
    var HeatmapSettings = (function () {
        function HeatmapSettings(referenceList, minZoom, maxZoom, intensityScale, resolution) {
            if (referenceList === void 0) { referenceList = []; }
            if (minZoom === void 0) { minZoom = 10; }
            if (maxZoom === void 0) { maxZoom = 15; }
            if (intensityScale === void 0) { intensityScale = 3; }
            if (resolution === void 0) { resolution = 2; }
            this.referenceList = referenceList;
            this.minZoom = minZoom;
            this.maxZoom = maxZoom;
            this.intensityScale = intensityScale;
            this.resolution = resolution;
        }
        HeatmapSettings.prototype.addReference = function (reference) {
            // Add unique reference layers only
            if (this.referenceList.indexOf(reference) < 0) {
                this.referenceList.push(reference);
            }
        };
        return HeatmapSettings;
    })();
    Heatmap.HeatmapSettings = HeatmapSettings;
})(Heatmap || (Heatmap = {}));

var Heatmap;
(function (Heatmap) {
    /**
     * A heat spot represents a point on the map with a certain intensity.
     */
    var Heatspot = (function () {
        function Heatspot(i, j, intensity, contributor) {
            this.i = i;
            this.j = j;
            this.intensity = intensity;
            this.contributor = contributor;
        }
        Heatspot.prototype.AddLocation = function (i, j, contributor) {
            return new Heatspot(this.i + i, this.j + j, this.intensity, contributor);
        };
        return Heatspot;
    })();
    Heatmap.Heatspot = Heatspot;
})(Heatmap || (Heatmap = {}));

var Heatmap;
(function (Heatmap) {
    (function (ScoringFunctionType) {
        ScoringFunctionType[ScoringFunctionType["LinearAscendingDescending"] = 0] = "LinearAscendingDescending";
    })(Heatmap.ScoringFunctionType || (Heatmap.ScoringFunctionType = {}));
    var ScoringFunctionType = Heatmap.ScoringFunctionType;
    var ScoringFunction = (function () {
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
        return ScoringFunction;
    })();
    Heatmap.ScoringFunction = ScoringFunction;
    var ScoringFunctions = (function () {
        function ScoringFunctions() {
        }
        return ScoringFunctions;
    })();
    Heatmap.ScoringFunctions = ScoringFunctions;
    var IdealityMeasure = (function () {
        function IdealityMeasure(idealDistance, atLocation, lostInterestDistance) {
            if (idealDistance === void 0) { idealDistance = 500; }
            if (atLocation === void 0) { atLocation = 0.1; }
            if (lostInterestDistance === void 0) { lostInterestDistance = 2000; }
            this.idealDistance = idealDistance;
            this.atLocation = atLocation;
            this.lostInterestDistance = lostInterestDistance;
        }
        IdealityMeasure.prototype.computeIdealityAtDistance = function (distance) {
            var intensity = 0;
            if (distance < this.idealDistance) {
                if (this.atLocation >= 1) {
                    intensity = 1;
                }
                else {
                    intensity = (this.atLocation + (1 - this.atLocation) * distance / this.idealDistance);
                }
            }
            else if (distance < this.lostInterestDistance) {
                intensity = (1 - (distance - this.idealDistance) / (this.lostInterestDistance - this.idealDistance));
            }
            return intensity;
        };
        return IdealityMeasure;
    })();
    Heatmap.IdealityMeasure = IdealityMeasure;
})(Heatmap || (Heatmap = {}));

var LanguageSwitch;
(function (LanguageSwitch) {
    /**
      * Config
      */
    var moduleName = 'csComp';
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
    LanguageSwitch.myModule
        .directive('languageSwitch', [
        '$compile',
        function ($compile) {
            return {
                terminal: true,
                restrict: 'E',
                scope: {},
                templateUrl: 'directives/LanguageSwitch/LanguageSwitch.tpl.html',
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
    ])
        .provider('$languages', function () {
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
    LanguageSwitch.html = '<div class="navbar-collapse collapse">    <ul class="nav navbar-nav">        <li class="dropdown">            <a href=""               class="navbar-brand dropdown-toggle pull-left"               data-toggle="dropdown"               style="color:white; margin-left:-10px;">                <img data-ng-src="{{vm.language.img}}" />                <span class="caret" data-ng-if="vm.$languages.length > 1"></span>            </a>            <ul data-ng-if="vm.$languages.length > 1" class="dropdown-menu" role="menu">                <li ng-repeat="language in vm.$languages">                    <a ng-click="vm.switchLanguage(language)">                        <span>                            <img data-ng-src="{{language.img}}" />                            &nbsp;{{language.name}}                        </span>                    </a>                </li>            </ul>        </li>    </ul></div>';
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

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Mca;
(function (Mca_1) {
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
                    case ScoringFunctionType.Ascending:
                        scores = '[0,0 10,1]';
                        break;
                    case ScoringFunctionType.Descending:
                        scores = '[0,1 10,0]';
                        break;
                    case ScoringFunctionType.AscendingSigmoid:
                        // http://mathnotepad.com/: f(x) = (3.5+2*atan(x-5))/7
                        // f([0,1,2,3,4,5,6,7,8,9,10])
                        // round(100*f([0,1,2,3,4,5,6,7,8,9,10]))/100
                        // [0.11 0.12 0.14 0.18 0.28 0.5 0.72 0.82 0.86 0.88 0.89]
                        scores = '[0,0.11 1,0.12 2,0.14 3,0.18 4,0.28 5,0.5 6,0.72 7,0.82 8,0.86 9,0.88 10,0.89]';
                        break;
                    case ScoringFunctionType.DescendingSigmoid:
                        // 1-f(x)
                        scores = '[0,0.89 1,0.88 2,0.86 3,0.82 4,0.72 5,0.5 6,0.28 7,0.18 8,0.14 9,0.12 10,0.11]';
                        break;
                    case ScoringFunctionType.GaussianPeak:
                        // h(x)=3*exp(-((x-u)^2)/(2s^2))/(s*sqrt(2pi))
                        scores = '[0,0 2,0.04 3,0.25 4,0.7 5,1 6,0.7 7,0.25 8,0.04 9,0]';
                        break;
                    case ScoringFunctionType.GaussianValley:
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
                    a = 0.08 * range,
                        b = min + 0.1 * range;
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
                        //for (var k in this.x) {
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
                        finalScore += crit.weight > 0
                            ? crit.weight * crit.getScore(feature)
                            : Math.abs(crit.weight) * (1 - crit.getScore(feature));
                    });
                    return this.weight > 0
                        ? this.weight * finalScore
                        : Math.abs(this.weight) * (1 - finalScore);
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
    })(Models = Mca_1.Models || (Mca_1.Models = {}));
})(Mca || (Mca = {}));

var Mca;
(function (Mca) {
    'use strict';
    /**
     * Config
     */
    var moduleName = 'csComp';
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
    Mca.myModule
        .directive('mca', [
        '$window', '$compile', '$templateCache',
        function ($window, $compile) {
            return {
                terminal: true,
                restrict: 'EA',
                scope: {},
                templateUrl: 'directives/MCA/Mca.tpl.html',
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
    ]);
})(Mca || (Mca = {}));

var Mca;
(function (Mca) {
    Mca.html = '<div>    <div class="wide-tooltip">        <span class="pull-right fa fa-info-circle fa-2x"              tooltip-html-unsafe="{{\'MCA.DESCRIPTION\' | translate}}"              tooltip-placement="bottom"              tooltip-trigger="mouseenter"              tooltip-append-to-body="false"              style="margin-right: 5px;"></span>        <h4 class="leftpanel-header">MCA</h4>    </div>    <div>        <select data-ng-model="vm.mca"                data-ng-options="mca.title for mca in vm.availableMcas"                data-ng-change="vm.updateMca()"                style="width: 65%; margin-bottom: 10px;"></select>        <div data-ng-if="vm.expertMode" class="pull-right">            <a href="" data-ng-click="vm.createMca()" tooltip="{{\'MCA.ADD_MCA\' | translate}}" style="margin-right:5px;"><i class="fa fa-plus"></i></a>            <a href="" data-ng-click="vm.removeMca(vm.mca)" tooltip="{{\'MCA.DELETE_MCA\' | translate}}" style="margin-right:5px;"><i class="fa fa-trash"></i></a>            <a href="" data-ng-click="vm.editMca(vm.mca)" tooltip="{{\'MCA.EDIT_MCA\' | translate}}" tooltip-placement="right" style="margin-right:5px;"><i class="fa fa-edit"></i></a>        </div>        <a href=""           tooltip="{{\'MCA.TOGGLE_SPARKLINE\' | translate}}"           data-ng-init="sparkLineStyle = vm.showSparkline ? {} : {color:\'lightgray\'}"           data-ng-click="vm.toggleSparkline(); sparkLineStyle = vm.showSparkline ? {} : {color:\'lightgray\'}"           data-ng-style="sparkLineStyle"           class="pull-right" style="margin-right:5px;"><i class="fa fa-bar-chart"></i></a>    </div>    <div data-ng-if="!vm.mca">        <div data-ng-if="vm.expertMode"  translate>MCA.INFO_EXPERT</div>        <div data-ng-if="!vm.expertMode" translate>MCA.INFO</div>    </div>    <div data-ng-if="vm.mca" style="overflow-y: auto; overflow-x: hidden; margin-left: -5px;" resize resize-y="140">        <div data-ng-repeat="criterion in vm.mca.criteria" class="wide-tooltip">            <div data-ng-if="criterion.criteria.length > 0 && criterion.userWeight != 0" class="collapsed pull-left" style="margin: 0 5px 0 0" data-toggle="collapse" data-target="#criterion_{{$index}}"><i class="fa fa-chevron-down togglebutton toggle-arrow-down"></i><i class="fa fa-chevron-up togglebutton toggle-arrow-up"></i></div>            <div data-ng-style="{\'display\': \'inline-block\', \'margin-bottom\': \'6px\', \'width\':\'10px\', \'height\':\'10px\', \'border\':\'solid 1px black\', \'background-color\': criterion.color}"></div>            <div class="truncate" data-ng-class="{true: \'ignoredCriteria\'}[criterion.userWeight == 0]" style="display: inline-block; width: 150px; font-weight: bold">{{criterion.getTitle()}}</div>            <voting class="pull-right"                    data-ng-class="vm.getVotingClass(criterion)"                    data-ng-change="vm.weightUpdated(criterion)"                    min="-vm.mca.userWeightMax"                    max="vm.mca.userWeightMax"                    ng-model="criterion.userWeight"                    style="margin-right: 5px; margin-bottom: 3px;"></voting>            <div id="histogram_{{$index}}" data-ng-show="vm.showSparkline && criterion.criteria.length == 0" style="margin-top: 5px;"></div>            <div data-ng-if="criterion.criteria.length > 0" id="criterion_{{$parent.$index}}" class="collapse out" style="margin-left: 19px">                <div data-ng-repeat="crit in criterion.criteria">                    <div data-ng-style="{\'display\': \'inline-block\', \'margin-bottom\': \'6px\', \'width\':\'10px\', \'height\':\'10px\', \'border\':\'solid 1px black\', \'background-color\': crit.color}"></div>                    <div class="truncate" data-ng-class="{true: \'ignoredCriteria\'}[crit.userWeight == 0 || criterion.userWeight == 0]" style="display: inline-block; width: 150px;">{{crit.getTitle()}}</div>                    <div class="pull-right" style="margin-right: 15px;">{{Math.abs(crit.userWeight)}}</div>                    <voting class="pull-right"                            data-ng-class="vm.getVotingClass(criterion)"                            data-ng-change="vm.weightUpdated(crit)"                            min="0"                            max="vm.mca.userWeightMax"                            ng-model="crit.userWeight"                            style="margin-right: 5px;"></voting>                    <div id="histogram_{{$parent.$index}}_{{$index}}" data-ng-show="vm.showSparkline" style="margin-top: 5px;"></div>                </div>            </div>        </div>        <!--<a href="" style="display: inline-block; width: 100%; text-transform: uppercase"               data-ng-click="vm.calculateMca()" translate="MCA.COMPUTE_MGS" translate-values="{ mcaTitle: vm.mca.title }"></a>-->        <h4 data-ng-if="vm.showChart">            <a href="" data-ng-click="vm.weightUpdated(vm.mca)" translate="MCA.TOTAL_RESULT"></a>            <a href="" data-ng-if="vm.selectedCriterion">&gt;&nbsp;{{vm.selectedCriterion.title}}</a>        </h4>        <a href="" data-ng-if="vm.showFeature" class="pull-right" data-ng-click="vm.toggleMcaChartType();" style="margin-right: 10px">            <i class="fa" data-ng-class="{true: \'fa-bar-chart\', false: \'fa-pie-chart\'}[vm.showAsterChart]"></i>        </a>        <div style="margin-top: 5px; margin-left: auto; margin-right: auto; width: 95%;" id="mcaChart"></div>        <div data-ng-if="vm.showFeature">            <h4>                <img data-ng-if="vm.featureIcon" data-ng-src="{{vm.featureIcon}}" width="24" height="24" style="margin:0 5px" alt="Icon" />                {{vm.selectedFeature.properties[\'Name\']}}            </h4>            <table class="table table-condensed">                <tr data-ng-repeat="item in vm.properties"                    popover="{{item.description}}"                    popover-placement="right"                    popover-trigger="mouseenter"                    popover-append-to-body="true">                    <td><a class="fa fa-filter makeNarrow" data-ng-if="item.canFilter" data-ng-click="vm.$layerService.setFilter(item)" style="cursor: pointer"></a></td>                    <td><a class="smallStyleIcon makeNarrow" data-ng-if="item.canStyle" data-ng-click="vm.setStyle(item)" style="cursor: pointer"></a></td>                    <td>{{item.key}}</td>                    <td class="text-right">{{item.value}}</td>                </tr>            </table>        </div>        <i data-ng-if="!vm.showFeature"><div translate="MCA.SHOW_FEATURE_MSG"></div></i>    </div>    <!--<div rating class="pull-right"             data-ng-style="{\'margin\': \'0 10px\', \'background\':\'rgba(0, 0, 0, 0.1)\', \'border-radius\': \'8px\', \'padding\': \'0 4px\', \'color\': criterion.color}"             ng-model="criterion.userWeight" max="11" readonly="isReadonly"             rating-states="ratingStates"             data-ng-click="vm.weightUpdated(criterion)"             on-hover="hoveringOver(value)" on-leave="overStar = null"></div>--></div>';
})(Mca || (Mca = {}));

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
                        //console.log(title);
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
                        _this.expertMode = $layerService.project != null
                            && $layerService.project.hasOwnProperty('userPrivileges')
                            && $layerService.project.userPrivileges.hasOwnProperty('mca')
                            && $layerService.project.userPrivileges.mca.hasOwnProperty('expertMode')
                            && $layerService.project.userPrivileges.mca.expertMode;
                        if (typeof $layerService.project.mcas === 'undefined' || $layerService.project.mcas == null)
                            $layerService.project.mcas = [];
                        var mcas = _this.$localStorageService.get(McaCtrl.mcas);
                        if (typeof mcas === 'undefined' || mcas === null)
                            return;
                        mcas.forEach(function (mca) {
                            $layerService.project.mcas.push(new Mca.Models.Mca().deserialize(mca));
                        });
                        //this.createDummyMca();
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
                templateUrl: 'directives/MCA/McaEditorView.tpl.html',
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
            this.featureIcon = this.selectedFeature.fType != null && this.selectedFeature.fType.style != null
                ? this.selectedFeature.fType.style.iconUri
                : '';
            if (!feature.properties.hasOwnProperty(this.mca.label))
                return;
            this.showFeature = true;
            this.properties = [];
            var mi = McaCtrl.createPropertyType(this.mca);
            var displayValue = csComp.Helpers.convertPropertyInfo(mi, feature.properties[mi.label]);
            this.properties.push(new FeatureProps.CallOutProperty(mi.title, displayValue, mi.label, true, true, feature, false, false, mi.description, mi));
            if (this.mca.rankTitle) {
                mi = McaCtrl.createRankPropertyType(this.mca);
                displayValue = csComp.Helpers.convertPropertyInfo(mi, feature.properties[mi.label]);
                this.properties.push(new FeatureProps.CallOutProperty(mi.title, displayValue, mi.label, false, false, feature, false, false, mi.description, mi));
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
                    _this.$layerService.calculateFeatureStyle(feature);
                    _this.$layerService.activeMapRenderer.updateFeature(feature);
                    //this.$layerService.updateFeature(feature);
                });
                if (mca.rankTitle) {
                    // Add rank information
                    tempScores.sort(function (a, b) { return b.score - a.score; });
                    var length = _this.features.length;
                    var scaleRange = mca.scaleMinValue ? Math.abs(mca.scaleMaxValue - mca.scaleMinValue) + 1 : length;
                    var scaleFactor = Math.ceil(length / scaleRange);
                    var rankFunction = mca.scaleMinValue
                        ? mca.scaleMaxValue > mca.scaleMinValue
                            ? function (position) { return mca.scaleMaxValue - Math.round(position / scaleFactor); }
                            : function (position) { return mca.scaleMinValue + Math.round(position / scaleFactor); }
                        : function (position) { return position; };
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
                if (labelIndex < 0) {
                    if (featureType.propertyTypeData === null)
                        featureType.propertyTypeData = [];
                    featureType.propertyTypeData.push(pt); // NOTE: propertyTypes refers to a new list, so you cannot add to it.
                }
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
            if (this.groupStyle
                && this.groupStyle.group != null
                && this.groupStyle.group.styles != null
                && this.groupStyle.group.styles.filter(function (s) { return s.visualAspect === 'fillColor'; })[0].property === this.mca.label)
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
            this.scoringFunctions.push(new Mca.Models.ScoringFunction(Mca.Models.ScoringFunctionType.Ascending));
            //this.scoringFunctions.push(new Models.ScoringFunction(Models.ScoringFunctionType.Descending));
            this.scoringFunctions.push(new Mca.Models.ScoringFunction(Mca.Models.ScoringFunctionType.AscendingSigmoid));
            //this.scoringFunctions.push(new Models.ScoringFunction(Models.ScoringFunctionType.DescendingSigmoid));
            this.scoringFunctions.push(new Mca.Models.ScoringFunction(Mca.Models.ScoringFunctionType.GaussianPeak));
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
            this.dataset = csComp.Helpers.loadMapLayers(this.$layerService);
            messageBusService.subscribe('layer', function () {
                _this.dataset = csComp.Helpers.loadMapLayers(_this.$layerService);
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
        ///** 
        // * Load the features as visible on the map.
        // */
        //private loadMapLayers(): void {
        //    var data         : IGeoJsonFile = {
        //        type         : '',
        //        features     : [],
        //        featureTypes : {}
        //    };
        //    // If we are filtering, load the filter results
        //    this.$layerService.project.groups.forEach((group) => {
        //        if (group.filterResult != null)
        //            group.filterResult.forEach((f) => data.features.push(f));
        //    });
        //    // Otherwise, take all loaded features
        //    if (data.features.length === 0)
        //        data.features = this.$layerService.project.features;
        //    data.features.forEach((f: IFeature) => {
        //        if (!(data.featureTypes.hasOwnProperty(f.featureTypeName))) {
        //            var featureType = data.featureTypes[f.featureTypeName];
        //            if (!featureType.name) featureType.name = f.featureTypeName.replace('_Default', '');
        //            data.featureTypes[f.featureTypeName] = featureType;
        //        }
        //    });
        //    this.dataset = data;
        //}
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
            if (this.propInfos.length === 0 || !this.propInfos.reduce(function (p, c) { return p || c.isSelected; }))
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
                if (mi.scoringFunctionType === Mca.Models.ScoringFunctionType.Manual) {
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

var McaEditorView;
(function (McaEditorView) {
    McaEditorView.html = '<div class="modal-content">    <div class="modal-header">        <button type="button" class="close" data-ng-click="vm.cancel()" aria-hidden="true">&times;</button>        <h3 class="modal-title" translate>MCA.EDITOR_TITLE</h3>    </div>    <div class="modal-body container-fluid">        <div class="row-fluid">            <input type="text" class="pull-left" data-ng-model="vm.mcaTitle" style="margin: 0 5px" placeholder="{{ \'MCA.TITLE\' | translate }}" />            <!-- <span><input type="checkbox" data-ng-model="vm.hasRank" style="margin-left: 10px;" /><span translate>MCA.INCLUDE_RANK</span></span>-->            <input type="text" class="pull-left" data-ng-model="vm.rankTitle" style="margin: 0 5px"  placeholder="{{ \'MCA.RANK_TITLE\' | translate }}" />            <input type="text" class="pull-left" data-ng-model="vm.scaleMin" style="width: 100px; margin: 0 5px" placeholder="{{ \'MCA.SCALE_MIN_TITLE\' | translate }}" />            <input type="text" class="pull-left" data-ng-model="vm.scaleMax" style="width: 100px; margin: 0 5px" placeholder="{{ \'MCA.SCALE_MAX_TITLE\' | translate }}" />        </div>        <h4 class="row-fluid" style="margin-top: 5px;" translate>MCA.MAIN_FEATURE</h4>        <select data-ng-model="vm.selectedFeatureType"                data-ng-change="vm.loadPropertyTypes()"                data-ng-options="item as item.name for (key, item) in vm.dataset.featureTypes"                class="form-control row-fluid"></select>        <h4 class="row-fluid" translate>MCA.PROPERTIES</h4>        <ul class="form-group row-fluid" style="margin-top: 1em; margin-left: -2em; overflow-y: auto; overflow-x: hidden;"            resize resize-y="450">            <li ng-repeat="mi in vm.propInfos"                class="row-fluid list-unstyled truncate">                <div style="padding: 5px 0;" class="row-fluid">                    <input type="checkbox" name="vm.selectedTitles[]" value="{{mi.title}}"                           data-ng-checked="mi.isSelected"                           data-ng-click="mi.isSelected = !mi.isSelected">&nbsp;&nbsp;{{mi.title}}                    <div data-ng-if="mi.isSelected" class="pull-right">                        <a href="" class="pull-right"                           style="margin-right: 5px;"                           data-ng-click="vm.toggleItemDetails($index)"><i class="fa fa-2x fa-edit"></i></a>                        <input type="text" class="pull-right"                               style="margin: -2px 5px -2px 0;"                               data-ng-model="mi.category"                               placeholder="{{\'MCA.CATEGORY_MSG\' | translate}}" />                    </div>                    <!--<form data-ng-if="mi.isSelected" name="myForm" style="margin-left: 20px;">                <label id="scoringFunctions" data-ng-repeat="sf in vm.scoringFunctions">                    <input type="radio" data-ng-model="mi.scoringFunctionType" value="{{sf.type}}">                    <a data-ng-href="" data-ng-class="sf.cssClass" data-ng-click="mi.isSelected = !mi.isSelected"></a>                </label>            </form>            <div data-ng-if="mi.scoringFunctionType == 0" style="margin-left: 20px;">                input -> score:&nbsp;<input type="text" data-ng-model="mi.scores" placeholder="[x0,y0 x1,y1 ...]"/>            </div>-->                </div>                <div class="row-fluid" data-ng-show="vm.showItem == {{$index}}" id="scoringFunctions">                    <select class="col-xs-10"                            style="margin-right: 5px; margin-bottom: 5px;"                            data-ng-init="mi.scoringFunctionType = mi.scoringFunctionType || vm.scoringFunctions[0]"                            data-ng-model="mi.scoringFunctionType"                            data-ng-options="sf as sf.title for sf in vm.scoringFunctions"></select>                    <div class="pull-right" data-ng-class="mi.scoringFunctionType.cssClass" style="width: 40px; height: 28px; margin-top: -5px;"></div>                    <div class="row-fluid">                        <input type="text" class="col-xs-3" style="padding: 0;" data-ng-model="mi.minValue" placeholder="{{ \'MCA.MIN_VALUE\' | translate }}" />                        <input type="text" class="col-xs-3" style="padding: 0;" data-ng-model="mi.maxValue" placeholder="{{ \'MCA.MAX_VALUE\' | translate }}" />                        <input type="text" class="col-xs-3" style="padding: 0;" data-ng-model="mi.minCutoffValue" placeholder="{{ \'MCA.MIN_CUTOFF_VALUE\' | translate }}" />                        <input type="text" class="col-xs-3" style="padding: 0;" data-ng-model="mi.maxCutoffValue" placeholder="{{ \'MCA.MAX_CUTOFF_VALUE\' | translate }}" />                    </div>                </div>            </li>        </ul>    </div>    <div class="modal-footer">        <button type="button" class="btn btn-warning" data-ng-click="vm.cancel()" translate>CANCEL_BTN</button>        <button type="button" class="btn btn-primary" data-ng-click="vm.save()" translate>OK_BTN</button>    </div></div>';
})(McaEditorView || (McaEditorView = {}));

var MapElement;
(function (MapElement) {
    /**
      * Config
      */
    var moduleName = 'csComp';
    /**
      * Module
      */
    MapElement.myModule;
    try {
        MapElement.myModule = angular.module(moduleName);
    }
    catch (err) {
        // named module does not exist, so create one
        MapElement.myModule = angular.module(moduleName, []);
    }
    /**
      * Directive to display the available map layers.
      */
    MapElement.myModule.directive('map', [
        '$window', '$compile',
        function ($window, $compile) {
            return {
                terminal: false,
                restrict: 'E',
                scope: {
                    mapid: '='
                },
                //templateUrl: 'directives/MapElement/MapElement.tpl.html',
                template: '<div id="map" tabindex="0" class="leaflet-container leaflet-touch leaflet-fade-anim" style="position:absolute"></div>',
                link: function (scope, element, attrs) {
                    // Deal with resizing the element list
                    //   angular.element($window).bind('resize', () => {
                    //       //scope.onResizeFunction();
                    //       scope.$apply();
                    //   });
                    scope.mapid = attrs.mapid;
                    //var s = jQuery.parseJSON(attrs.param);
                    //scope.initDashboard();
                    scope.initMap();
                },
                replace: false,
                transclude: true,
                controller: MapElement.MapElementCtrl
            };
        }
    ]);
})(MapElement || (MapElement = {}));

var MapElement;
(function (MapElement) {
    MapElement.html = '<div id="map"  tabindex="0" class="leaflet-container leaflet-touch leaflet-fade-anim" style="position:absolute"></div> <!-- <div id="cesiumContainer" style="position:absolute"></div> -->';
})(MapElement || (MapElement = {}));

var MapElement;
(function (MapElement) {
    var MapElementCtrl = (function () {
        // dependencies are injected via AngularJS $injector
        // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
        function MapElementCtrl($scope, $layerService, mapService, $messageBusService) {
            var _this = this;
            this.$scope = $scope;
            this.$layerService = $layerService;
            this.mapService = mapService;
            this.$messageBusService = $messageBusService;
            this.locale = "en-us";
            $scope.vm = this;
            //this.initMap();
            $scope.initMap = function () { return _this.initMap(); };
        }
        MapElementCtrl.prototype.initMap = function () {
            //alert(this.$scope.mapId);
        };
        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
        MapElementCtrl.$inject = [
            '$scope',
            'layerService',
            'mapService',
            'messageBusService'
        ];
        return MapElementCtrl;
    })();
    MapElement.MapElementCtrl = MapElementCtrl;
})(MapElement || (MapElement = {}));

var OfflineSearch;
(function (OfflineSearch) {
    /**
      * Config
      */
    var moduleName = 'csComp';
    /**
      * Module
      */
    OfflineSearch.myModule;
    try {
        OfflineSearch.myModule = angular.module(moduleName);
    }
    catch (err) {
        // named module does not exist, so create one
        OfflineSearch.myModule = angular.module(moduleName, []);
    }
    /**
      * Directive to display the available map layers.
      */
    OfflineSearch.myModule.directive('offlineSearch', [
        '$compile',
        function ($compile) {
            return {
                terminal: true,
                restrict: 'E',
                scope: {},
                templateUrl: 'directives/OfflineSearch/OfflineSearch.tpl.html',
                compile: function (el) {
                    var fn = $compile(el);
                    return function (scope) {
                        fn(scope);
                    };
                },
                replace: true,
                transclude: true,
                controller: OfflineSearch.OfflineSearchCtrl
            };
        }
    ]);
})(OfflineSearch || (OfflineSearch = {}));

var OfflineSearch;
(function (OfflineSearch) {
    OfflineSearch.html = '<form role="search">    <style>        .typeahead-group-header {            margin-left: 10px;            font-weight: bold;            font-size: 120%;        }    </style>    <script type="text/ng-template" id="typeahead-item.html">     <div class="typeahead-group-header" ng-if="match.model.firstInGroup">{{match.model.groupTitle}} >> {{match.model.layerTitle}}</div>     <a>       <span ng-bind-html="match.label.title"></span>     </a>   </script>   <div id="scrollable-dropdown-menu" data-ng-disabled="!vm.isReady" class="form-group has-feedback navbar-right">        <input data-ng-model="vm.searchText"               typeahead="address for address in vm.getLocation($viewValue)"               typeahead-loading="loadingLocations"               typeahead-min-length="3"               typeahead-highlight="true"               typeahead-editable="false"               typeahead-template-url="typeahead-item.html"               typeahead-on-select="vm.onSelect($item, $model, $label)"               id="searchbox"               type="text"               style="width:300px"               class="typeahead form-control">               <!-- placeholder="Zoek in kaartlagen" -->        <!-- <span ng-if="loadingLocations"  id="searchicon" class="fa fa-refresh fa-spin"></span>-->        <span id="searchicon" class="fa fa-search form-control-feedback"></span>    </div></form>';
})(OfflineSearch || (OfflineSearch = {}));

var OfflineSearch;
(function (OfflineSearch) {
    var Layer = (function () {
        function Layer(groupTitle, index, id, title, path, type) {
            this.groupTitle = groupTitle;
            this.index = index;
            this.id = id;
            this.title = title;
            this.path = path;
            this.type = type;
            /**
             * Names of all the features.
             * @type {string[]}
             */
            this.featureNames = [];
        }
        return Layer;
    })();
    OfflineSearch.Layer = Layer;
    /**
     * An index entry that contains a search result.
     */
    var Entry = (function () {
        function Entry(layerIndexOrArray, featureIndex, propertyIndex) {
            this.v = Array(2);
            if (typeof layerIndexOrArray === 'number') {
                this.v[0] = layerIndexOrArray;
                this.v[1] = featureIndex;
            }
            else {
                this.v = layerIndexOrArray;
            }
        }
        Object.defineProperty(Entry.prototype, "layerIndex", {
            get: function () { return this.v[0]; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entry.prototype, "featureIndex", {
            get: function () { return this.v[1]; },
            enumerable: true,
            configurable: true
        });
        /**
         * This function is called when serializing the Entry object to JSON, which is
         * much less verbose than the default JSON. In the constructor, I've used a
         * Union type to deserialize it again.
         */
        Entry.prototype.toJSON = function () {
            return this.v;
        };
        return Entry;
    })();
    OfflineSearch.Entry = Entry;
    var KeywordIndex = (function () {
        function KeywordIndex() {
        }
        return KeywordIndex;
    })();
    OfflineSearch.KeywordIndex = KeywordIndex;
    var OfflineSearchResult = (function () {
        function OfflineSearchResult(project, options) {
            this.project = project;
            this.options = options;
            this.layers = [];
            this.keywordIndex = {};
        }
        return OfflineSearchResult;
    })();
    OfflineSearch.OfflineSearchResult = OfflineSearchResult;
})(OfflineSearch || (OfflineSearch = {}));

var OfflineSearch;
(function (OfflineSearch) {
    var OfflineSearchResultViewModel = (function () {
        function OfflineSearchResultViewModel(title, layerTitle, groupTitle, entry) {
            this.title = title;
            this.layerTitle = layerTitle;
            this.groupTitle = groupTitle;
            this.entry = entry;
            this.firstInGroup = false;
        }
        OfflineSearchResultViewModel.prototype.toString = function () {
            return this.title;
        };
        Object.defineProperty(OfflineSearchResultViewModel.prototype, "fullTitle", {
            get: function () {
                return this.groupTitle + ' >> ' + this.layerTitle + ' >> ' + this.title;
            },
            enumerable: true,
            configurable: true
        });
        return OfflineSearchResultViewModel;
    })();
    OfflineSearch.OfflineSearchResultViewModel = OfflineSearchResultViewModel;
    var OfflineSearchCtrl = (function () {
        // dependencies are injected via AngularJS $injector
        // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
        function OfflineSearchCtrl($scope, $layerService, $mapService, $messageBus) {
            var _this = this;
            this.$scope = $scope;
            this.$layerService = $layerService;
            this.$mapService = $mapService;
            this.$messageBus = $messageBus;
            this.isReady = false;
            $scope.vm = this;
            $messageBus.subscribe('project', function (title) {
                switch (title) {
                    case 'loaded':
                        var offlineSearchResultUrl = $layerService.projectUrl.replace('project.json', 'offline_search_result.json');
                        _this.loadSearchResults(offlineSearchResultUrl);
                        break;
                }
            });
            $messageBus.subscribe('language', function (title, language) {
                switch (title) {
                    case 'newLanguage':
                        // TODO switch language!
                        break;
                }
            });
        }
        /**
         * Load the offline search results (json file).
         */
        OfflineSearchCtrl.prototype.loadSearchResults = function (url) {
            var _this = this;
            $.getJSON(url, function (offlineSearchResult) {
                _this.offlineSearchResult = offlineSearchResult;
                var kwi = offlineSearchResult.keywordIndex;
                var keywordIndex = {};
                for (var key in kwi) {
                    if (!kwi.hasOwnProperty(key))
                        continue;
                    kwi[key].forEach(function (entry) {
                        if (!keywordIndex.hasOwnProperty(key))
                            keywordIndex[key] = [];
                        keywordIndex[key].push(new OfflineSearch.Entry(entry));
                    });
                }
                _this.offlineSearchResult.keywordIndex = keywordIndex;
                _this.isReady = true;
            });
        };
        /**
         * Get the locations based on the entered text.
         */
        OfflineSearchCtrl.prototype.getLocation = function (text, resultCount) {
            if (resultCount === void 0) { resultCount = 15; }
            if (!this.isReady || text === null || text.length < 3)
                return [];
            var searchWords = text.toLowerCase().split(' ');
            var totResults;
            for (var j in searchWords) {
                var result = this.getKeywordHits(searchWords[j]);
                totResults = !totResults
                    ? result
                    : this.mergeResults(totResults, result);
            }
            var searchResults = [];
            var layers = this.offlineSearchResult.layers;
            var count = resultCount;
            var resultIndex = 0;
            while (count > 0 && resultIndex < totResults.length) {
                var r = totResults[resultIndex++];
                var subCount = Math.min(count, r.entries.length);
                for (var i = 0; i < subCount; i++) {
                    var entry = r.entries[i];
                    var layer = layers[entry.layerIndex];
                    count--;
                    searchResults.push(new OfflineSearchResultViewModel(layer.featureNames[entry.featureIndex], layer.title, layer.groupTitle, entry));
                }
            }
            // Group search results by groupTitle | layerTitle
            var groups = {};
            searchResults.forEach(function (sr) {
                var group = sr.groupTitle + ' >> ' + sr.layerTitle;
                if (!groups.hasOwnProperty(group))
                    groups[group] = [];
                groups[group].push(sr);
            });
            searchResults = [];
            for (var key in groups) {
                if (!groups.hasOwnProperty(key))
                    continue;
                var firstInGroup = true;
                groups[key].forEach(function (sr) {
                    sr.firstInGroup = firstInGroup;
                    searchResults.push(sr);
                    firstInGroup = false;
                });
            }
            return searchResults;
        };
        /**
         * Merge the resuls of two keyword lookups by checking whether different entries refer
         * to the same layer and feature.
         * @result1 {ILookupResult[]}
         * @result2 {ILookupResult[]}
         */
        OfflineSearchCtrl.prototype.mergeResults = function (result1, result2) {
            var r = [];
            result1.forEach(function (r1) {
                result2.forEach(function (r2) {
                    r1.entries.forEach(function (entry1) {
                        r2.entries.forEach(function (entry2) {
                            if (entry1.layerIndex === entry2.layerIndex && entry1.featureIndex === entry2.featureIndex)
                                r.push({ score: r1.score * r2.score, key: r1.key + ' ' + r2.key, entries: [entry1] });
                        });
                    });
                });
            });
            r = r.sort(function (a, b) { return b.score - a.score; });
            return r;
        };
        /**
         * Do a fuzzy keyword comparison between the entered text and the list of keywords,
         * and return a subset.
         * @text: {string}
         */
        OfflineSearchCtrl.prototype.getKeywordHits = function (text) {
            var results = [];
            var keywordIndex = this.offlineSearchResult.keywordIndex;
            for (var key in keywordIndex) {
                if (!keywordIndex.hasOwnProperty(key))
                    continue;
                var score = key.score(text);
                if (score < 0.5)
                    continue;
                results.push({ score: score, key: key, entries: keywordIndex[key] });
            }
            results = results.sort(function (a, b) { return b.score - a.score; });
            return results;
        };
        /**
         * When an item is selected, optionally open the layer and jump to the selected feature.
         */
        OfflineSearchCtrl.prototype.onSelect = function (selectedItem) {
            // if ($item.feature) {
            //     this.$layerService.selectFeature($item.feature);
            //     this.$mapService.zoomTo($item.feature);
            // } else {
            //     this.$mapService.zoomToLocation(new L.LatLng($item.lat, $item.lng), 12);
            // }
            var _this = this;
            var layerIndex = selectedItem.entry.layerIndex;
            var layer = this.offlineSearchResult.layers[layerIndex];
            var projectLayer = this.$layerService.findLayer(layer.id);
            console.log(selectedItem);
            if (!projectLayer)
                return;
            if (projectLayer.enabled) {
                this.selectFeature(layer.id, selectedItem.entry.featureIndex);
                return;
            }
            else {
                var handle = this.$messageBus.subscribe('layer', function (title, layer) {
                    if (title !== 'activated' || projectLayer.url !== layer.url)
                        return;
                    _this.selectFeature(layer.id, selectedItem.entry.featureIndex);
                    _this.$messageBus.unsubscribe(handle);
                });
                // projectLayer       = new csComp.Services.ProjectLayer();
                // projectLayer.id    = layer.id;
                // projectLayer.title = layer.title;
                // projectLayer.url   = layer.path;
                // projectLayer.type  = layer.type;
                this.$layerService.addLayer(projectLayer);
            }
        };
        OfflineSearchCtrl.prototype.selectFeature = function (layerId, featureIndex) {
            var feature = this.$layerService.findFeatureById(layerId, featureIndex);
            if (feature == null)
                return;
            this.$mapService.zoomTo(feature);
            this.$layerService.selectFeature(feature);
        };
        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
        OfflineSearchCtrl.$inject = [
            '$scope',
            'layerService',
            'mapService',
            'messageBusService'
        ];
        return OfflineSearchCtrl;
    })();
    OfflineSearch.OfflineSearchCtrl = OfflineSearchCtrl;
})(OfflineSearch || (OfflineSearch = {}));

var ProjectSettings;
(function (ProjectSettings) {
    /**
      * Config
      */
    var moduleName = 'csComp';
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
                templateUrl: 'directives/ProjectSettings/ProjectSettings.tpl.html',
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
    ProjectSettings.html = '<div>    <div class="wide-tooltip">        <span class="pull-right fa fa-info-circle fa-2x"              tooltip-html-unsafe="{{\'PROJECTSETTINGS.DESCRIPTION\' | translate}}"              tooltip-placement="bottom"              tooltip-trigger="mouseenter"              tooltip-append-to-body="false"              style="margin-right: 5px;"></span>        <h4 class="leftpanel-header" translate="PROJECTSETTINGS.TITLE"></h4>    </div>    <div style="overflow-y: auto; overflow-x: hidden; margin-top: -10px" resize resize-y="95">    </div></div>';
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

var Helpers;
(function (Helpers) {
    var Resize;
    (function (Resize) {
        /**
         * Config
         */
        var moduleName = 'csComp';
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
        Resize.myModule.directive('resize', ['$window',
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
    })(Resize = Helpers.Resize || (Helpers.Resize = {}));
})(Helpers || (Helpers = {}));

var ShowModal;
(function (ShowModal) {
    /**
    * Config
    */
    var moduleName = 'csComp';
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

var StyleList;
(function (StyleList) {
    /**
      * Config
      */
    var moduleName = 'csComp';
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
        '$window', '$compile',
        function ($window, $compile) {
            return {
                terminal: false,
                restrict: 'E',
                scope: {},
                templateUrl: 'directives/StyleList/StyleList.tpl.html',
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
    StyleList.html = '<div>    <h4 class="leftpanel-header" translate="STYLES"></h4>    <div ng-show="vm.$layerService.noStyles" translate="STYLE_INFO"></div>    <div data-ng-repeat="group in vm.$layerService.project.groups" style="margin-left: 5px;clear:left;float:left">        <div ng-show="group.styles.length">            <div style="float:left;margin-left: -10px; margin-top: 5px" data-toggle="collapse" data-target="#stylegroup_{{group.id}}"><i class="fa fa-chevron-down togglebutton toggle-arrow-down"></i><i class="fa fa-chevron-up togglebutton toggle-arrow-up"></i></div>            <div class="group-title">{{group.title}}</div>            <div id="stylegroup_{{group.id}}" class="collapse in">                <div data-ng-repeat="style in group.styles">                    <div class="checkbox checkbox-primary" style="margin-left:20px;float:left">                        <input type="checkbox" id="cbstyle{{style.id}}" ng-model="style.enabled" data-ng-change="vm.$layerService.updateStyle(style);">                        <label class="style-title" for="cbstyle{{style.id}}" style="width:175px">{{style.title}}</label>                    </div>                    <div style="float:right;margin-top:10px; width: 50px">                        <div data-ng-show="style.canSelectColor" style="float:left">                            <div class="dropdown">                                <div class="style-settings" data-toggle="dropdown">                                    <style>                                    </style>                                    <!--<img src="includes/images/fillcolor.png" style="width: 32px; height:32px" />-->                                    <div id="colors" style="border-radius: 50%;width: 20px;height:20px;border-style:solid;border-color: black;border-width: 1px;background: linear-gradient(to right, {{style.colors[0]}} , {{style.colors[1]}})">                                    </div>                                    <b class="caret"></b>                                </div>                                <!--<a class="btn btn-primary btn-sm" ng-model="style.visualAspect"  style="padding-left: 10px" href="#"> {{ style.visualAspect }} </a>-->                                <ul class="dropdown-menu" role="menu">                                    <li ng-repeat="(key,val) in style.colorScales" style="margin:3px;cursor: pointer">                                        <span ng-click="vm.$layerService.updatePropertyStyle(key,val,$parent);                                              $parent.style.colors = val;                                              vm.$layerService.updateStyle($parent.style)">{{key}}</span>                                    </li>                                </ul>                            </div>                        </div>                        <div style="float:right">                            <div class="dropdown">                                <div class="style-settings" data-toggle="dropdown">                                    <!--<img src="includes/images/fillcolor.png" style="width: 32px; height:32px" />-->                                    <div class="style-aspect style-{{style.visualAspect}}"></div><b class="caret"></b>                                </div>                                <!--<a class="btn btn-primary btn-sm" ng-model="style.visualAspect"  style="padding-left: 10px" href="#"> {{ style.visualAspect }} </a>-->                                <ul class="dropdown-menu" role="menu">                                    <li ng-repeat="title in style.availableAspects" style="margin:3px;cursor: pointer">                                        <i class="style-aspect style-{{title}}" style="float:left" /><span ng-click="$parent.style.visualAspect = title;vm.$layerService.updateStyle($parent.style)"><img class="fa fa-search" style="margin-right: 8px" /> {{title}} </span>                                    </li>                                    <li class="divider"></li>                                    <li style="margin:3px;cursor: pointer"><i class="fa fa-remove" style="margin-right: 8px; float:left" /><span ng-click="vm.$layerService.removeStyle(style)">Verwijder</span></li>                                </ul>                            </div>                        </div>                    </div>                    <style>                        .legend-description {                            display: block;                            font-size: 16px;                            color: blue;                        }                        .legend-entry-item-d {                            list-style-type: none;                            height: 25px;                        }                        .legend-entry-item-i {                            list-style-type: none;                            height: 40px;                        }                        .legend-color-square {                            display: inline;                            width: 20px;                            height: 20px;                            background: #4cff00;                            position: relative;                            left: -40px;                        }                        .legend-color-gradient-rect {                            display: inline;                            width: 30px;                            height: 40px;                            background: #4cff00;                            position: relative;                            left: -40px;                        }                        .legend-label-d {                            display: inline;                            font-size: 13px;                            position: relative;                            top:    2px;                            left: -25px;                        }                        .legend-label-i {                            display: inline;                            font-size: 13px;                            position: absolute;                            left: 55px;                        }                    </style>                    <div data-ng-if="style.activeLegend && style.enabled" style="float:left;clear:left">                        <div data-ng-if="style.activeLegend.legendKind==\'discrete\' ||  style.activeLegend.legendKind==\'discretestrings\'  ">                            <div class="legend-description">{{style.activeLegend.description}}</div>                            <!--<div class="legend-description">22:24</div>-->                            <ul class="legend-entry-list">                                <li data-ng-repeat="le in style.activeLegend.legendEntries | reverse" class="legend-entry-item-d">                                    <div class="legend-color-square" style="float: left; background: {{le.color}}"></div>                                    <div class="legend-label-d" style="float: left">{{le.label}}</div>                                    <div>&nbsp;</div>   <!-- die &nbsp; is echt nodig... -->                                </li>                            </ul>                        </div>                        <div data-ng-if="style.activeLegend.legendKind==\'interpolated\'">                            <div class="legend-description">{{style.activeLegend.description}}</div>                            <ul class="legend-entry-list">                                <li data-ng-repeat="(key, le) in style.activeLegend.legendEntries | reverse" class="legend-entry-item-i">                                    <div ng-if="key < style.activeLegend.legendEntries.length-1" class="legend-color-gradient-rect" style="float: left; position: relative; top: 10px; background: linear-gradient(to bottom, {{le.color}}, {{style.activeLegend.legendEntries[style.activeLegend.legendEntries.length-key-2].color}}"></div>                                    <!--<div class="legend-label" style="float: left">{{key}} </div>-->                                    <!--<div ng-if="key < style.activeLegend.legendEntries.length-1" class="legend-label" style="float: left">{{le.label}}</div>                                    <div ng-if="key == style.activeLegend.legendEntries.length-1" class="legend-label" style="float: left; left: 0px">{{le.label}}</div>-->                                    <div class="legend-label-i">{{le.label}}</div>                                    <div>&nbsp;</div>   <!-- die &nbsp; is echt nodig... -->                                </li>                            </ul>                        </div>                    </div>                  </div>                </div>            </div>        </div>    </div></div>';
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

var Voting;
(function (Voting) {
    /**
      * Config
      */
    var moduleName = 'csComp';
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
                template: '<div style="line-height: 12px; vertical-align: top; margin: 0; background: rgba(0, 0, 0, 0.1); border-radius: 6px; padding: 4px 6px;">' +
                    '<a href="" data-ng-click="decrement()" data-ng-disabled="ngModel <= min" style="float: left;"><i class="fa" data-ng-class="{true: \'fa-minus-square\', false: \'fa-minus-square-o\'}[ngModel > min]"></i></a>' +
                    '<span style="float: left; width:28px; text-align: center;">{{ngModel}}</span>' +
                    '<a href="" data-ng-click="increment()" data-ng-disabled="ngModel >= max"><i class="fa" data-ng-class="{true: \'fa-plus-square\' , false: \'fa-plus-square-o\' }[ngModel < max]"></i></a>' +
                    '</div>',
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
        }
    ]);
})(Voting || (Voting = {}));

var Timeline;
(function (Timeline) {
    // The following class represents the provider
    var TimelineService = (function () {
        function TimelineService() {
            this.timelineOptions = {
                'width': '100%',
                'height': '100px',
                'editable': false,
                'layout': 'box'
            };
        }
        // Configuration function
        TimelineService.prototype.setTimelineOptions = function (options) {
            this.timelineOptions = options;
        };
        // Provider's factory function
        TimelineService.prototype.$get = function () {
            var _this = this;
            return {
                getTimelineOptions: function () { return _this.timelineOptions; },
                setTimelineOptions: function (options) { return _this.setTimelineOptions; }
            };
        };
        return TimelineService;
    })();
    /**
     * Config
     */
    var moduleName = 'csComp';
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
      *
      * When turning of the event margins in app.ts (see below), also set the #focustimeContainer { bottom: 45px; }
      * $layerService.timelineOptions = {
      *     'width': '100%',
      *     "eventMargin": 0,
      *     "eventMarginAxis": 0,
      *     'editable': false,
      *     'layout': 'box'
      * };
      * @seealso: http://almende.github.io/chap-links-library/downloads.html
      */
    Timeline.myModule
        .provider('TimelineService', TimelineService)
        .directive('timeline', [
        '$compile',
        function ($compile) {
            return {
                terminal: true,
                restrict: 'E',
                scope: {},
                templateUrl: 'directives/Timeline/Timeline.tpl.html',
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
    Timeline.html = '<div>    <div id="timelinecontainer">        <div id="timeline"></div>    </div>    <div class="callout top" id="focustimeContainer" ng-class="{showControl : vm.showControl}" ng-mouseenter="vm.mouseEnter()" ng-mouseleave="vm.mouseLeave()">        <div ng-show="vm.showControl" class="timelineControl" ng-class="{isPlaying : vm.isPlaying}">            <span ng-hide="vm.$layerService.project.timeLine.isLive" class="focustimeButton">                <div ng-hide="vm.isPlaying" class="fa fa-play focustimeButton" ng-click="vm.start()"></div>                <div ng-show="vm.isPlaying" class="fa fa-stop focustimeButton" ng-click="vm.stop()"></div>            </span>            <div style="float: right">{{vm.$layerService.project.timeLine.levelName}}</div>            <div ng-click="vm.toggleLive()" class="islivebutton" ng-show="vm.$layerService.project.timeLine.isLive" style="float: right">live</div>            <div ng-click="vm.toggleLive()" class="livebutton" ng-hide="vm.$layerService.project.timeLine.isLive" style="float: right">go live</div>            <!--<div ng-hide="vm.isPinned" class="fa fa-thumb-tack focustimeButton pinButton" ng-class="{isPinned : vm.isPinned}" ng-click="vm.pinToNow()"></div>-->        </div>        <div class="focustimeText">            <span style="font-weight: bold">{{vm.line1}}</span><br />            <span>{{vm.line2}}</span>        </div>    </div></div>';
})(Timeline || (Timeline = {}));

var Timeline;
(function (Timeline) {
    var TimelineCtrl = (function () {
        // dependencies are injected via AngularJS $injector
        // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
        function TimelineCtrl($scope, $layerService, $mapService, $messageBusService, TimelineService) {
            var _this = this;
            this.$scope = $scope;
            this.$layerService = $layerService;
            this.$mapService = $mapService;
            this.$messageBusService = $messageBusService;
            this.TimelineService = TimelineService;
            this.locale = "en-us";
            this.loadLocales();
            $scope.vm = this;
            this.initTimeline();
            this.$messageBusService.subscribe("timeline", function (s, data) {
                switch (s) {
                    case "updateTimerange":
                        _this.$scope.timeline.setVisibleChartRange(data.start, data.end);
                        _this.updateFocusTime();
                        break;
                    case "loadProjectTimeRange":
                        if (typeof $layerService.project === 'undefined'
                            || $layerService.project === null
                            || typeof $layerService.project.timeLine === 'undefined'
                            || $layerService.project.timeLine === null)
                            return;
                        _this.$scope.timeline.setVisibleChartRange($layerService.project.timeLine.start, $layerService.project.timeLine.end);
                        _this.updateFocusTime();
                        break;
                }
                //if ($scope.$$phase != '$apply' && $scope.$$phase != '$digest') { $scope.$apply(); }
            });
            //$scope.focusDate = $layerService.project.timeLine.focusDate();
            // Options voor de timeline
            this.$messageBusService.subscribe("language", function (s, newLanguage) {
                switch (s) {
                    case "newLanguage":
                        _this.initTimeline();
                        break;
                }
            });
        }
        TimelineCtrl.prototype.initTimeline = function () {
            var _this = this;
            var options = this.TimelineService.getTimelineOptions();
            options.locale = this.$layerService.currentLocale;
            this.$layerService.timeline = this.$scope.timeline = new links.Timeline(document.getElementById('timeline'), options);
            this.$scope.timeline.draw();
            links.events.addListener(this.$scope.timeline, 'rangechange', _.throttle(function (prop) { return _this.onRangeChanged(prop); }, 200));
            links.events.addListener(this.$scope.timeline, 'rangechange', function () {
                if (_this.$layerService.project && _this.$layerService.project.timeLine.isLive) {
                    _this.myTimer();
                }
            });
            if (typeof this.$layerService.project !== 'undefined' && this.$layerService.project.timeLine !== null)
                this.$scope.timeline.setVisibleChartRange(this.$layerService.project.timeLine.start, this.$layerService.project.timeLine.end);
            this.updateDragging();
            this.updateFocusTime();
        };
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
            this.timer = setInterval(function () { _this.myTimer(); }, 500);
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
            //if (!this.$mapService.timelineVisible) return;
            var tl = this.$scope.timeline;
            tl.showCustomTime = true;
            tl.setCustomTime = typeof this.$layerService.project === 'undefined'
                ? new Date()
                : this.$layerService.project.timeLine.focusDate();
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
            //if (this.$scope.$$phase != '$apply' && this.$scope.$$phase != '$digest') { this.$scope.$apply(); }
            this.$messageBusService.publish("timeline", "focusChange", this.focusDate);
            //this.$layerService.focusTime = new Date(this.timelineCtrl.screenToTime(centerX));
        };
        /**
        * Load the locales: instead of loading them from the original timeline-locales.js distribution,
        * add them here so you don't need to add another js dependency.
        * @seealso: http://almende.github.io/chap-links-library/downloads.html
        */
        TimelineCtrl.prototype.loadLocales = function () {
            if (typeof links === 'undefined') {
                links = {};
                links.locales = {};
            }
            else if (typeof links.locales === 'undefined') {
                links.locales = {};
            }
            // English ===================================================
            links.locales['en'] = {
                'MONTHS': ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                'MONTHS_SHORT': ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                'DAYS': ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                'DAYS_SHORT': ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                'ZOOM_IN': "Zoom in",
                'ZOOM_OUT': "Zoom out",
                'MOVE_LEFT': "Move left",
                'MOVE_RIGHT': "Move right",
                'NEW': "New",
                'CREATE_NEW_EVENT': "Create new event"
            };
            links.locales['en_US'] = links.locales['en'];
            links.locales['en_UK'] = links.locales['en'];
            // French ===================================================
            links.locales['fr'] = {
                'MONTHS': ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
                'MONTHS_SHORT': ["Jan", "Fev", "Mar", "Avr", "Mai", "Jun", "Jul", "Aou", "Sep", "Oct", "Nov", "Dec"],
                'DAYS': ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
                'DAYS_SHORT': ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
                'ZOOM_IN': "Zoomer",
                'ZOOM_OUT': "Dézoomer",
                'MOVE_LEFT': "Déplacer à gauche",
                'MOVE_RIGHT': "Déplacer à droite",
                'NEW': "Nouveau",
                'CREATE_NEW_EVENT': "Créer un nouvel évènement"
            };
            links.locales['fr_FR'] = links.locales['fr'];
            links.locales['fr_BE'] = links.locales['fr'];
            links.locales['fr_CA'] = links.locales['fr'];
            // German ===================================================
            links.locales['de'] = {
                'MONTHS': ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
                'MONTHS_SHORT': ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
                'DAYS': ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
                'DAYS_SHORT': ["Son", "Mon", "Die", "Mit", "Don", "Fre", "Sam"],
                'ZOOM_IN': "Vergrößern",
                'ZOOM_OUT': "Verkleinern",
                'MOVE_LEFT': "Nach links verschieben",
                'MOVE_RIGHT': "Nach rechts verschieben",
                'NEW': "Neu",
                'CREATE_NEW_EVENT': "Neues Ereignis erzeugen"
            };
            links.locales['de_DE'] = links.locales['de'];
            links.locales['de_CH'] = links.locales['de'];
            // Dutch =====================================================
            links.locales['nl'] = {
                'MONTHS': ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
                'MONTHS_SHORT': ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"],
                'DAYS': ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"],
                'DAYS_SHORT': ["zo", "ma", "di", "wo", "do", "vr", "za"],
                'ZOOM_IN': "Inzoomen",
                'ZOOM_OUT': "Uitzoomen",
                'MOVE_LEFT': "Naar links",
                'MOVE_RIGHT': "Naar rechts",
                'NEW': "Nieuw",
                'CREATE_NEW_EVENT': "Nieuwe gebeurtenis maken"
            };
            links.locales['nl_NL'] = links.locales['nl'];
            links.locales['nl_BE'] = links.locales['nl'];
        };
        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
        TimelineCtrl.$inject = [
            '$scope',
            'layerService',
            'mapService',
            'messageBusService',
            'TimelineService'
        ];
        return TimelineCtrl;
    })();
    Timeline.TimelineCtrl = TimelineCtrl;
})(Timeline || (Timeline = {}));

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
        var TypedEvent = (function () {
            function TypedEvent() {
                // Private member vars
                this._listeners = [];
            }
            TypedEvent.prototype.add = function (listener) {
                /// <summary>Registers a new listener for the event.</summary>
                /// <param name="listener">The callback function to register.</param>
                this._listeners.push(listener);
            };
            TypedEvent.prototype.remove = function (listener) {
                /// <summary>Unregisters a listener from the event.</summary>
                /// <param name="listener">The callback function that was registered. If missing then all listeners will be removed.</param>
                if (typeof listener === 'function') {
                    for (var i = 0, l = this._listeners.length; i < l; l++) {
                        if (this._listeners[i] === listener) {
                            this._listeners.splice(i, 1);
                            break;
                        }
                    }
                }
                else {
                    this._listeners = [];
                }
            };
            TypedEvent.prototype.trigger = function () {
                var a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    a[_i - 0] = arguments[_i];
                }
                /// <summary>Invokes all of the listeners for this event.</summary>
                /// <param name="args">Optional set of arguments to pass to listners.</param>
                var context = {};
                var listeners = this._listeners.slice(0);
                for (var i = 0, l = listeners.length; i < l; i++) {
                    listeners[i].apply(context, a || []);
                }
            };
            return TypedEvent;
        })();
        Services.TypedEvent = TypedEvent;
        var Connection = (function () {
            function Connection(id, url) {
                this.id = id;
                this.url = url;
                this.cache = {};
                this.subscriptions = {};
                // Events
                this.events = new TypedEvent();
            }
            Connection.prototype.unsubscribe = function (id, callback) {
                if (this.subscriptions.hasOwnProperty(id)) {
                    var s = this.subscriptions[id];
                    s.callbacks = s.callbacks.filter(function (f) { return f != callback; });
                    if (s.callbacks.length == 0) {
                        this.socket.emit(id, { action: "unsubscribe" });
                        this.socket.removeListener(id, s.serverCallback);
                        s.serverCallback = null;
                        delete this.subscriptions[id];
                    }
                }
            };
            Connection.prototype.reSubscribeAll = function () {
                console.log('resubscribing...');
                for (var s in this.subscriptions) {
                    console.log('reconnecting ' + s);
                    var sub = this.subscriptions[s];
                    this.socket.emit("subscribe", { id: sub.id, target: sub.target, type: sub.type });
                }
            };
            Connection.prototype.subscribe = function (target, type, callback) {
                var sub;
                var subs = [];
                for (var s in this.subscriptions) {
                    if (this.subscriptions[s].target == target && this.subscriptions[s].type == type)
                        subs.push(this.subscriptions[s]);
                }
                if (subs == null || subs.length == 0) {
                    sub = new ServerSubscription(target, type);
                    this.socket.emit("subscribe", { id: sub.id, target: sub.target, type: sub.type });
                    sub.callbacks.push(callback);
                    this.subscriptions[sub.id] = sub;
                    sub.serverCallback = function (r) {
                        sub.callbacks.forEach(function (cb) { return cb(sub.id, r); });
                    };
                    this.socket.on(sub.id, sub.serverCallback);
                }
                else {
                    sub = subs[0];
                    sub.callbacks.push(callback);
                }
                return sub;
            };
            Connection.prototype.connect = function (callback) {
                var _this = this;
                if (this.isConnected || this.isConnecting)
                    return;
                this.socket = io();
                this.isConnecting = true;
                this.socket.on('connect', function () {
                    //console.log(JSON.stringify(this.socket));
                    console.log('socket.io connected');
                    _this.isConnecting = false;
                    _this.isConnected = true;
                    _this.events.trigger("connected");
                    _this.reSubscribeAll();
                    callback();
                });
                this.socket.on('disconnect', function () {
                    console.log('socket.io disconnected');
                    _this.isConnecting = false;
                    _this.isConnected = false;
                });
                this.socket.on('reconnect_attempt', function () {
                    console.log('socket.io reconnect attempt');
                    _this.isConnecting = true;
                    _this.isConnected = false;
                });
                this.socket.on('reconnect_failed', function () {
                    console.log('socket.io reconnect failed');
                    _this.isConnecting = false;
                });
            };
            Connection.prototype.disconnect = function () { };
            return Connection;
        })();
        Services.Connection = Connection;
        (function (NotifyLocation) {
            NotifyLocation[NotifyLocation["BottomRight"] = 0] = "BottomRight";
            NotifyLocation[NotifyLocation["BottomLeft"] = 1] = "BottomLeft";
            NotifyLocation[NotifyLocation["TopRight"] = 2] = "TopRight";
            NotifyLocation[NotifyLocation["TopLeft"] = 3] = "TopLeft";
        })(Services.NotifyLocation || (Services.NotifyLocation = {}));
        var NotifyLocation = Services.NotifyLocation;
        var ServerSubscription = (function () {
            function ServerSubscription(target, type) {
                this.target = target;
                this.type = type;
                this.callbacks = [];
                this.id = csComp.Helpers.getGuid();
            }
            return ServerSubscription;
        })();
        Services.ServerSubscription = ServerSubscription;
        /**
         * Simple message bus service, used for subscribing and unsubsubscribing to topics.
         * @see {@link https://gist.github.com/floatingmonkey/3384419}
         */
        var MessageBusService = (function () {
            function MessageBusService($translate) {
                this.$translate = $translate;
                this.connections = {};
                PNotify.prototype.options.styling = "fontawesome";
            }
            MessageBusService.prototype.getConnection = function (id) {
                if (this.connections.hasOwnProperty(id))
                    return this.connections[id];
                return null;
            };
            MessageBusService.prototype.initConnection = function (id, url, callback) {
                if (id == null)
                    id = "";
                var c = this.getConnection(id);
                if (c == null) {
                    c = new Connection(id, url);
                    this.connections[c.id] = c;
                }
                this.connections[id].connect(function () {
                    //for (var topic in c.cache) {
                    //    c.socket.on(topic,(r) => {
                    //        c.cache[topic].forEach(cb => cb(topic, r));
                    //    });
                    //}
                    callback();
                });
            };
            MessageBusService.prototype.serverPublish = function (topic, message, serverId) {
                if (serverId === void 0) { serverId = ""; }
                var c = this.getConnection(serverId);
                if (c == null)
                    return null;
                c.socket.emit(topic, message);
            };
            MessageBusService.prototype.serverSubscribe = function (target, type, callback, serverId) {
                if (serverId === void 0) { serverId = ""; }
                var c = this.getConnection(serverId);
                if (c == null)
                    return null;
                var sub = c.subscribe(target, type, callback);
                return new MessageBusHandle(sub.id, callback);
            };
            MessageBusService.prototype.serverUnsubscribe = function (handle, serverId) {
                if (serverId === void 0) { serverId = ""; }
                var c = this.getConnection(serverId);
                if (c == null)
                    return null;
                c.unsubscribe(handle.topic, handle.callback);
            };
            /**
             * Publish a notification that needs to be translated
             * @title:       the translation key of the notification's title
             * @text:        the translation key of the notification's content
             * @location:    the location on the screen where the notification is shown (default bottom right)
             */
            MessageBusService.prototype.notifyWithTranslation = function (title, text, location) {
                var _this = this;
                if (location === void 0) { location = NotifyLocation.BottomRight; }
                this.$translate(title).then(function (translatedTitle) {
                    _this.$translate(text).then(function (translatedText) {
                        _this.notify(translatedTitle, translatedText, location);
                    });
                });
            };
            /**
             * Publish a notification
             * @title:       the title of the notification
             * @text:        the contents of the notification
             * @location:    the location on the screen where the notification is shown (default bottom right)
             */
            MessageBusService.prototype.notify = function (title, text, location) {
                if (location === void 0) { location = NotifyLocation.BottomRight; }
                var cssLocation, dir1, dir2;
                switch (location) {
                    case NotifyLocation.BottomLeft:
                        cssLocation = 'stack-bottomleft';
                        dir1 = 'up';
                        dir2 = 'right';
                        break;
                    case NotifyLocation.TopRight:
                        cssLocation = 'stack-topright';
                        dir1 = 'down';
                        dir2 = 'left';
                        break;
                    case NotifyLocation.TopLeft:
                        cssLocation = 'stack-topleft';
                        dir1 = 'down';
                        dir2 = 'right';
                        break;
                    default:
                        cssLocation = 'stack-bottomright';
                        dir1 = 'up';
                        dir2 = 'left';
                        break;
                }
                var options = {
                    title: title,
                    text: text,
                    icon: 'fa fa-info',
                    cornerclass: 'ui-pnotify-sharp',
                    addclass: cssLocation,
                    stack: { "dir1": dir1, "dir2": dir2, "firstpos1": 25, "firstpos2": 25 }
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
                var pn = new PNotify(options).get()
                    .on('pnotify.confirm', function () { callback(true); })
                    .on('pnotify.cancel', function () { callback(false); });
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
            MessageBusService.$inject = [
                '$translate'
            ];
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
        /**
          * Register service
          */
        var moduleName = 'csComp';
        /**
          * Module
          */
        Services.myModule;
        try {
            Services.myModule = angular.module(moduleName);
        }
        catch (err) {
            // named module does not exist, so create one
            Services.myModule = angular.module(moduleName, []);
        }
        Services.myModule.service('messageBusService', csComp.Services.MessageBusService);
    })(Services = csComp.Services || (csComp.Services = {}));
})(csComp || (csComp = {}));

var csComp;
(function (csComp) {
    var Services;
    (function (Services) {
        var ConnectionService = (function () {
            function ConnectionService($messageBusService, $layerService) {
                // connectie opzetten
                // toegang tot primus/socket.io object
                // mb.
                this.$messageBusService = $messageBusService;
                this.$layerService = $layerService;
            }
            ConnectionService.$inject = [
                'messageBusService',
                'layerService'
            ];
            return ConnectionService;
        })();
        Services.ConnectionService = ConnectionService;
    })(Services = csComp.Services || (csComp.Services = {}));
})(csComp || (csComp = {}));

var csComp;
(function (csComp) {
    var Services;
    (function (Services) {
        var InstanceLoader = (function () {
            function InstanceLoader(context) {
                this.context = context;
            }
            InstanceLoader.prototype.getInstance = function (name) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                var instance = Object.create(this.context["csComp"]["Services"][name].prototype);
                instance.constructor.apply(instance, args);
                return instance;
            };
            return InstanceLoader;
        })();
        var DashboardService = (function () {
            function DashboardService($rootScope, $compile, $location, $translate, $messageBusService, $layerService, $mapService) {
                //$translate('FILTER_INFO').then((translation) => console.log(translation));
                // NOTE EV: private props in constructor automatically become fields, so mb and map are superfluous.
                this.$rootScope = $rootScope;
                this.$compile = $compile;
                this.$location = $location;
                this.$translate = $translate;
                this.$messageBusService = $messageBusService;
                this.$layerService = $layerService;
                this.$mapService = $mapService;
                //alert('init dashbard');
                this.mainDashboard = new csComp.Services.Dashboard();
                this.dashboards = [];
                this.dashboards["main"] = this.mainDashboard;
                this.widgetTypes = {};
                this.$messageBusService.subscribe("dashboard", function (event, id) {
                    alert(event);
                });
                //this.widgetTypes["Title"] = new TitleWidget();
                //this.widgetTypes["Text"] = new TextWidget();
                //this.widgetTypes["DataSet"] = new DataSetWidget();
                //this.widgetTypes["Layer"] = new LayerWidget();
                //this.socket = new io();
                //this.socket.on('update', (s) => {
                //    alert(s.topic);
                //});
                //this.socket.connect();
            }
            DashboardService.prototype.init = function () {
                //alert('init');
            };
            DashboardService.prototype.selectDashboard = function (dashboard, container) {
                this.$layerService.project.activeDashboard = dashboard;
                this.$messageBusService.publish("dashboard-" + container, "activated", dashboard);
            };
            DashboardService.prototype.addNewWidget = function (widget, dashboard) {
                var _this = this;
                //var loader = new InstanceLoader(window);
                //var w = <IWidget>loader.getInstance(widget.widgetType);
                //w.messageBusService = this.$messageBusService;
                //w.layerService = this.$layerService;
                //w.init();
                //var w = BaseWidget();
                if (!widget.id)
                    widget.id = csComp.Helpers.getGuid();
                widget.elementId = "widget-" + widget.id;
                widget.dashboard = dashboard;
                dashboard.widgets.push(widget);
                if (this.$rootScope.$root.$$phase != '$apply' && this.$rootScope.$root.$$phase != '$digest') {
                    this.$rootScope.$apply();
                }
                setTimeout(function () {
                    //if (w != null) w.renderer(this.$compile, this.$rootScope);
                    _this.updateWidget(widget);
                }, 50);
                //this.editWidget(w);
                return widget;
            };
            DashboardService.prototype.updateWidget = function (widget) {
                //alert('hoi arnoud');
                var d = JSON.stringify(widget.data);
                var newElement = this.$compile("<" + widget.directive + " widget='" + d + "'></" + widget.directive + ">")(this.$rootScope);
                var el = $("#" + widget.elementId);
                el.empty();
                el.append(newElement);
            };
            DashboardService.prototype.addWidget = function (widget) {
                return this.addNewWidget(widget, this.mainDashboard);
            };
            DashboardService.prototype.editWidget = function (widget) {
                this.activeWidget = widget;
                $('#leftPanelTab a[href="#widgetedit"]').tab('show'); // Select tab by name
            };
            DashboardService.prototype.removeWidget = function () {
                var _this = this;
                if (this.activeWidget && this.mainDashboard) {
                    this.mainDashboard.widgets = this.mainDashboard.widgets.filter(function (w) { return w.id != _this.activeWidget.id; });
                    this.activeWidget = null;
                    $('#leftPanelTab a[href="#basewidgets"]').tab('show'); // Select tab by name
                }
            };
            DashboardService.$inject = [
                '$rootScope',
                '$compile',
                '$location',
                '$translate',
                'messageBusService',
                'layerService',
                'mapService'
            ];
            return DashboardService;
        })();
        Services.DashboardService = DashboardService;
        /**
          * Register service
          */
        var moduleName = 'csComp';
        /**
          * Module
          */
        Services.myModule;
        try {
            Services.myModule = angular.module(moduleName);
        }
        catch (err) {
            // named module does not exist, so create one
            Services.myModule = angular.module(moduleName, []);
        }
        Services.myModule.service('dashboardService', csComp.Services.DashboardService);
    })(Services = csComp.Services || (csComp.Services = {}));
})(csComp || (csComp = {}));

var csComp;
(function (csComp) {
    var Services;
    (function (Services) {
        'use strict';
        var VisualState = (function () {
            function VisualState() {
                this.leftPanelVisible = false;
                this.rightPanelVisible = false;
                this.dashboardVisible = true;
                this.mapVisible = true;
                this.timelineVisible = true;
            }
            return VisualState;
        })();
        Services.VisualState = VisualState;
        var LayerService = (function () {
            function LayerService($location, $translate, $messageBusService, $mapService, $rootScope, dashboardService) {
                var _this = this;
                this.$location = $location;
                this.$translate = $translate;
                this.$messageBusService = $messageBusService;
                this.$mapService = $mapService;
                this.$rootScope = $rootScope;
                this.dashboardService = dashboardService;
                this.loadedLayers = new csComp.Helpers.Dictionary();
                this.layerGroup = new L.LayerGroup();
                this.info = new L.Control();
                this.visual = new VisualState();
                //$translate('FILTER_INFO').then((translation) => console.log(translation));
                // NOTE EV: private props in constructor automatically become fields, so mb and map are superfluous.
                this.mb = $messageBusService;
                this.map = $mapService;
                this.accentColor = '';
                this.title = '';
                //this.layerGroup       = new L.LayerGroup<L.ILayer>();
                this.featureTypes = {};
                this.propertyTypeData = {};
                //this.map.map.addLayer(this.layerGroup);
                this.noStyles = true;
                this.currentLocale = "en";
                // init map renderers
                this.mapRenderers = {};
                this.visual = new VisualState();
                // add renderers
                this.mapRenderers["leaflet"] = new Services.LeafletRenderer();
                this.mapRenderers["leaflet"].init(this);
                this.mapRenderers["cesium"] = new Services.CesiumRenderer();
                this.mapRenderers["cesium"].init(this);
                this.selectRenderer("leaflet");
                //this.mapRenderers["leaflet"].enable();
                this.initLayerSources();
                //this.$dashboardService.init();
                $messageBusService.subscribe('timeline', function (trigger) {
                    switch (trigger) {
                        case 'focusChange':
                            _this.updateSensorData();
                            break;
                    }
                });
                $messageBusService.subscribe('language', function (title, language) {
                    switch (title) {
                        case 'newLanguage':
                            _this.currentLocale = language;
                            $messageBusService.notifyWithTranslation('LAYER_SERVICE.RELOAD_PROJECT_TITLE', 'LAYER_SERVICE.RELOAD_PROJECT_MSG');
                            _this.openProject(_this.projectUrl);
                            break;
                    }
                });
            }
            // initialize the available layer sources
            LayerService.prototype.initLayerSources = function () {
                // init layer sources
                this.layerSources = {};
                // add a topo/geojson source
                var geojsonsource = new Services.GeoJsonSource(this);
                this.layerSources["geojson"] = geojsonsource;
                this.layerSources["topojson"] = geojsonsource;
                this.layerSources["dynamicgeojson"] = new Services.DynamicGeoJsonSource(this);
                // add wms source
                this.layerSources["wms"] = new Services.WmsSource(this);
                //add tile layer
                this.layerSources["tilelayer"] = new Services.TileLayerSource(this);
                //add heatmap layer
                this.layerSources["heatmap"] = new Services.HeatmapSource(this);
            };
            LayerService.prototype.loadRequiredLayers = function (layer) {
                var _this = this;
                // find layer source, and activate layer
                var layerSource = layer.type.toLowerCase();
                // if a layer is depends on other layers, load those first
                if (this.layerSources.hasOwnProperty(layerSource)) {
                    if (this.layerSources[layerSource].requiresLayer) {
                        var requiredLayers = this.layerSources[layerSource].getRequiredLayers(layer);
                        requiredLayers.forEach(function (l) {
                            _this.addLayer(l);
                        });
                    }
                }
            };
            LayerService.prototype.addLayer = function (layer) {
                var _this = this;
                if (this.loadedLayers.containsKey(layer.id))
                    return;
                var disableLayers = [];
                async.series([
                    function (callback) {
                        // check if in this group only one layer can be active
                        // make sure all existising active layers are disabled
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
                        // load required feature layers, if applicable
                        _this.loadRequiredLayers(layer);
                        // find layer source, and activate layer
                        var layerSource = layer.type.toLowerCase();
                        if (_this.layerSources.hasOwnProperty(layerSource)) {
                            layer.layerSource = _this.layerSources[layerSource];
                            // load layer from source
                            layer.layerSource.addLayer(layer, function (l) {
                                l.enabled = true;
                                _this.loadedLayers[layer.id] = l;
                                _this.updateSensorData();
                                _this.updateFilters();
                                _this.activeMapRenderer.addLayer(layer);
                                if (layer.defaultLegendProperty)
                                    _this.checkLayerLegend(layer, layer.defaultLegendProperty);
                                _this.checkLayerTimer(layer);
                                _this.$messageBusService.publish('layer', 'activated', layer);
                            });
                        }
                        callback(null, null);
                    },
                    function (callback) {
                        // now remove the layers that need to be disabled
                        disableLayers.forEach(function (l) {
                            _this.removeLayer(l);
                            l.enabled = false;
                        });
                        callback(null, null);
                    }
                ]);
            };
            LayerService.prototype.checkLayerLegend = function (layer, property) {
                var _this = this;
                var ptd = this.project.propertyTypeData[property];
                if (ptd && ptd.legend) {
                    var gs;
                    if (layer.group.styles && (layer.group.styles.length > 0)) {
                        gs = layer.group.styles[0]; // TODO: when do we need a different one than the first?
                    }
                    else {
                        gs = new Services.GroupStyle(this.$translate);
                        layer.group.styles.push(gs);
                    }
                    gs.title = ptd.title;
                    gs.id = csComp.Helpers.getGuid();
                    gs.activeLegend = ptd.legend;
                    gs.group = layer.group;
                    gs.property = property;
                    gs.legends[ptd.title] = ptd.legend;
                    gs.colorScales[ptd.title] = ['purple', 'purple'];
                    gs.enabled = true;
                    gs.visualAspect = (ptd.legend.visualAspect) ? ptd.legend.visualAspect : 'strokeColor'; // TODO: let this be read from the propertyTypeData
                    this.saveStyle(layer.group, gs);
                    this.project.features.forEach(function (fe) {
                        if (fe.layer.group == layer.group) {
                            _this.calculateFeatureStyle(fe);
                            _this.activeMapRenderer.updateFeature(fe);
                        }
                    });
                    this.noStyles = false; // TODO: when does this need to be reset?
                }
            };
            LayerService.prototype.checkLayerTimer = function (layer) {
                console.log('check layer timer');
                if (layer.refreshTimer) {
                    if (layer.enabled && !layer.timerToken) {
                        layer.timerToken = setInterval(function () {
                            layer.layerSource.refreshLayer(layer);
                        }, layer.refreshTimer * 1000);
                        console.log(layer.timerToken);
                    }
                    if (!layer.enabled && layer.timerToken) {
                        clearInterval(layer.timerToken);
                        layer.timerToken = null;
                    }
                    console.log('refresh timer enabled : ' + layer.refreshTimer);
                }
            };
            LayerService.prototype.removeStyle = function (style) {
                var g = style.group;
                g.styles = g.styles.filter(function (s) { return s.id !== style.id; });
                this.updateGroupFeatures(g);
            };
            LayerService.prototype.updatePropertyStyle = function (k, v, parent) {
                // method of class LayerService
                /* k, v is key-value pair of style.colorScales => key is a string */
                /* value is in most cases a list of two strings. actually it is not used in this function */
                /* parent is a ??which class??  ($parent in stylelist.tpl.html) */
                //alert('key = ' + k + '; value = ' + v);
                var l;
                l = parent.style.legends[k];
                if (l && (l.legendEntries.length > 0)) {
                    var e1 = l.legendEntries[0];
                    var e2 = l.legendEntries[l.legendEntries.length - 1];
                    parent.style.colors = [e1.color, e2.color];
                }
                parent.style.activeLegend = l;
            };
            LayerService.prototype.updateStyle = function (style) {
                //console.log('update style ' + style.title);
                if (style == null)
                    return;
                if (style.group != null && style.group.styles[0] != null) {
                    if (style.group.styles[0].fixedColorRange) {
                        style.info = style.group.styles[0].info;
                    }
                    else {
                        style.info = this.calculatePropertyInfo(style.group, style.property);
                    }
                    style.canSelectColor = style.visualAspect.toLowerCase().indexOf('color') > -1;
                    this.updateGroupFeatures(style.group);
                }
            };
            LayerService.prototype.updateGroupFeatures = function (group) {
                var _this = this;
                this.project.features.forEach(function (f) {
                    if (f.layer.group == group) {
                        _this.calculateFeatureStyle(f);
                        _this.activeMapRenderer.updateFeature(f);
                    }
                });
            };
            LayerService.prototype.selectRenderer = function (renderer) {
                if (this.activeMapRenderer && this.activeMapRenderer.title == renderer)
                    return;
                if (this.activeMapRenderer)
                    this.activeMapRenderer.disable();
                if (this.mapRenderers.hasOwnProperty(renderer)) {
                    this.activeMapRenderer = this.mapRenderers[renderer];
                    this.activeMapRenderer.enable();
                }
            };
            LayerService.prototype.selectFeature = function (feature) {
                feature.isSelected = !feature.isSelected;
                this.calculateFeatureStyle(feature);
                this.activeMapRenderer.updateFeature(feature);
                // deselect last feature and also update
                if (this.lastSelectedFeature != null && this.lastSelectedFeature !== feature) {
                    this.lastSelectedFeature.isSelected = false;
                    this.calculateFeatureStyle(this.lastSelectedFeature);
                    this.activeMapRenderer.updateFeature(this.lastSelectedFeature);
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
            LayerService.prototype.updateSensorData = function () {
                var _this = this;
                if (this.project == null || this.project.timeLine == null || this.project.features == null)
                    return;
                var date = this.project.timeLine.focus;
                var timepos = {};
                this.project.features.forEach(function (f) {
                    var l = _this.findLayer(f.layerId);
                    if (l != null) {
                        if (f.sensors || f.coordinates) {
                            var getIndex = function (d, timestamps) {
                                for (var i = 1; i < timestamps.length; i++) {
                                    if (timestamps[i] > d) {
                                        return i;
                                    }
                                }
                                return timestamps.length - 1;
                            };
                            var pos = 0;
                            if (f.timestamps) {
                                pos = getIndex(date, f.timestamps);
                            }
                            else if (l.timestamps) {
                                if (timepos.hasOwnProperty(f.layerId)) {
                                    pos = timepos[f.layerId];
                                }
                                else {
                                    pos = getIndex(date, l.timestamps);
                                    timepos[f.layerId] = pos;
                                }
                            }
                            // check if a new coordinate is avaiable
                            if (f.coordinates && f.geometry && f.coordinates.length > pos && f.coordinates[pos] != f.geometry.coordinates) {
                                f.geometry.coordinates = f.coordinates[pos];
                                // get marker
                                if (l.group.markers.hasOwnProperty(f.id)) {
                                    var m = l.group.markers[f.id];
                                    // update position
                                    m.setLatLng(new L.LatLng(f.geometry.coordinates[1], f.geometry.coordinates[0]));
                                }
                            }
                            if (f.sensors) {
                                for (var sensorTitle in f.sensors) {
                                    var sensor = f.sensors[sensorTitle];
                                    var value = sensor[pos];
                                    f.properties[sensorTitle] = value;
                                }
                                _this.calculateFeatureStyle(f);
                                _this.activeMapRenderer.updateFeature(f);
                                if (f.isSelected)
                                    _this.$messageBusService.publish("feature", "onFeatureUpdated", f);
                            }
                        }
                    }
                });
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
            /**
             * init feature (add to feature list, crossfilter)
             */
            LayerService.prototype.initFeature = function (feature, layer) {
                if (!feature.isInitialized) {
                    feature.isInitialized = true;
                    if (feature.properties == null)
                        feature.properties = {};
                    feature.index = layer.count++;
                    // make sure it has an id
                    if (feature.id == null)
                        feature.id = csComp.Helpers.getGuid();
                    feature.layerId = layer.id;
                    feature.layer = layer;
                    // add feature to global list of features
                    this.project.features.push(feature);
                    // add to crossfilter
                    layer.group.ndx.add([feature]);
                    // resolve feature type
                    feature.fType = this.getFeatureType(feature);
                    this.initFeatureType(feature.fType);
                    // Do we have a name?
                    if (!feature.properties.hasOwnProperty('Name'))
                        csComp.Helpers.setFeatureName(feature);
                    this.calculateFeatureStyle(feature);
                }
                return feature.type;
            };
            LayerService.prototype.removeFeature = function (feature) {
                this.project.features = this.project.features.filter(function (f) { return f != feature; });
                feature.layer.group.ndx.remove([feature]);
                this.activeMapRenderer.removeFeature(feature);
            };
            /**
            * Calculate the effective feature style.
            */
            LayerService.prototype.calculateFeatureStyle = function (feature) {
                var s = {};
                //TODO: check compatibility for both heatmaps and other features
                //s.fillColor = 'red';
                //s.strokeWidth = 1;
                s.stroke = false;
                s.strokeWidth = 1;
                s.strokeColor = 'black';
                s.fillOpacity = 0.75;
                s.rotate = 0;
                //s.strokeColor = 'black';
                //s.iconHeight = 32;
                //s.iconWidth = 32;
                //s.cornerRadius = 20;
                var ft = this.getFeatureType(feature);
                if (ft.style) {
                    if (ft.style.fillColor != null)
                        s.fillColor = csComp.Helpers.getColorString(ft.style.fillColor);
                    if (ft.style.strokeColor != null)
                        s.strokeColor = csComp.Helpers.getColorString(ft.style.strokeColor, '#fff');
                    if (ft.style.strokeWidth != null)
                        s.strokeWidth = ft.style.strokeWidth;
                    if (ft.style.iconWidth != null)
                        s.iconWidth = ft.style.iconWidth;
                    if (ft.style.iconHeight != null)
                        s.iconHeight = ft.style.iconHeight;
                    if (ft.style.innerTextProperty != null)
                        s.innerTextProperty = ft.style.innerTextProperty;
                    if (ft.style.innerTextSize != null)
                        s.innerTextSize = ft.style.innerTextSize;
                    if (ft.style.cornerRadius != null)
                        s.cornerRadius = ft.style.cornerRadius;
                    if (ft.style.rotateProperty && feature.properties.hasOwnProperty(ft.style.rotateProperty)) {
                        s.rotate = Number(feature.properties[ft.style.rotateProperty]);
                    }
                }
                feature.layer.group.styles.forEach(function (gs) {
                    if (gs.enabled && feature.properties.hasOwnProperty(gs.property)) {
                        if (gs.activeLegend) {
                            if ((gs.activeLegend.legendKind == 'discrete') ||
                                (gs.activeLegend.legendKind == 'interpolated')) {
                                var v = Number(feature.properties[gs.property]);
                                if (!isNaN(v)) {
                                    switch (gs.visualAspect) {
                                        case 'strokeColor':
                                            s.strokeColor = csComp.Helpers.getColor(v, gs);
                                            break;
                                        case 'fillColor':
                                            s.fillColor = csComp.Helpers.getColor(v, gs);
                                            break;
                                        case 'strokeWidth':
                                            s.strokeWidth = ((v - gs.info.sdMin) / (gs.info.sdMax - gs.info.sdMin) * 10) + 1;
                                            break;
                                    }
                                }
                            } // discrete or interpolated
                            if (gs.activeLegend.legendKind == 'discretestrings') {
                                var ss = feature.properties[gs.property];
                                switch (gs.visualAspect) {
                                    case 'strokeColor':
                                        s.strokeColor = csComp.Helpers.getColorFromStringValue(ss, gs);
                                        break;
                                    case 'fillColor':
                                        s.fillColor = csComp.Helpers.getColorFromStringValue(ss, gs);
                                        break;
                                }
                            } // discrete strings
                        } // activelegend
                    }
                });
                //var layer = this.findLayer(feature.layerId);
                feature.layer.group.styles.forEach(function (gs) {
                    if (gs.enabled && feature.properties.hasOwnProperty(gs.property)) {
                        var v = Number(feature.properties[gs.property]);
                        if (!isNaN(v)) {
                            switch (gs.visualAspect) {
                                case 'strokeColor':
                                    s.strokeColor = csComp.Helpers.getColor(v, gs);
                                    break;
                                case 'fillColor':
                                    s.fillColor = csComp.Helpers.getColor(v, gs);
                                    break;
                                case 'strokeWidth':
                                    s.strokeWidth = ((v - gs.info.sdMin) / (gs.info.sdMax - gs.info.sdMin) * 10) + 1;
                                    break;
                            }
                        }
                        else {
                            var ss = feature.properties[gs.property];
                            switch (gs.visualAspect) {
                                case 'strokeColor':
                                    s.strokeColor = csComp.Helpers.getColorFromStringValue(ss, gs);
                                    break;
                                case 'fillColor':
                                    s.fillColor = csComp.Helpers.getColorFromStringValue(ss, gs);
                                    break;
                            }
                        }
                    }
                });
                if (feature.isSelected) {
                    s.strokeWidth = 5;
                    s.strokeColor = 'black';
                }
                feature.effectiveStyle = s;
            };
            /**
            * Initialize the feature type and its property types by setting default property values, and by localizing it.
            */
            LayerService.prototype.initFeatureType = function (ft) {
                var _this = this;
                if (ft.languages != null && this.currentLocale in ft.languages) {
                    var locale = ft.languages[this.currentLocale];
                    if (locale.name)
                        ft.name = locale.name;
                }
                if (ft.propertyTypeData == null || ft.propertyTypeData.length == 0)
                    return;
                ft.propertyTypeData.forEach(function (pt) {
                    _this.initPropertyType(pt);
                });
            };
            /**
            * Initialize the property type with default values, and, if applicable, localize it.
            */
            LayerService.prototype.initPropertyType = function (pt) {
                this.setDefaultPropertyType(pt);
                if (pt.languages != null)
                    this.localizePropertyType(pt);
            };
            /**
            * Set default PropertyType's properties:
            * type              = text
            * visibleInCallout  = true
            * canEdit           = false
            * isSearchable      = true
            */
            LayerService.prototype.setDefaultPropertyType = function (pt) {
                if (!pt.type)
                    pt.type = "text";
                if (typeof pt.title == 'undefined')
                    pt.title = pt.label;
                if (typeof pt.canEdit == 'undefined')
                    pt.canEdit = false;
                if (typeof pt.visibleInCallOut == 'undefined')
                    pt.visibleInCallOut = true;
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
             * Find a feature by layerId and FeatureId.
             * @layerId {string}
             * @featureIndex {number}
             */
            LayerService.prototype.findFeatureById = function (layerId, featureIndex) {
                for (var i = 0; i < this.project.features.length; i++) {
                    var feature = this.project.features[i];
                    if (featureIndex === feature.index && layerId === feature.layerId)
                        return feature;
                }
            };
            /**
             * Find the feature by name.
             */
            LayerService.prototype.findFeatureByName = function (name) {
                for (var i = 0; i < this.project.features.length; i++) {
                    var feature = this.project.features[i];
                    if (feature.hasOwnProperty("Name") && name === feature.properties["Name"])
                        return feature;
                }
            };
            /**
            * Find a loaded layer with a specific id.
            */
            LayerService.prototype.findLoadedLayer = function (id) {
                if (this.loadedLayers.containsKey(id))
                    return this.loadedLayers[id];
                return null;
            };
            /**
             * Find a layer with a specific id.
             */
            LayerService.prototype.findLayer = function (id) {
                if (this.loadedLayers.containsKey(id))
                    return this.loadedLayers[id];
                //return null;
                var r;
                this.project.groups.forEach(function (g) {
                    g.layers.forEach(function (l) {
                        if (l.id === id) {
                            r = l;
                        }
                    });
                });
                return r;
            };
            /**
             * Creates a GroupStyle based on a property and adds it to a group.
             * If the group already has a style which contains legends, those legends are copied into the newly created group.
             * Already existing groups (for the same visualAspect) are replaced by the new group
             */
            LayerService.prototype.setStyle = function (property, openStyleTab, customStyleInfo) {
                var _this = this;
                if (openStyleTab === void 0) { openStyleTab = true; }
                // parameter property is of the type ICallOutProperty. explicit declaration gives the red squigglies
                var f = property.feature;
                if (f != null) {
                    var ft = this.getFeatureType(f);
                    this.noStyles = false;
                    // for debugging: what do these properties contain?
                    var layer = f.layer;
                    var lg = layer.group;
                    var gs = new Services.GroupStyle(this.$translate);
                    // add the legends and colorscales from any existing group style
                    // if (lg.styles && (lg.styles.length > 0)) {
                    //     var gs0 = lg.styles[0];
                    //     gs0.title = property.key;
                    //     var legend: Legend;
                    //     var legendKey: string;
                    //     for (legendKey in gs0.legends) {
                    //         legend = gs0.legends[legendKey];
                    //         gs.legends[legendKey] = legend;
                    //         if ((legend.legendEntries) && (legend.legendEntries.length > 0)) {
                    //             var e1: LegendEntry = legend.legendEntries[0];
                    //             var e2: LegendEntry = legend.legendEntries[legend.legendEntries.length - 1];
                    //             gs.colorScales[legendKey] = [e1.color, e2.color]
                    //         } else {
                    //             gs.colorScales[legendKey] = ['red', 'red'];
                    //         }
                    //     }
                    // }
                    gs.id = csComp.Helpers.getGuid();
                    gs.title = property.key;
                    gs.meta = property.meta;
                    gs.visualAspect = (ft.style && ft.style.drawingMode && ft.style.drawingMode.toLowerCase() == 'polyline') ? 'strokeColor' : 'fillColor';
                    gs.canSelectColor = gs.visualAspect.toLowerCase().indexOf('color') > -1;
                    gs.property = property.property;
                    if (customStyleInfo) {
                        gs.info = customStyleInfo;
                        gs.fixedColorRange = true;
                    }
                    else {
                        if (gs.info == null)
                            gs.info = this.calculatePropertyInfo(layer.group, property.property);
                    }
                    gs.enabled = true;
                    gs.group = layer.group;
                    gs.meta = property.meta;
                    var ptd = this.propertyTypeData[property.property];
                    if (ptd && ptd.legend) {
                        gs.activeLegend = ptd.legend;
                        gs.legends[ptd.title] = ptd.legend;
                        gs.colorScales[ptd.title] = ['purple', 'purple'];
                    }
                    if (ft.style && ft.style.fillColor) {
                        gs.colors = ['white', 'orange'];
                    }
                    else {
                        gs.colors = ['red', 'white', 'blue'];
                    }
                    this.saveStyle(layer.group, gs);
                    this.project.features.forEach(function (fe) {
                        if (fe.layer.group == layer.group) {
                            _this.calculateFeatureStyle(fe);
                            _this.activeMapRenderer.updateFeature(fe);
                        }
                    });
                    if (openStyleTab)
                        $('#leftPanelTab a[href="#styles"]').tab('show'); // Select tab by name
                    return gs;
                }
                return null;
            };
            /**
             * checks if there are other styles that affect the same visual aspect, removes them (it)
             * and then adds the style to the group's styles
             */
            LayerService.prototype.saveStyle = function (group, style) {
                var oldStyles = group.styles.filter(function (s) { return s.visualAspect === style.visualAspect; });
                if (oldStyles.length > 0) {
                    var pos = group.styles.indexOf(oldStyles[0]);
                    group.styles.splice(pos, 1); // RS, 2015-04-04: why delete only one style? (what if oldStyles.length > 1)
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
            LayerService.prototype.setFilter = function (filter, group) {
                group.filters.push(filter);
                this.updateFilters();
                $('#leftPanelTab a[href="#filters"]').tab('show'); // Select tab by name
            };
            /**
            * enable a filter for a specific property
            */
            LayerService.prototype.setPropertyFilter = function (property) {
                var prop = property.property;
                var f = property.feature;
                if (f != null) {
                    var layer = f.layer;
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
                                        //case 'rank':
                                        //    gf.filterType  = 'bar';
                                        //    gf.value = property.value.split(',')[0];
                                        //    break;
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
                g.layers.forEach(function (l) { if (l.enabled)
                    ls.push(l.id); });
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
                layer.enabled = false;
                //if (layer.refreshTimer) layer.stop();
                // make sure the timers are disabled
                this.checkLayerTimer(layer);
                this.loadedLayers.remove(layer.id);
                // find layer source, and remove layer
                if (!layer.layerSource)
                    layer.layerSource = this.layerSources[layer.type.toLowerCase()];
                layer.layerSource.removeLayer(layer);
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
                    if (layer.mapLayer)
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
                if (g.layers.filter(function (l) { return (l.enabled); }).length === 0) {
                    g.filters.forEach(function (f) { if (f.dimension != null)
                        f.dimension.dispose(); });
                    g.filters = [];
                    g.styles = [];
                }
                this.rebuildFilters(g);
                layer.enabled = false;
                this.$messageBusService.publish('layer', 'deactivate', layer);
            };
            /***
             * Open solution file with references to available baselayers and projects
             * @params url: URL of the solution
             * @params layers: Optionally provide a semi-colon separated list of layer IDs that should be opened.
             * @params initialProject: Optionally provide a project name that should be loaded, if omitted the first project in the definition will be loaded
             */
            LayerService.prototype.openSolution = function (url, layers, initialProject) {
                var _this = this;
                //console.log('layers (openSolution): ' + JSON.stringify(layers));
                this.loadedLayers.clear();
                $.getJSON(url, function (solution) {
                    //var projects = data;
                    if (solution.maxBounds) {
                        _this.maxBounds = solution.maxBounds;
                        _this.$mapService.map.setMaxBounds(new L.LatLngBounds(solution.maxBounds.southWest, solution.maxBounds.northEast));
                    }
                    if (solution.viewBounds)
                        _this.$mapService.map.fitBounds(new L.LatLngBounds(solution.viewBounds.southWest, solution.viewBounds.northEast));
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
                        var p = solution.projects.filter(function (aProject) { return aProject.title === initialProject; })[0];
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
            * Clear all layers.
            */
            LayerService.prototype.clearLayers = function () {
                var _this = this;
                if (this.project == null || this.project.groups == null)
                    return;
                this.project.groups.forEach(function (group) {
                    group.layers.forEach(function (layer) {
                        if (layer.enabled) {
                            _this.removeLayer(layer);
                            layer.enabled = false;
                        }
                    });
                });
            };
            /**
             * Open project
             * @params url: URL of the project
             * @params layers: Optionally provide a semi-colon separated list of layer IDs that should be opened.
             */
            LayerService.prototype.openProject = function (url, layers) {
                var _this = this;
                this.projectUrl = url;
                //console.log('layers (openProject): ' + JSON.stringify(layers));
                var layerIds = [];
                if (layers) {
                    layers.split(';').forEach(function (layerId) { layerIds.push(layerId.toLowerCase()); });
                }
                //console.log('layerIds (openProject): ' + JSON.stringify(layerIds));
                this.clearLayers();
                this.featureTypes = {};
                $.getJSON(url, function (data) {
                    _this.project = new Services.Project().deserialize(data);
                    if (!_this.project.timeLine) {
                        _this.project.timeLine = new Services.DateRange();
                    }
                    else {
                        // Set range
                        _this.$messageBusService.publish('timeline', 'updateTimerange', _this.project.timeLine);
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
                            _this.initFeatureType(featureType);
                            _this.featureTypes[typeName] = featureType;
                        }
                    }
                    if (_this.project.propertyTypeData) {
                        for (var key in _this.project.propertyTypeData) {
                            var propertyType = _this.project.propertyTypeData[key];
                            _this.initPropertyType(propertyType);
                            if (!propertyType.label)
                                propertyType.label = key;
                            _this.propertyTypeData[key] = propertyType;
                        }
                    }
                    if (!_this.project.dashboards) {
                        _this.project.dashboards = [];
                        var d = new Services.Dashboard();
                        d.id = "map";
                        d.showMap = true;
                        d.showLeftmenu = true;
                        d.widgets = [];
                        _this.project.dashboards.push(d);
                    }
                    if (_this.project.datasources) {
                        _this.project.datasources.forEach(function (ds) {
                            if (ds.url) {
                                Services.DataSource.LoadData(ds, function () {
                                    console.log('datasource loaded');
                                    if (ds.type == "dynamic")
                                        _this.checkDataSourceSubscriptions(ds);
                                    for (var s in ds.sensors) {
                                        var ss = ds.sensors[s];
                                        ss.activeValue = ss.values[ss.values.length - 1];
                                    }
                                });
                            }
                        });
                    }
                    if (!_this.project.dataSets)
                        _this.project.dataSets = [];
                    _this.project.features = [];
                    _this.project.groups.forEach(function (group) {
                        if (group.id == null)
                            group.id = csComp.Helpers.getGuid();
                        group.ndx = crossfilter([]);
                        if ((group.styles) && (group.styles.length > 0)) {
                            var styleId = group.styles[0].id;
                        }
                        ;
                        if (group.styles == null)
                            group.styles = [];
                        if (group.filters == null)
                            group.filters = [];
                        group.markers = {};
                        if (group.languages != null && _this.currentLocale in group.languages) {
                            var locale = group.languages[_this.currentLocale];
                            if (locale.title)
                                group.title = locale.title;
                            if (locale.description)
                                group.description = locale.description;
                        }
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
                            if (layer.id == null)
                                layer.id = csComp.Helpers.getGuid();
                            layer.type = layer.type.toLowerCase();
                            if (layer.reference == null)
                                layer.reference = layer.id; //Helpers.getGuid();
                            if (layer.title == null)
                                layer.title = layer.id;
                            if (layer.languages != null && _this.currentLocale in layer.languages) {
                                var locale = layer.languages[_this.currentLocale];
                                if (locale.title)
                                    layer.title = locale.title;
                                if (locale.description)
                                    layer.description = locale.description;
                            }
                            layer.group = group;
                            if (layer.enabled || layerIds.indexOf(layer.reference.toLowerCase()) >= 0) {
                                layer.enabled = true;
                                _this.activeMapRenderer.addLayer(layer);
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
                    if (_this.project.connected) {
                        // check connection
                        _this.$messageBusService.initConnection("", "", function () {
                        });
                    }
                    _this.$messageBusService.publish('project', 'loaded', _this.project);
                    if (_this.project.dashboards && _this.project.dashboards.length > 0)
                        _this.$messageBusService.publish('dashboard-main', 'activated', _this.project.dashboards[Object.keys(_this.project.dashboards)[0]]);
                });
            };
            LayerService.prototype.checkDataSourceSubscriptions = function (ds) {
                var _this = this;
                for (var s in ds.sensors) {
                    this.$messageBusService.serverSubscribe(s, "sensor", function (sub, msg) {
                        if (msg.action == "sensor-update") {
                            var d = msg.data[0];
                            var ss = ds.sensors[d.sensor];
                            if (ss != null) {
                                ss.timestamps.push(d.date);
                                ss.values.push(d.value);
                                while (ss.timestamps.length > 30) {
                                    ss.timestamps.shift();
                                    ss.values.shift();
                                }
                                ss.activeValue = d.value;
                                _this.$messageBusService.publish("sensor-" + ds.id + "/" + d.sensor, "update", ss.activeValue);
                                _this.$rootScope.$apply();
                            }
                        }
                    });
                }
            };
            LayerService.prototype.checkSubscriptions = function () {
                var _this = this;
                this.project.datasources.forEach(function (ds) {
                    if (ds.url && ds.type == "dynamic") {
                        _this.checkDataSourceSubscriptions(ds);
                    }
                });
                //this.project.datasources.for
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
            LayerService.prototype.findSensorSet = function (key, callback) {
                var kk = key.split('/');
                if (kk.length == 2) {
                    var source = kk[0];
                    var sensorset = kk[1];
                    this.project.datasources.forEach(function (ds) {
                        if (ds.id === source) {
                            if (ds.sensors.hasOwnProperty(sensorset)) {
                                callback(ds.sensors[sensorset]);
                            }
                        }
                    });
                }
                return null;
            };
            //private zoom(data: any) {
            //    //var a = data;
            //}
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
                                if (!isNaN(v)) {
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
                if (isNaN(sum) || r.count == 0) {
                    r.sdMax = r.max;
                    r.sdMin = r.min;
                }
                else {
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
                }
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
                                case 'scatter':
                                    _this.addScatterFilter(group, filter);
                                    break;
                            }
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
            LayerService.prototype.addScatterFilter = function (group, filter) {
                var _this = this;
                filter.id = csComp.Helpers.getGuid();
                var info = this.calculatePropertyInfo(group, filter.property);
                var info2 = this.calculatePropertyInfo(group, filter.property2);
                var divid = 'filter_' + filter.id;
                //$("<h4>" + filter.title + "</h4><div id='" + divid + "'></div><a class='btn' id='remove" + filter.id + "'>remove</a>").appendTo("#filters_" + group.id);
                //$("<h4>" + filter.title + "</h4><div id='" + divid + "'></div><div style='display:none' id='fdrange_" + filter.id + "'>from <input type='text' style='width:75px' id='fsfrom_" + filter.id + "'> to <input type='text' style='width:75px' id='fsto_" + filter.id + "'></div><a class='btn' id='remove" + filter.id + "'>remove</a>").appendTo("#filterChart");
                $('<h4>' + filter.title + '</h4><div id=\'' + divid + '\'></div><div style=\'display:none\' id=\'fdrange_' + filter.id + '\'>from <span id=\'fsfrom_' + filter.id + '\'/> to <span id=\'fsto_' + filter.id + '\'/></div><a class=\'btn\' id=\'remove' + filter.id + '\'>remove</a>').appendTo('#filterChart');
                $('#remove' + filter.id).on('click', function () {
                    var pos = group.filters.indexOf(filter);
                    if (pos !== -1)
                        group.filters.splice(pos, 1);
                    filter.dimension.dispose();
                    _this.updateFilters();
                    _this.resetMapFilter(group);
                });
                var dcChart = dc.scatterPlot('#' + divid);
                var prop1 = group.ndx.dimension(function (d) {
                    if (!d.properties.hasOwnProperty(filter.property))
                        return null;
                    else {
                        if (d.properties[filter.property] != null) {
                            var a = parseInt(d.properties[filter.property]);
                            var b = parseInt(d.properties[filter.property2]);
                            if (a >= info.sdMin && a <= info.sdMax) {
                                return [a, b];
                            }
                            else {
                            }
                        }
                        return [0, 0];
                    }
                });
                filter.dimension = prop1;
                var dcGroup1 = prop1.group();
                //var scale =
                dcChart.width(275)
                    .height(190)
                    .dimension(prop1)
                    .group(dcGroup1)
                    .x(d3.scale.linear().domain([info.sdMin, info.sdMax]))
                    .yAxisLabel(filter.property2)
                    .xAxisLabel(filter.property)
                    .on('filtered', function (e) {
                    var fil = e.hasFilter();
                    dc.events.trigger(function () {
                        group.filterResult = prop1.top(Infinity);
                        _this.updateFilterGroupCount(group);
                    }, 0);
                    dc.events.trigger(function () {
                        _this.updateMapFilter(group);
                    }, 100);
                });
                dcChart.xUnits(function () { return 13; });
                //if (filter.meta != null && filter.meta.minValue != null) {
                //    dcChart.x(d3.scale.linear().domain([filter.meta.minValue, filter.meta.maxValue]));
                //} else {
                //    var propInfo = this.calculatePropertyInfo(group, filter.property);
                //    var dif = (propInfo.max - propInfo.min) / 100;
                //    dcChart.x(d3.scale.linear().domain([propInfo.min - dif, propInfo.max + dif]));
                //}
                dcChart.yAxis().ticks(15);
                dcChart.xAxis().ticks(15);
                //this.updateChartRange(dcChart, filter);
                //.x(d3.scale.quantile().domain(dcGroup.all().map(function (d) {
                //return d.key;
                //   }))
                //.range([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
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
                $('<div style=\'position:relative\'><h4>' + filter.title + '</h4><span class=\'dropdown\' dropdown><a href class=\'fa fa-circle-o makeNarrow dropdown-toggle\' dropdown-toggle > </a><ul class=\'dropdown-menu\' ><li><a>scatter plot</a></li><li><a>add to dashboard< /a></li ></ul></span><a class=\'btn fa fa-cog\' style=\'position:absolute;top:-5px;right:0\' id=\'remove' + filter.id + '\'></a><div id=\'' + divid + '\' style=\'float:none\'></div><div style=\'display:none\' id=\'fdrange_' + filter.id + '\'>from <span id=\'fsfrom_' + filter.id + '\'/> to <span id=\'fsto_' + filter.id + '\'/></div></div>').appendTo('#filterChart');
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
                dcChart.width(275)
                    .height(90)
                    .dimension(dcDim)
                    .group(dcGroup)
                    .transitionDuration(100)
                    .centerBar(true)
                    .gap(5) //d3.scale.quantize().domain([0, 10]).range(d3.range(1, 4));
                    .elasticY(true)
                    .x(d3.scale.linear().domain([info.sdMin, info.sdMax]).range([-1, nBins + 1]))
                    .filterPrinter(function (filters) {
                    var s = '';
                    if (filters.length > 0) {
                        var localFilter = filters[0];
                        filterFrom.text(localFilter[0].toFixed(2));
                        filterTo.text(localFilter[1].toFixed(2));
                        s += localFilter[0];
                    }
                    return s;
                })
                    .on('filtered', function (e) {
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
                dcChart.xUnits(function () { return 13; });
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
        /**
          * Register service
          */
        var moduleName = 'csComp';
        /**
          * Module
          */
        Services.myModule;
        try {
            Services.myModule = angular.module(moduleName);
        }
        catch (err) {
            // named module does not exist, so create one
            Services.myModule = angular.module(moduleName, []);
        }
        Services.myModule.service('layerService', csComp.Services.LayerService);
    })(Services = csComp.Services || (csComp.Services = {}));
})(csComp || (csComp = {}));

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
                'mapService' //,
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
            function MapService($localStorageService, $timeout, $messageBusService) {
                var _this = this;
                this.$localStorageService = $localStorageService;
                this.$timeout = $timeout;
                this.$messageBusService = $messageBusService;
                this.mapVisible = true;
                this.timelineVisible = true;
                this.rightMenuVisible = true;
                this.initExpertMode();
                this.baseLayers = {};
                this.initMap();
                $messageBusService.subscribe('timeline', function (title, data) {
                    switch (title) {
                        case 'isEnabled':
                            _this.timelineVisible = data;
                            break;
                    }
                });
                $messageBusService.subscribe('map', function (action, data) {
                    switch (action) {
                        case 'setextent':
                            console.log(data);
                            _this.map.fitBounds(new L.LatLngBounds(data.southWest, data.northEast));
                            break;
                        case 'setbaselayer':
                            var bl = _this.baseLayers[data];
                            _this.changeBaseLayer(bl);
                            break;
                    }
                });
                $messageBusService.subscribe('leftmenu', function (title, data) {
                    switch (title.toLowerCase()) {
                        case "toggle":
                            if ($('body').hasClass("leftpanel-collapsed")) {
                                $('body').removeClass("leftpanel-collapsed");
                            }
                            else {
                                $('body').addClass("leftpanel-collapsed");
                            }
                            break;
                        case "hide":
                            if (!$('body').hasClass("leftpanel-collapsed"))
                                $('body').addClass("leftpanel-collapsed");
                            break;
                        case "show":
                            if ($('body').hasClass("leftpanel-collapsed"))
                                $('body').removeClass("leftpanel-collapsed");
                            break;
                    }
                });
            }
            /**
          * The expert mode can either be set manually, e.g. using this directive, or by setting the expertMode property in the
          * project.json file. In neither are set, we assume that we are dealing with an expert, so all features should be enabled.
          *
          * Precedence:
          * - when a declaration is absent, assume Expert.
          * - when the mode is set in local storage, take that value.
          * - when the mode is set in the project.json file, take that value.
          */
            MapService.prototype.initExpertMode = function () {
                var _this = this;
                this.expertMode = this.$localStorageService.get(MapService.expertModeKey);
                if (!this.expertMode) {
                    this.expertMode = Services.Expertise.Expert; // Default behaviour
                    // When a project defines the expert mode, overrules default behaviour
                    this.$messageBusService.subscribe('project', function (title, project) {
                        switch (title) {
                            case 'loaded':
                                if (project != null && typeof project.expertMode !== 'undefined')
                                    _this.$messageBusService.publish('expertMode', 'newExpertise', project.expertMode);
                                break;
                        }
                    });
                }
                this.$messageBusService.subscribe('expertMode', function (title, expertMode) {
                    if (title !== 'newExpertise')
                        return;
                    _this.expertMode = expertMode;
                    _this.$localStorageService.set(csComp.Services.MapService.expertModeKey, expertMode); // You first need to set the key
                    switch (expertMode) {
                        case Services.Expertise.Intermediate:
                        case Services.Expertise.Expert:
                            _this.timelineVisible = true;
                            _this.$timeout(function () { _this.$messageBusService.publish('timeline', 'loadProjectTimeRange'); }, 100);
                            break;
                        default:
                            _this.timelineVisible = false;
                            break;
                    }
                });
            };
            Object.defineProperty(MapService.prototype, "isExpert", {
                get: function () {
                    return this.expertMode === Services.Expertise.Expert;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MapService.prototype, "isIntermediate", {
                get: function () {
                    return this.expertMode === Services.Expertise.Expert
                        || this.expertMode === Services.Expertise.Intermediate;
                },
                enumerable: true,
                configurable: true
            });
            MapService.prototype.initMap = function () {
                // alert('map service');
                // this.map = L.map("map", {
                //     zoomControl: false,
                //     attributionControl: true
                // });
            };
            MapService.prototype.changeBaseLayer = function (layerObj) {
                if (this.activeBaseLayer == layerObj)
                    return;
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
            MapService.prototype.zoomTo = function (feature, zoomLevel) {
                var _this = this;
                if (zoomLevel === void 0) { zoomLevel = 14; }
                var center;
                if (feature.geometry.type.toUpperCase() == 'POINT') {
                    center = new L.LatLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]);
                    this.map.setView(center, zoomLevel);
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
            MapService.prototype.getMap = function () { return this.map; };
            MapService.expertModeKey = 'expertMode';
            MapService.$inject = [
                'localStorageService',
                '$timeout',
                'messageBusService'
            ];
            return MapService;
        })();
        Services.MapService = MapService;
        /**
          * Register service
          */
        var moduleName = 'csComp';
        /**
          * Module
          */
        Services.myModule;
        try {
            Services.myModule = angular.module(moduleName);
        }
        catch (err) {
            // named module does not exist, so create one
            Services.myModule = angular.module(moduleName, []);
        }
        Services.myModule.service('mapService', csComp.Services.MapService);
    })(Services = csComp.Services || (csComp.Services = {}));
})(csComp || (csComp = {}));

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

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var csComp;
(function (csComp) {
    var Services;
    (function (Services) {
        'use strict';
        var GeoJsonSource = (function () {
            function GeoJsonSource(service) {
                this.service = service;
                this.title = "geojson";
                this.requiresLayer = false;
            }
            GeoJsonSource.prototype.refreshLayer = function (layer) {
                this.service.removeLayer(layer);
                this.service.addLayer(layer);
            };
            GeoJsonSource.prototype.addLayer = function (layer, callback) {
                this.baseAddLayer(layer, callback);
            };
            GeoJsonSource.prototype.fitMap = function (layer) {
                var b = csComp.Helpers.GeoExtensions.getBoundingBox(this.layer.data);
                this.service.$messageBusService.publish("map", "setextent", b);
            };
            GeoJsonSource.prototype.layerMenuOptions = function (layer) {
                var _this = this;
                return [
                    ["Fit map", (function ($itemScope) { return _this.fitMap(layer); })],
                    null,
                    ['Refresh', (function ($itemScope) { return _this.refreshLayer(layer); })]
                ];
            };
            GeoJsonSource.prototype.baseAddLayer = function (layer, callback) {
                var _this = this;
                this.layer = layer;
                async.series([
                    function (cb) {
                        layer.layerRenderer = "svg";
                        // Open a layer URL
                        layer.isLoading = true;
                        // get data
                        d3.json(layer.url, function (error, data) {
                            layer.count = 0;
                            layer.isLoading = false;
                            // check if loaded correctly
                            if (error)
                                _this.service.$messageBusService.notify('ERROR loading ' + layer.title, error);
                            else {
                                // if this is a topojson layer, convert to geojson first
                                if (layer.type.toLowerCase() === 'topojson') {
                                    data = csComp.Helpers.GeoExtensions.convertTopoToGeoJson(data);
                                }
                                // check if there are events definined
                                if (data.events && _this.service.timeline) {
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
                                    _this.service.timeline.draw(devents);
                                }
                                // add featuretypes to global featuretype list
                                if (data.featureTypes)
                                    for (var featureTypeName in data.featureTypes) {
                                        if (!data.featureTypes.hasOwnProperty(featureTypeName))
                                            continue;
                                        var featureType = data.featureTypes[featureTypeName];
                                        // give it a unique name
                                        featureTypeName = layer.id + '_' + featureTypeName;
                                        _this.service.featureTypes[featureTypeName] = featureType;
                                    }
                                if (data.timestamps)
                                    layer.timestamps = data.timestamps;
                                // store raw result in layer
                                layer.data = data;
                                if (layer.data.geometries && !layer.data.features) {
                                    layer.data.features = layer.data.geometries;
                                }
                                layer.data.features.forEach(function (f) {
                                    _this.service.initFeature(f, layer);
                                });
                            }
                            cb(null, null);
                        });
                    },
                    // Callback
                    function () {
                        callback(layer);
                    }
                ]);
            };
            GeoJsonSource.prototype.removeLayer = function (layer) {
                //alert('remove layer');
            };
            return GeoJsonSource;
        })();
        Services.GeoJsonSource = GeoJsonSource;
        var DynamicGeoJsonSource = (function (_super) {
            __extends(DynamicGeoJsonSource, _super);
            function DynamicGeoJsonSource(service) {
                _super.call(this, service);
                this.service = service;
                this.title = "dynamicgeojson";
                // subscribe
            }
            DynamicGeoJsonSource.prototype.updateFeatureByProperty = function (key, id, value) {
                var _this = this;
                try {
                    var features = this.layer.data.features;
                    if (features == null)
                        return;
                    var done = false;
                    features.some(function (f) {
                        if (f.properties != null && f.properties.hasOwnProperty(key) && f.properties[key] === id) {
                            f.properties = value.properties;
                            f.geometry = value.geometry;
                            _this.service.calculateFeatureStyle(f);
                            _this.service.activeMapRenderer.updateFeature(f);
                            done = true;
                            //  console.log('updating feature');
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                    if (!done) {
                        // console.log('adding feature');
                        features.push(value);
                        this.service.initFeature(value, this.layer);
                        var m = this.service.activeMapRenderer.addFeature(value);
                    }
                }
                catch (e) {
                    console.log('error');
                }
            };
            DynamicGeoJsonSource.prototype.deleteFeatureByProperty = function (key, id, value) {
                var _this = this;
                try {
                    var features = this.layer.data.features;
                    //features = features.splice(
                    if (features == null)
                        return;
                    var done = false;
                    features.some(function (f) {
                        if (f.properties != null && f.properties.hasOwnProperty(key) && f.properties[key] === id) {
                            f.properties = value.properties;
                            f.geometry = value.geometry;
                            _this.service.calculateFeatureStyle(f);
                            _this.service.activeMapRenderer.updateFeature(f);
                            done = true;
                            //  console.log('updating feature');
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                    if (!done) {
                        // console.log('adding feature');
                        features.push(value);
                        this.service.initFeature(value, this.layer);
                        var m = this.service.activeMapRenderer.createFeature(value);
                    }
                }
                catch (e) {
                    console.log('error');
                }
            };
            DynamicGeoJsonSource.prototype.initSubscriptions = function (layer) {
                var _this = this;
                layer.serverHandle = this.service.$messageBusService.serverSubscribe(layer.id, "layer", function (topic, msg) {
                    switch (msg.action) {
                        case "subscribed":
                            console.log('sucesfully subscribed');
                            break;
                        case "feature-update":
                            if (msg.data != null) {
                                try {
                                    msg.data.forEach(function (f) {
                                        _this.updateFeatureByProperty("id", f.properties["id"], f);
                                    });
                                }
                                catch (e) {
                                    console.warn('error updating feature');
                                }
                            }
                            break;
                        case "feature-delete":
                            if (msg.data != null) {
                                try {
                                    msg.data.forEach(function (f) {
                                        //this.service.removeFeature(f);
                                    });
                                }
                                catch (e) {
                                    console.warn('error deleting feature');
                                }
                            }
                            break;
                    }
                });
            };
            DynamicGeoJsonSource.prototype.addLayer = function (layer, callback) {
                this.baseAddLayer(layer, callback);
                this.initSubscriptions(layer);
                //this.connection = this.service.$messageBusService.getConnection("");
                //this.connection.events.add((status: string) => this.connectionEvent);
            };
            DynamicGeoJsonSource.prototype.connectionEvent = function (status) {
                console.log("connected event");
                switch (status) {
                    case "connected":
                        console.log('connected');
                        this.initSubscriptions(this.layer);
                        break;
                }
            };
            DynamicGeoJsonSource.prototype.removeLayer = function (layer) {
                this.service.$messageBusService.serverUnsubscribe(layer.serverHandle);
            };
            DynamicGeoJsonSource.prototype.layerMenuOptions = function (layer) {
                var _this = this;
                return [
                    ["Fit map", (function ($itemScope) { return _this.fitMap(layer); })],
                    null
                ];
            };
            return DynamicGeoJsonSource;
        })(GeoJsonSource);
        Services.DynamicGeoJsonSource = DynamicGeoJsonSource;
    })(Services = csComp.Services || (csComp.Services = {}));
})(csComp || (csComp = {}));

var csComp;
(function (csComp) {
    var Services;
    (function (Services) {
        'use strict';
        var HeatmapSource = (function () {
            function HeatmapSource(service) {
                this.service = service;
                this.title = "heatmap";
                this.requiresLayer = true;
                //service: LayerService;
                this.heatmapModel = new Heatmap.HeatmapModel("ProjectHeatmap");
            }
            //public init(service: LayerService) {
            //    this.service = service;
            //}
            HeatmapSource.prototype.refreshLayer = function (layer) {
                this.generateHeatmap(layer);
            };
            HeatmapSource.prototype.layerMenuOptions = function (layer) {
                return null;
            };
            HeatmapSource.prototype.addLayer = function (layer, callback) {
                var _this = this;
                async.series([
                    function (cb) {
                        layer.layerRenderer = "heatmap";
                        layer.isLoading = true;
                        // Calculate heatmap
                        _this.generateHeatmap(layer);
                        layer.enabled = true;
                        _this.enableProjectLayer(layer);
                        layer.isLoading = false;
                        cb(null, null);
                    },
                    // Callback
                    function () {
                        callback(layer);
                    }
                ]);
            };
            HeatmapSource.prototype.removeLayer = function (layer) {
                delete (this.heatmapModel);
                this.heatmapModel = new Heatmap.HeatmapModel("ProjectHeatmap");
                layer.enabled = false;
                layer.data = JSON;
                this.enableProjectLayer(layer); // Set project layer to disabled
                //this.updateLayer(layer);
            };
            /* Enables the project layer if the 'layer' parameter has the same id as a project layer */
            HeatmapSource.prototype.enableProjectLayer = function (layer) {
                if (layer.id) {
                    this.service.project.groups.forEach(function (group) {
                        group.layers.forEach(function (l) {
                            if (l.id == layer.id) {
                                l.enabled = layer.enabled;
                                if (l.enabled == false) {
                                    layer.data = JSON;
                                }
                            }
                        });
                    });
                }
            };
            HeatmapSource.prototype.getRequiredLayers = function (layer) {
                var _this = this;
                var requiredLayers = [];
                if (layer.heatmapSettings && layer.heatmapSettings.referenceList) {
                    layer.heatmapSettings.referenceList.forEach(function (ref) {
                        _this.service.project.groups.forEach(function (group) {
                            group.layers.forEach(function (l) {
                                if (l.reference == ref) {
                                    requiredLayers.push(l);
                                }
                            });
                        });
                    });
                }
                return requiredLayers;
            };
            HeatmapSource.prototype.getFeatureTypes = function (layer) {
                var featureTypes = [];
                layer.heatmapItems.forEach(function (hi) {
                    featureTypes.push(hi.featureType.name);
                });
                return featureTypes;
            };
            HeatmapSource.prototype.generateHeatmap = function (layer) {
                var _this = this;
                console.log('Generating heatmap');
                var geoLayer = L.geoJson([]);
                this.heatmapModel.deserialize(layer);
                this.heatmapModel.id = layer.id;
                var currentZoom = this.service.$mapService.getMap().getZoom();
                if (currentZoom < this.heatmapModel.heatmapSettings.minZoom || currentZoom > this.heatmapModel.heatmapSettings.maxZoom) {
                    return;
                }
                else {
                    this.heatmapModel.updateWeights();
                    this.heatmapModel.calculate(this.service, this.service.$mapService, geoLayer);
                    var time = new Date().getTime();
                    layer.data = geoLayer.toGeoJSON();
                }
                if ((layer.data) && (layer.data).features) {
                    (layer.data).features.forEach(function (f) {
                        _this.service.initFeature(f, layer);
                    });
                    // Set default style for the heatmap:
                    if ((layer.data).features[0]) {
                        var calloutProp = new FeatureProps.CallOutProperty("intensity", "0", "intensity", true, true, (layer.data).features[0], false, false);
                        var propinfo = new Services.PropertyInfo();
                        // Tweak the group style info to keep constant min/max color values on panning and zooming.
                        propinfo.count = (layer.data).features.length;
                        propinfo.max = 1;
                        propinfo.min = -1;
                        propinfo.sdMax = propinfo.max;
                        propinfo.sdMin = propinfo.min;
                        propinfo.mean = 0;
                        propinfo.varience = 0.67;
                        propinfo.sd = Math.sqrt(propinfo.varience);
                        this.service.setStyle(calloutProp, false, propinfo); // Set the style
                    }
                }
                var time2 = new Date().getTime();
                console.log('Init and style features in ' + (time2 - time).toFixed(1) + ' ms');
            };
            return HeatmapSource;
        })();
        Services.HeatmapSource = HeatmapSource;
    })(Services = csComp.Services || (csComp.Services = {}));
})(csComp || (csComp = {}));

var csComp;
(function (csComp) {
    var Services;
    (function (Services) {
        'use strict';
        var TileLayerSource = (function () {
            function TileLayerSource(service) {
                this.service = service;
                this.title = "tilelayer";
                //service : LayerService;
                this.requiresLayer = false;
            }
            TileLayerSource.prototype.refreshLayer = function (layer) {
                this.service.removeLayer(layer);
                this.service.addLayer(layer);
            };
            TileLayerSource.prototype.layerMenuOptions = function (layer) {
                var _this = this;
                return [
                    ['Refresh', (function ($itemScope) { return _this.refreshLayer(layer); })]
                ];
            };
            TileLayerSource.prototype.addLayer = function (layer, callback) {
                layer.layerRenderer = "tilelayer";
                callback(layer);
                //this.$rootScope.$apply();
            };
            TileLayerSource.prototype.removeLayer = function (layer) {
            };
            return TileLayerSource;
        })();
        Services.TileLayerSource = TileLayerSource;
    })(Services = csComp.Services || (csComp.Services = {}));
})(csComp || (csComp = {}));

var csComp;
(function (csComp) {
    var Services;
    (function (Services) {
        'use strict';
        var WmsSource = (function () {
            //service : LayerService;
            function WmsSource(service) {
                this.service = service;
                this.title = "wms";
                this.requiresLayer = false;
            }
            WmsSource.prototype.refreshLayer = function (layer) {
            };
            WmsSource.prototype.layerMenuOptions = function (layer) {
                return null;
            };
            WmsSource.prototype.addLayer = function (layer, callback) {
                var wms = L.tileLayer.wms(layer.url, {
                    layers: layer.wmsLayers,
                    opacity: layer.opacity / 100,
                    format: 'image/png',
                    transparent: true,
                    attribution: layer.description
                });
                layer.layerRenderer = "wms";
                callback(layer);
                //this.$rootScope.$apply();
            };
            WmsSource.prototype.removeLayer = function (layer) {
            };
            return WmsSource;
        })();
        Services.WmsSource = WmsSource;
    })(Services = csComp.Services || (csComp.Services = {}));
})(csComp || (csComp = {}));

var csComp;
(function (csComp) {
    var Services;
    (function (Services) {
        var CesiumRenderer = (function () {
            function CesiumRenderer() {
                this.title = "cesium";
                this.features = {};
            }
            CesiumRenderer.prototype.init = function (service) {
                this.service = service;
            };
            CesiumRenderer.prototype.enable = function () {
                this.viewer = new Cesium.Viewer('map');
                this.camera = this.viewer.camera;
                this.camera.setView({
                    position: Cesium.Cartesian3.fromDegrees(5, 52, 1000000)
                });
                //console.log('project:');
                //console.log(this.service.project.features);
                for (var i = 0; i < this.service.project.features.length; ++i)
                    this.addFeature(this.service.project.features[i]);
                $(".cesium-viewer-toolbar").hide();
            };
            CesiumRenderer.prototype.disable = function () {
                this.viewer.destroy();
                //$("#map").empty();
            };
            CesiumRenderer.prototype.addLayer = function (layer) {
                //alert('addLayer called');
                var _this = this;
                if (layer.type == "GeoJson") {
                    var object = layer.data;
                    if (object.type == null)
                        object.type = "FeatureCollection";
                    var geoJSONPromise = Cesium.GeoJsonDataSource.load(object);
                    Cesium.when(geoJSONPromise, function (dataSource) {
                        layer.cesiumDatasource = dataSource;
                    });
                    this.viewer.dataSources.add(geoJSONPromise);
                }
                if (layer.type == "dynamicgeojson") {
                    var object = layer.data.features;
                    //fix for some datasources with incomplete json
                    if (object.type == null)
                        object.type = "FeatureCollection";
                    //console.log('adding layer');
                    //console.log(object);
                    object.forEach(function (f) {
                        _this.addFeature(f);
                    });
                }
                if (layer.type == "wms") {
                }
            };
            CesiumRenderer.prototype.removeLayer = function (layer) {
                alert('removelayer called');
                if (layer.type == "GeoJson") {
                    this.viewer.dataSources.remove(layer.cesiumDatasource);
                }
                if (layer.type == "wms") {
                }
            };
            CesiumRenderer.prototype.updateMapFilter = function (group) { };
            CesiumRenderer.prototype.addGroup = function (group) { };
            CesiumRenderer.prototype.removeGroup = function (group) { };
            CesiumRenderer.prototype.createFeature = function (feature) { };
            CesiumRenderer.prototype.removeFeature = function (feature) {
                if (this.features.hasOwnProperty(feature.id)) {
                    this.viewer.dataSources.remove(this.features[feature.id]);
                    delete this.features[feature.id];
                }
            };
            CesiumRenderer.prototype.updateFeature = function (feature) {
                this.removeFeature(feature);
                this.addFeature(feature);
            };
            CesiumRenderer.prototype.addFeature = function (feature) {
                //alert('addFeature called');
                //console.log('added feature:');
                //console.log(feature);
                //var entity = new Cesium.Entity({ id: feature.index, name: feature.featureTypeName, position: new Cesium.Cartesian3.fromDegrees(feature.geometry.coordinates[0], feature.geometry.coordinates[1], feature.properties.Altitude) });
                //console.log('adding feature');
                //console.log(feature);
                var _this = this;
                //feature.coordinates = feature.coordinates
                //var entity = this.createEntity(feature);
                var dataSourcePromise = Cesium.GeoJsonDataSource.load(feature);
                Cesium.when(dataSourcePromise, function (dataSource) {
                    //dataSource.entities.entities[0].billboard = null;
                    //dataSource.entities.entities[0].model = new Cesium.ModelGraphics({ uri: '/models/plane.gltf', minimumPixelSize: 100 });
                    _this.features[feature.id] = dataSource;
                    _this.viewer.dataSources.add(dataSource);
                });
            };
            return CesiumRenderer;
        })();
        Services.CesiumRenderer = CesiumRenderer;
    })(Services = csComp.Services || (csComp.Services = {}));
})(csComp || (csComp = {}));

var csComp;
(function (csComp) {
    var Services;
    (function (Services) {
        var LeafletRenderer = (function () {
            function LeafletRenderer() {
                this.title = "leaflet";
            }
            LeafletRenderer.prototype.init = function (service) {
                this.service = service;
                this.$messageBusService = service.$messageBusService;
            };
            LeafletRenderer.prototype.enable = function () {
                this.service.$mapService.map = L.map("map", {
                    //var tl  = L.map("mapleft", {
                    zoomControl: false,
                    attributionControl: true
                });
            };
            LeafletRenderer.prototype.disable = function () {
                this.service.$mapService.map.remove();
                this.service.$mapService.map = null;
                $("#map").empty();
            };
            LeafletRenderer.prototype.addGroup = function (group) {
                // for clustering use a cluster layer
                if (group.clustering) {
                    group.cluster = new L.MarkerClusterGroup({
                        maxClusterRadius: group.maxClusterRadius || 80,
                        disableClusteringAtZoom: group.clusterLevel || 0
                    });
                    this.service.map.map.addLayer(group.cluster);
                }
                else {
                    group.vectors = new L.LayerGroup();
                    this.service.map.map.addLayer(group.vectors);
                }
            };
            LeafletRenderer.prototype.removeLayer = function (layer) {
                switch (layer.layerRenderer) {
                    case "svg":
                        var g = layer.group;
                        //m = layer.group.vectors;
                        if (g.clustering) {
                            var m = g.cluster;
                            this.service.project.features.forEach(function (feature) {
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
                            this.service.map.map.removeLayer(layer.mapLayer);
                        }
                        break;
                    case "heatmap":
                        var g = layer.group;
                        //m = layer.group.vectors;
                        if (g.clustering) {
                            var m = g.cluster;
                            this.service.project.features.forEach(function (feature) {
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
                            this.service.map.map.removeLayer(layer.mapLayer);
                        }
                        break;
                    case "wms":
                        break;
                }
            };
            LeafletRenderer.prototype.getLeafletStyle = function (style) {
                var s = {
                    fillColor: style.fillColor,
                    weight: style.strokeWidth,
                    opacity: style.opacity,
                    color: style.strokeColor,
                    fillOpacity: style.opacity
                };
                return s;
            };
            LeafletRenderer.prototype.addLayer = function (layer) {
                var _this = this;
                switch (layer.layerRenderer) {
                    case "tilelayer":
                        // check if we need to create a unique url to force a refresh
                        var u = layer.url;
                        if (layer.disableCache) {
                            layer.cacheKey = new Date().getTime().toString();
                            u += "&cache=" + layer.cacheKey;
                        }
                        var tileLayer = L.tileLayer(u, { attribution: layer.description });
                        layer.mapLayer = new L.LayerGroup();
                        tileLayer.setOpacity(layer.opacity / 100);
                        this.service.map.map.addLayer(layer.mapLayer);
                        layer.mapLayer.addLayer(tileLayer);
                        tileLayer.on('loading', function (event) {
                            layer.isLoading = true;
                            _this.service.$rootScope.$apply();
                            if (_this.service.$rootScope.$$phase != '$apply' && _this.service.$rootScope.$$phase != '$digest') {
                                _this.service.$rootScope.$apply();
                            }
                        });
                        tileLayer.on('load', function (event) {
                            layer.isLoading = false;
                            if (_this.service.$rootScope.$$phase != '$apply' && _this.service.$rootScope.$$phase != '$digest') {
                                _this.service.$rootScope.$apply();
                            }
                        });
                        layer.isLoading = true;
                        //this.$rootScope.$apply();
                        break;
                    case "wms":
                        var wms = L.tileLayer.wms(layer.url, {
                            layers: layer.wmsLayers,
                            opacity: layer.opacity / 100,
                            format: 'image/png',
                            transparent: true,
                            attribution: layer.description
                        });
                        layer.mapLayer = new L.LayerGroup();
                        this.service.map.map.addLayer(layer.mapLayer);
                        layer.mapLayer.addLayer(wms);
                        wms.on('loading', function (event) {
                            layer.isLoading = true;
                            _this.service.$rootScope.$apply();
                            if (_this.service.$rootScope.$$phase != '$apply' && _this.service.$rootScope.$$phase != '$digest') {
                                _this.service.$rootScope.$apply();
                            }
                        });
                        wms.on('load', function (event) {
                            layer.isLoading = false;
                            if (_this.service.$rootScope.$$phase != '$apply' && _this.service.$rootScope.$$phase != '$digest') {
                                _this.service.$rootScope.$apply();
                            }
                        });
                        layer.isLoading = true;
                        break;
                    case "svg":
                        // create leaflet layers
                        layer.mapLayer = new L.LayerGroup();
                        this.service.map.map.addLayer(layer.mapLayer);
                        layer.data.features.forEach(function (f) {
                            layer.group.markers[f.id] = _this.addFeature(f);
                        });
                        //var v = L.geoJson(layer.data, {
                        //    style: (f: IFeature, m) => {
                        //        layer.group.markers[f.id] = m;
                        //        return this.getLeafletStyle(f.effectiveStyle);
                        //    },
                        //    pointToLayer : (feature, latlng) =>
                        //});
                        //this.service.project.features.forEach((f : IFeature) => {
                        //    if (f.layerId !== layer.id) return;
                        //    var ft = this.service.getFeatureType(f);
                        //    f.properties['Name'] = f.properties[ft.style.nameLabel];
                        //});
                        //layer.mapLayer.addLayer(v);
                        break;
                    case "heatmap":
                        var time = new Date().getTime();
                        // create leaflet layers
                        layer.mapLayer = new L.LayerGroup();
                        this.service.map.map.addLayer(layer.mapLayer);
                        layer.data.features.forEach(function (f) {
                            layer.group.markers[f.id] = _this.addFeature(f);
                        });
                        break;
                    case "heatmap":
                        var time = new Date().getTime();
                        // create leaflet layers
                        if (layer.group.clustering) {
                            var markers = L.geoJson(layer.data, {
                                pointToLayer: function (feature, latlng) { return _this.createFeature(feature); },
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
                            this.service.map.map.addLayer(layer.mapLayer);
                            var v = L.geoJson(layer.data, {
                                onEachFeature: function (feature, lay) {
                                    //We do not need to init the feature here: already done in style.
                                    //this.initFeature(feature, layer);
                                    layer.group.markers[feature.id] = lay;
                                    lay.on({
                                        mouseover: function (a) { return _this.showFeatureTooltip(a, layer.group); },
                                        mouseout: function (s) { return _this.hideFeatureTooltip(s); },
                                        mousemove: function (d) { return _this.updateFeatureTooltip(d); },
                                        click: function () { return _this.service.selectFeature(feature); }
                                    });
                                },
                                style: function (f, m) {
                                    layer.group.markers[f.id] = m;
                                    return f.effectiveStyle;
                                },
                                pointToLayer: function (feature, latlng) { return _this.createFeature(feature); }
                            });
                            this.service.project.features.forEach(function (f) {
                                if (f.layerId !== layer.id)
                                    return;
                                var ft = _this.service.getFeatureType(f);
                                f.properties['Name'] = f.properties[ft.style.nameLabel];
                            });
                            layer.mapLayer.addLayer(v);
                            var time2 = new Date().getTime();
                            console.log('Applied style in ' + (time2 - time).toFixed(1) + ' ms');
                        }
                        break;
                }
            };
            /***
             * Update map markers in cluster after changing filter
             */
            LeafletRenderer.prototype.updateMapFilter = function (group) {
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
            LeafletRenderer.prototype.removeGroup = function (group) { };
            LeafletRenderer.prototype.removeFeature = function (feature) {
                var marker = feature.layer.group.markers[feature.id];
                if (marker != null) {
                    feature.layer.mapLayer.removeLayer(marker);
                    delete feature.layer.group.markers[feature.id];
                }
            };
            LeafletRenderer.prototype.updateFeature = function (feature) {
                if (feature.layer.group == null)
                    return;
                var marker = feature.layer.group.markers[feature.id];
                if (marker == null)
                    return;
                if (feature.geometry.type === 'Point') {
                    marker.setIcon(this.getPointIcon(feature));
                    marker.setLatLng(new L.LatLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]));
                }
                else {
                    marker.setStyle(this.getLeafletStyle(feature.effectiveStyle));
                }
                else {
                    l.mapLayer.addLayer(m);
                }
                return m;
            };
            LeafletRenderer.prototype.addFeature = function (feature) {
                var _this = this;
                var m = this.createFeature(feature);
                var l = feature.layer;
                l.group.markers[feature.id] = m;
                m.on({
                    mouseover: function (a) { return _this.showFeatureTooltip(a, l.group); },
                    mouseout: function (s) { return _this.hideFeatureTooltip(s); },
                    mousemove: function (d) { return _this.updateFeatureTooltip(d); },
                    click: function () { return _this.service.selectFeature(feature); }
                });
                m.feature = feature;
                if (l.group.clustering) {
                    l.group.cluster.addLayer(m);
                }
                else {
                    l.mapLayer.addLayer(m);
                }
                return m;
            };
            /**
             * add a feature
             */
            LeafletRenderer.prototype.createFeature = function (feature) {
                //this.service.initFeature(feature,layer);
                //var style = type.style;
                var marker;
                switch (feature.geometry.type) {
                    case 'Point':
                        var icon = this.getPointIcon(feature);
                        marker = new L.Marker(new L.LatLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]), { icon: icon });
                        break;
                    default:
                        marker = L.GeoJSON.geometryToLayer(feature);
                        marker.setStyle(this.getLeafletStyle(feature.effectiveStyle));
                        //marker = L.multiPolygon(latlng, polyoptions);
                        break;
                }
                marker.feature = feature;
                feature.layer.group.markers[feature.id] = marker;
                return marker;
            };
            /**
             * create icon based of feature style
             */
            LeafletRenderer.prototype.getPointIcon = function (feature) {
                var icon;
                if (feature.htmlStyle != null) {
                    icon = new L.DivIcon({
                        className: '',
                        iconSize: new L.Point(feature.effectiveStyle.iconWidth, feature.effectiveStyle.iconHeight),
                        html: feature.htmlStyle
                    });
                }
                else {
                    var html = '<div ';
                    var props = {};
                    var ft = this.service.getFeatureType(feature);
                    //if (feature.poiTypeName != null) html += "class='style" + feature.poiTypeName + "'";
                    var iconUri = ft.style.iconUri;
                    //if (ft.style.fillColor == null && iconUri == null) ft.style.fillColor = 'lightgray';
                    // TODO refactor to object
                    props['background'] = feature.effectiveStyle.fillColor;
                    props['width'] = feature.effectiveStyle.iconWidth + 'px';
                    props['height'] = feature.effectiveStyle.iconHeight + 'px';
                    props['border-radius'] = feature.effectiveStyle.cornerRadius + '%';
                    props['border-style'] = 'solid';
                    props['border-color'] = feature.effectiveStyle.strokeColor;
                    props['border-width'] = feature.effectiveStyle.strokeWidth;
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
                    if (feature.effectiveStyle.innerTextProperty != null && feature.properties.hasOwnProperty(feature.effectiveStyle.innerTextProperty)) {
                        html += "<span style='font-size:12px;vertical-align:-webkit-baseline-middle'>" + feature.properties[feature.effectiveStyle.innerTextProperty] + "</span>";
                    }
                    else if (iconUri != null) {
                        // Must the iconUri be formatted?
                        if (iconUri != null && iconUri.indexOf('{') >= 0)
                            iconUri = csComp.Helpers.convertStringFormat(feature, iconUri);
                        html += '<img src=' + iconUri + ' style=\'width:' + (feature.effectiveStyle.iconWidth - 2) + 'px;height:' + (feature.effectiveStyle.iconHeight - 2) + 'px';
                        if (feature.effectiveStyle.rotate && feature.effectiveStyle.rotate > 0)
                            html += ';transform:rotate(' + feature.effectiveStyle.rotate + 'deg)';
                        html += '\' />';
                    }
                    html += '</div>';
                    icon = new L.DivIcon({
                        className: '',
                        iconSize: new L.Point(feature.effectiveStyle.iconWidth, feature.effectiveStyle.iconHeight),
                        html: html
                    });
                }
                return icon;
            };
            /***
             * Show tooltip with name, styles & filters.
             */
            LeafletRenderer.prototype.showFeatureTooltip = function (e, group) {
                var layer = e.target;
                var feature = layer.feature;
                // add title
                var title = layer.feature.properties.Name;
                var rowLength = (title) ? title.length : 1;
                var content = '<td colspan=\'3\'>' + title + '</td></tr>';
                // add filter values
                if (group.filters != null && group.filters.length > 0) {
                    group.filters.forEach(function (f) {
                        if (!feature.properties.hasOwnProperty(f.property))
                            return;
                        var value = feature.properties[f.property];
                        if (value) {
                            var valueLength = value.toString().length;
                            if (f.meta != null) {
                                value = csComp.Helpers.convertPropertyInfo(f.meta, value);
                                if (f.meta.type !== 'bbcode')
                                    valueLength = value.toString().length;
                            }
                            rowLength = Math.max(rowLength, valueLength + f.title.length);
                            content += '<tr><td><div class=\'smallFilterIcon\'></td><td>' + f.title + '</td><td>' + value + '</td></tr>';
                        }
                    });
                }
                // add style values, only in case they haven't been added already as filter
                if (group.styles != null && group.styles.length > 0) {
                    group.styles.forEach(function (s) {
                        if (group.filters != null && group.filters.filter(function (f) { return f.property === s.property; }).length === 0 && feature.properties.hasOwnProperty(s.property)) {
                            var value = feature.properties[s.property];
                            var valueLength = value.toString().length;
                            if (s.meta != null) {
                                value = csComp.Helpers.convertPropertyInfo(s.meta, value);
                                if (s.meta.type !== 'bbcode')
                                    valueLength = value.toString().length;
                            }
                            var tl = s.title ? s.title.length : 10;
                            rowLength = Math.max(rowLength, valueLength + tl);
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
                }).setLatLng(e.latlng).setContent(content).openOn(this.service.map.map);
            };
            LeafletRenderer.prototype.hideFeatureTooltip = function (e) {
                if (this.popup && this.service.map.map) {
                    this.service.map.map.closePopup(this.popup);
                    //this.map.map.closePopup(this.popup);
                    this.popup = null;
                }
            };
            LeafletRenderer.prototype.updateFeatureTooltip = function (e) {
                if (this.popup != null && e.latlng != null)
                    this.popup.setLatLng(e.latlng);
            };
            return LeafletRenderer;
        })();
        Services.LeafletRenderer = LeafletRenderer;
    })(Services = csComp.Services || (csComp.Services = {}));
})(csComp || (csComp = {}));
