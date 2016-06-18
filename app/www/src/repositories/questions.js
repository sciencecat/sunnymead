(function () {
  'use strict';

  angular
    .module('app')
    .factory('QuestionsRepository', QuestionsRepository);

  QuestionsRepository.$inject = ['Questions', '$localStorage', '$filter', 'Config'];

  function QuestionsRepository(Questions, $localStorage, $filter, Config) {
    function reset() {
      $localStorage[Config.questionsStorageKey] = $localStorage[Config.questionsStorageKey] || $filter('shuffle')(Questions);
    }
    
    function get() {
      if (!$localStorage[Config.questionsStorageKey]) {
        reset();
      }
      
      return angular.copy($localStorage[Config.questionsStorageKey]);
    }
    
    function getCurrentQuestion() {
      if (!$localStorage[Config.questionsStorageKey + 'currentQuestion']) {
        return 0;
      }
      
      return angular.copy($localStorage[Config.questionsStorageKey + 'currentQuestion']);
    }
    
    function save(questions) {
      $localStorage[Config.questionsStorageKey] = questions;
    }
    
    function saveCurrentQuestion(index) {
      $localStorage[Config.questionsStorageKey + 'currentQuestion'] = Number(index);
    }
    
    function isAnswerValid(question) {
      if (question.answer < 1 || question.answer > 5) {
        return false;
      }
      
      return true;
    }
    
    function isValid() {
      return $localStorage[Config.questionsStorageKey] && 
             $localStorage[Config.questionsStorageKey].every(isAnswerValid);
    }
    
    return {
      get: get,
      getCurrentQuestion: getCurrentQuestion,
      save: save,
      saveCurrentQuestion: saveCurrentQuestion,
      isValid: isValid
    };
  }

})();
