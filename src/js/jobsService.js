(function() {
  var JobsService, jobsModule;

  jobsModule = angular.module('boscouiApp.jobsService', []);

  jobsModule.service('jobsService', JobsService = (function() {
    function JobsService($q, $log) {
      var environment, fs, homeDir, path;
      this.$q = $q;
      this.$log = $log;
      this.htcondor = require("htcondor");
      fs = require('fs');
      path = require('path');
      homeDir = process.env['HOME'];
      this.$log.info("homeDir = ");
      this.$log.info(homeDir);
      environment = process.env;
      if (fs.existsSync(path.join(homeDir, 'bosco'))) {
        this.htcondor.config['condorLocation'] = path.join(homeDir, 'bosco');
        this.htcondor.config['condorConfig'] = path.join(homeDir, 'bosco/etc/condor_config');
      }
      this.$log.info("Required htcondor");
      this.job_defer = this.$q.defer();
      this.htcondor.q().then((function(_this) {
        return function(jobs) {
          _this.jobs = jobs;
          _this.job_defer.resolve(jobs);
          _this.$log.info("Got jobs: " + jobs);
          return _this.$log.info(jobs);
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Got error from jobs " + error);
          return _this.job_defer.reject(error);
        };
      })(this));
    }

    JobsService.prototype.getJobs = function() {
      var getJobs_defer;
      getJobs_defer = this.$q.defer();
      this.job_defer.promise.then((function(_this) {
        return function(jobs) {
          return getJobs_defer.resolve(_this.jobs);
        };
      })(this), (function(_this) {
        return function(error) {
          return getJobs_defer.reject(error);
        };
      })(this));
      return getJobs_defer.promise;
    };

    return JobsService;

  })());

}).call(this);
