(function () {
  'use strict';

  angular
    .module('app')
    .service('Result', Result);

  Result.$inject = [];

  function Result() {
    function create(questions) {
      var totals = sortTotals(calculateTotals(questions));
      
      return {
        totals: totals,
        firstPlaces: getTypesOn(totals, 'first'),
        secondPlaces: getTypesOn(totals, 'second'),
        lastPlaces: getTypesOn(totals, 'last'),
        questions: questions
      };
    }
    
    function calculateTotals(questions) {
      return questions
        .reduce(function (result, question) {
          var item = result.filter(function (r) {
            return r.type === question.type;
          })[0];
          
          if (!item) {
            result.push({ type: question.type, total: question.answer });
            return result;
          }
          
          item.total += question.answer;
          return result;
        }, []);
    }
    
    function sortTotals(totals) {
      return totals.sort(function (left, right) {
        return right.total - left.total;
      });
    }
    
    function getTypesOn(totals, index) {
      var scores = totals.map(function (item) {  return item.total; });
      var uniqueScores = scores.filter(function (total, i) {
        return scores.indexOf(total) === i;
      });
      
      var indexEnum = {
        'first': 0,
        'second': 1,
        'last': uniqueScores.length - 1
      };
      
      return totals
        .filter(function (item) {
          return item.total === uniqueScores[indexEnum[index]];
        })
        .map(function (item) {
          return item.type;
        });
    }
    
    return {
      create: create
    };
  }

})();
