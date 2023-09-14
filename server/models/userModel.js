const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    min: 10,
    unique: true,
    required: true
  },
  profilePicture: {
    type: String,
  }
},
  {
    timestamps: true
  }
);

const userCollection = new mongoose.model('usercollection', userSchema);

module.exports = userCollection;