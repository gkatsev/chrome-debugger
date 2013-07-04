var WebSocket = require('ws');
var isConnected = false;
var ws;
var id = 0;
var handlers = {};
var sendQueue = [];

var send = function(req, callback) {
  var reqJSON;

  req.id = id++;

  if (req.callback) {
    handlers[req.method] = req.callback;
  }
  handlers[req.id] = callback;

  reqJSON = JSON.stringify(req);
  if (isConnected) {
    ws.send(reqJSON);
  } else {
    sendQueue.push(reqJSON);
  }
};

var handleMessages = function handleMessages(res) {
  console.log('handleMessages', res.params);
  handlers['Console.enable'](res.params);
};

module.exports = function(wsurl) {
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
      handlers[res.id](true, res.error);
    } else {
      if (res.method) {
        handleMessages(res);
      } else {
        handlers[res.id](null, res.result);
      }
    }
  });

  return {
    isConnected: isConnected,
    send: send
  }
};




