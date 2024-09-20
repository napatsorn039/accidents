const express = require('express');
const app = express();
const apiRouter = require('./service/api'); // Adjust path if necessary

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving
app.use('/', express.static('www'));

// API Routes
app.use('/service/api', apiRouter);

// Test route (optional for debugging, but not recommended in production)
app.get('/test', (req, res) => {
    res.status(200).json({ "status": "success" });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
