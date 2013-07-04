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

};

disable = function disable(callback) {

};

enable = function enable(callback) {

};

module.exports = rconsole;
