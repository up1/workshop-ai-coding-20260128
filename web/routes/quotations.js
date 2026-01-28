const express = require('express');
const router = express.Router();
const { runAsync, allAsync, getAsync } = require('../db');
const { generatePDF } = require('../services/pdfGenerator');

router.get('/', async (req, res) => {
    try {
        const quotations = await allAsync(
            'SELECT * FROM quotations ORDER BY created_at DESC'
        );
        res.render('quotations/index', { quotations });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching quotations');
    }
});

router.get('/new', (req, res) => {
    res.render('quotations/new');
});

router.post('/', async (req, res) => {
    try {
        const {
            volume_no,
            document_no,
            date,
            seller_name,
            seller_address,
            customer_name,
            customer_address,
            amount_in_words,
            items
        } = req.body;

        const parsedItems = JSON.parse(items || '[]');
        const totalAmount = parsedItems.reduce((sum, item) => sum + (item.total || 0), 0);

        const result = await runAsync(
            `INSERT INTO quotations (volume_no, document_no, date, seller_name, seller_address, customer_name, customer_address, total_amount, amount_in_words)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [volume_no, document_no, date, seller_name, seller_address, customer_name, customer_address, totalAmount, amount_in_words]
        );

        const quotationId = result.lastID;

        for (const item of parsedItems) {
            await runAsync(
                `INSERT INTO quotation_items (quotation_id, item_number, description, quantity, unit, price_per_unit, total)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [quotationId, item.item_number, item.description, item.quantity, item.unit, item.price_per_unit, item.total]
            );
        }

        res.redirect(`/quotations/${quotationId}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating quotation');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const quotation = await getAsync(
            'SELECT * FROM quotations WHERE id = ?',
            [req.params.id]
        );

        if (!quotation) {
            return res.status(404).send('Quotation not found');
        }

        const items = await allAsync(
            'SELECT * FROM quotation_items WHERE quotation_id = ? ORDER BY item_number',
            [req.params.id]
        );

        res.render('quotations/show', { quotation, items });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching quotation');
    }
});

router.get('/:id/pdf', async (req, res) => {
    try {
        const quotation = await getAsync(
            'SELECT * FROM quotations WHERE id = ?',
            [req.params.id]
        );

        if (!quotation) {
            return res.status(404).send('Quotation not found');
        }

        const items = await allAsync(
            'SELECT * FROM quotation_items WHERE quotation_id = ? ORDER BY item_number',
            [req.params.id]
        );

        const pdfBuffer = await generatePDF(quotation, items);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=quotation-${quotation.document_no}.pdf`);
        res.send(pdfBuffer);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error generating PDF');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await runAsync('DELETE FROM quotation_items WHERE quotation_id = ?', [req.params.id]);
        await runAsync('DELETE FROM quotations WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting quotation' });
    }
});

module.exports = router;
