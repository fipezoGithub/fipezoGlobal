const sharp = require("sharp");
const path = require("path");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const { uploadFile } = require("../middlewares/s3");
const blogCollection = require("../models/blogModel");
const userCollection = require("../models/userModel");
const companyCollection = require("../models/companyModel");
const { response } = require("express");

// Function to resize an image and return the path of the resized image
async function resizeImage(file, width, height) {
  const filename = path.parse(file.filename).name;
  const ext = ".webp";
  const resizedFilename = filename + "-" + width + "x" + height + ext;
  const outputPath = "uploads/" + resizedFilename;

  await sharp(file.path).toFormat("webp", { quality: 80 }).toFile(outputPath);

  return {
    filename: resizedFilename,
    path: outputPath,
  };
}

async function addBlog(req, res) {
  try {
    const resizedBlogImg = await resizeImage(req.file, 400, 300);
    const blogData = new blogCollection({
      uid: req.body.uid,
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      cover: resizedBlogImg.filename,
      metaDescriptions: req.body.metaDescriptions,
    });
    const newBlog = await blogData.save();
    const filePromises = [];
    filePromises.push(uploadFile(resizedBlogImg));

    await Promise.all(filePromises);

    await unlinkFile("uploads/" + req.file.filename);
    await unlinkFile(resizedBlogImg.path);
    res.status(201).json(newBlog);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function getAllBlogs(req, res) {
  try {
    const allBlogs = await blogCollection.find({});
    res.status(200).json(allBlogs);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function getBlogById(req, res) {
  try {
    const blog = await blogCollection.findOne({ uid: req.params.blogid });
    if (!blog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }
    res.status(200).json(blog);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function likeBlog(req, res) {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      let liker;
      if (req.query.type === "user") {
        liker = await userCollection.findById(authData.user._id);
      } else if (req.query.type === "freelancer") {
        liker = await freelancerCollection.findById(authData.user._id);
      } else {
        liker = await companyCollection.findById(authData.user._id);
      }
      if (err || !liker) {
        res.status(404).send("Couldn't find");
      }
      let blog;
      if (req.query.type === "user") {
        blog = await blogCollection.findByIdAndUpdate(req.params.blogid, {
          $push: {
            likeuser: liker._id,
          },
        });
      } else if (req.query.type === "freelancer") {
        blog = await blogCollection.findByIdAndUpdate(req.params.blogid, {
          $push: {
            likefreelancer: liker._id,
          },
        });
      } else {
        blog = await blogCollection.findByIdAndUpdate(req.params.blogid, {
          $push: {
            likecompany: liker._id,
          },
        });
      }
      res.status(200).json(blog);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function getBlogsByCategory(req, res) {
  try {
    const blogs = await blogCollection.find({ category: req.params.category });
    res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function getBlogsByTitle(req, res) {
  try {
    const blogs = await blogCollection
      .find({
        title: { $regex: ".*" + req.body.query + ".*", $options: "i" },
      })
      .exec();
    res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function viewCount(req, res) {
  try {
    const blog = await blogCollection.findById(req.body.id);
    if (!blog) {
      res.status(404).send("No blog found");
    }
    await blogCollection.findByIdAndUpdate(blog._id, { view: blog.view + 1 });
    res.status(200).send("View added successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  addBlog,
  getAllBlogs,
  getBlogById,
  likeBlog,
  getBlogsByCategory,
  getBlogsByTitle,
  viewCount,
};
