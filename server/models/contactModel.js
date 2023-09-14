const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  issue: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
},
  {
    timestamps: true
  }
);

const contactCollection = new mongoose.model('contactcollection', contactSchema);

module.exports = contactCollection;