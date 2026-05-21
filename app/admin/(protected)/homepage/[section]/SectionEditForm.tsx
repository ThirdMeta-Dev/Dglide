"use client";

import { useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import ImageUploadField from "@/components/admin/ImageUploadField";

type Field = {
  id: string;
  key: string;
  type: string;
  label: string;
  value: string;
};

export default function SectionEditForm({ fields }: { fields: Field[] }) {
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(fields.map((f) => [f.id, f.value]))
  );
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleChange(id: string, val: string) {
    setValues((prev) => ({ ...prev, [id]: val }));
    setSaved(false);
  }

  function handleSave() {
    setError(null);
    startTransition(async () => {
      const supabase = createClient();
      for (const field of fields) {
        const { error: err } = await supabase
          .from("dglide_content_blocks")
          .update({ value: { v: values[field.id] } })
          .eq("id", field.id);
        if (err) {
          setError(err.message);
          return;
        }
      }
      setSaved(true);
    });
  }

  return (
    <div className="bg-white rounded-2xl p-8 max-w-2xl">
      <div className="flex flex-col gap-6">
        {fields.map((field) => (
          <div key={field.id}>
            {field.type === "image" ? (
              <ImageUploadField
                fieldId={field.id}
                label={field.label}
                value={values[field.id] ?? ""}
                onChange={handleChange}
              />
            ) : field.type === "url" ? (
              <div className="flex flex-col gap-1.5">
                <label htmlFor={field.id} className="text-sm font-medium text-black [font-family:var(--font-sora)]">
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type="url"
                  value={values[field.id]}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className="border border-[#E5E5E5] rounded-xl px-4 py-2.5 text-sm [font-family:var(--font-inter)] text-black focus:outline-none focus:border-[#1C2BFF] transition-colors"
                  placeholder="https://..."
                />
              </div>
            ) : (
              <div className="flex flex-col gap-1.5">
                <label htmlFor={field.id} className="text-sm font-medium text-black [font-family:var(--font-sora)]">
                  {field.label}
                </label>
                {(values[field.id] ?? "").length > 80 ? (
                  <textarea
                    id={field.id}
                    rows={3}
                    value={values[field.id]}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className="border border-[#E5E5E5] rounded-xl px-4 py-2.5 text-sm [font-family:var(--font-inter)] text-black focus:outline-none focus:border-[#1C2BFF] transition-colors resize-none"
                  />
                ) : (
                  <input
                    id={field.id}
                    type="text"
                    value={values[field.id]}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className="border border-[#E5E5E5] rounded-xl px-4 py-2.5 text-sm [font-family:var(--font-inter)] text-black focus:outline-none focus:border-[#1C2BFF] transition-colors"
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={isPending}
          className="px-6 py-2.5 rounded-full bg-[#1C2BFF] text-white text-sm [font-family:var(--font-sora)] hover:bg-[#141FB5] transition-colors disabled:opacity-60"
        >
          {isPending ? "Saving…" : "Save Changes"}
        </button>

        {saved && (
          <span className="text-sm text-green-600 [font-family:var(--font-inter)]">
            Saved successfully
          </span>
        )}
        {error && (
          <span className="text-sm text-red-500 [font-family:var(--font-inter)]">
            {error}
          </span>
        )}
      </div>
    </div>
  );
}
