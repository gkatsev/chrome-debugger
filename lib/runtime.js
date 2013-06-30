var runtime, evaluate, ws;

runtime = function runtime(_ws) {
  ws = _ws;

  return {
    evaluate: evaluate
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

  ws.send(req, function(res) {
    console.log('eval', res);
    callback && callback(res.wasThrown, res.result);
  });
}

module.exports = runtime;
