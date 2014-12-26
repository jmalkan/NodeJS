var recipes = require('../data/recipes').data;
var BaseController = require('../framework/base/controller');


//console.log(BaseController);
//console.log("========RecipesController===========");
//
//function RecipesController() {
//    var recipesController = {};
//    recipesController.__proto__ = BaseController();
//
//    recipesController._beforeFind = function(param) {
//        console.log('_beforeFind param:', param);
//    };
//
//    recipesController._implementFind = function(request) {
//        return recipes;
//    };
//
//    recipesController._beforeFindById = function(id) {
//        console.log('_beforeFindById id:', id);
//    };
//
//    recipesController._implementFindById = function(id) {
//        return recipes[0];
//    }
//
//    return recipesController;
//};


var RecipesController = BaseController.extend({
    init: function(app, socketService, baseEndpoint) {
        this._super(app, socketService, service, baseEndpoint);
    },
    _beforeFind: function(param) {
        console.log('_beforeFind param:', param);
    },
    _implementFind: function(param) {
        return recipes[1];
    },
    _beforeFindAll: function() {
        console.log('_beforeFindAll');
    },
    _implementFindAll: function() {
        return recipes;
    },
    _beforeFindById: function(id) {
        console.log('_beforeFindById id:', id);
    },
    _implementFindById: function(id) {
        return recipes[0];
    }
});


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



module.exports = RecipesController;

//console.log(RecipesController);
//console.log("========RecipesController===========");