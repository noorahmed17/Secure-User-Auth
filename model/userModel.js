const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { type } = require("os");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "User Should have a name"],
  },
  email: {
    type: String,
    required: [true, "User Should have an email"],
    validate: {
      validator: (val) => validator.isEmail(val),
      message: "Please enter a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "User Should have a password"],
  },
  passwordConfirm: {
    type: String,
    validator: function (el) {
      return el === this.password;
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
