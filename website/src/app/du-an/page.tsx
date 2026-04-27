import type { Metadata } from "next";
import Link from "next/link";
import { CASE_STUDIES } from "@/lib/data";
import { ArrowRight, Quote, TrendingUp } from "lucide-react";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Dự án thực tế - Kết quả chống hàng giả của khách hàng An Hà",
  description:
    "Xem kết quả thực tế: 94% giảm hàng giả, ROI 850%. Các dự án triển khai thành công trong ngành thực phẩm, dược phẩm, thời trang.",
};

export default function DuAnPage() {
  return (
    <div className="pt-20">
      <div className="bg-navy-900 py-16">
        <div className="section-container text-center">
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Dự án thực tế
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Kết quả thật từ doanh nghiệp thật — minh chứng hiệu quả của giải
            pháp An Hà trên thực địa.
          </p>
        </div>
      </div>

      <section className="section-light">
        <div className="section-container grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CASE_STUDIES.map((cs) => (
            <div key={cs.id} className="card flex flex-col overflow-hidden">
              <div className="bg-navy-800 px-6 py-5 flex items-center justify-between">
                <div>
                  <p className="text-gold-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    {cs.industry}
                  </p>
                  <h2 className="text-white font-bold">{cs.title}</h2>
                </div>
                <TrendingUp className="w-7 h-7 text-gold-400 opacity-60 shrink-0" />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="space-y-3 mb-6 flex-1">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                      Kết quả
                    </p>
                    <p className="text-navy-800 font-semibold text-sm">{cs.result}</p>
                  </div>
                  {cs.testimonial && (
                    <blockquote className="border-l-4 border-gold-400 pl-3 bg-gray-50 rounded-r py-2">
                      <div className="flex gap-2">
                        <Quote className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                        <p className="text-gray-600 text-xs italic">{cs.testimonial}</p>
                      </div>
                    </blockquote>
                  )}
                </div>

                <Link
                  href={`/du-an/${cs.slug}`}
                  className="inline-flex items-center gap-1.5 text-navy-800 font-semibold text-sm hover:gap-3 transition-all"
                >
                  Xem chi tiết <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </div>
  );
}
