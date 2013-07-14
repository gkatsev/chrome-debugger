var ws, debugger, handleCallback,
    canSetScriptSource, continueToLocation, disable, enable, evaluateOnCallFrame
    getScriptSource, pause, removeBreakpoint, resume, searchInContent,
    setBreakpoint, setBreakpointByUrl, setBreakpointsActive, setPauseOnException
    setScriptSource, stepInto, stepOut, stepOver;
var EventEmitter = require('events').EventEmitter;

debugger = Object.create(EventEmitter.prototype);
EventEmitter.call(debugger);

debugger = function debugger(_ws) {
  ws = _ws;

  return {
    canSetScriptSource: canSetScriptSource,
    continueToLocation: continueToLocation,
    disable: disable,
    enable: enable,
    evaluateOnCallFrame: evaluateOnCallFrame,
    getScriptSource: getScriptSource,
    pause: pause,
    removeBreakpoint: removeBreakpoint,
    resume: resume,
    searchInContent: searchInContent,
    setBreakpoint: setBreakpoint,
    setBreakpointByUrl: setBreakpointByUrl,
    setBreakpointsActive: setBreakpointsActive,
    setPauseOnException: setPauseOnException,
    setScriptSource: setScriptSource,
    stepInto: stepInto,
    stepOut: stepOut,
    stepOver: stepOver
  }
};

canSetScriptSource = function canSetScriptSource(callback) {
  var req = {
    method: 'Debugger.canSetScriptSource'
  }

  ws.send(req, function(err, res) {
    console.log('canSetScriptSource', res);

    handleCallback(err, res, callback);
  });
};

continueToLocation = function continueToLocation(callback) {
  var req = {
    method: 'Debugger.continueToLocation'
  }

  ws.send(req, function(err, res) {
    console.log('canSetScriptSource', res);

    handleCallback(err, res, callback);
  });
};

disable = function disable(callback) {
  var req = {
    method: 'Debugger.disable'
  }

  ws.send(req, function(err, res) {
    console.log('canSetScriptSource', res);

    handleCallback(err, res, callback);
  });
};

enable = function enable(callback) {
  var req = {
    method: 'Debugger.enable'
  }

  ws.send(req, function(err, res) {
    console.log('canSetScriptSource', res);

    handleCallback(err, res, callback);
  });
};

evaluateOnCallFrame = function evaluateOnCallFrame(callback) {
  var req = {
    method: 'Debugger.evaluateOnCallFrame'
  }

  ws.send(req, function(err, res) {
    console.log('canSetScriptSource', res);

    handleCallback(err, res, callback);
  });
};

getScriptSource = function getScriptSource(callback) {
  var req = {
    method: 'Debugger.getScriptSource'
  }

  ws.send(req, function(err, res) {
    console.log('canSetScriptSource', res);

    handleCallback(err, res, callback);
  });
};

pause = function pause(callback) {
  var req = {
    method: 'Debugger.pause'
  }

  ws.send(req, function(err, res) {
    console.log('canSetScriptSource', res);

    handleCallback(err, res, callback);
  });
};

removeBreakpoint = function removeBreakpoint(callback) {
  var req = {
    method: 'Debugger.removeBreakpoint'
  }

  ws.send(req, function(err, res) {
    console.log('canSetScriptSource', res);

    handleCallback(err, res, callback);
  });
};

resume = function resume(callback) {
  var req = {
    method: 'Debugger.resume'
  }

  ws.send(req, function(err, res) {
    console.log('canSetScriptSource', res);

    handleCallback(err, res, callback);
  });
};

searchInContent = function searchInContent(callback) {
  var req = {
    method: 'Debugger.searchInContent'
  }

  ws.send(req, function(err, res) {
    console.log('canSetScriptSource', res);

    handleCallback(err, res, callback);
  });
};

setBreakpoint = function setBreakpoint(callback) {
  var req = {
    method: 'Debugger.setBreakpoint'
  }

  ws.send(req, function(err, res) {
    console.log('canSetScriptSource', res);

    handleCallback(err, res, callback);
  });
};

setBreakpointByUrl = function setBreakpointByUrl(callback) {
  var req = {
    method: 'Debugger.setBreakpointByUrl'
  }

  ws.send(req, function(err, res) {
    console.log('canSetScriptSource', res);

    handleCallback(err, res, callback);
  });
};

setBreakpointsActive = function setBreakpointsActive(callback) {
  var req = {
    method: 'Debugger.setBreakpointsActive'
  }

  ws.send(req, function(err, res) {
    console.log('canSetScriptSource', res);

    handleCallback(err, res, callback);
  });
};

setPauseOnException = function setPauseOnException(callback) {
  var req = {
    method: 'Debugger.setPauseOnException'
  }

  ws.send(req, function(err, res) {
    console.log('canSetScriptSource', res);

    handleCallback(err, res, callback);
  });
};

setScriptSource = function setScriptSource(callback) {
  var req = {
    method: 'Debugger.setScriptSource'
  }

  ws.send(req, function(err, res) {
    console.log('canSetScriptSource', res);

    handleCallback(err, res, callback);
  });
};

stepInto = function stepInto(callback) {
  var req = {
    method: 'Debugger.stepInto'
  }

  ws.send(req, function(err, res) {
    console.log('canSetScriptSource', res);

    handleCallback(err, res, callback);
  });
};

stepOut = function stepOut(callback) {
  var req = {
    method: 'Debugger.stepOut'
  }

  ws.send(req, function(err, res) {
    console.log('canSetScriptSource', res);

    handleCallback(err, res, callback);
  });
};

stepOver = function stepOver(callback) {
  var req = {
    method: 'Debugger.stepOver'
  }

  ws.send(req, function(err, res) {
    console.log('canSetScriptSource', res);

    handleCallback(err, res, callback);
  });
};

handleCallback = function handleCallback(err, res, callback) {
  if (callback) {
    if (err) {
      callback(err, res);
    } else if (res.error) {
      callback(true, res.error);
    } else {
      callback(false, res.result)
    }
  }
};

module.exports = debugger;
