'use strict';
huoyun.constant("ServiceContext", "");

huoyun.factory("BaseService", ["$q", "$http",
  function($q, $http) {
    return {
      getResponse: function(request) {
        var dtd = $q.defer();
        request.then(function(res) {
          dtd.resolve(res.data);
        }).catch(function(ex) {
          console.error(ex);
          dtd.reject(ex.data);
        });
        return dtd.promise;
      }
    };
  }
]);

huoyun.factory("UserService", ["$http", "BaseService", "ServiceContext",
  function($http, BaseService, ServiceContext) {

    return {
      login: function(email, password) {
        var url = `${ServiceContext}/login`;
        return BaseService.getResponse($http.post(url, {
          email: email,
          password: password
        }));
      },

      register: function(email, password, repeatPassword) {
        var url = `${ServiceContext}/register`;
        return BaseService.getResponse($http.post(url, {
          email: email,
          password: password,
          repeatPassword: repeatPassword
        }));
      }
    };
  }
]);