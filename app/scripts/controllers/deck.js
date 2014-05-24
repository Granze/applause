'use strict';

applause.controller('DeckCtrl', function ($scope, Appdata) {

  $scope.$watch(function () {
    return Appdata;
  }, function (data) {
    $scope.currentSlide = data.currentSlide;
  }, true);

  $scope.$watch(function () {
    return Appdata;
  }, function (data) {
    $scope.lastSlide = data.slides.length;
  }, true);

  $scope.next = function(){
    if(Appdata.currentSlide < $scope.lastSlide) {
      Appdata.currentSlide += 1;
    }
  };

  $scope.prev = function(){
    if(Appdata.currentSlide > 1) {
      Appdata.currentSlide -= 1;
    }
  };

  $scope.goTo = function () {
    Appdata.currentSlide = parseInt($scope.goToSlide);
    $scope.goToSlide = '';
    $scope.showGoTo = false;
  };

  $scope.$parent.keyup = function(keyEvent) {
    switch(keyEvent.keyCode) {
      case 27:
        $scope.showGoTo = !$scope.showGoTo;
        break;
      case 37:
        $scope.prev();
        break;
      case 32:
      case 39:
        $scope.next();
    }
  };
});
