(function () {
  'use strict';
  
  angular
    .module('app')
    .constant('Config', {
      sendEmailUrl: 'https://sunnymead.herokuapp.com/sendEmail'
    });
  
})();