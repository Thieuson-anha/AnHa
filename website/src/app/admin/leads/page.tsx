import { prisma } from "@/lib/db";
import LeadsClient from "./_LeadsClient";

async function getLeads() {
  try {
    return await prisma.contact.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    return null;
  }
}

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý Leads</h1>
        <p className="text-gray-500 text-sm mt-1">
          {leads ? `${leads.length} leads` : "Chưa kết nối Database"}
        </p>
      </div>
      <LeadsClient leads={leads} />
    </div>
  );
}
