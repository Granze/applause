'use strict';

applause.directive('bgImg', function () {

  var linkFn = function (scope, element, attrs) {
        element.css({
          'background': 'transparent url(' + attrs.bgImg + ') no-repeat 0 0',
          'background-size': 'cover'
        });
      };

  return {
    restrict: 'A',
    link: linkFn
  };
});
