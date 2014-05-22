'use strict';

describe('Directive: bgImg', function () {

  // load the directive's module
  beforeEach(module('applauseApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<bg-img></bg-img>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the bgImg directive');
  }));
});
