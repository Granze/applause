'use strict';

applause.directive('markdown', function ($window) {

  function removeSpaceAround(string){
    return string.split(/\n/g)
      .reduce(function(res, item){
        return res += item.replace(/^\s+|\s+$/gmi, '') + '\n';
      },'');
  }


  var converter = new $window.Showdown.converter(),
      linkFn = function (scope, element) {
        var txt = removeSpaceAround(element.text());
        element.html(converter.makeHtml(txt));
      };

  return {
    restrict: 'EA',
    link: linkFn
  };
});
