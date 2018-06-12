const apiResponse = require('../apiResponse')

module.exports = (api, _, token) => (event, data) => new Promise((resolve, reject) => api
  .emitEvent({
    token,
    eventKey: event,
    eventData: JSON.stringify(data),
  }, apiResponse(resolve, reject)))