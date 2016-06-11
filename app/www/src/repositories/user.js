(function () {
  'use strict';

  angular
    .module('app')
    .factory('UserRepository', UserRepository);

  UserRepository.$inject = ['$localStorage', 'Config'];

  function UserRepository($localStorage, Config) {
    function get() {
      return angular.copy($localStorage[Config.userStorageKey]);
    }
    
    function save(user) {
      $localStorage[Config.userStorageKey] = user;
    }
    
    return {
      get: get,
      save: save
    };
  }

})();
