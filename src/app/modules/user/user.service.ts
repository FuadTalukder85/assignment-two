import { User } from '../user.model';
import { TOrders, TUser } from './user.interface';

//create user
const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User already exists');
  }

  const result = await User.create(userData);

  // const user = new User(userData);
  // if (await user.isUserExists(userData.userId)) {
  //   throw new Error('User already exists');
  // }
  // const result = await user.save();

  return result;
};

//get all user
const getAllUserFromDB = async () => {
  const result = await User.find();
  return result;
};

// get single user
const getSingleUserFromDB = async (userId: number) => {
  const result = await User.findOne({ userId });
  return result;
};

// detete user
const deleteUserFromDB = async (userId: number) => {
  const result = await User.updateOne({ userId }, { isDeleted: true });
  // const result = await UserModel.aggregate([{ $match: { userId: userId } }]);
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

// get orders by id
const getOrder = async (userId: number) => {
  const orders = await User.findOne({ userId }, { orders: 1, _id: 0 });
  return orders;
};

export const UserService = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  addOrder,
  getOrder,
};
