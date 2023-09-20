const jwt = require("jsonwebtoken");
const feedCollection = require("../models/feedModel");
const commentCollection = require("../models/commentModel");
const freelancerCollection = require("../models/freelancerModel");

// Add Comment
async function addComment(req, res) {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      const freelancerData = await freelancerCollection.findOne({
        _id: authData.user._id,
      });
      if (err || !freelancerData) {
        return;
      } else {
        const feed = await feedCollection.findById(req.body.feedId);
        if (!feed) {
          res.status(404).send("No feed found");
        } else {
          const commentData = new commentCollection({
            freelancer: freelancerData._id,
            description: req.body.description,
            feed: feed._id,
            date: req.body.date,
          });
          const newcomment = await commentData.save();
          await feedCollection.findByIdAndUpdate(feed._id, {
            $push: { comment: newcomment._id },
          });
          const comment = await commentCollection
            .findById(newcomment._id)
            .populate("freelancer");
          res.status(201).json(comment);
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}
// Edit comment
async function editComment(req, res) {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      const freelancer = await freelancerCollection.findById(authData.user._id);
      if (err || !freelancer) {
        return;
      } else {
        const comment = await commentCollection.findByIdAndUpdate(
          req.params.commentId,
          {
            description: req.body.description,
          }
        );
        res.status(200).json(comment);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}
//Get comments of a Post
async function getCommentsOfPost(req, res) {
  try {
    const comments = await commentCollection
      .find({ feed: req.params.feedId })
      .populate("freelancer");
    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}
//Delete comment
async function deleteComment(req, res) {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      const freelancer = await freelancerCollection.findById(authData.user._id);
      if (err || !freelancer) {
        return;
      } else {
        const comment = await commentCollection.findById(req.params.commentId);
        const deleteComment = await commentCollection.findByIdAndDelete(
          req.params.commentId
        );
        if (deleteComment) {
          await feedCollection.findByIdAndUpdate(comment.feed, {
            $pull: {
              comment: comment._id,
            },
          });
          res.status(200).send("delete comment successfully");
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}
module.exports = {
  addComment,
  editComment,
  deleteComment,
  getCommentsOfPost,
};
