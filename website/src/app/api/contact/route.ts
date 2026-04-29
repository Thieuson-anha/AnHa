import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { prisma } from "@/lib/db";
import { z } from "zod";

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

async function sendTelegram(data: z.infer<typeof contactSchema>) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const message =
    `🔔 <b>Lead mới từ website An Hà</b>\n\n` +
    `🏢 <b>Công ty:</b> ${data.companyName}\n` +
    `🏭 <b>Ngành:</b> ${INDUSTRY_LABEL[data.industry] ?? data.industry}\n` +
    `📦 <b>Số lượng:</b> ${QUANTITY_LABEL[data.estimatedQuantity] ?? data.estimatedQuantity}\n` +
    `👤 <b>Liên hệ:</b> ${data.contactName}\n` +
    `📞 <b>Điện thoại:</b> ${data.phone}\n` +
    `📧 <b>Email:</b> ${data.email}\n` +
    `💬 <b>Ghi chú:</b> ${data.message || "Không có"}`;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "HTML" }),
  });
}

async function sendEmail(data: z.infer<typeof contactSchema>) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  const html = `
    <h2>Lead mới từ website An Hà</h2>
    <table cellpadding="8" style="border-collapse:collapse;width:100%;max-width:500px">
      <tr><td><b>Công ty</b></td><td>${data.companyName}</td></tr>
      <tr><td><b>Ngành hàng</b></td><td>${INDUSTRY_LABEL[data.industry] ?? data.industry}</td></tr>
      <tr><td><b>Số lượng tem</b></td><td>${QUANTITY_LABEL[data.estimatedQuantity] ?? data.estimatedQuantity}</td></tr>
      <tr><td><b>Người liên hệ</b></td><td>${data.contactName}</td></tr>
      <tr><td><b>Điện thoại</b></td><td>${data.phone}</td></tr>
      <tr><td><b>Email</b></td><td>${data.email}</td></tr>
      <tr><td><b>Ghi chú</b></td><td>${data.message || "Không có"}</td></tr>
    </table>
  `;

  await resend.emails.send({
    from: "An Hà Website <noreply@anha.vn>",
    to: process.env.CONTACT_EMAIL ?? "Contact@temchonghanggia.com",
    reply_to: data.email,
    subject: `[Lead mới] ${data.companyName} — ${INDUSTRY_LABEL[data.industry] ?? data.industry}`,
    html,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = contactSchema.parse(body);

    // Save to DB + send notifications in parallel, don't fail if any errors
    await Promise.allSettled([
      prisma.contact.create({ data }).catch(() => null),
      sendTelegram(data),
      sendEmail(data),
    ]);

    return NextResponse.json(
      { success: true, message: "Chúng tôi sẽ liên hệ trong 24h." },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      for (const issue of err.issues) {
        const field = issue.path[0] as string;
        if (field) errors[field] = issue.message;
      }
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    console.error("[api/contact]", err);
    return NextResponse.json(
      { success: false, message: "Lỗi máy chủ, vui lòng thử lại." },
      { status: 500 }
    );
  }
}
