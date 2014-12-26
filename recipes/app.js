var express = require('express');
var Proto = require('uberproto');
var bodyParser = require('body-parser');

var app = express();//express.createServer();
// parse application/json
app.use(bodyParser.json());
//app.use(express.bodyParser());


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

var Cat = require('./cat')
var garfield = Cat();
//console.log(garfield.hasBeenWalked());

var recipes = require('./recipes');
var recipesCtrl = require('./controller/recipes').create(app);
var baseController = require('./framework/base/controller');

//console.log(baseController);
//console.log("========APP===========");




var recipesController = require('./controller/recipes-controller');
//var recipesController = RecipesController();
//console.log("===================");
//console.log(recipesController);
//console.log("===================");

var recipesController = recipesController.init(app, null, null, '/recipesController');
//console.log("===================");
//console.log(recipesController.findById('100'));
//console.log("===================");
//var controllers = require('controllers');

app.get('/', function(req, res) {
  res.render('index.ejs', {title: 'Clever Kitchens'});
});

app.get('/recipes', recipes.list);

app.get('/recipes/suggest', function(req, res) {
  res.render('suggest.ejs', {title: 'Suggest a Recipe'});
});

app.post('/recipes/suggest', recipes.suggest);

app.get('/recipes/:title', recipes.single);

app.get('/*', function(req, res) {
  res.status(404).render('error.ejs', {title: 'Error'});
});



//validate the token for any below response
app.all('*', function (req, res, next) {
      console.log('app.all after - Time:', Date.now());
      res.header("Cache-Control", "no-cache, no-store, must-revalidate");
      res.header("Pragma", "no-cache");
      res.header("Expires", 0);
      next();
    }
);

app.listen(3000);