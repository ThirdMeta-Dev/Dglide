"use client";

import { useMemo, useState } from "react";
import { ExternalLink, Search } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { getLeadSourceHref, getLeadSourceLabel, splitLeadMessage, type LeadSource } from "@/lib/lead-source";

const STATUS_OPTIONS = ["new", "contacted", "completed", "cancelled"] as const;

type DemoStatus = (typeof STATUS_OPTIONS)[number];

type DemoRequest = {
  id: string;
  name: string;
  email: string;
  contact: string | null;
  company: string;
  message: string | null;
  status: DemoStatus;
  created_at: string;
};

type EnrichedRequest = DemoRequest & {
  cleanMessage: string;
  source: LeadSource;
};

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  new:       { bg: "#FFF3E0", color: "#E65100" },
  contacted: { bg: "#E3F2FD", color: "#1565C0" },
  completed: { bg: "#E8F5E9", color: "#2E7D32" },
  cancelled: { bg: "#F5F5F5", color: "#757575" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "?";
}

function statusLabel(status: string) {
  return status.replace("-", " ");
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-[#E7EAF0] bg-white px-4 py-3">
      <p className="m-0 text-xs font-medium uppercase tracking-[0.08em] text-[#7A7F87] [font-family:var(--font-inter)]">
        {label}
      </p>
      <p className="m-0 mt-2 text-2xl font-semibold text-[#111827] [font-family:var(--font-sora)]">
        {value}
      </p>
    </div>
  );
}

