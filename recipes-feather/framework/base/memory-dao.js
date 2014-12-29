var BaseDao = require('./dao');

/**
 * Memory Data access layer base class.
 */
var MemoryDao = BaseDao.extend({
    init: function(dataSource) {
        this._super(dataSource);
    },
    _implementFindById: function(id, params, callback) {
        var data = this.getDataSource().filter(function  (dataSourceItem) {
            return (dataSourceItem.id === id);
        });

        callback(null, (data ? data[0] : data));
    },
    _implementFind: function(params, callback) {
        callback(null, this.getDataSource());
    },
    _implementInsert: function(entity, params, callback) {
        this.getDataSource().push(entity);
    },
    _implementUpdate: function(id, entity, params, callback) {
        var recipeIndexCounter = -1;

        var recipeIndex = _(this.getDataSource()).forEach(function(dataSourceItem) {
            recipeIndexCounter++;
            if (dataSourceItem.id === id)
                recipeIndexCounter;
        });

        if (recipeIndex > -1)
            this.getDataSource().splice(recipeIndex, 1, entity);
    },
    _implementPatch: function(id, entity, params, callback) {
        return;
    },
    _implementRemove: function(id, params, callback) {
        var recipeIndexCounter = -1;

        var recipeIndex = _(this.getDataSource()).forEach(function(dataSourceItem) {
            recipeIndexCounter++;
            if (dataSourceItem.id === id)
                recipeIndexCounter;
        });

        if (recipeIndex > -1)
            this.getDataSource().splice(recipeIndex, 1);
    }
});


module.exports = MemoryDao;