'use strict';

applause.controller('DeckCtrl', function($scope, Appdata, $localStorage, $location) {


  $scope.isProgressBarVisible = Appdata.progressBar;
  $scope.isSlideCountVisible = Appdata.slideCount;

  $scope.$storage = $localStorage.$default({currentSlide: 1});

  $scope.$watch(function() {
    return Appdata;
  }, function (app) {
    $scope.lastSlide = app.data.slides.length;
    $scope.$storage.slideList = app.data.slides;
  }, true);

  $scope.$watch(function(){
    return $localStorage;
  }, function(storage){
    $scope.slideList = storage.slideList;
  }, true);

  $scope.next = function(){
    if($scope.slideList[$scope.$storage.currentSlide - 1].steps > 0 && 
      $scope.slideList[$scope.$storage.currentSlide - 1].currentStep < $scope.slideList[$scope.$storage.currentSlide - 1].steps){
      Appdata.setSteps($scope.$storage.currentSlide - 1, 'forward');
      return;
    }
    if($scope.$storage.currentSlide < $scope.lastSlide) {
      $scope.$storage.currentSlide = $scope.$storage.currentSlide += 1;
      $location.path($scope.$storage.currentSlide);
    }
  };

  $scope.prev = function(){
    if($scope.slideList[$scope.$storage.currentSlide - 1].currentStep > 0){
      Appdata.setSteps($scope.$storage.currentSlide - 1, 'backward');
      return;
    }
    if($scope.$storage.currentSlide > 1) {
      $scope.$storage.currentSlide = $scope.$storage.currentSlide -= 1;
      $location.path($scope.$storage.currentSlide);
    }
  };

  $scope.$parent.keyup = function(keyEvent) {
    switch(keyEvent.keyCode) {
      case 13:
        $scope.showGoTo = !$scope.showGoTo;
        break;
      case 37:
      case 33:
        $scope.prev();
        break;
      case 32:
      case 39:
      case 34:
        $scope.next();
    }
    $location.path($scope.$storage.currentSlide);
  };

});
