(function () {
  'use strict';

  angular
    .module('app')
    .factory('ResultRepository', ResultRepository);

  ResultRepository.$inject = ['$localStorage', 'Config', 'TypesRepository', '$q'];

  function ResultRepository($localStorage, Config, TypesRepository, Promise) {
    function get() {
      return angular.copy($localStorage[Config.resultStorageKey]);
    }
    
    function create(questions) {
      return new Promise(function (resolve, reject) {
        var totals = sortTotals(calculateTotals(questions));
        var ranking = {};
        
        var firstPlacesPromise = Promise.all(getTypesOn(totals, 'first')).then(function (results) {
          ranking.firstPlaces = results;
        });
        
        var secondPlacesPromise = Promise.all(getTypesOn(totals, 'second')).then(function (results) {
          ranking.secondPlaces = results;
        });
        
        var lastPlacesPromise = Promise.all(getTypesOn(totals, 'last')).then(function (results) {
          ranking.lastPlaces = results;
        });
        
        Promise.all([firstPlacesPromise, secondPlacesPromise, lastPlacesPromise]).then(function () {
          var result = {
            totals: totals,
            firstPlaces: ranking.firstPlaces,
            secondPlaces: ranking.secondPlaces,
            lastPlaces: ranking.lastPlaces
          };
          
          $localStorage[Config.resultStorageKey] = result;
          resolve(result);
        });
      });
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
          return TypesRepository.getByType(item.type);
        });
    }
    
    return {
      get: get,
      create: create
    };
  }

})();
