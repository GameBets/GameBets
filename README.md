# GameBets

Final project 2n DAW of the students Angel Conesa Camarena, Luis Donat Girones and Daniel Adrian Pribeagu. This project was created with the purpose of knowing the technologies AngularJS in the client side and NodeJS in the server side.

## Live Demo

In the following link you will be able to find a live demo where you will see the application working.

[Demo](http://conely.tk:3000/)

**This framework was Generated from Hottowel Angular using Yeoman**

## Prerequisites

1. Install [Node.js](http://nodejs.org)

  - on OSX use [homebrew](http://brew.sh) `brew install node`
  - on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

2. Install Yeoman `npm install -g yo`

3. Install these NPM packages globally

  ```bash
  npm install -g bower gulp nodemon
  ```

## Running app

- First of all you should install all the packages with `npm install` and `bower install`.

- The Angular version in bower install is 1.6 .

## Deploying App with webhooks

- With 5 steps you will be able to deploy the app.

1. `npm install gith`
     `npm install forever -g`

2. Check if script hook.sh is working.

3. `forever hook.js`

4. Set webhook on github. To do it you should go to Settings - Webhooks and Add new Webhook.

5. Finally make a push on github and check that everything is working.

## Running HotTowel

### Linting

- Run code analysis using `gulp vet`. This runs jshint, jscs, and plato.

### Tests

- Run the unit tests using `gulp test` (via karma, mocha, sinon).

### Running in dev mode

- Run the project with `gulp serve-dev`

- opens it in a browser and updates the browser with any files changes.

### Building the project

- Build the optimized project using `gulp build`
- This create the optimized code for the project and puts it in the build folder

### Running the optimized code

- Run the optimize project from the build folder with `gulp serve-build`

### Structure

The structure also contains a gulpfile.js and a server folder. The server is there just so we can serve the app using node. Feel free to use any server you wish.

```
/src
    /client
        /app
        /content
```

### Installing Packages

When you generate the project it should run these commands, but if you notice missing packages, run these again:

- `npm install`
- `bower install`

### The Modules

```
app --> [
        app.admin --> [
          app.core,
          app.widgets
        ],
        app.chat --> [
          app.core,
          app.widgets
        ],
        app.contact --> [
          app.core,
          app.widgets  
        ],
        app.dashboard --> [
          app.core,
          app.widgets
        ],
        app.home --> [
          app.core,
          app.widgets,
          app.login  
        ],
        app.login --> [
          app.core,
          app.widgets,
          ngAnimate,
          ui.bootstrap
        ],
        app.profile --> [
          app.core,
          app.widgets
        ],
        app.layout --> [
            app.core
        ],
        app.widgets,
        app.core --> [
            ngAnimate,
            ngSanitize,
            ui.router,
            blocks.exception,
            blocks.logger,
            blocks.router,
            pascalprecht.translate
        ]
    ]
```

## Gulp Tasks

### Task Listing

- `gulp help`

  Displays all of the available gulp tasks.

### Code Analysis

- `gulp vet`

  Performs static code analysis on all javascript files. Runs jshint and jscs.

- `gulp vet --verbose`

  Displays all files affected and extended information about the code analysis.

- `gulp plato`

  Performs code analysis using plato on all javascript files. Plato generates a report in the reports folder.

### Testing

- `gulp serve-specs`

  Serves and browses to the spec runner html page and runs the unit tests in it. Injects any changes on the fly and re runs the tests. Quick and easy view of tests as an alternative to terminal via `gulp test`.

- `gulp test`

  Runs all unit tests using karma runner, mocha, chai and sinon with phantomjs. Depends on vet task, for code analysis.

- `gulp test --startServers`

  Runs all unit tests and midway tests. Cranks up a second node process to run a server for the midway tests to hit a web api.

- `gulp autotest`

  Runs a watch to run all unit tests.

- `gulp autotest --startServers`

  Runs a watch to run all unit tests and midway tests. Cranks up a second node process to run a server for the midway tests to hit a web api.

### Cleaning Up

- `gulp clean`

  Remove all files from the build and temp folders

- `gulp clean-images`

  Remove all images from the build folder

- `gulp clean-code`

  Remove all javascript and html from the build folder

- `gulp clean-fonts`

  Remove all fonts from the build folder

- `gulp clean-styles`

  Remove all styles from the build folder

### Styles

- `gulp styles`

  Compile less files to CSS, add vendor prefixes, and copy to the build folder

### Bower Files

- `gulp wiredep`

  Looks up all bower components' main files and JavaScript source code, then adds them to the `index.html`.

  The `.bowerrc` file also runs this as a postinstall task whenever `bower install` is run.

### Angular HTML Templates

- `gulp templatecache`

  Create an Angular module that adds all HTML templates to Angular's $templateCache. This pre-fetches all HTML templates saving XHR calls for the HTML.

- `gulp templatecache --verbose`

  Displays all files affected by the task.

### Serving Development Code

- `gulp serve-dev`

  Serves the development code and launches it in a browser. The goal of building for development is to do it as fast as possible, to keep development moving efficiently. This task serves all code from the source folders and compiles less to css in a temp folder.

- `gulp serve-dev --nosync`

  Serves the development code without launching the browser.

### Building Production Code

- `gulp optimize`

  Optimize all javascript and styles, move to a build folder, and inject them into the new index.html

- `gulp build`

  Copies all fonts, copies images and runs `gulp optimize` to build the production code to the build folder.

### Serving Production Code

- `gulp serve-build`

  Serve the optimized code from the build folder and launch it in a browser.

- `gulp serve-build --nosync`

  Serve the optimized code from the build folder and manually launch the browser.

## License

MIT
