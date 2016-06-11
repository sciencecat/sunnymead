(function () {
  'use strict';
  
  angular
    .module('app')
    .service('PdfService', PdfService);
    
  PdfService.$inject = [];
    
  function PdfService() {
    this.download = function (result) {
      alert('hooo');
    };
  }
  
})();