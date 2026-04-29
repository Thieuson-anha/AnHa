"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Loader2, Lock } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push(searchParams.get("from") || "/admin");
        router.refresh();
      } else {
        setError("Mật khẩu không đúng. Vui lòng thử lại.");
      }
    } catch {
      setError("Lỗi kết nối. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Mật khẩu
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Nhập mật khẩu admin"
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy-600 focus:border-transparent"
          required
          autoFocus
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading || !password}
        className="w-full bg-navy-800 hover:bg-navy-700 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <><Loader2 className="w-4 h-4 animate-spin" />Đang đăng nhập...</>
        ) : "Đăng nhập"}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-block bg-white/95 rounded-lg px-3 py-2 mb-4">
            <Image
              src="/images/logo-anha.jpg"
              alt="An Hà"
              width={120}
              height={48}
              className="h-12 w-auto"
            />
          </div>
          <p className="text-white/50 text-sm">Trang quản trị nội bộ</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gold-500/10 rounded-xl flex items-center justify-center">
              <Lock className="w-5 h-5 text-gold-500" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900">Đăng nhập Admin</h1>
              <p className="text-gray-500 text-xs">An Hà Management</p>
            </div>
          </div>
          <Suspense fallback={<div className="h-32 animate-pulse bg-gray-50 rounded-lg" />}>
            <LoginForm />
          </Suspense>
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          © An Hà — Trang nội bộ, không dành cho khách hàng
        </p>
      </div>
    </div>
  );
}
