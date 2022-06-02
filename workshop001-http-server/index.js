const http = require("http");
const fs = require("fs/promises");
const db = require("./database.json");
const url = require("url");

const server = http.createServer(async (req, res) => {
  const params = req.url.split("/")[2];
  switch (req.url) {
    case "/posts":
      res.end(JSON.stringify(db.posts));
      break;
    case `/post/${params}`:
      res.end(JSON.stringify(db.posts.find((post) => post.id == params)));
      break;
    default:
      res.end(params);
      break;
  }
});

server.listen(8000);
