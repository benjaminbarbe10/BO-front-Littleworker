const Joi = require("joi");
const Shaper = require("../models/shaper");
const mongoose = require("mongoose");

//
// ─── SHAPER_CONTROLLER ──────────────────────────────────────────────────────────
//

exports.list = (req, res) => {
    Shaper.find((err, shapers) => {
        if (err) res.send({ message: "internal server error" });
        res.json(shapers);
    });
};

exports.post = (req, res) => {
    const { error } = validateAvert(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    Shaper.create(req.body).then(function(shaper) {
        res.send(shaper);
    });
};

exports.show = (req, res) => {
    Shaper.findById(req.params.id, (err, shaper) => {
        if (!shaper) return res.status(404).send("Not found");
        res.json(shaper);
    });
};

exports.delete = (req, res) => {
    Shaper.findByIdAndRemove(req.params.id, (err, shaper) => {
        if (!shaper) return res.status(404).send("Not found");
        res.send("Has been deleted");
    });
};

exports.update = (req, res) => {
    Shaper.findByIdAndUpdate(req.params.id, req.body, (err, shaper) => {
        if (!shaper) return res.status(404).send("Not found");
        shaper.findOne({
            _id: req.params.id
        }).then(shaper => {
            res.send(shaper);
        });
    });
};

//
// ─── FUNCTIONS ──────────────────────────────────────────────────────────────────
//

function validateAvert(shaper) {
    const schema = {
        name: Joi.string()
            .min(3)
            .required(),
        title: Joi.string()
            .min(3)
            .required()
    };

    return Joi.validate(shaper, schema);
}
