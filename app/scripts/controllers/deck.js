'use strict';

applause.controller('DeckCtrl', function ($scope) {

  $scope.currentSlide = 1;

  $scope.lastSlide = function() {
    return document.querySelectorAll('slide').length;
  };

  $scope.next = function(){
    if($scope.currentSlide < $scope.lastSlide()) {
      $scope.currentSlide += 1;
    }
  };

  $scope.prev = function(){
    if($scope.currentSlide > 1) {
      $scope.currentSlide -= 1;
    }
  };

  $scope.$parent.keyup = function(keyEvent) {
    switch(keyEvent.keyCode) {
      case 37:
        $scope.prev();
        break;
      case 32:
      case 39:
        $scope.next();
    }
  };
});
