const Landing = require("../models/landing");
const mongoose = require("mongoose");

//
// ─── landing_CONTROLLER ──────────────────────────────────────────────────────────
//
exports.findByTag = (req, res, next) => {
  return Landing
      .findOne({ tag: req.params.tag })
      .exec((pErr, landing) => {
        if (pErr) return next(pErr);
        if (!landing) return next();
        res.send(landing);
      });
};
exports.list = (req, res) => {
  Landing.find((err, landings) => {
    if (err) res.send({ message: "internal server error" });
    res.json(landings);
  });
};

exports.post = (req, res,next) => {
  const { error } = validateAvert(req.body);
  if (error) return next();
  Landing.create(req.body).then(function(landing) {
    res.send(landing);
  });
};

exports.show = (req, res,next ) => {
  Landing.findById(req.params.id, (err, landing) => {
    if (!landing) return next();
    res.json(landing);
  });
};

exports.delete = (req, res, next) => {
  Landing.findByIdAndRemove(req.params.id, (err, landing) => {
    if (!landing) return next();
    res.send("Has been deleted");
  });
};
exports.update = (req, res, next) => {
  Landing.findByIdAndUpdate(req.params.id, req.body, (err, landing) => {
    if (!landing) return next();
    return Landing.findById(req.params.id,(err, landing) => {
      if (err) return next(err);
      return res.send(landing);
    });
  });
};



//
// ─── FUNCTIONS ──────────────────────────────────────────────────────────────────
//

