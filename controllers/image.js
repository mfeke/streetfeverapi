
require("dotenv").config();

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const s3Client = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
                accessKeyId: process.env.AWS_AKEY,
                secretAccessKey: process.env.AWS_SKEY,
        },
});

exports.UploadImages = async (fileImages) => {



        const uploadPromises = fileImages.map(async (file) => {
                // Sanitize filename and make it unique
                const cleanFileName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
                const fileName = `${Date.now()}-${cleanFileName}`;

                const uploadParams = {
                        Bucket: process.env.BUCKET_NAME,
                        Key: fileName,
                        Body: file.buffer,
                        ContentType: file.mimetype,
                };

                await s3Client.send(new PutObjectCommand(uploadParams));

                const location = `https://${process.env.BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

                // Return complete file data object
                return location 
        });

        return await Promise.all(uploadPromises);
};
