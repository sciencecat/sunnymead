angular
  .module('app', [
    'ionic',
    'app.status',
    'app.chats',
    'app.account'
  ])
  .config(config)
  .run(run);

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

config.$inject = ['$stateProvider', '$urlRouterProvider'];

function config($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/app/status');

  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'src/app.html'
    });
}
