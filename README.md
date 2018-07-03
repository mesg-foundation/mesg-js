<p align="center">
  <img src="https://cdn.rawgit.com/mesg-foundation/mesg-js/2d3bc325/logo.svg" alt="MESG.js" height="120">
  <br/><br/>
</p>

[Website](https://mesg.com/) - [Docs](https://docs.mesg.com/) - [Chat](https://discordapp.com/invite/SaZ5HcE) - [Blog](https://medium.com/mesg)

MESG.js is the official JavaScript library to interact with [MESG Core](https://github.com/mesg-foundation/core).

This library can be used from an Application but also from a Service.

# Installation

```bash
npm i mesg-js
```

# Guide for Service

First, require MESG.js as a service

```javascript
const MESG = require('mesg-js').service()
```

## Task

Let's take a really simple example, a multiplication service. Its `service.yml` is:
```yml
name: "service multiplication"
tasks:
  multiply:
    inputs:
      a:
        type: Number
      b:
        type: Number
    outputs:
      success:
        data:
          result:
            type: Number
      error:
        data:
          message:
            type: String
```

If you want more information about this file, check out the [documentation about service file](https://docs.mesg.com/service/service-file).

### Task function

Task functions should always accept as parameters `inputs` and `outputs`.

```javascript
function multiply(inputs, outputs)
```

### Inputs

The parameter `inputs` is an object that contains the two task's inputs: `a` and `b`.

### Outputs

The parameter `outputs` is an object that contains the two task's outputs: `success` and `error`.

`success` and `error` are functions that accept as only parameter an object defined by its `data` structure.

> ONLY **one** output function should be call per execution of the task.

`success` is defined like:
```javascript
outputs.success({
  result: __MULTIPLICATION_RESULT__
})
```

And `error` is defined like:
```javascript
outputs.error({
  message: __ERROR_MESSAGE__
})
```

### Register the task

Last step is to register the task function to MESG.

The service should call `MESG.listenTask` with an object containing as key the key of the task, and as value, the task function:

```javascript
MESG.listenTask({
  __TASK_1_KEY__: __TASK_1_FUNCTION__,
  __TASK_2_KEY__: __TASK_2_FUNCTION__
})
```

### Example

```javascript
// Require MESG.js as a service
const MESG = require('mesg-js').service()

function taskMultiply (inputs, outputs) {
  if (inputs.a === undefined || inputs.b === undefined) {
    // There is an error. Return the error output with the message.
    return outputs.error({
      message: 'a and/or b are undefined'
    })
  }
  const multiplication = inputs.a * inputs.b
  // Return the success output with the result of the multiplication
  return outputs.success({
    result: multiplication
  })
}

// Register the task multiply to MESG
MESG.listenTask({
  multiply: taskMultiply
})
```

## Event

## Emit event

To emit an event, the service should call the `MESG.emitEvent` function with the event's key and data as parameters:

```javascript
MESG.emitEvent(__EVENT_KEY__, __EVENT_DATA__)
```

## Example

Let's take a new simple example, a timer service, that will emit a `minute` event every minute. Its `service.yml` is:
```yml
name: "service timer"
events:
  minute:
    timestamp:
      date:
        type: Number
```

And the JavaScript code:
```javascript
const MESG = require('mesg-js').service()

function emitEvent () {
  return MESG.emitEvent('minute', {
    timestamp: Date.now()
  })
}
setInterval(emitEvent, 60 * 1000)
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
