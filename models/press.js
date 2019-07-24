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
        url: {
            type: String,
        },
        logo: {
            type: Object,
        }

    },
  {
    versionKey: false
  }
);

const Press = mongoose.model("front_press", PressSchema);
module.exports = Press;
