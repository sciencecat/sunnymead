(function () {
  'use strict';

  angular
    .module('app')
    .factory('QuestionsRepository', QuestionsRepository);

  QuestionsRepository.$inject = ['Questions', '$localStorage', '$filter', 'Config', '$q', '$http'];

  function QuestionsRepository(Questions, $localStorage, $filter, Config, Promise, $http) {
    function fetch() {
      return $http.get('src/data/questions.yaml').then(function (result) {
        try {
          var questions = jsyaml.safeLoad(result.data);
          $localStorage[Config.questionsStorageKey] = $filter('shuffle')(questions);
          return Promise.resolve(questions);
        } catch (e) {
          return Promise.reject(e);
        }
      });
      
    }
    
    function get() {
      if ($localStorage[Config.questionsStorageKey]) {
        return Promise.resolve(angular.copy($localStorage[Config.questionsStorageKey]));
      }
      
      return fetch().then(function () {
        return angular.copy($localStorage[Config.questionsStorageKey]);
      });
    }
    
    function getCurrentQuestion() {
      if (!$localStorage[Config.questionsStorageKey + 'current_question']) {
        return 0;
      }
      
      return angular.copy($localStorage[Config.questionsStorageKey + 'current_question']);
    }
    
    function save(questions) {
      $localStorage[Config.questionsStorageKey] = questions;
    }
    
    function saveCurrentQuestion(index) {
      $localStorage[Config.questionsStorageKey + 'current_question'] = Number(index);
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
      fetch: fetch,
      get: get,
      getCurrentQuestion: getCurrentQuestion,
      save: save,
      saveCurrentQuestion: saveCurrentQuestion,
      isValid: isValid
    };
  }

})();
