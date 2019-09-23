# Changelog

## [Unreleased](https://github.com/mesg-foundation/mesg-js/compare/v3.0.0...master)

#### Breaking Changes
#### Added
#### Changed
#### Fixed
#### Removed

## [v4.4.0](https://github.com/mesg-foundation/mesg-js/compare/v4.4.0)

#### Added

- ([#132](https://github.com/mesg-foundation/mesg-js/pull/132)) Add support for constants for map.
- ([#133](https://github.com/mesg-foundation/mesg-js/pull/133)) Add account api.
- ([#135](https://github.com/mesg-foundation/mesg-js/pull/135)) New api namespace, prefix all the API with mesg to avoid conflicts.

#### Changed

- ([#136](https://github.com/mesg-foundation/mesg-js/pull/136)) Normalize naming of the api (everything singular).

## [v4.3.1](https://github.com/mesg-foundation/mesg-js/compare/v4.3.1)

#### Changed

- ([#130](https://github.com/mesg-foundation/mesg-js/pull/130)) Use MESG struct instead of proto.

## [v4.3.0](https://github.com/mesg-foundation/mesg-js/compare/v4.3.0)

#### Breaking Changes

- ([#124](https://github.com/mesg-foundation/mesg-js/pull/124)) Switch from string to byte for hashes. You can use the function `decode` from [`lib/util/base58`](https://github.com/mesg-foundation/mesg-js/blob/v4.3.0/src/util/base58.ts) to convert the hashes from string.

#### Added

- ([#121](https://github.com/mesg-foundation/mesg-js/pull/121)) Add process API. ([#125](https://github.com/mesg-foundation/mesg-js/pull/125)).
- ([#126](https://github.com/mesg-foundation/mesg-js/pull/126)) Update API with gogo proto. ([#127](https://github.com/mesg-foundation/mesg-js/pull/127)).

## [v4.2.1](https://github.com/mesg-foundation/mesg-js/releases/tag/v4.2.1)

#### Fixed

- ([#116](https://github.com/mesg-foundation/mesg-js/pull/116)) Fix missing support for big number with proto structs.

## [v4.2.0](https://github.com/mesg-foundation/mesg-js/releases/tag/v4.2.0)

#### Breaking Changes

- ([#114](https://github.com/mesg-foundation/mesg-js/pull/114)) Support of proto Structs type that replace JSON strings.

#### Changed

- ([#112](https://github.com/mesg-foundation/mesg-js/pull/112)) Automatic type generation.

#### Experimental

- ([#113](https://github.com/mesg-foundation/mesg-js/pull/113)) Add workflow APIs.

## [v4.1.0](https://github.com/mesg-foundation/mesg-js/releases/tag/v4.1.0)

### [Click here to see the release notes](https://forum.mesg.com/t/release-notes-of-engine-v0-11-cli-v1-1-and-js-library-v4/339)

#### Added

- ([#104](https://github.com/mesg-foundation/mesg-js/pull/104)) Resolve instance hash from Service SID.

#### Fixed

- ([#108](https://github.com/mesg-foundation/mesg-js/pull/108)) Move filter on Execution's status from `executeTaskAndWaitResult` to `listenResult`.

## [v4.0.0](https://github.com/mesg-foundation/mesg-js/releases/tag/v4.0.0)

### [Click here to see the release notes](https://forum.mesg.com/t/release-notes-of-engine-v0-11-cli-v1-1-and-js-library-v4/339)

#### Breaking Changes

- ([#102](https://github.com/mesg-foundation/mesg-js/pull/102)) Update internal logic to the new Engine's APIs of v0.11.0. The Service side stay the same (except a few types) but the application side have some modifications on the parameters of the functions. Check the release notes on the forum for more detail.

## [v3.0.0](https://github.com/mesg-foundation/mesg-js/releases/tag/v3.0.0)

### [Click here to see the release notes](https://forum.mesg.com/t/mesg-engine-v0-10-js-cli-and-js-library-v3-0-0-release-notes/317)

#### Breaking Changes

- ([#90](https://github.com/mesg-foundation/mesg-js/pull/90)) Service task output simplification. ([#91](https://github.com/mesg-foundation/mesg-js/pull/91)). ([#99](https://github.com/mesg-foundation/mesg-js/pull/99)).
- ([#101](https://github.com/mesg-foundation/mesg-js/pull/101)) Rename executionID to executionHash.

#### Changed

- ([#92](https://github.com/mesg-foundation/mesg-js/pull/92)) Update dependencies. ([#93](https://github.com/mesg-foundation/mesg-js/pull/93)). ([#94](https://github.com/mesg-foundation/mesg-js/pull/94)). ([#95](https://github.com/mesg-foundation/mesg-js/pull/95)). ([#96](https://github.com/mesg-foundation/mesg-js/pull/96)). ([#100](https://github.com/mesg-foundation/mesg-js/pull/100)).

## [v2.1.0](https://github.com/mesg-foundation/mesg-js/releases/tag/v2.1.0)

- ([#81](https://github.com/mesg-foundation/mesg-js/pull/81)) Service: throw an error when task's output functions are called without any data.
- ([#82](https://github.com/mesg-foundation/mesg-js/pull/82)) Service: show a warning instead of throwing an error when tasks are defined in `mesg.yml` but not implemented.
- ([#84](https://github.com/mesg-foundation/mesg-js/pull/84)) Service: throw an error when emit event functions are called without any data.
- ([#86](https://github.com/mesg-foundation/mesg-js/pull/86)) Update proto files with latest version from [MESG Core](https://github.com/mesg-foundation/core).


## [v2.0.1](https://github.com/mesg-foundation/mesg-js/releases/tag/v2.0.1)

## Fixes

- Export more types and classes from service and application.

## [v2.0.0](https://github.com/mesg-foundation/mesg-js/releases/tag/v2.0.0)

### [Click here to see the release notes](https://forum.mesg.com/t/mesg-js-v2-0-0-release-notes/196)

- High level application APIs has changed.
  - Added/updated `listenEvent()`, `listenResult()`, `executeTask()`, `executeTaskAndWaitResult()`.
  - Previous ones removed.
- `application()` constructor accepts options to configure Core's endpoint.
- TS types updated to be more precise.

## [v1.4.0](https://github.com/mesg-foundation/mesg-js/releases/tag/v1.4.0)

### [Click here to see the release notes](https://forum.mesg.com/t/mesg-js-v1-4-0-release-notes/99)

- Possibility to associate tags for executions.
- Update client side filter to be more precise and support executionTags filter.
- Prevent the issue generated by core while starting the same service at the same time.

## [v1.3.0](https://github.com/mesg-foundation/mesg-js/releases/tag/v1.3.0)

- Add `filter: (key: string, data: Object) => boolean` on `whenEvent` and `whenResult`.
This way it's now possible to filter by event key, event data on events and
output key, output data on results.
- Normalize the api, use:
  - `taskKey` instead of `task`.
  - `outputKey` instead of `output`.
  - `eventKey` instead of `event`.
- Update documentation.

## [v1.2.3](https://github.com/mesg-foundation/mesg-js/releases/tag/v1.2.3)

- Fix `whenResult` callback execution

## [v1.2.2](https://github.com/mesg-foundation/mesg-js/releases/tag/v1.2.2)

- Update new API that normalize the inputs for tasks

## [v1.2.1](https://github.com/mesg-foundation/mesg-js/releases/tag/v1.2.1)

- Update latest API changes that removes error field

## [v1.2.0](https://github.com/mesg-foundation/mesg-js/releases/tag/v1.2.0)

- Export `api` for application to be able to access any api from the core

## [v1.1.2](https://github.com/mesg-foundation/mesg-js/releases/tag/v1.1.2)

- Use better communication system between service and MESG Core

## [v1.1.1](https://github.com/mesg-foundation/mesg-js/releases/tag/v1.1.1)

- Fix issue with input conversion for tasks

## [v1.1.0](https://github.com/mesg-foundation/mesg-js/releases/tag/v1.1.0)

- Add library for applications accessible with `require('mesg-js').application()`
  - **whenEvent(eventDetails, taskDetails)** that triggers a task when an event occurs
  - **whenResult(resultDetails, taskDetails)** that triggers a task when a result occurs

```
require('mesg-js')
  .application()
  .whenEvent({ serviceID: 'xxx', filter: 'request' }, {
    serviceID: 'yyy',
    task: 'taskX',
    inputs: (x, event) => ({
      ...
    })
  })
```

## [v1.0.0](https://github.com/mesg-foundation/mesg-js/releases/tag/v1.0.0)

- Add library for services accessible with `require('mesg-js').service()`
  - **listenTask(map<task, function(inputs, outputs)>)** that takes a map of task handlers that are functions with the following signature `taskX(inputs, outputs)`
```
MESG.listenTask({
  taskX: (inputs, outputs) => {
    outputs.outputX({ foo: inputs.valueX })
  }
})
```

  - **emitEvent(event, data)** that takes the name of the event and the associated data
```
MESG.emitEvent('eventX', { foo: 'bar' })
```

