var mysql = require('mysql');
var config = require('../config/default.js');

var pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE
})

let query = function(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        resolve(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}

users =
  `create table if not exists users(
  id INT NOT NULL AUTO_INCREMENT,
  name  VARCHAR(100) NOT NULL,
  pass VARCHAR(40) NOT NULL,
  PRIMARY KEY (id)
);`

posts =
  `create table if not exists posts(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  title VARCHAR(40) NOT NULL,
  content VARCHAR(40) NOT NULL,
  uid VARCHAR(40) NOT NULL,
  moment VARCHAR(40) NOT NULL,
  comments VARCHAR(40) NOT NULL DEFAULT '0',
  pv VARCHAR(40) NOT NULL DEFAULT '0',
  PRIMARY KEY (id)
);`

comment =
  `create table if not exists comment(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  content VARCHAR(40) NOT NULL,
  postid VARCHAR(40) NOT NULL,
  PRIMARY KEY (id)
);`

let createTable = function(sql) {
  return query(sql, [])
}

// 建表
createTable(users)
createTable(posts)
createTable(comment)

// 注册用户
let insertData = function(value) {
  let _sql = "insert into users(name,pass) values(?,?);"
  return query(_sql, value)
}
// 删除用户（测试使用）
let deleteUserData = function(name) {
  let _sql = `delete from users where name="${name}";`
  return query(_sql)
}
// 查找用户（测试使用）
let findUserData = function(name) {
  let _sql = `select * from users where name ="${name}";`
  return query(_sql)
}

// 发表文章
let insertPost = function(value) {
  let _sql = "insert into posts(name,title,content,uid,moment) values(?,?,?,?,?);"
  return query(_sql, value)
}
// 更新文章评论数
let updatePostComment = function(value) {
  let _sql = "update posts set comments = ? where id = ?"
  return query(_sql, value)
}
// 更新浏览数
let updatePostPv = function(value) {
  let _sql = "update posts set pv = ? where id =?"
  return query(_sql, value)
}

// 发表评论
let insertComment = function(value) {
  let _sql = "insert into comment(name,content,postid) values(?,?,?);"
  return query(_sql, value)
}
// 通过名字查找用户
let findDataByName = function(name) {
  let _sql =
    `select * from users where name ="${name}"`
  return query(_sql)
}
// 通过文章的用户名字查找文章
let findDataByUser = function(name) {
  let _sql = `select * from posts where name ="${name}";`
  return query(_sql)
}
// 通过文章 id 查找文章
let findDataById = function(id) {
  let _sql = `select * from posts where id = "${id}"`
  return query(_sql)
}
// 通过评论 id 查找评论
let findCommentById = function(id) {
  let _sql = `select * from comment where postid = "${id}"`
  return query(_sql)
}

// 查询所有文章
let findAllPost = function() {
  let _sql = `select * from posts limit 0,5;`
  return query(_sql)
}
// 更新修改文章
let updatePost = function(values) {
  let _sql = `update posts set title=?,content=? where id=?`
  return query(_sql, values)
}
// 删除文章
let deletePost = function(id) {
  let _sql = `delete from posts where id = "${id}"`
  return query(_sql)
}
// 删除评论
let deleteComment = function(id) {
  let _sql = `delete from comment where id="${id}"`
  return query(_sql)
}
// 删除对应文章的所有评论
let deleteAllPostComment = function(id) {
  let _sql = `delete from comment where postid="${id}"`
  return query(_sql)
}

// 查找评论数
let findCommentLength = function(id) {
  let _sql = `select content from comment where postid in (select id from posts where id = "${id}")`
  return query(_sql)
}

// 滚动无限加载数据
let findPageById = function(page) {
  let _sql = `select * from posts limit ${(page-1)*5},5`
  return query(_sql)
}

module.exports = {
  query,
  createTable,
  insertData,
  deleteUserData,
  findUserData,
  findDataByName,
  findPageById,
  insertPost,
  findAllPost,
  findDataByUser,
  findDataById,
  insertComment,
  findCommentById,
  updatePost,
  deletePost,
  deleteComment,
  deleteAllPostComment,
  findCommentLength,
  updatePostComment,
  updatePostPv,
  findPageById
}