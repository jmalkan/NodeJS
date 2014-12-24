var recipes = require('../data/recipes').data;
var BaseController = require('../framework/base/controller');

var RecipesController = BaseController.extend({
    _beforeFind: function(param) {
        console.log('_beforeFind param:', param);
    },
    _implementFind: function(request) {
        return recipes;
    },
    _beforeFindById: function(id) {
        console.log('_beforeFindById id:', id);
    },
    _implementFindById: function(id) {
        return recipes[0];
    }
});

exports.RecipesController;


//var Proto = require('uberproto');
//var recipes = require('../data/recipes').data;
//var BaseController = require('../framework/base/controller');
//
//var RecipesController = Proto.extend({
//    _beforeFind: function(param) {
//        console.log('_beforeFind param:', param);
//    },
//    _implementFind: function(request) {
//        return recipes;
//    },
//    _beforeFindById: function(id) {
//        console.log('_beforeFindById id:', id);
//    },
//    _implementFindById: function(id) {
//        return recipes[0];
//    }
//}, BaseController);
//
//exports.RecipesController;