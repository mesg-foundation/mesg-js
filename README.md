<p align="center">
  <img src="https://cdn.rawgit.com/mesg-foundation/mesg-js/2d3bc325/logo.svg" alt="MESG.js" height="120">
  <br/><br/>
</p>

[Website](https://mesg.com/) - [Docs](https://docs.mesg.com/) - [Chat](https://discordapp.com/invite/SaZ5HcE) - [Blog](https://medium.com/mesg)

MESG.js is the official JavaScript library to interact with [MESG Core](https://github.com/mesg-foundation/core).

This library can be used from an Application or a Service.


# Contents

- [Installation](#installation)
- [Application](#application)
  - [React to events](#react-to-events)
  - [React to results](#react-to-results)
  - [Advanced utilization](#advanced-utilization)
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

By default, the library connects to Core from the endpoint `localhost:50052`.

If you wish to set another endpoint, you have to set the environmental variable `MESG_ENDPOINT` to the desired endpoint.

## React to events

To react to events and trigger tasks, the application can use the `MESG.whenEvent` function:

```javascript
MESG.whenEvent(event, task)
.on('error', function(error) {
  // An error has occurred
})
```

[`event` definition](#event). [`task` definition](#task).

## React to results

To react to a task's results and trigger other tasks, the application can use the `MESG.whenResult` function:

```javascript
MESG.whenResult(result, task)
.on('error', function(error) {
  // An error has occurred
})
```

[`result` definition](#result). [`task` definition](#task).

## Object definition

The previous functions expect the following object definition:

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
.on('error', function(error) {
  // An error has occurred
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
.on('error', function(error) {
  // An error has occurred
})
```

## Advanced utilization

The application can use gRPC APIs directly for advanced utilization.

See the [full list of available gRPC APIs](https://github.com/mesg-foundation/mesg-js/blob/master/proto/api-core.proto).

Here some examples for the most useful gRPC APIs that your application can use:

### Execute a task

```javascript
const MESG = require('mesg-js').application()

MESG.api.ExecuteTask({
  serviceID: __TASK_SERVICE_ID__,
  taskKey: __TASK_KEY__,
  inputData: JSON.stringify(__INPUT_DATA__)
}, function (error, reply) {
  console.log('task in progress with execution id:', reply.executionID)
  ...
})
```

[Documentation](https://docs.mesg.com/application/execute-a-task)

### Listen to an event

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

### Listen to a task's result

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

The service should call `MESG.listenTask` to register its available tasks to MESG Core. An object containing the tasks' key is the only parameter of this function and the tasks' functions are the values:

TODO: Say it return a `EventEmitter` with `data`, `error` https://nodejs.org/api/events.html#events_class_eventemitter

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
.on('error', function (error) {
  // Handle error
})
```

`inputs` is containing the task's inputs as defined in its `service.yml`.

`outputs` is containing the task's outputs as function as defined in its `service.yml`.
The `outputs` function returns a `Promise` and should **ONLY BE CALLED ONCE** per executed task with the desired data as parameters.

### Example

Let's use a multiplication service as an example. Its `service.yml` is:
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

If you want more information about this file, check out the [documentation on service files](https://docs.mesg.com/service/service-file).

#### Task function

Task functions should always accept `inputs` and `outputs` as parameters.

```javascript
function taskMultiply(inputs, outputs)
```

#### Inputs

The parameter `inputs` is an object that contains the two task's inputs: `a` and `b`.

#### Outputs

The parameter `outputs` is an object that contains the two tasks' outputs: `success` and `error`.

`success` and `error` are functions that accept an object defined by its `data` structure as its only parameter. Those functions return a `Promise`.

> **ONLY ONE** output function should be called per task execution.

`success` is defined like:
```javascript
outputs.success({
  result: __MULTIPLICATION_RESULT__
})
.then(function () {
  ...
})
.catch(function (error) {
  // handle error
})
```

And `error` is defined like:
```javascript
outputs.error({
  message: __ERROR_MESSAGE__
})
.then(function () {
  ...
})
.catch(function (error) {
  // handle error
})
```

#### Register the task

The last step is to register the task function with MESG.

The service should call `MESG.listenTask` with a containing object as the key of the task, and the task's function as a value. In this example, the key is `multiply` and the function is `taskMultiply`

```javascript
MESG.listenTask({
  multiply: taskMultiply
})
.on('error', function (error) {
  // Handle error
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
    .catch(function (error) {
      console.error(error)
    })
  } else {
    // Return the success output with the result of the multiplication
    outputs.success({
      result: inputs.a * inputs.b
    })
    .catch(function (error) {
      console.error(error)
    })
  }
}

// Register the task multiply to MESG
MESG.listenTask({
  multiply: taskMultiply
})
.on('error', function (error) {
  console.error(error)
})
```

## Event

To emit an event, the service should call the `MESG.emitEvent` function with the event's key and event's data as parameters. This function returns a `Promise`.

```javascript
MESG.emitEvent(__EVENT_KEY__, __EVENT_DATA__)
.then(function () {
  ...
})
.catch(function (error) {
  // handle error
})
```

### Example

Let's use a timer service as another example. It will emit a `minute` event every minute. Its `service.yml` is:
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
  .catch(function (error) {
    console.error(error)
  })
}
setInterval(emitEvent, 60 * 1000)
```

# Community

# Contribute
