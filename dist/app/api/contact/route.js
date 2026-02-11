"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const server_1 = require("next/server");
const db_1 = require("@/lib/db");
const contact_1 = __importDefault(require("@/lib/models/contact"));
async function POST(request) {
    console.log("📩 Contact API called");
    try {
        // ----- DB CONNECTION -----
        console.log("⏳ Connecting to MongoDB...");
        await (0, db_1.connectDB)();
        console.log("✅ MongoDB Connected");
        // ----- PARSE BODY -----
        const body = await request.json();
        console.log("📦 Received Body:", body);
        // ----- BASIC VALIDATION -----
        if (!body.name || !body.email || !body.message) {
            console.warn("⚠️ Validation Failed:", body);
            return server_1.NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }
        // ----- CREATE DOCUMENT -----
        console.log("📝 Creating Contact Document...");
        const message = await contact_1.default.create(body);
        console.log("✅ Contact Saved:", message._id);
        return server_1.NextResponse.json({
            success: true,
            message: "Message sent successfully",
            data: message,
        });
    }
    catch (err) {
        console.error("❌ Contact API Error");
        console.error("Message:", err === null || err === void 0 ? void 0 : err.message);
        console.error("Stack:", err === null || err === void 0 ? void 0 : err.stack);
        return server_1.NextResponse.json({ success: false, message: "Failed to send message" }, { status: 500 });
    }
}
