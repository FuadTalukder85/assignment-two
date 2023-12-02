import { User } from '../user.model';
import { TOrders, TUser } from './user.interface';

//create user
const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User already exists');
  }
  const result = await User.create(userData);
  return result;
};

//get all user
const getAllUserFromDB = async () => {
  const result = await User.aggregate([
    { $match: {} },
    { $project: { username: 1, fullName: 1, age: 1, email: 1, address: 1 } },
  ]);
  return result;
};

// get single user
const getSingleUserFromDB = async (userId: number) => {
  const result = await User.findOne({ userId });
  return result;
};

//update single user
const updateSingleUser = async (userId: number, updateUserData: object) => {
  const result = await User.findOneAndUpdate(
    { userId },
    { $set: updateUserData },
    { $new: true },
  );
  return result;
};

// detete user
const deleteUserFromDB = async (userId: number) => {
  const result = await User.findOneAndDelete({ userId });
  return result;
};

//add orders
const addOrder = async (userId: number, order: TOrders) => {
  const result = await User.findOneAndUpdate(
    { userId },
    { $push: { orders: order } },
  );
  return result;
};

// get orders by userId
const getOrder = async (userId: number) => {
  const orders = await User.findOne({ userId }, { orders: 1, _id: 0 });
  return orders;
};

//get total price by userId
const getPrice = async (userId: number) => {
  const totalPrice = User.aggregate([
    { $match: { userId } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: 0,
        totalPrice: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
    },
    { $project: { _id: 0 } },
  ]);
  return totalPrice;
};

export const UserService = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateSingleUser,
  deleteUserFromDB,
  addOrder,
  getOrder,
  getPrice,
};
