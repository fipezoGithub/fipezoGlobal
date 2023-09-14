const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const fs = require("fs");

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_API_KEY,
    secretAccessKey: process.env.AWS_SECRET_API_KEY,
  },
});

async function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Body: fileStream,
    Key: file.filename,
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(uploadParams));
  } catch (error) {
    console.log("Error");
  }
}

exports.uploadFile = uploadFile;

async function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: process.env.AWS_BUCKET_NAME,
  };

  try {
    const data = await s3Client.send(new GetObjectCommand(downloadParams));
    return data.Body;
  } catch (error) {
    console.log("Error");
    throw error;
  }
}

exports.getFileStream = getFileStream;

async function deleteFile(fileKey) {
  const deleteParams = {
    Key: fileKey,
    Bucket: process.env.AWS_BUCKET_NAME,
  };

  try {
    const data = await s3Client.send(new DeleteObjectCommand(deleteParams));
  } catch (error) {
    console.log("Error");
    throw error;
  }
}

exports.deleteFile = deleteFile;
