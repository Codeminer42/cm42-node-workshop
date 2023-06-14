'use strict';

const amqplib = require('amqplib');

module.exports = (app) => {
  amqplib.connect(process.env.QUEUE_URL)
    .then((conn) => conn.createChannel()
      .then((channel) => channel.assertQueue(process.env.EVENTS_QUEUE_NAME)
        .then(() => {
          app.locals.events = {
            newAccount: (data) => {
              const message = JSON.stringify({ kind: 'new_account', data });

              channel.sendToQueue(process.env.EVENTS_QUEUE_NAME, Buffer.from(message), {
                messageId: `new_account-${data.email}`
              })
            }
          };
        })
      )
    );
};
