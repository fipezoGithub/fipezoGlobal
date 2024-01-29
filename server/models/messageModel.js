const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    messageId: {
      type: String,
      required: true,
      unique: true,
    },
    messages: {
      type: [Object],
      required: true,
    },
    freelancer: {
      type: mongoose.Types.ObjectId,
      ref: "freelancercollection",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "usercollection",
    },
    company: {
      type: mongoose.Types.ObjectId,
      ref: "companycollection",
    },
  },
  { timestamps: true }
);

const messageCollection = new mongoose.model(
  "messagecollection",
  messageSchema
);

module.exports = messageCollection;
