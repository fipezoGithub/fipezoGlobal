const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  accepted: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "freelancercollection",
    required: true,
  },
  headline: {
    type: String,
    required: true,
  },
  seen: {
    type: Boolean,
    required: true,
  },
  href: {
    type: String,
  },
});

const notificationCollection = new mongoose.model(
  "notificationcollection",
  notificationSchema
);

module.exports = notificationCollection;
