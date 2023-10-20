const jwt = require("jsonwebtoken");
const paymentCollection = require("../models/paymentModel");
const { uploadFile, deleteFile } = require("../middlewares/s3");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const freelancerCollection = require("../models/freelancerModel");
const secret = process.env.JWT_SECRET;

async function resizeImage(file, width, height) {
  const filename = path.parse(file.filename).name;
  const ext = ".webp";
  const resizedFilename = filename + "-" + width + "x" + height + ext;
  const outputPath = "uploads/" + resizedFilename;

  await sharp(file.path).toFormat("webp", { quality: 50 }).toFile(outputPath);

  return {
    filename: resizedFilename,
    path: outputPath,
  };
}

async function submitPayment(req, res) {
  jwt.verify(req.token, secret, async function (err, authData) {
    const freelancerData = await freelancerCollection.findOne({
      _id: authData.user._id,
    });
    if (err && !freelancerData) {
      return;
    } else {
      const resizedScreenshot = await resizeImage(
        req.files["screenshot"][0],
        400,
        300
      );
      const paymentData = new paymentCollection({
        freelancer: freelancerData._id,
        screenshot: resizedScreenshot.filename,
      });
      await paymentData.save();
      const filePromises = [];
      filePromises.push(uploadFile(resizedScreenshot));
      await Promise.all(filePromises);
      await unlinkFile("uploads/" + req.files["screenshot"][0].filename);
      res.status(201).json({ message: "Uploaded screenshot successfully" });
    }
  });
}

async function getPaymentDetails(req, res) {
  try {
    const payments = await paymentCollection.find({});
    res.status(200).json(payments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server error" });
  }
}

module.exports = {
  submitPayment,
  getPaymentDetails,
};
