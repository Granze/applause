'use strict';

applause.directive('fit', function () {

  var slide = document.querySelector('.slide'),
      x = window.innerWidth / slide.clientWidth,
      y = window.innerHeight / slide.clientHeight,
      scale = Math.min(x,y),
      rule,

      linkFn = function (scope, element) {
        rule = "scale(" + scale + ")";
        element[0].style.transform = rule;
        element[0].style.webkitTransform = rule;
      };

  //window.addEventListener('resize', linkFn, false);

  return {
    restrict: 'A',
    link: linkFn
  };
});
