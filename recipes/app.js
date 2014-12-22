var express = require('express');

var app = express();//express.createServer();
app.use(express.bodyParser());


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

var recipes = require('./recipes');
var recipesController = require('./controller/recipes').create(app);
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