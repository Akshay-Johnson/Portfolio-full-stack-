"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminSidebar() {
  const router = useRouter();

  function handleLogout() {
    document.cookie =
      "adminToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/login");
  }

  return (
    <aside className="w-64 bg-gray-800 text-white p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      <nav className="flex flex-col gap-4">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/dashboard/projects">Projects</Link>
        <Link href="/dashboard/resume">Resume</Link>
        <Link href="/dashboard/about">About</Link>
        <Link href="/dashboard/messages">Messages</Link>
        <Link href="/dashboard/analytics">Analytics</Link>
      </nav>

      <button
        onClick={handleLogout}
        className="mt-10 bg-red-500 px-4 py-2 rounded"
      >
        Logout
      </button>
    </aside>
  );
}
