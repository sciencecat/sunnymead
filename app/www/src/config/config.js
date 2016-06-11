(function () {
  'use strict';
  
  angular
    .module('app')
    .constant('Config', {
      sendEmailUrl: 'https://sunnymead-staging.herokuapp.com/sendEmail'
    });
  
})();