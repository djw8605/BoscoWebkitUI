
sidebarControllerModule = angular.module 'boscouiApp.sidebarController', []

sidebarControllerModule.controller 'sidebarController',
  class sidebarController

    constructor: (@$scope) ->
      @clusters = [{name: 'Tusker', id: 'tusker', errored: 4, running: 10}, {name: 'Crane', id: 'crane', errored: 12, running: 3}]
      @$scope.clusters = @clusters


    getClusters: () ->
      # Get the clusters from the cluster manager

      # Set the clusters in the @$scope.clusters tag
