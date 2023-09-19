const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "freelancercollection",
    },
    description: {
      type: String,
    },
    feed: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "feedcollection",
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

const commentCollection = mongoose.model("commentcollection", commentSchema);

module.exports = commentCollection;
