const express = require('express')
const app = express()
require('dotenv').config();

const path = require('path');
require('./models/db');

const sampledata = require('./routes/sampleData')


const PORT = process.env.PORT || 3001;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.get('/', (req, res) => {
    res.send('Root server')
})


app.use('/api/sampledata', sampledata)
app.use('/api/students', require('./routes/user'));
