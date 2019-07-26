const Joi = require("joi");
const Project = require("../models/project");

//
// ─── PROJECT_CONTROLLER ──────────────────────────────────────────────────────────
//

exports.findBySlug = (req, res, next) => {
  return Project
      .findOne({ slug: req.params.slug })
      .exec((pErr, project) => {
        if (pErr) {
          return next(pErr); // 500
        }

        if (!project) {
          return next(); // 404
        }

        return res.render('demo', { project: project });
      });
};

exports.list = (req, res) => {
  Project.find((err, projects) => {
    if (err) return next(new Error("internal server error" ));
    res.json(projects);
  });
};

exports.post = (req, res, next) => {
  const { error } = validateProject(req.body);
  if (error) {
    const err = new Error(error.details[0].message);
    err.statusCode = 400;
    return next(err);
  }
  const nProject = new Project(req.body);
  return nProject.save(function(err) {
    if (err) return next(err);
    res.send(nProject);
  });
};

exports.show = (req, res, next) => {
  Project.findById(req.params.id, (err, project) => {
    if (!project) return next();
    res.json(project);
  });
};

exports.delete = (req, res, next) => {
  Project.findByIdAndRemove(req.params.id, (err, project) => {
    if (!project) return next();
    res.send("Has been deleted");
  });
};

exports.update = (req, res, next) => {
  Project.findByIdAndUpdate(req.params.id, req.body, (err, project) => {
    if (!project) return next();
    Project.findOne({
      _id: req.params.id
    }).then(project => {
      res.send(project);
    });
  });
};

//
// ─── FUNCTIONS ──────────────────────────────────────────────────────────────────
//

function validateProject(project) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    tags: Joi.required(),
    htag: Joi.string()
        .required(),
    title: Joi.string()
        .required(),
    description: Joi.string()
        .required(),
    cities: Joi.string()
        .required(),
    surface: Joi.number()
        .integer()
        .required(),
    duration: Joi.number()
        .integer()
        .required(),
    budgect: Joi.string()
        .required(),
    images: Joi.required(),
    projects: Joi.array(),
    paragraph: Joi.any()

  };

  return Joi.validate(project, schema);
}
