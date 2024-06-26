// Importing modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db/db");
const nodeCron = require("node-cron");
const {
  signupController,
  loginController,
  getUserProfile,
  editUserProfile,
  getProfile,
  getNavbar,
  deleteUserProfile,
  emailLoginController,
  forgetController,
  updateUserPassword,
  googleLoginController,
  getChatRoomsOfUsers,
  addFreelancerToWishlist,
  removeFreelancerToWishlist,
  getAllWishlistedFreelancers,
} = require("./controllers/userController");

const {
  otpController,
  otpSignupController,
  VerifyFreelancerPhone,
  VerifyCompanyPhone,
  forgetOTPController,
  verifyEmail,
  leadGenerateOTP,
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
  updateCompanyPassword,
  getCompanyByType,
  getChatRoomsOfCompany,
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
  updateFreelancerPassword,
  getJobsOfUser,
  likeProfile,
  verificationProfile,
  updateWork,
  getPaymentDetailsOFUser,
  getFreelancerProfilesByProfession,
  premiumWorkUpload,
  getNumberAndMail,
  getChatRoomsOfFreelancers,
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
  addReviewReply,
  likeReview,
} = require("./controllers/reviewController");

const secret = process.env.JWT_SECRET;
const verifyToken = require("./middlewares/verification");

// Creating the app
const app = express();

// Setting up the middleware

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
const upload = require("./middlewares/storage");
const userProfilePic = require("./middlewares/userProfilePic");
const companyUpload = require("./middlewares/companyUpload");
const companyEditUpload = require("./middlewares/companyEditUpload");
const { getFileStream } = require("./middlewares/s3");
const {
  addFeed,
  loveFeed,
  unLoveFeed,
  getFeed,
  getFeedById,
  editFeed,
  deleteFeed,
  shareFeed,
} = require("./controllers/feedControler");

const feedPostImage = require("./middlewares/feedPostImage");
const {
  addComment,
  editComment,
  deleteComment,
  getCommentsOfPost,
} = require("./controllers/commentController");

const {
  generateReferCode,
  getReferCodeByUser,
  getReferCodeByFreelancer,
} = require("./controllers/referControler");

const {
  createJob,
  applyJob,
  editJobDetails,
  deleteJob,
  getJobById,
  getJobByProfession,
  getAllJob,
  getPostedJobsOfUser,
  hiredFreelancers,
  rejectFreelancers,
  jobViewCount,
  getJobByLocation,
} = require("./controllers/jobController");
const {
  requestCallback,
  getAllCallback,
  deleteCallback,
} = require("./controllers/callbackController");
const {
  submitPayment,
  newPayment,
  checkPaymentDetails,
  getPaymentDetails,
  newPhonePayPayment,
} = require("./controllers/paymentController");
const {
  createNotification,
  getNotificationOfUser,
  seeNotifications,
  seenAllNotifications,
} = require("./controllers/notificationController");
const {
  addBlog,
  getAllBlogs,
  getBlogById,
  likeBlog,
  getBlogsByCategory,
  getBlogsByTitle,
  viewCount,
} = require("./controllers/blogController");
const blogCoverPic = require("./middlewares/blogCover");
const {
  requestCityRaise,
  getAllRequests,
  deleteCityRequest,
} = require("./controllers/requestController");
const {
  createReport,
  getAllReports,
  updateStatusReport,
} = require("./controllers/reportController");
const updatePortfolio = require("./middlewares/portFolioUpdate");
const {
  applyFipezoJob,
  deleteFipezoJobRequest,
  getAllFipezoJobRequest,
  createFipezoJob,
  getFipezoJobRequestById,
  getFipezoJobRequestByCategory,
  getAllApplications,
} = require("./controllers/carrerController");
const carrerCVUpoload = require("./middlewares/careerCV");
const freelancerCollection = require("./models/freelancerModel");
const {
  applyWithdrawl,
  getWithDrawlDetails,
  completeWithDrawl,
} = require("./controllers/referUPIController");
const notificationCollection = require("./models/notificationModel");
const { verify } = require("crypto");
const {
  getAllMessages,
  createMessageRoom,
  sendMessages,
  getChatRoomOfUser,
} = require("./controllers/messageController");
const messageCollection = require("./models/messageModel");
const {
  newPremiumHireRequest,
  getAllPendingRequest,
  changeStatusOfRequest,
  getUserPremiumHires,
  initializeRequestToFreelancer,
  getFreelancersRequest,
  freelancerHandel,
} = require("./controllers/premiumHireController");
const {
  addNewHireRequest,
  getAllHireRequests,
} = require("./controllers/premiumHire249Controller");
const {
  generateNewLead,
  getAllLeads,
  deleteALead,
} = require("./controllers/leadController");

