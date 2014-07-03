'use strict';

applause.controller('DeckCtrl', function ($scope, Appdata) {

  var config = Appdata.getConfig();

  $scope.isProgressBarVisible = config.progressBar;
  $scope.isSlideCountVisible = config.slideCount;

  $scope.$watch(function () {
    return Appdata;
  }, function (data) {
    $scope.currentSlide = data.currentSlide;
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
