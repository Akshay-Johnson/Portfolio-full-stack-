"use client";

import { useState } from "react";
import Submit from "@/components/Submit";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to send message");
      }
      alert(data.message || "Message sent successfully");
      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      alert("An error occurred while sending the message");
    }
  }
  return (
    <section id="contact" className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-3">
          Get in Touch
        </h1>
        <p className="text-center text-lg mb-10 opacity-90">Let's connect!</p>
        <form
          onSubmit={handleSubmit}
          className="  p-8 rounded-lg shadow-lg max-w-2xl mx-auto"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-2">
            <input
              placeholder="Name"
              required
              value={form.name}
              className="w-full mb-2 p-3 rounded bg-white/20 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              placeholder="Phone"
              required
              value={form.phone}
              className="w-full mb-2 p-3 rounded bg-white/20 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <input
            placeholder="Email"
            required
            value={form.email}
            className="w-full mb-4 p-3 rounded bg-white/20 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <textarea
            placeholder="Message"
            required
            value={form.message}
            className="w-full mb-4 p-3 rounded bg-white/20 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <div className="flex justify-center">
            <button type="submit">
              <Submit />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
