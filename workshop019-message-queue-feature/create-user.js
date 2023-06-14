const { randomUUID } = require("crypto");

const id = randomUUID().slice(0, 7);

fetch("http://localhost:3000/api/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    user: {
      username: id,
      email: `${id}@bar.com`,
      password: id,
    },
  }),
})
  .then((res) =>
    res.json().then((data) => console.log({ status: res.status, data }))
  )
  .catch(console.error);
