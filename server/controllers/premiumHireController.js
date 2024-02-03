const jwt = require("jsonwebtoken");
const premiumHireCollection = require("../models/premiumHireModel");
const userCollection = require("../models/userModel");
const companyCollection = require("../models/companyModel");

async function newPremiumHireRequest(req, res) {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      if (authData.user.companyname)
        user = await companyCollection.findOne({ _id: authData.user._id });
      else user = await userCollection.findOne({ _id: authData.user._id });

      if (err || !user || authData.user._id === req.body.freelancer) {
        res.sendStatus(403);
        return;
      }
      let newHireRequest;
      if (authData.user.companyname) {
        newHireRequest = new premiumHireCollection({
          company: user._id,
          fullName: req.body.fullName,
          freelancer: req.body.freelancer,
          address: req.body.address,
          phone: req.body.phone,
          reuireDate: req.body.reuireDate,
          budget: req.body.budget,
          startTime: req.body.startTime,
          endTime: req.body.endTime,
          description: req.body.description,
          status: "pending",
          transactionId: req.body.transactionId,
        });
      } else {
        newHireRequest = new premiumHireCollection({
          user: user._id,
          fullName: req.body.fullName,
          freelancer: req.body.freelancer,
          address: req.body.address,
          phone: req.body.phone,
          reuireDate: req.body.reuireDate,
          budget: req.body.budget,
          startTime: req.body.startTime,
          endTime: req.body.endTime,
          description: req.body.description,
          status: "pending",
          transactionId: req.body.transactionId,
        });
      }

      const hireData = await newHireRequest.save();

      res.status(201).json(hireData);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}

async function getAllPendingRequest(req, res) {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      const admin = await userCollection.findById(authData.user._id);
      if (err || !admin || admin.phone != 3335573725) {
        return res.status(404).send("Admin not found");
      }
      const pendingRequests = await premiumHireCollection
        .find({ status: "pending" })
        .populate("freelancer")
        .populate("user")
        .populate("company")
        .exec();
      res.status(200).json(pendingRequests);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

async function changeStatusOfRequest(req, res) {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      const admin = await userCollection.findById(authData.user._id);
      if (err || !admin || admin.phone != 3335573725) {
        return res.status(404).send("Admin not found");
      }
      const upDateRequest = await premiumHireCollection.findByIdAndUpdate(
        req.params.reqId,
        { status: "complete" }
      );
      res.status(200).json(upDateRequest);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

async function getUserPremiumHires(req, res) {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      let user;
      if (authData.user.companyname) {
        user = await companyCollection.findById(authData.user._id);
      } else {
        user = await userCollection.findById(authData.user._id);
      }

      if (err || !user) {
        return res.status(404).send("User not found");
      }

      let premiumHires;
      if (authData.user.companyname) {
        premiumHires = await premiumHireCollection
          .find({
            company: authData.user._id,
          })
          .populate("freelancer")
          .exec();
      } else {
        premiumHires = await premiumHireCollection
          .find({
            user: authData.user._id,
          })
          .populate("freelancer")
          .exec();
      }

      res.status(200).json(premiumHires);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

module.exports = {
  newPremiumHireRequest,
  getAllPendingRequest,
  changeStatusOfRequest,
  getUserPremiumHires,
};
