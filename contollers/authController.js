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
    return next(new GlobalErrorHandler("User ALready Exists", 401));
  }

  const user = await User.create({
    username: username,
    email: email,
    password: password,
    passwordConfirm: passwordConfirm,
  });

  const token = createActivationToken(user);
  res.status(201).json({ user, token });
});

exports.signin = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  validateRequiredFields([username, email, password], req);

  const user = await checkUserExist({ email }, User);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new GlobalErrorHandler("Invalid Email or Password", 401));
  }

  const token = createActivationToken(user);
  res.status(201).json({ message: "You Have succesfully Loggedin", token });
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
  try {
    verifiedToken = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    return next(new GlobalErrorHandler("Token is invalid or expired", 401));
  }

  const decodedToken = jwt.decode(token);
  const user = await User.findById(decodedToken.id);
  if (!user) {
    return next(new GlobalErrorHandler("User is No Longer Logged In", 401));
  }
  req.user = user;
  next();
});
