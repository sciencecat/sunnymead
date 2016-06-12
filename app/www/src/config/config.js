(function () {
  'use strict';
  
  angular
    .module('app')
    .constant('Config', {
      sendEmailUrl: 'https://sunnymead.herokuapp.com/sendEmail',
      resultStorageKey: 'result_v1',
      questionsStorageKey: 'questions_v1',
      userStorageKey: 'user_v1'
    });
  
})();
