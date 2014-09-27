'use strict';

applause.directive('bgImg', function ($filter) {

  return function (scope, element, attrs) {
    var imgUrl = '';

    if (!/^(f|ht)tps?:\/\//i.test(attrs.bgImg)) {
      imgUrl = 'assets/theme/images/' + attrs.bgImg;
    } else {
      imgUrl = attrs.bgImg;
    }

    element.css({
      'background': 'transparent url(' + imgUrl + ') no-repeat 0 0',
      'background-size': 'cover'
    });

    if (attrs.credits) {
      var creditsTxt = $filter('linky')(attrs.credits, '_blank'),
        credits = '<div class="credits">Photo credits: ' + creditsTxt + '</div>';
      element.append(credits);
    }

  };

});
