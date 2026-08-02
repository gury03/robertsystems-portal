"use client";

export default function LogoutButton() {
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }
  return (
    <button
      type="button"
      onClick={logout}
      className="rounded-full border border-slate-600 px-4 py-2 text-sm text-slate-200 transition-colors hover:border-red-400 hover:text-red-300"
    >
      Cerrar sesión
    </button>
  );
}
