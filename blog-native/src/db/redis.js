const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

class Redis {
  constructor() {
    this.client = redis.createClient(REDIS_CONF)
    this.client.on('error', (err) => {
      console.log(err)
    })
    this.connect()
  }

  async connect() {
    await this.client.connect()
  }
  quit() {
    this.client.quit()
  }

  async set(key, value, time) {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }

    time
      ? await this.client.set(key, value, {
          EX: time,
          NX: true,
        })
      : await this.client.set(key, value)
  }

  async get(key) {
    return new Promise(async (resolve, reject) => {
      const data = await this.client.get(key)
      try {
        resolve(JSON.parse(data))
      } catch (error) {
        resolve(data)
      }
    })
  }

  async delete(key) {
    await this.client.del(key)
  }
}

module.exports = new Redis()
