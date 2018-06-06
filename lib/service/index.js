const grpc = require('grpc')
const YAML = require("js-yaml")
const fs = require("fs")
const listenTask = require('./listenTask')
const emitEvent = require('./emitEvent')

module.exports = () => {
  const proto = grpc.load(__dirname + "/../../proto/api.proto")
  const service = YAML.safeLoad(fs.readFileSync("./mesg.yml"))
  const api = new proto.api.Service(
    process.env.MESG_ENDPOINT_TCP,
    grpc.credentials.createInsecure(),
    {}
  )
  return {
    listenTask: listenTask(api, service),
    emitEvent: emitEvent(api, service)
  }
}