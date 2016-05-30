(function () {
  'use strict';

  angular
    .module('app')
    .factory('QuestionsRepository', QuestionsRepository);

  QuestionsRepository.$inject = ['Questions', '$localStorage'];

  function QuestionsRepository(Questions, $localStorage) {
    var storage = $localStorage.questions || Questions;
    
    function get() {
      return angular.copy(storage);
    }
    
    function save(questions) {
      if (!questions.every(isValid)) {
        return false;
      }
      
      storage.questions = questions;
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
