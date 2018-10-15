const MESG = require('mesg-js').application()

const serviceID = '72489f3a98be036ed6b1e4c5e8278fb37e023f52'

MESG.whenEvent({
  serviceID,
  eventKey: 'started',
  filter: (_, d) => d['x'] === true
}, {
  serviceID,
  taskKey: 'taskX',
  inputs: (_, d) => ({
    foo: 'hello',
    bar: 'world'
  })
})
.then(() => {}, console.error)

MESG.whenResult({
  serviceID,
  outputKey: 'success',
  taskKey: 'taskX',
  filter: (_, d) => d.message === 'Hello world is valid'
}, {
  serviceID,
  taskKey: 'taskX',
  inputs: {
    foo: 'bar',
    bar: 'foo'
  }
})
.then(() => {}, console.error)