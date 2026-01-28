# Product Context: Quotation Management System

## Why This Project Exists
This system provides a simple, local solution for creating and managing quotations/invoices. It allows businesses to:
- Digitize their quotation process
- Generate professional PDF documents
- Keep track of all quotations in one place

## Problems It Solves
1. **Manual Quotation Creation** - Replaces manual/paper-based quotation processes
2. **Document Consistency** - Ensures all quotations follow the same format
3. **Record Keeping** - Maintains a searchable database of all quotations
4. **Professional Output** - Generates properly formatted PDF invoices

## How It Should Work

### Quotation Creation Flow
1. User navigates to "New Quotation" page
2. Fills in header information:
   - เล่มที่ (Volume No.)
   - เลขที่เอกสาร (Document No.)
   - วันที่ (Date)
   - ข้อมูลผู้ขาย (Seller Info)
   - ข้อมูลลูกค้า (Customer Info)
3. Adds line items dynamically:
   - รายการ (Description)
   - จำนวน (Quantity)
   - หน่วย (Unit)
   - ราคาต่อหน่วย (Price per unit)
4. System calculates totals automatically
5. User enters amount in words
6. Submit to save

### Viewing & Export Flow
1. User sees list of all quotations
2. Click to view details
3. Option to download as PDF
4. Option to delete

## User Experience Goals
- **Simple Interface** - Minimal learning curve
- **Quick Data Entry** - Efficient form with auto-calculations
- **Professional Output** - Clean, formatted PDF documents
- **Responsive Design** - Works on different screen sizes

## Target Users
- Small businesses
- Freelancers
- Anyone needing to create simple quotations/invoices
