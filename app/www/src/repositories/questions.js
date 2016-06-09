(function () {
  'use strict';

  angular
    .module('app')
    .factory('QuestionsRepository', QuestionsRepository);

  QuestionsRepository.$inject = ['Questions', '$localStorage', '$filter'];

  function QuestionsRepository(Questions, $localStorage, $filter) {
    function reset() {
      $localStorage.questions = $localStorage.questions || $filter('shuffle')(Questions);
    }
    
    function get() {
      if (!$localStorage.questions) {
        reset();
      }
      
      return angular.copy($localStorage.questions);
    }
    
    function save(questions) {
      $localStorage.questions = questions;
    }
    
    function isAnswerValid(question) {
      if (question.answer < 1 || question.answer > 5) {
        return false;
      }
      
      return true;
    }
    
    function isValid() {
      return $localStorage.questions && 
             $localStorage.questions.every(isAnswerValid);
    }
    
    return {
      get: get,
      save: save,
      isValid: isValid
    };
  }

})();
