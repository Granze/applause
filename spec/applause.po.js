/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var Presentation = function() {
  this.firstSlide = element(by.css('.container > .slide:first-child'));
  this.firstSlideTitle = element(by.css('.container > .slide:first-child > h1'));

  this.thirdSlide = element(by.css('.container > .slide:nth-child(3)'));
  this.thirdSlideTitle = element(by.css('.container > .slide:nth-child(3) > h2'));

};

module.exports = new Presentation();