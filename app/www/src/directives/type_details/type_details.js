(function () {
  'use strict';

  angular
    .module('app')
    .directive('typeDetails', function () {
      var directive = {
        restrict: 'E',
        scope: {
          type: '@'
        },
        templateUrl: 'src/directives/type_details/type_details.html',
        controller: TypeDetailsController,
        controllerAs: 'vm',
        bindToController: true,
        transclude: true
      };

      TypeDetailsController.$inject = [
        '$scope', 'TypesRepository', '$ionicModal', '$element', '$q',
        '$ionicLoading'
      ];

      function TypeDetailsController(
        $scope, TypesRepository, $ionicModal, $element, Promise,
        $ionicLoading
      ) {
        var vm = this;
        
        vm.modal = null;
        vm.open = open;
        vm.close = close;
        
        function open() {
          $ionicLoading.show({ template: '<ion-spinner icon="spiral"></ion-spinner>' });
          
          var getType = TypesRepository.getByType(vm.type);
          var getModal =  $ionicModal.fromTemplateUrl('src/directives/type_details/modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
          });
          
          Promise.all({ type: getType, modal: getModal }).then(function (results) {
            vm.data = results.type;
            vm.modal = results.modal;
            $ionicLoading.hide();
          
            vm.modal.show();
          });
        }
        
        function close() {
          if (vm.modal) {
            vm.modal.hide();
          }
        }
      }

      return directive;
    });

})();