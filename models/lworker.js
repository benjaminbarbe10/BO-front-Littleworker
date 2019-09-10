const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");

//
// ─── ADVERT_MODEL ────────────────────────────────────────────────────────────────
//

const LworkerSchema = new Schema(
    {
        tags: [ String ],
        name: {
            type: String,
            required: true,
            index: true
        },
        slug: {
            type: String,
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

LworkerSchema.pre('save', function (next) {
    this.slug = slugify(this.name + ' ' + this.surname, {
        replacement: '-',
        remove: /[$*_+~()'"!\-:@]/g,
        lower: true
    });
    return next();
});

const Lworker = mongoose.model("front_workers", LworkerSchema);
module.exports = Lworker;
