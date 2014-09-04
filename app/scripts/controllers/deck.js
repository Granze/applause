'use strict';

applause.controller('DeckCtrl', function($scope, Appdata, $localStorage) {

  $scope.isProgressBarVisible = Appdata.progressBar;
  $scope.isSlideCountVisible = Appdata.slideCount;

  $localStorage.$reset();
  $scope.$storage = $localStorage.$default({currentSlide: 1});

  $scope.$watch(function() {
    return Appdata;
  }, function (data) {
    $scope.lastSlide = data.slides.length;
  }, true);

  $scope.next = function(){
    if($scope.$storage.currentSlide < $scope.lastSlide) {
      $scope.$storage.currentSlide = $scope.$storage.currentSlide += 1;
    }
  };

  $scope.prev = function(){
    if($scope.$storage.currentSlide > 1) {
      $scope.$storage.currentSlide = $scope.$storage.currentSlide -= 1;
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
