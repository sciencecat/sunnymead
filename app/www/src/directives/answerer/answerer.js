(function () {
  'use strict';

  angular
    .module('app')
    .directive('answerer', function () {
      var directive = {
        restrict: 'E',
        bindToController: {
          model: '=ngModel'
        },
        templateUrl: 'src/directives/answerer/answerer.html',
        controller: AnswererController,
        controllerAs: 'vm'
      };

      AnswererController.$inject = [];

      function AnswererController() {
        var vm = this;

        vm.model = vm.model || 0;

        vm.change = function (value) {
          vm.model = value;
        }
      }

      return directive;
    });

})();
