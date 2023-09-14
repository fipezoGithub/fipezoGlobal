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

// Function to resize an image and return the path of the resized image
async function resizeImage(file, width, height) {
  const filename = path.parse(file.filename).name;
  const ext = ".webp";
  const resizedFilename = filename + "-" + width + "x" + height + ext;
  const outputPath = "uploads/" + resizedFilename;

  await sharp(file.path).toFormat("webp", { quality: 50 }).toFile(outputPath);

  return {
    filename: resizedFilename,
    path: outputPath,
  };
}

//Registration

async function registerFreelancer(req, res) {
  try {
    jwt.verify(req.token, secret, async (err, authData) => {
      if (err) {
        console.log(err);
        res.sendStatus(403);
        return;
      }

      const resizedProfilePicture = await resizeImage(
        req.files["profilePicture"][0],
        400,
        300
      );
      const resizedCoverPicture = await resizeImage(
        req.files["coverPicture"][0],
        2272,
        1704
      );
      const resizedAadhaarCard = await resizeImage(
        req.files["aadhaarCard"][0],
        2272,
        1704
      );
      const resizedPanCard = await resizeImage(
        req.files["panCard"][0],
        2272,
        1704
      );

      let resizedWorks = [];

      // if (req.body.profession === 'photographer' || req.body.profession === 'drone_operator') {
      //   resizedWorks = await Promise.all(
      //     req.files['works[]']?.map((file) => resizeImage(file, 1200, 900))
      //   );
      // }

      let worksToStore = [];
      if (
        req.body.profession === "photographer" ||
        req.body.profession === "photo_editor" ||
        req.body.profession === "model" ||
        req.body.profession === "makeup_artist" ||
        req.body.profession === "album_designer" ||
        req.body.profession === "web_developer"
      ) {
        worksToStore = req.files["works[]"]?.map((file) => file.filename);
      } else if (
        req.body.profession === "drone_operator" ||
        req.body.profession === "anchor" ||
        req.body.profession === "dj" ||
        req.body.profession === "dancer" ||
        req.body.profession === "influencer"
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

      const freelancerData = new freelancerCollection({
        uid: req.body.uid,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        location: req.body.location,
        profession: req.body.profession,
        rate: req.body.rate,
        bio: req.body.bio,
        equipments: req.body.equipments,
        followers: [],
        following: [],
        profilePicture: resizedProfilePicture.filename,
        coverPicture: resizedCoverPicture.filename,
        aadhaarCard: resizedAadhaarCard.filename,
        panCard: resizedPanCard.filename,
        works: worksToStore,
        links: req.body.links,
        rating: 0,
        reviewCount: 0,
        reviews: [],
        termsAndConditions: req.body.termsAndConditions,
        featured: false,
        verified: false,
      });
      await freelancerData.save();

      const filePromises = [];
      filePromises.push(uploadFile(resizedProfilePicture));
      filePromises.push(uploadFile(resizedCoverPicture));
      filePromises.push(uploadFile(resizedAadhaarCard));
      filePromises.push(uploadFile(resizedPanCard));

      if (
        req.body.profession === "photographer" ||
        req.body.profession === "drone_operator" ||
        req.body.profession === "photo_editor" ||
        req.body.profession === "model" ||
        req.body.profession === "makeup_artist" ||
        req.body.profession === "album_designer" ||
        req.body.profession === "anchor" ||
        req.body.profession === "web_developer" ||
        req.body.profession === "dj" ||
        req.body.profession === "dancer" ||
        req.body.profession === "influencer"
      ) {
        req.files["works[]"]?.forEach((file) => {
          filePromises.push(uploadFile(file));
        });
      }

      await Promise.all(filePromises);

      await unlinkFile("uploads/" + req.files["profilePicture"][0].filename);
      await unlinkFile("uploads/" + req.files["coverPicture"][0].filename);
      await unlinkFile("uploads/" + req.files["aadhaarCard"][0].filename);
      await unlinkFile("uploads/" + req.files["panCard"][0].filename);
      await unlinkFile(resizedProfilePicture.path);
      await unlinkFile(resizedCoverPicture.path);
      await unlinkFile(resizedAadhaarCard.path);
      await unlinkFile(resizedPanCard.path);

      // if (req.body.profession === 'photographer' || req.body.profession === 'drone_operator') {
      //   req.files['works[]'].forEach(file => {
      //     unlinkFile('uploads/' + file.filename);
      //   });

      //   req.files['works[]'].forEach(file => {
      //     unlinkFile(file.path);
      //   });
      // }

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
    });
  } catch (error) {
    console.error(error);
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
  try {
    const freelancers = await freelancerCollection.find({ verified: true });
    res.send(freelancers);
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
        const user = await freelancerCollection.findOne({
          _id: authData.user._id,
        });
        let updatedAuthData;
        if (user) {
          if (!req.body.profilePicture) {
            // const resizedProfilePicture = await resizeImage(req.file, 200, 200);
            await freelancerCollection.updateOne(
              { _id: authData.user._id },
              {
                $set: {
                  bio: req.body.bio,
                  equipments: req.body.equipments,
                },
              }
            );

            // const filePromises = [];
            // filePromises.push(uploadFile(resizedProfilePicture));

            // await Promise.all(filePromises);

            // await unlinkFile("uploads/" + req.file.filename);
            // await unlinkFile(resizedProfilePicture.path);

            updatedAuthData = {
              ...authData,
              user: {
                ...authData.user,
                bio: req.body.bio,
                equipments: req.body.equipments,
              },
            };
          }
          const updatedToken = jwt.sign(updatedAuthData, secret);

          res.send({ freelancer: updatedAuthData, token: updatedToken });
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
// delete profile

async function deleteFreelancerProfile(req, res) {
  try {
    const id = req.params.id;
    const user = await freelancerCollection.findOne({ _id: id });

    if (!user || user.verified === true) {
      return res.sendStatus(403);
    }

    const filePromises = [];
    filePromises.push(deleteFile(user.profilePicture));
    filePromises.push(deleteFile(user.coverPicture));
    filePromises.push(deleteFile(user.aadhaarCard));
    filePromises.push(deleteFile(user.panCard));

    user.works.forEach((file) => {
      filePromises.push(deleteFile(file));
    });

    await Promise.all(filePromises);

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
  freelancerCollection
    .updateOne({ _id: id }, { $set: { verified: true } })
    .then(() => {
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
          console.log(req.body.userid, authData.user._id);
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
          console.log(req.body.companyid, authData.user._id);
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
          console.log(req.body.userid, authData.user._id);
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
  try {
    const data = await freelancerCollection
      .find({
        firstname: { $regex: ".*" + req.body.query + ".*", $options: "i" },
      })
      .exec();
    // if (!data || data.length === 0) {
    //   res.status(404).json({ message: "no freelancer found" });
    // }

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}
module.exports = {
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
};
