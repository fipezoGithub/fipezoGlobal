const freelancerCollection = require("../models/freelancerModel");
const userCollection = require("../models/userModel");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const { uploadFile, deleteFile } = require("../middlewares/s3");
const sharp = require("sharp");
const path = require("path");
const companyCollection = require("../models/companyModel");
const referCollection = require("../models/referModel");
const jobsCollection = require("../models/jobsModel");
const twilio = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function sendTextMessage(phoneNumber, message) {
  if (process.env.CLIENT_URL !== "http://localhost:3001") {
    phoneNumber = "+91" + phoneNumber.toString();
    twilio.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });
  }
}

// Function to resize an image and return the path of the resized image
async function resizeImage(file, width, height) {
  const filename = path.parse(file.filename).name;
  const ext = ".webp";
  const resizedFilename = filename + "-" + width + "x" + height + ext;
  const outputPath = "uploads/" + resizedFilename;

  await sharp(file.path).toFormat("webp", { quality: 70 }).toFile(outputPath);

  return {
    filename: resizedFilename,
    path: outputPath,
  };
}

//Registration

async function registerFreelancer(req, res) {
  try {
    let referalUID;
    if (req.body.usedReferalId) {
      const referal = await referCollection.findOne({
        referUid: req.body.usedReferalId,
      });
      referalUID = referal._id;
    }
    const resizedProfilePicture = await resizeImage(
      req.files["profilePicture"][0],
      2272,
      1704
    );

    const resizedCoverPicture = await resizeImage(
      req.files["coverPicture"][0],
      2272,
      1704
    );
    const filePromises = [];
    const freelancerData = new freelancerCollection({
      uid: req.body.uid,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phone: req.body.phone,
      location: req.body.location,
      profession: req.body.profession,
      services: req.body.services,
      email: req.body.email,
      password: req.body.password,
      rate: req.body.rate,
      profilePicture: resizedProfilePicture.filename,
      coverPicture: resizedCoverPicture?.filename,
      followers: [],
      following: [],
      bio: req.body.bio,
      pictureStyle: req.body.pictureStyle,
      equipments: req.body.equipments,
      rating: 0,
      reviewCount: 0,
      reviews: [],
      joinByRefaralId: [],
      createdReferalId: null,
      usedReferalId: referalUID,
      featured: false,
      verified: false,
    });

    filePromises.push(uploadFile(resizedProfilePicture));
    filePromises.push(uploadFile(resizedCoverPicture));

    await Promise.all(filePromises);

    const newFreelancer = await freelancerData.save();
    const referID = await new referCollection({
      referUid:
        req.body.firstname.toUpperCase().slice(0, 3) +
        parseInt(req.body.phone).toString(16).slice(0, 3),
      createdFreelancer: newFreelancer._id,
    }).save();
    await freelancerCollection.findByIdAndUpdate(newFreelancer._id, {
      createdReferalId: referID._id,
    });
    if (req.body.usedReferalId) {
      const freelancer = await freelancerCollection.findOne({
        createdReferalId: referalUID,
      });
      const user = await userCollection.findOne({
        createdReferalId: referalUID,
      });
      await referCollection.findByIdAndUpdate(referalUID, {
        $push: { acceptedFreelancer: newFreelancer._id },
      });
      if (user) {
        await userCollection.findByIdAndUpdate(user._id, {
          $push: { joinByRefaralId: newFreelancer._id },
        });
      } else if (freelancer) {
        await freelancerCollection.findByIdAndUpdate(freelancer._id, {
          $push: { joinByRefaralId: newFreelancer._id },
        });
      }
    }
    await unlinkFile("uploads/" + req.files["profilePicture"][0].filename);
    await unlinkFile(resizedProfilePicture.path);
    await unlinkFile("uploads/" + req.files["coverPicture"][0].filename);
    await unlinkFile(resizedCoverPicture.path);
    const user = await freelancerCollection.findOne({
      phone: req.body.phone,
    });

    jwt.sign({ user }, secret, { expiresIn: "30d" }, (err, token) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }
      res.json({ token });
    });
  } catch (error) {
    console.error(error.stack);
    res.status(500).send("Internal server error");
  }
}

