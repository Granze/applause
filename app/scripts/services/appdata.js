'use strict';

applause.factory('Appdata', function (config, localStorageService) {

  localStorageService.clearAll();
  localStorageService.set('currentSlide', 1);

  var slides = [],
      currentSlide = parseInt(localStorageService.get('currentSlide'));

  return {
    slides: slides,
    currentSlide: currentSlide,
    getConfig: function () {
      return {
        progressBar: config.progressBar,
        slideCount: config.slideCount
      };
    }
  };
});
