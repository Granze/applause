'use strict';

applause.controller('DeckCtrl', function($scope, Appdata, $localStorage, $rootScope, $location) {

  $scope.isProgressBarVisible = Appdata.progressBar;
  $scope.isSlideCountVisible = Appdata.slideCount;

  $scope.$storage = $localStorage.$default({currentSlide: 1});

  $scope.$watch(function() {
    return Appdata;
  }, function (data) {
    $scope.lastSlide = data.slides.length;
  }, true);

  $scope.next = function(){
    if($scope.$storage.currentSlide < $scope.lastSlide) {
      $scope.$storage.currentSlide = $scope.$storage.currentSlide += 1;
      $location.path($scope.$storage.currentSlide);
    }
  };

  $scope.prev = function(){
    if($scope.$storage.currentSlide > 1) {
      $scope.$storage.currentSlide = $scope.$storage.currentSlide -= 1;
      $location.path($scope.$storage.currentSlide);
    }
  };

  $rootScope.$on('slide.next', function(e, keyEvent) {
    $scope.next();
  });

  $rootScope.$on('slide.prev', function(e, keyEvent) {
    $scope.prev();
  });

  $rootScope.$on('slide.showGoTo', function(e, keyEvent) {
    $scope.showGoTo = !$scope.showGoTo;
  });

  $rootScope.$on('slide.goTo', function(e, targetSlide) {
    $scope.$storage.currentSlide = parseInt(targetSlide) <= Appdata.slides.length ? parseInt(targetSlide) : Appdata.slides.length;
  });
});
