const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const LoginRoute = require("./Routes/Login");
const SignupRoute = require("./Routes/User");
const PostRoute = require("./Routes/Post");
const ApplyRoute = require("./Routes/Application");
const multer = require("multer");
const path = require("path");

const AdminList = require("./Routes/Admin");
const RootLogin = require("./Routes/RootLogin");
const Public = require("./Routes/UserPublic");
const app = express();
const cors = require("cors");

dotenv.config();
app.use(express.json({ limit: "50mb" }));
app.use(cors({ origin: "https://beta.hiringneeds.in" }));

app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Server is Connected to Database"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/login", LoginRoute);
app.use("/api/signup", SignupRoute);
app.use("/api/posts", PostRoute);
app.use("/api/apply", ApplyRoute);
app.use("/api/admin", AdminList);
app.use("/api/root", RootLogin);
app.use("/api/public", Public);
const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log("Server is up and running at port " + port);
});
