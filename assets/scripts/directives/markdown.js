'use strict';

applause.directive('markdown', function ($window) {

  if (!String.prototype.trim) {
    String.prototype.trim = function () {
      return this.replace(/^\s+|\s+$/gmi, '');
    };
  }

  var converter = new $window.Showdown.converter(),
      linkFn = function (scope, element) {
        var txt = element.text().trim();
        console.log(txt);
        element.html(converter.makeHtml(txt));
      };

  return {
    restrict: 'EA',
    link: linkFn
  };
});
