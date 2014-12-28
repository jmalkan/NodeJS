var Proto = require('uberproto');

/**
 * Data access layer base class. Provides base implementation for the methods that could be extended by the descendant class.
 * DAO class should extend from this class. It calls Before and After abstract/empty methods for validation during insert, update, and delete
 * which descendants could to provide implementation. Any entity specific database check like required, field length should be implemented here.
 * Business logic should be implemented in the service layer.
 */
var BaseDao = Proto.extend({
    dataSource: null,
    initialize: function(dataSource) {
        this.dataSource = dataSource;
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

        if (id) {
            this._beforeFindById(id);
            foundEntity = this._implementFindById(id);
            this._afterFindById(id, foundEntity);
        }

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
        return;
    },
    _afterFindById: function(id, foundEntity) {
        return;
    },
    _beforeFind: function(params) {
        return;
    },
    _implementFind: function(params) {
        return;
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
        return;
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
        return;
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
        return;
    },
    _validateAfterRemove: function(id) {
        return;
    },
    _afterRemove: function(id) {
        return;
    }
});


module.exports = BaseDao;