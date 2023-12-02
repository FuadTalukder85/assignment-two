import { Request, Response } from 'express';
import { UserService } from './user.service';
import { OrderSchema, UserValidationSchema } from './user.zod.validation';
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
      message: err.message || 'Something went wronggg',
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'Something went wrong',
      data: err,
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

//update single user
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.isUserExists(parseFloat(userId));
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    const userBody = req.body;
    const zodValidationUpdateUserSchema = UserValidationSchema.parse(userBody);
    const result = await UserService.updateSingleUser(
      parseFloat(userId),
      zodValidationUpdateUserSchema,
    );
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'Something went wrong',
      data: null,
    });
  }
};

//delete single user
const deleteSingleUsers = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.isUserExists(parseFloat(userId));
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    await UserService.deleteUserFromDB(parseFloat(userId));
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
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

//add orders
const addOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.isUserExists(parseFloat(userId));
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    const order = req.body;
    const zodValidationOrderSchema = OrderSchema.parse(order);
    await UserService.addOrder(parseFloat(userId), zodValidationOrderSchema);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'Something went wronggg',
      data: null,
    });
  }
};

//get orders
const getOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await User.isUserExists(parseFloat(userId));
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    const result = await UserService.getOrder(parseFloat(userId));
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'Something went wronggg',
      data: null,
    });
  }
};

// get total price by uderId
const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await User.isUserExists(parseFloat(userId));
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    const result = await UserService.getPrice(parseFloat(userId));
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'Something went wronggg',
      data: null,
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUsers,
  updateUser,
  deleteSingleUsers,
  addOrders,
  getOrders,
  getTotalPrice,
};
