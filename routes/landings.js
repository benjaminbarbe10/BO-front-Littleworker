const express = require("express");
const router = express.Router();

const landing_controller = require("../controllers/landingController");

//
// ─── ADVERTS_ROUTES ─────────────────────────────────────────────────────────────
//

router.get("/", landing_controller.list);

router.post("/", landing_controller.post);

router.get("/:id", landing_controller.show);

router.delete("/:id", landing_controller.delete);

router.put("/:id", landing_controller.update);

module.exports = router;
