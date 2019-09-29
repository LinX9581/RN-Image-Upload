var express = require('express')
var multer = require('multer')
var app = express();
const path = require('path')
const fs = require('fs')
var mysql = require('mysql')
const bodyParser = require('body-parser')

app.use(express.static('public'));
app.use(bodyParser.json())

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'linx',
    password: 'dfgh8520',
    database: 'profile'
});

connection.connect();

global.db = connection;




app.set("views", "views/");
app.set("view engine", "ejs");

var a = ''
app.get("/uploadsimg", function(req, res) {


    var sql = "SELECT url FROM imgurl";

    db.query(sql, function(err, result) {
        //    console.log(result);
        a = result[0].url
        console.log(a)
    });

    console.log(a)
    res.render("index", {
        varName: a
            // name: loginUser || ''
    });
});

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/', // 設定儲存路徑
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});


// Init Upload 
const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }, // 檔案大小限制500kb
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myImage'); //單張圖片 Key:myImage

// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/; //可接受檔案格式
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

app.post('/uploadphoto', function(req, res) {
    console.log("ttt")
    upload(req, res, (err) => {
        if (err) console.log(err);
        else {
            // Create folder path
            var mkdirsync = './public/uploads/profile/memberName/'; //建立目錄
            function mkdirpath(mkdirsync) {
                if (!fs.existsSync(mkdirsync)) {
                    try {
                        fs.mkdirSync(mkdirsync);
                    } catch (e) {
                        mkdirpath(path.dirname(mkdirsync));
                        mkdirpath(mkdirsync);
                    }
                }
            }
            mkdirpath(mkdirsync);
            var sourceFile = './public/uploads/' + req.file.originalname; //原暫存目錄
            var destFile = mkdirsync + 'memberNameProfile' + '.jpg'; //最後儲存目錄
            fs.rename(sourceFile, destFile, function(err) {
                if (err) console.log('ERROR: ' + err);
            });

            var sql = "INSERT INTO `imgurl`(`url`) VALUES ('http://127.0.0.1:3000/uploads/profile/memberName/memberNameProfile.jpg')";

            var query = db.query(sql, function(err, result) {
                console.log('inserted data');
            });

            res.send({ result: 'success' });
        }
    });
});
app.listen(3000, () => console.log(`Server started on port 80`));