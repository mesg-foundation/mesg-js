const loadAPI = require("./load")

module.exports = {
  service: loadAPI("Service", __dirname + "/../proto/api.proto")
}