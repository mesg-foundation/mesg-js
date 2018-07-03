<p align="center">
  <img src="https://cdn.rawgit.com/mesg-foundation/mesg-js/2d3bc325/logo.svg" alt="MESG.js" height="120">
  <br/><br/>
</p>

[Website](https://mesg.com/) - [Docs](https://docs.mesg.com/) - [Chat](https://discordapp.com/invite/SaZ5HcE) - [Blog](https://medium.com/mesg)

MESG.js is the official JavaScript library to interact with [MESG Core](https://github.com/mesg-foundation/core).

This library can be used from an Application but also from a Service.

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
