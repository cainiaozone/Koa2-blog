var router = require('koa-router')();

// 处理数据库（之前已经写好，在 mysql.js）

var userModel = require('../lib/mysql.js');
// 加密
var md5 = require('md5')

// GET '/signup' 注册页

router.get('/signup', async (ctx, next) => {
  await ctx.render('signup', {
    session: ctx.session
  })
})

// POST  '/signup' 注册页
router.post('/signup', async (ctx, next) => {
  console.log(ctx.request.body)
  var user = {
    name: ctx.request.body.name,
    pass: ctx.request.body.password,
    repeatpass: ctx.request.body.repeatpass
  }
  await userModel.findDataByName(user.name)
    .then(result => {
      console.log(result);
      if (result.length) {
        try {
          throw Error('用户存在')
        } catch (error) {
          // 处理 err
          console.log(error)
        }
        ctx.body = {
          data: 1
        };
      } else if (user.pass !== user.repeatpass || user.pass == '') {
        ctx.body = {
          data: 2
        };
      } else {
        ctx.body = {
          data: 3
        };
        console.log('注册成功')
        userModel.insertData([ctx.request.body.name, md5(ctx.request.body.password)])
      }
    })
})

module.exports = router