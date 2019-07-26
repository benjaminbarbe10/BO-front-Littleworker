const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//
// ─── ADVERT_MODEL ────────────────────────────────────────────────────────────────
//
const ProjectImage = new Schema({
    url: String,
    alt: String,
});

const ShaperSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        tags: {
            type: Array,
            required: true
        },
        htag: {
            type: String,
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        cities: {
            type: String,
            required: true
        },
        experience: {
            type: Number,
            required: true
        },
        since: {
            type: Number,
            required: true
        },
        worsites: {
            type: Number,
            required: true
        },
        projects: {
            type: Object,
        },
        images: {
            primary_left: ProjectImage,
            primary_right: ProjectImage,
            main: ProjectImage,
            secondary_left: ProjectImage,
            secondary_right: ProjectImage
        },
        paragraph: {
            title: String,
            description: String
        }

    }
);

const Shaper = mongoose.model("front_shapers", ShaperSchema);
module.exports = Shaper;
