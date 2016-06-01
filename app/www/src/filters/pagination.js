(function () {
  'use strict';

  angular
    .module('app')
    .filter('pagination', pagination);

  pagination.$inject = ['$state'];

  function pagination($state) {
    return function (items, steps) {
      if (!$state.params.page) {
        $state.go('.', { page: 1 },  { notify: false });
        return;
      }
      
      var page = Number($state.params.page);
      var offset = (page - 1) * steps;
      var limit = page * steps;
      
      return items.slice(offset, limit);
    };
  }

})();
