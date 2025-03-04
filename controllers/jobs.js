const Job = require("../models/Job");
const parseValidationErrs = require("../util/parseValidationErr");

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user._id });
    res.render("jobs", { jobs, messages: req.flash() });
  } catch (err) {
    req.flash("error", "Failed to retrieve jobs.");
    res.redirect("/");
  }
};

const getNewJobForm = (req, res) => {
  res.render("job", { job: null });
};

const createJob = async (req, res) => {
  try {
    const job = new Job({
      ...req.body,
      createdBy: req.user._id,
    });
    await job.save();
    req.flash("info", "Job created successfully.");
    res.redirect("/jobs");
  } catch (err) {
    if (!req.flash) {
      console.error("Flash is not initialized.");
    }
    const errors = parseValidationErrs(err, req);
    req.flash("error", errors);
    res.redirect("/jobs/new");
  }
};

const getEditJobForm = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!job) {
      req.flash("error", "Job not found.");
      return res.redirect("/jobs");
    }
    res.render("job", { job });
  } catch (err) {
    req.flash("error", "Failed to retrieve job.");
    res.redirect("/jobs");
  }
};

const updateJob = async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!job) {
      req.flash("error", "Job not found or unauthorized.");
      return res.redirect("/jobs");
    }
    req.flash("info", "Job updated successfully.");
    res.redirect("/jobs");
  } catch (err) {
    const errors = parseValidationErrs(err);
    req.flash("error", errors);
    res.redirect(`/jobs/edit/${req.params.id}`);
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!job) {
      req.flash("error", "Job not found or unauthorized.");
      return res.redirect("/jobs");
    }
    req.flash("info", "Job deleted successfully.");
    res.redirect("/jobs");
  } catch (err) {
    req.flash("error", "Failed to delete job.");
    res.redirect("/jobs");
  }
};

module.exports = {
  getAllJobs,
  getNewJobForm,
  createJob,
  getEditJobForm,
  updateJob,
  deleteJob,
};
