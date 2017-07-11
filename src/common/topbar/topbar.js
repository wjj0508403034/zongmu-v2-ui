'use strict';

angular.module('huoyun.widget').directive("widgetsTopBar", ["application", function(applicationProvider) {
  return {
    restrict: "A",
    templateUrl: "topbar/topbar.html",
    replace: true,
    link: function($scope, elem, attrs) {
      $scope.getAppName = function() {
        return applicationProvider.getName();
      };
      $scope.hasLogin = applicationProvider.hasLogin();
      if ($scope.hasLogin) {
        $scope.userName = applicationProvider.getUserName();
      }

      $scope.login = function() {
        if (typeof applicationProvider.loginFunc === "function") {
          applicationProvider.loginFunc();
        }
      };

      $scope.register = function() {
        if (typeof applicationProvider.registerFunc === "function") {
          applicationProvider.registerFunc();
        }
      };

      $scope.logout = function() {
        if (typeof applicationProvider.logoutFunc === "function") {
          applicationProvider.logoutFunc.bind(applicationProvider.getUserService())();
        }
      };
    }
  };
}]);


angular.module('huoyun.widget').provider("application", function() {
  var appName = null;
  var isLogin = false;
  var userName = null;
  var userService = null;

  this.loginFunc = null;
  this.registerFunc = null;
  this.logoutFunc = null;

  // if (Cookies.get("login") === "true") {
  //   isLogin = true;
  //   userName = Cookies.get("username");
  // }

  this.setName = function(name) {
    appName = name;
  };

  this.getName = function() {
    return appName;
  };

  this.setLogin = function(loginResult) {
    // if (loginResult !== true) {
    //   Cookies.remove("username");
    //   Cookies.remove("login");
    //   Cookies.remove("role");
    // } else {
    //   Cookies.set("login", loginResult);
    // }

    // isLogin = loginResult;
  };

  this.hasLogin = function() {
    return isLogin;
  };

  this.setUserName = function(user_name, role) {
    //Cookies.set("username", user_name);
    //Cookies.set("role", role);
    userName = user_name;
  };

  this.getUserName = function() {
    return userName;
  };

  this.setUserService = function(user_service) {
    userService = user_service;
  };

  this.getUserService = function() {
    return userService;
  };

  this.$get = function() {
    return this;
  };
});