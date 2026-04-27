import type { Metadata } from "next";
import Link from "next/link";
import { QrCode, Fingerprint, Shield, ArrowRight, CheckCircle } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Giải pháp tem chống hàng giả - Tem QR, Hologram, Serial",
  description:
    "Ba dòng tem chống hàng giả hàng đầu: QR Code bảo mật, Hologram 3D, Serial Number UV. Phù hợp mọi ngành hàng và quy mô doanh nghiệp.",
};

const ICONS: Record<string, React.ElementType> = { QrCode, Fingerprint, Shield };

export default function GiaiPhapPage() {
  return (
    <div className="pt-20">
      <div className="bg-navy-900 py-16">
        <div className="section-container text-center">
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Giải pháp tem chống hàng giả
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Từ QR Code đến Hologram 3D — chúng tôi có giải pháp phù hợp cho mọi
            ngành hàng và mức độ bảo mật yêu cầu.
          </p>
        </div>
      </div>

      <section className="section-light">
        <div className="section-container space-y-12">
          {PRODUCTS.map((product, idx) => {
            const Icon = ICONS[product.icon] ?? Shield;
            const isEven = idx % 2 === 0;
            return (
              <div
                key={product.id}
                className={`bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 grid lg:grid-cols-2`}
              >
                <div className={`p-10 lg:p-14 ${isEven ? "" : "lg:order-2"}`}>
                  <div className="w-16 h-16 bg-navy-100 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-navy-800" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {product.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/lien-he" className="btn-primary">
                    Nhận báo giá <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className={`bg-navy-800 p-10 lg:p-14 flex flex-col justify-center ${isEven ? "" : "lg:order-1"}`}>
                  <p className="text-gold-400 font-semibold text-sm uppercase tracking-wider mb-4">
                    Phù hợp cho
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {product.useCases.map((uc) => (
                      <span
                        key={uc}
                        className="bg-navy-700 text-white px-4 py-2 rounded-full text-sm font-medium"
                      >
                        {uc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <CTASection />
    </div>
  );
}
