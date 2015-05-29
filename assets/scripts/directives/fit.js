'use strict';

applause.directive('fit', function ($window, Appdata) {

  var linkFn = function (scope, element) {

    scope.resizeSlide = function () {

      var slide = $window.document.querySelector('.slide'),
          x = $window.innerWidth / slide.clientWidth,
          y = $window.innerHeight / slide.clientHeight,
          scale = Math.min(x, y);

      if(Appdata.data.isPreviewMode) {
        element.css({
          'transformOrigin': '0 0',
          'webkitTransformOrigin': '0 0',
          'transform': 'scale(' + scale/2 + ')',
          'webkitTransform': 'scale(' + scale/2 + ')'
        });
      } else {
        element.css({
          'transformOrigin': 'left top',
          'webkitTransformOrigin': 'left top',
          'transform': 'scale(' + scale + ') translate(-50%, -50%)',
          'webkitTransform': 'scale(' + scale + ') translate(-50%, -50%)'
        });
      }
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
