const express = require("express");
const router = express.Router();

const lworker_controller = require("../controllers/lworkerController");

//
// ─── ADVERTS_ROUTES ─────────────────────────────────────────────────────────────
//

router.get("/", lworker_controller.list);

router.get("/list", lworker_controller.jsonlist);

router.post("/", lworker_controller.post);

router.get("/:id", lworker_controller.show);

router.delete("/:id", lworker_controller.delete);

router.put("/:id", lworker_controller.update);

router.get('/:slug', lworker_controller.findBySlug);

module.exports = router;
