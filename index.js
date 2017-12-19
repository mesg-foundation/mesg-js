const { safeLoad } = require('js-yaml')
const { readFileSync } = require('fs')
const amqp = require('amqplib/callback_api');

const diff = (arr1, arr2) => arr1.filter(x => arr2.indexOf(x) === -1)

const createChannel = connection => new Promise((resolve, reject) => connection
  .createChannel((err, channel) => err ? reject(err) : resolve(channel)))

module.exports = (commands, start) => amqp.connect(`amqp:rabbitmq`, async (amqpError, connection) => {
  if (amqpError) throw new Error(amqpError.message)

  const config = safeLoad(readFileSync(process.cwd() + '/config.yml'))

  const missingCommands = diff(Object.keys(config.commands), Object.keys(commands))
  if (missingCommands.length) throw new Error(`Commands missing ${missingCommands.join(', ')}`)

  const privateKey = 'xxxx' // TODO
  const publicKey = 'xxxx' // TODO
  
  const encrypt = data => new Buffer(JSON.stringify(data))
  const decrypt = data => JSON.parse(data.toString())

  const channel = await createChannel(connection)
  
  const events = Object.keys(config.events)
    .reduce((acc, event) => {
      const queue = [publicKey, event].join(':')
      channel.assertQueue(queue, { durable: false })
      return {
        ...acc,
        [event]: data => {
          console.log(data)
          channel.sendToQueue(queue, encrypt(data))
        }
      }
    }, {})

  const commandListeners = Object.keys(commands)
    .map(command => {
      const queue = [publicKey, command].join(':')
      const commandEvents = (config.commands[command].events || [])
        .reduce((acc, event) => ({
          ...acc,
          [event]: events[event]
        }), {})
      channel.assertQueue(queue, { durable: false })
      channel.consume(
        queue, 
        ({ content }) => commands[command](decrypt(content), commandEvents),
        { noAck: true }
      )
      return queue
    })

  if (start) start(events)
})
