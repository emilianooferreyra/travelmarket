angular
        .module('packageController', ['store-factories'])
        .controller('PackageFrontController', PackageFrontController);

function PackageFrontController ($scope, rest, $location) {
    $scope.module = 'packages';
    $scope.filter = {};

    var loadModel = function () {
        rest().get({
            type: $scope.module,
            params: 'starred=true&orderBy=createdAt&sort=-1&limit=6&populate=front'
        }, function (resp) {
            $scope.packages = resp;
        }, function (error) {
            $scope.packages = [];
        });
    };

    loadModel();

    $scope.search = function() {
        var data = {
            destination: $scope.filter.destination,
            query: {}
        };
        if(!!$scope.filter.date) {
            data.query.when = $scope.filter.date.toISOString().slice(0, 10);
        }
        if(!!$scope.filter.days) {
            data.query.days = $scope.filter.days;
        }
        if(!!$scope.filter.passengers) {
            data.query.passengers = $scope.filter.passengers;
        }
//        console.log(data);
//        rest().search({
//            type: $scope.module
//        }, data, function(resp) {
//            console.log(resp);
//        }, function(error) {
//        });
        $location.path('paquetes').search({
            'destino': data.destination,
            'fecha': data.query.when,
            'dias': data.query.days,
            'pasajeros': data.query.passengers
        });


    };
    $scope.destinationSelected = false;
    $scope.myConfig = {
        //create: true,
        openOnFocus: false,
        valueField: 'id',
        labelField: 'name',
        placeholder: 'Destino',
        maxItems: 1,
        searchField: ['name'],
        onItemAdd: function (value, $item) {
            $scope.destinationSelected = false;
            $scope.days = [];
            $scope.dates = [];
            $scope.passengers = [];
            rest().search({
                type: $scope.module
            }, {destination: value}, function(resp) {
                if(!!resp) {
                    $scope.destinationSelected = true;
                    angular.forEach(resp, function(element) {
                        if ($scope.days.indexOf(element.days) === -1) {
                            $scope.days.push(element.days);
                        }
                        if ($scope.dates.indexOf(element.when) === -1) {
                            $scope.dates.push(element.when);
                        }
                        if ($scope.passengers.indexOf(element.passengers) === -1) {
                            $scope.passengers.push(element.passengers);
                        }
                    });
                }
            });
        }
    };
    $scope.myOptions = [];
    rest().destinations({
        type: $scope.module
    }, function(resp) {
        angular.forEach(resp, function(element) {
            $scope.myOptions.push({
                id: element,
                name: element
            });
        });
    });
}

function PackageListController($scope, rest, LocationSearchService) {
    $scope.module = 'packages';

    LocationSearchService.init();

    var paramsSearch = LocationSearchService.searchParams();
    console.log(paramsSearch);

    var loadModel = function () {
        rest().get({
            type: $scope.module,
            params: 'orderBy=createdAt&sort=-1&populate=front'
        }, function (resp) {
            $scope.packages = resp;
        }, function (error) {
            $scope.packages = [];
        });
    };

    var loadModelSearch = function() {
        console.log(dataSearch);
        rest().search({
            type: $scope.module
        }, dataSearch, function(resp) {
            $scope.packages = resp;
            console.log(resp);
        }, function(error) {
            console.log(error);
        });
    };

    if (!!paramsSearch.destino) {
        console.log(paramsSearch);
        var dataSearch = {
            query: {}
        };

        if(!!paramsSearch.destino) {
            dataSearch.destination = paramsSearch.destino;
        }
        if(!!paramsSearch.fecha) {
            dataSearch.query.when = paramsSearch.fecha;
        }
        if(!!paramsSearch.dias) {
            dataSearch.query.days = paramsSearch.dias;
        }
        if(!!paramsSearch.pasajeros) {
            dataSearch.query.passengers = paramsSearch.pasajeros;
        }

        loadModelSearch();
    } else {
        loadModel();
    }
};

// function PackageViewController($scope, $routeParams, rest) {
//     $scope.module = 'packages';
//
//     var loadModel = function () {
//         rest().findOne({
//             id: $routeParams.id,
//             type: $scope.module
//         }, function (resp) {
//             $scope.info = resp;
//         }, function (error) {
//             $scope.info = {};
//         });
//     };
//
//     loadModel();
// };

function PackageViewController($scope, $routeParams, rest, $sce) {
    $scope.module = 'packages';

    var loadModel = function () {
        rest().get({
            type: $scope.module,
            params: '_id=' + $routeParams.id+ '&populate=front'
        }, function (resp) {
            if (!!resp[0]) {
                $scope.info = resp[0];
            } else {
                $scope.info = {};
            }
        }, function (error) {
            $scope.info = {};
        });
    };

    loadModel();

    $scope.getHtml = function (html) {
        return $sce.trustAsHtml(html);
    };
};
