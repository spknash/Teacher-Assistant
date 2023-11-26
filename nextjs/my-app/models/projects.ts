import mongoose, {Schema} from "mongoose";

const ProjectSchema: Schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    language: {type: String, required: true},
    completed_repo_url: {type: String, required: true},
    boilerplate_repo_url: {type: String, required: true},
    ta_id: {type: String, required: true},
});

const Project = mongoose.models.Project||mongoose.model("Project", ProjectSchema);

export default Project;