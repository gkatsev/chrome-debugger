var
  WebSocket = require('./lib/websocket.js'),
  runtime = require('./lib/runtime.js');

module.exports = function(wsurl) {
  var ws = WebSocket(wsurl);
  return {
    runtime: runtime(ws)
  }
}
