const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//
// ─── ADVERT_MODEL ────────────────────────────────────────────────────────────────
//

const LandingSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        htag: {
            type: String,
            required: true,
        },
        breadcrumb: {
            type: String,
            required: true,
        },
        background: {
            url: String,
        }
    }
);

const Landing = mongoose.model("front_landings", LandingSchema);
module.exports = Landing;
