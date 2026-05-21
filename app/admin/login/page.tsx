"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#F3F3F3] flex items-center justify-center p-4">
      <div className="w-full max-w-[420px]">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-[160px] h-7 relative">
            <Image src="/logo.png" alt="DGlide" fill className="object-contain" />
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-8 shadow-sm">
          <h1 className="text-xl font-semibold [font-family:var(--font-sora)] text-black mb-1">
            Admin Login
          </h1>
          <p className="text-sm text-[#888] [font-family:var(--font-inter)] mb-6">
            Sign in to manage your website content
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium [font-family:var(--font-inter)] text-black">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@dglide.com"
                required
                className="h-12 px-4 rounded-[12px] border border-[#E0E0E0] bg-white text-sm [font-family:var(--font-inter)] outline-none focus:border-[#1C2BFF] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium [font-family:var(--font-inter)] text-black">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="h-12 px-4 rounded-[12px] border border-[#E0E0E0] bg-white text-sm [font-family:var(--font-inter)] outline-none focus:border-[#1C2BFF] transition-colors"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 [font-family:var(--font-inter)]">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 h-12 rounded-[12px] text-white font-semibold text-sm [font-family:var(--font-sora)] transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{
                background: "linear-gradient(135deg, #1C2BFF 0%, #141FB5 100%)",
              }}
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
