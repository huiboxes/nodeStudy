const getList = (author, keyword) => {
  return [
    {
      id: 1,
      title: '标题A',
      contetnt: '内容A',
      createTime: 1653834774298,
      author: '张三',
    },
    {
      id: 2,
      title: '标题B',
      contetnt: '内容B',
      createTime: 1653834774298,
      author: '李四',
    },
  ]
}

const getDetial = (id) => {
  return {
    id: 1,
    title: '标题A',
    contetnt: '内容A',
    createTime: 1653834774298,
    author: '张三',
  }
}





module.exports = {
  getList,
  getDetial
}
