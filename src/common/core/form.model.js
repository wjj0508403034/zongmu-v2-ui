'use strict';

angular.module('huoyun.widget').factory("FormModel", ["Field", "$q",
  function(Field, $q) {

    function FormModel(...names) {
      names.forEach(function(fieldName) {
        this[fieldName] = new Field(fieldName);
      }.bind(this));
    }

    FormModel.prototype.getModel = function() {
      var model = {};
      Object.keys(this).forEach(function(fieldName) {
        if (this.isField(fieldName)) {
          model[fieldName] = this[fieldName].value;
        }
      }.bind(this));
      return model;
    };

    FormModel.prototype.setError = function(fieldName, errorMessage) {
      if (this.isField(fieldName)) {
        this[fieldName].setError(errorMessage);
      }
    };

    FormModel.prototype.clearErrors = function() {
      Object.keys(this).forEach(function(fieldName) {
        if (this.isField(fieldName)) {
          this[fieldName].clearError();
        }
      }.bind(this));
    };

    FormModel.prototype.isField = function(fieldName) {
      return this[fieldName] instanceof Field;
    };

    FormModel.prototype.addValidator = function(fieldName, validator, message, options) {
      if (this.isField(fieldName)) {
        this[fieldName].addValidator(validator, message, options);
      }
    };

    FormModel.prototype.onValid = function() {
      var promises = [];
      Object.keys(this).forEach(function(fieldName) {
        if (this.isField(fieldName)) {
          promises.push(this[fieldName].onValid());
        }
      }.bind(this));

      var dtd = $q.defer();
      Promise.all(promises)
        .then(function() {
          dtd.resolve();
        })
        .catch(function(ex) {
          dtd.reject(ex);
        });

      return dtd.promise;
    };

    return FormModel;
  }
]);