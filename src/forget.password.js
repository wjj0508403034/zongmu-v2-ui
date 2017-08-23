'use strict';

huoyun.controller("ForgetPasswordController", ["$scope", "FormModel", "UserService", "Validators",
  function($scope, FormModel, UserService, Validators) {

    $scope.vm = new FormModel("email", "password", "repeatPassword");
    $scope.vm.addValidator("email", Validators.Mandatory, "邮箱不能为空。");
    $scope.vm.addValidator("email", Validators.Email, "邮件格式不正确。");

    $scope.forgetPassword = function() {
      $scope.vm.onValid()
        .then(register)
        .catch(function(ex) {
          $scope.vm.clearErrors();
          $scope.vm.setError(ex.fieldName, ex.errorMessage);
        });
    };

    function forgetPassword() {
      var model = $scope.vm.getModel();
      UserService.forgetPassword(model.email)
        .then(function() {
          window.location.href = "/login.html";
        }).catch(function(err) {
          $scope.vm.clearErrors();
          $scope.vm.setError("email", err.message);
        });
    }
  }
]);