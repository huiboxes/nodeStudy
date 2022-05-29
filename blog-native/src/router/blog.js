const handleBlogRouter = ({ method, url }, res) => {
  const path = url.split('?')[0]

  if (method === 'GET' && path === '/api/blog/list') {
    return {
      msg: '获取博客列表',
    }
  }
  if (method === 'GET' && path === '/api/blog/detail') {
    return {
      msg: '获取博客详情',
    }
  }
  if (method === 'POST' && path === '/api/blog/new') {
    return {
      msg: '新建博客',
    }
  }
  if (method === 'PUT' && path === '/api/blog/update') {
    return {
      msg: '更新博客',
    }
  }
  if (method === 'DELETE' && path === '/api/blog/del') {
    return {
      msg: '删除博客',
    }
  }
}

module.exports = handleBlogRouter
