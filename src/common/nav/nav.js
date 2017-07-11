'use strict';

angular.module('huoyun.widget').directive("widgetsNav", ["nav", function(navProvider) {
  return {
    restrict: "A",
    templateUrl: "nav/nav.html",
    replace: true,
    scope: {
      "current": "@"
    },
    link: function($scope, elem, attrs) {
      $scope.getNavItem = function() {
        return navProvider.getItems();
      };
    }
  };
}]);

// angular.module('huoyun.widget').controller("navController", ["$scope", "nav", "page", function($scope, navProvider, pageProvider) {
//   $scope.items = navProvider.getItems() || [];
//   angular.forEach($scope.items, function(item, index) {
//     item.className = item.name === $scope.current ? "active" : "";
//   });

//   $scope.contentWidth = pageProvider.getPageWidth();
// }]);

angular.module('huoyun.widget').provider("nav", function() {
  this.items = [];

  this.setItems = function(items) {
    if (angular.isArray(items)) {
      this.items = items;
    }
  };

  this.getItems = function() {
    return this.items;
  };

  this.$get = function() {
    return this;
  };
});