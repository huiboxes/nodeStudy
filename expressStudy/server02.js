const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const router = require('./router')

const port = 8080

app.use(bodyParser.urlencoded({extended: false}))
app.use(router)


app.listen(port, () => {
  console.log(`running on port ${port}`)
})
