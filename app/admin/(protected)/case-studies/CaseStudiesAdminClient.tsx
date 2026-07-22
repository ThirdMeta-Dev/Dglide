"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FileText, Loader2, Pencil, Plus, Star, Trash2, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CASE_STUDY_CATEGORIES, type CaseStudy, type CaseStudyLead } from "@/lib/case-studies-db";

type EditorState = Partial<CaseStudy> & { id?: string };

const EMPTY: EditorState = {
  company: "",
  logoUrl: "",
  category: CASE_STUDY_CATEGORIES[0],
  title: "",
  excerpt: "",
  personName: "",
  personRole: "",
  metricOneValue: "",
  metricOneLabel: "",
  metricTwoValue: "",
  metricTwoLabel: "",
  pdfUrl: "",
  isFeatured: false,
  status: "draft",
  orderIndex: 0,
};

function isExternalPdfLink(url: string) {
  return Boolean(url) && !url.includes("/storage/v1/object/public/");
}

function formatDate(iso: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const inputCls =
  "w-full rounded-[10px] border border-[#E7EAF0] bg-white px-3 py-2 text-sm text-[#333] outline-none focus:border-[#1C2BFF] [font-family:var(--font-inter)]";
const labelCls =
  "mb-1 block text-xs font-medium text-[#7A7F87] uppercase tracking-[0.06em] [font-family:var(--font-inter)]";

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <span className={labelCls}>{label}</span>
      {children}
    </div>
  );
}

