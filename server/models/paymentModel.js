const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "freelancercollection",
      required: true,
    },
    paymentPack: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const paymentCollection = new mongoose.model(
  "paymentcollection",
  paymentSchema
);

module.exports = paymentCollection;
