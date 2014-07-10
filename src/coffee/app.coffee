

app = angular.module('boscouiApp', [ 'boscouiApp.sidebarController', 'boscouiApp.jobsController', 'boscouiApp.addClusterController', 'ngRoute' ])

  .config ['$routeProvider'
    ($routeProvider) ->
      $routeProvider

      .when('/', {
        templateUrl: 'html/jobsView.html',
        controller: 'jobsController'
        })

      .when('/cluster/:cluster', {
        templateUrl: 'html/clusterView.html',
        controller: 'clusterController'
        })
      .when('/addcluster_warning', {
        templateUrl: 'html/addcluster_warning.html'
        })
      .when('/addcluster', {
        templateUrl: 'html/addcluster.html',
        controller: 'addClusterController'
        })

      .otherwise({
        redirectTo: '/'
        })





  ]


# otherwise({
#                        redirectTo: '/profile/_default'
#                    });
