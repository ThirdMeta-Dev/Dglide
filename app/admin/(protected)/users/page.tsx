"use client";

import { useCallback, useEffect, useState } from "react";
import { Image as ImageIcon, UserPlus, Pencil, Trash2, X } from "lucide-react";
import MediaPicker from "../blog/MediaPicker";

const ROLES = ["administrator", "editor", "author", "contributor"] as const;
type Role = (typeof ROLES)[number];

const ROLE_STYLES: Record<Role, string> = {
  administrator: "bg-[#1C2BFF]/10 text-[#1C2BFF]",
  editor: "bg-purple-100 text-purple-700",
  author: "bg-orange-100 text-orange-700",
  contributor: "bg-emerald-100 text-emerald-700",
};

type AdminUser = {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatarUrl: string;
  linkedin: string;
  twitter: string;
  email: string;
  role: Role;
  postCount: number;
};

type FormState = {
  name: string;
  email: string;
  role: Role;
  title: string;
  avatarUrl: string;
  bio: string;
  linkedin: string;
  twitter: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  role: "author",
  title: "",
  avatarUrl: "",
  bio: "",
  linkedin: "",
  twitter: "",
};

function roleLabel(role: Role) {
  return role.charAt(0).toUpperCase() + role.slice(1);
}

export default function UsersAdminPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<AdminUser | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState<AdminUser | null>(null);
  const [mediaOpen, setMediaOpen] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/users");
    if (res.ok) setUsers(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch("/api/admin/users")
      .then(async (res) => {
        if (res.ok) setUsers(await res.json());
      })
      .finally(() => setLoading(false));
  }, []);

  const panelOpen = creating || editing !== null;

  function openCreate() {
    setForm(EMPTY_FORM);
    setError("");
    setEditing(null);
    setCreating(true);
  }

  function openEdit(user: AdminUser) {
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      title: user.title,
      avatarUrl: user.avatarUrl,
      bio: user.bio,
      linkedin: user.linkedin,
      twitter: user.twitter,
    });
    setError("");
    setCreating(false);
    setEditing(user);
  }

  function closePanel() {
    setCreating(false);
    setEditing(null);
    setError("");
    setMediaOpen(false);
  }

  async function handleSave() {
    if (!form.name.trim()) {
      setError("Name is required");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const res = await fetch(editing ? `/api/admin/users/${editing.id}` : "/api/admin/users", {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      await load();
      closePanel();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleting) return;
    await fetch(`/api/admin/users/${deleting.id}`, { method: "DELETE" });
    setDeleting(null);
    await load();
  }

  function field(label: string, node: React.ReactNode) {
    return (
      <div>
        <label className="block text-xs text-[#888] [font-family:var(--font-inter)] mb-1.5">{label}</label>
        {node}
      </div>
    );
  }

  const inputCls =
    "w-full h-10 px-3 rounded-[10px] border border-[#E5E5E5] text-sm [font-family:var(--font-inter)] focus:outline-none focus:border-[#1C2BFF] bg-white";

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold [font-family:var(--font-sora)] text-black">Users</h1>
          <p className="text-sm text-[#888] [font-family:var(--font-inter)] mt-1">
            Manage authors and their roles — these users appear in the blog editor&apos;s author dropdown
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-5 py-2.5 rounded-[12px] text-white text-sm font-semibold [font-family:var(--font-sora)] transition-opacity hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #1C2BFF 0%, #141FB5 100%)" }}
        >
          <UserPlus className="w-4 h-4" />
          Add New User
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-[20px] p-16 text-center text-sm text-[#888] [font-family:var(--font-inter)]">
          Loading users…
        </div>
      ) : users.length === 0 ? (
        <div className="bg-white rounded-[20px] p-16 text-center">
          <p className="text-sm font-medium text-black [font-family:var(--font-sora)]">No users yet</p>
          <p className="text-xs text-[#AAA] [font-family:var(--font-inter)] mt-1">
            Add your first author to get started
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-[20px] overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#F0F0F0]">
                {["User", "Email", "Role", "Posts", ""].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-wide text-[#888] [font-family:var(--font-inter)]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-[#F7F7F7] last:border-0 group hover:bg-[#FAFAFF]">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {user.avatarUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={user.avatarUrl}
                          alt={user.name}
                          className="w-9 h-9 rounded-full object-cover border border-[#EEE]"
                        />
                      ) : (
                        <span className="w-9 h-9 rounded-full bg-[#1C2BFF]/10 text-[#1C2BFF] text-sm font-semibold flex items-center justify-center">
                          {user.name.slice(0, 1).toUpperCase()}
                        </span>
                      )}
                      <div>
                        <p className="text-sm font-medium text-black [font-family:var(--font-sora)]">{user.name}</p>
                        {user.title && (
                          <p className="text-xs text-[#999] [font-family:var(--font-inter)]">{user.title}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#555] [font-family:var(--font-inter)]">
                    {user.email || <span className="text-[#CCC]">—</span>}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium [font-family:var(--font-inter)] ${ROLE_STYLES[user.role]}`}
                    >
                      {roleLabel(user.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#555] [font-family:var(--font-inter)]">{user.postCount}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEdit(user)}
                        className="p-2 rounded-lg hover:bg-[#F0F0F0] text-[#555] transition-colors"
                        title="Edit user"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleting(user)}
                        className="p-2 rounded-lg hover:bg-red-50 text-red-400 transition-colors"
                        title="Delete user"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit slide-over */}
      {panelOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={closePanel}>
          <div
            className="w-[440px] max-w-full h-full bg-white shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#F0F0F0] sticky top-0 bg-white">
              <h2 className="text-base font-semibold [font-family:var(--font-sora)] text-black">
                {editing ? "Edit User" : "Add New User"}
              </h2>
              <button onClick={closePanel} className="text-[#888] hover:text-black transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {field(
                "Name *",
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputCls}
                  placeholder="Full name"
                />
              )}
              {field(
                "Email",
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputCls}
                  placeholder="name@dglide.com"
                />
              )}
              {field(
                "Role",
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value as Role })}
                  className={inputCls}
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {roleLabel(r)}
                    </option>
                  ))}
                </select>
              )}
              {field(
                "Title / Position",
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className={inputCls}
                  placeholder="e.g. Content Strategist"
                />
              )}
              {field(
                "Avatar",
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    {form.avatarUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={form.avatarUrl}
                        alt="Avatar preview"
                        className="w-10 h-10 rounded-full object-cover border border-[#EEE] flex-shrink-0"
                      />
                    ) : (
                      <span className="w-10 h-10 rounded-full bg-[#F0F0F0] flex-shrink-0" />
                    )}
                    <input
                      value={form.avatarUrl}
                      onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })}
                      className={inputCls}
                      placeholder="https://…"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setMediaOpen(true)}
                      className="flex items-center justify-center gap-2 h-9 flex-1 rounded-[10px] border border-[#E5E5E5] bg-white text-xs font-medium text-[#555] [font-family:var(--font-inter)] hover:border-[#1C2BFF] hover:text-[#1C2BFF] transition-colors"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      Choose from Media
                    </button>
                    {form.avatarUrl && (
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, avatarUrl: "" })}
                        className="h-9 px-3 rounded-[10px] border border-[#E5E5E5] text-xs text-red-500 [font-family:var(--font-inter)] hover:bg-red-50 transition-colors"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>
              )}
              {field(
                "Bio",
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  rows={4}
                  className="w-full rounded-[10px] border border-[#E5E5E5] p-3 text-sm [font-family:var(--font-inter)] focus:outline-none focus:border-[#1C2BFF] resize-none"
                  placeholder="Shown in the author box on blog posts"
                />
              )}
              {field(
                "LinkedIn",
                <input
                  value={form.linkedin}
                  onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                  className={inputCls}
                  placeholder="https://linkedin.com/in/…"
                />
              )}
              {field(
                "Twitter / X",
                <input
                  value={form.twitter}
                  onChange={(e) => setForm({ ...form, twitter: e.target.value })}
                  className={inputCls}
                  placeholder="https://x.com/…"
                />
              )}

              {error && (
                <p className="text-xs text-red-500 [font-family:var(--font-inter)]">{error}</p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 py-2.5 rounded-[12px] text-white text-sm font-semibold [font-family:var(--font-sora)] transition-opacity hover:opacity-90 disabled:opacity-60"
                  style={{ background: "linear-gradient(135deg, #1C2BFF 0%, #141FB5 100%)" }}
                >
                  {saving ? "Saving…" : editing ? "Save Changes" : "Add User"}
                </button>
                <button
                  onClick={closePanel}
                  className="px-5 py-2.5 rounded-[12px] bg-[#F0F0F0] text-[#333] text-sm font-medium [font-family:var(--font-inter)] hover:bg-[#E5E5E5] transition-colors"
                >
                  Cancel
                </button>
              </div>

              {editing && editing.postCount > 0 && (
                <p className="text-[11px] text-[#999] [font-family:var(--font-inter)] pt-1">
                  Saving updates the author name, photo, title, and bio on this user&apos;s {editing.postCount}{" "}
                  existing post{editing.postCount === 1 ? "" : "s"}.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setDeleting(null)}>
          <div className="w-[400px] max-w-[calc(100%-32px)] bg-white rounded-[20px] p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-base font-semibold [font-family:var(--font-sora)] text-black mb-2">
              Delete {deleting.name}?
            </h2>
            <p className="text-sm text-[#666] [font-family:var(--font-inter)] mb-5">
              The user is removed from the author dropdown.{" "}
              {deleting.postCount > 0
                ? `Their ${deleting.postCount} published post${deleting.postCount === 1 ? " keeps" : "s keep"} the existing byline.`
                : "They have no posts."}
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                className="flex-1 py-2.5 rounded-[12px] bg-red-500 text-white text-sm font-semibold [font-family:var(--font-sora)] hover:bg-red-600 transition-colors"
              >
                Delete User
              </button>
              <button
                onClick={() => setDeleting(null)}
                className="px-5 py-2.5 rounded-[12px] bg-[#F0F0F0] text-[#333] text-sm font-medium [font-family:var(--font-inter)] hover:bg-[#E5E5E5] transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <MediaPicker
        open={mediaOpen}
        onClose={() => setMediaOpen(false)}
        onSelect={(url) => {
          setForm((current) => ({ ...current, avatarUrl: url }));
          setMediaOpen(false);
        }}
      />
    </div>
  );
}
