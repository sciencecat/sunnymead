(function () {
  'use strict';

  angular
    .module('app')
    .controller('QuizController', QuizController);

  QuizController.$inject = ['QuestionsRepository'];

  function QuizController(QuestionsRepository) {
    var vm = this;

    vm.questions = QuestionsRepository.get();
    
    vm.saveQuestions = function () {
      QuestionsRepository.save(vm.questions);
    }
  }

})();
