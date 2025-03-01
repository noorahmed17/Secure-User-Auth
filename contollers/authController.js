const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const createActivationToken = require("../utils/createToken");
const catchAsync = require("../utils/catchAsyncError");
const GlobalErrorHandler = require("../utils/globalErrorHandler");
const {
  validateRequiredFields,
  checkUserExist,
} = require("../utils/validator");

exports.register = catchAsync(async (req, res, next) => {
  const { username, email, password, passwordConfirm } = req.body;
  validateRequiredFields(
    [username, email, password, passwordConfirm],
    req.body
  );

  const checkUser = await checkUserExist({ username, email }, User);
  if (checkUser) {
    return next(new GlobalErrorHandler("User Already Exists", 409));
  }

  const user = await User.create({
    username: username,
    email: email,
    password: password,
    passwordConfirm: passwordConfirm,
  });

  const token = createActivationToken(user);
  res.status(201).json({
    status: "success",
  });
});

exports.signin = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  validateRequiredFields([username, email, password], req);

  const user = await checkUserExist({ email }, User);
  if (!user) {
    return next(
      new GlobalErrorHandler("No user found with this email address", 401)
    );
  }
  if (!(await bcrypt.compare(password, user.password))) {
    return next(new GlobalErrorHandler("Incorrect Password", 401));
  }

  const token = createActivationToken(user);
  res.status(200).json({
    status: "success",
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    return next(new GlobalErrorHandler("You are not logged in", 401));
  }

  let verifiedToken;
  verifiedToken = jwt.verify(token, process.env.SECRET_KEY);
  if (!verifiedToken) {
    return next();
  }

  const decodedToken = jwt.decode(token);
  const user = await User.findById(decodedToken.id);
  if (!user) {
    return next(new GlobalErrorHandler("User is No Longer Logged In", 401));
  }
  req.user = user;
  next();
});
