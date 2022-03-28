angular.module('homeController', ['store-factories']).controller('HomeController', HomeController).controller('ContactController', ContactController);

function HomeController($scope, $rootScope, $anchorScroll, $location) {

    if (!!$rootScope.anchor) {
        $scope.scrollTo($rootScope.anchor);
    }

    $scope.scrollTo = function(id) {
        console.log(id);
        //$location.hash(id);
        $anchorScroll(id);

        $rootScope.anchor = null;
    };

    $scope.serviceClicked = function(service) {
        $rootScope.activeService = service;
        $location.path('servicios')
    }
};

function ContactController($scope, vcRecaptchaService, $http) {
    var url = 'http://formspree.io/contacto@gettravelmarket.com';

    recaptchaId = null;
    $scope.setRecaptchaId = function(widgetId) {
        recaptchaId = widgetId;
    };

    $scope.send = function() {
        if (!vcRecaptchaService.getResponse(recaptchaId)) {
            $scope.od_captcha = null;
            vcRecaptchaService.reload(recaptchaId);
            alert('Por favor, completa el captcha.');
        } else if (($scope.name == '') || ($scope.lastname == '') || ($scope.email == '') || ($scope.subject == '') || ($scope.body == '')) {
            alert('Alguno de los campos quedó vacío.');
        } else {
            var data = {
                'nombre': $scope.name,
                'apellido': $scope.lastname,
                'telefono': $scope.phone,
                '_replyto': $scope.email,
                'asunto': $scope.subject,
                'consulta': $scope.body,
                '_next': 'http://gettravelmarket.com',
                '_subject': 'Contacto Get Travel Market'
            };

            $http.post(url, data).then(function() {
                alert('Su consulta fue enviada con éxito.');
            }, function() {
                alert('Hubo un error al enviar la consulta. Intente más tarde.');
            });
        }
    }
}
