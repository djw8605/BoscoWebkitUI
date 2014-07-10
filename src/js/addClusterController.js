

addClusterModule = angular.module('boscouiApp.addClusterController', []);


addClusterModule.controller('addClusterController', ['$scope', '$log', function($scope, $log) {
  
  $scope.startConnection = function (cluster) {
    $log.info("Got startConnection...");
    $scope.output = cluster.hostname + cluster.password;
    
  };
  
  $log.info("Created ");
  
  
  
}]);
