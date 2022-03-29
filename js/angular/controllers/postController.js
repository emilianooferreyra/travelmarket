angular
  .module("postController", ["store-factories"])
  .controller("PostFrontController", PostFrontController);

function PostFrontController($scope, rest) {
  $scope.module = "posts";

  var loadModel = function () {
    rest().get(
      {
        type: $scope.module,
        params: "orderBy=createdAt&sort=-1&limit=3&populate=front", //&fields=_id,description,createdAt,front,slug,title'
      },
      function (resp) {
        $scope.posts = resp;
      },
      function (error) {
        $scope.posts = [];
      }
    );
  };

  loadModel();
}

function PostListController($scope, rest) {
  $scope.module = "posts";

  var loadModel = function () {
    rest().get(
      {
        type: $scope.module,
        params: "orderBy=createdAt&sort=-1&populate=front",
      },
      function (resp) {
        $scope.posts = resp;
      },
      function (error) {
        $scope.posts = [];
      }
    );
  };

  loadModel();
}
function PostViewController($scope, $routeParams, rest, $sce) {
  $scope.module = "posts";

  var loadModel = function () {
    rest().get(
      {
        type: $scope.module,
        params: "slug=" + $routeParams.slug + "&populate=front,images",
      },
      function (resp) {
        if (!!resp[0]) {
          $scope.info = resp[0];
        } else {
          $scope.info = {};
        }
      },
      function (error) {
        $scope.info = {};
      }
    );
  };

  loadModel();

  $scope.getHtml = function (html) {
    return $sce.trustAsHtml(html);
  };
}
