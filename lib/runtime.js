var ws, runtime, evaluate, getProperties;

runtime = function runtime(_ws) {
  ws = _ws;

  return {
    evaluate: evaluate,
    getProperties: getProperties
  }
};

evaluate = function evaluate(expression, returnByValue, callback) {
  if (typeof returnByValue === 'function') {
    callback = returnByValue;
    returnByValue = null;
  }

  var req = {
    method: 'Runtime.evaluate',
    params: {
      expression: expression,
    }
  };

  if (returnByValue) {
    req.params.returnByValue = returnByValue;
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
}

module.exports = runtime;
