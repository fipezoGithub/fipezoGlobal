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
      panCard: req.files["panCard"] ? req.files["panCard"][0].filename : null,
      incorporationCertificate: req.files["incorporationCertificate"]
        ? req.files["incorporationCertificate"][0].filename
        : null,
      msmeCertificate: req.files["msmeCertificate"]
        ? req.files["msmeCertificate"][0].filename
        : null,
      tradeLiecence: req.files["tradeLiecence"]
        ? req.files["tradeLiecence"][0].filename
        : null,
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
    if (req.files["panCard"]) {
      filePromises.push(uploadFile(req.files["panCard"][0]));
    }
    if (req.files["incorporationCertificate"]) {
      filePromises.push(uploadFile(req.files["incorporationCertificate"][0]));
    }
    if (req.files["msmeCertificate"]) {
      filePromises.push(uploadFile(req.files["msmeCertificate"][0]));
    }
    if (req.files["tradeLiecence"]) {
      filePromises.push(uploadFile(req.files["tradeLiecence"][0]));
    }
    req.files["works[]"]?.forEach((file) => {
      filePromises.push(uploadFile(file));
    });
    await Promise.all(filePromises);

    await unlinkFile("uploads/" + req.files["profilePicture"][0].filename);
    await unlinkFile("uploads/" + req.files["coverPicture"][0].filename);
    if (req.files["panCard"]) {
      await unlinkFile("uploads/" + req.files["panCard"][0].filename);
    }
    if (req.files["incorporationCertificate"]) {
      await unlinkFile(
        "uploads/" + req.files["incorporationCertificate"][0].filename
      );
    }
    if (req.files["msmeCertificate"]) {
      await unlinkFile("uploads/" + req.files["msmeCertificate"][0].filename);
    }
    if (req.files["tradeLiecence"]) {
      await unlinkFile("uploads/" + req.files["tradeLiecence"][0].filename);
    }

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
      const deletePromises = [];
      const filePromises = [];

      let resizedProfilePicture;
      if (req.files && req.files["profilePicture"]) {
        resizedProfilePicture = await resizeImage(
          req.files["profilePicture"][0],
          400,
          300
        );
        deletePromises.push(deleteFile(user.profilePicture));
        filePromises.push(uploadFile(resizedProfilePicture));
      }
      let resizedCoverPicture;
      if (req.files && req.files["coverPicture"]) {
        resizedCoverPicture = await resizeImage(
          req.files["coverPicture"][0],
          400,
          300
        );

        deletePromises.push(deleteFile(user.coverPicture));
        filePromises.push(uploadFile(resizedCoverPicture));
      }

      await Promise.all(deletePromises);
      await Promise.all(filePromises);
      user.companyemail = req.body.companyemail || user.companyemail;
      user.password = req.body.password || user.password;
      user.bio = req.body.bio || user.bio;
      user.profilePicture =
        resizedProfilePicture?.filename || user.profilePicture;
      user.coverPicture = resizedCoverPicture?.filename || user.coverPicture;

      const updatedUser = await user.save();
      if (resizedProfilePicture) {
        await unlinkFile("uploads/" + req.files["profilePicture"][0].filename);
        await unlinkFile(resizedProfilePicture.path);
      }
      if (resizedCoverPicture) {
        await unlinkFile("uploads/" + req.files["coverPicture"][0].filename);
        await unlinkFile(resizedCoverPicture.path);
      }

      res.status(200).json(updatedUser);
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
  const { page } = req.query;
  const limit = 12;
  try {
    const companies = await companyCollection
      .find({ verified: true })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await companyCollection.countDocuments({
      verified: true,
    });
    res.status(200).json(companies);
    // res.status(200).json({
    //   companies,
    //   totalPages: Math.ceil(count / limit),
    //   currentPage: page,
    // });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}

//Get verified company by type
async function getCompanyByType(req, res) {
  const { page } = req.query;
  const limit = 12;
  try {
    const companies = await companyCollection
      .find({
        $and: [{ verified: true }, { companytype: req.params.type }],
      })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await companyCollection.countDocuments({
      $and: [{ verified: true }, { companytype: req.params.type }],
    });
    res.status(200).json({
      companies,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
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
    if (user.panCard) {
      filePromises.push(deleteFile(user.panCard));
    }
    if (user.incorporationCertificate) {
      filePromises.push(deleteFile(user.incorporationCertificate));
    }
    if (user.msmeCertificate) {
      filePromises.push(deleteFile(user.msmeCertificate));
    }
    if (user.tradeLiecence) {
      filePromises.push(deleteFile(user.tradeLiecence));
    }

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
  getCompanyByType,
};
