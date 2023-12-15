const mongoose = require("mongoose");

const carrerSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    applicants: {
      type: [Object],
    },
  },
  {
    timestamps: true,
  }
);

const careerCollection = new mongoose.model("careercollection", carrerSchema);

module.exports = careerCollection;
