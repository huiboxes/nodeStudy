const { execSql, escape } = require('../db/mysql')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + 86400)
  return d.toGMTString()
}

const login = (username, password) => {
  const sql = `select * from users where username=${escape(username)} and password='${escape(password)}'`
  return execSql(sql).then((rows) => {
    return rows[0] || {}
  })
}

module.exports = {
  login,
}
