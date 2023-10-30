const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "freelancercollection",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usercollection",
    },
    userDetails: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    stars: {
      type: Number,
      required: true,
    },
    reply: {
      type: String,
    },
    likeduser: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "usercollection",
    },
    likedcompany: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "companycollection",
    },
  },
  {
    timestamps: true,
  }
);

const reviewCollection = mongoose.model("reviewcollection", reviewSchema);

module.exports = reviewCollection;
