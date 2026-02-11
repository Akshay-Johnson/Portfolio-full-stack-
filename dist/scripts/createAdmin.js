"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../lib/db");
const user_1 = __importDefault(require("../lib/models/user"));
async function createAdmin() {
    await (0, db_1.connectDB)();
    const existing = await user_1.default.findOne({ email: "admin@port.com" });
    if (existing) {
        console.log("Admin already exists");
        process.exit(0);
    }
    const hashedPassword = await bcrypt_1.default.hash("admin123", 10);
    await user_1.default.create({
        name: "Admin",
        email: "admin@port.com",
        password: hashedPassword,
        role: "admin",
    });
    console.log("Admin user created successfully");
    process.exit(0);
}
createAdmin();
