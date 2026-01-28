const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'quotations.db');
const db = new sqlite3.Database(dbPath);

function runAsync(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve({ lastID: this.lastID, changes: this.changes });
        });
    });
}

function allAsync(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

function getAsync(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}

async function initDatabase() {
    await runAsync(`
        CREATE TABLE IF NOT EXISTS quotations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            volume_no TEXT,
            document_no TEXT NOT NULL,
            date TEXT NOT NULL,
            seller_name TEXT NOT NULL,
            seller_address TEXT,
            customer_name TEXT NOT NULL,
            customer_address TEXT,
            total_amount REAL DEFAULT 0,
            amount_in_words TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    await runAsync(`
        CREATE TABLE IF NOT EXISTS quotation_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            quotation_id INTEGER NOT NULL,
            item_number INTEGER NOT NULL,
            description TEXT NOT NULL,
            quantity REAL NOT NULL,
            unit TEXT NOT NULL,
            price_per_unit REAL NOT NULL,
            total REAL NOT NULL,
            FOREIGN KEY (quotation_id) REFERENCES quotations(id) ON DELETE CASCADE
        )
    `);
}

module.exports = {
    db,
    runAsync,
    allAsync,
    getAsync,
    initDatabase
};
