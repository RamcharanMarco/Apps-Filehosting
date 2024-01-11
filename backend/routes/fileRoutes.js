const express = require("express");
const File = require("../models/fileModel");
const router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");
const Auth = require("../middlewear/requireAuth");
router.use(Auth);
const {
  deleteFile,
  getFiles,
  deleteAllFiles,
  getFile,
  downloadFile,
  downloadAllFiles
} = require("../controllers/fileController");

router.get("/download/:id", downloadFile);

router.get("/download/bucket/:id", downloadAllFiles);


router.get("/buckets/:id", getFiles);

router.get("/:id", getFile);

router.delete("/:id", deleteFile);

router.delete("/bucket/:id", deleteAllFiles);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req.params.id);
    cb(null, `files/${req.params.id}`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

let upload = multer({ storage });

router.post("/:id", upload.single("file"), async (req, res) => {
  const bucket_id = req.params.id;
  const url = req.protocol + "://" + req.get("host");
  const path = url +"/files/"+bucket_id+"/"+req.file.filename;
  const filename = req.file.filename;
  const mimetype = req.file.mimetype;
  const download = `files/${bucket_id}/${req.file.filename}`;
  try {
    const file = await File.create({
      bucket_id,
      filename,
      mimetype,
      path,
      download,
    });
    res.status(200).json(file);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error.message);
  }
});

module.exports = router;

/*
router.get('/create',function(req,res){
    console.log('create folder route hit')
    try {
      let p = path.join(__dirname+'/pages/page2/jhd')
        if (!fs.existsSync(p)) {
          fs.mkdirSync(p);
          console.log('folder created')
        }
      } catch (err) {
        console.error(err);
        console.log('folder not created')
      }
});
*/
