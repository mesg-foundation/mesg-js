const MESG = require('mesg-js').service()

MESG.listenTask({
  taskX: require('./tasks/taskX')
})

setInterval(() => MESG.emitEvent("started", { x: true }), 1000)
