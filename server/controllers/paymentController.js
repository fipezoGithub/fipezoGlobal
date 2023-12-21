const jwt = require("jsonwebtoken");
const paymentCollection = require("../models/paymentModel");
const { uploadFile, deleteFile } = require("../middlewares/s3");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const axios = require("axios");
const Razorpay = require("razorpay");
const { uid } = require("uid");
const freelancerCollection = require("../models/freelancerModel");
const secret = process.env.JWT_SECRET;

// Initialize razorpay object
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

async function newPayment(req, res) {
  try {
    const payment_capture = 1;
    const price = req.body.price; //Put your desired amount here

    const currency = "INR"; //Put your desired currency's code , check in razorpay docs for allowed codes.
    const options = {
      amount: (price * 100).toString(),
      currency,
      receipt: uid(), //use uid() if installed uid
      payment_capture,
    };
    const response = await razorpay.orders.create(options);
    res.json(response);
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
}

async function checkPaymentDetails(req, res) {
  try {
    const resp = await fetch(
      `https://api.razorpay.com/v1/payments/${req.params.transacId}`,
      {
        method: "GET",
        headers: {
          Authorization:
            "Basic cnpwX3Rlc3RfMzYzN1NpMVg5bkVZMDE6anNra3NYVXhOaUtjdG44Vmp1NjNDUTM1",
        },
      }
    );
    const data = await resp.json();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server error" });
  }
}

async function getPaymentDetails(req, res) {
  try {
    const payment = await paymentCollection.findById(req.params.paymentId);
    if (!payment) {
      res.status(404).json({ message: "payment not found" });
    } else {
      res.status(200).json(payment);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server error" });
  }
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
  checkPaymentDetails,
  getPaymentDetails,
};
