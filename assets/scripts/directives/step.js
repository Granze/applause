'use strict';

applause.directive('step', function(Appdata) {

  var linkFn = function(scope, elem, attr) {
    scope.thisStep = attr.step;
     if(Appdata.data.isPreviewMode) {
      scope.isPreview = true;
      console.log(scope.isPreview);
     }
  };

  return {
    template: '<article ng-show="slideList[$storage.currentSlide - 1].currentStep >= thisStep || isPreview" ng-transclude></article>',
    restrict: 'A',
    transclude: true,
    replace: true,
    scope: true,
    link: linkFn
  };
});
