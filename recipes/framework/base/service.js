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
    initialize: function(dao) {
        this.dao = dao;
    },
    findAll: function() {
        var foundEntities = null;

        _beforeFindAll();
        foundEntities = _implementFindAll();
        _afterFindAll(foundEntities);

        return foundEntities;
    },
    findById: function(id) {
        var foundEntity = null;

        _beforeFindById(id);
        foundEntity = _implementFindById(id);
        _afterFindById(id, foundEntity);

        return foundEntity;
    },
    find: function(request) {
        var foundEntities = null;

        _beforeFind(request);
        foundEntities = _implementFind(request);
        _afterFind(foundEntities);

        return foundEntities;
    },
    insert: function(entity) {
        var savedEntity = null;

        _beforeInsert(entity);
        savedEntity = _implementInsert(entity);
        _afterInsert(savedEntity);

        return savedEntity;
    },
    update: function(id, entity) {
        var modifiedEntity = null;

        _beforeModify(id, entity);
        modifiedEntity = _implementModify(id, entity);
        _afterModify(id, modifiedEntity);

        return modifiedEntity;
    },
    delete: function(id) {
        _beforeRemove(id);
        _implementRemove(id);
        _afterRemove(id);
    },
    _beforeFindAll: function() {
        return;
    },
    _implementFindAll: function() {
        return dao.findAll();
    },
    _afterFindAll: function(foundEntities) {
        return;
    },
    _beforeFindById: function(id) {
        return;
    },
    _implementFindById: function(id) {
        return dao.findById(id);
    },
    _afterFindById: function(id, foundEntity) {
        return;
    },
    _beforeFind: function(request) {
        return;
    },
    _implementFind: function(request) {
        return dao.find(request);
    },
    _afterFind: function(foundEntities) {
        return;
    },
    _beforeInsert: function(entity) {
        return;
    },
    _implementInsert: function(entity) {
        return dao.insert(request);
    },
    _afterInsert: function(savedEntity) {
        return;
    },
    _beforeUpdate: function(entity) {
        return;
    },
    _implementUpdate: function(id, entity) {
        return dao.update(id, entity);
    },
    _afterUpdate: function(id, modifiedEntity) {
        return;
    },
    _beforeDelete: function(id) {
        return;
    },
    _implementDelete: function(id) {
        return dao.delete(id);
    },
    _afterDelete: function(id) {
        return;
    }
});