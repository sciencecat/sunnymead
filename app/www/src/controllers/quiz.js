(function () {
  'use strict';

  angular
    .module('app')
    .controller('QuizController', QuizController);

  QuizController.$inject = [];

  function QuizController() {
    var vm = this;

    vm.quiz = null;
  }

})();
