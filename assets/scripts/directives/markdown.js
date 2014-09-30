'use strict';

applause.directive('markdown', function ($window) {

  if (!String.prototype.trim) {
    String.prototype.trim = function () {
      return this.replace(/^\s+|\s+$/g, '');
    };
  }

  var converter = new $window.Showdown.converter(),
      linkFn = function (scope, element) {
        element.html(converter.makeHtml(element.text().trim()));
      };

  return {
    restrict: 'EA',
    link: linkFn
  };
});
