import { Schema, model } from 'mongoose';
import { Orders, User } from './user/user.interface';

const orderSchema = new Schema<Orders>({
  productName: { type: String, required: [true, 'productName is required'] },
  price: { type: Number, required: [true, 'price in required'] },
  quantity: { type: Number, required: [true, 'quantity is required'] },
});

const userSchema = new Schema<User>({
  userId: { type: Number, unique: true, required: [true, 'Id is required'] },
  username: { type: String, required: [true, 'User name is required'] },
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
  email: { type: String, required: [true, 'email is required'], unique: true },
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
  orders: { type: [orderSchema], required: false },
});

export const UserModel = model<User>('User', userSchema);
