'use strict';

describe('Directive: slide', function () {

  // load the directive's module
  beforeEach(module('applauseApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<slide></slide>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the slide directive');
  }));
});
