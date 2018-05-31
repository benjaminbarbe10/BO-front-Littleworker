const express = require("express");
const router = express.Router();

const app_controller = require("../controllers/appController");

//
// ─── MAIN_ROUTING ─────────────────────────────────────────────────────────────────
//

router.get("/", app_controller.home);

module.exports = router;
