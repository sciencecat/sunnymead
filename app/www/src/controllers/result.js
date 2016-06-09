(function () {
  'use strict';

  angular
    .module('app')
    .controller('ResultController', ResultController);

  ResultController.$inject = ['$scope', '$ionicHistory', 'ResultRepository', 'Types', '$localStorage', '$state', '$ionicPopup', '$ionicModal', '$ionicLoading', '$http', '$document', 'Config'];

  function ResultController($scope, $ionicHistory, ResultRepository, Types, $localStorage, $state, $ionicPopup, $ionicModal, $ionicLoading, $http, $document, Config) {
    var vm = this;
    
    vm.result = ResultRepository.get();
    
    if (!vm.result) { return; }
    
    $ionicModal.fromTemplateUrl('templates/email.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      vm.modal = modal;
    });
    
    vm.chartOptions = {
      tooltipTemplate: function(v) { return v.value; }
    };
    
    vm.chartLabels = vm.result.totals
      .sort(function (left, right) { return left.type - right.type; })
      .map(function (item) { return item.type; });
    
    vm.chartData = [vm.result.totals
      .sort(function (left, right) { return left.type - right.type; })
      .map(function (item) { return item.total; })];
    
    vm.getTypeDescription = function (type) {
      return Types.filter(function (item) {
        return item.type === type
      })[0].description;
    };
    
    vm.openEmailModal = function () {
      vm.addEmail();
      vm.modal.show();
    };
    
    vm.closeEmailModal = function () {
      vm.emailList = [];
      vm.modal.hide();
    };
    
    vm.addEmail = function () {
      if (!angular.isArray(vm.emailList)) {
        vm.emailList = [];
      }
      
      vm.emailList.push({
        destination: null
      });
    };
    
    vm.getImageFromCanvas = function () {
      var canvas = $document.find('canvas')[0];
      
      return canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    };
    
    vm.sendEmail = function () {
      $ionicLoading.show({ template: '<ion-spinner icon="spiral"></ion-spinner>' });
      
      var form = new FormData();
      
      form.append('destinations', vm.emailList.filter(function (email) { return email.destination; }));
      form.append('result', vm.result);
      form.append('image', vm.getImageFromCanvas());
      
      $http.post(Config.sendEmailUrl, {
        transformRequest: angular.identity,
        headers: { 'Content-Type': undefined }
      })
      .then(function (response) {
        $ionicPopup.alert({
         title: 'Enviado',
         template: 'Os emails serão enviados. Eles podem demorar alguns minutos para chegarem aos destinatários.',
         okType: 'button-positive'
       });
      })
      .catch(function (error) {
        $ionicPopup.alert({
         title: 'Não foi possível enviar',
         template: 'Não foi possível enviar. Verifique se sua conexão com a internet está estável.',
         okType: 'button-assertive'
       });
      })
      .finally(function () {
        vm.closeEmailModal();
        $ionicLoading.hide();
      });
    };
    
    vm.cleanStorage = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Excluir questionário',
        template: '<p>Ao <b>excluir</b> o questionário atual será possível realizá-lo novamente.</p>' + 
                  '<p>Porém, o questionário excluido <b>não poderá ser restaurado</b></p>' +
                  '<p>Você realmente tem certeza que deseja continuar?</p>',
        buttons: [
          { text: '<b>Cancelar</b>' },
          {
            text: 'Confirmar',
            type: 'button-assertive',
            onTap: function() { return true; }
          }
        ]
      });
    
      confirmPopup.then(function(res) {
        if(!res) {
          return;
        }
        
        $localStorage.$reset();
        
        $ionicHistory.removeBackView();
        $ionicHistory.clearHistory();
        $state.go('app.result', {}, { reload: true });
      });
    };
  }

})();
