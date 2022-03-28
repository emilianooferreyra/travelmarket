angular.module('serviceController', [])

function ServiceController($scope, $rootScope) {
    if (!!$rootScope.activeService) {
        $scope.activeService = $rootScope.activeService
    } else {
        $scope.activeService = 'vuelos'
    }
    $scope.changeService = function(service) {
        $scope.activeService = service;
    }
};
