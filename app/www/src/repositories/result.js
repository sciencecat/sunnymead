(function () {
  'use strict';

  angular
    .module('app')
    .factory('ResultRepository', ResultRepository);

  ResultRepository.$inject = ['$localStorage', 'Config'];

  function ResultRepository($localStorage, Config) {
    function get() {
      return angular.copy($localStorage[Config.resultStorageKey]);
    }
    
    function save(result) {
      $localStorage[Config.resultStorageKey] = result;
    }
    
    return {
      get: get,
      save: save
    };
  }

})();
