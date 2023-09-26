const companyCollection = require("../models/companyModel");
const userCollection = require("../models/userModel");
const secret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const { uploadFile, deleteFile } = require("../middlewares/s3");
const sharp = require("sharp");
const path = require("path");

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
//register company
async function registerCompany(req, res) {
  try {
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
    let worksToStore = req.files["works[]"]?.map((file) => file.filename);
    const companyData = new companyCollection({
      uid: req.body.uid,
      companyname: req.body.companyname,
      companyphone: req.body.companyphone,
      companyemail: req.body.companyemail,
      password: req.body.password,
      companytype: req.body.companytype,
      companyaddress: req.body.companyaddress,
      position: req.body.position,
      bio: req.body.bio,
      profilePicture: resizedProfilePicture.filename,
      coverPicture: resizedCoverPicture.filename,
      panCard: req.files["panCard"][0].filename,
      incorporationCertificate:
        req.files["incorporationCertificate"][0].filename,
      msmeCertificate: req.files["msmeCertificate"][0].filename,
      tradeLiecence: req.files["tradeLiecence"][0].filename,
      followers: [],
      links: req.body.links,
      works: worksToStore,
      termsAndConditions: req.body.termsAndConditions,
      verified: false,
    });

    await companyData.save();

    const filePromises = [];
    filePromises.push(uploadFile(resizedProfilePicture));
    filePromises.push(uploadFile(resizedCoverPicture));
    filePromises.push(uploadFile(req.files["panCard"][0]));
    filePromises.push(uploadFile(req.files["incorporationCertificate"][0]));
    filePromises.push(uploadFile(req.files["msmeCertificate"][0]));
    filePromises.push(uploadFile(req.files["tradeLiecence"][0]));
    req.files["works[]"]?.forEach((file) => {
      filePromises.push(uploadFile(file));
    });
    await Promise.all(filePromises);

    await unlinkFile("uploads/" + req.files["profilePicture"][0].filename);
    await unlinkFile("uploads/" + req.files["coverPicture"][0].filename);
    await unlinkFile("uploads/" + req.files["panCard"][0].filename);
    await unlinkFile(
      "uploads/" + req.files["incorporationCertificate"][0].filename
    );
    await unlinkFile("uploads/" + req.files["msmeCertificate"][0].filename);
    await unlinkFile("uploads/" + req.files["tradeLiecence"][0].filename);
    await unlinkFile(resizedProfilePicture.path);
    await unlinkFile(resizedCoverPicture.path);

    const user = await companyCollection.findOne({
      companyphone: req.body.companyphone,
    });

    jwt.sign({ user }, secret, { expiresIn: "30d" }, (err, token) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }
      res.json({ token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}
// edit company profile
async function editCompanyProfile(req, res) {
  try {
    jwt.verify(req.token, secret, async (err, authData) => {
      const user = await companyCollection.findOne({ _id: authData.user._id });
      if (err || !user) {
        console.log(err);
        res.sendStatus(403);
        return;
      }

      let resizedProfilePicture;
      if (req.files["profilePicture"])
        resizedProfilePicture = await resizeImage(
          req.files["profilePicture"][0],
          400,
          300
        );
      let resizedCoverPicture;
      if (req.files["coverPicture"])
        resizedCoverPicture = await resizeImage(
          req.files["coverPicture"][0],
          400,
          300
        );

      let updatedAuthData;

      if (!req.body.profilePicture && !req.body.coverPicture) {
        await companyCollection.updateOne(
          { _id: authData.user._id },
          {
            $set: {
              companyname: req.body.companyname,
              companyaddress: req.body.companyaddress,
              profilePicture: resizedProfilePicture.filename,
              coverPicture: resizedCoverPicture.filename,
              bio: req.body.bio,
            },
          }
        );

        const filePromises = [];
        filePromises.push(uploadFile(resizedProfilePicture));
        filePromises.push(uploadFile(resizedCoverPicture));

        await Promise.all(filePromises);

        await unlinkFile("uploads/" + req.files["profilePicture"][0].filename);
        await unlinkFile("uploads/" + req.files["coverPicture"][0].filename);
        await unlinkFile(resizedProfilePicture.path);
        await unlinkFile(resizedCoverPicture.path);

        updatedAuthData = {
          ...authData,
          user: {
            ...authData.user,
            companyname: req.body.companyname,
            companyaddress: req.body.companyaddress,
            profilePicture: resizedProfilePicture.filename,
            coverPicture: resizedCoverPicture.filename,
            bio: req.body.bio,
          },
        };
      } else if (!req.body.profilePicture) {
        await companyCollection.updateOne(
          { _id: authData.user._id },
          {
            $set: {
              companyname: req.body.companyname,
              companyaddress: req.body.companyaddress,
              profilePicture: req.files.profilePicture[0].filename,
              bio: req.body.bio,
            },
          }
        );

        const filePromises = [];
        filePromises.push(uploadFile(req.files["profilePicture"][0]));

        await Promise.all(filePromises);

        await unlinkFile("uploads/" + req.files["profilePicture"][0].filename);

        updatedAuthData = {
          ...authData,
          user: {
            ...authData.user,
            companyname: req.body.companyname,
            companyaddress: req.body.companyaddress,
            profilePicture: req.files.profilePicture[0].filename,
            bio: req.body.bio,
          },
        };
      } else if (!req.body.coverPicture) {
        await companyCollection.updateOne(
          { _id: authData.user._id },
          {
            $set: {
              companyname: req.body.companyname,
              companyaddress: req.body.companyaddress,
              coverPicture: req.files.coverPicture[0].filename,
              bio: req.body.bio,
            },
          }
        );

        const filePromises = [];
        filePromises.push(uploadFile(req.files["coverPicture"][0]));

        await Promise.all(filePromises);

        await unlinkFile("uploads/" + req.files["coverPicture"][0].filename);

        updatedAuthData = {
          ...authData,
          user: {
            ...authData.user,
            companyname: req.body.companyname,
            companyaddress: req.body.companyaddress,
            coverPicture: req.files.coverPicture[0].filename,
            bio: req.body.bio,
          },
        };
      } else {
        await companyCollection.updateOne(
          { _id: authData.user._id },
          {
            $set: {
              companyname: req.body.companyname,
              companyaddress: req.body.companyaddress,
              bio: req.body.bio,
            },
          }
        );
        updatedAuthData = {
          ...authData,
          user: {
            ...authData.user,
            companyname: req.body.companyname,
            companyaddress: req.body.companyaddress,
            bio: req.body.bio,
          },
        };
      }
      const updatedToken = jwt.sign(updatedAuthData, secret);

      res.send({ user: updatedAuthData, token: updatedToken });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}
//Company profile data
async function getCompanyProfileByUID(req, res) {
  try {
    const uid = req.params.uid;
    const company = await companyCollection.findOne({ uid: uid });
    res.send(company);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}
// delete company profile

async function deleteCompanyProfile(req, res) {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      const userData = await companyCollection.findOne({
        _id: authData.user._id,
      });
      if (err && !userData) {
        res.sendStatus(403);
        return;
      } else {
        await companyCollection.deleteOne({ _id: authData.user._id });
        res.send("Company Deleted");
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}
// get verified companies
async function getCompanyProfiles(req, res) {
  try {
    const companies = await companyCollection.find({ verified: true });
    res.send(companies);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}
// get unverified company profiles

async function getUnCompanyProfiles(req, res) {
  try {
    jwt.verify(req.token, secret, async (err, authData) => {
      if (err) {
        return;
      } else {
        const user = await userCollection.findOne({ _id: authData.user._id });
        if (user) {
          if (authData.user.phone === parseInt(process.env.ADMIN_PHONE)) {
            const companies = await companyCollection.find({ verified: false });
            res.send(companies);
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

// get verified company profile
async function getCompanyProfile(req, res) {
  const { companyemail, password } = req.body;
  try {
    const thisCompany = await companyCollection.findOne({
      companyemail: companyemail,
    });
    if (thisCompany && (await thisCompany.matchPassword(password))) {
      jwt.sign({ thisCompany }, secret, { expiresIn: "30d" }, (err, token) => {
        if (err) {
          console.log(err);
          return res.sendStatus(403);
        }
        res.json({ token });
      });
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}
// delete profile

async function deleteCompanyProfileV(req, res) {
  try {
    const id = req.params.id;
    const user = await companyCollection.findOne({ _id: id });

    if (!user || user.verified === true) {
      return res.sendStatus(403);
    }

    const filePromises = [];
    filePromises.push(deleteFile(user.profilePicture));
    filePromises.push(deleteFile(user.coverPicture));
    filePromises.push(deleteFile(user.panCard));
    filePromises.push(deleteFile(user.incorporationCertificate));
    filePromises.push(deleteFile(user.msmeCertificate));
    filePromises.push(deleteFile(user.tradeLiecence));

    await Promise.all(filePromises);

    await companyCollection.deleteOne({ _id: id });
    res.json({ id: id });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

// verifying profile

async function verifyCompanyProfile(req, res) {
  const id = req.params.id;
  companyCollection
    .updateOne({ _id: id }, { $set: { verified: true } })
    .then(() => {
      res.json({ id: id });
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
}

// Search company by name
async function getCompanyByName(req, res) {
  try {
    const data = await companyCollection
      .find({
        companyname: { $regex: ".*" + req.body.query + ".*", $options: "i" },
      })
      .exec();

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}
//Update company password
async function updateCompanyPassword(req, res) {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      const userData = await companyCollection.findOne({
        _id: authData.user._id,
      });
      if (err && !userData) {
        return;
      } else {
        const user = await companyCollection.findById(userData._id);
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
module.exports = {
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
};
