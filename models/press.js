const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//
// ─── ADVERT_MODEL ────────────────────────────────────────────────────────────────
//

const PressSchema = new Schema(
    {
        tags: [ String ],
        url: String,
        logo: {
            url: String,
        }
    }
);

const Press = mongoose.model("front_press", PressSchema);
module.exports = Press;
