const jwt = require("jsonwebtoken");
const paymentCollection = require("../models/paymentModel");
const axios = require("axios");
const Razorpay = require("razorpay");
const { uid } = require("uid");
const freelancerCollection = require("../models/freelancerModel");
const secret = process.env.JWT_SECRET;
const crypto = require("crypto");

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

const newPhonePayPayment = async (req, res) => {
  try {
    const merchantTransactionId = "M" + Date.now();
    const { user_id, price, phone, name } = req.body;
    const data = {
      merchantId: "M22H3K65TXNNT",
      merchantTransactionId: merchantTransactionId,
      merchantUserId: "MUID" + user_id,
      name: name,
      amount: price * 100,
      redirectUrl: `http://localhost:3001/api/v1/status/${merchantTransactionId}`,
      redirectMode: "POST",
      mobileNumber: phone,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };
    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString("base64");
    const keyIndex = 1;
    const string =
      payloadMain + "/pg/v1/pay" + "f36d58f8-3ab8-45c0-ab42-0f791fe404e1";
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + keyIndex;
    const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";
    const options = {
      method: "POST",
      url: prod_URL,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      data: {
        request: payloadMain,
      },
    };
    axios
      .request(options)
      .then(function (response) {
        return res.redirect(
          response.data.data.instrumentResponse.redirectInfo.url
        );
      })
      .catch(function (error) {
        console.error(error);
      });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};

async function checkPaymentDetails(req, res) {
  try {
    const resp = await fetch(
      `https://api.razorpay.com/v1/payments/${req.params.transacId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${process.env.BASIC_RAZORPAY_AUTH}`,
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
        startDate: req.body.startDate,
        endDate: req.body.endDate,
      });
      const newPayment = await paymentData.save();
      await freelancerCollection.findByIdAndUpdate(freelancerData._id, {
        paymentDetails: newPayment._id,
        featured: true,
        premium: true,
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
  newPhonePayPayment,
};
