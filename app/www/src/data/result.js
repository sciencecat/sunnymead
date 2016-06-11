(function () {
  'use strict';

  angular
    .module('app')
    .service('Result', Result);

  Result.$inject = ['Types'];

  function Result(Types) {
    function create(questions) {
      var totals = sortTotals(calculateTotals(questions));
      
      return {
        totals: totals,
        firstPlaces: getTypesOn(totals, 'first'),
        secondPlaces: getTypesOn(totals, 'second'),
        lastPlaces: getTypesOn(totals, 'last')
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
        }, [])
        .map(function (question) {
          // explaining calculation made on question.answer / 10
          // the maximum points that all answer can reach is 50
          // its because there is 5 points limit on each question
          // and there is 10 questions for one type
          // scaling this:
          // question.answer ------ 50
          // total ----------------- 5
          // total = (question.answer * 5) / 50 = question.answer / 10
          question.total = question.total / 10;
          return question;
        });
    }
    
    function sortTotals(totals) {
      return totals.sort(function (left, right) {
        return right.total - left.total;
      });
    }
    
    function getTypesOn(totals, index) {
      var scores = totals.map(function (item) { return item.total; });
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
          return Types.filter(function (type) {
            return type.type === item.type;
          })[0];
        });
    }
    
    return {
      create: create
    };
  }

})();
