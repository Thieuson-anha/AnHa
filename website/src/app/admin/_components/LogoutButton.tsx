"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full flex items-center gap-2 px-3 py-2 text-white/50 hover:text-white text-sm rounded-lg hover:bg-navy-700 transition-colors"
    >
      <span>🚪</span> Đăng xuất
    </button>
  );
}
