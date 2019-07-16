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
        title: {
            type: String,
        },
        description: {
            type: String,
        }
    },
    {
        versionKey: false
    }
);

const Shaper = mongoose.model("shaper", ShaperSchema);
module.exports = Shaper;
