import Link from "next/link";
import { Quote, ArrowRight, TrendingUp } from "lucide-react";
import { CASE_STUDIES } from "@/lib/data";

export default function CaseStudySection() {
  const featured = CASE_STUDIES.slice(0, 2);

  return (
    <section className="section-white">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-gold-600 font-semibold text-sm uppercase tracking-wider mb-3">
              Dự án thực tế
            </p>
            <h2 className="section-heading mb-0">
              Kết quả thật từ doanh nghiệp thật
            </h2>
          </div>
          <Link
            href="/du-an"
            className="flex items-center gap-1.5 text-navy-800 font-semibold text-sm shrink-0 hover:gap-3 transition-all"
          >
            Xem tất cả dự án <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {featured.map((cs) => (
            <div key={cs.id} className="card overflow-hidden">
              {/* Header */}
              <div className="bg-navy-800 px-8 py-6 flex items-center justify-between">
                <div>
                  <p className="text-gold-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    {cs.industry}
                  </p>
                  <h3 className="text-white font-bold text-lg">{cs.title}</h3>
                </div>
                <TrendingUp className="w-8 h-8 text-gold-400 shrink-0 opacity-60" />
              </div>

              {/* Body */}
              <div className="p-8">
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                      Thách thức
                    </p>
                    <p className="text-gray-700 text-sm">{cs.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                      Kết quả
                    </p>
                    <p className="text-navy-800 font-semibold text-sm">{cs.result}</p>
                  </div>
                </div>

                {cs.testimonial && (
                  <blockquote className="border-l-4 border-gold-400 pl-4 py-2 bg-gray-50 rounded-r-lg">
                    <div className="flex gap-2 mb-2">
                      <Quote className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                      <p className="text-gray-600 text-sm italic">{cs.testimonial}</p>
                    </div>
                    {cs.testimonialAuthor && (
                      <p className="text-gray-500 text-xs font-medium pl-6">
                        — {cs.testimonialAuthor}
                      </p>
                    )}
                  </blockquote>
                )}

                <Link
                  href={`/du-an/${cs.slug}`}
                  className="inline-flex items-center gap-1.5 text-navy-800 font-semibold text-sm mt-6 hover:gap-3 transition-all"
                >
                  Xem chi tiết <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
