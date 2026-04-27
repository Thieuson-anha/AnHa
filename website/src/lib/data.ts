import type { Product, CaseStudy, Stat } from "@/types";

export const PRODUCTS: Product[] = [
  {
    id: "tem-bo-cong-an",
    name: "Tem Chống Giả Bộ Công An",
    slug: "tem-bo-cong-an",
    description:
      "Tem chống hàng giả do cơ sở in ấn của Bộ Công An trực tiếp sản xuất, đảm bảo đầy đủ pháp lý. In trên decal vỡ chống tái sử dụng, tích hợp công nghệ chống giả hiện đại nhất.",
    features: [
      "Do Bộ Công An cấp phép và sản xuất trực tiếp",
      "Decal vỡ chống bóc tái sử dụng",
      "Công nghệ chống giả tiên tiến nhất hiện nay",
      "Được cơ quan thẩm quyền và doanh nghiệp công nhận",
      "Tư vấn hồ sơ và cấp phép miễn phí",
    ],
    useCases: ["Thực phẩm & đồ uống", "Dược phẩm", "Hàng tiêu dùng"],
    imageUrl: "/images/products/tem-bca.webp",
    icon: "Shield",
  },
  {
    id: "tem-hologram",
    name: "Tem Hologram 7 Màu",
    slug: "tem-hologram",
    description:
      "Tem hologram sản xuất bằng công nghệ laser tiên tiến, không sử dụng mực in. Hiệu ứng 7 màu biến đổi góc nhìn, không thể sao chép bằng thiết bị thông thường.",
    features: [
      "Công nghệ laser tiên tiến, không dùng mực",
      "Hiệu ứng 7 màu đổi góc độ nhìn",
      "Tích hợp mã QR tra cứu thông tin sản phẩm",
      "Không thể làm giả bằng thiết bị thông thường",
      "Phổ biến nhất trong sản xuất và kinh doanh hiện nay",
    ],
    useCases: ["Điện tử & công nghệ", "Mỹ phẩm cao cấp", "Phụ kiện thương hiệu"],
    imageUrl: "/images/products/tem-hologram.webp",
    icon: "Fingerprint",
  },
  {
    id: "tem-qr-smartcheck",
    name: "Tem QR Code Smartcheck",
    slug: "tem-qr-code",
    description:
      "Giải pháp xác thực điện tử: người tiêu dùng quét QR bằng smartphone, hệ thống trả về thông tin sản phẩm và nhà sản xuất tức thì — chống hàng giả thông minh.",
    features: [
      "Quét mã bằng bất kỳ điện thoại thông minh nào",
      "Hiển thị thông tin sản phẩm và nhà sản xuất",
      "Hệ thống theo dõi quét mã real-time",
      "Phát hiện bất thường và cảnh báo tự động",
      "Tích hợp app iOS/Android",
    ],
    useCases: ["May mặc & thời trang", "Thực phẩm đóng gói", "Dược phẩm"],
    imageUrl: "/images/products/tem-qr.webp",
    icon: "QrCode",
  },
];

export const EXTRA_SERVICES = [
  {
    icon: "BookOpen",
    title: "Đăng ký Bản quyền",
    description: "Bảo hộ quyền sở hữu trí tuệ cho sản phẩm và thương hiệu của doanh nghiệp theo quy định pháp luật Việt Nam.",
  },
  {
    icon: "Tag",
    title: "Đăng ký Nhãn hiệu",
    description: "Đăng ký nhãn hiệu độc quyền trong nước và quốc tế, bảo vệ thương hiệu doanh nghiệp khỏi hàng nhái.",
  },
  {
    icon: "Barcode",
    title: "Đăng ký Mã vạch",
    description: "Đăng ký mã số mã vạch sản phẩm chuẩn GS1, phục vụ phân phối trong nước và xuất khẩu quốc tế.",
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "thuc-pham",
    title: "Bảo vệ chuỗi thực phẩm khỏi hàng giả",
    slug: "bao-ve-thuc-pham",
    client: "Tập đoàn Thực phẩm A",
    industry: "Thực phẩm & đồ uống",
    challenge:
      "Hàng giả tràn lan kênh phân phối truyền thống, thiệt hại ước tính hàng chục tỷ mỗi năm. Người tiêu dùng mất niềm tin vào sản phẩm chính hãng.",
    solution:
      "Triển khai tem Bộ Công An kết hợp QR Smartcheck cho toàn bộ dây chuyền. Tích hợp hệ thống cảnh báo tự động khi phát hiện quét mã bất thường.",
    result:
      "Giảm hơn 90% hàng giả sau 6 tháng. Niềm tin người tiêu dùng phục hồi rõ rệt. Doanh số tăng trưởng hai chữ số.",
    testimonial:
      "An Hà không chỉ cung cấp tem — họ đồng hành cùng chúng tôi từ tư vấn đến triển khai, hậu mãi chu đáo và chuyên nghiệp.",
    testimonialAuthor: "Giám đốc Điều hành",
    imageUrl: "/images/cases/food.webp",
  },
  {
    id: "duoc-pham",
    title: "Bảo mật dược phẩm đạt chuẩn quốc tế",
    slug: "bao-mat-duoc-pham",
    client: "Công ty Dược phẩm B",
    industry: "Dược phẩm",
    challenge:
      "Thuốc giả gây nguy hiểm tính mạng người bệnh và ảnh hưởng nghiêm trọng đến uy tín thương hiệu 20 năm xây dựng.",
    solution:
      "Tem Hologram 7 màu kết hợp QR Code, đáp ứng tiêu chuẩn GMP và yêu cầu chống giả dược phẩm của Bộ Y tế.",
    result:
      "Toàn bộ dây chuyền được bảo vệ. Vượt kiểm định của Bộ Y tế. Không có sự cố hàng giả trong 2 năm liên tiếp.",
    testimonial:
      "Giải pháp của An Hà giúp chúng tôi tự tin mở rộng thị trường xuất khẩu với tem bảo mật đạt tiêu chuẩn quốc tế.",
    testimonialAuthor: "Giám đốc Sản xuất",
    imageUrl: "/images/cases/pharma.webp",
  },
  {
    id: "thoi-trang",
    title: "Bảo vệ thương hiệu thời trang khỏi hàng nhái",
    slug: "chong-hang-nhai-thoi-trang",
    client: "Thương hiệu Thời trang C",
    industry: "May mặc & thời trang",
    challenge:
      "Hàng nhái chất lượng kém bán tràn lan với nhãn hiệu giả, phá vỡ định vị thương hiệu cao cấp và thiệt hại doanh thu.",
    solution:
      "Tem Hologram 7 màu tự phá hủy khi bóc, tích hợp QR tra cứu, áp dụng đồng loạt trên toàn bộ sản phẩm.",
    result:
      "Hàng nhái giảm trên 85%. Khách hàng trung thành tăng đáng kể. Thương hiệu được bảo vệ toàn diện.",
    imageUrl: "/images/cases/fashion.webp",
  },
];

export const STATS: Stat[] = [
  { value: "2008", label: "Năm thành lập", description: "Tiên phong trong ngành chống giả" },
  { value: "18+", label: "Năm kinh nghiệm", description: "Đối tác tin cậy của doanh nghiệp" },
  { value: "1000s", label: "Doanh nghiệp tin dùng", description: "Trên toàn quốc" },
  { value: "24/7", label: "Hỗ trợ tư vấn", description: "Miễn phí trong ngày làm việc" },
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
