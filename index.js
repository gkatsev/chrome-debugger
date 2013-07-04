var
  WebSocket = require('./lib/websocket.js'),
  runtime = require('./lib/runtime.js'),
  rconsole = require('./lib/console.js');

module.exports = function(wsurl) {
  var ws = WebSocket(wsurl);
  return {
    console: rconsole(ws),
    runtime: runtime(ws)
  }
}
