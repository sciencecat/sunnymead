(function () {
  'use strict';

  angular
    .module('app')
    .factory('QuizRepository', QuizRepository);

  QuizRepository.$inject = [];

  function QuizRepository() {
    function get() {
      return null;
    }

    return {
      get: get
    };
  }

})();
