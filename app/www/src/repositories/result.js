(function () {
  'use strict';

  angular
    .module('app')
    .factory('ResultRepository', ResultRepository);

  ResultRepository.$inject = ['$localStorage'];

  function ResultRepository($localStorage) {
    function get() {
      return $localStorage.result;
    }
    
    function save(result) {
      $localStorage.result = result;
    }
    
    return {
      get: get,
      save: save
    };
  }

})();
