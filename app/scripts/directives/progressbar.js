'use strict';

applause.directive('progressBar', function(Appdata) {

  var linkFn = function (scope, element) {
        scope.$watch(function () {
          return Appdata;
        }, function (data) {
          scope.lastSlide = data.slides.length;
          var p = (scope.currentSlide / scope.lastSlide * 100).toFixed(2);
          element.css('width', p + '%');
        }, true);
      };

  return {
    template: '<div id="progress-bar"></div>',
    restrict: 'EA',
    replace: true,
    link: linkFn
  };
});
