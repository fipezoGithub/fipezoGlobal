const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    acceptedFreelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "freelancercollection",
    },
    acceptedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usercollection",
    },
    acceptedCompany: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companycollection",
    },
    sentFreelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "freelancercollection",
    },
    sentUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usercollection",
    },
    sentCompany: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companycollection",
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
  },
  {
    timestamps: true,
  }
);

const notificationCollection = new mongoose.model(
  "notificationcollection",
  notificationSchema
);

module.exports = notificationCollection;
