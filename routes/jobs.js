const express = require("express");
const router = express.Router();
const {
  getAllJobs,
  getNewJobForm,
  createJob,
  getEditJobForm,
  updateJob,
  deleteJob,
} = require("../controllers/jobs");

router.get("/", getAllJobs);
router.get("/new", getNewJobForm);
router.post("/", createJob);
router.get("/edit/:id", getEditJobForm);
router.post("/update/:id", updateJob);
router.post("/delete/:id", deleteJob);

module.exports = router;
