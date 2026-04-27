import Link from "next/link";
import { ArrowRight, CheckCircle, Shield, Award } from "lucide-react";

const TRUST_POINTS = [
  "500+ doanh nghiệp tin dùng",
  "2 tỷ+ tem đã cung cấp",
  "15 năm kinh nghiệm",
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Gold accent circles */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-navy-600/30 rounded-full blur-3xl" />

      <div className="section-container relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center py-20">
          {/* Left - Content */}
          <div>
            <div className="badge-gold mb-6 w-fit">
              <Shield className="w-3 h-3" />
              Giải pháp chống hàng giả #1 Việt Nam
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Bảo vệ thương hiệu{" "}
              <span className="text-gold-400">doanh nghiệp</span> trước hàng
              giả
            </h1>

            <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-xl">
              An Hà cung cấp hệ thống tem chống hàng giả công nghệ cao — từ QR
              Code bảo mật đến Hologram 3D. Giảm tới <strong className="text-white">94% hàng giả</strong> trong
              6 tháng đầu triển khai.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/lien-he" className="btn-primary">
                Nhận tư vấn miễn phí
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/giai-phap" className="btn-secondary border-white/30 text-white hover:bg-white hover:text-navy-900">
                Xem giải pháp
              </Link>
            </div>

            <ul className="flex flex-col sm:flex-row flex-wrap gap-x-6 gap-y-3">
              {TRUST_POINTS.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-2 text-sm text-white/70"
                >
                  <CheckCircle className="w-4 h-4 text-gold-400 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Right - Visual card */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Main card */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gold-500 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-navy-900" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Chứng nhận ISO/IEC</p>
                    <p className="text-white/60 text-sm">27001 · Tiêu chuẩn bảo mật quốc tế</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "Tem QR Code Bảo Mật", progress: 95, color: "bg-blue-400" },
                    { label: "Hologram 3D", progress: 88, color: "bg-gold-400" },
                    { label: "Serial Number UV", progress: 92, color: "bg-green-400" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-white/80">{item.label}</span>
                        <span className="text-white/60">{item.progress}% hiệu quả</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.color} rounded-full`}
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-center">
                  {[
                    { n: "500+", l: "Đối tác" },
                    { n: "2B+", l: "Tem đã in" },
                    { n: "94%", l: "Giảm giả" },
                  ].map((s) => (
                    <div key={s.l}>
                      <p className="text-2xl font-bold text-gold-400">{s.n}</p>
                      <p className="text-white/50 text-xs">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white text-xs font-bold px-3 py-2 rounded-full shadow-lg animate-pulse">
                ✓ Hàng thật xác nhận
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
