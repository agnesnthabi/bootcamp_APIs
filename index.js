import express from 'express';
import cors from 'cors';

import { longestWord, shortestWord, wordLengths } from './bootcamp.js';
import { enoughAirtime } from './bootcamp.js';

const app = express();
// const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

let smsCost = 0.65, callCost = 1.75 
app.get('/api/word_game', (req, res) => {
    const { sentence } = req.query;

    if (!sentence) {
        return res.status(400).json({ error: 'Please provide a sentence to analyze.' });
    }

    const longest = longestWord(sentence);
    const shortest = shortestWord(sentence);
    const sum = wordLengths(sentence);

    res.json({
        longestWord: longest.length,
        shortestWord: shortest,
        sum: sum
    });
});

// POST phonebill/total
app.post('/api/phonebill/total', (req, res) => {
    const { bill } = req.body;
    if (!bill) {
        return res.status(400).json({ error: 'Please provide a bill string.' });
    }

    const actions = bill.split(',');
    let total = 0;

    actions.forEach(action => {
        if (action.trim() === 'call') {
            total += callCost;
        } else if (action.trim() === 'sms') {
            total += smsCost;
        }
    });

    res.json({ total: total.toFixed(2) });
});

// GET phonebill/prices
app.get('/api/phonebill/prices', (req, res) => {
    res.json({ call: callCost, sms: smsCost });
});

// POST phonebill/price
app.post('/api/phonebill/price', (req, res) => {
    const { type, price } = req.body;
    if (!type || !price) {
        return res.status(400).json({ error: 'Please provide a type and price.' });
    }

    if (type === 'call') {
        callCost = parseFloat(price);
    } else if (type === 'sms') {
        smsCost = parseFloat(price);
    } else {
        return res.status(400).json({ error: 'Invalid type. Must be "call" or "sms".' });
    }

    res.json({ status: 'success', message: `The ${type} was set to ${price}` });
});

//Post Enough airtime
app.post('/api/enough', (req, res) => {
    const { usage, available } = req.body;

    if (!usage || typeof available !== 'number' || available < 0) {
        return res.status(400).json({ error: 'Invalid input. Please provide a valid usage and a non-negative available airtime.' });
    }

    try {
        const result = enoughAirtime(usage, available);
        res.json({ result: result.toFixed(2) });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started ${PORT}`))
