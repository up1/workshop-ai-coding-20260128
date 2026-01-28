# System Patterns: Quotation Management System

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Client (Browser)                      │
│                    EJS Templates                         │
└─────────────────────┬───────────────────────────────────┘
                      │ HTTP
┌─────────────────────▼───────────────────────────────────┐
│                  Express.js Server                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   Routes    │  │   Views     │  │  Services   │     │
│  │ quotations  │  │    EJS      │  │ pdfGenerator│     │
│  └──────┬──────┘  └─────────────┘  └─────────────┘     │
│         │                                               │
│  ┌──────▼──────────────────────────────────────┐       │
│  │              Database Layer (db.js)          │       │
│  │         Promise wrappers for sqlite3         │       │
│  └──────────────────┬───────────────────────────┘       │
└─────────────────────┼───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│                  SQLite Database                         │
│              quotations.db (file-based)                  │
└─────────────────────────────────────────────────────────┘
```

## Key Technical Decisions

### 1. MVC-like Structure
- **Routes** (`routes/quotations.js`) - Handle HTTP requests and responses
- **Views** (`views/quotations/`) - EJS templates for rendering HTML
- **Services** (`services/pdfGenerator.js`) - Business logic for PDF generation
- **Database** (`db.js`) - Data access layer

### 2. Database Access Pattern
- Promise wrappers around sqlite3 callbacks
- Three helper functions: `runAsync`, `allAsync`, `getAsync`
- Async/await throughout the codebase

### 3. File-Based Database
- SQLite for simplicity and portability
- Database file: `quotations.db`
- No external database server required

## Design Patterns in Use

### Repository Pattern (Simplified)
Database queries encapsulated in `db.js`:
```javascript
runAsync(sql, params)  // INSERT, UPDATE, DELETE
allAsync(sql, params)  // SELECT multiple rows
getAsync(sql, params)  // SELECT single row
```

### Service Layer Pattern
PDF generation isolated in `services/pdfGenerator.js`:
- Takes quotation data and items
- Returns PDF buffer
- Independent of HTTP concerns

### Template Pattern
EJS views with partials:
- `partials/header.ejs` - Common header
- `partials/footer.ejs` - Common footer
- Individual page templates extend these

## Component Relationships

### Route → Database
```
routes/quotations.js
  └── imports → db.js (runAsync, allAsync, getAsync)
```

### Route → Service → Response
```
GET /quotations/:id/pdf
  └── getAsync() → quotation data
  └── allAsync() → items data
  └── generatePDF() → PDF buffer
  └── res.send() → HTTP response
```

### Database Schema Relationship
```
quotations (1) ──────< (many) quotation_items
     │                        │
     └── id ←─────────────── quotation_id (FK)
```

## Critical Implementation Paths

### Creating a Quotation
1. POST `/quotations` receives form data
2. Parse items from JSON string
3. Calculate total amount
4. INSERT into quotations table
5. INSERT each item into quotation_items
6. Redirect to show page

### Generating PDF
1. GET `/quotations/:id/pdf`
2. Fetch quotation from database
3. Fetch associated items
4. Call `generatePDF(quotation, items)`
5. Set headers and send PDF buffer

### Deleting a Quotation
1. DELETE `/quotations/:id`
2. Delete items first (child records)
3. Delete quotation (parent record)
4. Return JSON success response
