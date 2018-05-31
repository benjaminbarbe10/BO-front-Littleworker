const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//
// ─── BD CONNECTION ──────────────────────────────────────────────────────────────
//

mongoose.connect("mongodb://localhost:27017/express-restful");
mongoose.Promise = global.Promise;

//
// ─── ROUTES ─────────────────────────────────────────────────────────────────────
//

const adverts = require("./routes/adverts");
const home = require("./routes/index");
app.use(bodyParser.json());
app.use("/adverts", adverts);
app.use("/", home);

//
// ─── SERVER ─────────────────────────────────────────────────────────────────────
//

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
