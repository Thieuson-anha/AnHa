import type { Metadata } from "next";
import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "An Hà - Giải pháp Tem Chống Hàng Giả hàng đầu Việt Nam",
    template: "%s | An Hà",
  },
  description:
    "An Hà cung cấp giải pháp tem chống hàng giả toàn diện: Tem QR Code, Hologram 3D, Serial Number. Bảo vệ thương hiệu doanh nghiệp B2B tin cậy từ 2009.",
  keywords: [
    "tem chống hàng giả",
    "tem bảo mật",
    "tem QR code",
    "tem hologram",
    "chống giả mạo",
    "bảo vệ thương hiệu",
    "An Hà",
  ],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "An Hà",
    title: "An Hà - Giải pháp Tem Chống Hàng Giả hàng đầu Việt Nam",
    description:
      "Bảo vệ thương hiệu doanh nghiệp với hệ thống tem chống hàng giả công nghệ cao.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
