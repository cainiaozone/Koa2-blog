var router = require('koa-router')();

router.get('/signout', async (ctx, next) => {
  ctx.session = null;
  console.log('退出成功')
  ctx.body = 'true'
})

module.exports = router