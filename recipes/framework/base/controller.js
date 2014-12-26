var Proto = require('uberproto');


///**
// * Controller layer facade base class with common functionality and extension points for the descendants.
// * Provides base implementation for the methods that could be extended by the descendant class.
// * It calls Before and After abstract/empty methods for additional logic during create, modify,
// * and delete which descendants needs to provide implementation. This is not where business or data validation
// * logic should be implemented. Any data transformation logic can be applied here.
// */
//function BaseController() {
//    var app = null,
//        service = null,
//        baseEndpoint = '',
//        socketService = null,
//        findAllURI = '.get',
//        findByIdURI = '.get/:id',
//        findByCriteriaURI = '.get.find',
//        createURI = '.insert',
//        modifyURI = '.update/:id',
//        removeURI = '.delete/:id';
//
//    function init(app, socketService, service, baseEndpoint) {
//        this.app = app;
//        this.service = service;
//        this.socketService = socketService;
//        this.baseEndpoint = baseEndpoint;
//        this.findAllURI = baseEndpoint + this.findAllURI;
//        this.findByIdURI = baseEndpoint + this.findByIdURI;
//        this.findByCriteriaURI = baseEndpoint + this.findByCriteriaURI;
//        this.createURI = baseEndpoint + this.createURI;
//        this.modifyURI = baseEndpoint + this.modifyURI;
//        this.removeURI = baseEndpoint + this.removeURI;
//
//        if (this.socketService) {
//            this.socketService.on(findAllURI, this.findAll());
//            this.socketService.on(findByIdURI, this.findById());
//            this.socketService.on(findByCriteriaURI, this.find());
//            this.socketService.on(createURI, this.insert());
//            this.socketService.on(modifyURI, this.update());
//            this.socketService.on(removeURI, this.delete());
//        }
//
//        if (this.app) {
//            this.app.get(baseEndpoint, function(req, res) {
//                res.send(this.findAll(req.query))
//            });
//            this.app.get(findByIdURI, function(req, res) {res.send(this.findById(req.params.id))});
//            this.app.get(findByCriteriaURI, function(req, res) {res.send(this.find(req.query))});
//            this.app.put(createURI, function(req, res) {this.insert(req.body)});
//            this.app.post(modifyURI, function(req, res) {this.update(req.body)});
//            this.app.delete(removeURI, function(req, res) {this.remove(req.params.id)});
//        }
//    };
//
//    function  findAll() {
//        var foundEntities = null;
//
//        _beforeFindAll();
//        foundEntities = _implementFindAll();
//        _afterFindAll(foundEntities);
//
//        return foundEntities;
//    };
//
//    function findById(id) {
//        var foundEntity = null;
//
//        _beforeFindById(id);
//        foundEntity = _implementFindById(id);
//        _afterFindById(id, foundEntity);
//
//        return foundEntity;
//    };
//
//    function find(request) {
//        var foundEntities = null;
//
//        _beforeFind(request);
//        foundEntities = _implementFind(request);
//        _afterFind(foundEntities);
//
//        return foundEntities;
//    };
//
//    function insert(entity) {
//        var savedEntity = null;
//
//        _beforeInsert(entity);
//        savedEntity = _implementInsert(entity);
//        _afterInsert(savedEntity);
//
//        return savedEntity;
//    };
//
//    function update(id, entity) {
//        var modifiedEntity = null;
//
//        _beforeModify(id, entity);
//        modifiedEntity = _implementModify(id, entity);
//        _afterModify(id, modifiedEntity);
//
//        return modifiedEntity;
//    };
//
//    function remove(id) {
//        _beforeRemove(id);
//        _implementRemove(id);
//        _afterRemove(id);
//    };
//
//    function _beforeFindAll() {
//        return;
//    };
//
//    function _implementFindAll() {
//        return service.findAll();
//    };
//
//    function _afterFindAll(foundEntities) {
//        return;
//    };
//
//    function _beforeFindById(id) {
//        return;
//    };
//
//    function _implementFindById(id) {
//        return service.findById(id);
//    };
//
//    function _afterFindById(id, foundEntity) {
//        return;
//    }
//
//    function _beforeFind(request) {
//        return;
//    }
//
//    function _implementFind(request) {
//        return service.find(request);
//    };
//
//    function _afterFind(foundEntities) {
//        return;
//    };
//
//    function _beforeInsert(entity) {
//        return;
//    };
//
//    function _implementInsert(entity) {
//        return service.insert(entity);
//    };
//
//    function _afterInsert(savedEntity) {
//        return;
//    };
//
//    function _beforeUpdate(entity) {
//        return;
//    };
//
//    function _implementUpdate(id, entity) {
//        return service.update(id, entity);
//    };
//
//    function _afterUpdate(id, modifiedEntity) {
//        return;
//    };
//
//    function _beforeDelete(id) {
//        return;
//    };
//
//    function _implementDelete(id) {
//        return service.delete(id);
//    };
//
//    function _afterDelete(id) {
//        return;
//    }
//
//    return {
//        init: init,
//        find: find,
//        findAll: findAll,
//        findById: findById,
//        insert: insert,
//        update: update,
//        remove: remove
//    };
//};

/**
* Controller layer facade base class with common functionality and extension points for the descendants.
* Provides base implementation for the methods that could be extended by the descendant class.
* It calls Before and After abstract/empty methods for additional logic during create, modify,
* and delete which descendants needs to provide implementation. This is not where business or data validation
* logic should be implemented. Any data transformation logic can be applied here.
*/
var BaseController = Proto.extend({
//exports.BaseController = Proto.extend({
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
        self = this;

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
            this.app.get(baseEndpoint, function(req, res) {
                res.send(self.findAll(req.query))
            });
            this.app.get(this.findByIdURI, function(req, res) {res.send(this.findById(req.params.id))});
            //this.app.get(findByCriteriaURI, function(req, res) {res.send(this.find(req.query))});
            //this.app.put(createURI, function(req, res) {this.insert(req.body)});
            //this.app.post(modifyURI, function(req, res) {this.update(req.body)});
            //this.app.delete(removeURI, function(req, res) {this.remove(req.params.id)});
        }
    },
    findAll: function() {
        var foundEntities = null;

        this._beforeFindAll();
        foundEntities = this._implementFindAll();
        this._afterFindAll(foundEntities);

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
    remove: function(id) {
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
    _implementFind: function(entity) {
        return service.find(entity);
    },
    _afterFind: function(foundEntities) {
        return;
    },
    _beforeInsert: function(entity) {
        return;
    },
    _implementInsert: function(entity) {
        return service.insert(entity);
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
    _beforeRemove: function(id) {
        return;
    },
    _implementRemove: function(id) {
        return service.delete(id);
    },
    _afterRemove: function(id) {
        return;
    }
});


module.exports = BaseController;