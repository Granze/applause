'use strict';

angular.module('applauseApp').factory('Appdata', function(config, $localStorage, $location) {

  var slides = [],
      configObj = angular.fromJson(config),
      appObj = {
        slides: slides,
        isPreviewMode: $location.search().preview
      };


  this.data = angular.extend(configObj, appObj);
  this.setSteps = function(slide, direction){
    if(direction === 'forward'){
      $localStorage.slideList[slide].currentStep++;
    }
    else{
      $localStorage.slideList[slide].currentStep--;
    }
  };

  return this;
});
