"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Save, Plus, Trash2, GripVertical } from "lucide-react";

type NavItem = {
  id: string;
  label: string;
  href: string;
  order_index: number;
  has_dropdown: boolean;
  is_visible: boolean;
};

type HeaderSettings = {
  cta_label: string;
  cta_href: string;
  is_sticky: boolean;
};

export default function HeaderAdminPage() {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [settings, setSettings] = useState<HeaderSettings>({
    cta_label: "Get Started Now",
    cta_href: "/contact",
    is_sticky: true,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const [{ data: nav }, { data: gs }] = await Promise.all([
        supabase.from("dglide_navigation").select("*").order("order_index"),
        supabase.from("dglide_global_settings").select("value").eq("key", "header").single(),
      ]);
      if (nav) setNavItems(nav);
      if (gs?.value) setSettings(gs.value as HeaderSettings);
    }
    load();
  }, []);

  async function saveAll() {
    setSaving(true);
    await Promise.all([
      ...navItems.map((item) =>
        supabase.from("dglide_navigation").upsert(item)
      ),
      supabase.from("dglide_global_settings").upsert({ key: "header", value: settings }),
    ]);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function updateNav(id: string, field: keyof NavItem, value: string | boolean | number) {
    setNavItems((prev) => prev.map((n) => (n.id === id ? { ...n, [field]: value } : n)));
  }

  async function deleteNav(id: string) {
    await supabase.from("dglide_navigation").delete().eq("id", id);
    setNavItems((prev) => prev.filter((n) => n.id !== id));
  }

  async function addNav() {
    const newItem = {
      label: "New Link",
      href: "/",
      order_index: navItems.length,
      has_dropdown: false,
      is_visible: true,
    };
    const { data } = await supabase.from("dglide_navigation").insert(newItem).select().single();
    if (data) setNavItems((prev) => [...prev, data]);
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold [font-family:var(--font-sora)] text-black">Header & Navigation</h1>
          <p className="text-sm text-[#888] [font-family:var(--font-inter)] mt-1">Edit nav items and CTA button</p>
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

      {/* CTA Button settings */}
      <div className="bg-white rounded-[20px] p-6 mb-6">
        <h2 className="font-semibold text-black [font-family:var(--font-sora)] text-sm mb-4">CTA Button</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-[#888] [font-family:var(--font-inter)] block mb-1.5">Button Label</label>
            <input
              value={settings.cta_label}
              onChange={(e) => setSettings((s) => ({ ...s, cta_label: e.target.value }))}
              className="w-full h-10 px-3 rounded-[10px] border border-[#E0E0E0] text-sm [font-family:var(--font-inter)] outline-none focus:border-[#1C2BFF]"
            />
          </div>
          <div>
            <label className="text-xs text-[#888] [font-family:var(--font-inter)] block mb-1.5">Button Link</label>
            <input
              value={settings.cta_href}
              onChange={(e) => setSettings((s) => ({ ...s, cta_href: e.target.value }))}
              className="w-full h-10 px-3 rounded-[10px] border border-[#E0E0E0] text-sm [font-family:var(--font-inter)] outline-none focus:border-[#1C2BFF]"
            />
          </div>
        </div>
        <label className="flex items-center gap-2 mt-4 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.is_sticky}
            onChange={(e) => setSettings((s) => ({ ...s, is_sticky: e.target.checked }))}
            className="w-4 h-4 accent-[#1C2BFF]"
          />
          <span className="text-sm [font-family:var(--font-inter)] text-black">Sticky header</span>
        </label>
      </div>

      {/* Nav items */}
      <div className="bg-white rounded-[20px] p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-black [font-family:var(--font-sora)] text-sm">Navigation Items</h2>
          <button onClick={addNav} className="flex items-center gap-1.5 text-xs text-[#1C2BFF] [font-family:var(--font-inter)] hover:underline">
            <Plus className="w-3.5 h-3.5" /> Add item
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {navItems.map((item) => (
            <div key={item.id} className="flex items-center gap-3 p-3 rounded-[12px] bg-[#F8F8F8]">
              <GripVertical className="w-4 h-4 text-[#CCC] flex-shrink-0" />
              <input
                value={item.label}
                onChange={(e) => updateNav(item.id, "label", e.target.value)}
                className="w-28 h-8 px-2 rounded-[8px] border border-[#E0E0E0] text-sm [font-family:var(--font-inter)] outline-none focus:border-[#1C2BFF] bg-white"
                placeholder="Label"
              />
              <input
                value={item.href || ""}
                onChange={(e) => updateNav(item.id, "href", e.target.value)}
                className="flex-1 h-8 px-2 rounded-[8px] border border-[#E0E0E0] text-sm [font-family:var(--font-inter)] outline-none focus:border-[#1C2BFF] bg-white"
                placeholder="/path"
              />
              <label className="flex items-center gap-1.5 text-xs [font-family:var(--font-inter)] text-[#666] whitespace-nowrap cursor-pointer">
                <input type="checkbox" checked={item.has_dropdown} onChange={(e) => updateNav(item.id, "has_dropdown", e.target.checked)} className="accent-[#1C2BFF]" />
                Dropdown
              </label>
              <label className="flex items-center gap-1.5 text-xs [font-family:var(--font-inter)] text-[#666] cursor-pointer">
                <input type="checkbox" checked={item.is_visible} onChange={(e) => updateNav(item.id, "is_visible", e.target.checked)} className="accent-[#1C2BFF]" />
                Visible
              </label>
              <button onClick={() => deleteNav(item.id)} className="p-1 text-[#CCC] hover:text-red-400 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
