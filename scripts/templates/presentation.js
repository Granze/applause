(function(module) {
try {
  module = angular.module('applauseTemplates');
} catch (e) {
  module = angular.module('applauseTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/presentation.html',
    '<slide>\n' +
    '  <h1>Applause</h1>\n' +
    '  <h4>HTML presentations powered by Angular JS</h4>\n' +
    '  <ul>\n' +
    '    <li>Simple and clean</li>\n' +
    '    <li>Fully customizable</li>\n' +
    '    <li>Useful helpers</li>\n' +
    '    <li>Keyboard shortcuts\n' +
    '      <ol>\n' +
    '        <li><span class="key light-keys">&#9658;</span> or <span class="key light-keys">space</span> next slide</li>\n' +
    '        <li><span class="key light-keys">&#9668;</span> previous  slide</li>\n' +
    '        <li><span class="key light-keys">esc</span> toggle "go to" popup</li>\n' +
    '      </ol>\n' +
    '    </li>\n' +
    '  </ul>\n' +
    '</slide>\n' +
    '\n' +
    '<slide>\n' +
    '  <h2>Why another presentation framework?</h2>\n' +
    '  <p>There are plenty of presentation frameworks made with HTML, CSS and Javascript around. So why we need another one?</p>\n' +
    '  <p>We probably don\'t. I\'ve started this project just because I wanted to improve my Angular JS skills.</p>\n' +
    '  <blockquote><code class="inline">blockquote</code> Lorem ipsum dolor sit amet, consectetur adipisicing elit</blockquote>\n' +
    '</slide>\n' +
    '\n' +
    '<slide>\n' +
    '  <h2>Presenter mode</h2>\n' +
    '  <table>\n' +
    '    <tr>\n' +
    '      <th>Normal view</th>\n' +
    '      <th>Presenter mode</th>\n' +
    '    </tr>\n' +
    '    <tr>\n' +
    '      <td><img src="images/slide-single.gif" alt=""/></td>\n' +
    '      <td><img src="images/slide-presenter.gif" alt=""/></td>\n' +
    '    </tr>\n' +
    '  </table>\n' +
    '  <p>In presenter mode, you can see the current and the upcoming slide.</p>\n' +
    '  <p>To enter presenter mode, you just need to attach <code class="inline">?preview</code> in your URL. <a href="?preview">Try it out!</a></p>\n' +
    '  <p>Slides are synchronized between tabs.</p>\n' +
    '</slide>\n' +
    '\n' +
    '<slide>\n' +
    '  <h2>Code highlighting</h2>\n' +
    '  <div hljs>\n' +
    '    applause.directive(\'slide\', function (Appdata) {\n' +
    '      return {\n' +
    '        template: \'<section class="slide" ng-transclude=""></section>\',\n' +
    '        restrict: \'EA\',\n' +
    '        transclude: true,\n' +
    '        replace: true,\n' +
    '        scope: {}\n' +
    '      };\n' +
    '    });\n' +
    '  </div>\n' +
    '  <p>You just need to add the "hljs" attribute to your element: <code class="inline">&lt;div <strong>hljs</strong>&gt;your code here&lt;/div&gt;</code></p>\n' +
    '</slide>\n' +
    '\n' +
    '<slide markdown>\n' +
    '  ##Markdown content\n' +
    '\n' +
    '  write your slide in markdown if you like it\n' +
    '\n' +
    '- list item **one**\n' +
    '- list item *two*\n' +
    '\n' +
    'Add the "markdown" attribute to the slide element `<code class="inline">&lt;slide <strong>markdown</strong>&gt;</code>`\n' +
    '</slide>\n' +
    '\n' +
    '<slide bg-img="oscar.jpg" credits="TIME & LIFE Pictures http://life.time.com/?attachment_id=11373">\n' +
    '  <h2 class="left">Auto fitting images</h2>\n' +
    '  <p class="light-text">Add the "bg-img" attribute to your slide element:<br><code class="inline">&lt;slide <strong>bg-img</strong>="path/to/image"&gt;</code><br>without worrying about the image size.</p>\n' +
    '  <p class="light-text">You can add credits too (with autolink)<br><code class="inline">&lt;slide bg.img="..." <strong>credits</strong>="..."&gt;</code></p>\n' +
    '</slide>\n' +
    '\n' +
    '<slide>\n' +
    '  <h3 class="abs-center">Add<br>class="abs-center"<br>to an item to center it</h3>\n' +
    '</slide>\n' +
    '\n' +
    '<slide>\n' +
    '  <h1>Do you like that?</h1>\n' +
    '  <img class="center media" src="images/slow-clap.gif" alt=""/>\n' +
    '  <p class="center">Follow me on twitter <a href="https://twitter.com/granze">@granze</a></p>\n' +
    '</slide>\n' +
    '');
}]);
})();
