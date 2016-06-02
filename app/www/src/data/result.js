(function () {
  'use strict';

  angular
    .module('app')
    .service('Result', Result);

  Result.$inject = [];

  function Result() {
    function create(questions) {
      var totals = calculateTotals(questions);

      return {
        totals: totals,
        firstPlace: findFirstPlace(totals),
        secondPlace: findSecondPlace(totals),
        lastPlace: findLastPlace(totals),
        questions: questions
      };
    }
    
    function calculateTotals(questions) {
      return questions
        .reduce(function (totals, question) {
          totals[question.type] = (totals[question.type] || 0) + question.answer;
          return totals;
        }, {});
    }
    
    function findFirstPlace(totals) {
      var types = Object.keys(totals);
      
      types.sort(function (left, right) {
        return totals[right] - totals[left];
      });
      
      return types[0];
    }
    
    function findSecondPlace(totals) {
      var types = Object.keys(totals);
      
      types.sort(function (left, right) {
        return totals[right] - totals[left];
      });
      
      return types[1];
    }
    
    function findLastPlace(totals) {
      var types = Object.keys(totals);
      
      types.sort(function (left, right) {
        return totals[right] - totals[left];
      });
      
      return types[types.length - 1];
    }
    
    return {
      create: create
    };
  }

})();
