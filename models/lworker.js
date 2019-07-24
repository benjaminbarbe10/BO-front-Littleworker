const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//
// ─── ADVERT_MODEL ────────────────────────────────────────────────────────────────
//

const PressSchema = new Schema(
    {
        tags: {
            type: Array,
        },
        name: {
            type: String,
        },
        surname: {
            type: String,
        },
        position: {
            type: String,
        },
        image: {
            type: Object,
        }

    },
  {
    versionKey: false
  }
);

const Lworker = mongoose.model("front_workers", PressSchema);
module.exports = Lworker;
