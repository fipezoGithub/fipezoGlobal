const jwt = require("jsonwebtoken");
const companyCollection = require("../models/companyModel");
const userCollection = require("../models/userModel");
const freelancerCollection = require("../models/freelancerModel");
const reportCollection = require("../models/reportModel");
const secret = process.env.JWT_SECRET;

// Create Report
async function createReport(req, res) {
  try {
    jwt.verify(req.token, secret, async (err, authData) => {
      let user;
      if (req.query.type === "company") {
        user = await companyCollection.findById(authData.user._id);
      } else if (req.query.type === "user") {
        user = await userCollection.findById(authData.user._id);
      } else {
        user = await freelancerCollection.findById(authData.user._id);
      }

      if (err || !user) {
        res.status(404).send("User not found");
      } else {
        const report = new reportCollection({
          relatedType: req.body.relatedType,
          reason: req.body.reason,
          description: req.body.description,
          status: req.body.status,
          acceptedFreelancer: req.body.acceptedFreelancer || null,
          createdCompany: req.query.type === "company" ? user : null,
          createdUser: req.query.type === "user" ? user : null,
          createdFreelancer: req.query.type === "freelancer" ? user : null,
        });
        await report.save();
        res.status(201).json(report);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

// Get All Reports
async function getAllReports(req, res) {
  try {
    jwt.verify(req.token, secret, async (err, authData) => {
      const user = await userCollection.findById(authData.user._id);

      if (err || user.phone !== 3335573725) {
        res.status(404).send("Admin not found");
      }

      const reports = await reportCollection
        .find({})
        .populate("createdFreelancer")
        .populate("createdUser")
        .populate("createdCompany")
        .populate("acceptedFreelancer")
        .exec();
      res.status(200).json(reports);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

// Update status of report
async function updateStatusReport(req, res) {
  try {
    jwt.verify(req.token, secret, async (err, authData) => {
      const user = await userCollection.findById(authData.user._id);

      if (err || user.phone !== 3335573725) {
        res.status(404).send("Admin not found");
      }

      const report = await reportCollection.findByIdAndUpdate(
        req.params.repId,
        { status: req.body.status }
      );
      res.status(200).json(report);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { createReport, getAllReports, updateStatusReport };
