var BaseController = require('../framework/base/controller');
var RecipesService = require('../service/recipes');

var RecipesController = BaseController.extend({
    init: function(app, socketService, baseEndpoint) {
        this._super(app, socketService, RecipesService, baseEndpoint);
    },
    _beforeFind: function(param) {
        console.log('RecipesController._beforeFind param:', param);
    },
    _beforeFindAll: function() {
        console.log('RecipesController._beforeFindAll');
    },
    _beforeFindById: function(id) {
        console.log('RecipesController._beforeFindById id:', id);
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



module.exports = RecipesController;

//console.log(RecipesController);
//console.log("========RecipesController===========");