//Profile Verification
async function verificationProfile(req, res) {
  try {
    jwt.verify(req.token, secret, async (err, authData) => {
      const freelancer = await freelancerCollection.findById(authData.user._id);

      if (err || !freelancer) {
        res.status(404).send("User not found");
        return;
      }

      let resizedAadhaarCard;

      if (req.files["aadhaarCard"]) {
        resizedAadhaarCard = await resizeImage(
          req.files["aadhaarCard"][0],
          2272,
          1704
        );
      }

      let resizedPanCard;

      if (req.files["panCard"]) {
        resizedPanCard = await resizeImage(req.files["panCard"][0], 2272, 1704);
      }
      let worksToStore = [];
      if (
        freelancer.profession === "photographer" ||
        freelancer.profession === "photo_editor" ||
        freelancer.profession === "model" ||
        freelancer.profession === "makeup_artist" ||
        freelancer.profession === "mehendi_artist" ||
        freelancer.profession === "album_designer" ||
        freelancer.profession === "web_developer" ||
        freelancer.profession === "graphics_designer" ||
        freelancer.profession === "private_tutor" ||
        freelancer.profession === "drawing_teacher" ||
        freelancer.profession === "painter" ||
        freelancer.profession === "fashion_designer" ||
        freelancer.profession === "babysitter" ||
        freelancer.profession === "maid"
      ) {
        worksToStore = req.files["works[]"]?.map((file) => file.filename);
      } else if (
        freelancer.profession === "drone_operator" ||
        freelancer.profession === "anchor" ||
        freelancer.profession === "dj" ||
        freelancer.profession === "dancer" ||
        freelancer.profession === "influencer" ||
        freelancer.profession === "actor" ||
        freelancer.profession === "actress" ||
        freelancer.profession === "interior_designer"
      ) {
        const droneWorksFromBody = [
          req.body.works[0],
          req.body.works[1],
          req.body.works[2],
          req.body.works[3],
        ];
        const droneWorksFromFiles = req.files["works[]"]?.map(
          (file) => file.filename
        );
        worksToStore = droneWorksFromBody.concat(droneWorksFromFiles);
      } else {
        worksToStore = req.body.works;
      }

      const verificationDetails = await freelancerCollection.findByIdAndUpdate(
        freelancer._id,
        {
          works: worksToStore,
          links: req.body.links,
          termsAndConditions: req.body.termsAndConditions,
        }
      );

      const filePromises = [];

      if (
        freelancer.profession === "photographer" ||
        freelancer.profession === "drone_operator" ||
        freelancer.profession === "photo_editor" ||
        freelancer.profession === "model" ||
        freelancer.profession === "makeup_artist" ||
        freelancer.profession === "mehendi_artist" ||
        freelancer.profession === "album_designer" ||
        freelancer.profession === "anchor" ||
        freelancer.profession === "web_developer" ||
        freelancer.profession === "dj" ||
        freelancer.profession === "dancer" ||
        freelancer.profession === "influencer" ||
        freelancer.profession === "graphics_designer" ||
        freelancer.profession === "private_tutor" ||
        freelancer.profession === "drawing_teacher" ||
        freelancer.profession === "painter" ||
        freelancer.profession === "fashion_designer" ||
        freelancer.profession === "actor" ||
        freelancer.profession === "actress" ||
        freelancer.profession === "babysitter" ||
        freelancer.profession === "maid" ||
        freelancer.profession === "interior_designer"
      ) {
        req.files["works[]"]?.forEach((file) => {
          filePromises.push(uploadFile(file));
        });
      }

      await Promise.all(filePromises);

      if (req.files["aadhaarCard"]) {
        await unlinkFile("uploads/" + req.files["aadhaarCard"][0].filename);
      }
      if (req.files["panCard"]) {
        await unlinkFile("uploads/" + req.files["panCard"][0].filename);
      }
      if (req.files["aadhaarCard"]) {
        await unlinkFile(resizedAadhaarCard.path);
      }
      if (req.files["panCard"]) {
        await unlinkFile(resizedPanCard.path);
      }

      res.status(200).json(verificationDetails);
    });
  } catch (error) {
    console.error(error.stack);
    res.status(500).send("Internal server error");
  }
}

