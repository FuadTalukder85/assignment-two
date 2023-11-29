import { Request, Response } from 'express';
import { UserService } from './user.service';
import { userValidationSchema } from './user.zod.validation';

//create user
const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body.user;
    const zodValidationSchema = userValidationSchema.parse(user);

    const result = await UserService.createUserIntoDB(zodValidationSchema);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

//get all user
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUserFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      messase: 'Can not get all user',
      error: err,
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
};
