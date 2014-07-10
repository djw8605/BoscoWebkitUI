jobsControllerModule = angular.module 'boscouiApp.jobsController', ['boscouiApp.jobsService']

jobsControllerModule.controller 'jobsController',
  class jobsController

    constructor: (@$scope, @$log, @jobsService, @$location) ->
      @$scope.jobs = [
        {id: '10401.0', submitted: '5/16 16:57', runtime: '0+00:00:00', state: 'I', cmd: 'run_test.sh', location: 'Tusker'},
        {id: '10402.0', submitted: '5/16 16:57', runtime: '0+00:00:00', state: 'H', cmd: 'run_test.sh'},
        {id: '10403.0', submitted: '5/16 16:57', runtime: '0+00:15:00', state: 'R', cmd: 'run_test.sh', location: 'Tusker'},

      ]

      @getJobs()
      @$scope.checkJobHeld = @checkJobHeld
      @$scope.checkJobRunning = @checkJobRunning



    formatJobs: (jobs) ->
      returnJobs = new Array()
      for job in jobs
        tmpJob = {}
        tmpJob['id'] = "#{job.ClusterId}.#{job.ProcId}"
        switch job.JobStatus
          when 1 then state = 'I'
          when 2 then state = 'R'
          when 3 then state = 'X'
          when 4 then state = 'C'
          when 5 then state = 'H'
          when 6 then state = 'E'
        tmpJob['state'] = state

        submitDate = new Date(job.QDate * 1000)
        tmpJob.submitted = "#{submitDate.getMonth()}/#{submitDate.getDay()} #{submitDate.getHours()}:#{submitDate.getMinutes()}"

        wallClockTime = job.RemoteWallClockTime
        tmpJob.runtime = "#{wallClockTime / 86400}+#{wallClockTime / (60*60)}:#{wallClockTime/60}:#{wallClockTime}"

        tmpJob.cmd = job.Cmd.split('/').reverse()[0];
        tmpJob.rawJob = job

        returnJobs.push(tmpJob)

      return returnJobs



    getJobs: () ->
      # Get the jobs from the cluster manager
      @jobsService.getJobs().then (jobs) =>
        @$scope.jobs = @formatJobs(jobs)

        @$log.info("Got jobs #{@$scope.jobs}")
        @$log.info(@$scope.jobs)
      , (error) =>
        @$location.path ( "/addcluster_warning" )
        
      





      # Set the clusters in the @$scope.jobs tag


    checkJobHeld: (job) ->
      if job.state == 'H'
        true
      else
        false

    checkJobRunning: (job) ->
      if job.state == 'R'
        true
      else
        false
