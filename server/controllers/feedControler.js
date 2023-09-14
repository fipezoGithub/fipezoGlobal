const sharp = require("sharp");
const path = require("path");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const feedCollection = require("../models/feedModel");
const freelancerCollection = require("../models/freelancerModel");
const { uploadFile } = require("../middlewares/s3");

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

//Add Feed

async function addFeed(req, res) {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      const freelancerData = await freelancerCollection.findOne({
        _id: authData.user._id,
      });
      if (err && !freelancerData) {
        return;
      } else {
        const user = await freelancerCollection.findOne({
          _id: authData.user._id,
        });
        if (user) {
          let resizedPostData;
          let feedData;
          if (req.file) {
            resizedPostData = await resizeImage(req.file, 400, 300);
            feedData = new feedCollection({
              freelancer: user._id,
              description: req.body.description,
              postData: resizedPostData.filename,
              love: [],
              date: req.body.date,
            });
            await feedData.save();
          } else {
            feedData = new feedCollection({
              freelancer: user._id,
              description: req.body.description,
              postData: req.body.postData,
              love: [],
              date: req.body.date,
            });
            await feedData.save();
          }
          if (resizedPostData !== undefined) {
            const filePromises = [];
            filePromises.push(uploadFile(resizedPostData));

            await Promise.all(filePromises);

            await unlinkFile("uploads/" + req.file.filename);
            await unlinkFile(resizedPostData.path);
          }
          res.status(201).json(feedData);
        } else {
          res.status(404).json({ message: "not logged in" });
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}
//Get Feed
async function getFeed(req, res) {
  try {
    const feeds = await feedCollection.find({}).populate("freelancer");
    res.status(200).json(feeds);
  } catch (error) {
    res.status(500).send("Internal server error");
    console.log(error);
  }
}
// Love Feed
async function loveFeed(req, res) {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      const freelancerData = await freelancerCollection.findOne({
        _id: authData.user._id,
      });
      if (err && !freelancerData) {
        return;
      } else {
        const user = await freelancerCollection.findOne({
          _id: authData.user._id,
        });
        if (user) {
          await feedCollection.updateOne(
            { _id: req.params.feedId },
            {
              $push: {
                love: user._id,
              },
            }
          );
          res.send({ message: `love successfully ${req.params.feedId}` });
        } else {
          res.sendStatus(403);
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}
//Unlove Feed
async function unLoveFeed(req, res) {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      const freelancerData = await freelancerCollection.findOne({
        _id: authData.user._id,
      });
      if (err && !freelancerData) {
        return;
      } else {
        const user = await freelancerCollection.findOne({
          _id: authData.user._id,
        });
        if (user) {
          await feedCollection.updateOne(
            { _id: req.params.feedId },
            {
              $pull: {
                love: user._id,
              },
            }
          );
          res.send({ message: `unlove successfully ${req.params.feedId}` });
        } else {
          res.sendStatus(403);
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}
module.exports = {
  addFeed,
  getFeed,
  loveFeed,
  unLoveFeed,
};
