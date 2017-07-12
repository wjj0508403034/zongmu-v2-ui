'use strict';

angular.module('huoyun.widget').directive("widgetsFootBar", ["footbar",
  function(footbarProvider) {
    return {
      restrict: "A",
      templateUrl: "footbar/footbar.html",
      replace: true,
      link: function($scope, elem, attrs) {

        $scope.getLinks = function() {
          return footbarProvider.getUsefulLinks();
        };

        $scope.getCopyRight = function() {
          return footbarProvider.getCopyRight();
        };

        $scope.getCompanyName = function() {
          return footbarProvider.getCompanyName();
        };

        $scope.getRecordNo = function() {
          return footbarProvider.getRecordInfo();
        };
      }
    };
  }
]);



angular.module('huoyun.widget').provider("footbar", function() {
  var usefulLinks = [];
  var copyright = null;
  var companyName = null;
  var record = null; // 备案信息

  this.configure = function(options) {
    usefulLinks = options.links || [];
    copyright = options.copyRight;
    companyName = options.companyName;
    record = options.recordNo;
  };

  this.getUsefulLinks = function() {
    return usefulLinks;
  };

  this.getCopyRight = function() {
    return copyright;
  };

  this.getRecordInfo = function() {
    return record;
  };

  this.getCompanyName = function() {
    return companyName;
  };

  this.$get = function() {
    return this;
  };
});