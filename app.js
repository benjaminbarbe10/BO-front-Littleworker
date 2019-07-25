const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const expressJWT = require('express-jwt');
const path = require('path');

//AUTH
const jwt = require('jsonwebtoken');

const expressJwt = require('express-jwt');
const multer = require('multer');

const staticPath = path.join(process.cwd(), 'public');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(staticPath));
app.set('views', path.join(__dirname, '/templates'));

//app.use(expressJwt({secret: 'todo-app-super-shared-secret'}).unless({path: ['/auth']}));
const DIR = './uploads';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + file.originalname)
    }
});
let upload = multer({storage: storage});

const USERS = [
    { 'id': 1, 'username': 'jemma' },
    { 'id': 2, 'username': 'littleworker' },
    { 'id': 3, 'username': 'sebastian' },
];

//
// ─── BD CONNECTION ──────────────────────────────────────────────────────────────
//

mongoose.connect(process.env.CONNEXION_STRING || "mongodb://localhost:27017/api-front");
mongoose.Promise = global.Promise;

//
// ─── ROUTES ─────────────────────────────────────────────────────────────────────
//

const press = require("./routes/press");
const landings = require("./routes/landings");
const shapers = require("./routes/shapers");
const lworker = require("./routes/lworkers");
const projects = require("./routes/projects");

const home = require("./routes/index");


// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.header('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.post('/auth', function(req, res) {
    const body = req.body;

    const user = USERS.find(user => user.username == body.username);
    if(!user || body.password != '9{bj3V)F,r~>uj{m') return res.sendStatus(401);

    var token = jwt.sign({userID: user.id}, 'todo-app-super-shared-secret', {expiresIn: '2h'});
    res.send({token});
});

app.route('/project').post((req, res) => {
    res.send(201, req.body)
});
app.use("/press", press);
app.use("/projects", projects);
app.use("/landings", landings);
app.use("/lworkers", lworker);
app.use("/shapers", shapers);
app.use("/", home);
app.post('/upload/press',upload.single('press'), function (req, res) {
    if (!req.file) {
        console.log("No file received");
        return res.send({
            success: false
        });

    } else {
        console.log('file received');
        return res.send({
            success: true
        })
    }
});
app.post('/upload/projects',upload.single('project'), function (req, res) {
    if (!req.file) {
        console.log("No file received");
        return res.send({
            success: false
        });

    } else {
        console.log('file received');
        return res.send({
            success: true
        })
    }
});
app.post('/upload/shapers',upload.single('shaper'), function (req, res) {
    if (!req.file) {
        console.log("No file received");
        return res.send({
            success: false
        });

    } else {
        console.log('file received');
        return res.send({
            success: true
        })
    }
});
app.post('/upload/lworkers',upload.single('lworker'), function (req, res) {
    if (!req.file) {
        console.log("No file received");
        return res.send({
            success: false
        });

    } else {
        console.log('file received');
        return res.send({
            success: true
        })
    }
});

// 404 Handler
app.use(function(req, res, next) {
    if (!req.path.match(/\.[a-z0-1]{3,5}$/)) {
        return res.sendFile(path.join(staticPath, 'index.html'));
    }
    res.status(404).send('404 :(');
});

// Error handler : @ End
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});
//
// ─── SERVER ─────────────────────────────────────────────────────────────────────
//

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
