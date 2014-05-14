'use strict';

describe('Service: Appdata', function () {

  // load the service's module
  beforeEach(module('applauseApp'));

  // instantiate service
  var Appdata;
  beforeEach(inject(function (_Appdata_) {
    Appdata = _Appdata_;
  }));

  it('should do something', function () {
    expect(!!Appdata).toBe(true);
  });

});
