const apiResponse = require('../apiResponse')

module.exports = (api, { serviceID, taskKey, inputs }) => ({ eventKey, eventData }) => new Promise((resolve, reject) => api
  .ExecuteTask({
    serviceID,
    taskKey,
    taskData: JSON.stringify(typeof inputs === 'function'
      ? inputs(eventKey, JSON.parse(eventData))
      : inputs || {}),
  }, apiResponse(resolve, reject)))