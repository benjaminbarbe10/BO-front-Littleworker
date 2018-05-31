const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//
// ─── ADVERT_MODEL ────────────────────────────────────────────────────────────────
//

const AdvertSchema = new Schema(
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

const Advert = mongoose.model("advert", AdvertSchema);
module.exports = Advert;
