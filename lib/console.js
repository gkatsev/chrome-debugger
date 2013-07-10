var ws, rconsole, clearMessages, disable, enable;
var EventEmitter = require('events').EventEmitter;

var rc = Object.create(EventEmitter.prototype);
EventEmitter.call(rc);


rconsole = function rconsole(_ws) {
  ws = _ws;

  rc.clearMessages = clearMessages;
  rc.disable = disable;
  rc.enable = enable;

  return rc;
};

clearMessages = function clearMessages(callback) {
  var req = {
    method: 'Console.clearMessage'
  };

  ws.send(req, function(err, res) {
    if (callback) {
      if (err) {
        callback(err);
      } else if (res.error) {
        callback(res.error);
      } else {
        callback(null)
      }
    }
  });
};

disable = function disable(callback) {
  var req = {
    method: 'Console.disable'
  };

  ws.send(req, function(err, res) {
    if (callback) {
      if (err) {
        callback(err);
      } else if (res.error) {
        callback(res.error);
      } else {
        callback(null)
      }
    }
  });
};

enable = function enable(callback) {
  var req = {
    method: 'Console.enable',
  };

  ws.send(req, function(err, res) {
    if (callback) {
      if (err) {
        callback(err);
      } else if (res.error) {
        callback(res.error);
      } else {
        callback(null)
      }
    }
  });

  ws.events.on('message', function(method, params) {
    rc.emit(method, params);
  });
};

module.exports = rconsole;
