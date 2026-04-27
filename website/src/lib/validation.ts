import { z } from "zod";

export const contactSchema = z.object({
  companyName: z.string().min(2, "Tên công ty tối thiểu 2 ký tự").max(100),
  industry: z.enum(
    ["thuc-pham", "duoc-pham", "my-pham", "dien-tu", "may-mac", "khac"],
    { errorMap: () => ({ message: "Vui lòng chọn ngành hàng" }) }
  ),
  estimatedQuantity: z.enum(
    ["duoi-10000", "10000-50000", "50000-200000", "tren-200000"],
    { errorMap: () => ({ message: "Vui lòng chọn số lượng" }) }
  ),
  contactName: z.string().min(2, "Tên liên hệ tối thiểu 2 ký tự").max(100),
  email: z.string().email("Email không hợp lệ"),
  phone: z
    .string()
    .regex(/^(0|\+84)[0-9]{9}$/, "Số điện thoại VN không hợp lệ"),
  message: z.string().max(1000).optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
});

export type ContactInput = z.infer<typeof contactSchema>;
