"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { INDUSTRIES, QUANTITIES } from "@/lib/data";
import type { ContactFormData } from "@/types";
import { CheckCircle, Loader2 } from "lucide-react";

type FieldErrors = Partial<Record<keyof ContactFormData, string>>;

const EMPTY_FORM: ContactFormData = {
  companyName: "",
  industry: "",
  estimatedQuantity: "",
  contactName: "",
  email: "",
  phone: "",
  message: "",
};

const PHONE_RE = /^(0|\+84)[0-9]{9}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INDUSTRY_LABEL: Record<string, string> = {
  "thuc-pham": "Thực phẩm & đồ uống",
  "duoc-pham": "Dược phẩm",
  "my-pham": "Mỹ phẩm & làm đẹp",
  "dien-tu": "Điện tử & công nghệ",
  "may-mac": "May mặc & thời trang",
  "khac": "Ngành khác",
};

const QUANTITY_LABEL: Record<string, string> = {
  "duoi-10000": "Dưới 10,000 tem/năm",
  "10000-50000": "10,000 – 50,000 tem/năm",
  "50000-200000": "50,000 – 200,000 tem/năm",
  "tren-200000": "Trên 200,000 tem/năm",
};

// Client-side Telegram fallback (used when API route unavailable e.g. static hosting)
const TG_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
const TG_CHAT = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

async function sendTelegramClientSide(form: ContactFormData): Promise<boolean> {
  if (!TG_TOKEN || !TG_CHAT) return false;
  try {
    const message =
      `🔔 <b>Lead mới từ website An Hà</b>\n\n` +
      `🏢 <b>Công ty:</b> ${form.companyName}\n` +
      `🏭 <b>Ngành:</b> ${INDUSTRY_LABEL[form.industry] ?? form.industry}\n` +
      `📦 <b>Số lượng:</b> ${QUANTITY_LABEL[form.estimatedQuantity] ?? form.estimatedQuantity}\n` +
      `👤 <b>Liên hệ:</b> ${form.contactName}\n` +
      `📞 <b>Điện thoại:</b> ${form.phone}\n` +
      `📧 <b>Email:</b> ${form.email}\n` +
      `💬 <b>Ghi chú:</b> ${form.message || "Không có"}`;

    const res = await fetch(
      `https://api.telegram.org/bot${TG_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: TG_CHAT, text: message, parse_mode: "HTML" }),
      }
    );
    return res.ok;
  } catch {
    return false;
  }
}

function validate(form: ContactFormData): FieldErrors {
  const errs: FieldErrors = {};
  if (!form.companyName.trim()) errs.companyName = "Vui lòng nhập tên công ty";
  if (!form.industry) errs.industry = "Vui lòng chọn ngành hàng";
  if (!form.estimatedQuantity) errs.estimatedQuantity = "Vui lòng chọn số lượng";
  if (!form.contactName.trim()) errs.contactName = "Vui lòng nhập tên người liên hệ";
  if (!PHONE_RE.test(form.phone.replace(/\s/g, "")))
    errs.phone = "Số điện thoại không hợp lệ (VD: 0901234567)";
  if (!EMAIL_RE.test(form.email)) errs.email = "Email không hợp lệ";
  return errs;
}

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fieldErrors = validate(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setStatus("loading");

    // Normalize phone (strip spaces) before sending
    const payload = { ...form, phone: form.phone.replace(/\s/g, "") };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("success");
        setForm(EMPTY_FORM);
        return;
      }

      // Server returned error with field validation details
      const data = await res.json().catch(() => ({}));
      if (data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        return;
      }
    } catch {
      // API unavailable (static hosting) — use client-side Telegram fallback
      const sent = await sendTelegramClientSide(payload);
      if (sent) {
        setStatus("success");
        setForm(EMPTY_FORM);
        return;
      }
    }

    setStatus("error");
  }

  if (status === "success") {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Đã nhận yêu cầu của bạn!
        </h3>
        <p className="text-gray-600 mb-1">
          Chuyên gia An Hà sẽ liên hệ với bạn trong vòng 24 giờ làm việc.
        </p>
        <p className="text-gray-500 text-sm">
          Cần hỗ trợ ngay?{" "}
          <a href="tel:0936233454" className="text-navy-800 font-semibold">
            Gọi 093 6233 454
          </a>
        </p>
        <button
          className="mt-6 text-navy-800 font-semibold text-sm underline"
          onClick={() => setStatus("idle")}
        >
          Gửi yêu cầu khác
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="Tên công ty *" error={errors.companyName}>
          <input
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            placeholder="Công ty TNHH ABC"
            className={cn("form-input", errors.companyName && "border-red-400")}
          />
        </Field>

        <Field label="Ngành hàng *" error={errors.industry}>
          <select
            name="industry"
            value={form.industry}
            onChange={handleChange}
            className={cn("form-input", errors.industry && "border-red-400")}
          >
            <option value="">Chọn ngành hàng</option>
            {INDUSTRIES.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Số lượng tem ước tính *" error={errors.estimatedQuantity}>
        <select
          name="estimatedQuantity"
          value={form.estimatedQuantity}
          onChange={handleChange}
          className={cn("form-input", errors.estimatedQuantity && "border-red-400")}
        >
          <option value="">Chọn số lượng/năm</option>
          {QUANTITIES.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="Người liên hệ *" error={errors.contactName}>
          <input
            name="contactName"
            value={form.contactName}
            onChange={handleChange}
            placeholder="Nguyễn Văn A"
            className={cn("form-input", errors.contactName && "border-red-400")}
          />
        </Field>

        <Field label="Số điện thoại *" error={errors.phone}>
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="0901234567"
            className={cn("form-input", errors.phone && "border-red-400")}
          />
        </Field>
      </div>

      <Field label="Email doanh nghiệp *" error={errors.email}>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="contact@congty.com"
          className={cn("form-input", errors.email && "border-red-400")}
        />
      </Field>

      <Field label="Thông tin thêm" error={errors.message}>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Mô tả sản phẩm cần bảo vệ, yêu cầu đặc biệt..."
          rows={4}
          className="form-input resize-none"
        />
      </Field>

      {status === "error" && (
        <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          Có lỗi xảy ra. Vui lòng thử lại hoặc gọi{" "}
          <a href="tel:0936233454" className="font-semibold underline">
            093 6233 454
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full justify-center text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Đang gửi...
          </>
        ) : (
          "Gửi yêu cầu tư vấn"
        )}
      </button>

      <p className="text-gray-500 text-xs text-center">
        Thông tin của bạn được bảo mật tuyệt đối. Chúng tôi không chia sẻ với bên thứ ba.
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="form-label">{label}</label>
      {children}
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}
