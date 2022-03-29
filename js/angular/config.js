/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
function config($routeProvider, $locationProvider, vcRecaptchaServiceProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider

    .when("/", {
      templateUrl: "views/home.html",
    })
    .when("/blog", {
      templateUrl: "views/posts.html",
      controller: PostListController,
    })
    .when("/blog/:slug/details", {
      templateUrl: "views/posts-details.html",
      controller: PostViewController,
    })
    .when("/paquetes/:id/details", {
      templateUrl: "views/package-details.html",
      controller: PackageViewController,
    })
    .when("/paquetes", {
      templateUrl: "views/packages.html",
      controller: PackageListController,
    })
    .when("/pagos", {
      templateUrl: "views/pagos.html",
    })
    .when("/servicios", {
      templateUrl: "views/servicios.html",
      controller: ServiceController,
    })
    .otherwise({
      redirectTo: "/",
    });

  vcRecaptchaServiceProvider.setDefaults({
    key: "6LdW_A8TAAAAALwcjMrJJ49V5LWpfEU-ck7qzZBO", //localhost
    //key: "6LdedRsUAAAAAEIOe3lPKSeYfWP_T6PUuN9aFaM4",
    theme: "light",
  });
}
angular
  .module("get-travel-market")
  .config(config)
  .run(function ($rootScope) {
    $rootScope.url = "http://admin.gettravelmarket.com/api";
    $rootScope.url_uploads = "http://admin.gettravelmarket.com/api";
  });
