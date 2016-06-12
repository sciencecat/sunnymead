(function () {
  'use strict';

  angular
    .module('app')
    .factory('DocumentBuilderService', DocumentBuilder);

  DocumentBuilder.$inject = [];

  function DocumentBuilder() {
    function create(result) {
      return {
        content: 'This is an sample PDF'
      };
    }

    return {
      create: create
    };
  }

})();
