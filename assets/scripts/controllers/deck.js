'use strict';

applause.controller('DeckCtrl', function($scope, Appdata, $localStorage, $rootScope) {

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

  $rootScope.$on('slide.next', function(e, keyEvent) {
    $scope.next();
  });

  $rootScope.$on('slide.prev', function(e, keyEvent) {
    $scope.prev();
  });

  $rootScope.$on('slide.goto', function(e, keyEvent) {
    $scope.showGoTo = !$scope.showGoTo;

  });
});
