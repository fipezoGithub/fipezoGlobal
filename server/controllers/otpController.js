const userCollection = require("../models/userModel");
const freelancerCollection = require("../models/freelancerModel");
const companyCollection = require("../models/companyModel");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const otpCollection = require("../models/otpModel");
const referCollection = require("../models/referModel");
const { uploadFile } = require("../middlewares/s3");
const twilio = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const fs = require("fs");
const util = require("util");
const leadsCollection = require("../models/leadsModel");
const unlinkFile = util.promisify(fs.unlink);

async function sendTextMessage(phoneNumber, message) {
  if (process.env.CLIENT_URL !== "http://localhost:3001") {
    phoneNumber = "+91" + phoneNumber.toString();
    twilio.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });
  }
}

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

    let filePromises = [];
    if (req.file) {
      filePromises.push(uploadFile(req.file));
      await Promise.all(filePromises);

      await unlinkFile("uploads/" + req.file.filename);
    }

    if (otpCode === parseInt(otp)) {
      const userData = new userCollection({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        profilePicture: req.file?.filename || null,
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
    console.error(error.stack);
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

async function leadGenerateOTP(req, res) {
  try {
    let existingUser = await userCollection.findOne({ phone: req.body.phone });
    let existingFreelancer = await freelancerCollection.findOne({
      phone: req.body.phone,
    });
    let existingCompany = await companyCollection.findOne({
      companyphone: req.body.phone,
    });

    const existingLead = await leadsCollection.findOne({
      phone: req.body.phone,
    });

    if (existingUser || existingFreelancer || existingCompany || existingLead) {
      return res.sendStatus(403);
    }

    const existingOtpData = await otpCollection.findOne({
      phone: req.body.phone,
    });

    if (existingOtpData) {
      await otpCollection.deleteOne({ phone: req.body.phone });
    }
    const code = Math.floor(100000 + Math.random() * 900000);

    const otpData = new otpCollection({
      phone: req.body.phone,
      otp: code,
      type: "lead",
    });

    await otpData.save();

    await sendTextMessage(
      req.body.phone,
      `You are requesting for change your password.Your code is ${code} valid for 2 mins. Do not share this with anyone. -Team Fipezo
      +rGVCKNFWYy`
    );
    let otpTimer = setTimeout(async () => {
      try {
        await otpCollection.deleteOne({ phone: req.body.phone });
      } catch (error) {
        console.error("Error deleting OTP:", error);
      }
    }, 300000);
    res.status(200).json({ phone: req.body.phone, type: "lead" });
  } catch (error) {
    console.error(error);
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
  leadGenerateOTP,
};
