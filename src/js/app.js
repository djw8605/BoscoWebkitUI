(function() {
  var app;

  app = angular.module('boscouiApp', ['boscouiApp.sidebarController', 'boscouiApp.jobsController', 'ngRoute']).config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/', {
        templateUrl: 'html/jobsView.html',
        controller: 'jobsController'
      }).when('/cluster/:cluster', {
        templateUrl: 'html/clusterView.html',
        controller: 'clusterController'
      }).otherwise({
        redirectTo: '/'
      });
    }
  ]);

}).call(this);
