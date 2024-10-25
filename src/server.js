// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Define Image Schema
const Image = mongoose.model('Image', new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
    }
}));

// Route to save image URL in MongoDB
app.post('/saveImageUrl', async (req, res) => {
    const { imageUrl } = req.body;

    const newImage = new Image({ imageUrl });

    try {
        await newImage.save();
        res.status(201).json({ message: 'Image URL saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving image URL', error });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
