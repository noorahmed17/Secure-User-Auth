const GlobalErrorHandler = require("../utils/globalErrorHandler");

exports.validateRequiredFields = (fields, obj) => {
  const missingFields = [];

  for (const [field, value] of Object.entries(obj))
    if (value === "" || value === "undefined") missingFields.push(field);

  if (missingFields.length > 0) {
    throw new GlobalErrorHandler(
      `Please Enter Your ${missingFields.join(" and ")}`,
      409
    );
  }
};

exports.checkUserExist = async (query, User) => {
  return await User.findOne(query);
};
