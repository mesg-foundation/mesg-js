const grpc = require('grpc')
const whenEvent = require('./whenEvent')
const whenResult = require('./whenResult')


module.exports = () => {
  const proto = grpc.load(__dirname + "/../../proto/api-core.proto")
  const api = new proto.api.Core(
    process.env.MESG_ENDPOINT || 'localhost:50052',
    grpc.credentials.createInsecure(),
    {}
  )
  return {
    whenEvent: whenEvent(api),
    whenResult: whenResult(api)
  }
}