const Joi = require("joi");
const Advert = require("../models/advert");
const mongoose = require("mongoose");

//
// ─── ADVERT_CONTROLLER ──────────────────────────────────────────────────────────
//

exports.list = (req, res) => {
  Advert.find((err, adverts) => {
    res.json(adverts);
  });
};

exports.post = (req, res) => {
  const { error } = validateAvert(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  Advert.create(req.body).then(function(advert) {
    res.send(advert);
  });
};

exports.show = (req, res) => {
  Advert.findById(req.params.id, (err, advert) => {
    if (!advert) return res.status(404).send("Not found");
    res.send(advert);
  });
};

exports.delete = (req, res) => {
  Advert.findByIdAndRemove(req.params.id, (err, advert) => {
    if (!advert) return res.status(404).send("Not found");
    res.send("Has been deleted");
  });
};

exports.update = (req, res) => {
  Advert.findByIdAndUpdate(req.params.id, req.body, (err, advert) => {
    if (!advert) return res.status(404).send("Not found");
    Advert.findOne({
      _id: req.params.id
    }).then(advert => {
      res.send(advert);
    });
  });
};

//
// ─── FUNCTIONS ──────────────────────────────────────────────────────────────────
//

function validateAvert(advert) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    surname: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(advert, schema);
}
