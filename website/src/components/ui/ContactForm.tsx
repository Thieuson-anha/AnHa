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

const INDUSTRY_LABEL: Record<string, string> = Object.fromEntries(
  INDUSTRIES.map((i) => [i.value, i.label])
);
const QUANTITY_LABEL: Record<string, string> = Object.fromEntries(
  QUANTITIES.map((q) => [q.value, q.label])
);

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fieldErrors = validate(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setStatus("loading");

    const subject = encodeURIComponent(
      `[Yêu cầu tư vấn tem] ${form.companyName}`
    );
    const body = encodeURIComponent(
      [
        `Tên công ty: ${form.companyName}`,
        `Ngành hàng: ${INDUSTRY_LABEL[form.industry] ?? form.industry}`,
        `Số lượng tem/năm: ${QUANTITY_LABEL[form.estimatedQuantity] ?? form.estimatedQuantity}`,
        `Người liên hệ: ${form.contactName}`,
        `Điện thoại: ${form.phone}`,
        `Email: ${form.email}`,
        `Thông tin thêm: ${form.message || "Không có"}`,
      ].join("\n")
    );

    window.location.href = `mailto:Contact@temchonghanggia.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setStatus("success");
      setForm(EMPTY_FORM);
    }, 800);
  }

  if (status === "success") {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Đã mở ứng dụng email!
        </h3>
        <p className="text-gray-600 mb-1">
          Vui lòng gửi email đã được điền sẵn thông tin trong ứng dụng email của bạn.
        </p>
        <p className="text-gray-500 text-sm">
          Hoặc gọi trực tiếp:{" "}
          <a href="tel:0936233454" className="text-navy-800 font-semibold">
            093 6233 454
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
            placeholder="0901 234 567"
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

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full justify-center text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Đang xử lý...
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
