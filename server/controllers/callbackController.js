const jwt = require("jsonwebtoken");
const callbackCollection = require("../models/callbackModel");
const freelancerCollection = require("../models/freelancerModel");
const secret = process.env.JWT_SECRET;

async function requestCallback(req, res) {
  jwt.verify(req.token, secret, async (err, authData) => {
    const freelancerData = await freelancerCollection.findOne({
      _id: authData.user._id,
    });
    if (err && !freelancerData) {
      return;
    } else {
      const request = new callbackCollection({
        requestedUser: freelancerData._id,
      });
      await request.save();
      res.status(201).json({ message: "callback created" });
    }
  });
}

async function getAllCallback(req, res) {
  try {
    const callbacks = await callbackCollection
      .find({})
      .populate("requestedUser")
      .exec();
    res.status(200).json(callbacks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

async function deleteCallback(req, res) {
  try {
    const deleteCallback = await callbackCollection.findByIdAndDelete(
      req.params.callbackId
    );
    if (deleteCallback) {
      res.status(200).json({ message: "deleted successfully" });
    } else {
      res.status(404).json({ message: "callback not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  requestCallback,
  getAllCallback,
  deleteCallback,
};
