import mongoose, { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    techStack: [
      {
        type: String,
      },
    ],

    liveUrl: String,

    image: {
      type: String,
    },

    githubUrl: String,
  },
  { timestamps: true },
);

const Project = models.Project || model("Project", ProjectSchema);

export default Project;
