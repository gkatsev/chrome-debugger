var wsurl = process.argv[2] || 'ws://localhost:9222/devtools/page/65705C35-F263-639A-1E0D-E456E1DD4415';
console.log(wsurl);
var cd = require('./index.js')(wsurl);
var objectGroup = '999';

cd.runtime.evaluate({
  expression: 'var foo = {a:5}; foo',
  objectGroup: objectGroup
}, function(err, res) {
  if (err) return;

  console.log("eval done", res);

  var remoteObjId = res.objectId

  cd.runtime.callFunctionOn({
    objectId: remoteObjId,
    functionDeclaration: 'function() { return this.a; }'
  }, function(err, res) {
    if (err) return;

    console.log('called on', res);
  });

  cd.runtime.getProperties(remoteObjId, true, function(err, res) {
    if (err) return;

    console.log('properties!', res);

    cd.runtime.releaseObjectGroup(objectGroup, function(err, res) {
      if (err) return;

      console.log('release multiple', res);
    });

    cd.runtime.releaseObject(remoteObjId, function(err, res) {
      if (err) return;

      console.log('released!', res);
    });
  });
});

cd.runtime.evaluate({
  expression: 'var a = 0; setInterval(function() {console.log(a++);}, 1000)'
}, function(err, res) {
  if (err) return;

  console.log(cd.console);
  cd.console.on('Console.messageAdded',function(message) {
    console.log('console enable message callback', err, message);
  });
  cd.console.enable(function(err) {
    if (err) return;

    console.log('remote console enabled');
  });
});

var repl = require('repl');
var local = repl.start({
  prompt: '> ',
  input: process.stdin,
  output: process.stdout
});
local.context.repl = local;
local.context.cd = cd;
local.context.wsurl = wsurl;
