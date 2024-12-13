const jwt = require("jsonwebtoken");

const createActivationToken = (user) => {
  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: "5h",
  });
  return token;
};

module.exports = createActivationToken;
