class BaseModel {
  constructor(data, message) {
    if (typeof data === 'string') {
      this.message = data
      // 兼容处理，处理第一个是字符串，后面的不是的情况
      data = null
      message = null
    }
    if (data) this.data = data
    if (message) this.message = message
  }
}

class SuccessModel extends BaseModel {
  constructor(data, message) {
    super(data, message)
    this.errno = 0
  }
}

class ErrorModel extends BaseModel {
  constructor(data, message) {
    super(data, message)
    this.errno = -1
  }
}

module.exports = {
  SuccessModel,
  ErrorModel,
}
