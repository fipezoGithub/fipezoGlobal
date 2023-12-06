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
    const existingFreelancer = await freelancerCollection.findOne({
      phone: req.body.phone,
    });

    const existingUser = await userCollection.findOne({
      phone: req.body.phone,
    });

    const existingCompany = await companyCollection.findOne({
      companyphone: req.body.phone,
    });

    if (existingUser || existingFreelancer || existingCompany || !otpData) {
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
    let existingFreelancer;
    let existingCompany;
    existingUser = await userCollection.findOne({ phone: req.body.phone });
    existingFreelancer = await freelancerCollection.findOne({
      phone: req.body.phone,
    });
    existingCompany = await companyCollection.findOne({
      companyphone: req.body.phone,
    });
    // if (req.body.type === "user")
    //   existingUser = await userCollection.findOne({ phone: req.body.phone });
    // else if (req.body.type === "freelancer")
    //   existingUser = await freelancerCollection.findOne({
    //     phone: req.body.phone,
    //   });
    // else if (req.body.type === "company")
    //   existingUser = await companyCollection.findOne({ phone: req.body.phone });

    if (existingUser || existingFreelancer || existingCompany || !otpData) {
      return res.sendStatus(403);
    }

    const otpCode = otpData.otp;

    if (otpCode === parseInt(otp)) {
      const userData = new userCollection({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        profilePicture: null,
        createdReferalId: null,
      });

      const user = await userData.save();
      const referID = await new referCollection({
        referUid:
          req.body.firstname.toUpperCase().slice(0, 3) +
          parseInt(req.body.phone).toString(16).slice(0, 3),
        createdUser: user._id,
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
    if (!otpData) {
      return res.sendStatus(403);
    }
    let user = await userCollection.findOne({ phone: req.body.phone });
    if (!user) {
      user = await freelancerCollection.findOne({ phone: req.body.phone });
      if (!user) {
        user = await companyCollection.findOne({
          companyphone: req.body.phone,
        });
        if (!user) {
          return res.sendStatus(403);
        }
      }
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

//ForgetOTP
const forgetOTPController = async (req, res) => {
  try {
    const otp = req.body.otp;
    const otpData = await otpCollection.findOne({
      otp: otp,
      phone: req.body.phone,
      type: req.body.type,
    });

    let user = await userCollection.findOne({ phone: req.body.phone });
    if (!user) {
      user = await freelancerCollection.findOne({ phone: req.body.phone });
      if (!user) {
        user = await companyCollection.findOne({
          companyphone: req.body.phone,
        });
        if (!user || !otpData) {
          return res.sendStatus(403);
        }
      }
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

//Verify Email
async function verifyEmail(req, res) {
  try {
    let email;
    if (req.body.companyemail) {
      email = req.body.companyemail;
    } else {
      email = req.body.email;
    }
    let user, freelancer, company;
    user = await userCollection.findOne({ email: email });
    freelancer = await freelancerCollection.findOne({ email: email });
    company = await companyCollection.findOne({ companyemail: email });
    if (user || freelancer || company) {
      return res.status(404).json({ message: "Email already exists" });
    }
    res.status(200).json({ message: "New User" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

module.exports = {
  otpController,
  otpSignupController,
  VerifyFreelancerPhone,
  VerifyCompanyPhone,
  forgetOTPController,
  verifyEmail,
};
