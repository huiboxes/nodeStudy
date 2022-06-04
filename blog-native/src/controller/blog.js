const { execSql } = require('../db/mysql')

const getList = (author, keyword) => {
  let sql = `select id, title, content, author from blogs where 1=1 `
  // 添加 1=1 使where 在条件不存在时也不报错
  if (author) {
    sql += `and author=${author} `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc `

  return execSql(sql)
}

const getDetial = (id) => {
  const sql = `select * from blogs where id=${id}`
  return execSql(sql).then((rows) => rows[0])
}

const newBlog = (blogData = {}) => {
  const { title, content, author } = blogData
  const createtime = Date.now()
  const sql = `
    insert into blogs(title, content, createtime, author)
    values ('${title}', '${content}', '${createtime}', '${author}')
  `
  return execSql(sql).then((insertData) => {
    return {
      id: insertData.insertId,
    }
  })
}

const updateBlog = (id, blogData = {}) => {
  return true
}

const delBlog = (id) => {
  return true
}

module.exports = {
  getList,
  getDetial,
  newBlog,
  updateBlog,
  delBlog,
}
