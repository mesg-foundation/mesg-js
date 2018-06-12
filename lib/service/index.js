const grpc = require('grpc')
const YAML = require("js-yaml")
const fs = require("fs")
const listenTask = require('./listenTask')
const emitEvent = require('./emitEvent')

module.exports = () => {
  const proto = grpc.load(__dirname + "/../../proto/api-service.proto")
  const service = YAML.safeLoad(fs.readFileSync("./mesg.yml"))
  const serviceHash = process.env.MESG_SERVICE_HASH
  const api = new proto.api.Service(
    process.env.MESG_ENDPOINT_TCP,
    grpc.credentials.createInsecure(),
    {}
  )
  return {
    listenTask: listenTask(api, service, serviceHash),
    emitEvent: emitEvent(api, service, serviceHash)
  }
}