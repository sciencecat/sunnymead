angular
  .module('app.chats')
  .config(routes);

routes.$inject = ['$stateProvider'];

function routes($stateProvider) {
  $stateProvider
    .state('app.chats', {
      url: '/chats',
      views: {
        'app-chats': {
          templateUrl: 'src/modules/chats/chats_template.html',
          controller: 'ChatsController'
        }
      }
    });
}
