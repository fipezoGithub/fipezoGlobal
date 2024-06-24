const leadsCollection = require("../models/leadsModel");
const otpCollection = require("../models/otpModel");
const userCollection = require("../models/userModel");
const jwt = require("jsonwebtoken");

async function generateNewLead(req, res) {
  try {
    const otp = req.body.otp;
    const otpData = await otpCollection.findOne({
      otp: otp,
      phone: req.body.phone,
      type: req.body.type,
    });
    if (!otpData) {
      return res.status(404).send("Invalid OTP");
    }
    const newLead = new leadsCollection({
      fullname: req.body.fullname,
      phone: req.body.phone,
    });
    await newLead.save();
    res.status(201).json(newLead);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function getAllLeads(req, res) {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      const user = await userCollection.findById(authData.user._id);
      if (err || !user || user.phone != 3335573725) {
        return res.status(404).send("Not Admin");
      }
      const leads = await leadsCollection.find({});
      res.status(200).json(leads);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function deleteALead(req, res) {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      const user = await userCollection.findById(authData.user._id);
      if (err || !user || user.phone != 3335573725) {
        return res.status(404).send("Not Admin");
      }
      await leadsCollection.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Deleted successfully" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { generateNewLead, getAllLeads, deleteALead };
