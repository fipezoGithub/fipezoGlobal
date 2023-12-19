const jwt = require("jsonwebtoken");
const paymentCollection = require("../models/paymentModel");
const { uploadFile, deleteFile } = require("../middlewares/s3");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const crypto = require("crypto");
const axios = require("axios");
const freelancerCollection = require("../models/freelancerModel");
const secret = process.env.JWT_SECRET;

const newPayment = async (req, res) => {
  try {
    const merchantTransactionId = "M" + Date.now();
    const { user_id, price, phone, name } = req.body;
    const data = {
      merchantId: process.env.MERCHANT_ID,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: "MUID" + user_id,
      name: name,
      amount: price * 100,
      redirectUrl: `http://localhost:3001/api/v1/status/${merchantTransactionId}`,
      redirectMode: "REDIRECT",
      mobileNumber: phone,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };
    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString("base64");
    console.log(payloadMain);
    const keyIndex = 1;
    const string = payloadMain + "/pg/v1/pay" + process.env.SALT_KEY;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + keyIndex;
    console.log(checksum);
    // const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";
    const prod_URL =
      "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";
    const options = {
      method: "POST",
      url: prod_URL,
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        request: payloadMain,
      },
    };
    axios
      .request(options)
      .then(function (response) {
        res.redirect(response.data.data.instrumentResponse.redirectInfo.url);
      })
      .catch(function (error) {
        console.error(error);
        res.send(error);
      });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};

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
      const paymentData = new paymentCollection({
        freelancer: freelancerData._id,
        paymentPack: req.body.paymentPack,
        transactionId: req.body.transactionId,
      });
      const newPayment = await paymentData.save();
      await freelancerCollection.findByIdAndUpdate(freelancerData._id, {
        paymentDetails: newPayment._id,
      });

      res.status(201).json({ message: "Payment submit successfully" });
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
  newPayment,
};
