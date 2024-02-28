import { Model, Schema, model, models } from 'mongoose';
import { pattern } from '@/app/constants';
import { UserI } from '@/app/constants/interfaces';

interface UserDocument extends UserI {}
interface UserModel extends Model<UserDocument> {}

const userSchema = new Schema<UserDocument>({
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
    validate: {
      validator: (value: string) => pattern.strongPassword.test(value),
      message: () =>
        'Password minimum length should be 8 and should include one lowercase,one uppercase, one digit and one special character',
    },
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
      // name: string;
      // image: string;
      // price: number;
      // total: number;
      {
        item: {
          type: Schema.Types.ObjectId, // Example: Reference to another collection
          ref: 'Item', // Example: Reference to an 'Item' collection
        },
        quantity: {
          type: Number,
          default: 0,
        },
      },
    ],
    default: [],
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyEmailToken: String,
  verifyEmailTokenExpiry: Date,
});

const User: UserModel = models.users || model('users', userSchema);

export default User;
