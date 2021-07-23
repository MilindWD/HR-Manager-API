//Imports
const asyncHandler = require("express-async-handler");
const moment = require("moment");

const Job = require("../models/Job");

const { invoiceIdGenerator } = require("../utils/generateInvoiceId");

//@desc add Job
//@route /api/jobs/assign/
//@access User
const addJob = async (req, res) => {
  try {
    //adds a advance invoice only if advance > 0
    if (parseInt(req.body.advanceAmount) > 0) {
      const invoiceId = await invoiceIdGenerator(req.user._id);
      req.body.payments = [
        {
          amount: req.body.advanceAmount,
          comments: "advance amount",
          date: moment(),
          invoiceId: invoiceId,
        },
      ];
    }

    //adding the job
    const job = await Job.insertMany([req.body]);
    res.json(job);
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ message: "job not added" });
  }
};

//@desc find job by id
//@route /api/jobs/:id
//@access User
const findJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("employee", { name: 1 })
      .populate("user", { name: 1, address: 1, contact: 1 });
    res.json(job);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: "job not found" });
  }
};

//@desc get all jobs of user
//@route /api/jobs
//@access User
const findAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({})
      .populate("employee", { name: 1 })
      .populate("user", { name: 1 });
    res.json(jobs);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: "job not found" });
  }
};

//@desc get all jobs of user
//@route /api/jobs/user/:id
//@access User
const findAllJobsOfUser = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.params.id })
      .populate("employee", { name: 1 })
      .populate("user", { name: 1 });
    res.json(jobs);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: "job not found" });
  }
};

//@desc close a job
//@route /api/jobs/close/:id
//@access User
const closeJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    job.closingDate = req.body.closingDate;
    const updated = await job.save();
    res.json(updated);
  } catch (error) {
    console.log(error.message);
  }
};

//@desc make payment
//@route /api/jobs/payment/:id
//@access User
const makePayment = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    job.balanceAmount -= req.body.amount;
    job.totalAmount += req.body.amount;
    req.body.invoiceId = await invoiceIdGenerator(job.user);
    job.payments.push(req.body);
    const updated = await job.save();
    res.json(updated);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: "unable to pay" });
  }
};

//@desc update fixed payment
//@route /api/jobs/update/fixedpayment
//@access User
const updateFixedPayment = async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);
    job.fixedPayment = Number(req.body.fixedPayment);
    job.balanceAmount = Number(req.body.fixedPayment) - job.totalAmount;
    job = await job.save();
    res.json(job);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: "unable to update" });
  }
};

module.exports = {
  addJob,
  findJobById,
  findAllJobs,
  findAllJobsOfUser,
  closeJobById,
  makePayment,
  updateFixedPayment,
};