// Setting up the routes

//Usercontroller Routes
app.post("/api/signup", signupController);
app.post("/api/login", loginController);
app.get("/api/profile/user", verifyToken, getUserProfile);
app.put("/api/profile/user/edit", userProfilePic, verifyToken, editUserProfile);
app.get("/api/profile", verifyToken, getProfile);
app.get("/api/navbar", verifyToken, getNavbar);
app.delete("/api/profile/user/delete", verifyToken, deleteUserProfile);
app.post("/api/email/login", emailLoginController);
app.post("/api/otp/forget-password/", forgetController);
app.put(
  "/api/profile/user/password/change",
  userProfilePic,
  verifyToken,
  updateUserPassword
);
app.post("/api/email/login/social", googleLoginController);
app.get("/api/user/allchats", verifyToken, getChatRoomsOfUsers);
app.put("/api/freelancer/wishlist/add", verifyToken, addFreelancerToWishlist);
app.put(
  "/api/freelancer/wishlist/remove",
  verifyToken,
  removeFreelancerToWishlist
);
app.get(
  "/api/freelancer/wishlist/all",
  verifyToken,
  getAllWishlistedFreelancers
);

//Otpcontroller Routes
app.post("/api/otp", otpController);
app.post("/api/verify/email", verifyEmail);
app.post("/api/otp/signup", userProfilePic, otpSignupController);
app.post("/api/verify/freelancer/phone", VerifyFreelancerPhone);
app.post("/api/verify/company/phone", VerifyCompanyPhone);
app.post("/api/forget-password/submitotp", forgetOTPController);
app.post("/api/lead/otp", leadGenerateOTP);

//CompanyController Routes
app.post("/api/register/company", companyUpload, verifyToken, registerCompany);
app.put(
  "/api/profile/company/edit",
  companyEditUpload,
  verifyToken,
  editCompanyProfile
);
app.delete("/api/profile/company/delete", verifyToken, deleteCompanyProfile);
app.get("/api/profiles/unverified/company", verifyToken, getUnCompanyProfiles);
app.delete("/api/delete/company/:id", deleteCompanyProfileV);
app.put("/api/verify/company/:id", verifyCompanyProfile);
app.post("/api/login/company", getCompanyProfile);
app.get("/api/profiles/verified/companies", getCompanyProfiles);
app.get("/api/profile/company/:uid", getCompanyProfileByUID);
app.post("/api/company/search", getCompanyByName);
app.put(
  "/api/profile/company/password/change",
  verifyToken,
  updateCompanyPassword
);
app.get("/api/profile/company/type/:type", getCompanyByType);
app.get("/api/company/allchats", verifyToken, getChatRoomsOfCompany);

//FreelancerController Routes
app.post("/api/register/freelancer", upload, verifyToken, registerFreelancer);
app.get("/api/profile/freelancer/:uid", getFreelancerProfile);
app.get("/api/profiles/verified/freelancer", getFreelancerProfiles);
app.get(
  "/api/profiles/unverified/freelancer",
  verifyToken,
  getUnFreelancerProfiles
);
app.delete("/api/delete/freelancer/:id", deleteFreelancerProfile);
app.put("/api/verify/freelancer/:id", verifyFreelancerProfile);
app.get("/api/profiles/featured/freelancer", getFeaturedFreelancerProfiles);
app.put("/api/edit/freelancer", upload, verifyToken, editFreelancerProfile);
app.put("/api/freelancer/verify", upload, verifyToken, verificationProfile);
app.put(
  "/api/freelancer/premiumupload",
  upload,
  verifyToken,
  premiumWorkUpload
);
app.put("/api/follow/freelancer", verifyToken, followProfile);
app.put("/api/unfollow/freelancer", verifyToken, unFollowProfile);
app.get("/api/freelancer/followers/:id", getFollowers);
app.get("/api/freelancer/following/:id", getFollowing);
app.get("/api/freelancer/profile-details/:id", getProfileByID);
app.post("/api/freelancer/search", getFreelancerByName);
app.get("/api/freelancer/followedcompanies/:id", getFollowedCompanies);
app.put("/api/follow/company", verifyToken, followCompany);
app.put("/api/unfollow/company", verifyToken, unfollowCompany);
app.get("/api/profile/feed", verifyToken, getFeedOfFreelancer);
app.put(
  "/api/profile/freelancer/password/change",
  verifyToken,
  updateFreelancerPassword
);
app.get("/api/freelancer/jobs", verifyToken, getJobsOfUser);
app.put("/api/profile/love/:id", likeProfile);
app.put(
  "/api/profile/protfolio/update",
  updatePortfolio,
  verifyToken,
  updateWork
);
app.get("/api/freelancer/paymentdetails", verifyToken, getPaymentDetailsOFUser);
app.get("/api/freelancer/professions", getFreelancerProfilesByProfession);
app.get("/api/freelancer/all/phone_email", getNumberAndMail);
app.get("/api/freelancer/allchats", verifyToken, getChatRoomsOfFreelancers);