//Profile Premium Work Upload
async function premiumWorkUpload(req, res) {
  try {
    jwt.verify(req.token, secret, async (err, authData) => {
      const freelancer = await freelancerCollection.findById(authData.user._id);

      if (err || !freelancer || !freelancer.premium) {
        res.status(404).send("User not found");
        return;
      }

      let worksToStore = [];
      if (
        freelancer.profession === "photographer" ||
        freelancer.profession === "photo_editor" ||
        freelancer.profession === "model" ||
        freelancer.profession === "makeup_artist" ||
        freelancer.profession === "mehendi_artist" ||
        freelancer.profession === "album_designer" ||
        freelancer.profession === "web_developer" ||
        freelancer.profession === "graphics_designer" ||
        freelancer.profession === "private_tutor" ||
        freelancer.profession === "drawing_teacher" ||
        freelancer.profession === "painter" ||
        freelancer.profession === "fashion_designer" ||
        freelancer.profession === "babysitter" ||
        freelancer.profession === "maid"
      ) {
        worksToStore = req.files["works[]"]?.map((file) => file.filename);
      } else if (
        freelancer.profession === "drone_operator" ||
        freelancer.profession === "anchor" ||
        freelancer.profession === "dj" ||
        freelancer.profession === "dancer" ||
        freelancer.profession === "influencer" ||
        freelancer.profession === "actor" ||
        freelancer.profession === "actress" ||
        freelancer.profession === "interior_designer"
      ) {
        let droneWorksFromBody;
        if (req.body.works) {
          droneWorksFromBody = [
            req.body.works[0],
            req.body.works[1],
            req.body.works[2],
            req.body.works[3],
          ];
        }
        const droneWorksFromFiles = req.files["works[]"]?.map(
          (file) => file.filename
        );
        worksToStore = droneWorksFromBody.concat(droneWorksFromFiles);
      } else {
        worksToStore = req.body.works;
      }

      const verificationDetails = await freelancerCollection.findByIdAndUpdate(
        freelancer._id,
        {
          $push: { works: worksToStore },
        }
      );

      const filePromises = [];

      if (
        freelancer.profession === "photographer" ||
        freelancer.profession === "drone_operator" ||
        freelancer.profession === "photo_editor" ||
        freelancer.profession === "model" ||
        freelancer.profession === "makeup_artist" ||
        freelancer.profession === "mehendi_artist" ||
        freelancer.profession === "album_designer" ||
        freelancer.profession === "anchor" ||
        freelancer.profession === "web_developer" ||
        freelancer.profession === "dj" ||
        freelancer.profession === "dancer" ||
        freelancer.profession === "influencer" ||
        freelancer.profession === "graphics_designer" ||
        freelancer.profession === "private_tutor" ||
        freelancer.profession === "drawing_teacher" ||
        freelancer.profession === "painter" ||
        freelancer.profession === "fashion_designer" ||
        freelancer.profession === "actor" ||
        freelancer.profession === "actress" ||
        freelancer.profession === "babysitter" ||
        freelancer.profession === "maid" ||
        freelancer.profession === "interior_designer"
      ) {
        req.files["works[]"]?.forEach((file) => {
          filePromises.push(uploadFile(file));
        });
      }

      await Promise.all(filePromises);

      res.status(200).json(verificationDetails);
    });
  } catch (error) {
    console.error(error.stack);
    res.status(500).send("Internal server error");
  }
}

//profile Data

