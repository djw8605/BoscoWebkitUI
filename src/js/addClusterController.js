

addClusterModule = angular.module('boscouiApp.addClusterController', []);


addClusterModule.controller('addClusterController', ['$scope', '$log', function($scope, $log) {
  
  $scope.startConnection = function (cluster) {
    clearConsole();
    $scope.formDisabled = true;
    consoleLog("Got startConnection...");
    
    var Connection = require('ssh2');
    var fs = require('fs');
    var path = require('path');
    var key_path = path.join(process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'], '.ssh/id_rsa');
    var key = fs.readFileSync(key_path);
    
    var conn = new Connection();
    
    conn.on('ready', function() {
      consoleLog("Connection ready");
      
      
      conn.exec('uptime', function(err, stream) {
        if (err) throw err;
        stream.on('exit', function(code, signal) {
          consoleLog('Stream :: exit :: code: ' + code + ', signal: ' + signal, logseverity.WARN);
        }).on('close', function() {
          consoleLog('Stream :: close');
          conn.end();
        }).on('data', function(data) {
          consoleLog('STDOUT: ' + data);
        }).stderr.on('data', function(data) {
          consoleLog('STDERR: ' + data, logseverity.ERROR);
        });
      });
      
      
    }).connect({
      
      host: cluster.hostname,
      
      port: 22,
      
      username: cluster.username,
      
      privateKey: key
      
    }).on('error', function(error) {
      
      consoleLog("Error: " + error.level, logseverity.ERROR);
      consoleLog(error, logseverity.ERROR);
      
    });
    
    
  };
  
  logseverity = {
    NORMAL: 0,
    WARN: 1,
    ERROR: 2
  };
  
  clearConsole = function() {
    $('#sshConsole').empty();
  }
  
  consoleLog = function (message, severity) {
    
    severity = typeof severity !== 'undefined' ? severity : logseverity.NORMAL;

    // Create the new object
    consoleLine = $('<span></span>');
    consoleLine.text(message);
    
    switch (severity) {
      case logseverity.NORMAL:
        consoleLine.addClass('console-normal');
        break;
      case logseverity.WARN:
        consoleLine.addClass('console-warn');
        break;
      case logseverity.ERROR:
        consoleLine.addClass('console-error');
        break;
      default:
        $log.error("Unkown severity level: " + severity);
        
    }
    
    $('#sshConsole').append(consoleLine);
    
    
  };
  
  $scope.updateConsoleHeight = function() {
    var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    var sshConsole = document.getElementById('sshConsole');
    rect = sshConsole.getBoundingClientRect()
    $(".sshConsole").height(height - rect.top - 30);
    
  }
  
  $(window).resize($scope.updateConsoleHeight);
  
  
  
}]);
