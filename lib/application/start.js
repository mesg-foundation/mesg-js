const apiResponse = require('../apiResponse')

module.exports = (api, serviceID) => new Promise((resolve, reject) => api
  .StartService({
    serviceID
  }, apiResponse(resolve, reject)))