export default function DemoRequestsClient({ initialData, error }: { initialData: DemoRequest[]; error?: string }) {
  const [requests, setRequests] = useState<DemoRequest[]>(initialData);
  const [updating, setUpdating] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [statusError, setStatusError] = useState("");

  const supabase = createClient();

  async function updateStatus(id: string, status: string) {
    setUpdating(id);
    setStatusError("");
    const { error } = await supabase
      .from("dglide_demo_requests")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (!error) {
      setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: status as DemoRequest["status"] } : r));
    } else {
      setStatusError("Could not update status. Please try again.");
    }
    setUpdating(null);
  }

  const enrichedRequests = useMemo<EnrichedRequest[]>(
    () =>
      requests.map((request) => {
        const parsed = splitLeadMessage(request.message);
        return {
          ...request,
          cleanMessage: parsed.message,
          source: parsed.source,
        };
      }),
    [requests]
  );

  const counts = useMemo(
    () =>
      STATUS_OPTIONS.reduce((acc, s) => {
        acc[s] = requests.filter((r) => r.status === s).length;
        return acc;
      }, {} as Record<DemoStatus, number>),
    [requests]
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return enrichedRequests.filter((request) => {
      const matchesStatus = filter === "all" || request.status === filter;
      if (!matchesStatus) return false;
      if (!query) return true;

      const sourceLabel = getLeadSourceLabel(request.source);
      const haystack = [
        request.name,
        request.email,
        request.contact,
        request.company,
        request.cleanMessage,
        sourceLabel,
        request.source.formType,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [enrichedRequests, filter, search]);

  const trackedCount = enrichedRequests.filter((request) => getLeadSourceHref(request.source)).length;

  if (error) {
    return (
      <div>
        <h1 className="text-2xl font-semibold [font-family:var(--font-sora)] text-black mb-4">Demo Requests</h1>
        <div className="bg-red-50 text-red-600 rounded-lg p-4 text-sm [font-family:var(--font-inter)]">
          Could not load requests: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="m-0 text-2xl font-semibold text-black [font-family:var(--font-sora)]">
            Demo Requests
          </h1>
          <p className="m-0 mt-1 text-sm text-[#6B7280] [font-family:var(--font-inter)]">
            {requests.length} total submission{requests.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="relative w-full md:w-[320px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A9099]" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search submissions"
            className="h-10 w-full rounded-lg border border-[#E1E5EA] bg-white pl-9 pr-3 text-sm text-[#111827] outline-none transition focus:border-[#1C2BFF] focus:ring-2 focus:ring-[#1C2BFF]/10 [font-family:var(--font-inter)]"
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total" value={requests.length} />
        <StatCard label="New" value={counts.new} />
        <StatCard label="Contacted" value={counts.contacted} />
        <StatCard label="Source tracked" value={trackedCount} />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={cn(
            "rounded-lg px-4 py-2 text-sm transition-colors [font-family:var(--font-inter)]",
            filter === "all" ? "bg-black text-white" : "border border-[#E1E5EA] bg-white text-[#4B5563] hover:border-[#CBD2DA]"
          )}
        >
          All ({requests.length})
        </button>
        {STATUS_OPTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={cn(
              "rounded-lg px-4 py-2 text-sm capitalize transition-colors [font-family:var(--font-inter)]",
              filter === s ? "bg-black text-white" : "border border-[#E1E5EA] bg-white text-[#4B5563] hover:border-[#CBD2DA]"
            )}
          >
            {s} ({counts[s]})
          </button>
        ))}
      </div>

      {statusError ? (
        <div className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600 [font-family:var(--font-inter)]">
          {statusError}
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-[#E7EAF0] bg-white p-12 text-center">
          <p className="m-0 text-sm text-[#6B7280] [font-family:var(--font-inter)]">No submissions found.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-[#E7EAF0] bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-[1080px] w-full border-collapse">
              <thead className="bg-[#F8FAFC]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.08em] text-[#6B7280] [font-family:var(--font-inter)]">Submitted</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.08em] text-[#6B7280] [font-family:var(--font-inter)]">Person</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.08em] text-[#6B7280] [font-family:var(--font-inter)]">Contact</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.08em] text-[#6B7280] [font-family:var(--font-inter)]">Company</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.08em] text-[#6B7280] [font-family:var(--font-inter)]">Source page</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.08em] text-[#6B7280] [font-family:var(--font-inter)]">Message</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.08em] text-[#6B7280] [font-family:var(--font-inter)]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEF1F5]">
                {filtered.map((req) => {
                  const st = STATUS_STYLES[req.status] ?? STATUS_STYLES.new;
                  const sourceLabel = getLeadSourceLabel(req.source);
                  const sourceHref = getLeadSourceHref(req.source);

                  return (
                    <tr key={req.id} className="align-top transition-colors hover:bg-[#FAFBFC]">
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-[#4B5563] [font-family:var(--font-inter)]">
                        {formatDate(req.created_at)}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#111827] text-xs font-semibold text-white [font-family:var(--font-sora)]">
                            {getInitials(req.name)}
                          </div>
                          <div className="min-w-0">
                            <p className="m-0 truncate text-sm font-semibold text-[#111827] [font-family:var(--font-sora)]">{req.name}</p>
                            <p className="m-0 mt-0.5 text-xs text-[#8A9099] [font-family:var(--font-inter)]">{req.source.formType ?? "Lead"}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm [font-family:var(--font-inter)]">
                        <a href={`mailto:${req.email}`} className="block text-[#1C2BFF] hover:underline">{req.email}</a>
                        {req.contact ? <span className="mt-1 block text-[#4B5563]">{req.contact}</span> : null}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-[#111827] [font-family:var(--font-inter)]">
                        {req.company}
                      </td>
                      <td className="max-w-[220px] px-4 py-4 text-sm [font-family:var(--font-inter)]">
                        {sourceHref ? (
                          <a
                            href={sourceHref}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex max-w-full items-center gap-1.5 text-[#1C2BFF] hover:underline"
                            title={sourceLabel}
                          >
                            <span className="truncate">{sourceLabel}</span>
                            <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                          </a>
                        ) : (
                          <span className="text-[#9CA3AF]">Not tracked</span>
                        )}
                      </td>
                      <td className="max-w-[260px] px-4 py-4 text-sm text-[#4B5563] [font-family:var(--font-inter)]">
                        {req.cleanMessage ? <span className="line-clamp-3">{req.cleanMessage}</span> : <span className="text-[#9CA3AF]">No message</span>}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4">
                        <select
                          value={req.status}
                          disabled={updating === req.id}
                          onChange={(e) => updateStatus(req.id, e.target.value)}
                          className="rounded-lg border-0 px-3 py-2 text-xs font-semibold capitalize outline-none disabled:cursor-not-allowed disabled:opacity-50 [font-family:var(--font-inter)]"
                          style={{ background: st.bg, color: st.color }}
                          aria-label={`Update status for ${req.name}`}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>{statusLabel(s)}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