//Contactcontroller routes
app.post("/api/contact", contactUs);
app.get("/api/contact/messages", verifyToken, fetchContactUs);
app.post("/api/notify", notifyEmail);

//HireController Routes
app.post("/api/add/hire", verifyToken, addHire);
app.get("/api/hires", verifyToken, getHires);
app.get("/api/requests", verifyToken, getRequests);
app.delete("/api/delete/request/:id", verifyToken, deleteRequest);
app.put("/api/accept/request/:id", verifyToken, acceptRequest);
app.put("/api/cancel/request/:id", verifyToken, cancelRequest);

//ReviewController Routes
app.post("/api/add/review", verifyToken, addReview);
app.post("/api/review/reply/:reviewId", verifyToken, addReviewReply);
app.put("/api/edit/reviews/:id", verifyToken, updateReviews);
app.put("/api/reviews/like/:reviewId", verifyToken, likeReview);
app.get("/api/reviews/:id", getReviews);

//FeedController Routes
app.post("/api/feed/add", feedPostImage, verifyToken, addFeed);
app.get("/api/feeds", getFeed);
app.put("/api/love/:feedId", verifyToken, loveFeed);
app.put("/api/unlove/:feedId", verifyToken, unLoveFeed);
app.get("/api/feed/:id", getFeedById);
app.put("/api/edit/feed/:id", editFeed);
app.delete("/api/delete/feed/:id", verifyToken, deleteFeed);
app.put("/api/share/count/:feedId", verifyToken, shareFeed);

//CommentController Routes
app.get("/api/feed/comment/list/:feedId", getCommentsOfPost);
app.post("/api/feed/comment", verifyToken, addComment);
app.put("/api/feed/comment/edit/:commentId", verifyToken, editComment);
app.delete("/api/feed/comment/delete/:commentId", verifyToken, deleteComment);

//ReferControler Routes
app.post("/api/generaterefer", verifyToken, generateReferCode);
app.get("/api/getrefer/user", verifyToken, getReferCodeByUser);
app.get("/api/getrefer/freelancer", verifyToken, getReferCodeByFreelancer);

//JobController Routes
app.post("/api/create-job/", verifyToken, createJob);
app.post("/api/job/apply", verifyToken, applyJob);
app.put("/api/job/edit/:jobId", verifyToken, editJobDetails);
app.put("/api/job/view/:jobId", jobViewCount);
app.put("/api/job/hire", verifyToken, hiredFreelancers);
app.put("/api/job/reject", verifyToken, rejectFreelancers);
app.delete("/api/job/delete/:jobId", verifyToken, deleteJob);
app.get("/api/job/user", verifyToken, getPostedJobsOfUser);
app.get("/api/job/get/:uid", getJobById);
app.get("/api/job/get/", getAllJob);
app.get(
  "/api/job/location/:location/profession/:profession",
  getJobByProfession
);
app.get("/api/job/location/:location", getJobByLocation);

//CallbackController Routes
app.post("/api/callback", verifyToken, requestCallback);
app.get("/api/callback", getAllCallback);
app.delete("/api/callback/:callbackId", deleteCallback);

