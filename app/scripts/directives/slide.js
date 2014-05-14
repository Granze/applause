'use strict';

applause.directive('slide', function (Appdata) {

  var count = 1,

      linkFn = function(scope) {
        scope.n = count;
        Appdata.slides.push(count);
        count += 1;
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
