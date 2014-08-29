'use strict';

applause.factory('Appdata', function(config) {

  var slides = [];

  return {
    slides: slides,
    getConfig: function() {
      return {
        progressBar: config.progressBar,
        slideCount: config.slideCount
      };
    }
  };
});
