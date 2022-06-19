const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json',
  }
})

router.get('/session-tests', async function (ctx, next) {
  if (ctx.session.viewCount == null) {
    ctx.session.viewCount = 0
  }

  ctx.session.viewCount++

  ctx.body = {
    errno: 0,
    viewCount
  }
})

module.exports = router
