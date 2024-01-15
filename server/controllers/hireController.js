const hireCollection = require("../models/hireModel");
const jwt = require("jsonwebtoken");
const userCollection = require("../models/userModel");
const freelancerCollection = require("../models/freelancerModel");
const companyCollection = require("../models/companyModel");
const secret = process.env.JWT_SECRET;
const twilio = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function addHire(req, res) {
  try {
    jwt.verify(req.token, secret, async (err, authData) => {
      let user;
      if (authData.user.companyname)
        user = await companyCollection.findOne({ _id: authData.user._id });
      else user = await userCollection.findOne({ _id: authData.user._id });

      if (
        err ||
        !user ||
        authData.user._id === req.body.freelancer ||
        authData.user.verified === false
      ) {
        res.sendStatus(403);
        return;
      }

      let phone;
      if (authData.user.companyname) phone = user.companyphone;
      else phone = user.phone;

      let name;
      if (authData.user.companyname) name = user.companyname;
      else name = user.firstname + " " + user.lastname;

      if (
        !req.body.freelancer ||
        !req.body.fullname ||
        !req.body.description ||
        !phone ||
        !req.body.address ||
        !req.body.budget
      ) {
        res.status(400).send("Bad request");
        return;
      }

      const freelancerDetails = await freelancerCollection.findById(
        req.body.freelancer
      );

      const hireData = new hireCollection({
        freelancer: req.body.freelancer,
        user: authData.user._id,
        freelancerDetails: freelancerDetails,
        userDetails: authData.user,
        fullname: req.body.fullname,
        description: req.body.description,
        address: req.body.address,
        phone: phone,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        budget: req.body.budget,
        status: "pending",
      });

      const postData = await hireData.save();

      sendTextMessage(
        freelancerDetails.phone,
        `You have a new hire request from ${name}. Click here to view details: https://fipezo.com/my_requests`
      );

      res.send(postData);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}

async function getHires(req, res) {
  try {
    jwt.verify(req.token, secret, async (err, authData) => {
      if (err) {
        res.sendStatus(403);
        return;
      }

      let user;
      if (authData.user.companyname)
        user = await companyCollection.findOne({ _id: authData.user._id });
      else user = await userCollection.findOne({ _id: authData.user._id });

      if (!user) {
        res.status(404).send("User not found");
        return;
      }

      const hireData = await hireCollection.find({ user: authData.user._id });

      res.send(hireData);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}

async function getRequests(req, res) {
  try {
    jwt.verify(req.token, secret, async (err, authData) => {
      if (err) {
        console.log(err);
        res.sendStatus(403);
        return;
      }

      const user = await freelancerCollection.findOne({
        _id: authData.user._id,
      });

      if (!user) {
        res.status(404).send("User not found");
        return;
      }

      const hireData = await hireCollection.find({
        freelancer: authData.user._id,
      });

      res.send(hireData);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}

async function cancelRequest(req, res) {
  try {
    jwt.verify(req.token, secret, async (err, authData) => {
      if (err) {
        res.sendStatus(403);
        return;
      }

      const hireData = await hireCollection.findOne({ _id: req.params.id });

      if (!hireData) {
        res.status(404).send("Hire not found");
        return;
      }

      if (hireData.freelancer._id != authData.user._id) {
        res.status(403).send("Forbidden");
        return;
      }

      await hireCollection.updateOne(
        { _id: req.params.id },
        { $set: { status: "declined" } }
      );

      res.json({ success: true });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}

async function deleteRequest(req, res) {
  try {
    jwt.verify(req.token, secret, async (err, authData) => {
      if (err) {
        res.sendStatus(403);
        return;
      }

      const hireData = await hireCollection.findOne({ _id: req.params.id });

      if (!hireData) {
        res.status(404).send("Hire not found");
        return;
      }

      if (hireData.user._id != authData.user._id) {
        res.status(403).send("Forbidden");
        return;
      }

      await hireCollection.deleteOne({ _id: req.params.id });

      sendTextMessage(
        hireData.freelancerDetails.phone,
        `Your hire request from ${hireData.userDetails.firstname} ${hireData.userDetails.lastname} has been declinded. Feel free to hire other freelancers from https://fipezo.com/explore`
      );

      res.json({ success: true });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}

async function acceptRequest(req, res) {
  try {
    jwt.verify(req.token, secret, async (err, authData) => {
      if (err) {
        res.sendStatus(403);
        return;
      }

      const hireData = await hireCollection.findOne({ _id: req.params.id });

      if (!hireData) {
        res.status(404).send("Hire not found");
        return;
      }

      if (hireData.freelancer._id != authData.user._id) {
        res.status(403).send("Forbidden");
        return;
      }

      await hireCollection.updateOne(
        { _id: req.params.id },
        { $set: { status: "accepted" } }
      );

      sendTextMessage(
        hireData.userDetails.phone,
        `Your hire request has been accepted by ${hireData.freelancerDetails.firstname} ${hireData.freelancerDetails.lastname}. Click here to view details: https://fipezo.com/my_hires`
      );

      res.json({ success: true });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}

function sendTextMessage(phoneNumber, message) {
  if (process.env.CLIENT_URL !== "http://localhost:3001") {
    phoneNumber = "+91" + phoneNumber.toString();
    twilio.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });
  }
}

module.exports = {
  addHire,
  getHires,
  getRequests,
  cancelRequest,
  deleteRequest,
  acceptRequest,
};
