import type { Product, CaseStudy, Stat } from "@/types";

export const PRODUCTS: Product[] = [
  {
    id: "tem-qr",
    name: "Tem QR Code Bảo Mật",
    slug: "tem-qr-code",
    description:
      "Tem QR code đa lớp bảo mật, tích hợp hệ thống tra cứu online real-time. Người tiêu dùng quét mã xác thực hàng thật ngay lập tức.",
    features: [
      "Mã QR động, mỗi lần quét khác nhau",
      "Hệ thống tra cứu cloud 99.9% uptime",
      "Chống photocopy, chống làm giả",
      "Dashboard theo dõi quét mã real-time",
      "Tích hợp app iOS/Android",
    ],
    useCases: ["Thực phẩm & đồ uống", "Dược phẩm", "Mỹ phẩm cao cấp"],
    imageUrl: "/images/products/tem-qr.webp",
    icon: "QrCode",
  },
  {
    id: "tem-hologram",
    name: "Tem Hologram 3D",
    slug: "tem-hologram",
    description:
      "Tem hologram công nghệ cao với hiệu ứng 3D phức tạp, không thể sao chép bằng thiết bị thông thường. Bảo vệ thương hiệu cao cấp.",
    features: [
      "Hologram 3D góc nhìn đa chiều",
      "Lớp kim loại hoá học đặc biệt",
      "Tích hợp serial number ẩn",
      "Hiệu ứng màu sắc biến đổi",
      "Tiêu chuẩn ISO/IEC 27001",
    ],
    useCases: ["Đồ điện tử", "Phụ kiện cao cấp", "Tài liệu pháp lý"],
    imageUrl: "/images/products/tem-hologram.webp",
    icon: "Fingerprint",
  },
  {
    id: "tem-serial",
    name: "Tem Serial Number",
    slug: "tem-serial-number",
    description:
      "Tem mã serial duy nhất kết hợp mực UV ẩn, bảo vệ 3 lớp. Phù hợp sản xuất số lượng lớn với chi phí tối ưu.",
    features: [
      "Serial number duy nhất toàn cầu",
      "Mực UV chỉ thấy dưới đèn tia cực tím",
      "Chất liệu tự phá hủy khi bóc",
      "In số lượng lớn, giá thành cạnh tranh",
      "Tích hợp barcode/QR linh hoạt",
    ],
    useCases: ["May mặc & thời trang", "Thiết bị công nghiệp", "Hàng tiêu dùng"],
    imageUrl: "/images/products/tem-serial.webp",
    icon: "Shield",
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "vinamilk",
    title: "Bảo vệ 500 triệu sản phẩm sữa mỗi năm",
    slug: "bao-ve-san-pham-sua",
    client: "Tập đoàn Sữa A",
    industry: "Thực phẩm & đồ uống",
    challenge:
      "Hàng giả tràn lan trên thị trường, thiệt hại ước tính 50 tỷ/năm. Người tiêu dùng mất niềm tin.",
    solution:
      "Triển khai tem QR Code bảo mật cho 12 dòng sản phẩm, tích hợp hệ thống tra cứu và cảnh báo tự động khi phát hiện bất thường.",
    result:
      "Giảm 94% hàng giả sau 6 tháng. Niềm tin người tiêu dùng tăng 37%. ROI 850% trong năm đầu.",
    testimonial:
      "An Hà giúp chúng tôi bảo vệ thương hiệu một cách toàn diện. Hệ thống tra cứu real-time giúp phát hiện hàng giả trong 24 giờ.",
    testimonialAuthor: "Giám đốc An Toàn Sản Phẩm",
    imageUrl: "/images/cases/dairy.webp",
  },
  {
    id: "pharma",
    title: "Bảo mật dược phẩm đạt chuẩn WHO",
    slug: "bao-mat-duoc-pham",
    client: "Công ty Dược B",
    industry: "Dược phẩm",
    challenge:
      "Thuốc giả nguy hiểm đến tính mạng người bệnh, ảnh hưởng nghiêm trọng đến uy tín thương hiệu.",
    solution:
      "Tem Hologram 3D kết hợp serial number, tuân thủ tiêu chuẩn GMP và WHO về chống giả dược phẩm.",
    result:
      "100% dây chuyền sản xuất được bảo vệ. Vượt kiểm định WHO. Zero incident hàng giả sau 2 năm.",
    testimonial:
      "Giải pháp của An Hà giúp chúng tôi đạt chứng nhận WHO-GMP và mở rộng xuất khẩu sang 5 quốc gia.",
    testimonialAuthor: "CEO Công ty Dược",
    imageUrl: "/images/cases/pharma.webp",
  },
  {
    id: "fashion",
    title: "Chống hàng nhái thời trang cao cấp",
    slug: "chong-hang-nhai-thoi-trang",
    client: "Thương hiệu Thời trang C",
    industry: "May mặc & thời trang",
    challenge:
      "Hàng nhái chất lượng kém bán giá cao gấp 3 lần hàng thật, phá hoại định vị thương hiệu cao cấp.",
    solution:
      "Tem Serial Number tự phá hủy, tích hợp QR tra cứu, áp dụng cho 200+ SKU trên toàn bộ sản phẩm.",
    result:
      "Hàng nhái giảm 89%. Doanh số chính hãng tăng 23%. Khách hàng trung thành tăng 41%.",
    imageUrl: "/images/cases/fashion.webp",
  },
];

export const STATS: Stat[] = [
  { value: "500+", label: "Doanh nghiệp tin dùng", description: "Trên toàn quốc" },
  { value: "2 tỷ+", label: "Tem đã cung cấp", description: "Từ 2015 đến nay" },
  { value: "94%", label: "Giảm hàng giả", description: "Trung bình sau 6 tháng" },
  { value: "15 năm", label: "Kinh nghiệm", description: "Trong ngành chống giả" },
];

export const INDUSTRIES = [
  { value: "thuc-pham", label: "Thực phẩm & đồ uống" },
  { value: "duoc-pham", label: "Dược phẩm" },
  { value: "my-pham", label: "Mỹ phẩm & làm đẹp" },
  { value: "dien-tu", label: "Điện tử & công nghệ" },
  { value: "may-mac", label: "May mặc & thời trang" },
  { value: "khac", label: "Ngành khác" },
] as const;

export const QUANTITIES = [
  { value: "duoi-10000", label: "Dưới 10,000 tem/năm" },
  { value: "10000-50000", label: "10,000 – 50,000 tem/năm" },
  { value: "50000-200000", label: "50,000 – 200,000 tem/năm" },
  { value: "tren-200000", label: "Trên 200,000 tem/năm" },
] as const;
