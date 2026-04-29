"use client";

import { useState, useTransition } from "react";
import { updateLeadStatus } from "./_actions";

type Lead = {
  id: string;
  companyName: string;
  industry: string;
  estimatedQuantity: string;
  contactName: string;
  email: string;
  phone: string;
  message: string | null;
  status: string;
  createdAt: Date;
};

const STATUS_OPTIONS = [
  { value: "NEW", label: "Mới", color: "bg-blue-100 text-blue-700" },
  { value: "CONTACTED", label: "Đã liên hệ", color: "bg-yellow-100 text-yellow-700" },
  { value: "QUALIFIED", label: "Tiềm năng", color: "bg-purple-100 text-purple-700" },
  { value: "CLOSED", label: "Đã chốt", color: "bg-green-100 text-green-700" },
];

const INDUSTRY_LABEL: Record<string, string> = {
  "thuc-pham": "Thực phẩm",
  "duoc-pham": "Dược phẩm",
  "my-pham": "Mỹ phẩm",
  "dien-tu": "Điện tử",
  "may-mac": "May mặc",
  "khac": "Khác",
};

export default function LeadsClient({ leads }: { leads: Lead[] | null }) {
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterIndustry, setFilterIndustry] = useState("ALL");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Lead | null>(null);
  const [isPending, startTransition] = useTransition();

  if (!leads) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
        <p className="text-gray-400">Chưa kết nối Database.</p>
        <p className="text-gray-400 text-sm mt-1">Thêm DATABASE_URL vào .env để xem leads.</p>
      </div>
    );
  }

  const filtered = leads.filter((l) => {
    if (filterStatus !== "ALL" && l.status !== filterStatus) return false;
    if (filterIndustry !== "ALL" && l.industry !== filterIndustry) return false;
    if (search && !l.companyName.toLowerCase().includes(search.toLowerCase()) &&
        !l.contactName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  function handleStatusChange(lead: Lead, newStatus: string) {
    startTransition(async () => {
      await updateLeadStatus(lead.id, newStatus);
    });
  }

  const statusColor = (s: string) =>
    STATUS_OPTIONS.find((o) => o.value === s)?.color ?? "bg-gray-100 text-gray-600";
  const statusLabel = (s: string) =>
    STATUS_OPTIONS.find((o) => o.value === s)?.label ?? s;

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <input
          type="text"
          placeholder="Tìm theo tên công ty, liên hệ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy-400 w-64"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy-400"
        >
          <option value="ALL">Tất cả trạng thái</option>
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <select
          value={filterIndustry}
          onChange={(e) => setFilterIndustry(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy-400"
        >
          <option value="ALL">Tất cả ngành</option>
          {Object.entries(INDUSTRY_LABEL).map(([v, l]) => (
            <option key={v} value={v}>{l}</option>
          ))}
        </select>
        <span className="ml-auto text-sm text-gray-400 self-center">{filtered.length} kết quả</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-gray-400">Không có leads nào.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Công ty</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Liên hệ</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Ngành</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Số lượng</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Trạng thái</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Ngày</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900">{lead.companyName}</td>
                    <td className="px-4 py-3">
                      <div>{lead.contactName}</div>
                      <div className="text-gray-400 text-xs">{lead.phone}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {INDUSTRY_LABEL[lead.industry] ?? lead.industry}
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{lead.estimatedQuantity}</td>
                    <td className="px-4 py-3">
                      <select
                        value={lead.status}
                        disabled={isPending}
                        onChange={(e) => handleStatusChange(lead, e.target.value)}
                        className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-1 focus:ring-navy-400 ${statusColor(lead.status)}`}
                      >
                        {STATUS_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                      {new Date(lead.createdAt).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSelected(lead)}
                        className="text-navy-700 text-xs font-medium hover:underline"
                      >
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-900">{selected.companyName}</h2>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>
            <div className="space-y-3 text-sm">
              {[
                ["Người liên hệ", selected.contactName],
                ["Điện thoại", selected.phone],
                ["Email", selected.email],
                ["Ngành hàng", INDUSTRY_LABEL[selected.industry] ?? selected.industry],
                ["Số lượng tem", selected.estimatedQuantity],
                ["Ghi chú", selected.message || "Không có"],
                ["Ngày gửi", new Date(selected.createdAt).toLocaleString("vi-VN")],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[120px_1fr] gap-2">
                  <span className="text-gray-500 font-medium">{k}</span>
                  <span className="text-gray-900">{v}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-gray-100 flex gap-2">
              <a
                href={`tel:${selected.phone}`}
                className="flex-1 bg-navy-800 text-white text-sm font-semibold py-2 rounded-lg text-center hover:bg-navy-700 transition-colors"
              >
                📞 Gọi ngay
              </a>
              <a
                href={`mailto:${selected.email}`}
                className="flex-1 border border-gray-200 text-gray-700 text-sm font-semibold py-2 rounded-lg text-center hover:bg-gray-50 transition-colors"
              >
                ✉️ Gửi email
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
