const amqplib = require('amqplib');

async function run() {
  const connection = await amqplib.connect('amqp://localhost:5672');

  console.log('Connected!');

  const channel = await connection.createChannel();

  console.log('Created channel!');

  await channel.assertQueue('test-queue');

  channel.consume(
    'test-queue',
    (msg) => {
      const msgText = msg.content.toString();
      const reDeliveredTag = msg.fields.redelivered ? ' (redelivered)' : '';

      console.log(msgText + reDeliveredTag);

      //channel.ack(msg)
    },
    { noAck: true }
  );
}

run();
