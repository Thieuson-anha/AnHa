"use client";

import { useState, useTransition } from "react";
import { saveProduct, saveCaseStudy } from "./_actions";

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  features: string[];
  useCases: string[];
  icon: string;
  isActive?: boolean;
};

type CaseStudy = {
  id: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  result: string;
  testimonial?: string | null;
  testimonialAuthor?: string | null;
  isPublished?: boolean;
};

type Tab = "products" | "cases";

export default function ContentClient({
  products,
  cases,
  hasDb,
}: {
  products: Product[];
  cases: CaseStudy[];
  hasDb: boolean;
}) {
  const [tab, setTab] = useState<Tab>("products");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCase, setEditingCase] = useState<CaseStudy | null>(null);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function handleSaveProduct(p: Product) {
    if (!hasDb) return;
    startTransition(async () => {
      await saveProduct(p);
      setSaved(true);
      setEditingProduct(null);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  function handleSaveCase(c: CaseStudy) {
    if (!hasDb) return;
    startTransition(async () => {
      await saveCaseStudy(c);
      setSaved(true);
      setEditingCase(null);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  return (
    <>
      {saved && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg z-50">
          ✓ Đã lưu thành công
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit mb-6">
        {(["products", "cases"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t ? "bg-white text-navy-800 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t === "products" ? `Sản phẩm (${products.length})` : `Case Studies (${cases.length})`}
          </button>
        ))}
      </div>

      {/* Products tab */}
      {tab === "products" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{p.name}</h3>
                  <p className="text-gray-400 text-xs mt-0.5">/{p.slug}</p>
                </div>
                {p.isActive !== undefined && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {p.isActive ? "Hiện" : "Ẩn"}
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-xs leading-relaxed mb-3 line-clamp-2">{p.description}</p>
              <div className="flex flex-wrap gap-1 mb-4">
                {p.useCases.slice(0, 2).map((uc) => (
                  <span key={uc} className="bg-navy-50 text-navy-700 text-xs px-2 py-0.5 rounded-full">{uc}</span>
                ))}
              </div>
              <button
                onClick={() => setEditingProduct(p)}
                disabled={!hasDb}
                className="w-full text-xs font-medium border border-navy-200 text-navy-700 hover:bg-navy-50 py-1.5 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {hasDb ? "Chỉnh sửa" : "Cần kết nối DB"}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Case Studies tab */}
      {tab === "cases" && (
        <div className="space-y-3">
          {cases.map((c) => (
            <div key={c.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0 mr-4">
                  <h3 className="font-semibold text-gray-900">{c.title}</h3>
                  <p className="text-gray-500 text-sm">{c.client} · {c.industry}</p>
                  <p className="text-gray-600 text-xs mt-2 line-clamp-1">{c.result}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {c.isPublished !== undefined && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.isPublished ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {c.isPublished ? "Xuất bản" : "Ẩn"}
                    </span>
                  )}
                  <button
                    onClick={() => setEditingCase(c)}
                    disabled={!hasDb}
                    className="text-xs font-medium border border-navy-200 text-navy-700 hover:bg-navy-50 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {hasDb ? "Chỉnh sửa" : "Cần DB"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product edit modal */}
      {editingProduct && (
        <ProductEditModal
          product={editingProduct}
          onSave={handleSaveProduct}
          onClose={() => setEditingProduct(null)}
          isPending={isPending}
        />
      )}

      {/* Case study edit modal */}
      {editingCase && (
        <CaseEditModal
          caseStudy={editingCase}
          onSave={handleSaveCase}
          onClose={() => setEditingCase(null)}
          isPending={isPending}
        />
      )}
    </>
  );
}

function ProductEditModal({
  product,
  onSave,
  onClose,
  isPending,
}: {
  product: Product;
  onSave: (p: Product) => void;
  onClose: () => void;
  isPending: boolean;
}) {
  const [form, setForm] = useState({
    ...product,
    featuresText: product.features.join("\n"),
    useCasesText: product.useCases.join("\n"),
  });

  function handleSave() {
    onSave({
      ...form,
      features: form.featuresText.split("\n").map((s) => s.trim()).filter(Boolean),
      useCases: form.useCasesText.split("\n").map((s) => s.trim()).filter(Boolean),
    });
  }

  return (
    <Modal title={`Sửa: ${product.name}`} onClose={onClose}>
      <div className="space-y-4">
        <Field label="Tên sản phẩm">
          <input className={INPUT} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </Field>
        <Field label="Mô tả">
          <textarea className={`${INPUT} resize-none`} rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </Field>
        <Field label="Tính năng (mỗi dòng 1 tính năng)">
          <textarea className={`${INPUT} resize-none`} rows={5} value={form.featuresText} onChange={(e) => setForm({ ...form, featuresText: e.target.value })} />
        </Field>
        <Field label="Ngành hàng phù hợp (mỗi dòng 1 ngành)">
          <textarea className={`${INPUT} resize-none`} rows={3} value={form.useCasesText} onChange={(e) => setForm({ ...form, useCasesText: e.target.value })} />
        </Field>
      </div>
      <ModalActions onClose={onClose} onSave={handleSave} isPending={isPending} />
    </Modal>
  );
}

function CaseEditModal({
  caseStudy,
  onSave,
  onClose,
  isPending,
}: {
  caseStudy: CaseStudy;
  onSave: (c: CaseStudy) => void;
  onClose: () => void;
  isPending: boolean;
}) {
  const [form, setForm] = useState({ ...caseStudy });
  const f = (key: keyof typeof form) => ({
    value: (form[key] ?? "") as string,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [key]: e.target.value }),
  });

  return (
    <Modal title={`Sửa: ${caseStudy.title}`} onClose={onClose}>
      <div className="space-y-4">
        <Field label="Tiêu đề"><input className={INPUT} {...f("title")} /></Field>
        <Field label="Khách hàng"><input className={INPUT} {...f("client")} /></Field>
        <Field label="Ngành"><input className={INPUT} {...f("industry")} /></Field>
        <Field label="Thách thức">
          <textarea className={`${INPUT} resize-none`} rows={3} {...f("challenge")} />
        </Field>
        <Field label="Giải pháp">
          <textarea className={`${INPUT} resize-none`} rows={3} {...f("solution")} />
        </Field>
        <Field label="Kết quả">
          <textarea className={`${INPUT} resize-none`} rows={2} {...f("result")} />
        </Field>
        <Field label="Testimonial (tùy chọn)">
          <textarea className={`${INPUT} resize-none`} rows={2} {...f("testimonial")} />
        </Field>
        <Field label="Tác giả testimonial (tùy chọn)">
          <input className={INPUT} {...f("testimonialAuthor")} />
        </Field>
      </div>
      <ModalActions onClose={onClose} onSave={() => onSave(form)} isPending={isPending} />
    </Modal>
  );
}

const INPUT = "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy-400";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl">
          <h2 className="font-bold text-gray-900 text-sm">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function ModalActions({ onClose, onSave, isPending }: { onClose: () => void; onSave: () => void; isPending: boolean }) {
  return (
    <div className="flex gap-3 mt-5 pt-4 border-t border-gray-100">
      <button onClick={onClose} className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">
        Hủy
      </button>
      <button
        onClick={onSave}
        disabled={isPending}
        className="flex-1 bg-navy-800 text-white py-2 rounded-lg text-sm font-semibold hover:bg-navy-700 transition-colors disabled:opacity-50"
      >
        {isPending ? "Đang lưu..." : "Lưu thay đổi"}
      </button>
    </div>
  );
}
