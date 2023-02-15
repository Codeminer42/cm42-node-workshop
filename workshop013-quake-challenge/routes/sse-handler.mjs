export const sseHandler = (req, res) => {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'No-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  }

  res.writeHead(200, headers)
  res.flushHeaders()

  parseLogFile

  setInterval(() => {
    res.write(`id: ${1}\n`)
    res.write(`data: ${Date.now()}\n`)
    res.write(`data: ${Date.now()}\n`)
    res.write(`data: ${Date.now()}\n`)
    res.write(`data: ${Date.now()}\n`)
    res.write(`data: ${Date.now()}\n`)
    res.write(`data: ${Date.now()}\n`)
    res.write(`data: ${Date.now()}\n\n`)
  }, 1000)
}
