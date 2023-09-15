// Importing modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db/db");
const {
  signupController,
  loginController,
  getUserProfile,
  editUserProfile,
  getProfile,
  getNavbar,
  deleteUserProfile,
} = require("./controllers/userController");
const {
  otpController,
  otpSignupController,
  VerifyFreelancerPhone,
  VerifyCompanyPhone,
} = require("./controllers/otpController");
const {
  registerCompany,
  editCompanyProfile,
  deleteCompanyProfile,
  getUnCompanyProfiles,
  deleteCompanyProfileV,
  verifyCompanyProfile,
  getCompanyProfile,
  getCompanyProfiles,
  getCompanyProfileByUID,
  getCompanyByName,
} = require("./controllers/companyController");
const {
  registerFreelancer,
  getFreelancerProfile,
  getFreelancerProfiles,
  getUnFreelancerProfiles,
  deleteFreelancerProfile,
  verifyFreelancerProfile,
  getFeaturedFreelancerProfiles,
  editFreelancerProfile,
  followProfile,
  unFollowProfile,
  getFollowers,
  getFollowing,
  getProfileByID,
  getFreelancerByName,
  getFollowedCompanies,
  followCompany,
  unfollowCompany,
  getFeedOfFreelancer,
  editFreelancerCoverPicture,
} = require("./controllers/freelancerController");
const {
  contactUs,
  fetchContactUs,
  notifyEmail,
} = require("./controllers/contactController");
const {
  addHire,
  getHires,
  getRequests,
  cancelRequest,
  deleteRequest,
  acceptRequest,
} = require("./controllers/hireController");
const jwt = require("jsonwebtoken");
const {
  addReview,
  getReviews,
  updateReviews,
} = require("./controllers/reviewController");
const secret = process.env.JWT_SECRET;
const verifyToken = require("./middlewares/verification");

// Creating the app
const app = express();

// Setting up the middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
const upload = require("./middlewares/storage");
const userProfilePic = require("./middlewares/userProfilePic");
const companyUpload = require("./middlewares/companyUpload");
const companyEditUpload = require("./middlewares/companyEditUpload");
const { get } = require("mongoose");
const userCollection = require("./models/userModel");
const { getFileStream } = require("./middlewares/s3");
const {
  addFeed,
  loveFeed,
  unLoveFeed,
  getFeed,
  getFeedById,
  editFeed,
  deleteFeed,
} = require("./controllers/feedControler");
const feedPostImage = require("./middlewares/feedPostImage");

// Setting up the routes
app.post("/api/signup", signupController);
app.post("/api/login", loginController);
app.post("/api/otp", otpController);
app.post("/api/otp/signup", otpSignupController);
app.post("/api/register/freelancer", upload, verifyToken, registerFreelancer);
app.post("/api/register/company", companyUpload, verifyToken, registerCompany);
app.post("/api/login/company", getCompanyProfile);
app.get("/api/profiles/verified/companies", getCompanyProfiles);
app.post("/api/verify/freelancer/phone", VerifyFreelancerPhone);
app.post("/api/verify/company/phone", VerifyCompanyPhone);
app.get("/api/profile/freelancer/:uid", getFreelancerProfile);
app.get("/api/profile/company/:uid", getCompanyProfileByUID);
app.get("/api/freelancer/profile-details/:id", getProfileByID);
app.post("/api/freelancer/search", getFreelancerByName);
app.post("/api/company/search", getCompanyByName);
app.get("/api/profiles/verified/freelancer", getFreelancerProfiles);
app.get("/api/profiles/featured/freelancer", getFeaturedFreelancerProfiles);
app.post("/api/feed/add", feedPostImage, verifyToken, addFeed);
app.get(
  "/api/profiles/unverified/freelancer",
  verifyToken,
  getUnFreelancerProfiles
);
app.get("/api/profiles/unverified/company", verifyToken, getUnCompanyProfiles);
app.get("/api/contact/messages", verifyToken, fetchContactUs);
app.get("/api/feeds", getFeed);
app.delete("/api/delete/freelancer/:id", deleteFreelancerProfile);
app.put("/api/edit/freelancer/:id", verifyToken, editFreelancerProfile);
app.put(
  "/api/update/freelancer/cover",
  upload,
  verifyToken,
  editFreelancerCoverPicture
);
app.put("/api/follow/freelancer", verifyToken, followProfile);
app.put("/api/unfollow/freelancer", verifyToken, unFollowProfile);
app.put("/api/follow/company", verifyToken, followCompany);
app.put("/api/unfollow/company", verifyToken, unfollowCompany);
app.put("/api/love/:feedId", verifyToken, loveFeed);
app.put("/api/unlove/:feedId", verifyToken, unLoveFeed);
app.get("/api/freelancer/followers/:id", getFollowers);
app.get("/api/freelancer/followedcompanies/:id", getFollowedCompanies);
app.get("/api/freelancer/following/:id", getFollowing);
app.get("/api/feed/:id", getFeedById);
app.get("/api/profile/feed", verifyToken, getFeedOfFreelancer);
app.delete("/api/delete/company/:id", deleteCompanyProfileV);
app.delete("/api/profile/user/delete", verifyToken, deleteUserProfile);
app.delete("/api/profile/company/delete", verifyToken, deleteCompanyProfile);
app.delete("/api/delete/request/:id", verifyToken, deleteRequest);
app.put("/api/accept/request/:id", verifyToken, acceptRequest);
app.put("/api/cancel/request/:id", verifyToken, cancelRequest);
app.put("/api/verify/freelancer/:id", verifyFreelancerProfile);
app.put("/api/verify/company/:id", verifyCompanyProfile);
app.post("/api/contact", contactUs);
app.get("/api/profile/user", verifyToken, getUserProfile);
app.get("/api/navbar", verifyToken, getNavbar);
app.post("/api/add/review", verifyToken, addReview);
app.put("/api/edit/reviews/:id", verifyToken, updateReviews);
app.get("/api/reviews/:id", getReviews);
app.post("/api/add/hire", verifyToken, addHire);
app.post("/api/notify", notifyEmail);
app.put("/api/profile/user/edit", userProfilePic, verifyToken, editUserProfile);
app.put(
  "/api/profile/company/edit",
  companyEditUpload,
  verifyToken,
  editCompanyProfile
);
app.put("/api/edit/feed/:id", editFeed);
app.delete("/api/delete/feed/:id", verifyToken, deleteFeed);
app.get("/api/profile", verifyToken, getProfile);
app.get("/api/hires", verifyToken, getHires);
app.get("/api/requests", verifyToken, getRequests);

app.get("/api/images/:key", async (req, res) => {
  const key = req.params.key;
  try {
    const readStream = await getFileStream(key);
    readStream.pipe(res);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api", (req, res) => {
  res.send("Hello From Fipezo Server");
});

const ip = "0.0.0.0";

// Starting the server
const port = process.env.PORT || 3000;
app.listen(port, ip, () => console.log(`Server started on port ${port}`));
