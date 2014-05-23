'use strict';

applause.directive('bgImg', function () {

  var linkFn = function (scope, element, attrs) {
        element.css({
          'background': 'transparent url(' + attrs.bgImg + ') no-repeat 0 0',
          'background-size': 'cover'
        });
        if(attrs.credits) {
          var credits = '<div class="credits">Photo credits: ' + attrs.credits + '</div>';
          element.append(credits);
        }
      };

  return {
    restrict: 'A',
    link: linkFn
  };
});
