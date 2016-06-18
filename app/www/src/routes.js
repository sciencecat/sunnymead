(function () {
  'use strict';

  angular
    .module('app')
    .config(routes)
    .run(redirection);

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
      cache: false,
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
      cache: false,
      views: {
        'app-quiz': {
          controller: 'QuizController',
          controllerAs: 'vm',
          templateUrl: 'templates/quiz.html'
        }
      }
    });
  }
  
  redirection.$inject = ['$rootScope', '$state', 'ResultRepository'];
  
  function redirection($rootScope, $state, ResultRepository) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      if (toState.name === 'app.quiz' && ResultRepository.get()) {
        event.preventDefault();
        $state.go('app.result');
      }
    });
  }

})();
