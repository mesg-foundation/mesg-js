# MESG.js

## Installation

```bash
npm i mesg-js
```

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
  taskX:
    outputs:
      outX:
        data: {}
```

#### Listen for tasks

```javascript
const MESG = require('mesg-js').service()

//               Inputs          Outputs
const start = ({ isValid }, { valid, error }) => isValid
  ? valid({}) // every output is a promise so you can chain them if needed
  : error({})

MESG.listenTask({ start })
```

#### Emit event

```javascript
const MESG = require('mesg-js').service()

MESG.emitEvent("eventX", {
  foo: "bar"
}) // every emit is a promise so you can chain them if needed
```


## Application

```javascript
const MESG = require('mesg-js').application()

const SERVICE_ID = 'id_of_the_service_deployed'

MESG.whenEvent(
  { serviceID: SERVICE_ID, filter: 'eventX' },
  { serviceID: SERVICE_ID, taskKey: 'start' },
)

MESG.whenResult(
  { serviceID: SERVICE_ID, task: 'start', output: 'valid' },
  { serviceID: SERVICE_ID, taskKey: 'taskX' },
)
```
