(function () {
  'use strict';

  angular
    .module('app')
    .directive('answerer', function () {
      var directive = {
        restrict: 'E',
        scope: {
          model: '=ngModel',
          onAnswer: '&'
        },
        templateUrl: 'src/directives/answerer/answerer.html',
        controller: AnswererController,
        controllerAs: 'vm',
        bindToController: true
      };

      AnswererController.$inject = [];

      function AnswererController() {
        var vm = this;

        vm.model = vm.model || 0;

        vm.change = function (value) {
          vm.model = value;
          vm.onAnswer();
        }
      }

      return directive;
    });

})();
