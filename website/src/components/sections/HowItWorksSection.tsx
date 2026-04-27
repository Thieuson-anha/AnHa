import { ClipboardList, Settings, ShieldCheck } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: ClipboardList,
    title: "Tư vấn & Đánh giá",
    description:
      "Chuyên gia An Hà phân tích ngành hàng, sản phẩm và rủi ro hàng giả. Đề xuất giải pháp tem phù hợp nhất với ngân sách và mục tiêu bảo mật.",
  },
  {
    step: "02",
    icon: Settings,
    title: "Thiết kế & Sản xuất",
    description:
      "Thiết kế tem theo nhận diện thương hiệu, tích hợp tính năng bảo mật đa lớp. Sản xuất theo tiêu chuẩn ISO, kiểm định 100% trước xuất xưởng.",
  },
  {
    step: "03",
    icon: ShieldCheck,
    title: "Triển khai & Giám sát",
    description:
      "Tích hợp vào dây chuyền sản xuất, đào tạo nhân viên. Dashboard real-time theo dõi quét mã, phát hiện bất thường và cảnh báo tức thì.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="section-light">
      <div className="section-container">
        <div className="text-center mb-14">
          <p className="text-gold-600 font-semibold text-sm uppercase tracking-wider mb-3">
            Quy trình
          </p>
          <h2 className="section-heading">
            Triển khai trong 3 bước đơn giản
          </h2>
          <p className="section-subheading mx-auto text-center">
            Quy trình chuẩn hoá giúp doanh nghiệp bảo vệ sản phẩm nhanh chóng,
            không gián đoạn sản xuất.
          </p>
        </div>

        <div className="relative grid md:grid-cols-3 gap-8">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-navy-600 to-gold-400 opacity-30" />

          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="relative text-center">
                <div className="relative inline-flex mb-6">
                  <div className="w-24 h-24 bg-navy-800 rounded-3xl flex items-center justify-center shadow-lg">
                    <Icon className="w-10 h-10 text-gold-400" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 bg-gold-500 text-navy-900 text-xs font-bold rounded-full flex items-center justify-center">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
