var wsurl = process.argv[2] || 'ws://localhost:9222/devtools/page/65705C35-F263-639A-1E0D-E456E1DD4415';
console.log(wsurl);
var cd = require('./index.js')(wsurl);

cd.runtime.evaluate('var foo = {a:5}; foo', function(err, res) {
  if (err) return;

  console.log("eval done", res);

  cd.runtime.getProperties(res.objectId, true, function(err, res) {
    if (err) return;

    console.log('properties!', res);
    process.exit(0);
  });
});

//var repl = require('repl');
//var local = repl.start();
//local.context.repl = local;
//local.context.cd = cd;
//local.context.wsurl = wsurl;
