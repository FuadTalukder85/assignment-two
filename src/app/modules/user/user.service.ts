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
const getSingleStudentFromDB = async (userId: string) => {
  const result = await UserModel.findOne({ userId });
  return result;
};

export const UserService = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleStudentFromDB,
};
