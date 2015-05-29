'use strict';

applause.directive('goto', function(Appdata) {

  var linkFn = function(scope) {
    scope.goTo = function() {
      if(isNaN(parseInt(scope.goToSlide))) {
        return false;
      } else {
        console.log(Appdata.data.slides);
        scope.$storage.currentSlide = parseInt(scope.goToSlide) <= Appdata.data.slides.length ? parseInt(scope.goToSlide) : Appdata.data.slides.length;
        scope.goToSlide = '';
        scope.showGoTo = false;
      }
    };
  };

  return {
    restrict: 'EA',
    template: '<form ng-submit="goTo()" ng-show="showGoTo" id="go-to" name="goto">' +
                '<label>Go to: <input required ng-model="goToSlide" type="text" placeholder="slide" autofocus="autofocus"></label>' +
              '</form>',
    link: linkFn
  };
});
