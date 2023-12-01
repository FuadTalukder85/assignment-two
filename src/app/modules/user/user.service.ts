import { User } from '../user.model';
import { TUser } from './user.interface';

//create user
const createUserIntoDB = async (userData: TUser) => {
  /** */
  const user = new User(userData);
  if (await user.isUserExists(userData.userId)) {
    throw new Error('User already exists');
  }

  const result = await user.save();
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

export const UserService = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
};
