(function () {
  'use strict';

  angular
    .module('app')
    .controller('ResultController', ResultController);

  ResultController.$inject = ['$ionicHistory', 'ResultRepository', 'Types'];

  function ResultController($ionicHistory, ResultRepository, Types) {
    var vm = this;
    
    vm.result = ResultRepository.get();
    
    if (!vm.result) { return; }
    
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
    }
  }

})();
