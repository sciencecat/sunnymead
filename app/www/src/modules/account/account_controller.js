(function () {
  'use strict';

  angular
    .module('app.account')
    .controller('AccountController', AccountController);

  AccountController.$inject = ['$scope'];

  function AccountController($scope) {
    $scope.settings = {
      enableFriends: true
    };
  }

})();

