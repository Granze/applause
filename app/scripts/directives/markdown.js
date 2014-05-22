'use strict';

applause.directive('markdown', function ($window) {

  var converter = new $window.Showdown.converter(),
      linkFn = function (scope, element) {
        element.html(converter.makeHtml(element.text()));
      };

  return {
    restrict: 'EA',
    link: linkFn
  };
});
