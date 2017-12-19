const amqp = require('amqplib/callback_api');

amqp.connect(`amqp:127.0.0.1`, (err, conn) => {
  if (err) throw new Error(err.message)
  conn.createChannel((err, ch) => {
    if (err) throw new Error(err.message)

    // ch.consume('xxxx:webhookSent', ({ content }) => console.log(content.toString()))

    ch.sendToQueue('xxxx:webhook', new Buffer(JSON.stringify({
      url: 'http://webhook.site/c4cf823d-201d-436a-956e-40434dd68552',
      headers: {
        foo: 'bar'
      },
      data: {
        hello: 'world'
      }
    })))
  })
  // setTimeout(function() { conn.close(); process.exit(0) }, 500);
})


