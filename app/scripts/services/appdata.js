'use strict';

applause.factory('Appdata', function(config) {

  var slides = [],
      configObj = angular.fromJson(config),
      appObj = {
        slides: slides,
        isPreviewMode: document.location.search === '?preview'
      };

  return angular.extend(configObj, appObj);
});
