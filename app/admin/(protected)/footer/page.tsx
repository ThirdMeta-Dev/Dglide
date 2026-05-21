"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Save, Plus, Trash2 } from "lucide-react";

type FooterLink = {
  id: string;
  column_index: number;
  column_heading: string | null;
  label: string;
  href: string;
  order_index: number;
  is_visible: boolean;
};

type FooterSettings = {
  newsletter_heading:      string;
  newsletter_placeholder:  string;
  newsletter_button_label: string;
  tagline:                 string;
  phone:                   string;
  email:                   string;
  copyright:               string;
  privacy_label:           string;
  privacy_href:            string;
  terms_label:             string;
  terms_href:              string;
  social: { linkedin: string; twitter: string; whatsapp: string; instagram: string };
};

const DEFAULTS: FooterSettings = {
  newsletter_heading:      "Subscribe to Our Newsletter",
  newsletter_placeholder:  "Enter Your Email",
  newsletter_button_label: "Subscribe Now",
  tagline:                 "We finally have visibility in our operations. Your system adapts to how you work.",
  phone:                   "+91 6787878787",
  email:                   "info@dglide.com",
  copyright:               "Copyright © 2025 DGlide. All Rights Reserved. Developed by Hexanovate",
  privacy_label:           "Privacy Policy",
  privacy_href:            "#",
  terms_label:             "Terms",
  terms_href:              "#",
  social:                  { linkedin: "", twitter: "", whatsapp: "", instagram: "" },
};

