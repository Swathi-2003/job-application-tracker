const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoutes");
const auth = require("./middleware/authMiddleware");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/jobs", auth, jobRoutes);

mongoose
  .connect("mongodb://localhost:27017/jobtracker")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => console.log("🚀 Backend running on 5000"));
