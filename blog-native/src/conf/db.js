const env = process.env.NODE_ENV

let MYSQL_CONF
let REDIS_CONF

if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'huibox',
    port: '3655',
    database: 'myblog',
  }

  REDIS_CONF = {
    url: 'redis://:123456@127.0.0.1:6379',
  }
}

if (env === 'production') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'huibox',
    port: '3655',
    database: 'myblog',
  }

  REDIS_CONF = {
    url: 'redis://:123456@127.0.0.1:6379',
  }
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF,
}
