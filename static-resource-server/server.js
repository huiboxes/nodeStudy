const http = require('http')
const path = require('path')

const readStaticFile = require('./readStaticFile.js')

const port = 8080

http
  .createServer(async (req, res) => {
    const urlString = req.url
    const filePathName = path.join(__dirname, '/public', urlString)

    const { data, mimeType } = await readStaticFile(filePathName)

    console.log(data)

    res.writeHead(200, {
      'content-type': `${mimeType};charset=utf-8`,
    })
    res.write(data)
    res.end()
  })
  .listen(port, () => console.log(` running on port ${port} `))
