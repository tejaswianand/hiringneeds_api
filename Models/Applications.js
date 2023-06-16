const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Recieved",
    },
    ewb: {
      type: String,
      required: true,
    },
    exp: {
      type: String,
      required: true,
    },
    eab: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    jid: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Applications", ApplicationSchema);
