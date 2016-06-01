(function () {
  'use strict';

  angular
    .module('app')
    .controller('QuizController', QuizController);

  QuizController.$inject = ['QuestionsRepository'];

  function QuizController(QuestionsRepository) {
    var vm = this;

    vm.questions = QuestionsRepository.get();
    
    vm.isValid = QuestionsRepository.isValid;
    
    vm.saveQuestions = function () {
      QuestionsRepository.save(vm.questions);
    }

    // Debug

    vm.debug = true;

    vm.answerAll = function () {
      vm.questions.forEach(function (question) { question.answer = Math.floor(Math.random() * 5) + 1; });
      vm.saveQuestions();
    };

    vm.unanswerAll = function () {
      vm.questions.forEach(function (question) { question.answer = 0; });
      vm.saveQuestions();
    };
  }

})();
