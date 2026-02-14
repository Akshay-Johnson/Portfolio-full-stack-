import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
import bcrypt from "bcryptjs";
import { connectDB } from "../lib/db";
import User from "../lib/models/user";

async function createAdmin() {
  await connectDB();

  const existing = await User.findOne({ email: "admin@port.com" });

  if (existing) {
    console.log("Admin already exists");
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await User.create({
    name: "Admin",
    email: "admin@port.com",
    password: hashedPassword,
    role: "admin",
  });

  console.log("Admin user created successfully");
  process.exit(0);
}

createAdmin();
