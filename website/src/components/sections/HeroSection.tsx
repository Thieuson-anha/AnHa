import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const TRUST_POINTS = [
  "Tem Bộ Công An đầy đủ pháp lý",
  "18+ năm kinh nghiệm",
  "Tư vấn miễn phí 24/7",
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
              Giải pháp chống hàng giả — Tiên phong từ 2008
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Bảo vệ thương hiệu{" "}
              <span className="text-gold-400">doanh nghiệp</span> trước hàng
              giả, hàng nhái
            </h1>

            <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-xl">
              An Hà cung cấp <strong className="text-white">tem chống giả Bộ Công An</strong>,
              tem Hologram 7 màu, QR Code Smartcheck và các dịch vụ đăng ký sở hữu
              trí tuệ — giải pháp toàn diện bảo vệ thương hiệu doanh nghiệp Việt.
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
                <div className="space-y-5">
                  {[
                    {
                      label: "Tem Bộ Công An",
                      badge: "Pháp lý đầy đủ",
                      badgeColor: "bg-blue-500/20 text-blue-300",
                      desc: "Cơ sở in Bộ Công An sản xuất trực tiếp",
                    },
                    {
                      label: "Tem Hologram 7 Màu",
                      badge: "Phổ biến nhất",
                      badgeColor: "bg-gold-500/20 text-gold-300",
                      desc: "Công nghệ laser, không thể làm giả",
                    },
                    {
                      label: "QR Code Smartcheck",
                      badge: "Thông minh",
                      badgeColor: "bg-green-500/20 text-green-300",
                      desc: "Xác thực bằng smartphone tức thì",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-4 bg-white/5 rounded-xl p-4"
                    >
                      <div className="w-10 h-10 bg-white/10 rounded-lg shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-white font-semibold text-sm">
                            {item.label}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.badgeColor}`}
                          >
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-white/50 text-xs">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-center">
                  {[
                    { n: "2008", l: "Thành lập" },
                    { n: "18+", l: "Năm KN" },
                    { n: "24/7", l: "Hỗ trợ" },
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
