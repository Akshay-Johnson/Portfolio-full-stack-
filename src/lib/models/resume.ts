import mongoose, { Schema, models, model } from "mongoose";

const ResumeSchema = new Schema(
  {
    profile: {
      name: String,
      phone: String,
      email: String,
      location: String,
      github: String,
      linkedin: String,
      summary: String,
    },

    experience: [
      {
        title: String,
        company: String,
        year: String,
        points: [String],
      },
    ],

    education: [
      {
        degree: String,
        institute: String,
        university: String,
        year: String,
      },
    ],

    skills: {
      frontend: [String],
      backend: [String],
      databases: [String],
      languages: [String],
      concepts: [String],
      tools: [String],
    },

    projects: [
      {
        title: String,
        description: String,
      },
    ],

    certifications: [String],

    languages: [String],
  },
  { timestamps: true },
);

const Resume = models.Resume || model("Resume", ResumeSchema);

export default Resume;
