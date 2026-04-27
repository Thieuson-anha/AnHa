import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export default function CTASection() {
  return (
    <section className="section-dark">
      <div className="section-container text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-gold-400 font-semibold text-sm uppercase tracking-wider mb-4">
            Bắt đầu ngay hôm nay
          </p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Bảo vệ thương hiệu ngay hôm nay
          </h2>
          <p className="text-white/60 text-lg mb-10">
            18+ năm kinh nghiệm, hàng nghìn doanh nghiệp tin dùng. Chuyên gia
            An Hà tư vấn miễn phí — hỗ trợ hồ sơ, cấp phép và triển khai nhanh
            chóng, không gián đoạn sản xuất.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/lien-he" className="btn-primary text-base px-10 py-4">
              Nhận tư vấn miễn phí
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:0936233454"
              className="flex items-center justify-center gap-2 border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-10 py-4 rounded-lg transition-colors"
            >
              <Phone className="w-5 h-5" />
              Gọi: 093 6233 454
            </a>
          </div>

          <p className="text-white/40 text-sm mt-6">
            Tư vấn miễn phí 24/7 · Hỗ trợ hồ sơ trọn gói · Không ràng buộc
          </p>
        </div>
      </div>
    </section>
  );
}
