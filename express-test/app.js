const express = require('express')

const app = express()

app.use((req, res, next)=>{
  console.log('请 求开始...', req.method, req.url)
  next()
})

app.use((req, res, next)=>{
  req.cookie = {
    userId: 'abc123'
  }
  next()
})

app.use((req, res, next)=>{
  setTimeout(()=>{
    req.body = {
      a: 100,
      b: 200
    }
    next()
  })
})

app.use('/api', (req, res, next)=> {
  console.log('处理 /api 路由')
})

app.get('/api', (req,res, next)=>{
  console.log('get /api 路由')
  next()
})

app.post('/api', (req,res, next)=>{
  console.log('post /api 路由')
  next()
})