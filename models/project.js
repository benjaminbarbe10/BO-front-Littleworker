const mongoose = require("mongoose");
const slugify = require("slugify");

const Schema = mongoose.Schema;

//
// ─── ADVERT_MODEL ────────────────────────────────────────────────────────────────
//

const ProjectImage = new Schema({
    url: String,
    alt: String,
});

const ProjectSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        slug: {
            type: String,
            unique: true,
            index: true
        },
        tags: [ String ],
        htag: {
            type: String,
            index: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        cities: {
            type: String,
            required: true
        },
        surface: {
            type: Number,
            required: true
        },
        budgect: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        projects: {
            type: Object,
        },
        images: {
            primary_left: ProjectImage,
            primary_right: ProjectImage,
            main: ProjectImage,
            secondary_left: ProjectImage,
            secondary_right: ProjectImage
        },
        othersimages: [ String ],
        paragraph: {
            title: String,
            description: String
        }
    }
);

ProjectSchema.pre('save', function (next) {
    this.slug = slugify(this.name, {
        replacement: '-',
        remove: /[$*_+~()'"!\-:@]/g,
        lower: true
    });
    return next();
});
const Project = mongoose.model("front_projects", ProjectSchema);
module.exports = Project;
