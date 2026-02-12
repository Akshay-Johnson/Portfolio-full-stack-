import mongoose, { Schema, models, model } from "mongoose";

const AboutSchema = new Schema(
  {
    name: String,
    bio: String,
    location: String,
    email: String,
    skills: [String],
    profileImage: String,
  },
  { timestamps: true },
);

const About = models.About || model("About", AboutSchema);

export default About;
