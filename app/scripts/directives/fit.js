'use strict';

applause.directive('fit', function ($window) {

  var slide = document.querySelector('.slide'),
      x = $window.innerWidth / slide.clientWidth,
      y = $window.innerHeight / slide.clientHeight,
      scale = Math.min(x,y),
      fromTop = ($window.innerHeight - (slide.clientHeight * scale)) / 2,
      fromLeft = ($window.innerWidth - (slide.clientWidth * scale)) / 2,
      rule,

      linkFn = function (scope, element) {
        rule = 'scale(' + scale + ')';
        element.css('transform', rule);
        element.css('webkitTransform', rule);
        element.css('top', fromTop + 'px');
        element.css('left', fromLeft + 'px');
      };

  return {
    restrict: 'A',
    link: linkFn
  };
});
