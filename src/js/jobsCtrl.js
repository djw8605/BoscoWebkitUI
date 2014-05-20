(function() {
  var jobsController, jobsControllerModule;

  jobsControllerModule = angular.module('boscouiApp.jobsController', ['boscouiApp.jobsService']);

  jobsControllerModule.controller('jobsController', jobsController = (function() {
    function jobsController($scope, $log, jobsService) {
      this.$scope = $scope;
      this.$log = $log;
      this.jobsService = jobsService;
      this.$scope.jobs = [
        {
          id: '10401.0',
          submitted: '5/16 16:57',
          runtime: '0+00:00:00',
          state: 'I',
          cmd: 'run_test.sh',
          location: 'Tusker'
        }, {
          id: '10402.0',
          submitted: '5/16 16:57',
          runtime: '0+00:00:00',
          state: 'H',
          cmd: 'run_test.sh'
        }, {
          id: '10403.0',
          submitted: '5/16 16:57',
          runtime: '0+00:15:00',
          state: 'R',
          cmd: 'run_test.sh',
          location: 'Tusker'
        }
      ];
      this.getJobs();
      this.$scope.checkJobHeld = this.checkJobHeld;
      this.$scope.checkJobRunning = this.checkJobRunning;
    }

    jobsController.prototype.formatJobs = function(jobs) {
      var job, returnJobs, state, submitDate, tmpJob, wallClockTime, _i, _len;
      returnJobs = new Array();
      for (_i = 0, _len = jobs.length; _i < _len; _i++) {
        job = jobs[_i];
        tmpJob = {};
        tmpJob['id'] = "" + job.ClusterId + "." + job.ProcId;
        switch (job.JobStatus) {
          case 1:
            state = 'I';
            break;
          case 2:
            state = 'R';
            break;
          case 3:
            state = 'X';
            break;
          case 4:
            state = 'C';
            break;
          case 5:
            state = 'H';
            break;
          case 6:
            state = 'E';
        }
        tmpJob['state'] = state;
        submitDate = new Date(job.QDate * 1000);
        tmpJob.submitted = "" + (submitDate.getMonth()) + "/" + (submitDate.getDay()) + " " + (submitDate.getHours()) + ":" + (submitDate.getMinutes());
        wallClockTime = job.RemoteWallClockTime;
        tmpJob.runtime = "" + (wallClockTime / 86400) + "+" + (wallClockTime / (60 * 60)) + ":" + (wallClockTime / 60) + ":" + wallClockTime;
        tmpJob.cmd = job.Cmd.split('/').reverse()[0];
        tmpJob.rawJob = job;
        returnJobs.push(tmpJob);
      }
      return returnJobs;
    };

    jobsController.prototype.getJobs = function() {
      return this.jobsService.getJobs().then((function(_this) {
        return function(jobs) {
          _this.$scope.jobs = _this.formatJobs(jobs);
          _this.$log.info("Got jobs " + _this.$scope.jobs);
          return _this.$log.info(_this.$scope.jobs);
        };
      })(this));
    };

    jobsController.prototype.checkJobHeld = function(job) {
      if (job.state === 'H') {
        return true;
      } else {
        return false;
      }
    };

    jobsController.prototype.checkJobRunning = function(job) {
      if (job.state === 'R') {
        return true;
      } else {
        return false;
      }
    };

    return jobsController;

  })());

}).call(this);
