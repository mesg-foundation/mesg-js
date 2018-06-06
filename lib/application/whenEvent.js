const start = require('./start')
const execute = require('./execute')

module.exports = api => async (event, task) => {
  try {
    await start(api, event.serviceID)
    await start(api, task.serviceID)
  } catch (e) {
    throw new Error(`Error while starting service ${e}`)
  }
  return api
    .ListenEvent({
      serviceID: event.serviceID,
      eventFilter: event.filter || '*'
    })
    .on('data', execute(api, task))
}