(function () {
  'use strict';

  angular
    .module('app')
    .factory('PDFCreatorService', PDFCreator);

  PDFCreator.$inject = ['DocumentBuilderService', '$ionicPopup', '$timeout', '$ionicLoading'];

  function PDFCreator(DocumentBuilderService, $ionicPopup, $timeout, $ionicLoading) {
    function createWeb(result) {
      $ionicLoading.show({ template: '<ion-spinner icon="spiral"></ion-spinner>' });

      generateDocumentDefinition(result)
        .then(function (docDefinition) { return generateDocument(docDefinition); })
        .then(function (pdfDocument) { return generateDataUrl(pdfDocument); })
        .then(function (pdfDataUrl) { 
          $ionicLoading.hide(); 
          console.log(pdfDataUrl);
          window.open(pdfDataUrl, '_blank');
          return;
        })
        .catch(function (e) {
          $ionicLoading.hide();
          showError(e);
        });
    }

    function createMobile(result) {
      $ionicLoading.show({ template: '<ion-spinner icon="spiral"></ion-spinner>' });

      generateDocumentDefinition(result)
        .then(function (docDefinition) { return generateDocument(docDefinition); })
        .then(function (pdfDocument) { return generateBuffer(pdfDocument); })
        .then(function (pdfBuffer) { return generateBlob(pdfBuffer); })
        .then(function (pdfBlob) { return saveFile(pdfBlob); })
        .then(function (pdfFilepath) { return openFile(pdfFilepath); })
        .then(function () { return $ionicLoading.hide(); })
        .catch(function (e) {
          $ionicLoading.hide();
          showError(e);
        });
    }

    function generateDocumentDefinition(result) {
      return new Promise(function (resolve, reject) {
        $timeout(function () {
          try {
            resolve(DocumentBuilderService.create(result));
          } catch(e) {
            reject(e);
          }
        }, 300);
      });
    }

    function generateDocument(docDefinition) {
      return new Promise(function (resolve, reject) {
        $timeout(function () {
          try {
            resolve(pdfMake.createPdf(docDefinition));
          } catch(e) {
            reject(e);
          }
        }, 100);
      });
    }

    function generateDataUrl(pdfDocument) {
      return new Promise(function (resolve, reject) {
        $timeout(function () {
          try {
            pdfDocument.getDataUrl(function (dataUrl) {
              resolve(dataUrl);
            });
          } catch(e) {
            reject(e);
          }
        }, 200);
      });
    }

    function generateBuffer(pdfDocument) {
      return new Promise(function (resolve, reject) {
        try {
          pdfDocument.getBuffer(function (buffer) {
            $timeout(function () {
              resolve(buffer);
            }, 200);
          });
        } catch (e) {
          reject(e);
        }
      });
    }

    function generateBlob(pdfBuffer) {
      return new Promise(function (resolve, reject) {
        try {
          var blob = new Blob([pdfBuffer], { type: 'application/pdf' });
          $timeout(function () {
            resolve(blob);
          }, 200);
        } catch(e) {
          reject(e);
        }
      });
    }

    function saveFile(pdfBlob) {
      return new Promise(function (resolve, reject) {
        var filePath = '';

        try {
          window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, reject);
        } catch (e) {
          reject(e);
        }     

        function gotFS(fileSystem) {
          fileSystem.root.getFile('rptSample.pdf', { create: true, exclusive: false }, gotFileEntry, reject);
        }

        function gotFileEntry(fileEntry) {
          filePath = fileEntry.toURL();
          fileEntry.createWriter(gotFileWriter, reject);
        }

        function gotFileWriter(writer) {
          writer.onwriteend = function(evt) {
            $timeout(function() {
              resolve(filePath);
            }, 500);
          };

          writer.onerror = function(e) {
            reject(e);
          };

          writer.write(pdfBlob);
        }
      });
    }

    function openFile(pdfFilepath) {
      return new Promise(function (resolve, reject) {
        try {
          $timeout(function () {
            window.cordova.plugins.fileOpener2.open(pdfFilepath, 'application/pdf', {
              error: reject,
              success: resolve
            });
          }, 500);
        } catch(e) {
          reject(e);
        }
      });
    }

    function showError(e) {
      $ionicPopup.alert({
        title: 'Ocorreu um erro inesperado ao tentar processar o arquivo.',
        template: e.message || JSON.stringify(e),
        okType: 'button-assertive'
      });
    }

    return {
      create: window.cordova ? createMobile : createWeb
    };
  }

})();
