"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.token) {
      document.cookie = `adminToken=${data.token}; path=/`;
      router.push("/dashboard");
    } else {
      alert(data.message || "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/90 px-4">
      <div className="w-full max-w-md bg-black/80 border border-black rounded-xl p-6 shadow-lg ">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Email"
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full h-11 m-2 mt-5 border-1 rounded  align-center justify-center mx-auto px-2 font-mono"
          />
          <input
            placeholder="Password"
            type="password"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full h-11  m-2 mt-5 border-1 rounded align-center justify-center mx-auto px-2 font-mono"
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-5 py-2 font-mono rounded bg-gradient-to-r from-blue-400 to-blue-600 cursor-pointer"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
