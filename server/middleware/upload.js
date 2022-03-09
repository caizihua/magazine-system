module.exports = () => async (req, res, next) => {
  const multer = require("multer");
  const fs = require("fs");
  let  name = req.params.name,filename,uploadFolder,path;

  let createFolder = function (folder) {
    try {
      fs.accessSync(folder)
    } catch( e ) {
      fs.mkdirSync(folder)
    }
  }
  path = (req.originalUrl === `/admin/api/upload/swiper/${name}`) ? 'swiper' : 'period'
  uploadFolder = __dirname + `/../uploads/${path}/${name}`
  createFolder(uploadFolder)

  let storage = multer.diskStorage({
    destination:function(request,file,cb){
      cb(null , uploadFolder);
    },
    filename:function(request,file,cb){
      cb(null , Date.now() + '-' +file.originalname)
    }
  })
  upload = multer({storage:storage}).single("file")
  upload(req,res,async (err)=>{
    filename = req.file.filename; 
    req.file.url = `http://localhost:3000/uploads/${path}/${name}/${filename}`; 
    await next();
  })
};