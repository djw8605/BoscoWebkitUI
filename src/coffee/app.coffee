

app = angular.module('boscouiApp', [ 'boscouiApp.sidebarController', 'boscouiApp.jobsController', 'ngRoute' ])

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

      .otherwise({
        redirectTo: '/'
        })





  ]


# otherwise({
#                        redirectTo: '/profile/_default'
#                    });
