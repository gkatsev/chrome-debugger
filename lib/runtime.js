var ws, runtime, callFunctionOn, evaluate, getProperties,
    releaseObject, releaseObjectGroup;

var Q = require('q');

runtime = function runtime(_ws) {
  ws = _ws;

  return {
    callFunctionOn: callFunctionOn,
    evaluate: evaluate,
    getProperties: getProperties,
    releaseObject: releaseObject,
    releaseObjectGroup: releaseObjectGroup
  }
};

callFunctionOn = function callFunctionOn(options, callback) {
  return Q.fcall(function() {
    var objId, defun, req;

    objId = options.objectId;
    defun = options.functionDeclaration;

    if (!objId && !defun) {
      throw new Error('Please provide an objectId and function declaration')
    } else if (!objId) {
      throw new Error('Please provide an objectId')
    } else if (!defun) {
      throw new Error('Please provide a function declaration')
    }

    req = {
      method: 'Runtime.callFunctionOn',
      params: {
        objectId: objId,
        functionDeclaration: defun
      }
    }

    if (options.arguments) {
      req.params.arguments = options.arguments;
    }
    if (options.returnByValue) {
      req.params.returnByValue = options.returnByValue;
    }

    return req;
  }).then(function(req) {
    return ws.send(req);
  }).nodeify(callback);
};

evaluate = function evaluate(options, callback) {
  return Q.fcall(function() {
    if (!options.expression) {
      throw new Error('please provide an expression to evaluate');
    }

    var req = {
      method: 'Runtime.evaluate',
      params: {
        expression: options.expression,
      }
    };

    if (options.returnByValue) {
      req.params.returnByValue = options.returnByValue;
    }
    if (options.objectGroup) {
      req.params.objectGroup = options.objectGroup;
    }

    return req;
  }).then(function(req) {
    return ws.send(req);
  }).nodeify(callback);
};

getProperties = function getProperties(remoteObjectId, ownProperties, callback) {
  if (typeof ownProperties === 'function') {
    callback = ownProperties;
    ownProperties = null;
  }

  var req = {
    method: 'Runtime.getProperties',
    params: {
      objectId: remoteObjectId
    }
  };

  if (ownProperties) {
    req.params.ownProperties = ownProperties;
  }

  return ws.send(req).nodeify(callback);
};

releaseObject = function releaseObject(remoteObjectId, callback) {
  var req = {
    method: 'Runtime.releaseObject',
    params: {
      objectId: remoteObjectId
    }
  };

  return ws.send(req).nodeify(callback);
};

releaseObjectGroup = function releaseObjectGroup(objectGroup, callback) {
  var req = {
    method: 'Runtime.releaseObjectGroup',
    params: {
      objectGroup: objectGroup
    }
  };

  return ws.send(req).nodeify(callback);
};

module.exports = runtime;
