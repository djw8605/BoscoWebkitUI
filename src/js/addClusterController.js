

addClusterModule = angular.module('boscouiApp.addClusterController', [ 'ngAnimate' ]);

addClusterModule.controller('addClusterController', ['$scope', '$log', '$timeout', function($scope, $log, $timeout) {
  
  
  var conn = undefined;
  
  tryconnection = function () {

    consoleLog("Second connection ready");
    conn.exec('hostname -f', function(err, stream) {
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
    

  }
  
  reset_form = function() {
    $scope.$apply(function() {
      $scope.formDisabled = false;
    });
  }
  
  
  $scope.startConnection = function (cluster) {
    clearConsole();
    $scope.formDisabled = true;
    consoleLog("Got startConnection...");
    
    var Connection = require('ssh2');
    var fs = require('fs');
    var path = require('path');
    var key_path = path.join(process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'], '.ssh/id_rsa');
    var key = fs.readFileSync(key_path);
    
    conn = new Connection();
    
    conn.on('ready', function() {
      consoleLog("Connection ready");
      
      
      conn.exec('uptime', function(err, stream) {
        if (err) {
          consoleLog("ERROR: " + err, logseverity.ERROR);
          reset_form();
        }
        stream.on('exit', function(code, signal) {
          consoleLog('Stream :: exit :: code: ' + code + ', signal: ' + signal, logseverity.WARN);
          reset_form();
          
        }).on('close', function() {
          consoleLog('Stream :: close');
          reset_form();
        }).on('data', function(data) {
          $timeout(tryconnection, 5000);
          consoleLog('STDOUT: ' + data);
        }).stderr.on('data', function(data) {
          consoleLog('STDERR: ' + data, logseverity.ERROR);
        });
      });
      
      
    }).connect({
      host: cluster.hostname,
      port: 22,
      username: cluster.username,

      tryKeyboard: true,
      readyTimeout: 99999999

    });
    /*          debug: consoleLog */
    /*      password: cluster.password, */
    /*       privateKey: key, */
    conn.on('error', function(error) {
      
      consoleLog("Error: " + error.level, logseverity.ERROR);
      consoleLog(error, logseverity.ERROR);
      reset_form();
      
    }).on('keyboard-interactive', function(name, instructions, instructionsLang, prompts, finishFunc) {
      consoleLog("Got keyboard-interacive event");
      
      $scope.$apply(function() {
        // Put the prompt in the on-screen form
        $scope.cluster.promptResponse = "";
        $scope.cluster.prompt = prompts[0].prompt;
        $scope.cluster.promptReady = true;
        $scope.cluster.promptFinishFunc = finishFunc;
        $("#clusterPrompt").focus();
      });
      
      consoleLog("Name: " + name + ", instructions: " + instructions + ", prompts: " + prompts);
      consoleLog(prompts);
      
      /*
      if (prompts[0].prompt == "Password: ") {
        finishFunc([cluster.password]);
      } else {
        consoleLog(prompts[0].prompt);
        finishFunc(['1']);
      }
      */
      
    }).on('banner', function(message, language) {
      
      consoleLog("banner: " + message);
      
    });
    
    
  };
  
  logseverity = {
    NORMAL: 0,
    WARN: 1,
    ERROR: 2
  };
  
  
  $scope.submitPromptResponse = function(promptResponse) {
    
    $scope.cluster.promptFinishFunc([promptResponse]);
    $scope.cluster.promptReady = false;
    
  }
  
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
    
    $log.info(message);
    $('#sshConsole').append(consoleLine);
    
    // Scroll to bottom
    var objDiv = document.getElementById("sshConsole");
    objDiv.scrollTop = objDiv.scrollHeight;
    
    
  };
  
  $scope.updateConsoleHeight = function() {
    var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    var sshConsole = document.getElementById('sshConsole');
    rect = sshConsole.getBoundingClientRect()
    $(".sshConsole").height(height - rect.top - 30);
    
  }
  
  $(window).resize($scope.updateConsoleHeight);
  $(window).load($scope.updateConsoleHeight);
  
  process.on("uncaughtException", function(err) { alert("error: " + err); });
  
}]);
