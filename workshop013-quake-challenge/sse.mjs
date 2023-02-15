import ejs from "ejs";
import { Writable } from "stream";
import { parseLogFile } from "./parser/index.mjs";
import { resolve } from "path";

const emitEvent = (res, eventName, data) => {
  res.write(`event: ${eventName}\n`);
  res.write(`data: ${JSON.stringify(data)}\n\n`);
}

const createSse =  (req, res) => {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'No-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  }

  res.writeHead(200, headers)
  res.flushHeaders()

  const outputStream = new Writable({
    objectMode: true,

    async write(result, _encoding, callback) {
      const templatePath = resolve("views", "partials", "result-list.ejs");
      const html = await ejs.renderFile(templatePath, { games: result.games });
      const topics = req.query.topics || ''
      if (topics.includes("game")) {
        emitEvent(res, 'results.html', { html })
      }

      callback();
    }
  });

  parseLogFile(outputStream, (error) => {
    if (error) {
      return;
    }
    res.end()
  });

  res.on('close', () => {
    res.end()
  })
}

export default createSse;
