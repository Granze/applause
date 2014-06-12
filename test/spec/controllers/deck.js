'use strict';

describe('Controller: DeckCtrl', function () {

  // load the controller's module
  beforeEach(module('applauseApp'));

  var DeckCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DeckCtrl = $controller('DeckCtrl', {
      $scope: scope
    });
  }));

  it('inrement by 1', function () {
  });
});
