module.exports = (api, service) => (event, data) => new Promise((resolve, reject) => api
  .emitEvent({
    service,
    eventKey: event,
    eventData: JSON.stringify(data),
  }, (res, err) => err ? reject(err) : resolve(res)))