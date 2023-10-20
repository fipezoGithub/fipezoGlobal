const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  freelancer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "freelancercollection",
    required: true,
  },
  screenshot: {
    type: String,
    required: true,
  },
});

const paymentCollection = new mongoose.model(
  "paymentcollection",
  paymentSchema
);

module.exports = paymentCollection;
