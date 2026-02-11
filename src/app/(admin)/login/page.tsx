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
    <div className="h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Email"
          required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Password"
          type="password"
          required
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
