import { prisma } from "@/lib/db";
import Link from "next/link";

async function getStats() {
  try {
    const [total, byStatus, recent] = await Promise.all([
      prisma.contact.count(),
      prisma.contact.groupBy({ by: ["status"], _count: true }),
      prisma.contact.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);
    return { total, byStatus, recent };
  } catch {
    return null;
  }
}

const STATUS_LABEL: Record<string, string> = {
  NEW: "Mới",
  CONTACTED: "Đã liên hệ",
  QUALIFIED: "Tiềm năng",
  CLOSED: "Đã chốt",
};

const STATUS_COLOR: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-700",
  CONTACTED: "bg-yellow-100 text-yellow-700",
  QUALIFIED: "bg-purple-100 text-purple-700",
  CLOSED: "bg-green-100 text-green-700",
};

export default async function AdminDashboard() {
  const data = await getStats();

  const cards = [
    { label: "Tổng leads", value: data?.total ?? 0, color: "bg-navy-800", text: "text-white" },
    { label: "Mới", value: data?.byStatus.find((s) => s.status === "NEW")?._count ?? 0, color: "bg-blue-500", text: "text-white" },
    { label: "Đã liên hệ", value: data?.byStatus.find((s) => s.status === "CONTACTED")?._count ?? 0, color: "bg-yellow-500", text: "text-white" },
    { label: "Đã chốt", value: data?.byStatus.find((s) => s.status === "CLOSED")?._count ?? 0, color: "bg-green-500", text: "text-white" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Tổng quan hệ thống An Hà</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((c) => (
          <div key={c.label} className={`${c.color} rounded-2xl p-5`}>
            <p className={`text-3xl font-extrabold ${c.text}`}>{c.value}</p>
            <p className={`text-sm mt-1 ${c.text} opacity-80`}>{c.label}</p>
          </div>
        ))}
      </div>

      {/* Recent leads */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Leads gần đây</h2>
          <Link href="/admin/leads" className="text-navy-700 text-sm font-medium hover:underline">
            Xem tất cả →
          </Link>
        </div>

        {!data ? (
          <div className="p-8 text-center">
            <p className="text-gray-400 text-sm">Chưa kết nối Database.</p>
            <p className="text-gray-400 text-xs mt-1">Thêm DATABASE_URL vào .env để xem leads.</p>
          </div>
        ) : data.recent.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-400 text-sm">Chưa có lead nào.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {data.recent.map((lead) => (
              <div key={lead.id} className="px-6 py-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{lead.companyName}</p>
                  <p className="text-gray-500 text-sm">{lead.contactName} · {lead.phone}</p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${STATUS_COLOR[lead.status]}`}>
                  {STATUS_LABEL[lead.status]}
                </span>
                <time className="text-gray-400 text-xs shrink-0">
                  {new Date(lead.createdAt).toLocaleDateString("vi-VN")}
                </time>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
