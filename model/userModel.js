const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "User Should have a name"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "User Should have an email"],
    validate: {
      validator: (val) => validator.isEmail(val),
      message: "Please enter a valid email",
    },
    trim: true,
  },
  password: {
    type: String,
    required: [true, "User Should have a password"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords do not match",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = undefined;
  next();
});

module.exports = new mongoose.model("User", userSchema);
