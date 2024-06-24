const mongoose = require("mongoose");

const leadsSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const leadsCollection = new mongoose.model("leadscollection", leadsSchema);

module.exports = leadsCollection;
