(function () {
  'use strict';

  angular
    .module('app', ['ionic', 'ngStorage', 'chart.js', 'ngCordova'])
    .config(config)
    .run(run);

  config.$inject = ['$ionicConfigProvider'];

  function config($ionicConfigProvider, $stateProvider, $urlRouterProvider) {
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.navBar.alignTitle('center');
    $ionicConfigProvider.backButton.text('Voltar');
    $ionicConfigProvider.backButton.previousTitleText(false);
  }

  run.$inject = ['$ionicPlatform'];

  function run($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  }

})();
