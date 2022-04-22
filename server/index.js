//服务端代码
const express = require("express");

const app = express();

var fs = require("fs");
const session = require('express-session')
// 全局中配置秘密字段 
fs.readFile(__dirname + "/a.txt", function (err, data) {
  if (err) {
    return err;
  } else {
    app.set("secret", data.toString());
  }
});

// 使用express-session 来存放数据到session中
app.use(
  session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }
  })
)

//使用JSON
app.use(express.json());
//直接使用跨域模块
app.use(require("cors")());
//开放一个端口uploads前端好访问其中的文件，地址就是静态的端口
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/admin/", express.static(__dirname + "/admin"));


require("./routes/admin")(app);
require("./plugins/db")(app);

app.listen(3000, () => {
  console.log("http://localhost:3000 is already");
});
