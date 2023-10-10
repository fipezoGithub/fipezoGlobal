const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
    vacancy: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    dueDate: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    eventTime: {
      type: Object,
    },
    eventType: {
      type: String,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    createdCompany: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companycollection",
      required: true,
    },
    appliedFreelancers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "freelancercollection",
      default: [],
    },
    hiredFreelancers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "freelancercollection",
      default: [],
    },
    rejectedFreelancers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "freelancercollection",
      default: [],
    },
  },
  { timestamps: true }
);

const jobsCollection = new mongoose.model("jobscollection", jobsSchema);

module.exports = jobsCollection;
