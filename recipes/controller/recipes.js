var recipes = require('../data/recipes').data;
var _ = require('lodash');
//var baseController = require('../framework/base/controller/base-controller');
//var recipesController = _.cloneDeep(baseController);

exports.create = function(app) {
    //baseController

    app.get('/recipesCtrl',  function(req, res) {
        console.log('app.get - Time:', Date.now());
        console.log('app.get req.body.id:', req.body.id);
        console.log('app.get - req.query.id:', req.query.id);
        console.log('app.get - req.params.id:', req.params.id);
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