(function () {
  'use strict';

  angular
    .module('app')
    .controller('QuizController', QuizController);

  QuizController.$inject = ['QuizRepository'];

  function QuizController(QuizRepository) {
    var vm = this;

    vm.quiz = QuizRepository.get();
  }

})();
