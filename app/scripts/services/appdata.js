'use strict';

applause.factory('Appdata', function () {

  var slides = [],
      currentSlide = 1;

  return {
    slides: slides,
    currentSlide: currentSlide
  }
});
