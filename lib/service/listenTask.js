const apiResponse = require('../apiResponse')

const wrongTasksError = (service, tasks) => {
  const invalidTasks = tasks.filter(x => !service.tasks[x])
  return invalidTasks.length > 0
    ? new Error(`The following tasks are not present in your mesg.yml file: ${invalidTasks.join(', ')}`)
    : null
}

const generateOutputCallbacks = (api, service, { executionID, taskKey }) => Object.keys(service.tasks[taskKey].outputs)
  .reduce((acc, outputKey) => ({
    ...acc,
    [outputKey]: outputData => new Promise((resolve, reject) => api.SubmitResult({
      executionID,
      outputKey,
      outputData: JSON.stringify(outputData),
    }, apiResponse(resolve, reject)))
  }), {})

const handler = (api, service, callbacks) => ({ executionID, taskKey, inputData }) => {
  const callback = callbacks[taskKey]
  if (!callback) {
    throw new Error(`Task ${taskKey} is not defined in your services`)
  }

  callback(JSON.parse(inputData), generateOutputCallbacks(api, service, { executionID, taskKey }))
}

module.exports = (api, service, hash) => callbacks => {
  const err = wrongTasksError(service, Object.keys(callbacks))
  if (err) {
    throw err
  }
  return api
    .listenTask({ serviceHash: hash })
    .on('data', handler(api, service, callbacks))
}