//
// ─── MAIN_CONTROLLER ────────────────────────────────────────────────────────────
//
const Project = require('../models/project');
const MobileDetect = require('mobile-detect');

exports.home = (req, res, next) => Project.find((err, projects) => {
  if (err) return next(err);
  let selectedTag;
  let isMobile;
  let md = new MobileDetect(req.headers['user-agent']);
  isMobile = !!md.mobile();
  return res.render('../templates/home.ejs', { projects: projects, selectedTag: selectedTag, isMobile: isMobile });
});
