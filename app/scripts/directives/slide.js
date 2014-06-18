'use strict';

applause.directive('slide', function (Appdata) {

  var count = 1,

      linkFn = function (scope) {
        scope.n = count;
        Appdata.slides.push(count);
        count += 1;
      };

  return {
    template: '<section class="slide" ng-class="{previous: n === currentSlide-1, current: n === currentSlide, next: n === currentSlide+1}" ng-transclude="" fit></section>',
    restrict: 'E',
    transclude: true,
    replace: true,
    scope: true,
    link: linkFn
  };
});
