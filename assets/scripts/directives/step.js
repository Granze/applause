'use strict';

applause.directive('step', function() {

  var linkFn = function(scope, elem, attr) {
    scope.thisStep = attr.step;
    console.log(scope.thisStep);
  };

  return {
    template: '<article ng-show="slideList[$storage.currentSlide - 1].currentStep >= thisStep" ng-transclude></article>',
    restrict: 'A',
    transclude: true,
    replace: true,
    scope: true,
    link: linkFn
  };
});
