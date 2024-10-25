// src/App.js
import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase'; // Import Firebase config
import axios from 'axios';

const App = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState('');

    // Handle file selection
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    // Handle image upload
    const handleUpload = () => {
        if (!selectedFile) return;

        // Create a storage reference for the image
        const storageRef = ref(storage, `images/${selectedFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Progress handling can be done here
            },
            (error) => {
                setMessage('Error uploading image');
            },
            async () => {
                // Get download URL after upload is complete
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                setMessage(`Image uploaded successfully. URL: ${downloadURL}`);

                // Save image URL to the backend (MongoDB)
                try {
                    const response = await axios.post('http://localhost:5000/saveImageUrl', {
                        imageUrl: downloadURL,
                    });
                    setMessage(response.data.message);
                } catch (error) {
                    setMessage('Error saving image URL to the database');
                }
            }
        );
    };

    return (
        <div>
            <h1>Image Upload</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default App;
