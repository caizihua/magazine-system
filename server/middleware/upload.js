module.exports = () => async (req, res, next) => {
  const multer = require("multer");
  const fs = require("fs");

  let createFolder = function (folder) {
    try {
      fs.accessSync(folder)
    } catch( e ) {
      fs.mkdirSync(folder)
    }
  }
  let uploadFolder = __dirname + "/../../uploads/" + req.params.name
  createFolder(uploadFolder)
console.log( req.params.name)
  let storage = multer.diskStorage({
    destination:function(req,file,cb){
      cb(null , uploadFolder);
    },
    filename:function(req,file,cb){
      cb(null , Date.now() + '-' +file.originalname)
    }
  })

  let upload = multer({storage:storage})
  upload.single("file")
  await next();
};