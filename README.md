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

//               Inputs          Outputs
const start = ({ isValid }, { valid, error }) => isValid
  ? valid({}) // every output is a promise so you can chain them if needed
  : error({})

MESG.listenTask({ start })
```

#### Emit event

```javascript
const MESG = require('mesg-js').service

MESG.emitEvent("eventX", {
  foo: "bar"
}) // every emit is a promise so you can chain them if needed
```
