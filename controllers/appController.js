//
// ─── MAIN_CONTROLLER ────────────────────────────────────────────────────────────
//
const Project = require('../models/project');

exports.home = (req, res, next) => Project.find({}, (err, projects) => {
  if (err) return next(err);
  return res.render('../templates/home.ejs', {
    projects,
    selectedTag: req.query.selectedTag
  });
});
