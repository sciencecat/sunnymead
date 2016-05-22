(function () {
  'use strict';

  angular
    .module('app')
    .config(routes);

  routes.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routes($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/app/quiz');

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

    $stateProvider.state('app.quiz', {
      url: '/quiz',
      views: {
        'app-quiz': {
          controller: 'QuizController',
          controllerAs: 'vm',
          templateUrl: 'templates/quiz.html'
        }
      }
    });

    $stateProvider.state('app.new-quiz', {
      url: '/new-quiz?page',
      views: {
        'app-quiz': {
          controller: 'NewQuizController',
          controllerAs: 'vm',
          templateUrl: 'templates/new-quiz.html'
        }
      }
    });
  }

})();
