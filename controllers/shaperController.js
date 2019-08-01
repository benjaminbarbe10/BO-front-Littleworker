const Joi = require("joi");
const Shaper = require("../models/shaper");
const mongoose = require("mongoose");
const Project = require('../models/project');
const ObjectId = require('mongodb').ObjectID;

//
// ─── SHAPER_CONTROLLER ──────────────────────────────────────────────────────────
//

exports.findBySlug = (req, res, next) => {
    return Shaper
        .findOne({slug: req.params.slug})
        .exec((pErr, shaper) => {
            if (pErr) return next(pErr);
            if (!shaper) return next();
            Project.find((err, projects) => {
                if (err) return next(err);
                let projectsList;
                if (shaper.projects !== undefined) {

                    shaper.projects.forEach(p => {
                        return Project
                            .findOne({_id: p._id}, function (err, shaperProject) {
                                console.log(shaperProject)
                            })
                    });

                }
                return res.render('../templates/shaper.ejs', {
                    shaper: shaper,
                    projects: projects});
            });
        });
};
exports.list = (req, res) => Shaper.find((err, shapers) => {
    if (err) return next(err);
    let selectedTag;
    return res.render('../templates/shapers.ejs', { shapers: shapers, selectedTag: selectedTag  });
});

exports.post = (req, res) => {
    const { error } = new Shaper(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    Shaper.create(req.body).then(function(shaper) {
        res.send(shaper);
    });
};

exports.show = (req, res, next) => {
    Shaper.findById(req.params.id, (err, shaper) => {
        if (!shaper) return next();
        res.json(shaper);
    });
};

exports.delete = (req, res, next) => {
    Shaper.findByIdAndRemove(req.params.id, (err, shaper) => {
        if (!shaper) return next();
        res.send("Has been deleted");
    });
};

exports.update = (req, res, next) => {
    Shaper.findByIdAndUpdate(req.params.id, req.body, (err, shaper) => {
        if (!shaper) return next();
        return Shaper.findById(req.params.id,(err, shaper) => {
            if (err) return next(err);
            return res.send(shaper);
        });
    });
};

//
// ─── FUNCTIONS ──────────────────────────────────────────────────────────────────
//
