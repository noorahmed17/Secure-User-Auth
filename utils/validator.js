const GlobalErrorHandler = require("../utils/globalErrorHandler");

exports.validateRequiredFields = (fields, obj) => {
  const missingFields = [];

  for (const [field, value] of Object.entries(obj))
    if (value === "" || value === "undefined") missingFields.push(field);

  if (missingFields.length > 0) {
    throw new GlobalErrorHandler(
      `Please Enter The Required Field(s): ${missingFields.join(", ")}`,
      409
    );
  }
};

exports.checkUserExist = async (query, User) => {
  return await User.findOne(query);
};

// const filterObj = (obj, ...allowedFields) => {
//   const newObj = {};
//   Object.keys(obj).forEach(el => {
//     if (allowedFields.includes(el)) newObj[el] = obj[el];
//   });
//   return newObj;
// };
