const express = require('express')
const router = express.Router();
const User = require('../models/users')


//creating the user
// router.post('/', (req, res) => {
//     const { name, email, age } = req.body  //requesting data from client
//     console.log(req.body, 'bodyDataFromRequest', name, email, age)

//     const newUser = new User({ name, email, age }) //creating a new user by the data recieved from client

//     newUser.save()
//         .then((user) => {
//             res.json(user)
//             console.log('new user created');
//         })
//         .catch((error) => {
//             console.error('Error creating user:', error);
//             res.status(500).json({ error: 'Error creating user' })
//         })
// })


//Read all users
router.get('/', (req, res) => {
    User.find()
        .then((users) => {
            res.json(users)
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error fetching user' })
        })
})


//Update a existing user
router.put('/:id', (req, res) => {
    const { id } = req.params
    const { name, email, age } = req.body

    User.findByIdAndUpdate(id, { name, email, age }, { new: true })
        .then((user) => {
            res.json(user)
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error updating user' })
        })
})


//Delete a user
router.delete('/', (req, res) => {
    const { id } = req.params
    User.findByIdAndRemove(id)
        .then(() => {
            res.json({ message: 'User deleted successfully' })
        })
        .catch(err => {
            res.status(500).json({ error: 'Error deleting user' })
        })
})

module.exports = router