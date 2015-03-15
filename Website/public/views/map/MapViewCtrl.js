var MapView;
(function (MapView) {
    var Expertise = csComp.Services.Expertise;
    var MapViewCtrl = (function () {
        // dependencies are injected via AngularJS $injector
        // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
        function MapViewCtrl($scope, $mapService, $messageBus) {
            var _this = this;
            this.$scope = $scope;
            this.$mapService = $mapService;
            this.$messageBus = $messageBus;
            // 'vm' stands for 'view model'. We're adding a reference to the controller to the scope
            // for its methods to be accessible from view / HTML
            $scope.vm = this;
            this.expertMode = $mapService.expertMode;
            $messageBus.subscribe('expertMode', function (title, expertMode) {
                switch (title) {
                    case 'newExpertise':
                        _this.expertMode = expertMode;
                        break;
                }
            });
        }
        Object.defineProperty(MapViewCtrl.prototype, "isExpert", {
            get: function () {
                return this.expertMode === Expertise.Expert;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapViewCtrl.prototype, "isIntermediate", {
            get: function () {
                return this.expertMode === Expertise.Expert || this.expertMode === Expertise.Intermediate;
            },
            enumerable: true,
            configurable: true
        });
        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
        MapViewCtrl.$inject = [
            '$scope',
            'mapService',
            'messageBusService'
        ];
        return MapViewCtrl;
    })();
    MapView.MapViewCtrl = MapViewCtrl;
})(MapView || (MapView = {}));
//# sourceMappingURL=MapViewCtrl.js.map