'use strict';

applause.directive('markdown', function () {

  var converter = new Showdown.converter(),
    linkFn = function (scope, element, attrs) {
      var html = converter.makeHtml(element.text());
      element.html(html);
    };

  return {
    restrict: 'A',
    link: linkFn
  };
});