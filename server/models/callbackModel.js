const mongoose = require("mongoose");

const callbackSchema = new mongoose.Schema({
  requestedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "freelancercollection",
    required: true,
  },
});

const callbackCollection = new mongoose.model(
  "callbackcollection",
  callbackSchema
);

module.exports = callbackCollection;
