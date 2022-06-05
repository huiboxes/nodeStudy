const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

async function redisFactory() {
  const redisClient = redis.createClient(REDIS_CONF)
  redisClient.on('error', (err) => {
    console.log(err)
  })
  await redisClient.connect()

  return {
    async set(key, val) {
      if (typeof val === 'object') {
        val = JSON.stringify(val)
      }
      await redisClient.set(key, val)
    },
    async get(key) {
      const value = await redisClient.get(key)
      try {
        return JSON.parse(value)
      } catch (e) {
        return value
      }
    },
  }
}

module.exports = redisFactory()
