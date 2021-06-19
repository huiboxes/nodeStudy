const express = require('express')

const router = express()
const { list } = require('../controller')

router.get('/list',list)

router.get('/index/:id', (req, res) => {
  const query = req.query
  const params = req.params
  res.json({ ...query, ...params })
})

module.exports = router
