const Joi = require("joi");
const Lworker = require("../models/lworker");
const mongoose = require("mongoose");

//
// ─── LWORKER_CONTROLLER ──────────────────────────────────────────────────────────
//

exports.list = (req, res) => {
  Lworker.find((err, lworker) => {
    if (err) res.send({ message: "internal server error" });
    res.json(lworker);
  });
};

exports.post = (req, res) => {
  const { error } = validateLworker(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  Lworker.create(req.body).then(function(lworker) {
    res.send(lworker);
  });
};

exports.show = (req, res) => {
  Lworker.findById(req.params.id, (err, lworker) => {
    if (!lworker) return res.status(404).send("Not found");
    res.json(lworker);
  });
};

exports.delete = (req, res) => {
  Lworker.findByIdAndRemove(req.params.id, (err, lworker) => {
    if (!lworker) return res.status(404).send("Not found");
    res.send("Has been deleted");
  });
};

exports.update = (req, res) => {
  Lworker.findByIdAndUpdate(req.params.id, req.body, (err, lworker) => {
    if (!lworker) return res.status(404).send("Not found");
    Lworker.findOne({
      _id: req.params.id
    }).then(lworker => {
      res.send(lworker);
    });
  });
};

//
// ─── FUNCTIONS ──────────────────────────────────────────────────────────────────
//

function validateLworker(lworker) {
  const schema = {
    tags: Joi.required(),
    name: Joi.string()
        .required(),
    surname: Joi.string()
        .required(),
    position: Joi.string()
        .required(),
    image: Joi.required()
  };

  return Joi.validate(lworker, schema);
}
