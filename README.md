<p align="center">
  <img src="https://cdn.rawgit.com/mesg-foundation/mesg-js/873333a6/logo.svg" alt="MESG.js" height="120">
  <br/><br/>
</p>

[Website](https://mesg.com/) - [Docs](https://docs.mesg.com/) - [Chat](https://discordapp.com/invite/SaZ5HcE) - [Blog](https://medium.com/mesg)

MESG.js is the official JavaScript library to interact with [MESG Core](https://github.com/mesg-foundation/core).

This library can be used from an Application or a Service.

# Status
[![CircleCI](https://img.shields.io/circleci/project/github/mesg-foundation/mesg-js.svg)](https://github.com/mesg-foundation/mesg-js) [![codecov](https://codecov.io/gh/mesg-foundation/mesg-js/branch/master/graph/badge.svg)](https://codecov.io/gh/mesg-foundation/mesg-js)

# Contents

- [Installation](#installation)
- [Application](#application)
  - [Listen events](#listen-events)
  - [Listen results](#listen-results)
  - [Execute task](#execute-task)
  - [Execute task and wait result](#execute-task-and-wait-result)
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
const { application } = require('mesg-js')

const options = {
  endpoint: "localhost:50052" // default
}
const mesg = application(options)
```

## MESG Core endpoint

By default, the library connects to Core from the endpoint `localhost:50052`.

## Listen events

Listen events from a service.

```javascript
const { application } = require('mesg-js')

const mesg = application()

const stream = mesg.listenEvent({
  serviceID: __EVENT_SERVICE_ID__,
  eventFilter: __EVENT_KEY__ // optional
}).on('data', (event) => {
  console.log('an event received:', event.eventKey, JSON.parse(event.eventData))
}).on('error', (err) => {
  console.error('an error has occurred:', err.message)
}).on('end', () => {
  console.log('stream closed')
})

// cancel stream anytime
stream.cancel()
```

Reference: 
[`ListenEventRequest`](#ListenEventRequest)
[`EventData`](#EventData)

## Listen results

Listen results from a service.

```javascript
const { application } = require('mesg-js')

const mesg = application()

const stream = mesg.listenResult({
  serviceID: __RESULT_SERVICE_ID__
  taskFilter: __TASK_KEY_FILTER__ // optional
  outputFilter: __OUTPUT_KEY_FILTER__ // optional
  tagFilters: [__TAG_FILTER_] // optional
}).on('data', (result) => {
  console.log('a result received:', result.outputKey, JSON.parse(result.outputData))
}).on('error', (err) => {
  console.error('an error has occurred:', err.message)
}).on('end', () => {
  console.log('stream closed')
})

// cancel stream anytime
stream.cancel()
```

Reference: 
[`ListenResultRequest`](#ListenResultRequest)
[`ResultData`](#ResultData)

## Execute task

Execute task on a service.

```javascript
const { application } = require('mesg-js')

const mesg = application()

mesg.executeTask({
  serviceID: __TASK_SERVICE_ID__,
  taskKey: __TASK_KEY__,
  inputData: JSON.stringify(__INPUT_DATA__),
  executionTags: [__ASSOCIATE_TAG__] // optional
}).then((execution) => {
  console.log('task in progress with execution id:', execution.executionID)
}).catch((err) => {
  console.error('task execution failed with err:', err.message)
})
```

Reference: 
[`ExecuteTaskRequest`](#ExecuteTaskRequest)
[`ExecuteTaskReply`](#ExecuteTaskReply)

## Execute task and wait result

Execute task on a service and wait for its result.
This can be considered as a shortcut for using both `executeTask()` and `listenResult()` at same time.

```javascript
const { application } = require('mesg-js')

const mesg = application()

mesg.executeTaskAndWaitResult({
  serviceID: __TASK_SERVICE_ID__,
  taskKey: __TASK_KEY__,
  inputData: JSON.stringify(__INPUT_DATA__),
  executionTags: [__ASSOCIATE_TAG__] // optional
}).then((result) => {
  console.log('a result received:', result.outputKey, JSON.parse(result.outputData))
}).catch((err) => {
  console.error('task execution failed with err:', err.message)
})
```

Reference: 
[`ExecuteTaskRequest`](#ExecuteTaskRequest)
[`ResultData`](#ResultData)

## Object definition

### `ListenEventRequest`

```ts
interface ListenEventRequest {
  // Event's service ID.
  serviceID: string

  // Listen for this event's key. Leave empty or set `*` to listen for any event
  // from this service.
  eventFilter?: string
}
```

### `EventData`

```ts
interface EventData {
  // Event's key.
  eventKey: string

  // Event's data. It's JSON encoded.
  eventData: string
}
```

### `ListenResultRequest`

```ts
interface ListenResultRequest {
  // Result's service ID.
  serviceID: string

  // Only listen for this task's key. Leave empty or set `*` to listen for any
  // task's result from this service.
  taskFilter?: string

  // Only listen for the output key. If set, `taskFilter` is required.
  // Leave it empty or set `*` to listen for any task's output from this service.
  outputFilter?: string

  // List of tags required to process this result. All inclusive filter.
  tagFilters?: string[]
}
```

### `ResultData`

```ts
interface ResultData {
  // Execution id of the task that result belongs to.
  executionID: string

  // Task key of the result.
  taskKey: string

  // Output key of the result.
  outputKey: string

  // Output data of the result. It's JSON encoded.
  outputData: string

  // Associated execution tags during the task execution.
  executionTags: string[]

  // Error is filled when task execution is failed.
  error: string
}
```

### `ExecuteTaskRequest`

```ts
interface ExecuteTaskRequest {
  // Task's service ID.
  serviceID: string

  // Task key to execute.
  taskKey: string

  // Input to pass on to the task.
  // It must be JSON encoded and should fulfil the task's input definition types.
  inputData: string

  // List of tags to send for the execution. These tags can be static,
  // generated based on an event or a result.
  executionTags?: string[]
}
```

### `ExecuteTaskReply`

```ts
interface ExecuteTaskReply {
  // Unique id for the execution. 
  executionID: string
}
```

## Advanced utilization

The application can use gRPC APIs directly for advanced utilization.

See the [full list of available gRPC APIs](https://docs.mesg.com/api/core.html).

Here some examples for the most useful gRPC APIs that your application can use:

### Execute a task

```javascript
const { application } = require('mesg-js')

const mesg = application()

mesg.api.ExecuteTask({
  serviceID: __TASK_SERVICE_ID__,
  taskKey: __TASK_KEY__,
  inputData: JSON.stringify(__INPUT_DATA__)
}, (error, reply) => {
  if (error !== undefined) {
    console.error(error)
    return
  }
  console.log('task in progress with execution id:', reply.executionID)
})
```

[Documentation](https://docs.mesg.com/guide/application/execute-a-task.html)

### Listen for an event

```javascript
const { application } = require('mesg-js')

const mesg = application()

mesg.api.ListenEvent({
  serviceID: __TASK_SERVICE_ID__,
  eventFilter: __EVENT_KEY__
}).on('error', (error) => {
  console.error(error)
}).on('data', (data) => {
  console.log('Event received with data:', data)
})
```

[Documentation](https://docs.mesg.com/guide/application/listen-for-events.html#listening-for-events-from-services)

### Listen to a task's result

```javascript
const { application } = require('mesg-js')

const mesg = application()

mesg.api.ListenResult({
  serviceID: __TASK_SERVICE_ID__,
  taskFilter: __TASK_KEY__,
  outputFilter: __OUTPUT_KEY__
}).on('error', (error) => {
  console.error(error)
}).on('data', (data) => {
  console.log('Result received with data:', data)
})
```

[Documentation](https://docs.mesg.com/guide/application/listen-for-events.html#listen-for-task-execution-outputs)

# Service

Require MESG.js as a service:

```javascript
const { service } = require('mesg-js')

const mesg = service()
```

## Task

The service should call `mesg.listenTask` to register its available tasks to MESG Core. An object containing the tasks' key is the only parameter of this function and the tasks' functions are the values. This function returns an [event emitter](https://nodejs.org/api/events.html#events_class_eventemitter) with possible events `data` and `error`.

```javascript
mesg.listenTask({
  __TASK_1_KEY__: (inputs, outputs) => {
    // Function of the task 1
  }, 
  __TASK_2_KEY__: (inputs, outputs) => {
    // Function of the task 2
  },
}).on('error', (error) => {
  console.error(error)
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

If you want more information about this file, check out the [documentation on service files](https://docs.mesg.com/guide/service/service-file.html).

#### Task function

Task functions should always accept `inputs` and `outputs` as parameters.

```javascript
const taskMultiply = (inputs, outputs) => {}
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
}).catch((error) => {
  console.error(error)
})
```

And `error` is defined like:
```javascript
outputs.error({
  message: __ERROR_MESSAGE__
}).catch((error) => {
  console.error(error)
})
```

#### Register the task

The last step is to register the task function with MESG.

The service should call `mesg.listenTask` with a containing object as the key of the task, and the task's function as a value. In this example, the key is `multiply` and the function is `taskMultiply`

```javascript
mesg.listenTask({
  multiply: taskMultiply
}).on('error', (error) => {
  console.error(error)
})
```

#### Javascript code

```javascript
// Require MESG.js as a service
const { service } = require('mesg-js')

const mesg = service()

// create taskMultiply handler
const taskMultiply = (inputs, outputs) => {
  if (inputs.a === undefined || inputs.b === undefined) {
    // There is an error. Return the error output with the message.
    outputs.error({
      message: 'a and/or b are undefined'
    }).catch((error) => {
      console.error(error)
    })
  } else {
    // Return the success output with the result of the multiplication
    outputs.success({
      result: inputs.a * inputs.b
    }).catch((error) => {
      console.error(error)
    })
  }
}

// Register the task multiply to MESG
mesg.listenTask({
  multiply: taskMultiply
}).on('error', (error) => {
  console.error(error)
})
```

## Event

To emit an event, the service should call the `mesg.emitEvent` function with the event's key and event's data as parameters. This function returns a `Promise`.

```javascript
mesg.emitEvent(__EVENT_KEY__, __EVENT_DATA__).catch((error) => {
  console.error(error)
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
const { service } = require('mesg-js')

const mesg = service()

function emitEvent () {
  mesg.emitEvent('minute', {
    timestamp: Date.now()
  }).catch((error) => {
    console.error(error)
  })
}
setInterval(emitEvent, 60 * 1000)
```

# Community

You can find us and other MESG users on the [forum](https://forum.mesg.com). Feel free to check existing posts and help other users of MESG.

Also, be sure to check out the [blog](https://medium.com/mesg) to stay up-to-date with our articles.

# Contribute

Contributions are more than welcome.

If you have any questions, please reach out to us directly on [Discord](https://discordapp.com/invite/SaZ5HcE).
