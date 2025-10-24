const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  applicationDate: { type: Date, required: true },
  status: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Job", jobSchema);
