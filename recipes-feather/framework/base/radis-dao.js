var redis = require('../redis-client');

/**
 * Radis Data access layer base class.
 */
var RadisDao = BaseDao.extend({
    init: function(dataSource) {
        this._super(dataSource);
    },
    _implementFindAll: function() {
        return service.findAll();
    },
    _implementFindById: function(id) {
        redis.get(id, function (err, result) {
           callback(null, JSON.parse(dataString));
        });
    },
    _implementFind: function(params) {
        return;
    },
    _implementInsert: function(entity) {
        return;
    },
    _implementUpdate: function(id, entity) {
        return;
    },
    _implementRemove: function(id) {
        return;
    }
});


module.exports = RadisDao;