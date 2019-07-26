const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//
// ─── ADVERT_MODEL ────────────────────────────────────────────────────────────────
//

const PressSchema = new Schema(
    {
        tags: [ String ],
        name: {
            type: String,
            required: true,
            index: true
        },
        surname: {
            type: String,
            required: true,
            index: true
        },
        position: {
            type: String,
            required: true,
            index: true
        },
        image: {
            url: String,
        }
    }
);

const Lworker = mongoose.model("front_workers", PressSchema);
module.exports = Lworker;
