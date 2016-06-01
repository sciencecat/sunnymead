(function () {
  'use strict';

  angular
    .module('app')
    .factory('QuestionsRepository', QuestionsRepository);

  QuestionsRepository.$inject = ['Questions', '$localStorage', '$filter'];

  function QuestionsRepository(Questions, $localStorage, $filter) {
    $localStorage.questions = $localStorage.questions || $filter('shuffle')(Questions);
    
    function get() {
      return angular.copy($localStorage.questions);
    }
    
    function save(questions) {
      if (!questions.every(isValid)) {
        return false;
      }
      
      $localStorage.questions = questions;
      return true;
    }
    
    function isValid(question) {
      if (question.answer < 1 || question.answer > 5) {
        return false;
      }
      
      return true;
    }
    
    return {
      get: get,
      save: save
    };
  }

})();
