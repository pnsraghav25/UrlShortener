const express = require('express');
const connectDB = require('./config/db');

const app = express();
const path = require('path');

// Serve static files from "pages" directory
app.use(express.static(path.join(__dirname, 'pages')));

// Connect to database
connectDB();

app.use(express.json());

// Define Routes
app.use('/api', require('./routes/index'));  // for routes like /api/links
app.use('/', require('./routes/url'));       // for routes like /:code

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));