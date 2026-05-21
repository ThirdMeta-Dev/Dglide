"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type DemoRequest = {
  id: string;
  name: string;
  email: string;
  contact: string | null;
  company: string;
  message: string | null;
  status: "new" | "contacted" | "completed" | "cancelled";
  created_at: string;
};

const STATUS_OPTIONS = ["new", "contacted", "completed", "cancelled"] as const;

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  new:       { bg: "#FFF3E0", color: "#E65100" },
  contacted: { bg: "#E3F2FD", color: "#1565C0" },
  completed: { bg: "#E8F5E9", color: "#2E7D32" },
  cancelled: { bg: "#F5F5F5", color: "#757575" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function DemoRequestsClient({ initialData, error }: { initialData: DemoRequest[]; error?: string }) {
  const [requests, setRequests] = useState<DemoRequest[]>(initialData);
  const [updating, setUpdating] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const supabase = createClient();

  async function updateStatus(id: string, status: string) {
    setUpdating(id);
    const { error } = await supabase
      .from("dglide_demo_requests")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (!error) {
      setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: status as DemoRequest["status"] } : r));
    }
    setUpdating(null);
  }

  const filtered = filter === "all" ? requests : requests.filter((r) => r.status === filter);

  const counts = STATUS_OPTIONS.reduce((acc, s) => {
    acc[s] = requests.filter((r) => r.status === s).length;
    return acc;
  }, {} as Record<string, number>);

  if (error) {
    return (
      <div>
        <h1 className="text-2xl font-semibold [font-family:var(--font-sora)] text-black mb-4">Demo Requests</h1>
        <div className="bg-red-50 text-red-600 rounded-[12px] p-4 text-sm [font-family:var(--font-inter)]">
          Could not load requests: {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold [font-family:var(--font-sora)] text-black">Demo Requests</h1>
        <p className="text-sm text-[#888] [font-family:var(--font-inter)] mt-1">
          {requests.length} total submission{requests.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Status filter pills */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-1.5 rounded-[20px] text-sm [font-family:var(--font-inter)] transition-colors ${filter === "all" ? "bg-black text-white" : "bg-white text-[#555] border border-[#E8E8E8]"}`}
        >
          All ({requests.length})
        </button>
        {STATUS_OPTIONS.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-[20px] text-sm [font-family:var(--font-inter)] capitalize transition-colors ${filter === s ? "bg-black text-white" : "bg-white text-[#555] border border-[#E8E8E8]"}`}
          >
            {s} ({counts[s]})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-[20px] p-12 text-center">
          <p className="text-[#888] text-sm [font-family:var(--font-inter)]">No requests yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((req) => {
            const st = STATUS_STYLES[req.status];
            return (
              <div key={req.id} className="bg-white rounded-[16px] p-5 flex gap-5 items-start hover:shadow-sm transition-shadow">

                {/* Avatar initials */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #FF7F1C 0%, #E86C0A 100%)" }}
                >
                  {req.name.charAt(0).toUpperCase()}
                </div>

                {/* Main info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <p className="font-semibold text-black [font-family:var(--font-sora)] text-sm">{req.name}</p>
                      <p className="text-sm text-[#555] [font-family:var(--font-inter)] mt-0.5">{req.company}</p>
                    </div>
                    <p className="text-xs text-[#AAA] [font-family:var(--font-inter)] flex-shrink-0">{formatDate(req.created_at)}</p>
                  </div>

                  <div className="flex gap-4 mt-2 flex-wrap">
                    <a href={`mailto:${req.email}`} className="text-sm text-[#1C2BFF] [font-family:var(--font-inter)] hover:underline">{req.email}</a>
                    {req.contact && <span className="text-sm text-[#555] [font-family:var(--font-inter)]">{req.contact}</span>}
                  </div>

                  {req.message && (
                    <p className="text-sm text-[#777] [font-family:var(--font-inter)] mt-2 line-clamp-2">{req.message}</p>
                  )}
                </div>

                {/* Status selector */}
                <div className="flex-shrink-0">
                  <select
                    value={req.status}
                    disabled={updating === req.id}
                    onChange={(e) => updateStatus(req.id, e.target.value)}
                    className="text-xs font-medium px-3 py-1.5 rounded-[20px] border-none outline-none cursor-pointer capitalize [font-family:var(--font-inter)] disabled:opacity-50"
                    style={{ background: st.bg, color: st.color }}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
