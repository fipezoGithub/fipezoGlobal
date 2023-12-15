const { uploadFile, deleteFile } = require("../middlewares/s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const careerCollection = require("../models/carrerModel");

async function createFipezoJob(req, res) {
  try {
    const newFipezoJob = new careerCollection({
      uid:
        "fipjob_" +
        req.body.title
          .split(" ")
          .join("_")
          .split("/")
          .join("_")
          .split("?")
          .join("_") +
        "_" +
        Math.ceil(Math.random() * 1000000000).toString(),
      title: req.body.title,
      location: req.body.location,
      mode: req.body.mode,
      category: req.body.category,
    });
    const created = await newFipezoJob.save();
    res.status(201).json(created);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function applyFipezoJob(req, res) {
  try {
    const applicantData = JSON.stringify({
      phone: req.body.phone,
      name: req.body.name,
      cv: req.file.filename,
      email: req.body.email,
      proffesion: req.body.proffesion,
    });
    const job = await careerCollection.findOne({
      uid: req.params.requestId,
    });
    const response = await careerCollection.findByIdAndUpdate(job._id, {
      $push: { applicants: applicantData },
    });
    await uploadFile(req.file);
    await unlinkFile("uploads/" + req.file.filename);

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function deleteFipezoJobRequest(req, res) {
  try {
    const requestedJob = await careerCollection.findById(req.params.requestId);
    if (!requestedJob) {
      res.status(404).send("Application not found");
      return;
    }
    await deleteFile(requestedJob.cv);
    await careerCollection.findByIdAndDelete(requestedJob._id);
    res.status(200).send("Application deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function getAllFipezoJobRequest(req, res) {
  try {
    const allRequests = await careerCollection.find({});
    res.status(200).json(allRequests);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function getFipezoJobRequestByCategory(req, res) {
  try {
    const jobs = await careerCollection.find({ category: req.params.category });
    res.status(200).json(jobs);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function getFipezoJobRequestById(req, res) {
  try {
    const jobDetails = await careerCollection.findOne({
      uid: req.params.requestId,
    });
    if (!jobDetails) {
      res.status(404).send("Not Found");
    } else {
      res.status(200).json(jobDetails);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function getAllApplications(req, res) {
  try {
    const jobs = await careerCollection.find({});
    let applicants = [];
    jobs.forEach((element) => {
      if (element.applicants) {
        element.applicants.forEach((elem) => {
          applicants.push(elem);
        });
      }
    });
    res.status(200).json(applicants);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  createFipezoJob,
  applyFipezoJob,
  deleteFipezoJobRequest,
  getAllFipezoJobRequest,
  getFipezoJobRequestById,
  getFipezoJobRequestByCategory,
  getAllApplications,
};
