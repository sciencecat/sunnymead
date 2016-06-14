(function () {
  'use strict';

  angular
    .module('app')
    .controller('InfoController', InfoController);

  InfoController.$inject = ['$ionicModal', '$scope', 'Types'];

  function InfoController($ionicModal, $scope, Types) {
    var vm = this;
    
    vm.types = Types;
    
    vm.currentDetailModal = null;
    
    vm.openTypeDetailModal = function (type) {
      if (vm.currentDetailModal) {
        return;
      }
      
      vm.currentDetailModal = $ionicModal.fromTemplateUrl('templates/type_' + type + '_detail.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        vm.currentDetailModal = modal;
        vm.currentDetailModal.show();
      });
    };
    
    vm.closeDetailModal = function () {
      if (!vm.currentDetailModal || !vm.currentDetailModal.hide) {
        return;
      }
      
      vm.currentDetailModal.hide();
      vm.currentDetailModal = null;
    };
  }

})();
