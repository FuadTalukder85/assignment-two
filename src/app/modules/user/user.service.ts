import { UserModel } from '../user.model';
import { User } from './user.interface';

//create user
const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

//get all user
const getAllUserFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

// get single user
const getSingleUserFromDB = async (userId: number) => {
  const result = await UserModel.findOne({ userId });
  return result;
};

// detete user
const deleteUserFromDB = async (userId: number) => {
  const result = await UserModel.updateOne({ userId }, { isDeleted: true });
  // const result = await UserModel.aggregate([{ $match: { userId: userId } }]);
  return result;
};

//update user
const updateUserFromDb = async (userId: number) => {
  const result = await UserModel.updateOne({ userId });
  return result;
};

export const UserService = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserFromDb,
};
