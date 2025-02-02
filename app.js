const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const faqRoutes = require('./routes/faqRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/faqs', faqRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));