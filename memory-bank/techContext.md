# Tech Context: Quotation Management System

## Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | - | Runtime environment |
| Express.js | 5.2.1 | Web framework |
| SQLite3 | 5.1.7 | Database |
| EJS | 3.1.10 | Template engine |
| PDFKit | 0.15.0 | PDF generation |
| Vitest | 2.1.8 | Testing framework (dev) |

## Development Setup

### Prerequisites
- Node.js installed
- npm package manager

### Installation
```bash
cd web
npm install
```

### Running the Application
```bash
# Production
npm start

# Development (with watch mode)
npm run dev
```

### Running Tests
```bash
npm test
```

## Project Structure

```
web/
├── index.js                 # Entry point, Express app setup
├── db.js                    # Database setup and helpers
├── package.json             # Dependencies and scripts
├── quotations.db            # SQLite database file (generated)
├── routes/
│   └── quotations.js        # Quotation CRUD routes
├── services/
│   └── pdfGenerator.js      # PDF generation service
├── public/
│   └── css/
│       └── style.css        # Custom styles
└── views/
    ├── partials/
    │   ├── header.ejs       # Common header partial
    │   └── footer.ejs       # Common footer partial
    └── quotations/
        ├── index.ejs        # List quotations
        ├── new.ejs          # Create quotation form
        └── show.ejs         # View quotation details
```

## Technical Constraints

### SQLite Limitations
- File-based, single-writer at a time
- Not suitable for high-concurrency scenarios
- Good for single-user local applications

### PDF Generation
- PDFKit doesn't support Thai fonts by default
- Would need custom font embedding for full Thai text support
- Current implementation uses English labels

### Express 5.x
- Using latest Express version
- Some API differences from Express 4.x

## Dependencies Explained

### Production Dependencies
- **express** - Web framework for routing, middleware, HTTP handling
- **ejs** - Embedded JavaScript templates for server-side rendering
- **sqlite3** - SQLite database driver for Node.js
- **pdfkit** - PDF document generation library

### Development Dependencies
- **vitest** - Fast, modern testing framework

## Configuration

### Port Configuration
```javascript
const PORT = process.env.PORT || 3000;
```
- Default port: 3000
- Can be overridden via `PORT` environment variable

### Database Path
```javascript
const dbPath = path.join(__dirname, 'quotations.db');
```
- Database file stored in web/ directory
- Auto-created on first run

## Tool Usage Patterns

### Database Initialization
- `initDatabase()` called on app startup
- Creates tables if they don't exist
- Uses `IF NOT EXISTS` for idempotency

### Async/Await Pattern
All database operations use Promise wrappers:
```javascript
const quotation = await getAsync('SELECT * FROM quotations WHERE id = ?', [id]);
```

### Form Data Handling
- Items passed as JSON string in hidden input
- Parsed on server side: `JSON.parse(items || '[]')`
- Client-side JavaScript manages item list

## Environment

### Default Configuration
- Server URL: http://localhost:3000
- Database: ./quotations.db
- No external services required

### File Locations
- Static files served from: `/public`
- Views directory: `/views`
