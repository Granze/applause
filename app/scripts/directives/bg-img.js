'use strict';

applause.directive('bgImg', function ($filter) {

  var linkFn = function (scope, element, attrs) {
        element.css({
          'background': 'transparent url(' + attrs.bgImg + ') no-repeat 0 0',
          'background-size': 'cover'
        });
        if(attrs.credits) {
          var creditsTxt = $filter('linky')(attrs.credits),
              credits = '<div class="credits">Photo credits: ' + creditsTxt + '</div>';
          element.append(credits);
        }
      };

  return {
    restrict: 'A',
    link: linkFn
  };
});
