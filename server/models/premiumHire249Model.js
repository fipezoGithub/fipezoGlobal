const mongoose = require("mongoose");

const premiumHire249Schema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    freelancerCount: {
      type: Number,
      required: true,
    },
    freelancerLocation: {
      type: String,
      required: true,
    },
    freelancerCategory: {
      type: String,
      required: true,
    },
    minBudget: {
      type: Number,
      required: true,
    },
    maxBudget: { type: Number, required: true },
    requiredDate: { type: Date },
    description: { type: String, required: true },
    transactionId: { type: String, required: true },
    multipleCategory: { type: Boolean, required: true },
    completed: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const premiumHire249Collection = new mongoose.model(
  "premiumHire249collection",
  premiumHire249Schema
);

module.exports = premiumHire249Collection;
