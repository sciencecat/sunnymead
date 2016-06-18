(function () {
  'use strict';

  angular
    .module('app')
    .controller('QuizController', QuizController);

  QuizController.$inject = [
    '$state', 'QuestionsRepository', 'ResultRepository', '$timeout', '$ionicLoading'
  ];

  function QuizController(
    $state, QuestionsRepository, ResultRepository, $timeout, $ionicLoading
  ) {
    var vm = this;
    
    vm.questions = QuestionsRepository.get();
    vm.currentQuestion = QuestionsRepository.getCurrentQuestion();
    
    vm.onAnswer = function () {
      $ionicLoading.show({ template: '<ion-spinner icon="spiral"></ion-spinner>' });
      
      $timeout(function () {
        vm.currentQuestion = vm.currentQuestion + 1;
        QuestionsRepository.save(vm.questions);
        QuestionsRepository.saveCurrentQuestion(vm.currentQuestion);
        
        $ionicLoading.hide();
        
        if (vm.currentQuestion > 90 || QuestionsRepository.isValid()) {
          return vm.finish();
        }
      }, 500);
    };
    
    vm.finish = function () {
      if (!QuestionsRepository.isValid()) {
        return;
      }
      
      $ionicLoading.show({ template: '<ion-spinner icon="spiral"></ion-spinner>' });
      
      ResultRepository.create(vm.questions).then(function () {
        $ionicLoading.hide();
        $state.go('app.result');
      });
    }

    // Debug

    vm.debug = true;

    vm.answerAll = function () {
      vm.questions.forEach(function (question) { question.answer = Math.floor(Math.random() * 5) + 1; });
      vm.onAnswer();
    };
  }

})();
