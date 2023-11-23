const mongoose = require("mongoose");

const requestCitySchema = new mongoose.Schema(
  {
    phone: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const requestCityCollection = new mongoose.model(
  "requestcitycollection",
  requestCitySchema
);

module.exports = requestCityCollection;
