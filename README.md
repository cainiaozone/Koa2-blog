# Koa2-blog

技术栈：node+koa2+mysql

参考项目：【[wclimb/Koa2-blog](https://github.com/wclimb/Koa2-blog)】

参考项目博客：[Node+Koa2+Mysql 搭建简易博客](http://www.wclimb.site/2017/07/12/Node-Koa2-Mysql-%E6%90%AD%E5%BB%BA%E7%AE%80%E6%98%93%E5%8D%9A%E5%AE%A2/)

非常感谢作者：[wclimb](http://www.wclimb.site/2017/07/12/Node-Koa2-Mysql-%E6%90%AD%E5%BB%BA%E7%AE%80%E6%98%93%E5%8D%9A%E5%AE%A2/) 整理的这个项目。

# 项目结构

    koa2-blog
    |
    |—— config  ------------------------------- 存放默认文件
    |
    |—— lib  ---------------------------------- 存放操作数据库文件
    |
    |—— middlewares --------------------------- 存放判断登录与否文件
    |
    |—— public —------------------------------- 存放样式文件
    |
    |—— routers ------------------------------- 存放路由文件
    |
    |—— views --------------------------------- 存放模板文件
    |
    |—— index.js ------------------------------ 程序主文件
    |
    |—— package.json -------------------------- 包括项目名、作者、依赖等
