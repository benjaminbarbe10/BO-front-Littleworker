const Joi = require('joi');
const Advert = require('../models/advert');
const mongoose = require('mongoose');

//
// ─── ADVERT_CONTROLLER ──────────────────────────────────────────────────────────
//

exports.list = (req, res) => {
    mongoose.model('advert').find((err, adverts) => {
        res.send(adverts)
    });
};

exports.post = (req, res) => {
    const { error } = validateAvert(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    Advert.create(req.body).then(function (advert) {
        res.send(advert);
    });
};

exports.show = (req,res) => {
    mongoose.model('advert').findById(req.params.id, (err, advert) => {
        if (!advert) return res.status(404).send('Not found');
        res.send(advert)
    });
};

exports.delete = (req,res) => {
    
    mongoose.model('advert').findByIdAndRemove(req.params.id, (err, advert) => {
        if (!advert) return res.status(404).send('Not found');
        req.method = 'GET';
        res.send('Has been deleted');
    });
}
   
//
// ─── FUNCTIONS ──────────────────────────────────────────────────────────────────
//

function validateAvert(advert) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(advert, schema);

}