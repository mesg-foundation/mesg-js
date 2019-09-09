# mesg-js

[Website](https://mesg.com/) - [Docs](https://docs.mesg.com/) - [Forum](https://forum.mesg.com/) - [Chat](https://discordapp.com/invite/SaZ5HcE) - [Blog](https://medium.com/mesg)

mesg-js is the official JavaScript library to interact with [MESG Engine](https://github.com/mesg-foundation/engine).

This library can be used from an Application or a Service.

# Status
[![CircleCI](https://img.shields.io/circleci/project/github/mesg-foundation/mesg-js.svg)](https://github.com/mesg-foundation/mesg-js) [![codecov](https://codecov.io/gh/mesg-foundation/mesg-js/branch/master/graph/badge.svg)](https://codecov.io/gh/mesg-foundation/mesg-js)

# Contents

- [Installation](#installation)
- [Service](#service)
  - [Task](#task)
  - [Event](#event)
- [Application](#application)
  - [Resolve SID](#resolve-sid)
  - [Listen events](#listen-events)
  - [Listen results](#listen-results)
  - [Execute task](#execute-task)
  - [Execute task and wait result](#execute-task-and-wait-result)
- [Community](#community)
- [Contribute](#contribute)

# Installation

```bash
npm i mesg-js
```

# Service

Require mesg-js as a service:

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
  'TASK_2_KEY': async (inputs) => {
    // Function of the task 2
    // Return an Promise containing an object
    const response = await fetch('...')
    return response.json()
  },
})
```

The task functions accept `inputs` as parameter and returns the `outputs` as object or Promise of object.
The task function can throw an Error in case of error. The lib will catch it and send it to the MESG Engine.

## Event

To emit an event, the service should call the `mesg.emitEvent` function with the event's key and event's data as parameters. This function returns a `Promise`.

```javascript
mesg.emitEvent('EVENT_KEY', { foo: 'bar' })
```

# Application

Require mesg-js as an application:

```javascript
const { application } = require('mesg-js')

const mesg = application()
```

## MESG Engine endpoint

By default, the library connects to the MESG Engine from the endpoint `localhost:50052`.

## Resolve SID

Instead of hard-coding `instanceHash` in your application's env, your application can resolve dynamically using the service's SID.

```javascript
const instanceHash = await mesg.resolve('SID_OF_THE_SERVICE')

const result = await mesg.executeTaskAndWaitResult({
  instanceHash,
  .....
})
```

## Listen events

Listen events from a service.

```javascript
const instanceHash = await mesg.resolve('SID_OF_THE_SERVICE')

mesg.listenEvent({
  filter: {
    instanceHash: instanceHash,
    key: 'EVENT_KEY' // optional
  }
})
.on('data', (event) => {
  console.log('an event received:', event.key, mesg.decodeData(event.data))
})
```

## Listen results

Listen results from a service.

```javascript
const instanceHash = await mesg.resolve('SID_OF_THE_SERVICE')

mesg.listenResult({
  filter: {
    instanceHash: instanceHash,
    taskKey: 'TASK_KEY_FILTER', // optional
    tags: ['TAG_FILTER'] // optional
  }
})
.on('data', (result) => {
  if (result.error) {
    console.error('an error has occurred:', result.error)
    return
  }
  console.log('a result received:', mesg.decodeData(result.outputs))
})
```

## Execute task

Execute task on a service.

```javascript
const instanceHash = await mesg.resolve('SID_OF_THE_SERVICE')

const execution = await mesg.executeTask({
  instanceHash: instanceHash,
  taskKey: 'TASK_KEY',
  inputs: mesg.encodeData({ key: 'INPUT_DATA' }),
  tags: ['ASSOCIATE_TAG'] // optional
})
console.log('task in progress with execution:', execution.hash)
```

## Execute task and wait result

Execute task on a service and wait for its result.
This can be considered as a shortcut for using both `executeTask()` and `listenResult()` at same time.

```javascript
const instanceHash = await mesg.resolve('SID_OF_THE_SERVICE')

const result = await mesg.executeTaskAndWaitResult({
  instanceHash: instanceHash,
  taskKey: 'TASK_KEY',
  inputs: mesg.encodeData({ key: 'INPUT_DATA' }),
  tags: ['ASSOCIATE_TAG'] // optional
})
if (result.error) {
  console.error('an error has occurred:', result.error)
  throw new Error(result.error)
}
console.log('a result received:', mesg.decodeData(result.outputs))
```

# Community

You can find us and other MESG users on the [forum](https://forum.mesg.com). Feel free to check existing posts and help other users of MESG.

Also, be sure to check out the [blog](https://medium.com/mesg) to stay up-to-date with our articles.

# Contribute

Contributions are more than welcome.

If you have any questions, please reach out to us directly on [Discord](https://discordapp.com/invite/5tVTHJC).
