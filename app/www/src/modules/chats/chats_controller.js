(function () {
  'use strict';

  angular
    .module('app.chats')
    .controller('ChatsController', ChatsController);

  ChatsController.$inject = ['$scope', 'Chats'];

  function ChatsController($scope, Chats) {
    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
      Chats.remove(chat);
    };
  }

})();
