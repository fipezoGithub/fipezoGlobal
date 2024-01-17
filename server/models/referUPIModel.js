const mongoose = require("mongoose");
const referUPISchema = new mongoose.Schema(
  {
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "freelancercollection",
      required: true,
    },
    upiId: {
      type: String,
      required: true,
    },
    paymentStatus: { type: String, required: true },
  },
  { timestamps: true }
);

const referUPICollection = new mongoose.model(
  "referUPIcollection",
  referUPISchema
);

module.exports = referUPICollection;
