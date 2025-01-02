const GlobalErrorHandler = require("../utils/globalErrorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //MongoDb ObjectId error
  if (err.name === "CastError") {
    const errorMessage = `Invalid ${err.path} : ${err.value}`;
    err = new GlobalErrorHandler(errorMessage, 400);
  }

  //Duplicate Key Error
  if (err.code === 11000) {
    const errorMessage = `User exist with the same ${Object.keys(
      err.keyValue
    )}`;
    err = new GlobalErrorHandler(errorMessage, 400);
  }

  // MongoDb Validation error
  else if (err.name === "ValidationError") {
    const errorMessage = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    err = new GlobalErrorHandler(errorMessage, 400);
  }

  //Invalid Token Error
  if (err.name === "JsonWebTokenError") {
    const errorMessage = `Invalid Token. Please Login Again`;
    err = new GlobalErrorHandler(errorMessage, 401);
  }

  //Expired Token Error
  if (err.name === "TokenExpiredError") {
    const errorMessage = `Token Expired. Please Login Again`;
    err = new GlobalErrorHandler(errorMessage, 401);
  }

  console.log(err);
  return res.status(err.statusCode).json({
    status: "error",
    message: err.message,
  });
};
