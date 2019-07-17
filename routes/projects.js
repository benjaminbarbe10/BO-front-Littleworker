const express = require("express");
const router = express.Router();

const project_controller = require("../controllers/projectController");

//
// ─── PROJECTS_ROUTES ─────────────────────────────────────────────────────────────
//

router.get("/", project_controller.list);

router.post("/", project_controller.post);

router.get("/:id", project_controller.show);

router.delete("/:id", project_controller.delete);

router.put("/:id", project_controller.update);

module.exports = router;
