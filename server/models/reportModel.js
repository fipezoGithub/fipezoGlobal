const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    relatedType: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      required: true,
    },
    createdFreelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "freelancercollection",
      default: null,
    },
    createdUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usercollection",
      default: null,
    },
    createdCompany: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companycollection",
      default: null,
    },
    acceptedFreelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "freelancercollection",
    },
  },
  { timestamps: true }
);

const reportCollection = new mongoose.model("reportcollection", reportSchema);

module.exports = reportCollection;
