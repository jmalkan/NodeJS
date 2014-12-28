var recipes = require('../data/recipes').data;
var BaseService = require('../framework/base/service');


var RecipesService = BaseService.extend({
    init: function() {
        this._super(recipes);
    },
    _implementFind: function(param) {
        console.log('RecipesService._beforeFind param:', param);
        throw 'unsupported operation';
        //return recipes[1];
    },
    _implementFindAll: function() {
        console.log('RecipesService._implementFindAll');
        return recipes;
    },
    _implementFindById: function(id) {
        console.log('RecipesService._implementFindById id:', id);
        return recipes[0];
    }
});


module.exports = RecipesService;