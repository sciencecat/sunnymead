(function () {
  'use strict';

  angular
    .module('app')
    .filter('slice', slice);

  slice.$inject = [];

  function slice() {
    return function (array, index) {
      return array.slice(index, index + 1);
    };
  }

})();