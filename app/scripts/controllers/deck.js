'use strict';

applause.controller('DeckCtrl', function ($scope, Appdata) {

  $scope.currentSlide = 1;

  $scope.$watch(function () {
    return Appdata;
  }, function (data) {
    $scope.lastSlide = data.slides.length;
  }, true);

  $scope.next = function(){
    if($scope.currentSlide < $scope.lastSlide) {
      $scope.currentSlide += 1;
      Appdata.currentSlide = $scope.currentSlide;
    }
  };

  $scope.prev = function(){
    if($scope.currentSlide > 1) {
      $scope.currentSlide -= 1;
      Appdata.currentSlide = $scope.currentSlide;
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
