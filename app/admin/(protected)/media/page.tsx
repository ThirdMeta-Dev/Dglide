"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Upload, Image as ImageIcon, Trash2 } from "lucide-react";

type MediaItem = {
  id: string;
  filename: string;
  url: string;
  storage_path: string;
  mime_type: string | null;
  size_bytes: number | null;
  alt_text: string | null;
  created_at: string;
};

export default function MediaAdminPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.from("dglide_media").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      if (data) setItems(data);
    });
  }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);

    for (const file of files) {
      const path = `dglide/${Date.now()}-${file.name}`;
      const { data: upload, error } = await supabase.storage.from("media").upload(path, file, { upsert: false });
      if (error || !upload) continue;

      const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(path);
      const { data: record } = await supabase.from("dglide_media").insert({
        filename: file.name,
        url: publicUrl,
        storage_path: path,
        mime_type: file.type,
        size_bytes: file.size,
        alt_text: "",
      }).select().single();

      if (record) setItems((prev) => [record, ...prev]);
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function deleteItem(item: MediaItem) {
    await supabase.storage.from("media").remove([item.storage_path]);
    await supabase.from("dglide_media").delete().eq("id", item.id);
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  }

  function formatBytes(n: number | null) {
    if (!n) return "";
    if (n < 1024) return `${n} B`;
    if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
    return `${(n / 1024 / 1024).toFixed(1)} MB`;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold [font-family:var(--font-sora)] text-black">Media Library</h1>
          <p className="text-sm text-[#888] [font-family:var(--font-inter)] mt-1">Upload and manage images and videos</p>
        </div>
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 px-5 py-2.5 rounded-[12px] text-white text-sm font-semibold [font-family:var(--font-sora)] transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ background: "linear-gradient(135deg, #1C2BFF 0%, #141FB5 100%)" }}
        >
          <Upload className="w-4 h-4" />
          {uploading ? "Uploading…" : "Upload"}
        </button>
        <input ref={fileRef} type="file" multiple accept="image/*,video/*" className="hidden" onChange={handleUpload} />
      </div>

      {items.length === 0 ? (
        <div
          onClick={() => fileRef.current?.click()}
          className="bg-white rounded-[20px] p-16 text-center border-2 border-dashed border-[#E0E0E0] cursor-pointer hover:border-[#1C2BFF] transition-colors"
        >
          <Upload className="w-8 h-8 text-[#CCC] mx-auto mb-3" />
          <p className="text-sm font-medium text-black [font-family:var(--font-sora)]">Click to upload files</p>
          <p className="text-xs text-[#AAA] [font-family:var(--font-inter)] mt-1">Images and videos</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-[16px] overflow-hidden group relative">
              {item.mime_type?.startsWith("image/") ? (
                <img src={item.url} alt={item.alt_text || item.filename} className="w-full h-32 object-cover" />
              ) : (
                <div className="w-full h-32 bg-[#F5F5F5] flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-[#CCC]" />
                </div>
              )}
              <div className="p-2">
                <p className="text-xs [font-family:var(--font-inter)] text-black truncate">{item.filename}</p>
                <p className="text-[10px] text-[#AAA] [font-family:var(--font-inter)]">{formatBytes(item.size_bytes)}</p>
              </div>
              <button
                onClick={() => deleteItem(item)}
                className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-50"
              >
                <Trash2 className="w-3 h-3 text-red-400" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
