// server.js
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append the original extension
    }
});

const upload = multer({ storage });

// Define the Image model
const Image = mongoose.model('Image', new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
    }
}));

// Routes
app.post('/upload', upload.single('image'), async (req, res) => {
    const newImage = new Image({
        imageUrl: req.file.path, // Save the path of the uploaded file
    });

    try {
        await newImage.save();
        res.status(201).json({ message: 'Image uploaded successfully', imageUrl: req.file.path });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading image', error });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});