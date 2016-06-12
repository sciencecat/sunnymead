(function () {
  'use strict';

  angular
    .module('app')
    .controller('ResultController', ResultController);

  ResultController.$inject = ['$scope', '$ionicHistory', 'UserRepository', 'ResultRepository', 'Types', '$localStorage', '$state', '$ionicPopup', '$ionicModal', '$ionicLoading', '$http', '$document', 'Config', 'PDFCreatorService'];

  function ResultController($scope, $ionicHistory, UserRepository, ResultRepository, Types, $localStorage, $state, $ionicPopup, $ionicModal, $ionicLoading, $http, $document, Config, PDFCreatorService) {
    var vm = this;
    
    vm.result = ResultRepository.get();
    
    if (!vm.result) { return; }
    
    vm.email = {
      user: UserRepository.get()
    };
    
    $ionicModal.fromTemplateUrl('templates/email.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      vm.modal = modal;
    });
    
    vm.chartOptions = {
      tooltipTemplate: function(v) { return v.value; },
      scaleOverride: true,
      scaleSteps: 5,
      scaleStepWidth: 1,
      scaleStartValue: 0
    };
    
    vm.chartOptionsFull = {
      tooltipTemplate: function(v) { return v.value; },
      responsive: false,
      scaleOverride: true,
      scaleSteps: 5,
      scaleStepWidth: 1,
      scaleStartValue: 0,
      animation: false
    };
    
    vm.chartLabels = vm.result.totals
      .sort(function (left, right) { return left.type - right.type; })
      .map(function (item) { return item.type; });
      
    vm.chartLabelsFull = vm.result.totals
      .sort(function (left, right) { return left.type - right.type; })
      .map(function (item) { return 'Tipo ' + item.type + ' - ' + item.total + ' pts'; });
    
    vm.chartData = [vm.result.totals
      .sort(function (left, right) { return left.type - right.type; })
      .map(function (item) { return item.total; })];
    
    vm.openEmailModal = function () {
      vm.addDestination();
      vm.modal.show();
    };
    
    vm.closeEmailModal = function () {
      vm.email.destinations = [];
      vm.modal.hide();
    };
    
    vm.addDestination = function () {
      if (!angular.isArray(vm.email.destinations)) {
        vm.email.destinations = [];
      }
      
      vm.email.destinations.push({ email: null });
    };
    
    vm.getValidDestinations = function () {
      if (!vm.email.destinations) {
        return [];
      }
      
      return vm.email.destinations.filter(function (e) { return e.email; });
    };
    
    vm.sendEmail = function () {
      $ionicLoading.show({ template: '<ion-spinner icon="spiral"></ion-spinner>' });
      
      UserRepository.save(vm.email.user);
      
      var body = {
        destinations: vm.getValidDestinations(),
        user: vm.email.user,
        result: vm.result,
      };
      
      $http.post(Config.sendEmailUrl, body)
      .then(function (response) {
        $ionicPopup.alert({
         title: 'Enviado',
         template: 'Os emails serão enviados. Eles podem demorar alguns minutos para chegarem aos destinatários.',
         okType: 'button-positive'
       });
      })
      .catch(function (response) {
        var template = 'Não foi possível enviar. Verifique se sua conexão com a internet está estável.';

        if (response.status === 404) {
      	  template = 'Não foi possível conectar o serviço de emails. Tente novamente mais tarde';
        }
        
        if (response.status === 400 && response.data) {
          template = '<p><b>Houve um erro ao enviar os emails. Segue a mensagem do serviço:</b><p>';
        }

        template += '<text-area disabled="true">' + response.status + ': ' + response.data + '</text-area>';

        $ionicPopup.alert({
          title: 'Não foi possível enviar',
          template: template,
          okType: 'button-assertive'
        });
      })
      .finally(function () {
        vm.closeEmailModal();
        $ionicLoading.hide();
      });
    };

    vm.savePdf = function () {
      vm.result.graphImageURL = document.querySelector('#hidden-radar').toDataURL();
      PDFCreatorService.create(vm.result);
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
