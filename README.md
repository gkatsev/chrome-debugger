# Chrome Debugger
This is an interface that talks [Chrome's Remote Debugging Protocol](https://developers.google.com/chrome-developer-tools/docs/debugger-protocol).

## Usage
```javascript
var cd = require('chrome-debugger')('ws://localhost:9222/devtools/page/123')
cd.runtime.evaluate('5', console.log.bind(console));
// 5
```

Also, see [test.js](./test.js).

## API

* `require('chrome-debugger')` - This returns a function that given a websocket endpoint for chrome, will return an object that can talk the debugger protocol.

    * [`console`](https://developers.google.com/chrome-developer-tools/docs/protocol/1.0/console) - By enabling the console, you can listen to messages from the console. This object is an event emitter, so, you can listen to messages such as `Console.messageAdded`, `Console.messagesCleared`, and `Console.messageRepeatCountUpdated`.
        * [`clearMessages`](https://developers.google.com/chrome-developer-tools/docs/protocol/1.0/console#command-clearMessages) - `([callback])` Clears the console
        * [`disable`](https://developers.google.com/chrome-developer-tools/docs/protocol/1.0/console#command-disable) - `([callback])` Disable the console to stop receiving messages
        * [`enable`](https://developers.google.com/chrome-developer-tools/docs/protocol/1.0/console#command-enable) - `([ callback])` Enable the console to start receiving messages. The callback will let you know whether the request was succeeded or not.
    * [`runtime`](https://developers.google.com/chrome-developer-tools/docs/protocol/1.0/runtime) - The runtime
        * [`callFunctionOn`](https://developers.google.com/chrome-developer-tools/docs/protocol/1.0/runtime#command-callFunctionOn) - `(options, [, callback])`, [](https://developers.google.com/chrome-developer-tools/docs/protocol/1.0/runtime#command-evaluate) the expression on the page.
            * `options`
                * `objectId` - [required] object to call function on
                * `functionDeclaration` - [required] declaration of the function as a string
                * `arguments` - [optional] arguments to give to the call. Objects need to be remote objects as well
                * `returnByValue` - [optional] Should the return be returned by value, for example, JSON
        * [`evaluate`](https://developers.google.com/chrome-developer-tools/docs/protocol/1.0/runtime#command-evaluate) - `(options, [, callback])`, evaluates the expression on the page.
            * `options`
                * `expression` - [required] The expression to evaluate
                * `objectGroup` - [optional] Symbolic group name to release objects
                * `returnByValue` - [optional] Should the return be returned by value, for example, JSON
        * [`getProperties`](https://developers.google.com/chrome-developer-tools/docs/protocol/1.0/runtime#command-getProperties) - `(remoteObjectId [, ownProperties [, callback]])`, returns the properties of the given remote object
        * [`releaseObject`](https://developers.google.com/chrome-developer-tools/docs/protocol/1.0/runtime#command-releaseObject) - `(remoteObjectId, [, callback])`, releases a remote object
        * [`releaseObjectGroup`](https://developers.google.com/chrome-developer-tools/docs/protocol/1.0/runtime#command-releaseObjectGroup) - `(objectGroup, [, callback])`, releases a remote objectgroup

## Developing
```sh
npm install
```

Afterwards, you can start developing on this.

## LICENSE
[MIT](http://gkatsev.mit-license.org/)
