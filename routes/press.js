const express = require("express");
const router = express.Router();

const press_controller = require("../controllers/pressController");

//
// ─── ADVERTS_ROUTES ─────────────────────────────────────────────────────────────
//

router.get("/", press_controller.list);

router.post("/", press_controller.post);

router.get("/:id", press_controller.show);

router.delete("/:id", press_controller.delete);

router.put("/:id", press_controller.update);

module.exports = router;
