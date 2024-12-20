const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const GlobalErrorHandler = require("./contollers/ErrorHandler");
const userRouter = require("./routes/userRouter");

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

app.use("/secure-auth/users", userRouter);

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
