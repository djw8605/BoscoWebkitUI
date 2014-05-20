jobsModule = angular.module 'boscouiApp.jobsService', []


jobsModule.service 'jobsService',
  class JobsService
    constructor: (@$q, @$log) ->
      @htcondor = require("htcondor")
      fs = require('fs')
      path = require('path')

      # Doesn't work!
      # homeDir = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];

      homeDir = process.env['HOME'];
      @$log.info("homeDir = ")
      @$log.info(homeDir)

      environment = process.env

      if ( fs.existsSync(path.join(homeDir, 'bosco') ) )
        @htcondor.config['condorLocation'] = path.join(homeDir, 'bosco')
        @htcondor.config['condorConfig'] = path.join(homeDir, 'bosco/etc/condor_config')

      @$log.info("Required htcondor")

      @job_defer = @$q.defer()
      @htcondor.q().then (jobs) =>
        @jobs = jobs
        @job_defer.resolve(jobs)
        @$log.info("Got jobs: #{jobs}")
        @$log.info(jobs)
      , (error) =>
        @$log.error("Got error from jobs #{error}")
        @job_defer.reject(error)


    getJobs: () ->
      # Get all of the jobs and their state
      getJobs_defer = @$q.defer()
      @job_defer.promise.then (jobs) =>
        getJobs_defer.resolve(@jobs)
      , (error) =>
        getJobs_defer.reject(error)


      return getJobs_defer.promise
