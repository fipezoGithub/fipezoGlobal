const mongoose = require("mongoose");

const premiumHireSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usercollection",
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companycollection",
    },
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "freelancercollection",
    },
    fullName: {
      type: String,
      required: true,
    },
    hired_freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "freelancercollection",
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: { type: Number, required: true },
    reuireDate: {
      type: Date,
      required: true,
    },
    budget: { type: Number, required: true },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    status: { type: String, required: true },
    transactionId: { type: String, required: true },
    freelancer_status: {
      type: String,
    },
  },
  { timestamps: true }
);

const premiumHireCollection = mongoose.model(
  "premiumhirecollection",
  premiumHireSchema
);

module.exports = premiumHireCollection;
