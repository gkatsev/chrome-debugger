var WebSocket = require('ws');
var EventEmitter = require('events').EventEmitter;
var isConnected = false;
var ws;
var id = 0;
var handlers = {};
var sendQueue = [];
var events = new EventEmitter();
var Q = require('q');

var send = function(req) {
  var reqJSON;

  req.id = id++;

  if (req.callback) {
    handlers[req.method] = req.callback;
  }
  handlers[req.id] = Q.defer();

  reqJSON = JSON.stringify(req);
  if (isConnected) {
    ws.send(reqJSON);
  } else {
    sendQueue.push(reqJSON);
  }

  return handlers[req.id].promise;
};

var handleMessages = function handleMessages(res) {
  events.emit('message', res.method, res.params);
};

module.exports = function websocket(wsurl) {
  ws = new WebSocket(wsurl);
  ws.on('open', function() {
    isConnected = true;

    if (sendQueue.length) {
      sendQueue.forEach(function(req) {
        ws.send(req);
      });
    }
  });

  ws.on('message', function(message) {
    res = JSON.parse(message);
    console.log('ws', res);
    if (res.error) {
      handlers[res.id].reject(res.error);
    } else {
      if (res.method) {
        handleMessages(res);
      } else if (res.result.error) {
        handlers[res.id].reject(res.result.error);
      } else if (res.result.wasThrown) {
        handlers[res.id].reject(res.result.result);
      } else {
        handlers[res.id].resolve(res.result);
      }
    }
  });

  ws.on('error', function(message) {
    console.error(message);
  });

  return {
    isConnected: isConnected,
    send: send,
    events: events
  }
};




