# Quotation Management System (ระบบจัดการใบเสนอราคา)

Web application สำหรับจัดการใบเสนอราคา พัฒนาด้วย Node.js, Express.js และ SQLite

## Features

- ✅ สร้างใบเสนอราคา (Create Quotation)
- ✅ ดูรายการใบเสนอราคาทั้งหมด (List Quotations)
- ✅ ดูรายละเอียดใบเสนอราคา (View Quotation Details)
- ✅ Export ใบเสนอราคาเป็น PDF (Export to PDF)
- ✅ ลบใบเสนอราคา (Delete Quotation)

## Project Structure

```
web/
├── index.js                    # Main Express app entry point
├── db.js                       # SQLite database setup & helpers
├── package.json                # Dependencies & scripts
├── routes/
│   └── quotations.js           # Quotation routes (CRUD + PDF)
├── services/
│   └── pdfGenerator.js         # PDF generation service
└── views/
    └── quotations/
        ├── index.ejs           # List all quotations
        ├── new.ejs             # Create new quotation form
        └── show.ejs            # View quotation details
```

## Technologies

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express.js | Web framework |
| SQLite | Database |
| EJS | Template engine |
| PDFKit | PDF generation |

## Installation

```bash
cd web
npm install
```

## Running the Application

```bash
# Production
npm start

# Development (with watch mode)
npm run dev
```

Server จะรันที่ http://localhost:3000

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/quotations` | List all quotations |
| GET | `/quotations/new` | Create quotation form |
| POST | `/quotations` | Save new quotation |
| GET | `/quotations/:id` | View quotation details |
| GET | `/quotations/:id/pdf` | Download PDF |
| DELETE | `/quotations/:id` | Delete quotation |

## Database Schema

### quotations
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key |
| volume_no | TEXT | เล่มที่ |
| document_no | TEXT | เลขที่เอกสาร |
| date | TEXT | วันที่ |
| seller_name | TEXT | ชื่อผู้ขาย |
| seller_address | TEXT | ที่อยู่ผู้ขาย |
| customer_name | TEXT | ชื่อลูกค้า |
| customer_address | TEXT | ที่อยู่ลูกค้า |
| total_amount | REAL | ยอดรวม |
| amount_in_words | TEXT | จำนวนเงินเป็นตัวอักษร |
| created_at | DATETIME | วันที่สร้าง |

### quotation_items
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key |
| quotation_id | INTEGER | Foreign key |
| item_number | INTEGER | ลำดับที่ |
| description | TEXT | รายการ |
| quantity | REAL | จำนวน |
| unit | TEXT | หน่วย |
| price_per_unit | REAL | ราคาต่อหน่วย |
| total | REAL | รวมเงิน |

## User Flow

```mermaid
flowchart TD
    A[User สร้างใบเสนอราคา] --> B[ระบบบันทึกข้อมูลลง Database]
    B --> C[ผู้ใช้ดูรายละเอียดใบเสนอราคา]
    C --> D[Export ใบเสนอราคาเป็น PDF]
```

## UI/UX Theme (Koice-Inspired Design)

ปรับปรุง Theme และ Layout ของ Web Application โดยอ้างอิงจาก [Koice Invoice Template](https://harnishdesign.net/demo/html/koice/index-2.html)

### Design Features

| Feature | Description |
|---------|-------------|
| **Font** | Poppins (Google Fonts) |
| **Color Scheme** | Bootstrap Blue Primary (#0d6efd) with gradient headers |
| **Layout** | Card-based design with subtle shadows |
| **Navigation** | Fixed navbar with gradient background |
| **Tables** | Styled headers with gradient, hover effects |
| **Forms** | Modern inputs with focus states |
| **Print** | Print-optimized styles (hides navbar/footer) |
| **Responsive** | Mobile-friendly breakpoints |

### New Files Created

```
web/
├── public/
│   └── css/
│       └── style.css           # Koice-inspired stylesheet
└── views/
    └── partials/
        ├── header.ejs          # Shared navigation header
        └── footer.ejs          # Shared footer component
```

### Updated Views

| File | Changes |
|------|---------|
| `views/quotations/index.ejs` | Redesigned list with styled table, empty state, action buttons |
| `views/quotations/new.ejs` | Enhanced form with sections, gradient total display |
| `views/quotations/show.ejs` | Invoice-style view with two-column layout, print button |

### CSS Architecture

```css
/* CSS Custom Properties */
:root {
    --primary-color: #0d6efd;
    --success-color: #198754;
    --danger-color: #dc3545;
    --body-bg: #f5f5f5;
    /* ... */
}
```

### Key UI Components

1. **Navbar** - Gradient header with brand logo และ navigation links
2. **Page Header** - Title พร้อม action buttons
3. **Cards** - Container สำหรับ content พร้อม shadow
4. **Tables** - Gradient header, hover effects, responsive
5. **Forms** - Styled inputs with focus states
6. **Invoice View** - Professional layout matching Koice template
   - Info grid (Volume No., Document No., Date)
   - Two-column seller/customer boxes
   - Styled items table with grand total
   - Thank you footer
   - Print & Download buttons

