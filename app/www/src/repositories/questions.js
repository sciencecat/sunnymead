(function () {
  'use strict';

  angular
    .module('app')
    .factory('QuestionsRepository', QuestionsRepository);

  QuestionsRepository.$inject = ['Questions', '$localStorage'];

  function QuestionsRepository(Questions, $localStorage) {
    $localStorage.questions = $localStorage.questions || Questions;
    
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
