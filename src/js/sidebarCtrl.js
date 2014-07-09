(function() {
  var sidebarController, sidebarControllerModule;

  sidebarControllerModule = angular.module('boscouiApp.sidebarController', []);

  sidebarControllerModule.controller('sidebarController', sidebarController = (function() {
    function sidebarController($scope) {
      this.$scope = $scope;
      this.clusters = [
        {
          name: 'Tusker',
          id: 'tusker',
          errored: 4,
          running: 10
        }, {
          name: 'Crane',
          id: 'crane',
          errored: 12,
          running: 3
        }
      ];
      this.$scope.clusters = this.clusters;
    }

    sidebarController.prototype.getClusters = function() {};

    return sidebarController;

  })());

}).call(this);
