var ws, runtime, callFunctionOn, evaluate, getProperties,
    releaseObject, releaseObjectGroup;

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
  var objId, defun, req;

  objId = options.objectId;
  defun = options.functionDeclaration;

  if (!objId && !defun) {
    return callback(new Error('Please provide an objectId and function declaration'), null);
  } else if (!objId) {
    return callback(new Error('Please provide an objectId'), null);
  } else if (!defun) {
    return callback(new Error('Please provide a function declaration'), null);
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

  ws.send(req, function(err, res) {
    console.log('callFunctionOn', res);

    if (callback) {
      if (err) {
        callback(err, res);
      } else {
        callback(res.wasThrown, res.result);
      }
    }
  });
};

evaluate = function evaluate(options, callback) {
  if (!options.expression) {
    return callback(new Error('please provide an expression to evaluate'), null);
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

  ws.send(req, function(err, res) {
    console.log('eval', res);

    if (callback) {
      if (err) {
        callback(err, res);
      } else {
        callback(res.wasThrown, res.result);
      }
    }
  });
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

  ws.send(req, function(err, res) {
    console.log('getProps', res);

    if (callback) {
      if (err) {
        callback(err, res);
      } else if (res.error) {
        callback(true, res.error);
      } else {
        callback(false, res.result)
      }
    }
  });
};

releaseObject = function releaseObject(remoteObjectId, callback) {
  var req = {
    method: 'Runtime.releaseObject',
    params: {
      objectId: remoteObjectId
    }
  };

  ws.send(req, function(err, res) {
    console.log('releaseObject', res);


    if (callback) {
      if (err) {
        callback(err, res);
      } else if (res.error) {
        callback(true, res.error);
      } else {
        callback(false, res.result)
      }
    }
  });
};

releaseObjectGroup = function releaseObjectGroup(objectGroup, callback) {
  var req = {
    method: 'Runtime.releaseObjectGroup',
    params: {
      objectGroup: objectGroup
    }
  };

  ws.send(req, function(err, res) {
    console.log('releaseObject', res);


    if (callback) {
      if (err) {
        callback(err, res);
      } else if (res.error) {
        callback(true, res.error);
      } else {
        callback(false, res.result)
      }
    }
  });
};

module.exports = runtime;
