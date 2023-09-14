const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: false
  },
  device: {
    type: String,
    required: true
  }
},
  {
    timestamps: true
  }
);

const emailCollection = new mongoose.model('emailcollection', emailSchema);

module.exports = emailCollection;