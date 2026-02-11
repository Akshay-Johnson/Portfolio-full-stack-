"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_Secret;
function generateToken(user) {
    return jsonwebtoken_1.default.sign({
        id: user._id,
        email: user.email,
        role: user.role,
    }, JWT_SECRET, { expiresIn: "24h" });
}
function verifyToken(token) {
    return jsonwebtoken_1.default.verify(token, JWT_SECRET);
}
