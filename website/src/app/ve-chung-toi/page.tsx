import type { Metadata } from "next";
import { Award, Users, Factory, Globe } from "lucide-react";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Về An Hà - 15 năm bảo vệ thương hiệu Việt",
  description:
    "An Hà thành lập 2009, hơn 15 năm kinh nghiệm cung cấp giải pháp tem chống hàng giả cho 500+ doanh nghiệp Việt Nam.",
};

const MILESTONES = [
  { year: "2009", event: "Thành lập công ty, bắt đầu nghiên cứu tem chống giả" },
  { year: "2012", event: "Ra mắt dòng Tem QR Code đầu tiên tại Việt Nam" },
  { year: "2015", event: "Đạt chứng nhận ISO/IEC 27001 về bảo mật thông tin" },
  { year: "2018", event: "Mở rộng sang Tem Hologram 3D, phục vụ 200+ khách hàng" },
  { year: "2021", event: "Ra mắt hệ thống dashboard giám sát real-time" },
  { year: "2024", event: "500+ doanh nghiệp, 2 tỷ tem đã cung cấp" },
];

const VALUES = [
  {
    icon: Award,
    title: "Chất lượng tuyệt đối",
    desc: "Mỗi tem qua kiểm định 100% trước xuất xưởng. Không thỏa hiệp về chất lượng.",
  },
  {
    icon: Users,
    title: "Đối tác lâu dài",
    desc: "Chúng tôi không bán sản phẩm, chúng tôi xây dựng quan hệ đối tác bảo vệ thương hiệu.",
  },
  {
    icon: Factory,
    title: "Công nghệ tiên tiến",
    desc: "Liên tục đầu tư R&D, áp dụng công nghệ chống giả mới nhất thế giới.",
  },
  {
    icon: Globe,
    title: "Tiêu chuẩn quốc tế",
    desc: "Tuân thủ ISO, GMP, WHO — đáp ứng yêu cầu xuất khẩu quốc tế.",
  },
];

export default function VeChungToiPage() {
  return (
    <div className="pt-20">
      <div className="bg-navy-900 py-16">
        <div className="section-container text-center">
          <h1 className="text-4xl font-extrabold text-white mb-4">Về An Hà</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            15 năm bảo vệ thương hiệu doanh nghiệp Việt — từ startup nhỏ đến tập đoàn đa quốc gia.
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="section-white">
        <div className="section-container max-w-4xl">
          <h2 className="section-heading mb-6">Câu chuyện của chúng tôi</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Thành lập năm 2009 tại TP.HCM, An Hà ra đời từ nhận thức rõ ràng:
              hàng giả không chỉ gây thiệt hại kinh tế mà còn đe dọa sức khỏe
              người tiêu dùng và phá hoại thương hiệu mà doanh nghiệp đã dày công xây dựng.
            </p>
            <p>
              Với đội ngũ kỹ sư chuyên về bảo mật in ấn và công nghệ xác thực,
              chúng tôi đã phát triển hệ sinh thái tem chống hàng giả toàn diện —
              kết hợp vật liệu bảo mật cao cấp với nền tảng số hiện đại.
            </p>
            <p>
              Ngày nay, hơn 500 doanh nghiệp từ thực phẩm, dược phẩm đến thời
              trang cao cấp tin tưởng An Hà để bảo vệ sản phẩm và thương hiệu của mình.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-light">
        <div className="section-container">
          <h2 className="section-heading text-center mb-12">Giá trị cốt lõi</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="card p-6 text-center">
                  <div className="w-12 h-12 bg-navy-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-navy-800" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-white">
        <div className="section-container max-w-3xl">
          <h2 className="section-heading text-center mb-12">Hành trình phát triển</h2>
          <div className="space-y-6">
            {MILESTONES.map((m, i) => (
              <div key={m.year} className="flex gap-6 items-start">
                <div className="w-16 h-16 bg-navy-800 rounded-2xl flex items-center justify-center text-gold-400 font-bold text-sm shrink-0">
                  {m.year}
                </div>
                <div className="flex-1 pt-3">
                  <p className="text-gray-700">{m.event}</p>
                  {i < MILESTONES.length - 1 && (
                    <div className="mt-6 h-px bg-gray-100" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
