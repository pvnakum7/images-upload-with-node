require("dotenv").config();

var aws = require('aws-sdk')
var express = require('express')
var multer = require('multer')
const uuid = require("uuid").v4;
const app = express();


app.set('title', process.env.AppName);

// // //-------------------> Step1 single file upload---------//

//single file upload
// const upload = multer({ dest: "uploads/" });
// app.post("/upload", upload.single("images"), (req, res) => {
//   res.json({ status: "success" });
// });
// app.listen(4000, () => console.log("App listening on port 4000"));

// // //-------------------> Step2 multiple file upload---------//
// multiple file uploads
// const upload = multer({ dest: "uploads/" });
// app.post("/upload", upload.array("images", 2), (req, res) => {
//   res.json({ status: "success" });
// });
// app.listen(4000, () => console.log("App listening on port 4000"));

// // //-------------------> Step3 multiple file for multiple fields upload---------//
// const upload = multer({ dest: "uploads/" });
// const multiUpload = upload.fields([
//       { name: "avatar", maxCount: 1 },
//       { name: "resume", maxCount: 1 },
// ]);

// app.post("/upload",multiUpload, (req,res) => {
//     console.log(req.files);
//     return res.status(200).json(
//         {
//             status: "Both Images Sucessfully upload"
//         }
//     )
// });
// app.listen(4000, () => console.log("App listening on port 4000"));

// // //-------------------> Step4 multiple file for multiple fields upload with custom filename

const storage = multer.diskStorage({
    //cb means callback
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, `${uuid()}-${originalname}`);
  },
});
const fileFilter= (req,file,cb ) => {
    if (file.mimetype.split("/")[0] === "image") {
        cb(null, true);
    } else {
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
    }
}
/// With and without file size function 

//const upload = multer({ storage });
const upload = multer({ 
    storage,
    fileFilter,
    limits: { fileSize: 1000000, files: 2 }, /// file size inn bytes 1000000=1mb
});
///  For limited files upload:
//app.post("/upload", upload.array("images", 2), (req, res) => {
///  For no limited files upload:    
app.post("/upload", upload.array("images"), (req, res) => {    
  res.json({ status: "uploaded successfully" });
});
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "file is too large",
      });
    }

    if (error.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        message: "File limit reached",
      });
    }

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        message: "File must be an image",
      });
    }
  }
});
app.listen(4000, () => console.log("App listening on port 4000"));




