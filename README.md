<p align="center">
  <img src="https://cdn.rawgit.com/mesg-foundation/mesg-js/873333a6/logo.svg" alt="MESG.js" height="120">
  <br/><br/>
</p>

[Website](https://mesg.com/) - [Docs](https://docs.mesg.com/) - [Chat](https://discordapp.com/invite/SaZ5HcE) - [Blog](https://medium.com/mesg)

MESG.js is the official JavaScript library to interact with [MESG Engine](https://github.com/mesg-foundation/engine).

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
  - [Advanced utilization](#advanced-utilization-1)
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

## MESG Engine endpoint

By default, the library connects to the MESG Engine from the endpoint `localhost:50052`.

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
  tagFilters: [__TAG_FILTER_] // optional
}).on('data', (result) => {
  if (result.error) {
    console.error('an error has occurred:', result.error)
    return
  }
  console.log('a result received:', JSON.parse(result.outputData))
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
  console.log('task in progress with execution:', execution.executionHash)
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
  if (result.error) {
    console.error('an error has occurred:', result.error)
    return
  }
  console.log('a result received:', JSON.parse(result.outputData))
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

  // List of tags required to process this result. All inclusive filter.
  tagFilters?: string[]
}
```

### `ResultData`

```ts
interface ResultData {
  // Hash of the execution.
  executionHash: string

  // Task key of the result.
  taskKey: string

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
  // Hash of the execution.
  executionHash: string
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
  if (error) {
    console.error(error)
    return
  }
  console.log('task in progress with execution:', reply.executionHash)
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

The service have to call `mesg.listenTask` to start listening for task to execute by passing an object containing the tasks' key and function.

```javascript
mesg.listenTask({
  'TASK_1_KEY': (inputs) => {
    // Function of the task 1
    // Can directly throw error
    if (inputs.foo === undefined) {
      throw new Error('foo is undefined')
    }
    // Return an object
    return { foo: inputs.a + 'bar' }
  }, 
  'TASK_2_KEY': (inputs) => {
    // Function of the task 2
    // Return an Promise containing an object
    return Promise.new(resolve => {
      resolve( { foo: inputs.a + 'bar' })
    })
  },
}).on('error', (error) => {
  console.error(error)
})
```

`mesg.listenTask` returns an [event emitter](https://nodejs.org/api/events.html#events_class_eventemitter) with possible events `data` and `error`.

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
      result:
        type: Number
```

If you want more information about this file, check out the [documentation on service files](https://docs.mesg.com/guide/service/service-file.html).

#### Task function

Task functions accept `inputs` as parameter and returns the `outputs` as object or Promise of object.

The parameter `inputs` is an object that contains the two task's inputs: `a` and `b` in this example.

The task function have to return an object or a Promise of object containing the task's outputs: `result` in this example.

The task function can also throw an Error in case of error. The lib will catch it and send it to the MESG Engine.

```javascript
const taskMultiply = (inputs) => {
  if (inputs.foo === undefined) {
    throw new Error('foo is undefined')
  }
  return { result: inputs.a * inputs.b }
}
```

#### Listen for task

The service have to call `mesg.listenTask` function to start listening for task to execute.

This function accepts an object containing the tasks' keys as object keys, and the task's function as object value.

In this example, the key is `multiply` and the function is `taskMultiply`.

```javascript
mesg.listenTask({
  multiply: taskMultiply
}).on('error', (error) => {
  console.error(error)
})
```

#### Javascript code

Here is the full Javascript code of this example:

```javascript
// Require MESG.js as a service
const { service } = require('mesg-js')

const mesg = service()

// create taskMultiply handler
const taskMultiply = (inputs) => {
  if (inputs.a === undefined || inputs.b === undefined) {
    // There is an error. Return the error output with the message.
    throw new Error('a or b is undefined')
  }
  // Return the success output with the result of the multiplication
  return {
    result: inputs.a * inputs.b
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

## Advanced utilization

The service can use gRPC APIs directly for advanced utilization.

See the [full list of available gRPC APIs](https://docs.mesg.com/api/service.html).

# Community

You can find us and other MESG users on the [forum](https://forum.mesg.com). Feel free to check existing posts and help other users of MESG.

Also, be sure to check out the [blog](https://medium.com/mesg) to stay up-to-date with our articles.

# Contribute

Contributions are more than welcome.

If you have any questions, please reach out to us directly on [Discord](https://discordapp.com/invite/5tVTHJC).
