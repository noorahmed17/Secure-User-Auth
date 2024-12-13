const User = require("../model/userModel");

exports.createUser = async (req, res) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  res.status(200).json({
    status: "success",
    data: user,
  });
};

exports.getAll = async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    length: users.length,
    data: users,
  });
};

exports.getOne = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: user,
  });
};

exports.updateUser = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(201).json({
    status: "success",
    data: updatedUser,
  });
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
  });
};
