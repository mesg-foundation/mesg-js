const apiResponse = require('../apiResponse')

module.exports = (api, service) => (event, data) => new Promise((resolve, reject) => api
  .emitEvent({
    service,
    eventKey: event,
    eventData: JSON.stringify(data),
  }, apiResponse(resolve, reject)))