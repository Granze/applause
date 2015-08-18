'use strict';

var P = require('bluebird');

var timeout = P.promisify(function(duration, done){
  setTimeout(function(){
    return done();
  }, duration);
});

describe('The presentation view', function () {
  var applause;

  beforeEach(function () {
    applause = require('./applause.po.js');
  });

  it('should show the first slide', function(done) {
    
    browser.get('/');

    P.coroutine(function*(){
      yield timeout(500);

      expect(applause.firstSlide.isPresent()).toBeTruthy();

      const title = yield applause.firstSlideTitle.getText();

      expect(title).toEqual('Applause');
      done();
    })()
    .catch(done);
  });

  describe('when setting a page number in the address bar', function() {
    it('should load that page', function(done) {
      P.coroutine(function*(){

        browser.get('/#/3');

        yield timeout(500);

        expect(applause.thirdSlide.isPresent()).toBeTruthy();

        const title = yield applause.thirdSlideTitle.getText();

        expect(title).toEqual('Presenter mode');
        done();
      })()
      .catch(done);
    });
  });

});
