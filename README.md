# Applause
HTML presentations powered by AngularJS

##Features:
- presenter mode
- code highligthing
- markdown support
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
- start creating your slides editing `slides.html`

When you are done editing, run `gulp`, this will create a "presentation" folder with your compiled slides inside. Enjoy!

##Bower installation:
`bower install applause`

##Configuration options:

You need to modify `config.json`

Available options:

| Attribute   | Type    | Default | Description                                                                                        |
|-------------|---------|---------|----------------------------------------------------------------------------------------------------|
| progressBar | boolean | true    | Show/hide the progress bar                                                                         |
| slideCount  | boolean | true    | Show/hide the slide count                                                                          |
| counter     | boolean | true    | Show/hide the counter/countdown in presenter mode                                                  |
| startFrom   | number  | 20      | Set the minutes for the countdown. If set to 0 the clock act like a counter instead of a countdown |
| theme       | string  | default | Choose the theme to use                                                                            |
