"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
const jsx_runtime_1 = require("react/jsx-runtime");
const Hero_1 = __importDefault(require("@/components/Hero"));
const About_1 = __importDefault(require("@/components/About"));
const Portfolio_1 = __importDefault(require("@/components/Portfolio"));
const Contact_1 = __importDefault(require("@/components/Contact"));
const Resume_1 = __importDefault(require("@/components/Resume"));
function Home() {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Hero_1.default, {}), (0, jsx_runtime_1.jsx)(About_1.default, {}), (0, jsx_runtime_1.jsx)(Resume_1.default, {}), (0, jsx_runtime_1.jsx)(Portfolio_1.default, {}), (0, jsx_runtime_1.jsx)(Contact_1.default, {})] }));
}
