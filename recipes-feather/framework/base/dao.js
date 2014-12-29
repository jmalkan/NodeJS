var Proto = require('uberproto');

/**
 * Data access layer base class. Provides base implementation for the methods that could be extended by the descendant class.
 * DAO class should extend from this class. It calls Before and After abstract/empty methods for validation during insert, update, and delete
 * which descendants could to provide implementation. Any entity specific database check like required, field length should be implemented here.
 * Business logic should be implemented in the service layer.
 */
var BaseDao = Proto.extend({
    dataSource: null,
    init: function(dataSource) {
        this.dataSource = dataSource;
    },
    getDataSource: function() {
        return this.dataSource;
    },
    findById: function(id, params, callback) {
        if (id) {
            this._beforeFindById(id, params, callback);
            this._implementFindById(id, params, callback);
        }
    },
    find: function(params, callback) {
        this._beforeFind(params);
        this._implementFind(params, callback);
    },
    insert: function(entity, params, callback) {
        this._beforeInsert(entity, params);
        this._validateBeforeInsert(entity, params);
        this._implementInsert(entity, params, callback);
    },
    update: function(id, entity, params, callback) {
        this._beforeUpdate(id, entity, params);
        this._validateBeforeUpdate(id, entity, params);
        this._implementUpdate(id, entity, params, callback);
    },
    patch: function(id, entity, params, callback) {
        this._beforePatch(id, entity, params);
        this._validateBeforePatch(id, entity, params);
        this._implementPatch(id, entity, params, callback);
    },
    remove: function(id, params, callback) {
        this._beforeRemove(id, params);
        this._validateBeforeRemove(id, params);
        this._implementRemove(id, params, callback);
    },
    _beforeFindById: function(id, params) {
        return;
    },
    _implementFindById: function(id, params, callback) {
        return;
    },
    _afterFindById: function(id, params, foundEntity) {
        return;
    },
    _beforeFind: function(params) {
        return;
    },
    _implementFind: function(params, callback) {
        return;
    },
    _afterFind: function(params, foundEntities) {
        return;
    },
    _beforeInsert: function(entity, params) {
        return;
    },
    _validateBeforeInsert: function(entity, params) {
        return;
    },
    _implementInsert: function(entity, params, callback) {
        return;
    },
    _afterInsert: function(entity, params, savedEntity) {
        return;
    },
    _validateAfterInsert: function(entity, params, savedEntity) {
        return;
    },
    _beforeUpdate: function(id, entity, params) {
        return;
    },
    _validateBeforeUpdate: function(id, entity, params) {
        return;
    },
    _implementUpdate: function(id, entity, params, callback) {
        return;
    },
    _validateAfterUpdate: function(id, entity, params, updatedEntity) {
        return;
    },
    _afterUpdate: function(id, entity, params, updatedEntity) {
        return;
    },
    _beforePatch: function(id, entity, params) {
        return;
    },
    _validateBeforePatch: function(id, entity, params) {
        return;
    },
    _implementPatch: function(id, entity, params, callback) {
        return;
    },
    _validateAfterPatch: function(id, entity, params, updatedEntity) {
        return;
    },
    _afterPatch: function(id, entity, params, updatedEntity) {
        return;
    },
    _beforeRemove: function(id, params) {
        return;
    },
    _validateBeforeRemove: function(id, params) {
        return;
    },
    _implementRemove: function(id, params, callback) {
        return;
    },
    _validateAfterRemove: function(id, params) {
        return;
    },
    _afterRemove: function(id, params) {
        return;
    }
});


module.exports = BaseDao;