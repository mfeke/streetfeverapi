const express = require('express');
const multer = require('multer');

// Multer storage configuration
//const storage = multer.memoryStorage();
//const upload = multer({ dest: 'uploads/' });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Make sure this folder exists or create it
    }
});

// 2. Initialize multer middleware
// 'storage' defines destination/filename; 'limits' restricts file sizes if needed
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit per file
});



module.exports = { upload }
