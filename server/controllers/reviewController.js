const reviewCollection = require("../models/reviewModel");
const jwt = require("jsonwebtoken");
const userCollection = require("../models/userModel");
const freelancerCollection = require("../models/freelancerModel");
const companyCollection = require("../models/companyModel");
const secret = process.env.JWT_SECRET;

async function addReview(req, res) {
  try {
    jwt.verify(req.token, secret, async (err, authData) => {
      if (err) {
        res.status(403).send("Forbidden");
        return;
      }

      let user;
      if (authData.user.companyname)
        user = await companyCollection.findOne({ _id: authData.user._id });
      else user = await userCollection.findOne({ _id: authData.user._id });

      if (!user) {
        res.status(403).send("User not found");
        return;
      }

      if (
        !req.body.freelancer ||
        !req.body.title ||
        !req.body.review ||
        !req.body.stars
      ) {
        res.status(400).send("Bad request");
        return;
      }

      if (req.body.freelancer === authData.user._id) {
        res.status(400).send("You cannot review yourself");
        return;
      }

      const existingReview = await reviewCollection.findOne({
        freelancer: req.body.freelancer,
        user: authData.user._id,
      });
      if (existingReview) {
        res.send({ message: "Review already exists" });
        return;
      }

      const reviewData = new reviewCollection({
        freelancer: req.body.freelancer,
        user: authData.user._id,
        userDetails: authData.user,
        title: req.body.title,
        review: req.body.review,
        stars: req.body.stars,
      });

      const postData = await reviewData.save();

      const reviews = await reviewCollection.find({
        freelancer: req.body.freelancer,
      });
      let totalStars = 0;
      reviews.forEach((review) => {
        totalStars += review.stars;
      });
      const avgStars = totalStars / reviews.length;
      const freelancer = await freelancerCollection.findOne({
        _id: req.body.freelancer,
      });
      await freelancerCollection.findByIdAndUpdate(req.body.freelancer, {
        rating: avgStars,
        reviewCount: reviews.length,
      });
      // freelancer.rating = avgStars;
      // freelancer.reviewCount = reviews.length;
      // await freelancer.save();

      res.send(postData);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}

async function getReviews(req, res) {
  try {
    const reviews = await reviewCollection
      .find({ freelancer: req.params.id })
      .populate("freelancer")
      .exec();
    res.send(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}

async function updateReviews(req, res) {
  try {
    jwt.verify(req.token, secret, async (err, authData) => {
      if (err) {
        res.status(403).send("Forbidden");
        return;
      }
      let user;
      if (authData.user.companyname)
        user = await companyCollection.findOne({ _id: authData.user._id });
      else user = await userCollection.findOne({ _id: authData.user._id });

      if (!user) {
        res.status(403).send("User not found");
        return;
      }

      if (req.body.freelancer === authData.user._id) {
        res.status(400).send("You cannot review yourself");
        return;
      }

      const existingReview = await reviewCollection.findOne({
        _id: req.params.id,
      });
      if (!existingReview) {
        res.status(400).send("review not found");
        return;
      }
      const postData = await reviewCollection.updateOne(
        { _id: req.params.id },
        {
          title: req.body.title,
          review: req.body.review,
          stars: req.body.stars,
        }
      );

      const reviews = await reviewCollection.find({
        freelancer: existingReview.freelancer,
      });
      let totalStars = 0;
      reviews.forEach((review) => {
        totalStars += review.stars;
      });
      const avgStars = totalStars / reviews.length;
      const freelancer = await freelancerCollection.findOne({
        _id: existingReview.freelancer,
      });
      freelancer.rating = avgStars;
      freelancer.reviewCount = reviews.length;
      await freelancer.save();

      res.send(postData);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}

async function addReviewReply(req, res) {
  try {
    jwt.verify(req.token, secret, async (err, authData) => {
      const review = await reviewCollection.findById(req.params.reviewId);
      if (err || !review) {
        res.status(403).send("Forbidden");
        return;
      }

      if (!req.body.reply) {
        res.status(400).send("Bad request");
        return;
      }

      const reply = await reviewCollection.findByIdAndUpdate(review._id, {
        reply: req.body.reply,
      });

      res.status(200).send(reply);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}

async function likeReview(req, res) {
  try {
    jwt.verify(req.token, secret, async (err, authData) => {
      let user;
      if (req.body.type === "user") {
        user = await userCollection.findById(authData.user._id);
      } else {
        user = await companyCollection.findById(authData.user._id);
      }
      if (err || !user) {
        res.status(404).send("Not logged in");
        return;
      }
      let liked;
      if (user.companyname) {
        liked = await reviewCollection.findByIdAndUpdate(req.params.reviewId, {
          $push: {
            likedcompany: user._id,
          },
        });
      } else {
        liked = await reviewCollection.findByIdAndUpdate(req.params.reviewId, {
          $push: {
            likeduser: user._id,
          },
        });
      }
      const review = await reviewCollection.findById(req.params.reviewId);
      res.status(200).json(review);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}

module.exports = {
  addReview,
  getReviews,
  updateReviews,
  addReviewReply,
  likeReview,
};
