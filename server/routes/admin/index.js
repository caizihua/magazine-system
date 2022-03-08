module.exports = (app) => {
  const express = require("express");
  const multer = require("multer");
  const fs = require("fs");
  const jwt = require("jsonwebtoken");
  var assert = require("http-assert");
  const AdminUser = require("../../models/AdminUser.js");
  const Period = require("../../models/Period.js");
  const Directory = require("../../models/Directory.js");
  const router = express.Router({
    //这个参数表示将动态resource能传递给router，这样router里面的路由就能使用这些参数
    // mergeParams: true,
  });

  //5登录授权中间件
  const authMiddleware = require("../../middleware/auth");
  //9资源转换中间件
  const resourceMiddleware = require("../../middleware/resource");
  const uploadMiddleware = require("../../middleware/upload");

  router.post("/", async (req, res) => {
    let model = null;
    if (req.Model === Period) {
      model = await req.Model.create(req.body);
      const dir = await Directory.create({
        magazine: model._id,
        primary: []
      });
      let PerModel = Object.assign({
        directory: dir._id
      }, req.body);
      let newModel = await req.Model.findByIdAndUpdate(model._id, PerModel);
      res.send(newModel);
    } else {
      model = await req.Model.create(req.body);
      res.send(model);
    }
  });
  //1编辑
  router.put("/:id", async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });
  //2删除
  router.delete("/:id", async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body);
    res.send({
      success: true,
    });
  });
  //3分类列表
  router.get("/", async (req, res) => {
    const queryOptions = {};
    if (req.Model.modelName === "Category") {
      queryOptions.populate = "parent";
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(200);
    // .sort({ _id: -1 })按时间倒序查询
    res.send(items);
  });

  //4分类详情
  router.get("/:id", async (req, res) => {
    const model = await req.Model.findById(req.params.id);
    res.send(model);
  });

  //6资源列表
  app.use(
    "/admin/api/rest/:resource",
    authMiddleware(),
    resourceMiddleware(),
    router
  );
  //7上传文件代码 
  let fileName = null
  let createFolder = function (folder) {
    try {
      fs.accessSync(folder)
    } catch( e ) {
      fs.mkdirSync(folder)
    }
  }
  let uploadFolder = __dirname + "/../../uploads/" + fileName
  createFolder(uploadFolder)
  let storage = multer.diskStorage({
    destination:function(req,file,cb){
      cb(null , uploadFolder);
    },
    filename:function(req,file,cb){
      cb(null , Date.now() + '-' +file.originalname)
    }
  })

  let upload = multer({storage:storage})

  app.post(
    "/admin/api/upload/:name",
    authMiddleware(),
    uploadMiddleware(),
    (req, res,next) => {
      fileName = req.params.name; 
      next();
    },
    upload.single("file"), 
    async (req, res) => {
      fileName = req.params.name;
      res.send('succ');
    }
  );
  //8token
  app.post("/admin/api/login", async (req, res) => {
    const {
      username,
      password
    } = req.body;
    const user = await AdminUser.findOne({
      username
    }).select("+password");
    assert(
      username !== "", 422, "请输入用户名");
    assert(user, 422, "用户不存在");
    const isValid = require("bcrypt").compareSync(password, user.password);
    assert(isValid, 422, "密码错误");
    const token = jwt.sign({
        id: user._id,
      },
      app.get("secret")
    );
    res.send({
      token
    });
  });
  //注册
  app.post("/admin/api/register", async (req, res) => {
    const user = await AdminUser.create(req.body);
    const token = jwt.sign({
        id: user._id,
      },
      app.get("secret")
    );
    res.send({
      token
    });
  })
  //错误处理
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message,
    });
  });
};