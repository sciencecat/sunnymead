(function () {
  'use strict';

  angular
    .module('app')
    .filter('shuffle', shuffle);

  shuffle.$inject = [];

  function shuffle() {
    return function (array) {
      var counter = array.length;

      while (counter > 0) {
        var index = Math.floor(Math.random() * counter);

        counter--;

        var temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
      }
  
      return array;
    };
  }

})();
