"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Contact;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function Contact() {
    const [form, setForm] = (0, react_1.useState)({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            alert(data.message);
            setForm({
                name: "",
                email: "",
                phone: "",
                message: "",
            });
        }
        catch (error) {
            alert("An error occurred. Please try again.");
        }
    }
    return ((0, jsx_runtime_1.jsx)("section", { id: "contact", className: "py-20 backdrop-blur-2xl bg-black/20", children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-4xl mx-auto px-6", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-4xl md:text-5xl font-bold text-center mb-3", children: "Get in Touch" }), (0, jsx_runtime_1.jsx)("p", { className: "text-center text-lg mb-10 opacity-90", children: "Let's connect!" }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "bg-white/10 backdrop-blur-lg p-8 rounded-lg shadow-lg max-w-2xl mx-auto", children: [(0, jsx_runtime_1.jsx)("input", { placeholder: "Name", required: true, value: form.name, className: "w-full mb-4 p-3 rounded bg-white/20 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500", onChange: (e) => setForm(Object.assign(Object.assign({}, form), { name: e.target.value })) }), (0, jsx_runtime_1.jsx)("input", { placeholder: "Email", required: true, value: form.email, className: "w-full mb-4 p-3 rounded bg-white/20 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500", onChange: (e) => setForm(Object.assign(Object.assign({}, form), { email: e.target.value })) }), (0, jsx_runtime_1.jsx)("input", { placeholder: "Phone", required: true, value: form.phone, className: "w-full mb-4 p-3 rounded bg-white/20 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500", onChange: (e) => setForm(Object.assign(Object.assign({}, form), { phone: e.target.value })) }), (0, jsx_runtime_1.jsx)("textarea", { placeholder: "Message", required: true, value: form.message, className: "w-full mb-4 p-3 rounded bg-white/20 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500", onChange: (e) => setForm(Object.assign(Object.assign({}, form), { message: e.target.value })) }), (0, jsx_runtime_1.jsx)("button", { type: "submit", className: "w-full p-3 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors", children: "Send Message" })] })] }) }));
}
