import Link from "next/link";
import { QrCode, Fingerprint, Shield, ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/lib/data";

const ICONS: Record<string, React.ElementType> = {
  QrCode,
  Fingerprint,
  Shield,
};

export default function SolutionOverview() {
  return (
    <section className="section-white">
      <div className="section-container">
        <div className="text-center mb-14">
          <p className="text-gold-600 font-semibold text-sm uppercase tracking-wider mb-3">
            Giải pháp
          </p>
          <h2 className="section-heading mx-auto">
            3 dòng tem bảo mật hàng đầu
          </h2>
          <p className="section-subheading mx-auto text-center">
            Mỗi giải pháp được thiết kế tối ưu cho từng ngành hàng và mức độ bảo mật.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => {
            const Icon = ICONS[product.icon] ?? Shield;
            return (
              <div key={product.id} className="card p-8 hover:-translate-y-1 group">
                <div className="w-14 h-14 bg-navy-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-navy-800 transition-colors">
                  <Icon className="w-7 h-7 text-navy-800 group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {product.description}
                </p>

                <ul className="space-y-2 mb-8">
                  {product.features.slice(0, 3).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-gold-500 rounded-full mt-2 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mb-6">
                  {product.useCases.map((uc) => (
                    <span key={uc} className="badge-blue text-xs">{uc}</span>
                  ))}
                </div>

                <Link
                  href={`/giai-phap/${product.slug}`}
                  className="flex items-center gap-1.5 text-navy-800 font-semibold text-sm hover:gap-3 transition-all"
                >
                  Tìm hiểu thêm <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