function UploadButton({
  label,
  accept,
  value,
  onUploaded,
  onClear,
}: {
  label: string;
  accept: string;
  value: string;
  onUploaded: (url: string) => void;
  onClear: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    setBusy(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/case-studies/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Upload failed");
      onUploaded(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-2 rounded-[10px] border border-[#E7EAF0] bg-white px-3 py-2 text-sm text-[#333] hover:border-[#1C2BFF] hover:text-[#1C2BFF] disabled:opacity-60 [font-family:var(--font-inter)]"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {label}
        </button>
        {value && (
          <>
            <a
              href={value}
              target="_blank"
              rel="noreferrer"
              className="max-w-[220px] truncate text-xs text-[#1C2BFF] underline [font-family:var(--font-inter)]"
            >
              {value.split("/").pop()}
            </a>
            <button
              type="button"
              onClick={onClear}
              className="text-[#999] hover:text-red-500"
              aria-label={`Remove ${label}`}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500 [font-family:var(--font-inter)]">{error}</p>}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void handleFile(f);
        }}
      />
    </div>
  );
}

export default function CaseStudiesAdminClient() {
  const [tab, setTab] = useState<"studies" | "leads">("studies");
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [leads, setLeads] = useState<CaseStudyLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [editor, setEditor] = useState<EditorState | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [sRes, lRes] = await Promise.all([
        fetch("/api/admin/case-studies"),
        fetch("/api/admin/case-studies/leads"),
      ]);
      if (sRes.ok) setStudies(await sRes.json());
      if (lRes.ok) setLeads(await lRes.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function set<K extends keyof EditorState>(key: K, value: EditorState[K]) {
    setEditor((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  async function save() {
    if (!editor) return;
    if (!editor.title?.trim()) {
      setError("Title is required.");
      return;
    }
    if (editor.pdfUrl && !/^https?:\/\/|^\//.test(editor.pdfUrl)) {
      setError("The PDF link must be a valid URL (https://…).");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const res = await fetch(
        editor.id ? `/api/admin/case-studies/${editor.id}` : "/api/admin/case-studies",
        {
          method: editor.id ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editor),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Save failed");
      setEditor(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string, title: string) {
    if (!window.confirm(`Delete case study "${title}"? This cannot be undone.`)) return;
    await fetch(`/api/admin/case-studies/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="m-0 text-2xl font-semibold text-[#111827] [font-family:var(--font-sora)]">
            Case Studies
          </h1>
          <p className="m-0 mt-1 text-sm text-[#7A7F87] [font-family:var(--font-inter)]">
            Listing cards, gated PDF downloads, and captured leads.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setError("");
            setEditor({ ...EMPTY, orderIndex: studies.length });
          }}
          className="flex items-center gap-2 rounded-[10px] bg-[#1C2BFF] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#141FB5] [font-family:var(--font-inter)]"
        >
          <Plus className="h-4 w-4" /> New Case Study
        </button>
      </div>

      <div className="mb-5 flex gap-1 rounded-[12px] bg-[#EEF0F4] p-1 w-fit">
        {(
          [
            ["studies", `Case Studies (${studies.length})`],
            ["leads", `Download Leads (${leads.length})`],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={cn(
              "rounded-[10px] px-4 py-2 text-sm [font-family:var(--font-inter)] transition-colors",
              tab === key ? "bg-white text-[#1C2BFF] font-medium shadow-sm" : "text-[#555]"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center gap-2 py-16 justify-center text-[#7A7F87] [font-family:var(--font-inter)]">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      ) : tab === "studies" ? (
        <div className="overflow-hidden rounded-[14px] border border-[#E7EAF0] bg-white">
          {studies.length === 0 ? (
            <p className="py-14 text-center text-sm text-[#7A7F87] [font-family:var(--font-inter)]">
              No case studies yet. Click “New Case Study” to add the first one.
            </p>
          ) : (
            <table className="w-full border-collapse text-left text-sm [font-family:var(--font-inter)]">
              <thead>
                <tr className="border-b border-[#E7EAF0] text-xs uppercase tracking-[0.06em] text-[#7A7F87]">
                  <th className="px-4 py-3 font-medium">Case Study</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">PDF</th>
                  <th className="px-4 py-3 font-medium">Order</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {studies.map((s) => (
                  <tr key={s.id} className="border-b border-[#F3F4F6] last:border-0">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {s.logoUrl ? (
                          <span className="relative h-8 w-20 shrink-0">
                            <Image src={s.logoUrl} alt={s.company} fill className="object-contain object-left" sizes="80px" />
                          </span>
                        ) : (
                          <span className="flex h-8 w-20 shrink-0 items-center justify-center rounded bg-[#F3F4F6] text-xs text-[#999]">
                            No logo
                          </span>
                        )}
                        <div className="min-w-0">
                          <p className="m-0 flex items-center gap-1.5 truncate font-medium text-[#111827]">
                            {s.isFeatured && <Star className="h-3.5 w-3.5 shrink-0 fill-[#FF7F1C] text-[#FF7F1C]" />}
                            <span className="truncate">{s.title || "Untitled"}</span>
                          </p>
                          <p className="m-0 truncate text-xs text-[#7A7F87]">{s.company}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[#555]">{s.category || "—"}</td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-1 text-xs font-medium capitalize",
                          s.status === "published"
                            ? "bg-[#E8F5E9] text-[#2E7D32]"
                            : "bg-[#FFF3E0] text-[#E65100]"
                        )}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {s.pdfUrl ? (
                        <a href={s.pdfUrl} target="_blank" rel="noreferrer" className="text-[#1C2BFF]" aria-label="Open PDF">
                          <FileText className="h-4 w-4" />
                        </a>
                      ) : (
                        <span className="text-xs text-[#BBB]">None</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-[#555]">{s.orderIndex}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setError("");
                            setEditor(s);
                          }}
                          className="rounded p-1.5 text-[#555] hover:bg-[#F3F4F6] hover:text-[#1C2BFF]"
                          aria-label="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => void remove(s.id, s.title)}
                          className="rounded p-1.5 text-[#555] hover:bg-red-50 hover:text-red-500"
                          aria-label="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <div className="overflow-hidden rounded-[14px] border border-[#E7EAF0] bg-white">
          {leads.length === 0 ? (
            <p className="py-14 text-center text-sm text-[#7A7F87] [font-family:var(--font-inter)]">
              No download leads yet.
            </p>
          ) : (
            <table className="w-full border-collapse text-left text-sm [font-family:var(--font-inter)]">
              <thead>
                <tr className="border-b border-[#E7EAF0] text-xs uppercase tracking-[0.06em] text-[#7A7F87]">
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Phone</th>
                  <th className="px-4 py-3 font-medium">Case Study</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l.id} className="border-b border-[#F3F4F6] last:border-0">
                    <td className="px-4 py-3 font-medium text-[#111827]">{l.name}</td>
                    <td className="px-4 py-3">
                      <a href={`mailto:${l.email}`} className="text-[#1C2BFF]">
                        {l.email}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-[#555]">{l.phone || "—"}</td>
                    <td className="px-4 py-3 text-[#555]">{l.caseStudyTitle || "—"}</td>
                    <td className="px-4 py-3 text-[#7A7F87]">{formatDate(l.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {editor && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/30" onClick={() => setEditor(null)}>
          <div
            className="h-full w-full max-w-xl overflow-y-auto bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="m-0 text-lg font-semibold text-[#111827] [font-family:var(--font-sora)]">
                {editor.id ? "Edit Case Study" : "New Case Study"}
              </h2>
              <button
                type="button"
                onClick={() => setEditor(null)}
                className="rounded p-1.5 text-[#555] hover:bg-[#F3F4F6]"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Company" className="col-span-1">
                <input className={inputCls} value={editor.company || ""} onChange={(e) => set("company", e.target.value)} placeholder="Clarion" />
              </Field>
              <Field label="Category">
                <select className={inputCls} value={editor.category || ""} onChange={(e) => set("category", e.target.value)}>
                  {CASE_STUDY_CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Title" className="col-span-2">
                <input className={inputCls} value={editor.title || ""} onChange={(e) => set("title", e.target.value)} placeholder="How Clarion cut response time by 80%" />
              </Field>
              <Field label="Excerpt" className="col-span-2">
                <textarea className={cn(inputCls, "min-h-[84px] resize-y")} value={editor.excerpt || ""} onChange={(e) => set("excerpt", e.target.value)} placeholder="Short summary shown on the card…" />
              </Field>
              <Field label="Person Name">
                <input className={inputCls} value={editor.personName || ""} onChange={(e) => set("personName", e.target.value)} placeholder="Mr Rakesh Sharma," />
              </Field>
              <Field label="Person Role">
                <input className={inputCls} value={editor.personRole || ""} onChange={(e) => set("personRole", e.target.value)} placeholder="Head of Operations" />
              </Field>
              <Field label="Metric 1 Value">
                <input className={inputCls} value={editor.metricOneValue || ""} onChange={(e) => set("metricOneValue", e.target.value)} placeholder="3X" />
              </Field>
              <Field label="Metric 1 Label">
                <input className={inputCls} value={editor.metricOneLabel || ""} onChange={(e) => set("metricOneLabel", e.target.value)} placeholder="Lead Capture" />
              </Field>
              <Field label="Metric 2 Value">
                <input className={inputCls} value={editor.metricTwoValue || ""} onChange={(e) => set("metricTwoValue", e.target.value)} placeholder="8 Min" />
              </Field>
              <Field label="Metric 2 Label">
                <input className={inputCls} value={editor.metricTwoLabel || ""} onChange={(e) => set("metricTwoLabel", e.target.value)} placeholder="Response Down From 40+" />
              </Field>
              <Field label="Company Logo" className="col-span-2">
                <UploadButton
                  label="Upload logo"
                  accept="image/*"
                  value={editor.logoUrl || ""}
                  onUploaded={(url) => set("logoUrl", url)}
                  onClear={() => set("logoUrl", "")}
                />
              </Field>
              <Field label="Case Study PDF (emailed to leads)" className="col-span-2">
                <div className="flex flex-col gap-2">
                  <UploadButton
                    label="Upload PDF"
                    accept="application/pdf"
                    value={editor.pdfUrl && !isExternalPdfLink(editor.pdfUrl) ? editor.pdfUrl : ""}
                    onUploaded={(url) => set("pdfUrl", url)}
                    onClear={() => set("pdfUrl", "")}
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#999] [font-family:var(--font-inter)]">or</span>
                    <input
                      className={inputCls}
                      value={isExternalPdfLink(editor.pdfUrl || "") ? editor.pdfUrl : ""}
                      onChange={(e) => set("pdfUrl", e.target.value.trim())}
                      placeholder="Paste a Google Drive share link (for large PDFs)"
                    />
                  </div>
                  <p className="m-0 text-xs text-[#999] [font-family:var(--font-inter)]">
                    Uploaded PDFs are attached to the email. Drive links are sent as a download
                    button instead — use them for files too big to upload.
                  </p>
                </div>
              </Field>
              <Field label="Status">
                <select className={inputCls} value={editor.status || "draft"} onChange={(e) => set("status", e.target.value as CaseStudy["status"])}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </Field>
              <Field label="Order (lower shows first)">
                <input type="number" className={inputCls} value={editor.orderIndex ?? 0} onChange={(e) => set("orderIndex", Number(e.target.value) || 0)} />
              </Field>
              <label className="col-span-2 flex items-center gap-2 text-sm text-[#333] [font-family:var(--font-inter)]">
                <input type="checkbox" checked={Boolean(editor.isFeatured)} onChange={(e) => set("isFeatured", e.target.checked)} className="h-4 w-4 accent-[#1C2BFF]" />
                Featured case study (shown in “The Featured Casestudy” section)
              </label>
            </div>

            {error && <p className="mt-4 text-sm text-red-500 [font-family:var(--font-inter)]">{error}</p>}

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                disabled={saving}
                onClick={() => void save()}
                className="flex items-center gap-2 rounded-[10px] bg-[#1C2BFF] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#141FB5] disabled:opacity-60 [font-family:var(--font-inter)]"
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />} Save
              </button>
              <button
                type="button"
                onClick={() => setEditor(null)}
                className="rounded-[10px] border border-[#E7EAF0] px-5 py-2.5 text-sm text-[#555] hover:bg-[#F5F5F5] [font-family:var(--font-inter)]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
