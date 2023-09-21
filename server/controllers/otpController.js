const userCollection = require("../models/userModel");
const freelancerCollection = require("../models/freelancerModel");
const companyCollection = require("../models/companyModel");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const otpCollection = require("../models/otpModel");
const referCollection = require("../models/referModel");

// verify freelancer phone

async function VerifyFreelancerPhone(req, res) {
  try {
    const otp = req.body.otp;
    const otpData = await otpCollection.findOne({
      otp: otp,
      phone: req.body.phone,
      type: req.body.type,
    });
    const existingUser = await freelancerCollection.findOne({
      phone: req.body.phone,
    });

    if (existingUser || !otpData) {
      return res.sendStatus(403);
    }

    const otpCode = otpData.otp;

    if (otpCode === parseInt(otp)) {
      jwt.sign({ otpData }, secret, { expiresIn: "1d" }, (err, token) => {
        if (err) {
          console.log(err);
          return res.sendStatus(403);
        }
        res.json({ token });
      });
    } else {
      return res.sendStatus(403);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}

// verify company phone

async function VerifyCompanyPhone(req, res) {
  try {
    const otp = req.body.otp;
    const otpData = await otpCollection.findOne({
      otp: otp,
      phone: req.body.phone,
      type: req.body.type,
    });
    const existingUser = await companyCollection.findOne({
      phone: req.body.phone,
    });

    if (existingUser || !otpData) {
      return res.sendStatus(403);
    }

    const otpCode = otpData.otp;

    if (otpCode === parseInt(otp)) {
      jwt.sign({ otpData }, secret, { expiresIn: "1d" }, (err, token) => {
        if (err) {
          console.log(err);
          return res.sendStatus(403);
        }
        res.json({ token });
      });
    } else {
      return res.sendStatus(403);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}

// signup

async function otpSignupController(req, res) {
  try {
    const otp = req.body.otp;
    const otpData = await otpCollection.findOne({
      otp: otp,
      phone: req.body.phone,
      type: req.body.type,
    });
    let existingUser = null;
    if (req.body.type === "user")
      existingUser = await userCollection.findOne({ phone: req.body.phone });
    else if (req.body.type === "freelancer")
      existingUser = await freelancerCollection.findOne({
        phone: req.body.phone,
      });
    else if (req.body.type === "company")
      existingUser = await companyCollection.findOne({ phone: req.body.phone });

    if (existingUser || !otpData) {
      return res.sendStatus(403);
    }

    const otpCode = otpData.otp;

    if (otpCode === parseInt(otp)) {
      const userData = new userCollection({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        profilePicture: null,
        createdReferalId: null,
      });

      const user = await userData.save();
      const referID = await new referCollection({
        referUid:
          req.body.firstname.toUpperCase().slice(0, 3) +
          req.body.phone.toString(8).slice(0, 3),
        // createdFreelancer: "",
        createdUser: user._id,
        // acceptedFreelancer: "",
      }).save();
      await userCollection.findByIdAndUpdate(user._id, {
        createdReferalId: referID._id,
      });
      jwt.sign({ user }, secret, { expiresIn: "30d" }, (err, token) => {
        if (err) {
          console.log(err);
          return res.sendStatus(403);
        }
        res.json({ token });
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}

// login

const otpController = async (req, res) => {
  try {
    const otp = req.body.otp;
    const otpData = await otpCollection.findOne({
      otp: otp,
      phone: req.body.phone,
      type: req.body.type,
    });
    let user;
    if (req.body.type === "user")
      user = await userCollection.findOne({ phone: req.body.phone });
    else if (req.body.type === "freelancer")
      user = await freelancerCollection.findOne({ phone: req.body.phone });
    else if (req.body.type === "company")
      user = await companyCollection.findOne({ companyphone: req.body.phone });

    if (!user || !otpData) {
      return res.sendStatus(403);
    }

    const otpCode = otpData.otp;

    if (otpCode === parseInt(otp)) {
      jwt.sign({ user }, secret, { expiresIn: "30d" }, (err, token) => {
        if (err) {
          console.log(err);
          return res.sendStatus(403);
        }
        res.json({ token });
      });
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  otpController,
  otpSignupController,
  VerifyFreelancerPhone,
  VerifyCompanyPhone,
};
