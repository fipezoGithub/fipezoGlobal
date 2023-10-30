const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const freelancerSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
    },
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
    location: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    equipments: {
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
    aadhaarCard: {
      type: String,
    },
    panCard: {
      type: String,
    },
    works: {
      type: [String],
      required: true,
    },
    following: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "freelancercollection",
    },
    followers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "freelancercollection",
    },
    followedCompanies: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "companycollection",
    },
    feeds: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "feedcollection",
    },
    pictureStyle: {
      type: Object,
    },
    links: {
      type: Object,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    reviewCount: {
      type: Number,
      required: true,
    },
    termsAndConditions: {
      type: Boolean,
      required: true,
    },
    featured: {
      type: Boolean,
      required: true,
    },
    createdReferalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "refercollection",
      default: null,
    },
    joinByRefaralId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "freelancercollection",
    },
    usedReferalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "refercollection",
      default: null,
    },
    appliedJob: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "jobscollection",
      default: [],
    },
    hiredJob: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "jobscollection",
      default: [],
    },
    verified: {
      type: Boolean,
      required: true,
    },
    loveCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
freelancerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

freelancerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
const freelancerCollection = new mongoose.model(
  "freelancercollection",
  freelancerSchema
);

module.exports = freelancerCollection;
