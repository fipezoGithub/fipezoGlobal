const mongoose = require("mongoose");

const feedSchema = new mongoose.Schema(
  {
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "freelancercollection",
    },
    description: {
      type: String,
    },
    postData: {
      type: String,
      required: true,
    },
    love: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "freelancercollection",
    },
    share: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "freelancercollection",
    },
    comment: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "commentcollection",
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const feedCollection = mongoose.model("feedcollection", feedSchema);

module.exports = feedCollection;
