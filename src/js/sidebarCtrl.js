(function() {
  var sidebarController, sidebarControllerModule;

  sidebarControllerModule = angular.module('boscouiApp.sidebarController', []);

  sidebarControllerModule.controller('sidebarController', sidebarController = (function() {
    function sidebarController($scope) {
      this.$scope = $scope;
      this.clusters = [
        {
          name: 'Tusker',
          id: 'tusker'
        }, {
          name: 'Crane',
          id: 'crane'
        }
      ];
      this.$scope.clusters = this.clusters;
    }

    sidebarController.prototype.getClusters = function() {};

    return sidebarController;

  })());

}).call(this);
