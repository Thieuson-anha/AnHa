# An Hà - Website Tem Chống Hàng Giả (B2B)

## Tổng quan dự án
Website B2B giới thiệu giải pháp tem chống hàng giả của công ty An Hà.
Đối tượng: Doanh nghiệp sản xuất, phân phối cần bảo vệ thương hiệu.

## Team AI Agent

| Role | File | Trách nhiệm |
|------|------|-------------|
| PM | agents/pm.md | Kiến trúc, kế hoạch, điều phối |
| Backend | agents/backend.md | API, DB, server logic |
| Frontend | agents/frontend.md | UI components, pages |
| Designer | agents/designer.md | Design system, UX/UI |
| Tester | agents/tester.md | Test cases, QA |

## Tech Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes + Prisma ORM
- **Database**: PostgreSQL
- **Email**: Resend (contact form)
- **Deployment**: Vercel

## Cấu trúc thư mục
```
/agents/          - Định nghĩa từng AI agent
/docs/            - Tài liệu do PM & team tạo
/orchestrator/    - Script điều phối multi-agent
/website/         - Source code website
```

## Chạy orchestrator
```bash
cd orchestrator
pip install anthropic
python main.py
```

## Chạy website
```bash
cd website
npm install
npm run dev
```
