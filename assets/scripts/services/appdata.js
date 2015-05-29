'use strict';

applause.factory('Appdata', function(config, $location) {

  var slides = [],
      configObj = angular.fromJson(config),
      appObj = {
        slides: slides,
        isPreviewMode: $location.search().preview
      };


  this.data = angular.extend(configObj, appObj);
  this.setSteps = function(slide, direction){
    if(direction === 'forward'){
      slides[slide].currentStep += 1;
    }
    else{
      slides[slide].currentStep -= 1;
    }
  };

  return this;
});
