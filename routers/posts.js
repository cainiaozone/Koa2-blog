var router = require('koa-router')();
// 处理数据库
var userModel = require('../lib/mysql');
// 时间中间件
var moment = require('moment');

// GET  '/' 首页重定向到文章列表页面
router.get('/', async (ctx, next) => {
  ctx.redirect('/posts')
})

// GET '/posts' 跳转文章列表页面
router.get('/posts', async (ctx, next) => {
  // 在这里我们先通过查找有没有类似 /post?author=XXX 的链接跳转，如果有就执行下面这句话，把用户名取下来，由于用户名可能存在中文，所以我们进行解码
  if (ctx.request.querystring) {
    console.log('ctx.request.querystring', decodeURIComponent(ctx.request.querystring.split('=')[1]))
    await userModel.findDataByUser(decodeURIComponent(ctx.request.querystring.splict('=')[1]))
      .then(result => {
        res = JSON.parse(JSON.stringify(result))
<<<<<<< HEAD
        // console.log(res)
=======
        console.log(res)
>>>>>>> 2f0970eff13433e8641ac6e0ab940045f0c1c4df
      });
    await ctx.render('posts', {
      session: ctx.session,
      posts: res
    })
  } else {
    // 如果链接是正常的，如 /posts 则我们获取的是全部文章的列表，所以通过 findAllPost 查找全部文章并向模板传递数据 posts,posts的值为 res
    await userModel.findAllPost()
      .then(result => {
        // console.log(result)
        res = JSON.parse(JSON.stringify(result))
<<<<<<< HEAD
        // console.log('posts:', res)
=======
        console.log('posts:', res)
>>>>>>> 2f0970eff13433e8641ac6e0ab940045f0c1c4df
      })
    await ctx.render('posts', {
      session: ctx.session,
      posts: res
    })
  }

})

// GET '/create'  跳转发表文章页面
router.get('/create', async (ctx, next) => {
  await ctx.render('create', {
    session: ctx.session
  })
})

// POST '/create'  发布文章
router.post('/create', async (ctx, next) => {
<<<<<<< HEAD
  // console.log(ctx.session)
=======
  console.log(ctx.session)
>>>>>>> 2f0970eff13433e8641ac6e0ab940045f0c1c4df
  var title = ctx.request.body.title;
  var content = ctx.request.body.content;
  var uid = ctx.session.id;
  var name = ctx.session.user;
  var time = moment().format('YYYY-MM-DD HH:mm')
<<<<<<< HEAD
  // console.log([name, title, content, uid, time])
=======
  console.log([name, title, content, uid, time])
>>>>>>> 2f0970eff13433e8641ac6e0ab940045f0c1c4df

  // 这里我们向数据库插入用户名、标题、内容、发表文章用户的 id、时间，成功返回 true，失败返回 false
  await userModel.insertPost([name, title, content, uid, time])
    .then(() => {
      ctx.body = 'true'
    }).catch(() => {
      ctx.body = 'false'
    })

})

// Get '/posts/:postId' 查看单篇文章
router.get('/posts/:postId', async (ctx, next) => {
  // 通过文章 id 查找返回数据，然后增加 pv，浏览+1
  await userModel.findDataById(ctx.params.postId)
    .then(result => {
      res = JSON.parse(JSON.stringify(result))
      res_pv = parseInt(JSON.parse(JSON.stringify(result))[0]['pv'])
      res_pv += 1
    })
  // 更新 pv
  await userModel.updatePostPv([res_pv, ctx.params.postId])
  // 获取该文章评论列表
  await userModel.findCommentById(ctx.params.postId)
    .then(result => {
      comment_res = JSON.parse(JSON.stringify(result))
    })
  // 渲染模板，并传递三个数据
  await ctx.render('sPost', {
    session: ctx.session,
    posts: res,
    comments: comment_res
  })
})

// Post '/:postId' 发表评论
router.post('/:postId', async (ctx, next) => {
  var name = ctx.session.user
  var content = ctx.request.body.content
  var postId = ctx.params.postId

  await userModel.insertComment([name, content, postId])
  // 获取文章评论数据 +1
  await userModel.findDataById(postId)
    .then(result => {
<<<<<<< HEAD
      // console.log(JSON.parse(JSON.stringify(result)));
=======
      console.log(JSON.parse(JSON.stringify(result)));
>>>>>>> 2f0970eff13433e8641ac6e0ab940045f0c1c4df
      res_comments = parseInt(JSON.parse(JSON.stringify(result))[0]['comments'])
      res_comments += 1
    })
  // 更新评论数
  await userModel.updatePostComment([res_comments, postId])
    .then(() => {
      ctx.body = 'true'
    }).catch(() => {
      ctx.body = 'false'
    })
})

// 删除评论
router.get('/posts/:postId/comment/:commentId/remove', async (ctx, next) => {
  var postId = ctx.params.postId
  var commentId = ctx.params.commentId

  // 查看文章数据，获取评论数 -1
  await userModel.findDataById(postId)
    .then(result => {
      res_comments = parseInt(JSON.parse(JSON.stringify(result))[0]['comments'])
      res_comments -= 1
    })
  // 更新文章评论数
  await userModel.updatePostComment([res_comments, postId])
  // 删除该条评论
  await userModel.deleteComment(commentId)
    .then(() => {
      ctx.body = {
        data: 1
      }
    }).catch(() => {
      ctx.body = {
        data: 2
      }
    })
})

// 删除文章
router.get('/posts/:postId/remove', async (ctx, next) => {
  var postId = ctx.params.postId
  // 删除该文章所有评论
  await userModel.deleteAllPostComment(postId)
  // 删除该文章
  await userModel.deletePost(postId)
    .then(() => {
      ctx.body = {
        data: 1
      }
    }).catch(() => {
      ctx.body = {
        data: 2
      }
    })
})

// Get '/posts/:postId/edit' 跳转到编辑文章页面
router.get('/posts/:postId/edit', async (ctx, next) => {
  var name = ctx.session.user
  var postId = ctx.params.postId
  // 查找文章
  await userModel.findDataById(postId)
    .then(result => {
      res = JSON.parse(JSON.stringify(result))
<<<<<<< HEAD
      // console.log("修改文章：" + res)
=======
      console.log("修改文章：" + res)
>>>>>>> 2f0970eff13433e8641ac6e0ab940045f0c1c4df
    })
  await ctx.render('edit', {
    session: ctx.session,
    posts: res
  })
})

// Post '/posts/:postId/edit'
router.post('/posts/:postId/edit', async (ctx, next) => {
  var title = ctx.request.body.title
  var content = ctx.request.body.content
  var postId = ctx.params.postId

  await userModel.updatePost([title, content, postId])
    .then(() => {
      ctx.body = 'true'
    }).catch(() => {
      ctx.body = 'false'
    })
})


module.exports = router