const express = require('express')
const router = express.Router();
const User = require('../models/users')


//Read all users
router.get('/', (req, res) => {
    User.find()
        .then((users) => {
            res.json(users)
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error fetching user in server' })
        })
})

//Get particular user data
router.get('/:userId', (req, res) => {
    const userId = req.params.userId;

    User.findById(userId)
        .then((user) => {
            if (!user) {
                res.status(404).json({ error: 'User not found' });
            } else {
                res.json(user);
            }
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error fetching user in server' });
        });
});



// Update an existing user
router.put('/:id', async (req, res) => {

    const { id } = req.params;
    const { name, email, age, dob, phoneNumber, gender } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id,
            { name, email, age, dob, phoneNumber, gender },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Respond with a success message and the updated user
        res.json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Error updating user in server' });
    }
});



// Delete a user
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find the user by ID to get the image path
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Delete the user from the database
        await User.findByIdAndRemove(id);

        return res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Error deleting user' });
    }
});


module.exports = router