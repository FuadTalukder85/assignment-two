import { Schema, model } from 'mongoose';
import { TOrders, TUser, UserModel } from './user/user.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const orderSchema = new Schema<TOrders>({
  productName: { type: String, required: [true, 'productName is required'] },
  price: { type: Number, required: [true, 'price in required'] },
  quantity: { type: Number, required: [true, 'quantity is required'] },
});

const userSchema = new Schema<TUser, UserModel>({
  userId: { type: Number, unique: true, required: [true, 'Id is required'] },
  username: {
    type: String,
    required: [true, 'User name is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  fullName: {
    firstName: {
      type: String,
      required: [true, 'firstName is required'],
    },
    lastName: {
      type: String,
      required: [true, 'lastName is required'],
    },
  },
  age: { type: Number, required: [true, 'age is required'] },
  email: { type: String, required: true, unique: true },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
    message: 'Invaild status, must be "active" or "blocked" ',
  },
  hobbies: [{ type: String, required: [true, 'hobbbies are required'] }],
  address: {
    street: { type: String, required: [true, 'street is required'] },
    city: { type: String, required: [true, 'city is required'] },
    country: { type: String, required: [true, 'country is required'] },
  },
  orders: { type: [orderSchema], required: false, select: false },
});

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';

  next();
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.orders;
  delete user._id;
  delete user.__v;
  return user;
};

userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

export const User = model<TUser, UserModel>('User', userSchema);
