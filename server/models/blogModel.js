const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    likeuser: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "usercollection",
      default: [],
    },
    likefreelancer: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "freelancercollection",
      default: [],
    },
    likecompany: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "companycollection",
      default: [],
    },
    view: {
      type: Number,
      default: 0,
    },
    metaDescriptions: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const blogCollection = new mongoose.model("blogcollection", blogSchema);

module.exports = blogCollection;
