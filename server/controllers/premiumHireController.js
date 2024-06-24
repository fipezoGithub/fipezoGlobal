const jwt = require("jsonwebtoken");
const premiumHireCollection = require("../models/premiumHireModel");
const userCollection = require("../models/userModel");
const companyCollection = require("../models/companyModel");
const freelancerCollection = require("../models/freelancerModel");

async function newPremiumHireRequest(req, res) {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      if (authData.user.companyname) {
        user = await companyCollection.findOne({ _id: authData.user._id });
      } else if (!authData.user.uid) {
        user = await userCollection.findOne({ _id: authData.user._id });
      } else {
        user = await freelancerCollection.findOne({ _id: authData.user._id });
      }

      if (err || !user) {
        res.sendStatus(403);
        return;
      }
      let newHireRequest;
      if (authData.user.companyname) {
        newHireRequest = new premiumHireCollection({
          company: user._id,
          fullName: req.body.fullName,
          hired_freelancer: req.body.hired_freelancer,
          address: req.body.address,
          phone: req.body.phone,
          reuireDate: req.body.reuireDate,
          budget: req.body.budget,
          startTime: req.body.startTime,
          endTime: req.body.endTime,
          description: req.body.description,
          status: "pending",
          transactionId: req.body.transactionId,
          freelancer_status: "not_send",
        });
      } else if (!authData.user.uid) {
        newHireRequest = new premiumHireCollection({
          user: user._id,
          fullName: req.body.fullName,
          hired_freelancer: req.body.hired_freelancer,
          address: req.body.address,
          phone: req.body.phone,
          reuireDate: req.body.reuireDate,
          budget: req.body.budget,
          startTime: req.body.startTime,
          endTime: req.body.endTime,
          description: req.body.description,
          status: "pending",
          transactionId: req.body.transactionId,
          freelancer_status: "not_send",
        });
      } else {
        newHireRequest = new premiumHireCollection({
          freelancer: user._id,
          fullName: req.body.fullName,
          hired_freelancer: req.body.hired_freelancer,
          address: req.body.address,
          phone: req.body.phone,
          reuireDate: req.body.reuireDate,
          budget: req.body.budget,
          startTime: req.body.startTime,
          endTime: req.body.endTime,
          description: req.body.description,
          status: "pending",
          transactionId: req.body.transactionId,
          freelancer_status: "not_send",
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
        .populate("hired_freelancer")
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
        { status: req.body.status }
      );
      res.status(200).json(upDateRequest);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

async function initializeRequestToFreelancer(req, res) {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      const admin = await userCollection.findById(authData.user._id);
      if (err || !admin || admin.phone != 3335573725) {
        return res.status(404).send("Admin not found");
      }
      const upDateRequest = await premiumHireCollection.findByIdAndUpdate(
        req.params.reqId,
        { freelancer_status: req.body.freelancer_status }
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
      } else if (!authData.user.uid) {
        user = await userCollection.findById(authData.user._id);
      } else {
        user = await freelancerCollection.findById(authData.user._id);
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
          .populate("hired_freelancer")
          .populate("company")
          .exec();
      } else if (!authData.user.uid) {
        premiumHires = await premiumHireCollection
          .find({
            user: authData.user._id,
          })
          .populate("hired_freelancer")
          .populate("user")
          .exec();
      } else {
        premiumHires = await premiumHireCollection
          .find({
            freelancer: authData.user._id,
          })
          .populate("hired_freelancer")
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

async function getFreelancersRequest(req, res) {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      let user;
      if (authData.user.companyname) {
        user = await companyCollection.findById(authData.user._id);
      } else if (!authData.user.uid) {
        user = await userCollection.findById(authData.user._id);
      } else {
        user = await freelancerCollection.findById(authData.user._id);
      }

      if (err || !user) {
        return res.status(404).send("User not found");
      }

      let premiumHires = await premiumHireCollection
        .find({
          $and: [
            {
              hired_freelancer: authData.user._id,
              freelancer_status: { $ne: "not_send" },
            },
          ],
        })
        .populate("hired_freelancer")
        .populate("freelancer")
        .populate("user")
        .populate("company")
        .exec();

      res.status(200).json(premiumHires);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

async function freelancerHandel(req, res) {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      const admin = await freelancerCollection.findById(authData.user._id);
      if (err || !admin) {
        return res.status(404).send("Admin not found");
      }
      const upDateRequest = await premiumHireCollection.findByIdAndUpdate(
        req.params.reqId,
        { freelancer_status: req.body.freelancer_status }
      );
      res.status(200).json(upDateRequest);
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
  initializeRequestToFreelancer,
  getFreelancersRequest,
  freelancerHandel,
};
