angular
  .module('app.account')
  .config(routes)

routes.$inject = ['$stateProvider'];

function routes($stateProvider) {
  $stateProvider
    .state('app.account', {
      url: '/account',
      views: {
        'app-account': {
          templateUrl: 'src/modules/account/account_template.html',
          controller: 'AccountController'
        }
      }
    });
}
