const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//
// ─── ADVERT_MODEL ────────────────────────────────────────────────────────────────
//

const LandingSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "name field is required"]
        },
        surname: {
            type: String,
            required: [true, "surname field is required"]
        }
    },
    {
        versionKey: false
    }
);

const Landing = mongoose.model("landing", LandingSchema);
module.exports = Landing;
