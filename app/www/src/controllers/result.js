(function () {
  'use strict';

  angular
    .module('app')
    .controller('ResultController', ResultController);

  ResultController.$inject = [];

  function ResultController() {
    var vm = this;

    vm.quiz = null;
  }

})();
