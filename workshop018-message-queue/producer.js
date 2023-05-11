const amqplib = require('amqplib');

async function run() {
  const connection = await amqplib.connect('amqp://localhost:5672');

  console.log('Connected!');

  const channel = await connection.createChannel();

  console.log('Created channel!');

  let i = 0;

  setInterval(() => {
    const msg = `Ping ${++i}`;

    channel.sendToQueue('test-queue', Buffer.from(msg));

    console.log(`Sent message: ${msg}`);
  }, 1000);
}

run();
