(function () {
  'use strict';

  angular
    .module('app')
    .factory('UserRepository', UserRepository);

  UserRepository.$inject = ['$localStorage'];

  function UserRepository($localStorage) {
    function get() {
      return angular.copy($localStorage.user);
    }
    
    function save(user) {
      $localStorage.user= user;
    }
    
    return {
      get: get,
      save: save
    };
  }

})();
