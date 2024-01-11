const express = require('express')
const router = express.Router()
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'files');
    },
    filename: function(req, file, cb) {   
        cb(null,uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});


let upload = multer({ storage});

var transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
       ciphers:'SSLv3',
       rejectUnauthorized: false
    },
    auth: {
        user: 'jobfinder1956@outlook.com',
        pass: 'Marco@outlook1999'
    }
});


router.post('/',upload.any(), async(req, res) => {
    console.log('hello')
    console.log(req.files[1])
    req.files.forEach( file => console.log(file.originalname))
    let attachments = []
    req.files.forEach( (file, index) => attachments.push(
        {
            filename: `file${index+1}`,
            path: req.protocol + '://' + req.get('host')+`/files/${file.filename}`,
            contentType: file.mimetype
        }
    ))
    console.log('attachments array', attachments)
});

module.exports = router


