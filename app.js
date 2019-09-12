const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path');
const navigation = require('./templates/partials/header/navigation.json');

//AUTH
const request = require('request');
const multer = require('multer');
const MobileDetect = require('mobile-detect');
const staticPathPublic = path.join(process.cwd(), 'public');
const staticPathUploads = path.join(process.cwd(), 'uploads');

const API_URL = 'https://api.littleworker.fr/1.0/';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(staticPathPublic));
app.use(express.static(staticPathUploads));
app.set('view engine', 'ejs');
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
    const md = new MobileDetect(req.headers['user-agent']);

    const isMobile =  !!md.mobile();
    app.locals = {
        isMobile: isMobile,
        navigation: navigation
    };
    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.header('Access-Control-Allow-Credentials', true);

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    // Pass to next layer of middleware
    next();
});

app.post('/auth', function(req, res) {
    const body = req.body;

    return request.post({
        url: `${API_URL}/account/login`,
        form: {
            login: body.username,
            password: body.password
        },
        json: true
    }, function (err, response, body) {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        if (response.statusCode === 200 && body.token) {
            return request.get({
                url: `${API_URL}/account/`,
                headers: {
                    'Authorization': `Bearer ${body.token}`
                },
                json: true
            }, function (err2, res2, b2) {
                if (err2) {
                    console.error(err2);
                    return res.status(500).send(err2);
                }

                if (res2.statusCode === 200 && b2.roles.indexOf('admin') !== -1) {
                    return res.send({ token: body.token });
                }

                return res.status(401).send({ error: 'Unauthorized' });
            });
        }

        return res.status(401).send({ error: 'Unauthorized' });
    });
});


app.use("/press", press);
app.use("/projects", projects);
app.use("/landings", landings);
app.use("/lworkers", lworker);
app.use("/shapers", shapers);
app.use("/", home);

app.post('/upload/press', upload.single('press'), function (req, res) {
    return res.send({ success: !!req.file });
});

app.post('/upload/landings', upload.single('landing'), function (req, res) {
    return res.send({ success: !!req.file });
});

app.post('/upload/projects', upload.single('project'), function (req, res) {
    return res.send({ success: !!req.file });
});

app.post('/upload/shapers',upload.single('shaper'), function (req, res) {
    return res.send({ success: !!req.file });
});
app.post('/upload/lworkers',upload.single('lworker'), function (req, res) {
    return res.send({ success: !!req.file });
});

app.render(__dirname + '/templates/partials/header/main_nav.ejs', { item:

        {
            "link1": "dzqdzq",
            "link2": "qzdzqqd"
        }
}, function (err, html) {
    console.log(html)
});
// 404 Handler

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
// Error handler : @ End
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
    return res.status(500).send(JSON.stringify(err));
});
//
// ─── SERVER ─────────────────────────────────────────────────────────────────────
//

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
