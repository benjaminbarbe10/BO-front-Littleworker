const Joi = require("joi");
const Landing = require("../models/landing");
const mongoose = require("mongoose");

//
// ─── landing_CONTROLLER ──────────────────────────────────────────────────────────
//

exports.list = (req, res) => {
  Landing.find((err, landings) => {
    if (err) res.send({ message: "internal server error" });
    res.json(landings);
  });
};

exports.post = (req, res) => {
  const { error } = validateAvert(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  Landing.create(req.body).then(function(landing) {
    res.send(landing);
  });
};

exports.show = (req, res) => {
  Landing.findById(req.params.id, (err, landing) => {
    if (!landing) return res.status(404).send("Not found");
    res.json(landing);
  });
};

exports.delete = (req, res) => {
  Landing.findByIdAndRemove(req.params.id, (err, landing) => {
    if (!landing) return res.status(404).send("Not found");
    res.send("Has been deleted");
  });
};

exports.update = (req, res) => {
  Landing.findByIdAndUpdate(req.params.id, req.body, (err, landing) => {
    if (!landing) return res.status(404).send("Not found");
    landing.findOne({
      _id: req.params.id
    }).then(landing => {
      res.send(landing);
    });
  });
};

//
// ─── FUNCTIONS ──────────────────────────────────────────────────────────────────
//

function validateAvert(landing) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    surname: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(landing, schema);
}
