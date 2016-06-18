(function () {
  'use strict';

  angular
    .module('app')
    .controller('QuizController', QuizController);

  QuizController.$inject = [
    '$state', 'QuestionsRepository', 'Result', 'ResultRepository', '$timeout',
    '$ionicLoading'
  ];

  function QuizController(
    $state, QuestionsRepository, Result, ResultRepository, $timeout, 
    $ionicLoading
  ) {
    var vm = this;
    
    vm.questions = QuestionsRepository.get();
    vm.currentPage = QuestionsRepository.getCurrentPage();
    
    $state.go('.', { page: vm.currentPage },  { notify: false });
    
    vm.onAnswer = function () {
      $ionicLoading.show({ template: '<ion-spinner icon="spiral"></ion-spinner>' });
      
      QuestionsRepository.save(vm.questions);
      
      $timeout(function () {
        vm.currentPage = vm.currentPage + 1;
        QuestionsRepository.saveCurrentPage(vm.currentPage);
        $ionicLoading.hide();
        
        if (vm.currentPage > 90 || QuestionsRepository.isValid()) {
          return vm.finish();
        }
        
        $state.go('.', { page: vm.currentPage },  { notify: false });
      }, 500);
    };
    
    vm.finish = function () {
      if (!QuestionsRepository.isValid()) {
        return;
      }
      
      var result = Result.create(vm.questions);
      ResultRepository.save(result);
      
      $state.go('app.result');
    }

    // Debug

    vm.debug = true;

    vm.answerAll = function () {
      vm.questions.forEach(function (question) { question.answer = Math.floor(Math.random() * 5) + 1; });
      vm.onAnswer();
    };
  }

})();
