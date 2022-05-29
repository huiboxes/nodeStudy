const handleUserRouter = ({ method, url }, res) => {
  const path = url.split('?')[0]
  if (method === 'POST' && path === '/api/user/login') {
    return {
      msg: '登录接口',
    }
  }
}

module.exports = handleUserRouter
