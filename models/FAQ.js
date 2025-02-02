const mongoose = require('mongoose');
const translateText = require('../services/translate'); // Import the translation function

const faqSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    question_hi: { type: String, default: '' }, // Hindi translation
    question_bn: { type: String, default: '' }, // Bengali translation
    answer_hi: { type: String, default: '' },   // Hindi translation
    answer_bn: { type: String, default: '' },   // Bengali translation
});

faqSchema.methods.getTranslatedQuestion = function (lang = 'en') {
    return this[`question_${lang}`] || this.question;
};

faqSchema.methods.getTranslatedAnswer = function (lang = 'en') {
    return this[`answer_${lang}`] || this.answer;
};

faqSchema.pre('save', async function (next) {
    try {
        if (!this.question_hi) {
            this.question_hi = await translateText(this.question, 'hi');
        }
        if (!this.question_bn) {
            this.question_bn = await translateText(this.question, 'bn');
        }
        if (!this.answer_hi) {
            this.answer_hi = await translateText(this.answer, 'hi');
        }
        if (!this.answer_bn) {
            this.answer_bn = await translateText(this.answer, 'bn');
        }
        next();
    } catch (err) {
        console.error('Error in translation during save:', err);
        next(err); // Pass the error to the next middleware
    }
});

module.exports = mongoose.model('FAQ', faqSchema);