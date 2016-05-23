(function () {
  'use strict';

  angular
    .module('app')
    .controller('NewQuizController', NewQuizController);

  NewQuizController.$inject = [];

  function NewQuizController() {
    var vm = this;

    vm.questions = [
      {
        id: 1,
        text: 'Lorem Ipsum Dolor Sit Amet Brubbles Struggles Nuggles Bubbles?',
        type: 1,
        answer: 3
      },
      {
        id: 2,
        text: 'Lorem Ipsum Dolor Sit Amet Brubbles Struggles Nuggles Bubbles?',
        type: 1,
        answer: 1
      }
    ];
  }

})();
