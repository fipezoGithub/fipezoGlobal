const jwt = require("jsonwebtoken");
const notificationCollection = require("../models/notificationModel");
const secret = process.env.JWT_SECRET;

async function createNotification(req, res) {
  try {
    const notification = new notificationCollection({
      type: req.body.type,
      headline: req.body.headline,
      acceptedFreelancer: req.body.acceptedFreelancer || null,
      acceptedUser: req.body.acceptedUser || null,
      acceptedCompany: req.body.acceptedCompany || null,
      sentFreelancer: req.body.sentFreelancer || null,
      sentUser: req.body.sentUser || null,
      sentCompany: req.body.sentCompany || null,
      href: req.body.href,
      seen: false,
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
    let notifications;
    if (req.query.type === "freelancer") {
      notifications = await notificationCollection
        .find({
          acceptedFreelancer: req.params.userId,
        })
        .populate("acceptedFreelancer")
        .populate("sentFreelancer")
        .populate("sentUser")
        .populate("sentCompany")
        .exec();
    } else if (req.query.type === "user") {
      notifications = await notificationCollection
        .find({
          acceptedUser: req.params.userId,
        })
        .populate("acceptedUser")
        .populate("sentFreelancer")
        .populate("sentUser")
        .populate("sentCompany")
        .exec();
    } else {
      notifications = await notificationCollection
        .find({
          acceptedCompany: req.params.userId,
        })
        .populate("acceptedCompany")
        .populate("sentFreelancer")
        .populate("sentUser")
        .populate("sentCompany")
        .exec();
    }
    res.status(200).json(notifications);
  } catch (error) {
    console.log(error);
    res.status(404).send("Internal Server Error");
  }
}

async function seeNotifications(req, res) {
  try {
    const notification = await notificationCollection.findById(req.params.id);
    if (!notification) {
      res.status(404).send("Notification Not Found");
    } else {
      const seenNotification = await notificationCollection.findByIdAndUpdate(
        notification._id,
        {
          seen: true,
        }
      );
      res.status(200).json(seenNotification);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function seenAllNotifications(req, res) {
  let notifications;
  if (req.query.type === "freelancer") {
    notifications = await notificationCollection
      .updateMany(
        {
          acceptedFreelancer: req.params.userId,
          seen: false,
        },
        { $set: { seen: true } }
      )
      .populate("acceptedFreelancer")
      .populate("sentFreelancer")
      .populate("sentUser")
      .populate("sentCompany")
      .exec();
  } else if (req.query.type === "user") {
    notifications = await notificationCollection
      .find(
        {
          acceptedUser: req.params.userId,
          seen: false,
        },
        { $set: { seen: true } }
      )
      .populate("acceptedUser")
      .populate("sentFreelancer")
      .populate("sentUser")
      .populate("sentCompany")
      .exec();
  } else {
    notifications = await notificationCollection
      .find(
        {
          acceptedCompany: req.params.userId,
          seen: false,
        },
        { $set: { seen: true } }
      )
      .populate("acceptedCompany")
      .populate("sentFreelancer")
      .populate("sentUser")
      .populate("sentCompany")
      .exec();
  }
  getNotificationOfUser(req, res);
}

module.exports = {
  createNotification,
  getNotificationOfUser,
  seeNotifications,
  seenAllNotifications,
};
