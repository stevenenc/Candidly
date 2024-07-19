const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: value => validator.isEmail(value),
        message: 'Email is invalid',
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
      validate: {
        validator: value => !value.toLowerCase().includes('password'),
        message: 'Password cannot contain "password"',
      },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  },
);

// Hashing new created password and modified password
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
