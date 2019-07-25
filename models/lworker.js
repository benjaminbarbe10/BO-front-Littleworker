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
        surname: String,
        position: Number,
        image: {
            type: Object,
        }
    }
);

const Lworker = mongoose.model("front_workers", PressSchema);
module.exports = Lworker;
