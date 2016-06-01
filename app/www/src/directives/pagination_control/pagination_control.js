(function () {
  'use strict';

  angular
    .module('app')
    .directive('paginationControl', function () {
      var directive = {
        restrict: 'E',
        scope: {
          total: '&',
          steps: '&'
        },
        templateUrl: 'src/directives/pagination_control/pagination_control.html',
        controller: PaginationControlController,
        controllerAs: 'vm',
        bindToController: true,
        replace: true
      };

      PaginationControlController.$inject = ['$state', '$ionicScrollDelegate'];

      function PaginationControlController($state, $ionicScrollDelegate) {
        var vm = this;
        
        vm.currentPage = Number($state.params.page) || 1;
        vm.totalPages = Math.ceil(Number(vm.total()) / Number(vm.steps()));
        
        vm.change = function () {
          $state.go('.', { page: vm.currentPage },  { notify: false });
          $ionicScrollDelegate.scrollTop();
        }
        
        vm.next = function () {
          vm.currentPage = Number(vm.currentPage) + 1;
          vm.change();
        }
        
        vm.prev = function () {
          vm.currentPage = Number(vm.currentPage) - 1;
          vm.change();
        }
      }

      return directive;
    });

})();
