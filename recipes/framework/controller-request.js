/**
 * Provides a constructor function for the standard request object which should be instantiated with 'new'.
 *
 * Copyright ©2014 Kronos Incorporated. All Rights Reserved.
 */

/**
 * The constructor for the common request object consumed by the controllers
 * it contains a path or an event name, a body and the reference to a session object
 * @param path the path or the event name
 * @param body the body of the request
 * @param session a reference to all of the stored session data
 */
module.exports = function ControllerRequest(path, body, query, params, session) {
    this.path = path;
    this.body = body;
    this.query = query;
    this.params = params;
    this.session = session;
};