const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const pug = require("pug");
const GlobalErrorHandler = require("./contollers/ErrorHandler");
const userRouter = require("./routes/userRouter");
const viewRouter = require("./routes/viewRouter");

dotenv.config({ path: "./config.env" });

mongoose
  .connect(process.env.MONGOOSE_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", viewRouter);
app.use("/secure-auth/users", userRouter);

app.get("/favicon.ico", (req, res) => {
  res.status(404).end();
});

app.use("*", (req, res, next) => {
  const err = new Error(
    `Route not found Original Route is: ${req.originalUrl}`
  );
  err.statusCode = 404;
  next(err);
});

app.use(GlobalErrorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
