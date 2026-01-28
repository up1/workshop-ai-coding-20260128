# Active Context: Quotation Management System

## Current Work Focus
- Memory bank initialization completed
- Project is in a functional state with all core features implemented

## Recent Changes
- Memory bank structure created with all core documentation files

## Current State
The application appears to be fully functional with:
- ✅ Database setup and initialization
- ✅ Quotation CRUD operations
- ✅ PDF generation
- ✅ EJS view templates
- ✅ Basic styling

## Next Steps (Potential Improvements)
1. **Testing** - Add unit tests using Vitest
2. **Thai Font Support** - Add Thai font for PDF generation
3. **Input Validation** - Add server-side and client-side validation
4. **Error Handling** - Improve error messages and user feedback
5. **Edit Functionality** - Add ability to edit existing quotations

## Active Decisions and Considerations

### Architecture Decisions
- Using CommonJS modules (`require`) instead of ES modules
- File-based SQLite for simplicity
- Server-side rendering with EJS templates
- No client-side framework (vanilla JS)

### Data Flow
1. Form submission → JSON items string → Server parsing
2. Database → Route handler → EJS template → HTML
3. Database → PDF generator → Buffer → Download

## Important Patterns and Preferences

### Code Style
- Async/await for asynchronous operations
- Promise wrappers for callback-based APIs
- Try/catch blocks for error handling
- RESTful route naming

### File Organization
- Routes in `/routes` directory
- Services in `/services` directory
- Views in `/views` directory with subdirectories per resource
- Partials for shared template components

## Learnings and Project Insights

### What Works Well
- SQLite for simple local storage
- EJS for straightforward server-side rendering
- PDFKit for programmatic PDF generation
- Express 5.x async error handling

### Potential Pain Points
- Thai character support in PDFs
- No authentication system
- Manual cascade delete for related records
- Items stored as JSON string in forms

## Files Most Likely to Change

| File | Reason |
|------|--------|
| `routes/quotations.js` | New features, validation |
| `views/quotations/new.ejs` | Form improvements |
| `services/pdfGenerator.js` | PDF formatting, Thai support |
| `db.js` | Schema changes, new queries |
