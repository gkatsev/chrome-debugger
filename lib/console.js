var ws, rconsole, clearMessages, disable, enable;

rconsole = function rconsole(_ws) {
  ws = _ws;

  return {
    clearMessages: clearMessages,
    disable: disable,
    enable: enable
  }
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
    method: 'Console.enable'
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

module.exports = rconsole;
