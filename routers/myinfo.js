var router = require('koa-router')();
var userModel = require('../lib/mysql')

// Get '/myinfo'  跳转个人资料页面
router.get('/myinfo', async (ctx, next) => {
  await ctx.render('myinfo', {
    session: ctx.session
  })
})

// Get

module.exports = router