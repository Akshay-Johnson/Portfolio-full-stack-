"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  function handleLogout() {
    document.cookie =
      "adminToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/login");
  }

  const links = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Projects", href: "/dashboard/projects" },
    { name: "Resume", href: "/dashboard/resume" },
    { name: "About", href: "/dashboard/about" },
    { name: "Messages", href: "/dashboard/messages" },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-black text-white p-2 rounded"
        onClick={() => setOpen(true)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`
          flex flex-col
          fixed md:static
          top-0 left-0
          h-screen
          w-64
          bg-black border-r border-gray-800 text-white p-6
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Mobile Close */}
        <button
          className="md:hidden mb-6 text-right"
          onClick={() => setOpen(false)}
        >
          ✕
        </button>

        <nav className="flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded transition ${
                pathname === link.href ? "bg-blue-600" : "hover:bg-blue-500/40"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto bg-red-500 px-4 py-2 rounded"
        >
          Logout
        </button>
      </aside>
    </>
  );
}
