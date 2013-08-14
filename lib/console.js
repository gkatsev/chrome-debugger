var ws, rconsole, clearMessages, disable, enable;
var EventEmitter = require('events').EventEmitter;
var Q = require('q');

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

  return ws.send(req).nodeify(callback);
};

disable = function disable(callback) {
  var req = {
    method: 'Console.disable'
  };

  return ws.send(req).nodeify(callback);
};

enable = function enable(callback) {
  var req = {
    method: 'Console.enable',
  };

  ws.events.on('message', function(method, params) {
    rc.emit(method, params);
  });

  return ws.send(req).nodeify(callback);
};

module.exports = rconsole;
