const premiumHire249Collection = require("../models/premiumHire249Model");
const jwt = require("jsonwebtoken");
const userCollection = require("../models/userModel");

// Submit request
async function addNewHireRequest(req, res) {
  try {
    const newHireRequestData = new premiumHire249Collection({
      fullname: req.body.fullname,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      freelancerCount: req.body.freelancerCount,
      freelancerLocation: req.body.freelancerLocation,
      freelancerCategory: req.body.freelancerCategory,
      minBudget: req.body.minBudget,
      maxBudget: req.body.maxBudget,
      requiredDate: req.body.requiredDate,
      description: req.body.description,
      transactionId: req.body.transactionId,
      multipleCategory: req.body.multipleCategory,
      completed: false,
    });
    const newRequest = await newHireRequestData.save();
    res.status(201).json(newRequest);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

//Get All Requests
async function getAllHireRequests(req, res) {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      const admin = await userCollection.findById(authData.user._id);
      if (err || !admin || admin.phone != 3335573725) {
        return res.status(404).send("User not found");
      }
      const getAllRequests = await premiumHire249Collection.find({
        completed: false,
      });
      res.status(200).json(getAllRequests);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { addNewHireRequest, getAllHireRequests };
