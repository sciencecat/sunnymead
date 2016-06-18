(function () {
  'use strict';

  angular
    .module('app')
    .controller('QuizController', QuizController);

  QuizController.$inject = [
    '$state', 'QuestionsRepository', 'ResultRepository', '$timeout',
    '$ionicLoading', '$ionicPopup'
  ];

  function QuizController(
    $state, QuestionsRepository, ResultRepository, $timeout,
    $ionicLoading, $ionicPopup
  ) {
    var vm = this;
    
    vm.questions = [];
    vm.currentQuestion = QuestionsRepository.getCurrentQuestion();
    vm.onAnswer = onAnswer;
    vm.finish = finish;
    vm.answerAll = answerAll;
    
    return initialize();
    
    function initialize() {
      $ionicLoading.show({ template: '<ion-spinner icon="spiral"></ion-spinner>' });
      
      QuestionsRepository.get().then(function (questions) {
        vm.questions = questions;
        
        $ionicLoading.hide();
        
        if (vm.currentQuestion === 0) {
          $ionicPopup.alert({
            title: 'Como responder o questionário',
            template: '<p>Para que o teste tenha seu maior nível de precisão não é necessário pensar muito, responda com a primeira coisa que passar pela sua cabeça, mas com sinceridade.</p>',
            okType: 'button-positive'
          });
        }
      });
    }
    
    function onAnswer() {
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
    }
    
    function finish() {
      if (!QuestionsRepository.isValid()) {
        return;
      }
      
      $ionicLoading.show({ template: '<ion-spinner icon="spiral"></ion-spinner>' });
      
      ResultRepository.create(vm.questions).then(function () {
        $ionicLoading.hide();
        $state.go('app.result');
      });
    }

    function answerAll() {
      vm.questions.forEach(function (question) { question.answer = Math.floor(Math.random() * 5) + 1; });
      vm.onAnswer();
    }
  }

})();
