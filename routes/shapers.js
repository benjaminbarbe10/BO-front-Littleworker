const express = require("express");
const router = express.Router();

const shaper_controller = require("../controllers/shaperController");

//
// ─── ADVERTS_ROUTES ─────────────────────────────────────────────────────────────
//

router.get("/", shaper_controller.list);

router.post("/", shaper_controller.post);

router.get("/:id", shaper_controller.show);

router.delete("/:id", shaper_controller.delete);

router.put("/:id", shaper_controller.update);

router.get('/:slug', shaper_controller.findBySlug);

module.exports = router;
