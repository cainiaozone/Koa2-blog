var router = require('koa-router')();
// 处理数据库（之前写好，在 mysql.js)
var userModel = require('../lib/mysql')
// 加密
var md5 = require('md5')

// GET '/signin' 登录页面
router.get('/signin', async (ctx, next) => {
  await ctx.render('signin', {
    session: ctx.session
  })
})

// POST '/sigin' 登录页面
router.post('/signin', async (ctx, next) => {
  // console.log(ctx.request.body)
  var name = ctx.request.body.name;
  var pass = ctx.request.body.password;

  // 这里先查找用户名存在与否，存在则判断密码正确与否，不存在就返回 false
  await userModel.findDataByName(name)
    .then(result => {
      // console.log(result)
      var res = JSON.parse(JSON.stringify(result))
      // console.log(res)
      if (name === res[0]['name'] && md5(pass) === res[0]['pass']) {
        ctx.body = 'true'
        // ctx.flash.success = '登录成功'
        ctx.session.user = res[0]['name']
        ctx.session.id = res[0]['id']
        // console.log('ctx.session.id', ctx.session.id)
        console.log('session', ctx.session)
        console.log('登录成功')
      }
    }).catch(err => {
      ctx.body = 'false'
      console.log('用户名或密码错误！')
    })
})
module.exports = router