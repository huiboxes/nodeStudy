class BaseModel {
  constructor(data, message) {
    if (typeof data === 'string') {
      this.message = data
      // 兼容处理，处理第一个是字符串，后面的不是的情况
      data = null
      message = null
    }
  }
}
