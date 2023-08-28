const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config()
// Configure the AWS SDK with your credentials
const deleteVideo = async (Key)=>{

try {

const s3 = new S3Client({
  region: process.env.PUBLIC_REGION, // Replace with your desired AWS region
  credentials: {
    accessKeyId: process.env.PUBLIC_ACCESS_KEY_ID,
    secretAccessKey: process.env.PUBLIC_SECRET_ACCESS_KEY
  }
});

// Specify the bucket name and the video file key
const bucketName = process.env.PUBLIC_BUCKET_NAME;

// Create the delete command
const deleteParams = {
  Bucket: bucketName,
  Key
};

// Delete the video file
const deleteObjectCommand = new DeleteObjectCommand(deleteParams);

// Execute the delete command

const video = await s3.send(deleteObjectCommand)
console.log(video)
    
} catch (error) {
 console.log(error)   
}
}
module.exports = deleteVideo