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
  const nProject = new Project(req.body);
  return nProject.save(function(err) {
    if (err) {
      if (err.name === 'ValidationError') {
        const vError = new Error('There is some issues with your data!');
        vError.status = 400;
        const simplifiedErrors = Object.entries(err.errors)
            .map(curError => ({ on: curError[0], error: curError[1].message }));
        vError.message = { title: vError.message, errors: simplifiedErrors };
        return next(vError);
      }
      return next(err);
    }
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
