const grpc = require('grpc')
const YAML = require("js-yaml")
const fs = require("fs")

module.exports = (type, endpoint) => {
  const proto = grpc.load(endpoint)
  const service = YAML.safeLoad(fs.readFileSync("./mesg.yml"))
  const api = new proto.api[type](
    process.env.MESG_ENDPOINT_TCP,
    grpc.credentials.createInsecure(),
    {}
  )
  
  return Object
    .keys(proto.api[type].service)
    .reduce((acc, method) => ({
      ...acc,
      [method]: (payload = {}) => new Promise((resolve, reject) => api[method]({
        service,
        ...payload,
      }, (res, err) => err ? reject(err) : resolve(err)))
    }), {})
}