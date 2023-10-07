const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');
const dotenv = require('dotenv');

const userRoutes = require('./routes/user');
const signupRoutes = require('./routes/signup');
require('./models/db');


// Determine the current environment
const env = process.env.NODE_ENV || 'development';

// Load the appropriate .env file
if (env === 'production') {
    dotenv.config({ path: '.env.prod' });
} else {
    dotenv.config({ path: '.env.dev' });
}

// Print the current environment for debugging
// console.log(process.env.DATABASE_URI , 'database');
console.log(`Current environment: ${env}`);
console.log(`SERVER_ENDPOINT: ${process.env.SERVER_ENDPOINT}`); // Debugging

// Use the CORS middleware before defining routes
app.use(cors({
    origin: env === 'production' ? process.env.SERVER_ENDPOINT : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Root server');
});

app.use('/api/users', userRoutes);
app.use('/api/signup', signupRoutes);

