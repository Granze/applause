# Applause
HTML presentations powered by AngularJS

##Features:
- preview mode
- code highligthing
- markdown support
- auto fitting background images
- credits + autolink
- clean and simple default theme
- configurable via JSON file

##Demo: http://granze.github.io/applause/

###WARNING: this project is at an early stage of development

Anyway, if you want to try it:

- clone the project and `cd` into the folder
- from your terminal run `npm install && bower install`
- run `gulp watch` to launch the local server and watch your files
- start creating your slides editing app/views/presentation.html

When you are done editing, run `gulp`, this will create a "presentation" folder with your compiled slides inside. Enjoy!

##Bower installation:
`bower install applause`

##Configuration options:

You need to modify `app > config.json`

- `progressBar` : (boolean) Show/hide the progress bar
- `slideCount` : (boolean) Show/hide the slide count
