const querystring = require('querystring')
const { access } = require('./src/utils/log')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const redis = require('./src/db/redis')

// session数据
// const SESSION_DATA = {}

const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let postData = ''
    req.on('data', (chunk) => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(JSON.parse(postData))
    })
  })
}

const serverHandle = async (req, res) => {
  // 记录 access log
  access(
    `${req.method} -- ${req.url} -- ${
      req.headers['user-agent']
    } -- ${Date.now()}`
  )

  res.setHeader('Content-Type', 'application/json')
  // process.env.NODE_ENV

  const url = req.url
  req.path = url.split('?')[0]

  req.query = querystring.parse(url.split('?')[1])

  // 解析cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(';').forEach((item) => {
    if (!item) {
      return
    }
    const arr = item.split('=')
    const key = arr[0].trim()
    const val = arr[1].trim()
    req.cookie[key] = val
  })

  // 解析session
  // let needSetCookie = false
  // let userId = req.cookie.userId
  // if (userId) {
  //   if (!SESSION_DATA[userId]) {
  //     SESSION_DATA[userId]
  //   }
  //   req.session = SESSION_DATA[userId]
  // } else {
  //   needSetCookie = true
  //   userId = `${Date.now()}_${Math.random()}`
  //   SESSION_DATA[userId] = {}
  // }
  // req.session = SESSION_DATA[userId]

  // 解析session (使用redis)
  let needSetCookie = false
  let userId = req.cookie.userId
  if (!userId) {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    // 初始化session
    await redis.set(userId, {})
  }
  // 获取session
  req.sessionId = userId
  await redis
    .get(req.sessionId)
    .then(async (sessionData) => {
      if (sessionData == null) {
        // 初始化redis中的session值
        await redis.set(req.sessionId, {})
        // 设置session
        req.session = {}
      } else {
        req.session = sessionData
      }
      console.log('req.session', req.session)
      // 处理 post data
      return getPostData(req)
    })
    .then((postData) => {
      req.body = postData

      const blogResult = handleBlogRouter(req, res)
      if (blogResult) {
        blogResult.then((blogData) => {
          if (needSetCookie) {
            res.setHeader('Set-Cookie', `userId=${userId};path=/;httpOnly`)
          }

          res.end(JSON.stringify(blogData))
        })
        return
      }

      const userResult = handleUserRouter(req, res)
      if (userResult) {
        userResult.then((userData) => {
          if (needSetCookie) {
            res.setHeader('Set-Cookie', `userId=${userId};path=/;httpOnly`)
          }

          res.end(JSON.stringify(userData))
        })
        return
      }

      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.write('404 Not Found\n')
      res.end()
    })
}

module.exports = serverHandle
