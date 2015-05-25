'use strict';

applause.factory('Appdata', function(config) {

  var slides = [],
      configObj = angular.fromJson(config),
      appObj = {
        slides: slides,
        isPreviewMode: document.location.search === '?preview',
        // TODO add current slide
      };
  this.data = angular.extend(configObj, appObj);
  this.setSteps = function(slide, step){
	slides[slide].currentStep += 1;
  };

  return this;
});
