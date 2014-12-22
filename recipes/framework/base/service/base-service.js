/**
 * Provides base implementation for the methods that could be extended by the descendant class.
 * All Service/Facade class that interact with 1 DAO in a standard way must extend from this class.
 * It calls Before and After abstract/empty methods for validation during insert, update, and delete which descendants needs to
 * provide implementation. Only Business logic should be implemented here. Any entity specific database check requiring database
 * look up should be implemented in the DAO. This object makes use of one DAO, decoupling it from the details of working with
 * persistence APIs. Therefore, this application is able to uses different persistence like redis and/or MongoDB for data access.
 */
var EventEmitter = require('events').EventEmitter;
var util = require('util');

function BaseService(endpoint, service) { };

util.inherits(BaseService, EventEmitter);

BaseService.prototype.findById = function(id) {
    beforeFindById(id);
    var foundEntity = implementFindById(id);
    afterFindById(id, foundEntity);

    return foundEntity;
};

BaseService.prototype.beforeFindById = function(id) {
    return;
};

BaseService.prototype.implementFindById = function(id) {
    return service.findById(id);
};

BaseService.prototype.afterFindById = function(id, foundEntity) {
    return;
};


BaseService.prototype.findAll = function() {
    beforeFindAll();
    var foundEntities = implementFindAll();
    afterFindAll(foundEntities);

    return foundEntities;
};

BaseService.prototype.beforeFindAll = function() {
    return;
};

BaseService.prototype.implementFindAll = function() {
    return service.findAll();
};

BaseService.prototype.afterFindAll = function(foundEntities) {
    return;
};


BaseService.prototype.find = function(request) {
    beforeFind(request);
    var foundEntities = implementFind(request);
    afterFind(foundEntities);

    return foundEntities;
};

BaseService.prototype.beforeFind = function(request) {
    return;
};

BaseService.prototype.implementFind = function(request) {
    return service.find(request);
};

BaseService.prototype.afterFind = function(foundEntities) {
    return;
};


BaseService.prototype.findOne = function(request) {
    beforeFindOne(request);
    var foundEntity = implementFindOne(request);
    afterFindOne(foundEntity);

    return foundEntities;
};

BaseService.prototype.beforeFindOne = function(request) {
    return;
};

BaseService.prototype.implementFindOne = function(request) {
    return service.findOne(request);
};

BaseService.prototype.afterFindOne = function(foundEntity) {
    return;
};


BaseService.prototype.insert = function(entity) {
    beforeInsert(entity);
    var savedEntity = implementInsert(entity);
    afterInsert(savedEntity);

    return savedEntity;
};

BaseService.prototype.beforeInsert = function(entity) {
    return;
};

BaseService.prototype.implementInsert = function(entity) {
    return service.insert(request);
};

BaseService.prototype.afterInsert = function(savedEntity) {
    return;
};


BaseService.prototype.update = function(id, entity) {
    beforeUpdate(id, entity);
    modifiedEntity = implementUpdate(id, entity);
    afterUpdate(id, modifiedEntity);

    return modifiedEntity;
};

BaseService.prototype.beforeUpdate = function(id, entity) {
    return;
};

BaseService.prototype.implementUpdate = function(id, entity) {
    return service.update(request);
};

BaseService.prototype.afterUpdate = function(id, savedEntity) {
    return;
};


BaseService.prototype.delete = function(id) {
    beforeDelete(id);
    implementDelete(id);
    afterDelete(id);
};

BaseService.prototype.beforeDelete = function(id) {
    return;
};

BaseService.prototype.implementDelete = function(id) {
    return service.delete(id);
};

BaseService.prototype.afterDelete = function(id) {
    return;
};


module.exports = BaseService;