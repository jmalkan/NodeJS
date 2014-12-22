/**
 * Controller layer facade base class with common functionality and extension points for the descendants.
 * Provides base implementation for the methods that could be extended by the descendant class.
 * It calls Before and After abstract/empty methods for additional logic during create, modify,
 * and delete which descendants needs to provide implementation. This is not where business or data validation
 * logic should be implemented. Any data transformation logic can be applied here.
 */
define(function() {
    //var log = require('./framework/logger').create('BaseController');
    //var ControllerRequest = require('./controller-request');
    //
    ///**
    // * Creates an adapter between the express middleware pattern of 'req, res, next' which has http specific
    // * request and response logic and the controller pattern which takes 'request, callback' as params with the
    // * callback being a standard error first callback.
    // * @param {Function} fn an error first controller fn
    // * @returns {Function}
    // */
    //function expressAdapter(fn) {
    //    //create an express middleware function
    //    return function (req, res, next) {
    //        var requestBody = getBodyForAdapter(req);
    //        var request = new ControllerRequest(req.path, requestBody, req.query, req.params, null);
    //
    //        fn(request, function (error, response) {
    //            if (error) {
    //                if(_.isNumber(error) && error == 204) { // nocontent
    //                    res.send(error);
    //                }
    //                else {
    //                    if(response && response.error){
    //                        next(response.error);
    //                    } else {
    //                        next(error);
    //                    }
    //                }
    //            } else if (response || response != undefined) {
    //                res.json(200, response);
    //            } else {
    //                //nocontent
    //                res.send(204);
    //            }
    //        });
    //    };
    //}
    //
    //function getBodyForAdapter(req) {
    //    if (!_.isEmpty(req.body)) {
    //        return req.body;
    //    } else {
    //        return req.query;
    //    }
    //}

    var BaseController = {
        app: null,
        service: null,
        baseEndpoint: '',
        socketService: null,
        findAllURI: baseEndpoint + '.get',
        findByIdURI: baseEndpoint + '.get/:id',
        findByCriteriaURI: baseEndpoint + '.get.find',
        createURI: baseEndpoint + '.insert',
        modifyURI: baseEndpoint + '.update/:id',
        removeURI: baseEndpoint + '.delete/:id',
        initialize: function(app, socketService, baseEndpoint) {
            this.baseEndpoint = baseEndpoint;

            if (socketService) {
                socketService.on(findAllURI, this.findAll());
                socketService.on(findByIdURI, this.findById());
                socketService.on(findByCriteriaURI, this.find());
                socketService.on(createURI, this.insert());
                socketService.on(modifyURI, this.update());
                socketService.on(removeURI, this.delete());
            }

            if (app) {
                app.get(findAllURI, this.findAll());
                app.get(findByIdURI, this.findById());
                app.get(findByCriteriaURI, this.find());
                app.put(createURI, this.insert());
                app.post(modifyURI, this.update());
                app.delete(removeURI, this.delete());
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


    //var EventEmitter = require('events').EventEmitter;
    //var util = require('util');
    //
    //function BaseController(endpoint, service) { };
    //
    //util.inherits(BaseController, EventEmitter);
    //
    //BaseController.prototype.findById = function(id) {
    //    beforeFindById(id);
    //    var foundEntity = implementFindById(id);
    //    afterFindById(id, foundEntity);
    //
    //    return foundEntity;
    //};
    //
    //BaseController.prototype.beforeFindById = function(id) {
    //    return;
    //};
    //
    //BaseController.prototype.implementFindById = function(id) {
    //    return service.findById(id);
    //};
    //
    //BaseController.prototype.afterFindById = function(id, foundEntity) {
    //    return;
    //};
    //
    //
    //BaseController.prototype.findAll = function() {
    //    beforeFindAll();
    //    var foundEntities = implementFindAll();
    //    afterFindAll(foundEntities);
    //
    //    return foundEntities;
    //};
    //
    //BaseController.prototype.beforeFindAll = function() {
    //    return;
    //};
    //
    //BaseController.prototype.implementFindAll = function() {
    //    return service.findAll();
    //};
    //
    //BaseController.prototype.afterFindAll = function(foundEntities) {
    //    return;
    //};
    //
    //
    //BaseController.prototype.find = function(request) {
    //    beforeFind(request);
    //    var foundEntities = implementFind(request);
    //    afterFind(foundEntities);
    //
    //    return foundEntities;
    //};
    //
    //BaseController.prototype.beforeFind = function(request) {
    //    return;
    //};
    //
    //BaseController.prototype.implementFind = function(request) {
    //    return service.find(request);
    //};
    //
    //BaseController.prototype.afterFind = function(foundEntities) {
    //    return;
    //};
    //
    //
    //BaseController.prototype.findOne = function(request) {
    //    beforeFindOne(request);
    //    var foundEntity = implementFindOne(request);
    //    afterFindOne(foundEntity);
    //
    //    return foundEntities;
    //};
    //
    //BaseController.prototype.beforeFindOne = function(request) {
    //    return;
    //};
    //
    //BaseController.prototype.implementFindOne = function(request) {
    //    return service.findOne(request);
    //};
    //
    //BaseController.prototype.afterFindOne = function(foundEntity) {
    //    return;
    //};
    //
    //
    //BaseController.prototype.insert = function(entity) {
    //    beforeInsert(entity);
    //    var savedEntity = implementInsert(entity);
    //    afterInsert(savedEntity);
    //
    //    return savedEntity;
    //};
    //
    //BaseController.prototype.beforeInsert = function(entity) {
    //    return;
    //};
    //
    //BaseController.prototype.implementInsert = function(entity) {
    //    return service.insert(request);
    //};
    //
    //BaseController.prototype.afterInsert = function(savedEntity) {
    //    return;
    //};
    //
    //
    //BaseController.prototype.update = function(id, entity) {
    //    beforeUpdate(id, entity);
    //    modifiedEntity = implementUpdate(id, entity);
    //    afterUpdate(id, modifiedEntity);
    //
    //    return modifiedEntity;
    //};
    //
    //BaseController.prototype.beforeUpdate = function(id, entity) {
    //    return;
    //};
    //
    //BaseController.prototype.implementUpdate = function(id, entity) {
    //    return service.update(request);
    //};
    //
    //BaseController.prototype.afterUpdate = function(id, savedEntity) {
    //    return;
    //};
    //
    //
    //BaseController.prototype.delete = function(id) {
    //    beforeDelete(id);
    //    implementDelete(id);
    //    afterDelete(id);
    //};
    //
    //BaseController.prototype.beforeDelete = function(id) {
    //    return;
    //};
    //
    //BaseController.prototype.implementDelete = function(id) {
    //    return service.delete(id);
    //};
    //
    //BaseController.prototype.afterDelete = function(id) {
    //    return;
    };

    return BaseController;

    //module.exports = BaseController;
});