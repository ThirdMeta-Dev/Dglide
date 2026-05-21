"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Save } from "lucide-react";

type SiteSettings = {
  site_name: string;
  tagline: string;
  favicon: string;
  og_default_image: string;
};

export default function SettingsAdminPage() {
  const [settings, setSettings] = useState<SiteSettings>({ site_name: "DGlide", tagline: "", favicon: "", og_default_image: "" });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    supabase.from("dglide_global_settings").select("value").eq("key", "site").single()
      .then(({ data }) => { if (data?.value) setSettings(data.value as SiteSettings); });
  }, []);

  async function save() {
    setSaving(true);
    await supabase.from("dglide_global_settings").upsert({ key: "site", value: settings });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const fields: [keyof SiteSettings, string, string][] = [
    ["site_name", "Site Name", "DGlide"],
    ["tagline", "Tagline", "e.g. We build great software"],
    ["favicon", "Favicon URL", "/favicon.ico"],
    ["og_default_image", "Default OG Image URL", "https://..."],
  ];

  return (
    <div className="max-w-xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold [font-family:var(--font-sora)] text-black">Site Settings</h1>
          <p className="text-sm text-[#888] [font-family:var(--font-inter)] mt-1">SEO and global configuration</p>
        </div>
        <button onClick={save} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 rounded-[12px] text-white text-sm font-semibold [font-family:var(--font-sora)] transition-opacity hover:opacity-90 disabled:opacity-60" style={{ background: "linear-gradient(135deg, #1C2BFF 0%, #141FB5 100%)" }}>
          <Save className="w-4 h-4" />
          {saving ? "Saving…" : saved ? "Saved ✓" : "Save"}
        </button>
      </div>

      <div className="bg-white rounded-[20px] p-6 flex flex-col gap-5">
        {fields.map(([key, label, placeholder]) => (
          <div key={key}>
            <label className="text-xs text-[#888] [font-family:var(--font-inter)] block mb-1.5">{label}</label>
            <input
              value={settings[key]}
              onChange={(e) => setSettings((s) => ({ ...s, [key]: e.target.value }))}
              placeholder={placeholder}
              className="w-full h-10 px-3 rounded-[10px] border border-[#E0E0E0] text-sm [font-family:var(--font-inter)] outline-none focus:border-[#1C2BFF] transition-colors"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
