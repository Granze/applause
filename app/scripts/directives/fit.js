'use strict';

applause.directive('fit', function ($window) {

  var linkFn = function (scope, element) {
    scope.resizeSlide = function () {
      var slide = $window.document.querySelector('.slide'),
        x = $window.innerWidth / slide.clientWidth,
        y = $window.innerHeight / slide.clientHeight,
        scale = Math.min(x, y),
        rule = 'scale(' + scale + ') translate(-50%, -50%)';

      element.css({
        'transformOrigin': '0 0',
        'webkitTransformOrigin': '0 0',
        'transform': rule,
        'webkitTransform': rule
      });
    };

    scope.resizeSlide();

    angular.element($window).bind('resize', function() {
      scope.resizeSlide();
      scope.$apply();
    });
  };

  return {
    link: linkFn
  };

});
