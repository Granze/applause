'use strict';

applause.directive('note', function() {
  return {
    template: '<div ng-transclude></div>',
    restrict: 'E',
    transclude: true
  };
});
