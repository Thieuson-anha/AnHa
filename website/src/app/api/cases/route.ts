import { NextRequest, NextResponse } from "next/server";
import { CASE_STUDIES } from "@/lib/data";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const industry = searchParams.get("industry");
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit = Math.min(12, Math.max(1, Number(searchParams.get("limit") ?? 6)));

  let data = CASE_STUDIES;
  if (industry) {
    data = data.filter((cs) =>
      cs.industry.toLowerCase().includes(industry.toLowerCase())
    );
  }

  const total = data.length;
  const start = (page - 1) * limit;
  const paged = data.slice(start, start + limit);

  return NextResponse.json({
    data: paged,
    pagination: { page, limit, total },
  });
}
