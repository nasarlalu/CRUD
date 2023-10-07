const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const User = require('../models/users');

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Create a multer instance with the configured storage
const upload = multer({ storage });

// POST route for creating a new user
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { name, email, age, dob, phoneNumber, gender } = req.body;
        const image = req.file ? req.file.path : null;

        // Check if the user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Create a new user
        const newUser = new User({
            name,
            email,
            age,
            dob,
            phoneNumber,
            gender,
            image
        });

        // Save the user to the database
        const user = await newUser.save();
        res.json(user);
        console.log('New user created:', user);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Error creating user' });
    }
});

module.exports = router;
