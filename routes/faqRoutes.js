const express = require('express');
const FAQ = require('../models/FAQ');
const redisClient = require('../config/redis'); // Ensure correct import

const router = express.Router();

// GET all FAQs
router.get('/', async (req, res) => {
    try {
        const lang = req.query.lang || 'en';
        const cacheKey = `faqs_${lang}`;

        // console.log('Checking Redis cache for key:', cacheKey);

        // Check Redis cache
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            console.log('Cache hit');
            return res.json(JSON.parse(cachedData));
        } else {
            console.log('Cache miss');

            const faqs = await FAQ.find();
            // console.log('FAQs fetched from database:', faqs);

            const translatedFAQs = faqs.map(faq => ({
                question: faq.getTranslatedQuestion(lang),
                answer: faq.getTranslatedAnswer(lang),
            }));

            // console.log('Translated FAQs:', translatedFAQs);

            // Cache data in Redis for 15 minutes
            await redisClient.set(cacheKey, JSON.stringify(translatedFAQs), { EX: 900 });
            // console.log('Data cached in Redis');

            res.json(translatedFAQs);
        }
    } catch (err) {
        console.error('Error in GET /api/faqs:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST a new FAQ
router.post('/', async (req, res) => {
    try {
        const { question, answer } = req.body;
        const newFAQ = new FAQ({ question, answer });
        await newFAQ.save();
        res.status(201).json(newFAQ);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