async function getFreelancerProfile(req, res) {
  try {
    const uid = req.params.uid;
    const freelancer = await freelancerCollection.findOne({ uid: uid });
    res.send(freelancer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}

//profiles Data

async function getFreelancerProfiles(req, res) {
  const { page, loc } = req.query;
  const limit = 12;
  try {
    const freelancers = await freelancerCollection
      .find({
        $and: [{ verified: true }, { location: loc }],
      })
      .sort({ featured: -1, reviewCount: -1, _id: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await freelancerCollection.countDocuments({
      $and: [{ verified: true }, { location: loc }],
    });
    res.status(200).json({
      freelancers,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}

// featured profiles

async function getFeaturedFreelancerProfiles(req, res) {
  try {
    const freelancers = await freelancerCollection.find({
      featured: true,
      verified: true,
    });
    res.send(freelancers);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}

//Profiles by profession
async function getFreelancerProfilesByProfession(req, res) {
  const { page, loc } = req.query;
  const limit = 12;
  try {
    const freelancers = await freelancerCollection
      .find({
        $and: [
          { verified: true },
          { profession: { $in: req.query.q } },
          { location: req.query.loc },
        ],
      })
      .sort({ featured: -1,reviewCount: -1, _id: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await freelancerCollection.countDocuments({
      $and: [
        { verified: true },
        { profession: { $in: req.query.q } },
        { location: loc },
      ],
    });

    res.status(200).json({
      freelancers,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}

//Profile by ID
async function getProfileByID(req, res) {
  try {
    const freelancers = await freelancerCollection.findById(req.params.id);
    res.send(freelancers);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}

async function getUnFreelancerProfiles(req, res) {
  try {
    jwt.verify(req.token, secret, async (err, authData) => {
      if (err) {
        return;
      } else {
        const user = await userCollection.findOne({ _id: authData.user._id });
        if (user) {
          if (authData.user.phone === parseInt(process.env.ADMIN_PHONE)) {
            const freelancers = await freelancerCollection.find({
              verified: false,
            });
            res.send(freelancers);
          } else {
            res.sendStatus(403);
          }
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

//edit profile
async function editFreelancerProfile(req, res) {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      const freelancerData = await freelancerCollection.findOne({
        _id: authData.user._id,
      });
      if (err && !freelancerData) {
        return;
      } else {
        const deletePromises = [];
        const filePromises = [];
        let resizedProfilePicture;
        if (req.files && req.files["profilePicture"]) {
          resizedProfilePicture = await resizeImage(
            req.files["profilePicture"][0],
            2272,
            1704
          );
          deletePromises.push(deleteFile(freelancerData.profilePicture));
          filePromises.push(uploadFile(resizedProfilePicture));
        }
        let resizedCoverPicture;
        if (req.files && req.files["coverPicture"]) {
          resizedCoverPicture = await resizeImage(
            req.files["coverPicture"][0],
            2272,
            1704
          );
          deletePromises.push(deleteFile(freelancerData.coverPicture));
          filePromises.push(uploadFile(resizedCoverPicture));
        }

        await Promise.all(deletePromises);
        await Promise.all(filePromises);
        freelancerData.location = req.body.location || freelancerData.location;
        freelancerData.services = req.body.services || freelancerData.services;
        freelancerData.email = req.body.email || freelancerData.email;
        freelancerData.password = req.body.password || freelancerData.password;
        freelancerData.rate = req.body.rate || freelancerData.rate;
        freelancerData.bio = req.body.bio || freelancerData.bio;
        freelancerData.equipments =
          req.body.equipments || freelancerData.equipments;
        freelancerData.profilePicture =
          resizedProfilePicture?.filename || freelancerData.profilePicture;
        freelancerData.coverPicture =
          resizedCoverPicture?.filename || freelancerData.coverPicture;

        const updatedUser = await freelancerData.save();
        // const updatedUser = await freelancerCollection.findByIdAndUpdate(
        //   freelancerData._id,
        //   {
        //     location: req.body.location || freelancerData.location,
        //     email: req.body.email || freelancerData.email,
        //     password: req.body.password || freelancerData.password,
        //     rate: req.body.rate || freelancerData.rate,
        //     bio: req.body.bio || freelancerData.bio,
        //     equipments: req.body.equipments || freelancerData.equipments,
        //     profilePicture:
        //       resizedProfilePicture?.filename || freelancerData.profilePicture,
        //     coverPicture:
        //       resizedCoverPicture?.filename || freelancerData.coverPicture,
        //   }
        // );
        if (resizedProfilePicture) {
          await unlinkFile(
            "uploads/" + req.files["profilePicture"][0].filename
          );
          await unlinkFile(resizedProfilePicture.path);
        }
        if (resizedCoverPicture) {
          await unlinkFile("uploads/" + req.files["coverPicture"][0].filename);
          await unlinkFile(resizedCoverPicture.path);
        }

        res.status(200).json(updatedUser);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}

async function updateWork(req, res) {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      const freelancerData = await freelancerCollection.findOne({
        _id: authData.user._id,
      });
      if (err && !freelancerData) {
        return;
      } else {
        const deletePromises = [];
        const filePromises = [];
        let worksToStore = [];
        const indexes = req.body.index.split(",");
        if (
          freelancerData.profession === "photographer" ||
          freelancerData.profession === "photo_editor" ||
          freelancerData.profession === "model" ||
          freelancerData.profession === "makeup_artist" ||
          freelancerData.profession === "mehendi_artist" ||
          freelancerData.profession === "album_designer" ||
          freelancerData.profession === "web_developer" ||
          freelancerData.profession === "graphics_designer" ||
          freelancerData.profession === "private_tutor" ||
          freelancerData.profession === "drawing_teacher" ||
          freelancerData.profession === "painter" ||
          freelancerData.profession === "fashion_designer" ||
          freelancerData.profession === "babysitter" ||
          freelancerData.profession === "maid"
        ) {
          const prevWorks = req.body.works;
          worksToStore = req.files["works[]"]?.map((file) => file.filename);
          const oldWorks = [...freelancerData.works];
          indexes.forEach((element) => {
            let deleteIndex = parseInt(element);
            if (deleteIndex !== NaN) {
              if (oldWorks[deleteIndex]) {
                deletePromises.push(deleteFile(oldWorks[deleteIndex]));
              }
            }
          });
          worksToStore = prevWorks.concat(worksToStore);
        } else if (
          freelancerData.profession === "drone_operator" ||
          freelancerData.profession === "anchor" ||
          freelancerData.profession === "dj" ||
          freelancerData.profession === "dancer" ||
          freelancerData.profession === "influencer" ||
          freelancerData.profession === "actor" ||
          freelancerData.profession === "actress" ||
          freelancerData.profession === "interior_designer"
        ) {
          const droneWorksFromBody = req.body.works;
          let droneWorksFromFiles;
          if (req.files["works[]"]) {
            droneWorksFromFiles = req.files["works[]"]?.map(
              (file) => file.filename
            );
          }
          const oldWorks = [...freelancerData.works];
          indexes.forEach((element) => {
            let deleteIndex = parseInt(element);
            if (deleteIndex !== NaN) {
              if (oldWorks[deleteIndex]) {
                deletePromises.push(deleteFile(oldWorks[deleteIndex]));
              }
            }
          });
          if (droneWorksFromFiles) {
            worksToStore = droneWorksFromBody.concat(droneWorksFromFiles);
          } else {
            worksToStore = droneWorksFromBody;
          }
        } else {
          worksToStore = req.body.works;
        }
        await freelancerCollection.findByIdAndUpdate(freelancerData._id, {
          works: worksToStore,
        });
        if (
          freelancerData.profession === "photographer" ||
          freelancerData.profession === "drone_operator" ||
          freelancerData.profession === "photo_editor" ||
          freelancerData.profession === "model" ||
          freelancerData.profession === "makeup_artist" ||
          freelancerData.profession === "mehendi_artist" ||
          freelancerData.profession === "album_designer" ||
          freelancerData.profession === "anchor" ||
          freelancerData.profession === "web_developer" ||
          freelancerData.profession === "dj" ||
          freelancerData.profession === "dancer" ||
          freelancerData.profession === "influencer" ||
          freelancerData.profession === "graphics_designer" ||
          freelancerData.profession === "private_tutor" ||
          freelancerData.profession === "drawing_teacher" ||
          freelancerData.profession === "painter" ||
          freelancerData.profession === "fashion_designer" ||
          freelancerData.profession === "actor" ||
          freelancerData.profession === "actress" ||
          freelancerData.profession === "babysitter" ||
          freelancerData.profession === "maid" ||
          freelancerData.profession === "interior_designer"
        ) {
          req.files["works[]"]?.forEach((file) => {
            filePromises.push(uploadFile(file));
          });
        }
        await Promise.all(filePromises);
        await Promise.all(deletePromises);
      }

      const newAccount = await freelancerCollection.findById(
        freelancerData._id
      );
      res.status(200).json(newAccount);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

// delete profile
async function deleteFreelancerProfile(req, res) {
  try {
    const id = req.params.id;
    const user = await freelancerCollection.findOne({ _id: id });

    if (!user || user.verified === true) {
      return res.sendStatus(403);
    }

    const filePromises = [];
    if (user.profilePicture) {
      filePromises.push(deleteFile(user.profilePicture));
    }
    if (user.coverPicture) {
      filePromises.push(deleteFile(user.coverPicture));
    }
    if (user.aadhaarCard) {
      filePromises.push(deleteFile(user.aadhaarCard));
    }
    if (user.panCard) {
      filePromises.push(deleteFile(user.panCard));
    }
    if (user.works.length > 0) {
      user.works.forEach((file) => {
        if (!file.includes("https://")) {
          filePromises.push(deleteFile(file));
        }
      });
    }

    await Promise.all(filePromises);
    await referCollection.deleteOne({ _id: user.createdReferalId });
    if (user.usedReferalId) {
      const joinRefer = await referCollection.findByIdAndUpdate(
        user.usedReferalId,
        { $pull: { acceptedFreelancer: id } }
      );
      if (joinRefer.createdUser) {
        await userCollection.findByIdAndUpdate(joinRefer.createdUser, {
          $pull: { joinByRefaralId: user._id },
        });
      } else if (joinRefer.createdFreelancer) {
        await freelancerCollection.findByIdAndUpdate(
          joinRefer.createdFreelancer,
          { $pull: { joinByRefaralId: user._id } }
        );
      }
    }
    await freelancerCollection.deleteOne({ _id: id });
    res.json({ id: id });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

// verifying profile

async function verifyFreelancerProfile(req, res) {
  const id = req.params.id;
  const freelancer = await freelancerCollection.findById(id);
  freelancerCollection
    .updateOne({ _id: id }, { $set: { verified: true } })
    .then(() => {
      sendTextMessage(
        freelancer.phone,
        "Your profile has been successfully verified. Please log in to Fipezo. Happy Freelancing!"
      );
      res.json({ id: id });
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
}

// follow Profile
async function followProfile(req, res) {
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
          await freelancerCollection.updateOne(
            { _id: authData.user._id },
            {
              $push: {
                following: req.body.userid,
              },
            }
          );
          await freelancerCollection.updateOne(
            { _id: req.body.userid },
            {
              $push: {
                followers: authData.user._id,
              },
            }
          );
          res.send({ message: `following successfully ${req.body.userid}` });
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

//follow company
async function followCompany(req, res) {
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
          await freelancerCollection.updateOne(
            { _id: authData.user._id },
            {
              $push: {
                followedCompanies: req.body.companyid,
              },
            }
          );
          await companyCollection.updateOne(
            { _id: req.body.companyid },
            {
              $push: {
                followers: authData.user._id,
              },
            }
          );
          res.send({ message: `following successfully ${req.body.companyid}` });
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

// Unfollow Profile
async function unFollowProfile(req, res) {
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
          await freelancerCollection.updateOne(
            { _id: authData.user._id },
            {
              $pull: {
                following: req.body.userid,
              },
            }
          );
          await freelancerCollection.updateOne(
            { _id: req.body.userid },
            {
              $pull: {
                followers: authData.user._id,
              },
            }
          );
          res
            .status(200)
            .send({ message: `unfollow successfully ${req.body.userid}` });
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

// Unfollow Company
async function unfollowCompany(req, res) {
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
          await freelancerCollection.updateOne(
            { _id: authData.user._id },
            {
              $pull: {
                followedCompanies: req.body.companyid,
              },
            }
          );
          await companyCollection.updateOne(
            { _id: req.body.companyid },
            {
              $pull: {
                followers: authData.user._id,
              },
            }
          );
          res
            .status(200)
            .send({ message: `unfollow successfully ${req.body.companyid}` });
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

// Get Followers
async function getFollowers(req, res) {
  try {
    const id = req.params.id;
    const user = await freelancerCollection
      .findOne({ _id: id })
      .populate("followers");

    if (!user) {
      return res.sendStatus(403);
    }
    res.status(200).json({ data: user.followers });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

// Get Followings
async function getFollowing(req, res) {
  try {
    const id = req.params.id;
    const user = await freelancerCollection
      .findOne({ _id: id })
      .populate("following");

    if (!user) {
      return res.sendStatus(403);
    }
    res.status(200).json({ data: user.following });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

// Get Followed Companies
async function getFollowedCompanies(req, res) {
  try {
    const id = req.params.id;
    const user = await freelancerCollection
      .findOne({ _id: id })
      .populate("followedCompanies");

    if (!user) {
      return res.sendStatus(403);
    }
    res.status(200).json({ data: user.followedCompanies });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

// Search Freelancer by name
async function getFreelancerByName(req, res) {
  const { page, loc } = req.query;
  const limit = 12;
  try {
    const data = await freelancerCollection
      .find({
        firstname: { $regex: ".*" + req.body.query + ".*", $options: "i" },
        verified: true,
        location: loc,
      })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await freelancerCollection.countDocuments({
      $and: [
        { firstname: { $regex: ".*" + req.body.query + ".*", $options: "i" } },
        { verified: true },
        { location: loc },
      ],
    });

    res.status(200).json({
      data,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}

// Get Feed of Freelancer
async function getFeedOfFreelancer(req, res) {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      const freelancerData = await freelancerCollection.findOne({
        _id: authData.user._id,
      });
      if (err && !freelancerData) {
        return;
      } else {
        const user = await freelancerCollection
          .findOne({
            _id: authData.user._id,
          })
          .populate("feeds");
        if (!user) {
          res.status(500).send("Not logged in");
        }
        res.status(200).json(user.feeds);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}

//Update freelancer password
async function updateFreelancerPassword(req, res) {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      const userData = await freelancerCollection.findOne({
        _id: authData.user._id,
      });
      if (err && !userData) {
        return;
      } else {
        const user = await freelancerCollection.findById(userData._id);
        if (user) {
          user.password = req.body.password;
          const updatedUser = await user.save();
          res.send({ user: updatedUser });
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

//Get jobs of freelancer
async function getJobsOfUser(req, res) {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
    const freelancer = await freelancerCollection.findById(authData.user._id);
    if (err || !freelancer) {
      res.status(404).send("Freelancer not found");
    } else {
      const jobs = await jobsCollection
        .find({
          appliedFreelancers: freelancer._id,
        })
        .populate("createdCompany")
        .exec();
      if (!jobs) {
        res.status(404).send("Job not found");
      } else {
        res.status(200).json(jobs);
      }
    }
  });
}

//Like Profile
async function likeProfile(req, res) {
  try {
    const freelancer = await freelancerCollection.findById(req.params.id);
    if (!freelancer) {
      res.status(404).send("Freelancer not found");
      return;
    }
    const like = await freelancerCollection.findByIdAndUpdate(req.params.id, {
      loveCount: freelancer.loveCount + 1,
    });
    res.status(200).json({ message: "love successfull" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

//Get Payment Details
async function getPaymentDetailsOFUser(req, res) {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      const freelancer = await freelancerCollection.findById(authData.user._id);
      if (err || !freelancer) {
        res.status(404).send("Freelancer not found");
      } else {
        const paymentDetails = await freelancerCollection
          .findById(freelancer._id)
          .populate("paymentDetails")
          .exec();
        if (!paymentDetails) {
          res.status(404).send("Not Found");
        } else {
          res.status(200).json(paymentDetails.paymentDetails);
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function getNumberAndMail(req, res) {
  let userEmail = [];
  const freelancers = await freelancerCollection.find({});
  // const freelancers = await companyCollection.find({});

  freelancers.forEach(async (element) => {
    let user = {
      name: element.firstname + " " + element.lastname,
      email: element.email,
      phone: element.phone,
    };
    userEmail.push(user);
  });
  res.status(200).send({ userEmail });
}

module.exports = {
  registerFreelancer,
  verificationProfile,
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
  updateWork,
  getPaymentDetailsOFUser,
  getFreelancerProfilesByProfession,
  premiumWorkUpload,
  getNumberAndMail,
};
