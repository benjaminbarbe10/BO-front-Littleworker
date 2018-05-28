const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const advertSchema = new Schema({
    title: String,
});

mongoose.model('adverts', advertSchema);