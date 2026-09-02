const AWS = require('aws-sdk');
require('aws-sdk/lib/maintenance_mode_message').suppress = true;
require("dotenv").config();

exports.UploadImages = async (fileImages) => {
        AWS.config.update({
                accessKeyId: process.env.AWS_AKEY,
                secretAccessKey: process.env.AWS_SKEY,
                region: process.env.AWS_REGION
        });

        const s3 = new AWS.S3();

        const uploadPromises = fileImages.map((fileImage) => {
                const params = {
                        Bucket: process.env.BUCKET_NAME,
                        Key: fileImage.originalname,
                        Body: fileImage.buffer,
                        ACL: "public-read"
                };

                return s3.upload(params).promise();
        });

        return await Promise.all(uploadPromises);
};
