'use strict';

<<<<<<< HEAD
applause.controller('DeckCtrl', function($scope, Appdata, $localStorage, $rootScope, $location) {
=======
applause.controller('DeckCtrl', function($scope, Appdata, $localStorage, $location) {
>>>>>>> develop

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

<<<<<<< HEAD
  $rootScope.$on('slide.next', function() {
    $scope.next();
  });

  $rootScope.$on('slide.prev', function() {
    $scope.prev();
  });

  $rootScope.$on('slide.showGoTo', function() {
    $scope.showGoTo = !$scope.showGoTo;
  });

  $rootScope.$on('slide.goTo', function(e, targetSlide) {
    $scope.$storage.currentSlide = parseInt(targetSlide, 10) <= Appdata.slides.length ? parseInt(targetSlide) : Appdata.slides.length;
  });
=======
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
    $location.path($scope.$storage.currentSlide);
  };
>>>>>>> develop
});
