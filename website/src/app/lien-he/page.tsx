import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import ContactForm from "@/components/ui/ContactForm";

export const metadata: Metadata = {
  title: "Liên hệ - Nhận báo giá tem chống hàng giả",
  description:
    "Liên hệ An Hà để nhận tư vấn miễn phí và báo giá tem chống hàng giả phù hợp với doanh nghiệp của bạn.",
};

const CONTACT_INFO = [
  {
    icon: Phone,
    label: "Hotline",
    value: "0901 234 567",
    href: "tel:0901234567",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@anha.vn",
    href: "mailto:info@anha.vn",
  },
  {
    icon: MapPin,
    label: "Địa chỉ",
    value: "123 Đường ABC, Phường XYZ, Quận 1, TP.HCM",
  },
  {
    icon: Clock,
    label: "Giờ làm việc",
    value: "Thứ 2 – Thứ 6: 8:00 – 17:30",
  },
];

export default function ContactPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="bg-navy-900 py-16">
        <div className="section-container text-center">
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Liên hệ tư vấn
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Điền form bên dưới, chuyên gia An Hà sẽ liên hệ trong vòng 24 giờ
            với tư vấn và báo giá cụ thể.
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="section-light">
        <div className="section-container">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Gửi yêu cầu báo giá
              </h2>
              <p className="text-gray-500 text-sm mb-8">
                Tất cả trường có dấu * là bắt buộc
              </p>
              <ContactForm />
            </div>

            {/* Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-navy-800 rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-6">Thông tin liên hệ</h3>
                <ul className="space-y-6">
                  {CONTACT_INFO.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.label} className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-navy-700 rounded-xl flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-gold-400" />
                        </div>
                        <div>
                          <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-0.5">
                            {item.label}
                          </p>
                          {item.href ? (
                            <a
                              href={item.href}
                              className="text-white hover:text-gold-400 transition-colors font-medium"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-white font-medium">{item.value}</p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="bg-gold-500/10 border border-gold-400/30 rounded-2xl p-6">
                <p className="text-navy-800 font-semibold mb-2">
                  Phản hồi nhanh đảm bảo
                </p>
                <p className="text-gray-600 text-sm">
                  Mọi yêu cầu đều được xử lý trong vòng{" "}
                  <strong>24 giờ làm việc</strong>. Dự án gấp? Gọi hotline
                  để được hỗ trợ ngay.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
