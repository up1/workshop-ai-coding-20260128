const express = require('express');
const path = require('path');
const { initDatabase } = require('./db');
const quotationRoutes = require('./routes/quotations');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/quotations', quotationRoutes);

app.get('/', (req, res) => {
    res.redirect('/quotations');
});

initDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
});
