'use strict';

applause.factory('Appdata', function(config) {

  var slides = [],
      configObj = angular.fromJson(config),
      appObj = {
        slides: slides,
        isPreviewMode: document.location.search === '?preview',
        // TODO add current slide
      };
      console.log(angular.extend(configObj, appObj));
  this.data = angular.extend(configObj, appObj);
  this.setSteps = function(slide, step){
	// console.log(slide, step);
	slides[slide].currentStep = step;
	console.log(slides[slide]);
  };

  return this;
});
