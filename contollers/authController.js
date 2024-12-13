const User = require("../model/userModel");
const createActivationToken = require("../utils/createToken");

exports.register = async (req, res) => {
  const { username, email, password, passwordConfirm } = req.body;
  if (!username || !email) {
    return res
      .status(400)
      .json({ message: "Please enter your username and email" });
  }

  const checkUser = await User.findOne({
    username,
    email,
  });

  if (checkUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    username: username,
    email: email,
    password: password,
    passwordConfirm: passwordConfirm,
  });

  const token = createActivationToken(user);
  res.status(201).json({ user, token });
};
