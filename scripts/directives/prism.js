/* global Prism */

'use strict';

applause.directive('prism', function() {
  return {
    restrict: 'A',
    template: '<pre><code ng-transclude></code></pre>',
    replace: true,
    transclude: true,
    link: function ($scope, element) {
      element.ready(function() {
        Prism.highlightAll();
      });
    }
  };
});
