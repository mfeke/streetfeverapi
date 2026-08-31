//const express = require('express');
//const multer = require('multer');

// Multer storage configuration
//const storage = multer.memoryStorage();

// 2. Initialize multer middleware
// 'storage' defines destination/filename; 'limits' restricts file sizes if needed
// const upload = multer({
//storage: storage,
//limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit per file
//});

const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const multer = require("multer");
const multerS3 = require("multer-s3");
const cors = require("cors");

const app = express();

const { S3Client } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_AKEY,
        secretAccessKey: process.env.AWS_SKEY,
    },
});

let upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.BUCKET_NAME,
        key: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname);
        },
    }),
})

module.exports = { upload }
