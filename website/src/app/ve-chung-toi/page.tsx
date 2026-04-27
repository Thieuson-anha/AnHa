import type { Metadata } from "next";
import { Award, Users, Factory, Globe } from "lucide-react";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Về An Hà - 18+ năm tiên phong chống hàng giả tại Việt Nam",
  description:
    "Công ty Cổ phần Giải pháp chống giả An Hà thành lập 2008, tiên phong cung cấp tem chống giả Bộ Công An, Hologram, QR Code và đăng ký sở hữu trí tuệ.",
};

const MILESTONES = [
  { year: "2008", event: "Thành lập Công ty Cổ phần Giải pháp chống giả An Hà tại Hà Nội" },
  { year: "2010", event: "Trở thành đại lý chính thức tem chống giả Bộ Công An" },
  { year: "2013", event: "Ra mắt giải pháp Tem Hologram 7 màu công nghệ laser" },
  { year: "2016", event: "Triển khai QR Code Smartcheck — xác thực điện tử bằng smartphone" },
  { year: "2019", event: "Mở rộng dịch vụ đăng ký nhãn hiệu, bản quyền và mã vạch" },
  { year: "2026", event: "Hàng nghìn doanh nghiệp tin dùng, tư vấn miễn phí 24/7" },
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
            Tiên phong trong giải pháp chống hàng giả tại Việt Nam — 18+ năm kinh nghiệm,
            hàng nghìn doanh nghiệp tin dùng.
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="section-white">
        <div className="section-container max-w-4xl">
          <h2 className="section-heading mb-6">Câu chuyện của chúng tôi</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Thành lập năm 2008 tại Hà Nội, Công ty Cổ phần Giải pháp chống giả An Hà
              là tổ chức tiên phong trong lĩnh vực cung cấp các giải pháp chống hàng giả,
              hàng nhái cho các tổ chức và doanh nghiệp đang hoạt động tại Việt Nam.
            </p>
            <p>
              Với gần 20 năm kinh nghiệm, An Hà cung cấp đầy đủ các giải pháp: tem chống
              giả Bộ Công An có đầy đủ pháp lý, tem Hologram 7 màu công nghệ laser tiên
              tiến, QR Code Smartcheck xác thực điện tử — cùng dịch vụ đăng ký bản quyền,
              nhãn hiệu và mã vạch sản phẩm.
            </p>
            <p>
              Hàng nghìn doanh nghiệp sản xuất, kinh doanh trên toàn quốc đã và đang sử dụng
              giải pháp của An Hà để bảo vệ thương hiệu và niềm tin của người tiêu dùng.
              Đội ngũ chuyên gia tư vấn miễn phí 24/7 trong ngày làm việc.
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
