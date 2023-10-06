const jwt = require("jsonwebtoken");
const jobsCollection = require("../models/jobsModel");
const companyCollection = require("../models/companyModel");
const freelancerCollection = require("../models/freelancerModel");
const secret = process.env.JWT_SECRET;

async function createJob(req, res) {
  jwt.verify(req.token, secret, async (err, authdata) => {
    const company = await companyCollection.findById(authdata.user._id);
    if (err || !company) {
      res.status(404).json({ message: "Not logged in" });
    } else {
      const newJob = new jobsCollection({
        date: req.body.date,
        title: req.body.title,
        profession: req.body.profession,
        description: req.body.description,
        vacancy: req.body.vacancy,
        location: req.body.location,
        budget: req.body.budget,
        createdCompany: company._id,
      });
      await newJob.save();
      await companyCollection.findByIdAndUpdate(company._id, {
        $push: {
          jobPosted: newJob._id,
        },
      });
      res.status(201).json(newJob);
    }
  });
}

async function applyJob(req, res) {
  jwt.verify(req.token, secret, async (err, authdata) => {
    const appliedFreelancer = await freelancerCollection.findById(
      authdata.user._id
    );
    if (err || !appliedFreelancer) {
      res.status(404).send("Couldn't find freelancer");
    } else {
      const job = await jobsCollection.findByIdAndUpdate(req.body.jobid, {
        $push: { appliedFreelancers: appliedFreelancer._id },
      });
      if (job) {
        const freelancer = await freelancerCollection.findByIdAndUpdate(
          appliedFreelancer._id,
          {
            $push: { appliedJob: job._id },
          }
        );
        res.status(200).json(freelancer);
      } else {
        res.status(404).send("Job not found");
      }
    }
  });
}

async function editJobDetails(req, res) {
  jwt.verify(req.token, secret, async (err, authdata) => {
    const company = await companyCollection.findById(authdata.user._id);
    if (err || !company) {
      res.status(404).json({ message: "Not logged in" });
    } else {
      const job = await jobsCollection.findById(req.params.jobId);
      if (!job) {
        res.status(404).json({ message: "Job not found" });
      } else {
        const modifiedJob = await jobsCollection.findByIdAndUpdate(
          req.params.jobId,
          {
            date: req.body.date || job.date,
            title: req.body.title || job.title,
            profession: req.body.profession || job.profession,
            description: req.body.description || job.description,
            vacancy: req.body.vacancy || job.vacancy,
            location: req.body.location || job.location,
            budget: req.body.budget || job.budget,
            daysAvailableForHire:
              req.body.daysAvailableForHire || job.daysAvailableForHire,
          }
        );
        res.status(200).json(modifiedJob);
      }
    }
  });
}

async function getPostedJobsOfUser(req, res) {
  jwt.verify(req.token, secret, async function (err, authData) {
    const user = await companyCollection.findById(authData.user._id);
    if (err || !user) {
      res.status(404).send("Not logged in");
    } else {
      const jobs = await jobsCollection
        .find({ createdCompany: user._id })
        .populate("createdCompany")
        .exec();
      res.status(200).json(jobs);
    }
  });
}

async function deleteJob(req, res) {
  jwt.verify(req.token, secret, async (err, authdata) => {
    const createdCompany = await companyCollection.findById(authdata.user._id);
    if (err || !createdCompany) {
      res.status(404).json({ message: "No company found" });
    } else {
      const job = await jobsCollection.findById(req.params.jobId);
      if (!job) {
        res.status(404).json({ message: "Job not found" });
      } else {
        await companyCollection.findByIdAndUpdate(createdCompany._id, {
          $pull: {
            jobPosted: job._id,
          },
        });
        if (job.appliedFreelancers.length > 0) {
          job.appliedFreelancers.forEach(async (freelancer) => {
            await freelancerCollection.findByIdAndUpdate(freelancer, {
              $pull: {
                appliedJob: job._id,
              },
            });
          });
        }
        await jobsCollection.findByIdAndDelete(req.params.jobId);
        res.status(200).json({ message: "Job deleted Successfully" });
      }
    }
  });
}

async function getAllJob(req, res) {
  try {
    const jobs = await jobsCollection
      .find({})
      .populate("createdCompany")
      .exec();
    res.status(200).json(jobs);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Internal Server Error" });
  }
}

async function getJobById(req, res) {
  try {
    const job = await jobsCollection.findById(req.params.jobId);
    res.status(200).json(job);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Job not found" });
  }
}

async function getJobByProfession(req, res) {
  try {
    const jobs = await jobsCollection.find({
      profession: req.params.profession,
    });
    res.status(200).json(jobs);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Job not found" });
  }
}

module.exports = {
  createJob,
  applyJob,
  editJobDetails,
  deleteJob,
  getJobById,
  getJobByProfession,
  getAllJob,
  getPostedJobsOfUser,
};
