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
    }
);

const Landing = mongoose.model("front_landings", LandingSchema);
module.exports = Landing;
