const amqplib = require('amqplib');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport('smtp://localhost:1025');

const run = async() => {
  const conn = await amqplib.connect('amqp://localhost:5672');
  const channel = await conn.createChannel();

  await channel.assertQueue('realworld-events');

  channel.consume('realworld-events', (eventMessage) => {
    if(eventMessage === null) {
      return;
    }

    const event = JSON.parse(eventMessage.content.toString());

    console.log(event);

    if(event.kind === 'new_account') {
      transporter.sendMail({
        from: 'realworld <welcome@realworld.com>',
        to: event.data.email,
        subject: 'Welcome',
        html: `<h1>Welcome, ${event.data.username}</h1>`
      })
    }

    channel.ack(eventMessage);
  });
};

run().then(() => console.log('Started mailer service'));
