const GlobalErrorHandler = require("../utils/globalErrorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  return res.status(err.statusCode).json({
    status: "Failed",
    message: err.message,
  });
};
