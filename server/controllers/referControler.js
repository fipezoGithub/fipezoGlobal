const jwt = require("jsonwebtoken");
const freelancerCollection = require("../models/freelancerModel");
const referCollection = require("../models/referModel");
const userCollection = require("../models/userModel");

async function generateReferCode(req, res) {
  try {
    jwt.verify(
      req.token,
      process.env.JWT_SECRET,
      async function (err, authData) {
        if (req.body.freelancer) {
          const freelancer = await freelancerCollection.findById(
            authData.user._id
          );
          const referID = await new referCollection({
            referUid:
              freelancer.firstname.toUpperCase().slice(0, 3) +
              parseInt(freelancer.phone).toString(16).slice(0, 3),
            createdFreelancer: freelancer._id,
          }).save();
          await freelancerCollection.findByIdAndUpdate(freelancer._id, {
            createdReferalId: referID._id,
          });
          res.status(201).json(referID);
        } else {
          const user = await userCollection.findById(authData.user._id);
          const referID = await new referCollection({
            referUid:
              user.firstname.toUpperCase().slice(0, 3) +
              parseInt(user.phone).toString(16).slice(0, 3),
            createdUser: user._id,
          }).save();
          await userCollection.findByIdAndUpdate(user._id, {
            createdReferalId: referID._id,
          });
          res.status(201).json(referID.populate("createdUser"));
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function getReferCodeByUser(req, res) {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      const user = await userCollection.findById(authData.user._id);
      if (err || !user) {
        res.status(404).send("Not logged in");
      } else {
        const referDetails = await referCollection.findOne({
          createdUser: authData.user._id,
        });
        res.status(200).json(referDetails);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function getReferCodeByFreelancer(req, res) {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      const user = await freelancerCollection.findById(authData.user._id);
      if (err || !user) {
        res.status(404).send("Not logged in");
      } else {
        const referDetails = await referCollection.findOne({
          createdFreelancer: authData.user._id,
        });
        res.status(200).json(referDetails);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}
module.exports = {
  generateReferCode,
  getReferCodeByUser,
  getReferCodeByFreelancer,
};
