var BaseService = require('../framework/base/service');
var RecipesDao = require('../dao/recipes');

var RecipesService = BaseService.extend({
    init: function() {
        this._super(RecipesDao);
    },
    _beforeFind: function(params) {
        console.log('RecipesService._beforeFind param:', params);
    },
    _beforeFindById: function(id, params, callback) {
        console.log('RecipesService._implementFindById id:', id);
    }
});


module.exports = RecipesService;