'use strict';

describe('Directive: goto', function () {

  // load the directive's module
  beforeEach(module('applauseApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<goto></goto>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the goto directive');
  }));
});
