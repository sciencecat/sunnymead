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
      $localStorage.questions = questions;
    }
    
    function isValid() {
      if ($localStorage.questions.length !== Questions.length) {
        return false;
      }
      
      return $localStorage.questions.every(function (question, index) {
        if (question.answer < 1 || question.answer > 5) {
          return false;
        }
        
        return true;
      });
    }
    
    return {
      get: get,
      save: save,
      isValid: isValid
    };
  }

})();
