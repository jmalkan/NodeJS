var Proto = require('uberproto');

/**
 * Controller layer facade base class with common functionality and extension points for the descendants.
 * Provides base implementation for the methods that could be extended by the descendant class.
 * It calls Before and After abstract/empty methods for additional logic during create, modify,
 * and delete which descendants needs to provide implementation. This is not where business or data validation
 * logic should be implemented. Any data transformation logic can be applied here.
 */
var BaseController = Proto.extend({
    app: null,
    service: null,
    baseEndpoint: '',
    socketService: null,
    findAllURI: '.get',
    findByIdURI: '.get/:id',
    findByCriteriaURI: '.get.find',
    createURI: '.insert',
    modifyURI: '.update/:id',
    removeURI: '.delete/:id',
    init: function(app, socketService, service, baseEndpoint) {
        this.app = app;
        this.service = service;
        this.socketService = socketService;
        this.baseEndpoint = baseEndpoint;
        this.findAllURI = baseEndpoint + this.findAllURI;
        this.findByIdURI = baseEndpoint + this.findByIdURI;
        this.findByCriteriaURI = baseEndpoint + this.findByCriteriaURI;
        this.createURI = baseEndpoint + this.createURI;
        this.modifyURI = baseEndpoint + this.modifyURI;
        this.removeURI = baseEndpoint + this.removeURI;

        if (this.socketService) {
            this.socketService.on(findAllURI, this.findAll());
            this.socketService.on(findByIdURI, this.findById());
            this.socketService.on(findByCriteriaURI, this.find());
            this.socketService.on(createURI, this.insert());
            this.socketService.on(modifyURI, this.update());
            this.socketService.on(removeURI, this.delete());
        }

        if (this.app) {
            this.app.get(findAllURI, function(req, res) {res.send(this.findAll(req.query))});
            this.app.get(findByIdURI, function(req, res) {res.send(this.findById(req.params.id))});
            this.app.get(findByCriteriaURI, function(req, res) {res.send(this.find(req.query))});
            this.app.put(createURI, this.insert());
            this.app.post(modifyURI, this.update());
            this.app.delete(removeURI, this.delete());
        }
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
        return service.findAll();
    },
    _afterFindAll: function(foundEntities) {
        return;
    },
    _beforeFindById: function(id) {
        return;
    },
    _implementFindById: function(id) {
        return service.findById(id);
    },
    _afterFindById: function(id, foundEntity) {
        return;
    },
    _beforeFind: function(request) {
        return;
    },
    _implementFind: function(request) {
        return service.find(request);
    },
    _afterFind: function(foundEntities) {
        return;
    },
    _beforeInsert: function(entity) {
        return;
    },
    _implementInsert: function(entity) {
        return service.insert(request);
    },
    _afterInsert: function(savedEntity) {
        return;
    },
    _beforeUpdate: function(entity) {
        return;
    },
    _implementUpdate: function(id, entity) {
        return service.update(id, entity);
    },
    _afterUpdate: function(id, modifiedEntity) {
        return;
    },
    _beforeDelete: function(id) {
        return;
    },
    _implementDelete: function(id) {
        return service.delete(id);
    },
    _afterDelete: function(id) {
        return;
    }
});