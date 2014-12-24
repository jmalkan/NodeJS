var recipes = require('../data/recipes').data;

exports.create = function(app) {
    app.get('/recipesCtrl',  function(req, res) {
        console.log('app.get - Time:', Date.now());
        console.log('app.get req.body:', req.body);
        console.log('app.get - req.query:', req.query);
        console.log('app.get - req.params:', req.params);
        res.send(recipes);
    });

    app.get('/recipesCtrl/:id',  function(req, res) {
        console.log('app.get.id - Time:', Date.now());
        console.log('app.get.id req.body:', req.body);
        console.log('app.get.id - req.query:', req.query);
        console.log('app.get.id - req.params.id:', req.params.id);
        res.send(recipes[0]);
    });
};