"use client";

import { useEffect, useState } from "react";
import {useRouter} from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalMessages: 0,
    unreadMessages: 0,
    totalProjects: 0,
  });

  const [recentMessages, setRecentMessages] = useState<any[]>([]);

  async function loadAnalytics() {
    try {
      const msgRes = await fetch("/api/messages");
      const messages = await msgRes.json();

      let projectsCount = 0;

      try {
        const projRes = await fetch("/api/projects");
        const projects = await projRes.json();
        projectsCount = projects.length || 0;
      } catch {}

      setStats({
        totalMessages: messages.length,
        unreadMessages: messages.filter((m: any) => !m.isRead).length,
        totalProjects: projectsCount,
      });

      setRecentMessages(messages.slice(0, 5));
    } catch (error) {
      console.error("Dashboard analytics error:", error);
    }
  }

  useEffect(() => {
    loadAnalytics();
  }, []);

  return (
    <div className="space-y-10">
      {/* ===== Header ===== */}
      <div>
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <p className="opacity-70 mt-1">
          Portfolio performance & activity overview
        </p>
      </div>

      {/* ===== Stats Section ===== */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnalyticsCard
          title="Total Messages"
          value={stats.totalMessages}
          description="All contact form submissions"
        />

        <AnalyticsCard
          title="Unread Messages"
          value={stats.unreadMessages}
          description="Requires your attention"
          highlight
        />

        <AnalyticsCard
          title="Projects"
          value={stats.totalProjects}
          description="Portfolio projects published"
        />
      </div>

      {/* ===== Recent Messages ===== */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-lg">
        <h2 className="text-xl font-semibold mb-5">Recent Messages</h2>

        {recentMessages.length === 0 ? (
          <p className="opacity-60">No messages yet</p>
        ) : (
          <div className="space-y-4">
            {recentMessages.map((msg) => (
              <div
                key={msg._id}
                className="p-4 rounded-xl bg-black/30 border border-white/5 hover:border-blue-500/40 transition"
                onClick={() => {
                  router.push("/dashboard/messages");
                }}
              >
                <div className="flex justify-between">
                  <p className="font-semibold">{msg.name}</p>
                  {!msg.isRead && (
                    <span className="text-xs bg-blue-500 px-2 py-1 rounded">
                      New
                    </span>
                  )}
                </div>

                <p className="text-sm opacity-70">{msg.email}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===== Activity Insight ===== */}
      <div className="grid md:grid-cols-2 gap-6">
        <InsightCard
          title="Message Engagement"
          value={`${stats.totalMessages - stats.unreadMessages}/${stats.totalMessages}`}
          description="Messages reviewed"
        />

        <InsightCard
          title="Response Priority"
          value={`${stats.unreadMessages}`}
          description="Unread messages pending"
          warning
        />
      </div>
    </div>
  );
}

/* ================= Cards ================= */

function AnalyticsCard({
  title,
  value,
  description,
  highlight = false,
}: {
  title: string;
  value: number;
  description: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`p-6 rounded-2xl backdrop-blur-xl border shadow-lg
      ${highlight ? "bg-blue-500/10 border-blue-500/30" : "bg-white/5 border-white/10"}
    `}
    >
      <p className="text-sm opacity-70">{title}</p>
      <h3 className="text-4xl font-bold mt-2">{value}</h3>
      <p className="text-sm opacity-50 mt-1">{description}</p>
    </div>
  );
}

function InsightCard({
  title,
  value,
  description,
  warning = false,
}: {
  title: string;
  value: string;
  description: string;
  warning?: boolean;
}) {
  return (
    <div
      className={`p-6 rounded-2xl backdrop-blur-xl border shadow-lg
      ${warning ? "bg-red-500/10 border-red-500/30" : "bg-white/5 border-white/10"}
    `}
    >
      <p className="text-sm opacity-70">{title}</p>
      <h3 className="text-3xl font-bold mt-2">{value}</h3>
      <p className="text-sm opacity-50 mt-1">{description}</p>
    </div>
  );
}
