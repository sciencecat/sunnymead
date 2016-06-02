(function () {
  'use strict';

  angular
    .module('app')
    .controller('ResultController', ResultController);

  ResultController.$inject = ['$ionicHistory', 'ResultRepository'];

  function ResultController($ionicHistory, ResultRepository) {
    var vm = this;
    
    $ionicHistory.removeBackView();

    vm.result = ResultRepository.get();
  }

})();
