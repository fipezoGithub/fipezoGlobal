const mongoose = require("mongoose");

const referSchema = new mongoose.Schema({
  referUid: {
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
  acceptedFreelancer: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "freelancercollection",
    default: [],
  },
});

const referCollection = new mongoose.model("refercollection", referSchema);

module.exports = referCollection;
