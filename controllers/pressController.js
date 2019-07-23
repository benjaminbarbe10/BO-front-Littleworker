const Joi = require("joi");
const Press = require("../models/press");
const mongoose = require("mongoose");

//
// ─── PRESS_CONTROLLER ──────────────────────────────────────────────────────────
//

exports.list = (req, res) => {
  Press.find((err, press) => {
    if (err) res.send({ message: "internal server error" });
    res.json(press);
  });
};

exports.post = (req, res) => {
  const { error } = validatePress(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  Press.create(req.body).then(function(press) {
    res.send(press);
  });
};

exports.show = (req, res) => {
  Press.findById(req.params.id, (err, press) => {
    if (!press) return res.status(404).send("Not found");
    res.json(press);
  });
};

exports.delete = (req, res) => {
  Press.findByIdAndRemove(req.params.id, (err, press) => {
    if (!press) return res.status(404).send("Not found");
    res.send("Has been deleted");
  });
};

exports.update = (req, res) => {
  Press.findByIdAndUpdate(req.params.id, req.body, (err, press) => {
    if (!press) return res.status(404).send("Not found");
    Press.findOne({
      _id: req.params.id
    }).then(press => {
      res.send(press);
    });
  });
};

//
// ─── FUNCTIONS ──────────────────────────────────────────────────────────────────
//

function validatePress(press) {
  const schema = {
    tags: Joi.required(),
    url: Joi.string()
        .required(),
    logo: Joi.required()
  };

  return Joi.validate(press, schema);
}
