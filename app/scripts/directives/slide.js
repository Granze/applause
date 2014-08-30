'use strict';

applause.directive('slide', function(Appdata) {

  var count = 1,

      linkFn = function(scope) {
        scope.n = count;
        scope.isPreviewMode = Appdata.isPreviewMode;
        Appdata.slides.push(count);
        count += 1;
      };

  return {
    template: '<section class="slide" ng-class="{previous: n === $storage.currentSlide-1, current: n === $storage.currentSlide, next: n === $storage.currentSlide+1, preview: isPreviewMode}" ng-transclude fit></section>',
    restrict: 'E',
    transclude: true,
    replace: true,
    scope: true,
    link: linkFn
  };
});
