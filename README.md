<p align="center">
  <img src="https://cdn.rawgit.com/mesg-foundation/mesg-js/2d3bc325/logo.svg" alt="MESG.js" height="120">
  <br/><br/>
</p>

[Website](https://mesg.com/) - [Docs](https://docs.mesg.com/) - [Chat](https://discordapp.com/invite/SaZ5HcE) - [Blog](https://medium.com/mesg)

MESG.js is the official JavaScript library to interact with [MESG Core](https://github.com/mesg-foundation/core).

This library can be used from an Application but also from a Service.


# Contents

- [Installation](#installation)
- [Application](#application)
  - [Example](#example)
  - [Manually execute a task](#manually-execute-a-task)
  - [Manually listen to an event](#manually-listen-to-an-event)
  - [Manually listen to a task's result](#manually-listen-to-a-tasks-result)
- [Service](#service)
  - [Task](#task)
  - [Event](#event)
- [Community](#community)
- [Contribute](#contribute)

# Installation

```bash
npm i mesg-js
```

# Application

Require MESG.js as an application:

```javascript
const MESG = require('mesg-js').application()
```

## MESG Core endpoint

By default, the library connect to the Core on the endpoint `localhost:50052`.

If you wish to set another endpoint, you have to set the environmental variable `MESG_ENDPOINT` to the desired endpoint.

## Listen for events

To listen for events, the application can use the `MESG.whenEvent(event, task)` function.

## Listen for task results

To listen for task results, the application can use the `MESG.whenResult(result, task)` function.

## Object definition

The previous functions expect the following object definition.

### `event`

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `serviceID` | `String` | **REQUIRED** | The event's service ID |
| `filter` | `String` | `*` | Only listen for this event's key. Leave empty or set `*` to listen for any event from this service |

### `result`

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `serviceID` | `String` | **REQUIRED** | The result's service ID |
| `task` | `String` | `*` | Only listen for this task key. Leave empty or set `*` to listen for any task's result from this service |
| `output` | `String` | `*` | Only listen for this output key. If set, the `task` is required. Leave empty or set `*` to listen for any task's output from this service |

### `task`

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `serviceID` | `String` | **REQUIRED** | The task's service ID |
| `taskKey` | `String` | **REQUIRED** | The task key to execute |
| `inputs` | `Object` or `Function` | `{}` | The input to pass to the task |

## Example

```javascript
const MESG = require('mesg-js').application()

// When eventX occurs, then execute start
MESG.whenEvent({
  serviceID: __EVENT_SERVICE_ID__,
  filter: 'eventX'
}, {
  serviceID: __TASK_SERVICE_ID__,
  taskKey: 'start',
  inputs: { foo: 'bar' }
})

// When result valid of task occurs, then execute taskX
MESG.whenResult({
  serviceID: __RESULT_SERVICE_ID__,
  task: 'start',
  output: 'valid'
}, {
  serviceID: __TASK_SERVICE_ID__,
  taskKey: 'taskX',
  inputs: function(eventKey, eventData) { return { foo: 'bar' }}
})
```

## Manually execute a task

```javascript
const MESG = require('mesg-js').application()

MESG.api.ExecuteTask({
  serviceID: __TASK_SERVICE_ID__,
  taskKey: __TASK_KEY__,
  inputData: JSON.stringify(__INPUT_DATA__)
})
```

[Documentation](https://docs.mesg.com/application/execute-a-task)

## Manually listen to an event

```javascript
const MESG = require('mesg-js').application()

MESG.api.ListenEvent({
  serviceID: __TASK_SERVICE_ID__,
  eventFilter: __EVENT_KEY__
})
.on('error', function(error) {
  // An error has occurred and the stream has been closed.
})
.on('data', function(data) {
  ...
})
```

[Documentation](https://docs.mesg.com/application/listen-for-events#listening-for-events-from-services)

## Manually listen to a task's result

```javascript
const MESG = require('mesg-js').application()

MESG.api.ListenResult({
  serviceID: __TASK_SERVICE_ID__,
  taskFilter: __TASK_KEY__,
  outputFilter: __OUTPUT_KEY__
})
.on('error', function(error) {
  // An error has occurred and the stream has been closed.
})
.on('data', function(data) {
  ...
})
```

[Documentation](https://docs.mesg.com/application/listen-for-events#listen-for-task-execution-outputs)

# Service

Require MESG.js as a service:

```javascript
const MESG = require('mesg-js').service()
```

## Task

The service should call `MESG.listenTask` to register its available tasks to MESG Core. The only parameter of this function is an object containing the tasks' key and as values the tasks' function:

```javascript
MESG.listenTask({
  __TASK_1_KEY__: function (inputs, outputs) {
    // Function of the task 1
    ...
  }, 
  __TASK_2_KEY__: function (inputs, outputs) {
    // Function of the task 2
    ...
  },
  ...
})
```

`inputs` is containing the task's inputs as defined in its `service.yml`.

`outputs` is containing the task's outputs as function as defined in its `service.yml`.
The `outputs` function return a `Promise` and should **ONLY BE CALLED ONCE** per task's execution with the desired data as parameter.

### Example

Let's take a multiplication service as example. Its `service.yml` is:
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

#### Task function

Task functions should always accept as parameters `inputs` and `outputs`.

```javascript
function taskMultiply(inputs, outputs)
```

#### Inputs

The parameter `inputs` is an object that contains the two task's inputs: `a` and `b`.

#### Outputs

The parameter `outputs` is an object that contains the two task's outputs: `success` and `error`.

`success` and `error` are functions that accept as only parameter an object defined by its `data` structure. Those functions return a `Promise`.

> **ONLY ONE** output function should be call per task's execution.

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

#### Register the task

Last step is to register the task function to MESG.

The service should call `MESG.listenTask` with an object containing as key the key of the task, and as value, the task function. In this example, the key is `multiply` and the function is `taskMultiply`

```javascript
MESG.listenTask({
  multiply: taskMultiply
})
```

#### Javascript code

```javascript
// Require MESG.js as a service
const MESG = require('mesg-js').service()

function taskMultiply (inputs, outputs) {
  if (inputs.a === undefined || inputs.b === undefined) {
    // There is an error. Return the error output with the message.
    outputs.error({
      message: 'a and/or b are undefined'
    })
  } else {
    // Return the success output with the result of the multiplication
    outputs.success({
      result: inputs.a * inputs.b
    })
  }
}

// Register the task multiply to MESG
MESG.listenTask({
  multiply: taskMultiply
})
```

## Event

To emit an event, the service should call `MESG.emitEvent` function with the event's key and event's data as parameters. This function returns a `Promise`.

```javascript
MESG.emitEvent(__EVENT_KEY__, __EVENT_DATA__)
```

### Example

Let's take a timer service as example. It will emit a `minute` event every minute. Its `service.yml` is:
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
  MESG.emitEvent('minute', {
    timestamp: Date.now()
  })
}
setInterval(emitEvent, 60 * 1000)
```

# Community

# Contribute