(function () {
  'use strict';

  angular
    .module('app')
    .config(routes);

  routes.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routes($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/app/result');

    $stateProvider.state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/app.html'
    });

    $stateProvider.state('app.info', {
      url: '/info',
      views: {
        'app-info': {
          controller: 'InfoController',
          controllerAs: 'vm',
          templateUrl: 'templates/info.html'
        }
      }
    });

    $stateProvider.state('app.result', {
      url: '/result',
      views: {
        'app-quiz': {
          controller: 'ResultController',
          controllerAs: 'vm',
          templateUrl: 'templates/result.html'
        }
      }
    });

    $stateProvider.state('app.quiz', {
      url: '/quiz?page',
      views: {
        'app-quiz': {
          controller: 'QuizController',
          controllerAs: 'vm',
          templateUrl: 'templates/quiz.html'
        }
      }
    });
  }

})();
