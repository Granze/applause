'use strict';

applause.directive('slide', function () {

  var count = 1,

      linkFn = function(scope) {
        scope.n = count;
        count += 1;
      };

  return {
    template: '<section class="slide" ng-transclude="" ng-show="n === $parent.currentSlide" fit></section>',
    restrict: 'EA',
    transclude: true,
    scope: {},
    link: linkFn
  };
});
