const jwt = require("jsonwebtoken");
const notificationCollection = require("../models/notificationModel");
const secret = process.env.JWT_SECRET;

async function createNotification(req, res) {
  try {
    const notification = new notificationCollection({
      type: req.body.type,
      headline: req.body.headline,
      accepted: req.body.accepted,
      href: req.body.href,
    });
    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    console.log(error);
    res.status(404).send("Internal Server Error");
  }
}

async function getNotificationOfUser(req, res) {
  try {
    const notifications = await notificationCollection.find({
      accepted: req.params.userId,
    });
    res.status(201).json(notifications);
  } catch (error) {
    console.log(error);
    res.status(404).send("Internal Server Error");
  }
}

module.exports = { createNotification, getNotificationOfUser };

