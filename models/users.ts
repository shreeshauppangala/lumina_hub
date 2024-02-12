import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: [true, 'Full name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  house_name: {
    type: String,
    required: [true, 'House Name is required'],
  },
  village: {
    type: String,
    required: [true, 'Village is required'],
  },
  city: {
    type: String,
    required: [true, 'City is required'],
  },
  state: {
    type: String,
    required: [true, 'State is required'],
  },
  pin_code: {
    type: Number,
    required: [true, 'Pin code is required'],
  },
  mobile_number: {
    type: Number,
    required: [true, 'Mobile Number is required'],
    unique: true,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyEmailToken: String,
  verifyEmailTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;
