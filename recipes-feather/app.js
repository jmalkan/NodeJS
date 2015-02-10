var feathers = require('feathers');
var bodyParser = require('body-parser');
var memory = require('feathers-memory'); // An in-memory service implementation
var recipesService = require('./service/recipes');

recipesService.init();

// Create an in-memory CRUD service for our Todos
var todoService = memory();

var app = feathers()
    // Set up REST and SocketIO APIs
    .configure(feathers.rest())
    // Set up Primus with SockJS
    .configure(feathers.primus({transformer: 'sockjs'}, function(primus) {
        // Set up Primus authorization here
        primus.authorize(function (req, done) {
            var auth;

            try { auth = authParser(req.headers['authorization']) }
            catch (ex) { return done(ex) }

            // Do some async auth check
            authCheck(auth, done);
        });
    }))
    // Parse HTTP bodies
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    // Host the current directory (for index.html)
    .use(feathers.static(__dirname))
    // Host our Todos service on the /todos path
    .use('/recipes', recipesService)
    .use('/todos', todoService);


// a middleware with no mount path; gets executed for every request to the app
app.use(function (req, res, next) {
  console.log('app.use - Time:', Date.now());
  next();

  console.log('app.use after next - Time:', Date.now());
});


//validate the token for any below response
app.all('*', function (req, res, next) {
    console.log('app.all - Time:', Date.now());
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    //res.type('json');

    next();

    console.log('app.all after next - Time:', Date.now());
  }
);

app.get('/*', function(req, res) {
  res.status(404).render('error.ejs', {title: 'Error'});
});

//error handling middleware. could be moved out of this file into an errors module of some kind.
app.use(function (err, req, res, next) {
    var statusCode = err.status || 500;
    var statusText = '';
    //this could mean anything
    var errorDetail = err.stack;

    switch (statusCode) {
        case 400:
            statusText = 'Bad Request';
            break;
        case 401:
            statusText = 'Unauthorized';
            break;
        case 403:
            statusText = 'Forbidden';
            break;
        case 404:
            statusText = 'Not Found';
            break;
        case 500:
            statusText = 'Internal Server Error';
            break;
    }

    res.status(statusCode);

//      TODO: specify rendering engine for our http pages.
//      if (req.accepts('html')) {
//            res.render('error/500', { title: statusCode + ': ' + statusText, error: errorDetail, url: req.url });
//            return;
//        }

    if (req.accepts('json')) {
        res.send({ title: statusCode + ': ' + statusText, error: errorDetail, url: req.url });
    }
});


app.listen(3000);