const jwt = require("jsonwebtoken");
const freelancerCollection = require("../models/freelancerModel");
const referUPICollection = require("../models/referUPIModel");
const userCollection = require("../models/userModel");
const referCollection = require("../models/referModel");
const secret = process.env.JWT_SECRET;

async function applyWithdrawl(req, res) {
  jwt.verify(req.token, secret, async (err, authData) => {
    const freelancer = await freelancerCollection.findById(authData.user._id);

    if (err || !freelancer) {
      res.status(404).send("User not found");
      return;
    }

    const newUPIData = new referUPICollection({
      freelancer: freelancer._id,
      upiId: req.body.upiId,
      paymentStatus: "pending",
    });

    const upi = await newUPIData.save();

    res.status(201).json(upi);
  });
}

async function getWithDrawlDetails(req, res) {
  jwt.verify(req.token, secret, async (err, authData) => {
    const admin = await userCollection.findById(authData.user._id);

    if (err || !admin || admin.phone != 3335573725) {
      res.status(404).send("Admin not found");
      return;
    }

    const upiRequests = await referUPICollection
      .find({ paymentStatus: "pending" })
      .populate("freelancer")
      .exec();

    res.status(200).json(upiRequests);
  });
}

async function completeWithDrawl(req, res) {
  jwt.verify(req.token, secret, async (err, authData) => {
    const admin = await userCollection.findById(authData.user._id);

    if (err || !admin || admin.phone != 3335573725) {
      res.status(404).send("Admin not found");
      return;
    }

    const upi = await referUPICollection
      .findById(req.params.reqId)
      .populate("freelancer")
      .exec();

    const updatedUPI = await referUPICollection.findByIdAndUpdate(
      req.params.reqId,
      {
        paymentStatus: "complete",
      }
    );
    const freelancer = await freelancerCollection.findById(upi.freelancer._id);
    await referCollection.findByIdAndUpdate(freelancer.createdReferalId, {
      acceptedFreelancer: [],
    });

    await res.status(200).json(updatedUPI);
  });
}

module.exports = { applyWithdrawl, getWithDrawlDetails, completeWithDrawl };
