var express = require('express')
var multer = require('multer')
var app = express();
const path = require('path')
const fs = require('fs')

app.use(express.static('public'));

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/', // 設定儲存路徑
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});


// Init Upload 
const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 },   // 檔案大小限制500kb
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myImage');     //單張圖片 Key:myImage

// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;  //可接受檔案格式
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}



app.get('/', (req, res) => res.send('uploadpage'));

app.post('/uploadphoto', function (req, res) {
    upload(req, res, (err) => {
        if (err) console.log(err);
        else {
              // Create folder path
            var mkdirsync = './public/uploads/profile/memberName/'; //建立目錄
            function mkdirpath(mkdirsync) {
                if (!fs.existsSync(mkdirsync)) {
                    try {
                        fs.mkdirSync(mkdirsync);
                    }
                    catch (e) {
                        mkdirpath(path.dirname(mkdirsync));
                        mkdirpath(mkdirsync);
                    }
                }
            }
            mkdirpath(mkdirsync);
            var sourceFile = './public/uploads/' + req.file.originalname; //原暫存目錄
            var destFile = mkdirsync + 'memberNameProfile' + '.jpg'; //最後儲存目錄
            fs.rename(sourceFile, destFile, function (err) {
                if (err) console.log('ERROR: ' + err);
            });
            res.send({ result: 'success' });
        }
    });
});
app.listen(3000, () => console.log(`Server started on port 80`));