(function () {
  'use strict';

  angular
    .module('app')
    .filter('pagination', pagination);

  pagination.$inject = ['$state'];

  function pagination($state) {
    return function (items, steps) {
      var page = Number($state.params.page || 1);
      var offset = (page - 1) * steps;
      var limit = page * steps;
      
      return items.slice(offset, limit);
    };
  }

})();
