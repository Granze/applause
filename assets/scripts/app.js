/* exported applause */
/* jshint -W079 */
'use strict';

var applause = angular.module('applauseApp', ['ngAnimate', 'ngSanitize', 'ngStorage', 'applauseConfig']);

applause.run(function($location, $localStorage){
  if(!$location.path()){
    $location.path(1);
	}
  else{
    $localStorage.currentSlide = parseInt($location.path().replace('/', ''), 10);
  }
});
