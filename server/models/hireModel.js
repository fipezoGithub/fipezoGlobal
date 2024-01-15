const mongoose = require("mongoose");

const hireSchema = new mongoose.Schema(
  {
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "freelancercollection",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usercollection",
    },
    freelancerDetails: {
      type: Object,
      required: true,
    },
    userDetails: {
      type: Object,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
    budget: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const hireCollection = mongoose.model("hirecollection", hireSchema);

module.exports = hireCollection;
