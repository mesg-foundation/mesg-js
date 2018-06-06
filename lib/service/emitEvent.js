module.exports = (api, service) => (event, data) => new Promise((resolve, reject) => api
  .emitEvent({
    service,
    eventKey: event,
    eventData: JSON.stringify(data),
  }, (err, res) => err || res.error ? reject(err || res.error) : resolve(res)))