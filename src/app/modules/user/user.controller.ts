import { Request, Response } from 'express';
import { UserService } from './user.service';
import {
  UpdateUserValidationSchema,
  UserValidationSchema,
} from './user.zod.validation';
import { User } from '../user.model';

//create user
const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const zodValidationSchema = UserValidationSchema.parse(user);

    const result = await UserService.createUserIntoDB(zodValidationSchema);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'Something went wrong',
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
    res.status(404).json({
      success: false,
      messase: 'Can not get all user',
      error: err,
    });
  }
};

//get single user
const getSingleUsers = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.getSingleUserFromDB(parseFloat(userId));
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

//delete single user
const deleteSingleUsers = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.deleteUserFromDB(parseFloat(userId));
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

//update user
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const updatedUserData = req.body;

    const zodUpdateUserSchema =
      UpdateUserValidationSchema.parse(updatedUserData);
    const user = await User.isUserExists(parseFloat(userId));

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found',
        },
      });
    }

    const result = await UserService.updateUserFromDB(
      parseFloat(userId),
      zodUpdateUserSchema,
    );
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUsers,
  deleteSingleUsers,
  updateSingleUser,
};
