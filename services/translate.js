const { translate } = require('@vitalets/google-translate-api');

async function translateText(text, targetLang) {
    try {
        const res = await translate(text, { to: targetLang });
        return res.text; // Return translated text
    } catch (err) {
        console.error('Translation error:', err);
        return text; // Fallback to the original text in case of an error
    }
}

module.exports = translateText;