"use client";

import { useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import ImageUploadField from "@/components/admin/ImageUploadField";

type Block = { id: string; key: string; type: string; value: string };

type TestimonialEntry = {
  n: number;
  quoteId: string;   quoteVal: string;
  nameId: string;    nameVal: string;
  companyId: string; companyVal: string;
  imageId: string;   imageVal: string;
};

type SectionField = { id: string; key: string; type: string; label: string; value: string };

function parseBlocks(blocks: Block[]): { sectionFields: SectionField[]; testimonials: TestimonialEntry[] } {
  const sectionKeys: Record<string, string> = {
    section_title: "Section Title",
    subtitle:      "Subtitle / Subtext",
  };

  const sectionFields: SectionField[] = [];
  const byKey: Record<string, Block> = {};

  for (const b of blocks) {
    byKey[b.key] = b;
    if (b.key in sectionKeys) {
      sectionFields.push({ id: b.id, key: b.key, type: b.type, label: sectionKeys[b.key], value: b.value });
    }
  }

  const nums = new Set<number>();
  blocks.forEach((b) => {
    const m = b.key.match(/^testimonial_(\d+)_/);
    if (m) nums.add(parseInt(m[1]));
  });

  const testimonials: TestimonialEntry[] = Array.from(nums)
    .sort((a, b) => a - b)
    .map((n) => ({
      n,
      quoteId:   byKey[`testimonial_${n}_quote`]?.id   ?? "",
      quoteVal:  byKey[`testimonial_${n}_quote`]?.value ?? "",
      nameId:    byKey[`testimonial_${n}_name`]?.id    ?? "",
      nameVal:   byKey[`testimonial_${n}_name`]?.value  ?? "",
      companyId: byKey[`testimonial_${n}_company`]?.id   ?? "",
      companyVal: byKey[`testimonial_${n}_company`]?.value ?? "",
      imageId:   byKey[`testimonial_${n}_image`]?.id   ?? "",
      imageVal:  byKey[`testimonial_${n}_image`]?.value ?? "",
    }));

  return { sectionFields, testimonials };
}

function nextN(testimonials: TestimonialEntry[]): number {
  if (testimonials.length === 0) return 1;
  return Math.max(...testimonials.map((t) => t.n)) + 1;
}

export default function TestimonialsCMS({
  sectionId,
  initialBlocks,
}: {
  sectionId: string;
  initialBlocks: Block[];
}) {
  const { sectionFields: initSF, testimonials: initT } = parseBlocks(initialBlocks);
  const [sectionFields, setSectionFields] = useState<SectionField[]>(initSF);
  const [testimonials, setTestimonials]   = useState<TestimonialEntry[]>(initT);
  const [toast, setToast]                 = useState<{ msg: string; ok: boolean } | null>(null);
  const [isPending, startTransition]      = useTransition();

  function showToast(msg: string, ok: boolean) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  }

  async function saveField(id: string, value: string) {
    const supabase = createClient();
    const { error } = await supabase
      .from("dglide_content_blocks")
      .update({ value: { v: value } })
      .eq("id", id);
    if (error) showToast(error.message, false);
    else showToast("Saved", true);
  }

  function updateSectionField(id: string, value: string) {
    setSectionFields((prev) => prev.map((f) => f.id === id ? { ...f, value } : f));
  }

  function updateT(n: number, field: keyof Omit<TestimonialEntry, "n">, val: string) {
    setTestimonials((prev) => prev.map((t) => t.n === n ? { ...t, [field]: val } : t));
  }

  function handleAddTestimonial() {
    startTransition(async () => {
      const supabase = createClient();
      const n = nextN(testimonials);
      const base = (testimonials.length) * 10 + 100;
      const rows = [
        { section_id: sectionId, block_key: `testimonial_${n}_quote`,   block_type: "text",  value: { v: "" }, order_index: base     },
        { section_id: sectionId, block_key: `testimonial_${n}_name`,    block_type: "text",  value: { v: "" }, order_index: base + 1 },
        { section_id: sectionId, block_key: `testimonial_${n}_company`, block_type: "text",  value: { v: "" }, order_index: base + 2 },
        { section_id: sectionId, block_key: `testimonial_${n}_image`,   block_type: "image", value: { v: "" }, order_index: base + 3 },
      ];
      const { data, error } = await supabase.from("dglide_content_blocks").insert(rows).select("id, block_key");
      if (error || !data) { showToast(error?.message ?? "Insert failed", false); return; }
      const byKey: Record<string, string> = {};
      data.forEach((r) => { byKey[r.block_key] = r.id; });
      setTestimonials((prev) => [
        ...prev,
        {
          n,
          quoteId: byKey[`testimonial_${n}_quote`]   ?? "", quoteVal: "",
          nameId:  byKey[`testimonial_${n}_name`]    ?? "", nameVal:  "",
          companyId: byKey[`testimonial_${n}_company`] ?? "", companyVal: "",
          imageId: byKey[`testimonial_${n}_image`]   ?? "", imageVal: "",
        },
      ]);
      showToast("Testimonial added", true);
    });
  }

  function handleDeleteTestimonial(t: TestimonialEntry) {
    startTransition(async () => {
      const supabase = createClient();
      const ids = [t.quoteId, t.nameId, t.companyId, t.imageId].filter(Boolean);
      const { error } = await supabase.from("dglide_content_blocks").delete().in("id", ids);
      if (error) { showToast(error.message, false); return; }
      setTestimonials((prev) => prev.filter((x) => x.n !== t.n));
      showToast("Testimonial deleted", true);
    });
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-4 py-2.5 rounded-xl text-sm text-white [font-family:var(--font-inter)] shadow-lg ${toast.ok ? "bg-green-600" : "bg-red-500"}`}>
          {toast.msg}
        </div>
      )}

      {/* Section-level fields */}
      {sectionFields.length > 0 && (
        <div className="bg-white rounded-2xl p-8">
          <h2 className="text-base font-semibold [font-family:var(--font-sora)] text-black mb-6">Section Settings</h2>
          <div className="flex flex-col gap-5">
            {sectionFields.map((f) => (
              <div key={f.id} className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-black [font-family:var(--font-sora)]">{f.label}</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={f.value}
                    onChange={(e) => updateSectionField(f.id, e.target.value)}
                    className="flex-1 border border-[#E5E5E5] rounded-xl px-4 py-2.5 text-sm [font-family:var(--font-inter)] text-black focus:outline-none focus:border-[#1C2BFF] transition-colors"
                  />
                  <button
                    onClick={() => saveField(f.id, f.value)}
                    className="px-4 py-2.5 rounded-xl bg-[#1C2BFF] text-white text-sm [font-family:var(--font-sora)] hover:bg-[#141FB5] transition-colors whitespace-nowrap"
                  >
                    Save
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Testimonial cards */}
      {testimonials.map((t, idx) => (
        <div key={t.n} className="bg-white rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-semibold [font-family:var(--font-sora)] text-black">Testimonial {idx + 1}</h2>
            <button
              onClick={() => handleDeleteTestimonial(t)}
              disabled={isPending}
              className="text-xs text-red-500 [font-family:var(--font-inter)] hover:text-red-700 transition-colors disabled:opacity-50"
            >
              Delete
            </button>
          </div>

          <div className="flex flex-col gap-5">
            {/* Quote */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-black [font-family:var(--font-sora)]">Quote</label>
              <div className="flex gap-2 items-start">
                <textarea
                  rows={3}
                  value={t.quoteVal}
                  onChange={(e) => updateT(t.n, "quoteVal", e.target.value)}
                  className="flex-1 border border-[#E5E5E5] rounded-xl px-4 py-2.5 text-sm [font-family:var(--font-inter)] text-black focus:outline-none focus:border-[#1C2BFF] transition-colors resize-none"
                />
                <button onClick={() => saveField(t.quoteId, t.quoteVal)} className="px-4 py-2.5 rounded-xl bg-[#1C2BFF] text-white text-sm [font-family:var(--font-sora)] hover:bg-[#141FB5] transition-colors whitespace-nowrap">Save</button>
              </div>
            </div>

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-black [font-family:var(--font-sora)]">Name / Role</label>
              <div className="flex gap-2">
                <input type="text" value={t.nameVal} onChange={(e) => updateT(t.n, "nameVal", e.target.value)}
                  className="flex-1 border border-[#E5E5E5] rounded-xl px-4 py-2.5 text-sm [font-family:var(--font-inter)] text-black focus:outline-none focus:border-[#1C2BFF] transition-colors" />
                <button onClick={() => saveField(t.nameId, t.nameVal)} className="px-4 py-2.5 rounded-xl bg-[#1C2BFF] text-white text-sm [font-family:var(--font-sora)] hover:bg-[#141FB5] transition-colors whitespace-nowrap">Save</button>
              </div>
            </div>

            {/* Company */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-black [font-family:var(--font-sora)]">Company / Designation</label>
              <div className="flex gap-2">
                <input type="text" value={t.companyVal} onChange={(e) => updateT(t.n, "companyVal", e.target.value)}
                  className="flex-1 border border-[#E5E5E5] rounded-xl px-4 py-2.5 text-sm [font-family:var(--font-inter)] text-black focus:outline-none focus:border-[#1C2BFF] transition-colors" />
                <button onClick={() => saveField(t.companyId, t.companyVal)} className="px-4 py-2.5 rounded-xl bg-[#1C2BFF] text-white text-sm [font-family:var(--font-sora)] hover:bg-[#141FB5] transition-colors whitespace-nowrap">Save</button>
              </div>
            </div>

            {/* Image */}
            <ImageUploadField
              fieldId={t.imageId}
              label="Company Logo / Avatar"
              value={t.imageVal}
              onChange={(id, val) => { updateT(t.n, "imageVal", val); saveField(id, val); }}
            />
          </div>
        </div>
      ))}

      {/* Add testimonial button */}
      <button
        onClick={handleAddTestimonial}
        disabled={isPending}
        className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl border-2 border-dashed border-[#E5E5E5] text-sm text-[#888] [font-family:var(--font-sora)] hover:border-[#1C2BFF] hover:text-[#1C2BFF] transition-colors disabled:opacity-50"
      >
        + Add Testimonial
      </button>
    </div>
  );
}
