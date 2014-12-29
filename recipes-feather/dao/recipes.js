var MemoryDao = require('../framework/base/memory-dao');
var recipes = require('./data/recipes').data;

/**
 * Recipes Data access layer base class.
 */
var RecipesDao = MemoryDao.extend({
    init: function(dataSource) {
        this._super(recipes);
    },
    _implementPatch: function(id, entity, params, callback) {
        throw 'Unsupported Operation';
    }
});


module.exports = RecipesDao;