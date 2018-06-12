const apiResponse = require('../apiResponse')

module.exports = (api, _, hash) => (event, data) => new Promise((resolve, reject) => api
  .emitEvent({
    serviceHash: hash,
    eventKey: event,
    eventData: JSON.stringify(data),
  }, apiResponse(resolve, reject)))