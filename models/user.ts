import { Model, Schema, model, models } from 'mongoose';
import { pattern } from '@/app/constants';
import { UserI } from '@/app/constants/interfaces';

type UserDocument = UserI & Document;
type UserModel = Model<UserDocument>;


const userSchema = new Schema<UserDocument>({
  picture: {
    type: String,
    required: [true, 'Picture is required'],
  },
  full_name: {
    type: String,
    required: [true, 'Full name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: (value: string) => pattern.email.test(value),
      message: () => 'Email is invalid',
    },
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
    validate: {
      validator: (value: string) => pattern.pinCode.test(value),
      message: () => 'Pin code is invalid',
    },
  },
  mobile_number: {
    type: Number,
    required: [true, 'Mobile Number is required'],
    unique: true,
    validate: {
      validator: (value: string) => pattern.mobile.test(value),
      message: () => 'Mobile Number is invalid',
    },
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  cart: {
    type: [
      {
        items: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
        },
      },
    ],
    default: [], // Default value set to an empty array
  },
  orders: {
    type: [
      {
        items: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
        },
      },
    ],
    default: [], // Default value set to an empty array
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyEmailToken: String,
  verifyEmailTokenExpiry: Date,
});

const User: UserModel = models.users || model('users', userSchema);

export default User;
