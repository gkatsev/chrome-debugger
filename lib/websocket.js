var WebSocket = require('ws');
var isConnected = false;
var ws;
var id = 0;
var handlers = {};

var send = function(req, callback) {
  req.id = id++;
  handlers[req.id] = callback;
  ws.send(JSON.stringify(req));
}

module.exports = function(wsurl) {
  ws = new WebSocket(wsurl);
  ws.on('open', function() {
    isConnected = true;
  });

  ws.on('message', function(message) {
    res = JSON.parse(message);
    console.log('ws', res);
    if (res.error) {
      handlers[res.id](true, res.error);
    } else {
      handlers[res.id](null, res.result);
    }
  });

  return {
    isConnected: isConnected,
    send: send
  }
}


