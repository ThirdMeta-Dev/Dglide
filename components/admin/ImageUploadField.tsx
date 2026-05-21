"use client";

import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Upload, X, Image as ImageIcon } from "lucide-react";

type Props = {
  fieldId: string;
  label: string;
  value: string;
  onChange: (id: string, url: string) => void;
};

export default function ImageUploadField({ fieldId, label, value, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }
    setError(null);
    setUploading(true);

    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const path = `section-images/${fieldId}-${Date.now()}.${ext}`;

    const { error: uploadErr } = await supabase.storage
      .from("dglide-media")
      .upload(path, file, { upsert: true });

    if (uploadErr) {
      setError(uploadErr.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("dglide-media").getPublicUrl(path);
    onChange(fieldId, data.publicUrl);
    setUploading(false);
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-black [font-family:var(--font-sora)]">
        {label}
      </label>

      {/* Preview */}
      {value && (
        <div className="relative w-full max-w-sm h-40 rounded-xl overflow-hidden border border-[#E5E5E5] bg-[#F8F8F8]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt={label}
            className="w-full h-full object-contain"
          />
          <button
            type="button"
            onClick={() => onChange(fieldId, "")}
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {!value && (
        <div className="w-full max-w-sm h-40 rounded-xl border-2 border-dashed border-[#E5E5E5] bg-[#F8F8F8] flex flex-col items-center justify-center gap-2 text-[#AAA]">
          <ImageIcon className="w-8 h-8" />
          <span className="text-xs [font-family:var(--font-inter)]">No image uploaded</span>
        </div>
      )}

      {/* URL input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(fieldId, e.target.value)}
        placeholder="Paste URL or upload a file below"
        className="border border-[#E5E5E5] rounded-xl px-4 py-2.5 text-sm [font-family:var(--font-inter)] text-black focus:outline-none focus:border-[#1C2BFF] transition-colors max-w-sm"
      />

      {/* Upload button */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E5E5E5] text-sm [font-family:var(--font-inter)] text-[#555] hover:border-[#1C2BFF] hover:text-[#1C2BFF] transition-colors disabled:opacity-50 w-fit"
      >
        <Upload className="w-3.5 h-3.5" />
        {uploading ? "Uploading…" : "Upload from computer"}
      </button>

      {error && (
        <span className="text-xs text-red-500 [font-family:var(--font-inter)]">{error}</span>
      )}
    </div>
  );
}
