module.exports = (app) => {
  const express = require("express");
  const jwt = require("jsonwebtoken");
  var assert = require("http-assert");
  const AdminUser = require("../../models/AdminUser.js");
  const Directory = require("../../models/Directory.js");
  const Main = require("../../models/Main.js");
  const Category = require("../../models/Category.js");
  const router = express.Router({
    //这个参数表示将动态resource能传递给router，这样router里面的路由就能使用这些参数
    // mergeParams: true,
  });
  const routerInit = express.Router({});
  //5登录授权中间件
  const authMiddleware = require("../../middleware/auth");
  //9资源转换中间件
  const resourceMiddleware = require("../../middleware/resource");
  const uploadMiddleware = require("../../middleware/upload");
  const svgCaptcha = require("svg-captcha")
  router.post("/", async (req, res) => {
    let model = null;
    if (req.Model.modelName === "Period") {
      model = await req.Model.create(req.body);
      const dir = await Directory.create({
        period: model._id,
        primary: []
      });
      let DirModel = Object.assign({
        directory: dir._id
      }, req.body);
      let newModel = await req.Model.findByIdAndUpdate(model._id, DirModel);
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
  //分期列表搜索功能
  router.post('/search', async (req, res) => {
    const items = await req.Model.find(req.body)
    res.send(items)
  })
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
  //初始化快速录入资源
  app.use(
    "/admin/api/init/:resource",
    authMiddleware(),
    resourceMiddleware(),
    routerInit
  );
  routerInit.get("/", async (req, res) => {
    let name = req.Model.modelName;
    const data = require(`./data/${name}`);
    await req.Model.deleteMany({});
    if (name === "Category") {
      await req.Model.insertMany(data.parent);
    } else {
      await req.Model.insertMany(data);
    }
    if (name === "Category") {
      let arr = []
      data.child.map(async (e, i) => {
        let parent = await Category.find(data.parent[i])
        e.map((item) => {
          arr.push({
            name: item.name,
            parent: parent[0]._id
          })
        })
        console.log(arr)
        await req.Model.insertMany(arr);
        arr = []
      })
    }
    let getData = await req.Model.find()
    res.send(getData)
  })
  //7上传文件代码   
  app.post(
    "/admin/api/upload/swiper/:name",
    authMiddleware(),
    uploadMiddleware(),
    (req, res) => {
      res.send(req.file)
    }
  );
  app.post(
    "/admin/api/upload/period/:name",
    authMiddleware(),
    uploadMiddleware(),
    (req, res) => {
      res.send(req.file)
    }
  );
  //验证码
  let captchaCode = ''
  app.get('/admin/api/getCode', (req, res) => {
    let captcha = svgCaptcha.create({
      size:4,//验证码长度
      ignoreChar:'0oi1',
      noise:3
    });
    captchaCode = captcha.text.toLocaleUpperCase();
    res.type('svg'); 
    res.send(captcha.data);
  })
  //8token
  app.post("/admin/api/login", async (req, res) => {
    const {
      username,
      password,
      code
    } = req.body;
    const user = await AdminUser.findOne({
      username
    }).select("+password");
    assert(username !== "", 422, "请输入用户名");
    assert(code.toLocaleUpperCase() === captchaCode , 422, "验证码不正确");
    assert(password !== "", 422, "请输入密码");
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