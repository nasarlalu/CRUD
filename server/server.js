const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');

const sampledata = require('./routes/sampleData');
const studentsData = require('./routes/user-old');
const userRoutes = require('./routes/user');
const signupRoutes = require('./routes/signup');

require('dotenv').config();
require('./models/db');

// Use the CORS middleware before defining routes
app.use(cors());

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Root server');
});

app.use('/api/sampledata', sampledata);
app.use('/api/students', studentsData);
app.use('/api/users', userRoutes);
app.use('/api/signup', signupRoutes)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));