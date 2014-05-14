'use strict';

applause.directive('progressBar', function() {

  var linkFn = function (scope, element) {
        var p = (scope.currentSlide / scope.lastSlide * 100).toFixed(2);
        element.css('width', p + '%');
      };

  return {
    template: '<div id="progress-bar"></div>',
    restrict: 'EA',
    replace: true,
    link: linkFn
  };
});
