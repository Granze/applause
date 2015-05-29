'use strict';

applause.directive('flipClock', function(Appdata, $timeout, $window) {

  var linkFn = function(scope) {

    var timer,
        startFrom,
        moment = $window.moment,
        createTimer = function() {
          if(scope.isRunning) {
            scope.time = timer.add(1, 's').format('HHmmss');
            $timeout(createTimer, 1000);
          }
        },
        createCountdown = function() {
          if (scope.isRunning) {
            if (scope.time > 0) {
              scope.time = timer.subtract(1, 's').format('HHmmss');
              $timeout(createCountdown, 1000);
            }
          }
        };
        scope.isRunning = false;
        startFrom = Appdata.startFrom;
        scope.time = '000000';
        scope.isPreviewMode = Appdata.data.isPreviewMode;
        scope.isCounterEnabled = Appdata.counter;

        scope.startCount = function() {
          if(!timer) {
            timer = moment().hours(0).minutes(startFrom || 0).seconds(0);
          }
          scope.isRunning = true;

          if(startFrom > 0) {
            createCountdown();
          } else {
            createTimer();
          }
        };
        scope.stopCount = function() {
          scope.isRunning = false;
        };
        scope.resetCount = function() {
          scope.isRunning = false;
          scope.time = startFrom ? '00' + startFrom + '00' : '000000';
          timer = null;
        };

        if(startFrom) {
          scope.time = '00' + startFrom + '00';
        } else {
          scope.time = '000000';
        }

  };

  return {
    template: '<div class="flip" ng-show="isPreviewMode && isCounterEnabled">' +
                '<div class="clock">' +
                  '<span id="hours0">{{time[0]}}</span><span id="hours1">{{time[1]}}</span> <b>:</b>' +
                  '<span id="minutes0">{{time[2]}}</span><span id="minutes1">{{time[3]}}</span> <b>:</b>' +
                  '<span id="seconds0">{{time[4]}}</span><span id="seconds1">{{time[5]}}</span>' +
                '</div>' +
                '<div class="commands">' +
                  '<button class="toggle btn" ng-click="startCount()" ng-disabled="isRunning">Start</button>' +
                  '<button class="toggle btn" ng-click="stopCount()">Stop</button>' +
                  '<button class="reset btn" ng-click="resetCount()">Reset</button>' +
                '</div>' +
              '</div>',
    restrict: 'E',
    replace: true,
    link: linkFn
  };
});
