(function () {
  'use strict';
  
  angular
    .module('app')
    .service('PdfService', PdfService);
    
  PdfService.$inject = ['$cordovaFile'];
    
  function PdfService($cordovaFile) {
    this.download = function (result) {
      $cordovaFile
        .writeFile(cordova.file.dataDirectory, "file.txt", "text", true)
        .then(function (success) {
          alert(JSON.stringify(success));
        }, function (error) {
          alert(JSON.stringify(error));
        });
    };
  }
  
})();