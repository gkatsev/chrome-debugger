# Chrome Debugger
This is an interface that talks [Chrome's Remote Debugging Protocol](https://developers.google.com/chrome-developer-tools/docs/debugger-protocol).

## Usage
```javascript
var cd = require('chrome-debugger')('ws://localhost:9222/devtools/page/123')
cd.runtime.evaluate('5', console.log.bind(console));
// 5
```

## API

* `require('chrome-debugger')` - This returns a function that given a websocket endpoint for chrome, will return an object that can talk the debugger protocol.

    * `runtime` - The [runtime](https://developers.google.com/chrome-developer-tools/docs/protocol/1.0/runtime)
        * `callFunctionOn` - `(options, [, callback])`, [](https://developers.google.com/chrome-developer-tools/docs/protocol/1.0/runtime#command-evaluate) the expression on the page.
            * `options`
                * `objectId` - [required] object to call function on
                * `functionDeclaration` - [required] declaration of the function as a string
                * `arguments` - [optional] arguments to give to the call. Objects need to be remote objects as well
                * `returnByValue` - [optional] Should the return be returned by value, for example, JSON
        * `evaluate` - `(options, [, callback])`, [evaluates](https://developers.google.com/chrome-developer-tools/docs/protocol/1.0/runtime#command-evaluate) the expression on the page.
            * `options`
                * `expression` - [required] The expression to evaluate
                * `objectGroup` - [optional] Symbolic group name to release objects
                * `returnByValue` - [optional] Should the return be returned by value, for example, JSON
        * `getProperties` - `(remoteObjectId [, ownProperties [, callback]])`, [returns the properties](https://developers.google.com/chrome-developer-tools/docs/protocol/1.0/runtime#command-getProperties) of the given remote object
        * `releaseObject` - `(remoteObjectId, [, callback])`, [releases a remote object](https://developers.google.com/chrome-developer-tools/docs/protocol/1.0/runtime#command-releaseObject)
        * `releaseObjectGroup` - `(objectGroup, [, callback])`, [releases a remote objectgroup](https://developers.google.com/chrome-developer-tools/docs/protocol/1.0/runtime#command-releaseObjectGroup)

## Developing
```sh
npm install
```

Afterwards, you can start developing on this.

## LICENSE
[MIT](http://gkatsev.mit-license.org/)
