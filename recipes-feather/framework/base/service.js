var Proto = require('uberproto');

/**
 * Provides base implementation for the methods with common functionality and extension points for the descendants.
 * All Service/Facade class that interact with 1 DAO in a standard way must extend from this class.
 * It calls Before and After abstract/empty methods for validation during insert, update, and delete which descendants needs to
 * provide implementation. Only Business logic should be implemented here. Any entity specific database check requiring database
 * look up should be implemented in the DAO. This object makes use of one DAO, decoupling it from the details of working with
 * persistence APIs. Therefore, this application is able to uses different persistence like redis and/or MongoDB for data access.
 */

var BaseService = Proto.extend({
    dao: null,
    init: function(dao) {
        dao.init();
        this.dao = dao;
    },
    getDao: function() {
        return this.dao;
    },
    get: function(id, params, callback) {
        this._beforeFindById(id, params);
        this._implementFindById(id, params, callback);
    },
    find: function(params, callback) {
        this._beforeFind(params);
        this._implementFind(params, callback);
    },
    create: function(entity, params, callback) {
        this._beforeCreate(entity, params);
        this._validateBeforeCreate(entity, params);
        this._implementCreate(entity, params, callback);
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
        return this.dao.findById(id, params, callback);
    },
    _afterFindById: function(id, params, foundEntity) {
        return;
    },
    _beforeFind: function(params) {
        return;
    },
    _implementFind: function(params, callback) {
        return this.dao.find(params, callback);
    },
    _afterFind: function(params, foundEntities) {
        return;
    },
    _beforeCreate: function(entity, params) {
        return;
    },
    _validateBeforeCreate: function(entity, params) {
        return;
    },
    _implementCreate: function(entity, params, callback) {
        return this.dao.insert(entity, params, callback);
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
        return this.dao.update(id, entity, params, callback);
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
        return this.dao.patch(id, entity, params, callback);
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
        return this.dao.remove(id, params, callback);
    },
    _validateAfterRemove: function(id, params) {
        return;
    },
    _afterRemove: function(id, params) {
        return;
    }
});


module.exports = BaseService;