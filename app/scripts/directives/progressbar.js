'use strict';

applause.directive('progressBar', function($timeout) {

  var linkFn = function (scope, element) {
    //TODO replace this with something that works
    $timeout(function () {
          var p = (scope.currentSlide / scope.lastSlide() * 100).toFixed(2);
          element.css('width', p + '%');
        }, 0);
      };

  return {
    template: '<div id="progress-bar"></div>',
    restrict: 'EA',
    replace: true,
    link: linkFn
  };
});
