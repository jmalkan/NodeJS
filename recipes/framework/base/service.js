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
        this.dao = dao;
    },
    findAll: function() {
        var foundEntities = null;

        this._beforeFindAll();
        foundEntities = this._implementFindAll();
        this._afterFindAll(foundEntities);

        return foundEntities;
    },
    find: function(params) {
        var foundEntities = null;

        this._beforeFind(params);
        foundEntities = this._implementFind(params);
        this._afterFind(foundEntities);

        return foundEntities;
    },
    findById: function(id) {
        var foundEntity = null;

        this._beforeFindById(id);
        foundEntity = this._implementFindById(id);
        this._afterFindById(id, foundEntity);

        return foundEntity;
    },
    insert: function(entity) {
        var savedEntity = null;

        this._beforeInsert(entity);
        this._validateBeforeInsert(entity);
        savedEntity = this._implementInsert(entity);
        this._validateAfterInsert(savedEntity);
        this._afterInsert(savedEntity);

        return savedEntity;
    },
    update: function(id, entity) {
        var updatedEntity = null;

        this._beforeUpdate(id, entity);
        this._validateBeforeUpdate(id, entity);
        updatedEntity = this._implementUpdate(id, entity);
        this._validateAfterUpdate(id, updatedEntity);
        this._afterUpdate(id, updatedEntity);

        return updatedEntity;
    },
    remove: function(id) {
        this._beforeRemove(id);
        this._validateBeforeRemove(id);
        this._implementRemove(id);
        this._validateAfterRemove(id);
        this._afterRemove(id);
    },
    _beforeFindAll: function() {
        return;
    },
    _implementFindAll: function() {
        return service.findAll();
    },
    _afterFindAll: function(foundEntities) {
        return;
    },
    _beforeFindById: function(id) {
        return;
    },
    _implementFindById: function(id) {
        return this.service.findById(id);
    },
    _afterFindById: function(id, foundEntity) {
        return;
    },
    _beforeFind: function(params) {
        return;
    },
    _implementFind: function(params) {
        return this.service.find(params);
    },
    _afterFind: function(foundEntities) {
        return;
    },
    _beforeInsert: function(entity) {
        return;
    },
    _validateBeforeInsert: function(entity) {
        return;
    },
    _implementInsert: function(entity) {
        return this.service.insert(entity);
    },
    _afterInsert: function(savedEntity) {
        return;
    },
    _validateAfterInsert: function(savedEntity) {
        return;
    },
    _beforeUpdate: function(id, entity) {
        return;
    },
    _validateBeforeUpdate: function(id, entity) {
        return;
    },
    _implementUpdate: function(id, entity) {
        return this.service.update(id, entity);
    },
    _validateAfterUpdate: function(id, updatedEntity) {
        return;
    },
    _afterUpdate: function(id, updatedEntity) {
        return;
    },
    _beforeRemove: function(id) {
        return;
    },
    _validateBeforeRemove: function(id) {
        return;
    },
    _implementRemove: function(id) {
        return this.service.remove(id);
    },
    _validateAfterRemove: function(id) {
        return;
    },
    _afterRemove: function(id) {
        return;
    }
});


module.exports = BaseService;