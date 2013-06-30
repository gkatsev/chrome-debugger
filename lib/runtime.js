var runtime, evaluate, ws;

runtime = function runtime(_ws) {
  ws = _ws;

  return {
    evaluate: evaluate
  }
};

evaluate = function evaluate(expression, callback) {
  var req = {
    method: 'Runtime.evaluate',
    params: {
      expression: expression
    }
  }
  ws.send(req, function(res) {
    console.log(res);
    callback && callback(res.result);
  })
}

module.exports = runtime;
