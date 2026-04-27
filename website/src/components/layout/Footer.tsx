import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Facebook, Linkedin } from "lucide-react";

const SOLUTION_LINKS = [
  { href: "/giai-phap/tem-qr-code", label: "Tem QR Code" },
  { href: "/giai-phap/tem-hologram", label: "Tem Hologram 3D" },
  { href: "/giai-phap/tem-serial-number", label: "Tem Serial Number" },
];

const COMPANY_LINKS = [
  { href: "/ve-chung-toi", label: "Về An Hà" },
  { href: "/du-an", label: "Dự án thực tế" },
  { href: "/cong-nghe", label: "Công nghệ" },
  { href: "/lien-he", label: "Liên hệ" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Image
                src="/images/logo-anha.jpg"
                alt="An Hà - Giá trị ở niềm tin"
                width={120}
                height={48}
                className="h-12 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Tiên phong trong giải pháp chống hàng giả tại Việt Nam từ 2008 —
              tem Bộ Công An, Hologram, QR Code và đăng ký sở hữu trí tuệ.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 bg-navy-800 hover:bg-navy-700 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-navy-800 hover:bg-navy-700 rounded-lg flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gold-400 mb-4">
              Giải pháp
            </h3>
            <ul className="space-y-3">
              {SOLUTION_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gold-400 mb-4">
              Công ty
            </h3>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gold-400 mb-4">
              Liên hệ
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-gold-400" />
                <span>Phòng 207, Khách sạn Thể thao, 15 Lê Văn Thiêm, Thanh Xuân, Hà Nội</span>
              </li>
              <li>
                <a
                  href="tel:02435558212"
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0 text-gold-400" />
                  <span>024.3555.8212</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:0936233454"
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0 text-gold-400" />
                  <span>093 6233 454</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:Contact@temchonghanggia.com"
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0 text-gold-400" />
                  <span>Contact@temchonghanggia.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <p>© 2008–2026 Công ty Cổ phần Giải pháp chống giả An Hà. Bảo lưu mọi quyền.</p>
          <div className="flex gap-6">
            <Link href="/chinh-sach-bao-mat" className="hover:text-white/70 transition-colors">
              Chính sách bảo mật
            </Link>
            <Link href="/dieu-khoan" className="hover:text-white/70 transition-colors">
              Điều khoản sử dụng
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
