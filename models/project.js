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

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
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
    title: String,
    description: String,
    cities: String,
    surface: Number,
    budgect: String,
    duration: Number,
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
    paragraph: {
        title: String,
        description: String
    }
});

ProjectSchema.pre('save', function (next) {
    console.log('presave');
    this.slug = slugify(this.name, {
        replacement: '-',
        remove: /[$*_+~()'"!\-:@]/g,
        lower: true
    });
    return next();
});

const Project = mongoose.model("front_projects", ProjectSchema);
module.exports = Project;
