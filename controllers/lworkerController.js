const Lworker = require("../models/lworker");
const Landing = require("../models/landing");

//
// ─── LWORKER_CONTROLLER ──────────────────────────────────────────────────────────
//

exports.findBySlug = (req, res, next) => {
  return Lworker
      .findOne({ slug: req.params.slug })
      .exec((pErr, lworker) => {
        if (pErr) return next(pErr);
        if (!lworker) return next();

        return res.render('../templates/lworker.ejs', { lworker: lworker });
      });
};

exports.list = (req, res) => Lworker.find((err, lworkers) => {
  Landing
      .findOne({ tag: 'lworkers' })
      .exec((pErr, landing) => {
        if (pErr) return next(pErr);
        if (!landing) return next();
        let selectedTag;
        return res.render('../templates/lworkers.ejs', { lworkers: lworkers, selectedTag: selectedTag, landing: landing });
      });
  });

exports.jsonlist = (req, res) => Lworker.find((err, lworkers) => {
  if (err) return next(err);
  return res.json(lworkers);
});

exports.post = (req, res) => {
  const { error } = new Lworker(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  Lworker.create(req.body).then(function(lworker) {
    res.send(lworker);
  });
};

exports.show = (req, res, next) => {
  Lworker.findById(req.params.id, (err, lworker) => {
    if (!lworker) return next();
    res.json(lworker);
  });
};

exports.delete = (req, res, next) => {
  Lworker.findByIdAndRemove(req.params.id, (err, lworker) => {
    if (!lworker) return next();
    res.send("Has been deleted");
  });
};

exports.update = (req, res, next) => {
  Lworker.findByIdAndUpdate(req.params.id, req.body, (err, lworker) => {
    if (!lworker) return next();
    return Lworker.findById(req.params.id,(err, lworker) => {
      if (err) return next(err);
      return res.send(lworker);
    });
  });
};

//
// ─── FUNCTIONS ──────────────────────────────────────────────────────────────────
//
