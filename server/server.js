const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3001


const dbUri = 'mongodb+srv://nasarlalu:Welcome@001@crudcluster.stcqkyv.mongodb.net/?retryWrites=true&w=majority'
async function connectDb() {
    try {
        await mongoose.connect(dbUri)
        console.log('connnected to database ');
    }
    catch (err) {
        console.log(err, 'error connecting to database')
    }
}
connectDb()



app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

app.get('/', (req, res) => {
    res.send('Root server')
})

app.get('/api/users', (req, res) => {

    const users = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Doe' }
    ]

    res.json(users)
})
