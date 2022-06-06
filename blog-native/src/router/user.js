const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const redis = require('../db/redis')

const handleUserRouter = (req, res) => {
  const method = req.method
  if (method === 'GET' && req.path === '/api/user/login') {
    // const { username, password } = req.body
    const { username, password } = req.query
    const result = login(username, password)
    return result.then(async (data) => {
      if (data.username) {
        req.session.username = data.username
        req.session.realname = data.realname
        await redis.set(req.sessionId, req.session)
        console.log(22222222222222, await redis.get(req.sessionId))
        return new SuccessModel()
      } else {
        return new ErrorModel('登录失败')
      }
    })
  }
}

module.exports = handleUserRouter
