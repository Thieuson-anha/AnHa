import { prisma } from "@/lib/db";
import { PRODUCTS, CASE_STUDIES } from "@/lib/data";
import ContentClient from "./_ContentClient";

async function getContent() {
  try {
    const [products, cases] = await Promise.all([
      prisma.product.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.caseStudy.findMany({ orderBy: { createdAt: "desc" } }),
    ]);
    return { products, cases, hasDb: true };
  } catch {
    // Fallback to static data when no DB
    return { products: PRODUCTS as never[], cases: CASE_STUDIES as never[], hasDb: false };
  }
}

export default async function ContentPage() {
  const { products, cases, hasDb } = await getContent();

  return (
    <div className="p-8">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Nội dung</h1>
          <p className="text-gray-500 text-sm mt-1">Sản phẩm & Case Studies hiển thị trên website</p>
        </div>
        {!hasDb && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 text-yellow-700 text-xs max-w-xs">
            Chưa có DATABASE_URL — đang hiển thị dữ liệu tĩnh. Kết nối DB để chỉnh sửa.
          </div>
        )}
      </div>
      <ContentClient products={products} cases={cases} hasDb={hasDb} />
    </div>
  );
}
