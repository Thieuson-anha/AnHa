# API Specification - An Hà
> Tác giả: PM + Backend Agent | Sprint 1

## Base URL
```
Development: http://localhost:3000/api
Production:  https://anha.vn/api
```

## Endpoints

### POST /api/contact
Nhận form liên hệ B2B từ khách hàng.

**Request Body:**
```json
{
  "companyName": "Công ty TNHH ABC",
  "industry": "thuc-pham",
  "estimatedQuantity": "10000-50000",
  "contactName": "Nguyễn Văn A",
  "email": "contact@abc.com",
  "phone": "0901234567",
  "message": "Chúng tôi cần tem cho sản phẩm nước uống..."
}
```

**Validation (Zod):**
- companyName: string, min 2, max 100
- industry: enum [thuc-pham, duoc-pham, my-pham, dien-tu, may-mac, khac]
- estimatedQuantity: enum [duoi-10000, 10000-50000, 50000-200000, tren-200000]
- contactName: string, min 2, max 100
- email: email format
- phone: VN phone (regex /^(0|\+84)[0-9]{9}$/)
- message: string, optional, max 1000

**Response 201:**
```json
{ "success": true, "message": "Chúng tôi sẽ liên hệ trong 24h." }
```

**Response 400:**
```json
{ "success": false, "errors": { "email": "Email không hợp lệ" } }
```

---

### POST /api/newsletter
Đăng ký nhận tin.

**Request:** `{ "email": "user@example.com" }`
**Response 201:** `{ "success": true }`
**Response 409:** `{ "success": false, "message": "Email đã đăng ký" }`

---

### GET /api/products
Danh sách giải pháp tem.

**Response 200:**
```json
{
  "data": [
    {
      "id": "tem-qr",
      "name": "Tem QR Code",
      "description": "...",
      "features": ["Chống sao chép", "Tra cứu online", "Tích hợp app"],
      "useCases": ["Thực phẩm", "Dược phẩm"],
      "imageUrl": "/images/products/tem-qr.webp"
    }
  ]
}
```

---

### GET /api/cases
Danh sách case studies.

**Query params:** `?page=1&limit=6&industry=thuc-pham`

**Response 200:**
```json
{
  "data": [...],
  "pagination": { "page": 1, "limit": 6, "total": 12 }
}
```

---

### GET /api/cases/[slug]
Chi tiết một case study.

**Response 200:** Full CaseStudy object
**Response 404:** `{ "error": "Không tìm thấy" }`

## Error Codes
| Code | Meaning |
|------|---------|
| 400 | Validation error |
| 404 | Not found |
| 409 | Conflict (duplicate) |
| 429 | Rate limit exceeded |
| 500 | Server error |

## Rate Limiting
- /api/contact: 5 requests / IP / hour
- /api/newsletter: 3 requests / IP / hour
- /api/products, /api/cases: 100 requests / IP / minute
