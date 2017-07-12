'use strict';

huoyun.controller("RegisterController", ["$scope", "FormModel", "UserService", "Validators",
  function($scope, FormModel, UserService, Validators) {

    $scope.vm = new FormModel("email", "password", "repeatPassword");
    $scope.vm.addValidator("email", Validators.Mandatory, "邮箱不能为空。");
    $scope.vm.addValidator("email", Validators.Email, "邮件格式不正确。");
    $scope.vm.addValidator("password", Validators.Mandatory, "密码不能为空。");
    $scope.vm.addValidator("repeatPassword", Validators.Mandatory, "重复密码不能为空。");
    $scope.vm.addValidator("repeatPassword", Validators.StringEqual, "两次密码不一致。", {
      equals: function(value) {
        return value === $scope.vm.password.value;
      }
    });



    $scope.register = function() {
      $scope.vm.onValid()
        .then(register)
        .catch(function(ex) {
          $scope.vm.clearErrors();
          $scope.vm.setError(ex.fieldName, ex.errorMessage);
        });
    };

    function register() {
      var model = $scope.vm.getModel();
      UserService.register(model.email, model.password, model.repeatPassword)
        .then(function() {
          window.location.href = "/login.html";
        }).catch(function(err) {
          $scope.vm.clearErrors();
          $scope.vm.setError("email", err.message);
        });
    }
  }
]);