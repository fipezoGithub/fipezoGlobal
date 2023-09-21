const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      min: 10,
      unique: true,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    createdReferalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "refercollection",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const userCollection = new mongoose.model("usercollection", userSchema);

module.exports = userCollection;
