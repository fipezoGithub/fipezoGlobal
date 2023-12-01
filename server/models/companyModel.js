const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const companySchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    companyname: {
      type: String,
      required: true,
    },
    companyphone: {
      type: Number,
      required: true,
      unique: true,
    },
    companyemail: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    companytype: {
      type: String,
      required: true,
    },
    companyaddress: {
      type: Object,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      required: true,
    },
    coverPicture: {
      type: String,
      required: true,
    },
    panCard: {
      type: String,
      default: null,
    },
    jobPosted: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "jobscollection",
      default: [],
    },
    incorporationCertificate: {
      type: String,
      default: null,
    },
    msmeCertificate: {
      type: String,
      default: null,
    },
    tradeLiecence: {
      type: String,
      default: null,
    },
    followers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "freelancercollection",
    },
    links: {
      type: Object,
      required: true,
    },
    works: {
      type: [String],
      required: true,
    },
    termsAndConditions: {
      type: Boolean,
      required: true,
    },
    verified: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
companySchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

companySchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
const companyCollection = new mongoose.model(
  "companycollection",
  companySchema
);

module.exports = companyCollection;
