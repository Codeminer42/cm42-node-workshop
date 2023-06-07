const amqplib = require("amqplib");
const nodemailer = require("nodemailer");
const Redis = require("ioredis");

const transporter = nodemailer.createTransport(process.env.MAIL_URL);
const redis = new Redis("redis://redis:6379/0");

const chaosMonkey =
  (fn) =>
  async (...args) => {
    const result = await fn(...args);

    if (Math.random() < 0.5) throw new Error("Give me a banana");

    return result;
  };

const sendWelcomeEmail = chaosMonkey(async ({ messageId, email, username }) => {
  await transporter.sendMail({
    from: "RealWorld <welcome@realworld.com>",
    to: email,
    subject: "Welcome",
    html: `<h1>Welcome, ${username}</h1>`,
  });

  redis.set(messageId, "processed");
});

const run = async () => {
  const conn = await amqplib.connect(process.env.QUEUE_URL);
  const channel = await conn.createChannel();

  await channel.assertQueue("realworld-events");

  channel.consume("realworld-events", async (eventMessage) => {
    if (eventMessage === null) return;

    const event = JSON.parse(eventMessage.content.toString());
    const { messageId } = eventMessage.properties;

    console.log({ event, messageId });

    if ((await redis.get(messageId)) === "processed")
      return channel.ack(eventMessage);

    if (event.kind === "new_account")
      await sendWelcomeEmail({
        messageId,
        email: event.data.email,
        username: event.data.username,
      });

    channel.ack(eventMessage);
  });
};

run().then(() => console.log("Started mailer service"));
