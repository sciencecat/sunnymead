(function () {
  'use strict';

  angular
    .module('app.status')
    .config(routes);

  routes.$inject = ['$stateProvider'];

  function routes($stateProvider) {
    $stateProvider
      .state('app.status', {
        url: '/status',
        views: {
          'app-status': {
            templateUrl: 'src/modules/status/status_template.html',
            controller: 'StatusController'
          }
        }
      });
  }

})();
