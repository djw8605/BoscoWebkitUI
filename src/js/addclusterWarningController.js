addClusterWarningModule = angular.module('boscouiApp.addclusterWarningController', []);


addClusterWarningModule.controller('addclusterWarningController', ['$scope', '$log', '$timeout', function($scope, $log, $timeout) {
  

  
  var detectOS = function() {
    // Detect the platform, and set $scope.installbosco if it's a bosco supported platform
    var isWindows = /^win/.test(process.platform);
    $scope.installbosco = !isWindows
    
    
  }
  
  detectOS();
  
  
}]);
