const mongoose = require("mongoose");
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
        name: String,
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

    }
);



const Project = mongoose.model("front_projects", ProjectSchema);
module.exports = Project;
