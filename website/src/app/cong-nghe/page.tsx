import type { Metadata } from "next";
import { Layers, Cpu, Eye, Lock, Zap, BarChart3 } from "lucide-react";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Công nghệ - Hệ thống chống hàng giả đa lớp của An Hà",
  description:
    "Công nghệ bảo mật tiên tiến: QR động, hologram laser, mực UV ẩn, blockchain tracking. Không thể làm giả, không thể sao chép.",
};

const TECH_FEATURES = [
  {
    icon: Layers,
    title: "Bảo mật đa lớp",
    description:
      "Mỗi tem kết hợp 3-5 lớp bảo mật độc lập: vật lý (hologram, UV), kỹ thuật số (QR, serial), và hệ thống (database, AI). Phá vỡ một lớp vẫn không đủ để làm giả.",
  },
  {
    icon: Cpu,
    title: "QR Code động thế hệ mới",
    description:
      "Mã QR được mã hóa bất đối xứng (RSA-2048), thay đổi mỗi lần quét. Không thể sao chép hay chụp ảnh để tái sử dụng. Mỗi tem là duy nhất trên toàn cầu.",
  },
  {
    icon: Eye,
    title: "Hologram laser phức tạp",
    description:
      "Hologram được thiết kế riêng với hiệu ứng 3D, màu biến đổi theo góc nhìn, ẩn hình ảnh chỉ thấy dưới kính lúp. Cần thiết bị triệu đô để làm giả.",
  },
  {
    icon: Lock,
    title: "Mực bảo mật tiên tiến",
    description:
      "Mực UV phát quang, mực nhiệt biến màu, mực huỳnh quang tần số cụ thể. Chỉ phát hiện bằng thiết bị chuyên dụng. Tổng hợp hóa học độc quyền.",
  },
  {
    icon: Zap,
    title: "Real-time verification",
    description:
      "Hệ thống cloud 99.9% uptime. Tra cứu kết quả trong <500ms. Tự động cảnh báo khi phát hiện quét bất thường: quét nhiều lần, vị trí bất hợp lý, thiết bị lạ.",
  },
  {
    icon: BarChart3,
    title: "Dashboard phân tích",
    description:
      "Bản đồ heat map theo dõi điểm tiêu thụ. Phát hiện ổ hàng giả theo địa lý. Báo cáo tự động hàng tuần. Tích hợp API với ERP/WMS nội bộ doanh nghiệp.",
  },
];

export default function CongNghePage() {
  return (
    <div className="pt-20">
      <div className="bg-navy-900 py-16">
        <div className="section-container text-center">
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Công nghệ bảo mật
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Hệ thống đa lớp kết hợp công nghệ vật lý và kỹ thuật số — tạo ra
            rào cản không thể vượt qua đối với kẻ làm giả.
          </p>
        </div>
      </div>

      <section className="section-light">
        <div className="section-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TECH_FEATURES.map((feat) => {
              const Icon = feat.icon;
              return (
                <div key={feat.title} className="card p-8">
                  <div className="w-14 h-14 bg-navy-800 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-gold-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feat.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-dark">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Chứng nhận & Tiêu chuẩn
          </h2>
          <p className="text-white/60 mb-10 max-w-xl mx-auto">
            Công nghệ An Hà được kiểm định bởi các tổ chức quốc tế uy tín.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {["ISO/IEC 27001", "WHO-GMP", "TCVN 11826", "TÜV SÜD"].map((cert) => (
              <div
                key={cert}
                className="bg-navy-800 border border-navy-600 rounded-2xl py-6 px-4"
              >
                <p className="text-gold-400 font-bold text-lg mb-1">{cert}</p>
                <p className="text-white/40 text-xs">Chứng nhận</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
