# Project Brief: Quotation Management System (ระบบจัดการใบเสนอราคา)

## Overview
A web application for managing quotations/invoices, developed with Node.js, Express.js, and SQLite.

## Core Requirements

### Functional Requirements
1. **Create Quotation** - Users can create new quotations with seller/customer info and line items
2. **List Quotations** - View all quotations in a list format
3. **View Quotation Details** - See full details of a specific quotation
4. **Export to PDF** - Generate PDF documents from quotations
5. **Delete Quotation** - Remove quotations from the system

### User Flow
1. User creates a new quotation with:
   - Volume number and document number
   - Date
   - Seller information (name, address)
   - Customer information (name, address)
   - Line items (description, quantity, unit, price per unit)
   - Amount in words
2. System saves data to SQLite database
3. User can view quotation details
4. User can export quotation as PDF

## Project Scope
- Single-user web application
- Local SQLite database storage
- Thai language support for content
- PDF export with formatted invoice layout

## Success Criteria
- All CRUD operations working for quotations
- PDF generation with proper formatting
- Clean, usable web interface
- Data persistence in SQLite

## Out of Scope
- User authentication
- Multi-user support
- Cloud deployment
- Email functionality
- Advanced reporting
