'use strict';

applause.factory('Appdata', function(config) {

  var slides = [];

  return {
    slides: slides,
    isPreviewMode: document.location.search === '?preview',
    getConfig: function() {
      return {
        progressBar: config.progressBar,
        slideCount: config.slideCount
      };
    }
  };
});
