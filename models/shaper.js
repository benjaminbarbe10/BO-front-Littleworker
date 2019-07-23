const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//
// ─── ADVERT_MODEL ────────────────────────────────────────────────────────────────
//

const ShaperSchema = new Schema(
    {
        name: {
            type: String,
        },
        tags: {
            type: Array,
        },
        htag: {
            type: String,
        },
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        cities: {
            type: String,
        },
        experience: {
            type: Number,
        },
        since: {
            type: Number,
        },
        worsites: {
            type: Number,
        },
        projects: {
            type: Object,
        },
        images: {
            type: Object,
        },
        paragraph: {
            type: Object,
        }

    },
    {
        versionKey: false
    }
);

const Shaper = mongoose.model("shaper", ShaperSchema);
module.exports = Shaper;
