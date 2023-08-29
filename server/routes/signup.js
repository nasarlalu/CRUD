const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const User = require('../models/users');


// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the directory where the files will be saved
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Create multer instance with the configured storage
const upload = multer({ storage: storage });

router.post('/', upload.single('image'), async (req, res) => {
    const { name, email, age, dob, phoneNumber, gender } = req.body;
    const image = req.file ? req.file.path : null; // Get the image path from multer


    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
    }

    const newUser = new User({
        name,
        email,
        age,
        dob,
        phoneNumber,
        gender,
        image
    });

    newUser.save()
        .then((user) => {
            res.json(user);
            console.log('New user created:', user);
        })
        .catch((error) => {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Error creating user' });
        });
});

module.exports = router;


// const calculateAge = (dob) => {
//     const birthDate = new Date(dob);
//     const currentDate = new Date();
//     const age = currentDate.getFullYear() - birthDate.getFullYear();
//     const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    
//     if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
//         return age - 1;
//     }
    
//     return age;
// };

// router.post('/', (req, res) => {
//     const { name, email, dob, /* other fields */ } = req.body;

//     const newUser = new User({
//         name,
//         email,
//         dob,
//         age: calculateAge(dob), // Calculate age using the provided function
//         /* other fields */
//     });

//     // ... save newUser and handle errors ...
// });
