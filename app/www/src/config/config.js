(function () {
  'use strict';
  
  angular
    .module('app')
    .constant('Config', {
      resultStorageKey: 'result_v1',
      questionsStorageKey: 'questions_v1',
      userStorageKey: 'user_v1'
    });
  
})();
