const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Import routes
const categoryRoutes = require('./routes/category.routes');
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Cho phép CORS
app.use(bodyParser.json()); // Parse JSON request body
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded form data

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to GeekUp E-commerce API' });
});

// API routes
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Error handling middleware - luôn đặt ở cuối
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
