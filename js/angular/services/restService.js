(function () {
  var app = angular.module("store-factories", []);

  app.factory("rest", [
    "$resource",
    "$location",
    "$rootScope",
    function ($resource, $location, $rootScope) {
      return function ($url) {
        $url = $url == null ? $rootScope.url + "/:type" : $url;

        return $resource(
          $url,
          {
            type: "",
          },
          {
            get: {
              url: $url + "?:params",
              method: "GET",
              transformResponse: function (data) {
                return angular.fromJson(data);
              },
              isArray: true,
              interceptor: {
                responseError: handError,
              },
            },
            findOne: {
              url: $url + "/:id?:params",
              method: "GET",
              transformResponse: function (data) {
                if (data) {
                  var json = JSON.parse(data);
                  return angular.fromJson(json);
                }
              },
              interceptor: {
                responseError: handError,
              },
            },
            search: {
              url: $url + "/search",
              method: "POST",
              interceptor: {
                responseError: handError,
              },
              isArray: true,
              transformResponse: function (data) {
                if (data) {
                  return angular.fromJson(data);
                }
              },
            },
            destinations: {
              url: $url + "/destinations",
              method: "GET",
              transformResponse: function (data) {
                return angular.fromJson(data);
              },
              isArray: true,
              interceptor: {
                responseError: handError,
              },
            },
          }
        );
      };

      function handError(e) {
        params = JSON.stringify(e.data) || " ";
        if (!!e.data) {
          if (e.data.code == "E_VALIDATION") {
            params = validationErrors(e.data);
          }
          if (
            e.data.code == "E_INTERNAL_SERVER_ERROR" &&
            (e.data.message == "jwt expired" ||
              e.data.message == "invalid signature")
          ) {
            $location.path("login");
          }
        }
      }

      function validationErrors(data) {
        var data = data.data;
        var returntext = "";
        for (d in data) {
          for (r in data[d]) {
            returntext =
              "<b>SERVER VALIDATIONS: </b> <br><p>Rule: " +
              data[d][r].rule +
              " <br>Message: " +
              data[d][r].message +
              " </p>";
          }
        }

        return returntext;
      }
    },
  ]);
})();

///fdfasdf@dfdf.c
