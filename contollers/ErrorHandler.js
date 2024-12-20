const GlobalErrorHandler = require("../utils/globalErrorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  console.log("Here error", JSON.stringify(err));

  //MongoDb ObjectId error
  if (err.name === "CastError") {
    const errorMessage = `Invalid ${err.path} : ${err.value}`;
    err = new GlobalErrorHandler(errorMessage, 400);
  }

  //Duplicate Key Error
  if (err.code === 11000) {
    const errorMessage = `Duplicate Field Value Entered : ${Object.keys(
      err.keyValue
    )}`;
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

  return res.status(err.statusCode).json({
    status: "Failed",
    message: err.message,
  });
};
