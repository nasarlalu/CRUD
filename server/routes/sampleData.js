const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

    const userData = [
        {
            name: 'John',
            age: 34,
        },
        {
            name: 'Mary',
            age: 23,
        }

    ]
    res.send(userData)
})

module.exports = router;