addClusterWarningModule = angular.module('boscouiApp.addclusterWarningController', []);


addClusterWarningModule.controller('addclusterWarningController', ['$scope', '$log', '$timeout', function($scope, $log, $timeout) {
  

  
  var detectOS = function() {
    // Detect the platform, and set $scope.installbosco if it's a bosco supported platform
    process = require("process");
    var isWindows = /^win/.test(process.platform);
    $scope.boscoinstall = !isWindows
    
    
  }
  
  detectOS();
  
  
}]);