//Paymentcontroller Routes
app.post("/api/payment", verifyToken, submitPayment);
app.post("/api/pay/razorpay", newPayment);
app.get("/api/checkpaymnet/:transacId", checkPaymentDetails);
app.get("/api/paymentdetails/:paymentId", getPaymentDetails);
app.post("/api/payment/phonepay", newPhonePayPayment);

//Notification Routes
app.post("/api/notification/create", createNotification);
app.get("/api/notification/:userId", getNotificationOfUser);
app.put("/api/notification/:id", seeNotifications);
app.put("/api/notification/seenall/:userId", seenAllNotifications);

//Blog Routes
app.post("/api/blog/create", blogCoverPic, addBlog);
app.get("/api/blog/", getAllBlogs);
app.get("/api/blog/:blogid", getBlogById);
app.post("/api/blog/viewcount", viewCount);
app.get("/api/blog/category/:category", getBlogsByCategory);
app.post("/api/blog/search", getBlogsByTitle);
app.put("/api/blog/:blogid", verifyToken, likeBlog);

//Report Routes
app.post("/api/report", verifyToken, createReport);
app.get("/api/report", verifyToken, getAllReports);
app.put("/api/report/:repId", verifyToken, updateStatusReport);

//Request Routes
app.post("/api/request", requestCityRaise);
app.get("/api/request", getAllRequests);
app.delete("/api/request/:requestid", deleteCityRequest);

//Carrer Routes
app.post("/api/carrer/post", createFipezoJob);
app.put("/api/carrer/apply/:requestId", carrerCVUpoload, applyFipezoJob);
app.delete("/api/carrer/delete/:requestId", deleteFipezoJobRequest);
app.get("/api/carrer", getAllFipezoJobRequest);
app.get("/api/carrer/:requestId", getFipezoJobRequestById);
app.get("/api/carrer/cat/:category", getFipezoJobRequestByCategory);
app.get("/api/carrer/all/applicants", getAllApplications);

//ReferUPI Routes
app.post("/api/referupi/requestwithdrawl", verifyToken, applyWithdrawl);
app.get(
  "/api/referupi/allrequestedwithdrawls",
  verifyToken,
  getWithDrawlDetails
);
app.put(
  "/api/referupi/completewithdrawls/:reqId",
  verifyToken,
  completeWithDrawl
);

//Message Routes
app.post("/api/createmessagebox", createMessageRoom);
app.put("/api/send-message", verifyToken, sendMessages);
app.get("/api/allchatrooms/:userId", getChatRoomOfUser);

//Premium Hire Routes
app.post("/api/hire/premium", verifyToken, newPremiumHireRequest);
app.get("/api/hire-request/premium", verifyToken, getAllPendingRequest);
app.put("/api/hire/premium/:reqId", verifyToken, changeStatusOfRequest);
app.put("/api/hire/freelancer/action/:reqId", verifyToken, freelancerHandel);
app.put(
  "/api/hire/premium/freelancer/:reqId",
  verifyToken,
  initializeRequestToFreelancer
);
app.get("/api/hire/premium/user", verifyToken, getUserPremiumHires);
app.get(
  "/api/hire/premium/request-freelancers",
  verifyToken,
  getFreelancersRequest
);

//Premium Hire 249 Routes
app.post("/api/hire/premium-249", addNewHireRequest);
app.get("/api/hire/premium-249", verifyToken, getAllHireRequests);

//Lead Routes
app.post("/api/lead/new", generateNewLead);
app.get("/api/lead/all", verifyToken, getAllLeads);
app.delete("/api/lead/delete/:id", verifyToken, deleteALead);

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

const job = nodeCron.schedule(
  "1 0 * * *",
  async () => {
    console.log(new Date().toLocaleString());
    const paidLancers = await freelancerCollection
      .find({})
      .populate("paymentDetails")
      .exec();
    for (const elm of paidLancers) {
      if (elm.paymentDetails) {
        strtDate = new Date();
        endDate = Date.parse(elm.paymentDetails.endDate);
        const difference = Math.round(
          (endDate - strtDate) / (1000 * 3600 * 24)
        );
        if (difference <= 0) {
          await freelancerCollection.findByIdAndUpdate(elm._id, {
            featured: false,
            premium: false,
          });
        }
      }
    }
  },
  { scheduled: true, timezone: "Asia/Kolkata" }
);

