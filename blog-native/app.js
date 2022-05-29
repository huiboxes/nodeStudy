const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const serverHandle = (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  // process.env.NODE_ENV

  const url = req.url
  req.path = url.split('?')[0]

  req.query = querystring.parse(url.split('?')[1])

  const blogData = handleBlogRouter(req, res)
  if (blogData) {
    res.end(JSON.stringify(blogData))
    return
  }

  const userData = handleUserRouter(req, res)
  if (userData) {
    res.end(JSON.stringify(userData))
    return
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' })
  res.write('404 Not Found\n')
  res.end()
}

module.exports = serverHandle
