module MapView {
    import Expertise = csComp.Services.Expertise;

    export interface IMapViewScope extends ng.IScope {
        map: L.Map;
        vm : MapViewCtrl;
    }

    export class MapViewCtrl {
        private expertMode: Expertise;

        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
        public static $inject = [
            '$scope',
            'mapService',
            'messageBusService'
        ];

        // dependencies are injected via AngularJS $injector
        // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
        constructor(
            private $scope              : IMapViewScope,
            private $mapService         : csComp.Services.MapService,
            private $messageBus         : csComp.Services.MessageBusService
            ) {
            // 'vm' stands for 'view model'. We're adding a reference to the controller to the scope
            // for its methods to be accessible from view / HTML
            $scope.vm = this;
            this.expertMode = $mapService.expertMode;

            $messageBus.subscribe('expertMode', (title: string, expertMode: Expertise) => {
                switch (title) {
                    case 'newExpertise':
                        this.expertMode = expertMode;
                        break;
                }
            });
        }

        get isExpert(): boolean {
            return this.expertMode === Expertise.Expert;
        }

        get isIntermediate(): boolean {
            return this.expertMode === Expertise.Expert
                || this.expertMode === Expertise.Intermediate;
        }
    }

}