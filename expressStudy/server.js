const express = require('express')

const app = express()
const port = 8080

const middleware = [
  (req, res, next) => {
    console.log(0)
    next()
  },
  (req, res, next) => {
    console.log(1)
    next()
  },
  (req, res) => {
    console.log(2)
  },
]

app.use('/api',middleware)

// app.use('/', (req, res) => {
//   res.send('hello world')
// })

app.listen(port, () => {
  console.log(`running on port ${port}`)
})
