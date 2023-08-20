const express = require('express')
const bodyParser = require("body-parser");
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3001;

const sampledata = require('./routes/sampleData')
const studentsData = require('./routes/user-old')
const userRoutes = require('./routes/user')


require('dotenv').config();
require('./models/db');


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.get('/', (req, res) => {
    res.send('Root server')
})


app.use('/api/sampledata', sampledata)
app.use('/api/students', studentsData);
app.use('/api/users', userRoutes);
