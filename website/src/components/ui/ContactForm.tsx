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
    setStatus("loading");
    setErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
          setStatus("idle");
        } else {
          setStatus("error");
        }
        return;
      }

      setStatus("success");
      setForm(EMPTY_FORM);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Gửi thành công!
        </h3>
        <p className="text-gray-600">
          Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ làm việc.
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
            required
          />
        </Field>

        <Field label="Ngành hàng *" error={errors.industry}>
          <select
            name="industry"
            value={form.industry}
            onChange={handleChange}
            className={cn("form-input", errors.industry && "border-red-400")}
            required
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
          required
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
            required
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
            required
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
          required
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
          Có lỗi xảy ra. Vui lòng thử lại hoặc gọi hotline 0901 234 567.
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