job.start();

const http = require("http").Server(app);

const socketIO = require("socket.io")(http, {
  cors: {
    // origin: process.env.CLIENT_URL,
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const socketServer = socketIO.of("/api/socket");

//Add this before the app.get() block
socketServer.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("get-notifications", async (data) => {
    try {
      let notifications;
      if (data.type === "freelancer") {
        notifications = await notificationCollection
          .find({
            acceptedFreelancer: data.user,
            seen: false,
          })
          .populate("acceptedFreelancer")
          .populate("sentFreelancer")
          .populate("sentUser")
          .populate("sentCompany")
          .exec();
      } else if (data.type === "user") {
        notifications = await notificationCollection
          .find({
            acceptedUser: data.user,
            seen: false,
          })
          .populate("acceptedUser")
          .populate("sentFreelancer")
          .populate("sentUser")
          .populate("sentCompany")
          .exec();
      } else {
        notifications = await notificationCollection
          .find({
            acceptedCompany: data.user,
            seen: false,
          })
          .populate("acceptedCompany")
          .populate("sentFreelancer")
          .populate("sentUser")
          .populate("sentCompany")
          .exec();
      }
      socketServer.emit("notifications", notifications);
    } catch (error) {
      console.log(error);
      return error;
    }
  });

  socket.on("send-notification", async (data) => {
    try {
      const notification = new notificationCollection({
        type: data.type,
        headline: data.headline,
        acceptedFreelancer: data.acceptedFreelancer || null,
        acceptedUser: data.acceptedUser || null,
        acceptedCompany: data.acceptedCompany || null,
        sentFreelancer: data.sentFreelancer || null,
        sentUser: data.sentUser || null,
        sentCompany: data.sentCompany || null,
        href: data.href,
        seen: false,
      });
      const newNotification = await notification.save();
      let notifications;
      if (data.acceptedFreelancer) {
        notifications = await notificationCollection
          .find({
            acceptedFreelancer: data.acceptedFreelancer,
            seen: false,
          })
          .populate("acceptedFreelancer")
          .populate("sentFreelancer")
          .populate("sentUser")
          .populate("sentCompany")
          .exec();
      } else if (data.acceptedUser) {
        notifications = await notificationCollection
          .find({
            acceptedUser: data.acceptedUser,
            seen: false,
          })
          .populate("acceptedUser")
          .populate("sentFreelancer")
          .populate("sentUser")
          .populate("sentCompany")
          .exec();
      } else {
        notifications = await notificationCollection
          .find({
            acceptedCompany: data.acceptedCompany,
            seen: false,
          })
          .populate("acceptedCompany")
          .populate("sentFreelancer")
          .populate("sentUser")
          .populate("sentCompany")
          .exec();
      }
      socketServer.emit("notifications", notifications);
    } catch (error) {
      console.log(error);
      return error;
    }
  });

  socket.on("send-message", (data) => {
    jwt.verify(data.token, process.env.JWT_SECRET, async (err, authData) => {
      const messageRoom = await messageCollection.findOne({
        messageId: data.messageId,
      });
      if (!messageRoom) {
        socketServer.emit("messageResponse", "Message room not found");
        return;
      }
      if (
        err ||
        (messageRoom.freelancer != authData.user._id &&
          messageRoom.user != authData.user._id &&
          messageRoom.company != authData.user._id)
      ) {
        socketServer.emit("messageResponse", "You are not authorized");
        return;
      }

      await messageCollection.updateOne(
        { messageId: messageRoom.messageId },
        { $push: { messages: data.message } }
      );
      const updatedMessageRoom = await messageCollection.findOne({
        messageId: messageRoom.messageId,
      });
      socketServer.emit("messageResponse", updatedMessageRoom);
    });
  });

  socket.on("all-messages", async (data) => {
    try {
      const messageRoom = await messageCollection.findOne({
        messageId: data.messageId,
      });
      if (messageRoom) {
        const allMessages = await messageCollection
          .findById(messageRoom._id)
          .populate("freelancer")
          .populate("user")
          .populate("company")
          .exec();

        socketServer.emit("messages", allMessages);
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

const ip = "0.0.0.0";

// Starting the server
const port = process.env.PORT || 3000;
// app.listen(port, ip, () => console.log(`Server started on port ${port}`));
http.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
