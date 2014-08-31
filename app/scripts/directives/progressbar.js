'use strict';

applause.directive('progressBar', function() {

  var linkFn = function(scope, element) {
    scope.$watch(function(data) {
      var p = (scope.$storage.currentSlide / data.lastSlide * 100).toFixed(2);
      element.css('width', p + '%');
    });
  };

  return {
    template: '<div id="progress-bar"></div>',
    restrict: 'E',
    replace: true,
    link: linkFn
  };
});