export default function FooterAdminPage() {
  const [links, setLinks]       = useState<FooterLink[]>([]);
  const [settings, setSettings] = useState<FooterSettings>(DEFAULTS);
  const [saving, setSaving]     = useState(false);
  const [saved, setSaved]       = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const [{ data: fl }, { data: gs }] = await Promise.all([
        supabase.from("dglide_footer_links").select("*").order("column_index").order("order_index"),
        supabase.from("dglide_global_settings").select("value").eq("key", "footer").single(),
      ]);
      if (fl) setLinks(fl);
      if (gs?.value) setSettings({ ...DEFAULTS, ...(gs.value as Partial<FooterSettings>) });
    }
    load();
  }, []);

  async function saveAll() {
    setSaving(true);
    await Promise.all([
      supabase.from("dglide_global_settings").upsert({ key: "footer", value: settings }),
      ...links.map((l) => supabase.from("dglide_footer_links").upsert(l)),
    ]);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function updateLink(id: string, field: keyof FooterLink, value: string | boolean | number | null) {
    setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  }

  async function deleteLink(id: string) {
    await supabase.from("dglide_footer_links").delete().eq("id", id);
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }

  async function addLink(colIndex: number) {
    const colLinks = links.filter((l) => l.column_index === colIndex);
    const newLink = { column_index: colIndex, column_heading: null, label: "New Link", href: "/", order_index: colLinks.length, is_visible: true };
    const { data } = await supabase.from("dglide_footer_links").insert(newLink).select().single();
    if (data) setLinks((prev) => [...prev, data]);
  }

  const COL_LABELS = ["Platform", "Solutions", "Use Cases", "Why DGlide", "Resources", "Company"];
  const columns = [0, 1, 2, 3, 4, 5];

  const textFields: [keyof FooterSettings, string][] = [
    ["newsletter_heading",      "Newsletter — Heading"],
    ["newsletter_placeholder",  "Newsletter — Input Placeholder"],
    ["newsletter_button_label", "Newsletter — Button Label"],
    ["tagline",                 "Brand Tagline"],
    ["email",                   "Contact Email"],
    ["phone",                   "Contact Phone"],
    ["copyright",               "Copyright Text"],
    ["privacy_label",           "Privacy Policy — Label"],
    ["privacy_href",            "Privacy Policy — URL"],
    ["terms_label",             "Terms — Label"],
    ["terms_href",              "Terms — URL"],
  ];

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold [font-family:var(--font-sora)] text-black">Footer</h1>
          <p className="text-sm text-[#888] [font-family:var(--font-inter)] mt-1">Newsletter, links, contact info, nav columns</p>
        </div>
        <button
          onClick={saveAll}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-[12px] text-white text-sm font-semibold [font-family:var(--font-sora)] transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ background: "linear-gradient(135deg, #1C2BFF 0%, #141FB5 100%)" }}
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving…" : saved ? "Saved ✓" : "Save Changes"}
        </button>
      </div>

      {/* All text/url settings */}
      <div className="bg-white rounded-[20px] p-6 mb-6">
        <h2 className="font-semibold text-black [font-family:var(--font-sora)] text-sm mb-4">General Settings</h2>
        <div className="grid grid-cols-2 gap-4">
          {textFields.map(([k, label]) => (
            <div key={k}>
              <label className="text-xs text-[#888] [font-family:var(--font-inter)] block mb-1.5">{label}</label>
              <input
                value={settings[k] as string}
                onChange={(e) => setSettings((s) => ({ ...s, [k]: e.target.value }))}
                className="w-full h-10 px-3 rounded-[10px] border border-[#E0E0E0] text-sm [font-family:var(--font-inter)] outline-none focus:border-[#1C2BFF]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Social links */}
      <div className="bg-white rounded-[20px] p-6 mb-6">
        <h2 className="font-semibold text-black [font-family:var(--font-sora)] text-sm mb-4">Social Links</h2>
        <div className="grid grid-cols-2 gap-4">
          {(["linkedin", "twitter", "whatsapp", "instagram"] as const).map((s) => (
            <div key={s}>
              <label className="text-xs text-[#888] [font-family:var(--font-inter)] block mb-1.5 capitalize">{s}</label>
              <input
                value={settings.social[s]}
                onChange={(e) => setSettings((prev) => ({ ...prev, social: { ...prev.social, [s]: e.target.value } }))}
                placeholder="https://..."
                className="w-full h-10 px-3 rounded-[10px] border border-[#E0E0E0] text-sm [font-family:var(--font-inter)] outline-none focus:border-[#1C2BFF]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Nav columns — 3 per row */}
      <div className="mb-2">
        <h2 className="font-semibold text-black [font-family:var(--font-sora)] text-sm mb-4">Navigation Columns</h2>
        <div className="grid grid-cols-3 gap-4">
          {columns.map((col) => {
            const colLinks = links.filter((l) => l.column_index === col);
            const heading = colLinks.find((l) => l.column_heading)?.column_heading ?? COL_LABELS[col];
            return (
              <div key={col} className="bg-white rounded-[20px] p-5">
                <div className="flex items-center justify-between mb-3">
                  <input
                    value={heading}
                    onChange={(e) => {
                      const first = colLinks[0];
                      if (first) updateLink(first.id, "column_heading", e.target.value);
                    }}
                    className="font-semibold text-sm [font-family:var(--font-sora)] text-black bg-transparent border-b border-transparent focus:border-[#1C2BFF] outline-none w-full"
                    placeholder={COL_LABELS[col]}
                  />
                  <button onClick={() => addLink(col)} className="ml-2 flex-shrink-0 text-[#1C2BFF] hover:opacity-70">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  {colLinks.map((link) => (
                    <div key={link.id} className="flex items-center gap-1.5">
                      <input
                        value={link.label}
                        onChange={(e) => updateLink(link.id, "label", e.target.value)}
                        className="flex-1 h-7 px-2 rounded-[6px] border border-[#E0E0E0] text-xs [font-family:var(--font-inter)] outline-none focus:border-[#1C2BFF]"
                        placeholder="Label"
                      />
                      <input
                        value={link.href}
                        onChange={(e) => updateLink(link.id, "href", e.target.value)}
                        className="flex-1 h-7 px-2 rounded-[6px] border border-[#E0E0E0] text-xs [font-family:var(--font-inter)] outline-none focus:border-[#1C2BFF]"
                        placeholder="/path"
                      />
                      <button onClick={() => deleteLink(link.id)} className="text-[#CCC] hover:text-red-400">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {colLinks.length === 0 && (
                    <p className="text-xs text-[#CCC] [font-family:var(--font-inter)]">No links yet — click + to add</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
