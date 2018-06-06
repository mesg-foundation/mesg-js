# MESG.js

## Services

Let's take this really simple service example
```yml
name: example
events:
  eventX:
    data: {}
tasks:
  start:
    inputs:
      isValid:
        type: Boolean
    outputs:
      valid:
        data: {}
      error:
        data: {}
```

#### Listen for tasks

```javascript
const MESG = require('mesg-js').service

const start = ({ isValid }, { valid, error }) => isValid
  ? valid({})
  : error({})

MESG.listenTask({ start })
```

#### Emit event

```javascript
const MESG = require('mesg-js').service

MESG.emitEvent("eventX", {
  foo: "bar"
}).then(...)
```
