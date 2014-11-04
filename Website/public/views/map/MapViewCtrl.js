var MapView;
(function (MapView) {
    var MapViewCtrl = (function () {
        // dependencies are injected via AngularJS $injector
        // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
        function MapViewCtrl($scope, $mapService) {
            this.$scope = $scope;
            this.$mapService = $mapService;
            // 'vm' stands for 'view model'. We're adding a reference to the controller to the scope
            // for its methods to be accessible from view / HTML
            $scope.vm = this;
        }
        MapViewCtrl.$inject = [
            '$scope',
            'mapService'
        ];
        return MapViewCtrl;
    })();
    MapView.MapViewCtrl = MapViewCtrl;
})(MapView || (MapView = {}));
//# sourceMappingURL=MapViewCtrl.js.map
