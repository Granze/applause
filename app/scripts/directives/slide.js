'use strict';

applause.directive('slide', function () {

  var count = 1,

      linkFn = function(scope) {
        scope.n = count;
        count += 1;
        scope.$parent.lastSlide = document.getElementsByClassName('slide').length;
      };

  return {
    template: '<section class="slide" ng-transclude="" ng-show="n === $parent.currentSlide" fit></section>',
    restrict: 'EA',
    transclude: true,
    replace: true,
    scope: {},
    link: linkFn
  };
});
