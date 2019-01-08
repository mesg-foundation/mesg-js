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
const options = {
  endpoint: "localhost:50052" // default
}
const MESG = require('mesg-js').application(options)
```

## MESG Core endpoint

By default, the library connects to Core from the endpoint `localhost:50052`.

If you wish to set another endpoint, you must set the environmental variable `MESG_ENDPOINT` to the desired endpoint.



See the [full list of available gRPC APIs](https://github.com/mesg-foundation/mesg-js/blob/master/proto/api-core.proto).

Here some examples for the most useful gRPC APIs that your application can use:

### Execute a task

```javascript
import { application, CoreTypes } from 'mesg-js'
const api = application().api

var req = new CoreTypes.ExecuteTaskRequest()
req.setServiceid(__TASK_SERVICE_ID__)
req.setTaskkey(__TASK_KEY__)
req.setInputdata(JSON.stringify(__INPUT_DATA__))

api.executeTask(req, function (err, reply) {
  console.log('task in progress with execution id:', reply.getExecutionid())
  ...
})
```

[Documentation](https://docs.mesg.com/application/execute-a-task)

### Listen for an event

```javascript
import { application, CoreTypes } from 'mesg-js'
const api = application().api

var req = new CoreTypes.ListenEventRequest()
req.setServiceid(__TASK_SERVICE_ID__)
req.setEventfilter(__EVENT_KEY__)

api.listenEvent(req)
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
import { application, CoreTypes } from 'mesg-js'
const api = application().api

var req = new CoreTypes.ListenResultRequest()
req.setServiceid(__TASK_SERVICE_ID__)
req.setTaskFilter(__TASK_KEY__)
req.setOutputfilter(__OUTPUT_KEY__)

api.listenResult(req)
  .on('error', function(error) {
    // An error has occurred and the stream has been closed.
  })
  .on('data', function(data) {
    ...
  })
```

### Execute a task & listen for its result

```javascript
import { application, CoreTypes } from 'mesg-js'
const api = application().api
const uuidv4 = require('uuid/v4');

// https://github.com/ilgooz/service-location
const serviceID = "2bd8f053748884d5b743d4368aebb916469372e2"

const id = uuidv4()

var listenReq = new CoreTypes.ListenResultRequest()
listenReq.setServiceid(serviceID)
listenReq.addTagfilters(id)

var stream = api.listenResult(listenReq)
  .on('error', function(err) {
    if (err.code == 1) return // cancelled
    console.log("Stream error: ", err.details)
  })
  .on('data', function(data) {
    var location = JSON.parse(data.getOutputdata())
    console.log('City: ', location.city)
    stream.cancel()
  })

var execReq = new CoreTypes.ExecuteTaskRequest()
execReq.setServiceid(serviceID)
execReq.setTaskkey("locate")
execReq.setInputdata(JSON.stringify({ip: "104.198.14.52"}))
execReq.addExecutiontags(id)

api.executeTask(execReq, function(err){ 
  if (!err) return
  console.log("Execution error: ", err)
})
```

[Documentation](https://docs.mesg.com/application/listen-for-events#listen-for-task-execution-outputs)

# Service

Require MESG.js as a service:

```javascript
const MESG = require('mesg-js').service()
```

## Task

The service should call `MESG.listenTask` to register its available tasks to MESG Core. An object containing the tasks' key is the only parameter of this function and the tasks' functions are the values. This function returns an [event emitter](https://nodejs.org/api/events.html#events_class_eventemitter) with possible events `data` and `error`.

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
