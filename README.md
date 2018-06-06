# MESG.js

## Services

#### Listen for tasks

```javascript
const MESG = require('experimentation-mesg-js').service()
MESG.listenTask({
  start: inputs => ({
    ouputs: 'success',
    data: {},
  })
})
```

#### Emit event

```javascript
const MESG = require('experimentation-mesg-js').service()
MESG.emitEvent("request", {
  foo: "bar"
}).then(...)
```
