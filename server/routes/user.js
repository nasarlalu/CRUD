const express = require('express')
const router = express.Router();
const User = require('../models/users')
const multer = require('multer');
const path = require('path');


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




// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the directory where the files will be saved
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Update an existing user
router.put('/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { name, email, age, dob, phoneNumber, gender } = req.body;

    // const image = req.file ? req.file.path : null;

    let image = null;
    if (req.file) {
        image = req.file.path;
    }


    try {
        const updatedUser = await User.findByIdAndUpdate(id,
            { name, email, age, dob, phoneNumber, gender, image },
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


//Delete a user
router.delete('/:id', (req, res) => {
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