
sidebarControllerModule = angular.module 'boscouiApp.sidebarController', []

sidebarControllerModule.controller 'sidebarController',
  class sidebarController

    constructor: (@$scope) ->
      @clusters = [{name: 'Tusker', id: 'tusker'}, {name: 'Crane', id: 'crane'}]
      @$scope.clusters = @clusters


    getClusters: () ->
      # Get the clusters from the cluster manager

      # Set the clusters in the @$scope.clusters tag
