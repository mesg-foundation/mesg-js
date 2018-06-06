const start = require('./start')
const execute = require('./execute')

module.exports = api => async (result, task) => {
  try {
    await start(api, result.serviceID)
    await start(api, task.serviceID)
  } catch (e) {
    throw new Error(`Error while starting service ${e}`)
  }
  return api
    .ListenResult({
      serviceID: result.serviceID,
      taskFilter: result.task || '*',
      outputFilter: result.output || '*'
    })
    .on('data', x => execute(api, task))
}