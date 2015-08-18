'use strict';

angular.module('applauseApp').directive('markdown', function ($window) {

  function removeSpaceAround(string){
    return string.split(/\n/g)
      .reduce(function(res, item){
        /*eslint-disable */
        return res += item.replace(/^\s+|\s+$/gmi, '') + '\n';
        /*eslint-enable */
      }, '');
  }

  /*eslint-disable */
  var converter = new $window.Showdown.converter(),
  /*eslint-enable */
      linkFn = function (scope, element) {
        var txt = removeSpaceAround(element.text());
        element.html(converter.makeHtml(txt));
      };

  return {
    restrict: 'EA',
    link: linkFn
  };
});
