'use strict';

applause.directive('fit', function ($window) {

  var linkFn = function (scope, element) {
    scope.resizeSlide = function () {
      var slide = $window.document.querySelector('.slide'),
        x = $window.innerWidth / slide.clientWidth,
        y = $window.innerHeight / slide.clientHeight,
        scale = Math.min(x, y),
        fromTop = ($window.innerHeight - (slide.clientHeight * scale)) / 2,
        fromLeft = ($window.innerWidth - (slide.clientWidth * scale)) / 2,
        rule = 'scale(' + scale + ')';

      element.css({
        'transformOrigin': '0 0',
        'webkitTransformOrigin': '0 0',
        'transform': rule,
        'webkitTransform': rule,
        'top': fromTop + 'px',
        'left': fromLeft + 'px'
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
