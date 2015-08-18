# Applause
HTML presentations powered by AngularJS

##Features:
- presenter mode
- PDF export
- code highligthing
- markdown support
- speakers notes
- auto fitting background images
- credits + autolink helper
- clean and simple default theme
- configurable via JSON file

##Demo: http://granze.github.io/applause/

###WARNING: this project is at an early stage of development

Anyway, if you want to try it:

- clone the project and `cd` into the folder
- from your terminal run `npm install && bower install`
- run `gulp watch` to launch the local server and watch your files
- start creating your slides editing `index.html`

When you are done editing, run `gulp build`, this will create a "presentation" folder with your compiled slides inside. Enjoy!

##Configuration options:

You need to modify `config.json`

Available options:

| Attribute   | Type    | Default | Description                                                                                        |
|-------------|---------|---------|----------------------------------------------------------------------------------------------------|
| progressBar | boolean | true    | Show/hide the progress bar                                                                         |
| slideCount  | boolean | true    | Show/hide the slide count                                                                          |
| counter     | boolean | true    | Show/hide the counter/countdown in presenter mode                                                  |
| startFrom   | number  | 20      | Set the minutes for the countdown. If set to 0 the clock act like a counter instead of a countdown |

##NB
__presenter mode__: it works out of box in Firefox. In Chrome, you need to run the presentation with a webserver (SimpleHTTPServer is enough). Anyway you can use `gulp watch`.

__PDF export__: again, this works in Firefox. In Chrome you need to append to you url `?pdf`. In both cases, you need to set some print options.
Of course you need to set the layout in landscape. Paper size A4 and 0 margins, background colors and images enabled.

##Changelog

###0.2.2

Forward Steps

###0.2.1

Changed 'gulp watch' in `gulp serve` and added `npm start` script
Added browser navigation (_TO BE empowered!, still missing history)
