(function() {
    var app = angular.module('store-directives', []);

    app.filter('foodFilter', function () {
        return function (input) { 
            if(!!input) {
                var translate = {
                    breakfast: 'Desayuno',
                    allinclusive: 'All inclusive',
                    complete: 'Completo',
                    european: 'Europeo',
                    other: 'Otro',
                    none: 'Ninguno'
                };
                
                return translate[input];
            } else {
                return input;
            }
        };
    });
    
    app.directive('dateTimePicker', function() {
        return {
            restrict: 'A',
//            scope: {
//                dateMin: '=',
//                dateDisabled: '='
//            },
            link: function(scope, element, attrs) {
                var config = {
                    locale: 'es',
                    format: 'DD/MM/YYYY',
                    minDate: new Date()
                };
//                console.log(scope);
//                if(!!scope.dateMin) {
//                    config.minDate = new Date(scope.dateMin);
//                }
//                
//                if(!!scope.dateDisabled) {
//                    config.disabledDates = scope.dateDisabled;
//                }
                
                $(element).datetimepicker(config);
            }
        }
    });
    app.filter('currencySymbolFilter', function () {
        return function (input) { 
            if(!!input) {
                var translate = {
                    ars: '$',
                    usd: 'u$s',
                    eur: '€'
                };
                
                return translate[input];
            } else {
                return input;
            }
        };
    });
})();